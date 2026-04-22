import { NextResponse }  from 'next/server';
import { prisma }         from '@/lib/prisma';
import { generateStructuredJson } from '@/lib/ai';
import { errorResponse, rateLimit, validateBody } from '@/lib/api-security';
import { getFromCache, setInCache } from '@/lib/cache';


const TOPIC_DETAIL_SCHEMA = {
  type: 'OBJECT',
  properties: {
    definition: {
      type: 'STRING',
      description: 'A clear definition of the topic.',
    },
    descriptionPoints: {
      type: 'ARRAY',
      description: '3-4 critical points describing how the topic works internally.',
      items: { type: 'STRING' }
    },
    usagePoints: {
      type: 'ARRAY',
      description: '3-4 practical bullet points explaining when and why to use this topic.',
      items: { type: 'STRING' }
    },
    example: {
      type: 'STRING',
      description: 'A clear, practical example of the topic in action.',
    },
    illustration: {
      type: 'STRING',
      description: 'A short simple code example or practical illustration of how the topic works.',
    },
  },
  required: ['definition', 'descriptionPoints', 'usagePoints', 'example', 'illustration'],
};

const TOPIC_DETAIL_CACHE_TTL_SECONDS = 60 * 60 * 24 * 30;
const TOPIC_DETAIL_MEMORY_TTL_MS = 10 * 60 * 1000;
const TOPIC_DETAIL_MEMORY_MAX_ENTRIES = 500;
const pendingTopicDetailRequests = new Map();
const topicDetailMemoryCache = new Map();
const TOPIC_DETAIL_BODY_SCHEMA = {
  topic:     { type: 'string', required: true, minLength: 1, maxLength: 200 },
  roleTitle: { type: 'string', required: true, minLength: 1, maxLength: 100 },
  context:   { type: 'string', required: false, maxLength: 500 },
};

function normalizeCachePart(value) {
  return String(value || '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ');
}

function isCompleteDetail(detail) {
  return Boolean(
    detail
      && detail.definition
      && detail.descriptionPoints
      && detail.usagePoints
      && detail.example
      && detail.illustration
  );
}

function responseWithMeta(detail, source, startedAt) {
  const durationMs = Date.now() - startedAt;
  return NextResponse.json(
    { detail, source, durationMs },
    {
      headers: {
        'X-Topic-Source': source,
        'X-Topic-Duration-Ms': String(durationMs),
      },
    },
  );
}

function getMemoryCache(key) {
  const cached = topicDetailMemoryCache.get(key);
  if (!cached) return null;

  if (Date.now() > cached.expiresAt) {
    topicDetailMemoryCache.delete(key);
    return null;
  }

  topicDetailMemoryCache.delete(key);
  topicDetailMemoryCache.set(key, cached);
  return cached.detail;
}

function setMemoryCache(key, detail) {
  if (!isCompleteDetail(detail)) return;

  if (topicDetailMemoryCache.size >= TOPIC_DETAIL_MEMORY_MAX_ENTRIES) {
    const oldestKey = topicDetailMemoryCache.keys().next().value;
    if (oldestKey) topicDetailMemoryCache.delete(oldestKey);
  }

  topicDetailMemoryCache.set(key, {
    detail,
    expiresAt: Date.now() + TOPIC_DETAIL_MEMORY_TTL_MS,
  });
}

function getRateLimitIdentifier(request) {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || 'anonymous';
}

const TOPIC_DETAIL_OPENAI_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    definition: {
      type: 'string',
    },
    descriptionPoints: {
      type: 'array',
      items: { type: 'string' },
    },
    usagePoints: {
      type: 'array',
      items: { type: 'string' },
    },
    example: {
      type: 'string',
    },
    illustration: {
      type: 'string',
    },
  },
  required: ['definition', 'descriptionPoints', 'usagePoints', 'example', 'illustration'],
};

