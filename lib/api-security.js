/**
 * lib/api-security.js
 *
 * Central security utility for all Next.js API routes.
 *
 * Provides:
 *  - requireAuth()         — NextAuth session validation
 *  - rateLimit()           — Redis sliding-window rate limiter (Upstash)
 *  - validateBody()        — Input schema validation (no external deps)
 *  - sanitizeOutput()      — Strip unexpected keys from response objects
 *  - withSecurity()        — Composable wrapper: auth + rate limit + validation in one call
 */

import { getServerSession } from 'next-auth/next';
import { authOptions }      from '@/app/api/auth/[...nextauth]/route';
import { NextResponse }     from 'next/server';
import { Redis }            from '@upstash/redis';

// ── 0. Safe error handler ─────────────────────────────────────────────────────
/**
 * safeError(error, context?)
 *
 * Logs the real error server-side and returns a plain, non-technical
 * message safe to show to the user. Never leaks stack traces, env
 * variables, DB connection strings, API keys, or internal error codes.
 *
 * Usage in catch blocks:
 *   catch (err) {
 *     return errorResponse(err, '[my-route]');
 *   }
 */
export function safeError(err, context = '[api]') {
  // Always log the real error internally (only visible in server logs)
  console.error(`${context}`, err);

  // Prisma / DB errors
  const name = err?.constructor?.name || '';
  if (name === 'PrismaClientKnownRequestError') {
    const code = err?.code;
    if (code === 'P2002') return 'That entry already exists. Please check your input and try again.';
    if (code === 'P2025') return 'The item you requested could not be found.';
    if (code === 'P2021' || code === 'P2022') return 'A setup step is missing on the server. Please contact support.';
    return 'Something went wrong saving your data. Please try again in a moment.';
  }
  if (name === 'PrismaClientInitializationError' || name === 'PrismaClientRustPanicError') {
    return 'We could not connect to our database right now. Please try again in a moment.';
  }
  if (name === 'PrismaClientValidationError') {
    return 'Some information you sent was not in the expected format. Please check your input.';
  }

  // Network / fetch errors
  const msg = err?.message || '';
  if (msg.includes('ECONNREFUSED') || msg.includes('ENOTFOUND') || msg.includes('fetch failed')) {
    return 'We could not reach a required service. Please check your connection and try again.';
  }

  // AI provider quota / auth errors
  if (msg.includes('429') || msg.toLowerCase().includes('quota') || msg.toLowerCase().includes('rate limit')) {
    return 'Our AI service is busy right now. Please wait a moment and try again.';
  }
  if (msg.includes('401') || msg.includes('403') || msg.toLowerCase().includes('unauthorized')) {
    return 'A service authentication error occurred. Please contact support if this continues.';
  }

  // Generic fallbacks — never forward raw messages
  return 'Something went wrong on our end. Please try again. If the problem continues, contact support.';
}

/**
 * errorResponse(err, context?, status?)
 * Convenience: returns a NextResponse with the safe user message.
 */
export function errorResponse(err, context = '[api]', status = 500) {
  return NextResponse.json({ error: safeError(err, context) }, { status });
}



// ── Redis client (singleton) ─────────────────────────────────────────────────
let _redis;
function getRedis() {
  if (!_redis) {
    _redis = new Redis({
      url:   process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
  }
  return _redis;
}

// ── 1. Auth guard ─────────────────────────────────────────────────────────────
/**
 * Validates the session and returns { session } or a 401 NextResponse.
 *
 * Usage:
 *   const authResult = await requireAuth();
 *   if (authResult instanceof NextResponse) return authResult;
 *   const { session } = authResult;
 */
export async function requireAuth() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json(
      { error: 'Unauthorized. Please sign in to access this resource.' },
      { status: 401, headers: { 'WWW-Authenticate': 'Bearer' } },
    );
  }
  return { session };
}

// ── 2. Rate limiter ───────────────────────────────────────────────────────────
/**
 * Sliding-window rate limiter backed by Upstash Redis.
 *
 * @param {string} identifier  — unique key: userId or IP
 * @param {object} opts
 *   @param {number} opts.limit    — max requests allowed in window (default 30)
 *   @param {number} opts.window   — window in seconds (default 60)
 *   @param {string} opts.prefix   — key prefix for Redis (e.g. 'rl:ai:')
 *
 * Returns null on pass, or a 429 NextResponse on limit exceeded.
 */
export async function rateLimit(identifier, {
  limit  = 30,
  window = 60,
  prefix = 'rl:api:',
} = {}) {
  const key = `${prefix}${identifier}`;
  try {
    const redis = getRedis();
    const now   = Date.now();
    const floor = now - window * 1000;

    // Remove old entries outside the window, then add current timestamp
    const pipe = redis.pipeline();
    pipe.zremrangebyscore(key, '-inf', floor);
    pipe.zadd(key, { score: now, member: `${now}-${Math.random()}` });
    pipe.zcard(key);
    pipe.expire(key, window);
    const results = await pipe.exec();

    const count = results[2]; // zcard result
    if (count > limit) {
      return NextResponse.json(
        { error: 'Too many requests. Please slow down and try again.' },
        {
          status: 429,
          headers: {
            'Retry-After':        String(window),
            'X-RateLimit-Limit':  String(limit),
            'X-RateLimit-Reset':  String(Math.ceil((now + window * 1000) / 1000)),
          },
        },
      );
    }
    return null; // pass
  } catch (err) {
    // Rate limiting failure must NOT block requests — degrade gracefully
    console.warn('[rate-limit] Redis error, skipping rate limit:', err?.message);
    return null;
  }
}