export async function POST(request) {
  const startedAt = Date.now();

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const validation = validateBody(body, TOPIC_DETAIL_BODY_SCHEMA);
  if (!validation.valid) {
    return NextResponse.json(
      { error: 'Validation failed.', details: validation.errors },
      { status: 422 },
    );
  }

  const { topic, context, roleTitle } = body;

  try {
    const normalizedRole = normalizeCachePart(roleTitle);
    const normalizedTopic = normalizeCachePart(topic);
    const topicHash = `${normalizedRole}_${normalizedTopic}`;
    const redisKey = `topic-detail:v1:${topicHash}`;

    const memoryCachedDetail = getMemoryCache(redisKey);
    if (memoryCachedDetail) {
      return responseWithMeta(memoryCachedDetail, 'memory-cache', startedAt);
    }

    try {
      const cachedDetail = await getFromCache(redisKey);
      if (isCompleteDetail(cachedDetail)) {
        setMemoryCache(redisKey, cachedDetail);
        return responseWithMeta(cachedDetail, 'redis-cache', startedAt);
      }
    } catch (cacheError) {
      console.warn('[topic-detail] Redis cache read failed:', cacheError?.message);
    }

    const existingCache = await prisma.topicExplanationCache.findUnique({ where: { topicHash } });
    if (existingCache) {
      const detail = typeof existingCache.payload === 'string'
        ? JSON.parse(existingCache.payload)
        : existingCache.payload;
      if (isCompleteDetail(detail)) {
        setMemoryCache(redisKey, detail);
        try {
          await setInCache(redisKey, detail, TOPIC_DETAIL_CACHE_TTL_SECONDS);
        } catch (cacheError) {
          console.warn('[topic-detail] Redis cache warm failed:', cacheError?.message);
        }
        return responseWithMeta(detail, 'database-cache', startedAt);
      }
    }

    const pendingRequest = pendingTopicDetailRequests.get(redisKey);
    if (pendingRequest) {
      const detail = await pendingRequest;
      setMemoryCache(redisKey, detail);
      return responseWithMeta(detail, 'shared-live-api', startedAt);
    }

    const rlResult = await rateLimit(getRateLimitIdentifier(request), {
      limit: 10,
      window: 60,
      prefix: 'rl:topic:',
    });
    if (rlResult) return rlResult;

    const generationPromise = generateStructuredJson({
        systemPrompt:
          'You are an expert AI tutor. For the provided sub-topic, provide a clear definition. Then provide a simple description in short bullet points. Then provide practical usage bullet points. Then provide one real-world example in very simple language. Finally, provide one short code example or practical illustration that helps a learner understand the concept quickly. Return JSON only adhering strictly to the schema provided.',
        userPayload: { role: roleTitle, topicToExplain: topic, expectedOutcomes: context },
        geminiSchema: TOPIC_DETAIL_SCHEMA,
        openAiSchema: TOPIC_DETAIL_OPENAI_SCHEMA,
        schemaName: 'topic_detail',
        temperature: 0.3,
      })
      .finally(() => pendingTopicDetailRequests.delete(redisKey));

    pendingTopicDetailRequests.set(redisKey, generationPromise);
    const detail = await generationPromise;
    setMemoryCache(redisKey, detail);

    try {
      await setInCache(redisKey, detail, TOPIC_DETAIL_CACHE_TTL_SECONDS);
    } catch (cacheError) {
      console.warn('[topic-detail] Redis cache write failed:', cacheError?.message);
    }

    try {
      if (existingCache) {
        await prisma.topicExplanationCache.update({ where: { topicHash }, data: { payload: detail } });
      } else {
        await prisma.topicExplanationCache.create({ data: { topicHash, payload: detail } });
      }
    } catch (dbCacheError) {
      console.error('[topic-detail] DB cache write failed:', dbCacheError);
    }

    return responseWithMeta(detail, 'live-api', startedAt);
  } catch (error) {
    return errorResponse(error, '[topic-detail]');
  }
}