// ── 3. Input validation ───────────────────────────────────────────────────────
/**
 * Validates a request body object against a schema definition.
 *
 * Schema format:
 * {
 *   fieldName: {
 *     type: 'string' | 'number' | 'boolean' | 'object' | 'array',
 *     required: boolean,
 *     minLength?: number,   // for strings
 *     maxLength?: number,   // for strings
 *     min?: number,         // for numbers
 *     max?: number,         // for numbers
 *     enum?: any[],         // allowed values
 *     pattern?: RegExp,     // for strings
 *   }
 * }
 *
 * Returns { valid: true } or { valid: false, errors: string[] }
 */
export function validateBody(body, schema) {
  const errors = [];

  for (const [field, rules] of Object.entries(schema)) {
    const value = body?.[field];
    const missing = value === undefined || value === null || value === '';

    if (rules.required && missing) {
      errors.push(`'${field}' is required.`);
      continue;
    }
    if (missing) continue; // optional field absent — skip remaining checks

    // Type check
    if (rules.type) {
      const actual = Array.isArray(value) ? 'array' : typeof value;
      if (actual !== rules.type) {
        errors.push(`'${field}' must be of type ${rules.type}, got ${actual}.`);
        continue;
      }
    }

    // String-specific
    if (typeof value === 'string') {
      if (rules.minLength !== undefined && value.trim().length < rules.minLength) {
        errors.push(`'${field}' must be at least ${rules.minLength} characters.`);
      }
      if (rules.maxLength !== undefined && value.length > rules.maxLength) {
        errors.push(`'${field}' must be at most ${rules.maxLength} characters.`);
      }
      if (rules.pattern && !rules.pattern.test(value)) {
        errors.push(`'${field}' has an invalid format.`);
      }
    }

    // Number-specific
    if (typeof value === 'number') {
      if (rules.min !== undefined && value < rules.min) {
        errors.push(`'${field}' must be at least ${rules.min}.`);
      }
      if (rules.max !== undefined && value > rules.max) {
        errors.push(`'${field}' must be at most ${rules.max}.`);
      }
    }

    // Enum
    if (rules.enum && !rules.enum.includes(value)) {
      errors.push(`'${field}' must be one of: ${rules.enum.join(', ')}.`);
    }
  }

  return errors.length > 0
    ? { valid: false, errors }
    : { valid: true };
}

// ── 4. Output sanitizer ───────────────────────────────────────────────────────
/**
 * Strips keys not declared in the allowedKeys array.
 * Prevents accidental data leakage in API responses.
 *
 * @param {object} data
 * @param {string[]} allowedKeys
 */
export function sanitizeOutput(data, allowedKeys) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) return data;
  return Object.fromEntries(
    Object.entries(data).filter(([k]) => allowedKeys.includes(k)),
  );
}

// ── 5. Composable withSecurity() wrapper ──────────────────────────────────────
/**
 * High-level wrapper combining auth + rate limit + input validation.
 *
 * @param {Request} request — Next.js request object
 * @param {object}  opts
 *   @param {boolean}        opts.auth         — require session (default true)
 *   @param {object}         opts.rateLimit    — { limit, window, prefix } or false to skip
 *   @param {object}         opts.schema       — validation schema for request body
 *   @param {string}         opts.method       — expected HTTP method (e.g. 'POST')
 *
 * Returns { ok: false, response: NextResponse } on failure,
 * or     { ok: true, session, body } on success.
 */
export async function withSecurity(request, opts = {}) {
  const {
    auth      = true,
    schema    = null,
    method    = null,
  } = opts;

  // Method check
  if (method && request.method !== method) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: `Method ${request.method} not allowed.` },
        { status: 405, headers: { Allow: method } },
      ),
    };
  }

  // Auth
  let session = null;
  if (auth) {
    const authResult = await requireAuth();
    if (authResult instanceof NextResponse) {
      return { ok: false, response: authResult };
    }
    session = authResult.session;
  }

  // Rate limit — use userId if authed, else fall back to IP
  const rateLimitOpts = opts.rateLimit !== false ? (opts.rateLimit || {}) : null;
  if (rateLimitOpts !== null) {
    const identifier = session?.user?.id
      || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || request.headers.get('x-real-ip')
      || 'anonymous';
    const rlResult = await rateLimit(identifier, rateLimitOpts);
    if (rlResult) return { ok: false, response: rlResult };
  }

  // Body parsing + validation
  let body = null;
  if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
    try {
      body = await request.json();
    } catch {
      return {
        ok: false,
        response: NextResponse.json(
          { error: 'Invalid JSON body.' },
          { status: 400 },
        ),
      };
    }

    if (schema) {
      const { valid, errors } = validateBody(body, schema);
      if (!valid) {
        return {
          ok: false,
          response: NextResponse.json(
            { error: 'Validation failed.', details: errors },
            { status: 422 },
          ),
        };
      }
    }
  }

  return { ok: true, session, body };
}
