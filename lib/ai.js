// ─────────────────────────────────────────────────────────────────────────────
// lib/ai.js  –  Multi-provider AI with automatic fallback
// Order: Claude → Gemini → Groq → OpenAI
// All providers use plain JSON instructions (no schema enforcement) — works
// reliably across all model versions without compatibility issues.
// ─────────────────────────────────────────────────────────────────────────────

// Build a compact field list from a JSON schema so we can describe it in prompts
function schemaFieldList(schema) {
  return Object.keys(schema?.properties || {}).map(k => `"${k}"`).join(', ');
}

// Trim long text fields to keep within token limits
function trimPayloadText(payload, maxChars = 1800) {
  if (!payload || typeof payload !== 'object') return payload;
  const out = { ...payload };
  const LONG_KEYS = [
    'resumeText','fullResumeContext','sectionContent',
    'currentSectionContent','currentContent','resumeContext','jobDescription',
  ];
  for (const key of LONG_KEYS) {
    if (typeof out[key] === 'string' && out[key].length > maxChars) {
      out[key] = out[key].slice(0, maxChars) + '\n[truncated]';
    }
  }
  return out;
}

// Parse JSON — strip markdown fences if the model wrapped the output
function parseJSON(raw) {
  const clean = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim();
  return JSON.parse(clean);
}

// ── Claude (Anthropic) ────────────────────────────────────────────────────────
async function callClaude({ systemPrompt, userPayload, schema, temperature = 0.2 }) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  const model  = process.env.CLAUDE_MODEL || 'claude-3-5-haiku-20241022';
  if (!apiKey) throw new Error('Missing ANTHROPIC_API_KEY');

  const fields = schemaFieldList(schema);
  const system = `${systemPrompt}\n\nReturn valid JSON only — no markdown, no extra text.\nInclude these fields: ${fields}.`;

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model, temperature, max_tokens: 2048,
      system,
      messages: [{ role: 'user', content: JSON.stringify(trimPayloadText(userPayload)) }],
    }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(`Claude: ${data?.error?.message || JSON.stringify(data)}`);

  const raw = data?.content?.[0]?.text;
  if (!raw) throw new Error('Claude: empty response');
  console.log('[AI] ✓ Claude');
  return parseJSON(raw);
}

// ── Gemini ────────────────────────────────────────────────────────────────────
async function callGemini({ systemPrompt, userPayload, schema, temperature = 0.2 }) {
  const apiKey = process.env.GEMINI_API_KEY;
  const model  = process.env.GEMINI_MODEL || 'gemini-1.5-flash';
  if (!apiKey) throw new Error('Missing GEMINI_API_KEY');

  const fields = schemaFieldList(schema);
  const system = `${systemPrompt}\n\nReturn valid JSON only — no markdown, no extra text.\nInclude these fields: ${fields}.`;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: system }] },
        contents: [{ parts: [{ text: JSON.stringify(trimPayloadText(userPayload)) }] }],
        generationConfig: {
          responseMimeType: 'application/json', // tells Gemini to return JSON; no responseSchema needed
          temperature,
        },
      }),
    },
  );

  const data = await res.json();
  if (!res.ok) throw new Error(`Gemini: ${data?.error?.message || JSON.stringify(data)}`);

  const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!raw) throw new Error('Gemini: empty response');
  console.log('[AI] ✓ Gemini');
  return parseJSON(raw);
}

// ── Groq ──────────────────────────────────────────────────────────────────────
async function callGroq({ systemPrompt, userPayload, schema, temperature = 0.2 }) {
  const apiKey = process.env.GROQ_API_KEY;
  const model  = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';
  if (!apiKey) throw new Error('Missing GROQ_API_KEY');

  const fields = schemaFieldList(schema);
  const system = `${systemPrompt}\n\nReturn valid JSON only — no markdown, no extra text.\nInclude these fields: ${fields}.`;

  const doReq = async () => {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model, temperature,
        messages: [
          { role: 'system', content: system },
          { role: 'user',   content: JSON.stringify(trimPayloadText(userPayload)) },
        ],
        response_format: { type: 'json_object' },
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      const errCode = data?.error?.code;
      const errMsg  = data?.error?.message || '';
      if (res.status === 429 || errCode === 'rate_limit_exceeded') {
        const match  = errMsg.match(/try again in ([\d.]+)s/i);
        const waitMs = match ? Math.ceil(parseFloat(match[1]) * 1000) + 500 : 20000;
        console.warn(`[Groq] Rate limited — waiting ${Math.ceil(waitMs/1000)}s`);
        await new Promise(r => setTimeout(r, waitMs));
        return doReq();
      }
      throw new Error(`Groq: ${errMsg || JSON.stringify(data)}`);
    }

    const raw = data?.choices?.[0]?.message?.content;
    if (!raw) throw new Error('Groq: empty response');
    console.log('[AI] ✓ Groq');
    return parseJSON(raw);
  };

  return doReq();
}

// ── OpenAI ────────────────────────────────────────────────────────────────────
async function callOpenAI({ systemPrompt, userPayload, schemaName, schema, temperature = 0.2 }) {
  const apiKey = process.env.OPENAI_API_KEY;
  const model  = process.env.OPENAI_MODEL || 'gpt-4o-mini';
  if (!apiKey) throw new Error('Missing OPENAI_API_KEY');

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model, temperature,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user',   content: JSON.stringify(userPayload) },
      ],
      response_format: {
        type: 'json_schema',
        json_schema: { name: schemaName, strict: true, schema },
      },
    }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(`OpenAI: ${data?.error?.message || JSON.stringify(data)}`);

  const raw = data?.choices?.[0]?.message?.content;
  if (!raw) throw new Error('OpenAI: empty response');
  console.log('[AI] ✓ OpenAI');
  return parseJSON(raw);
}

// ── Main export ───────────────────────────────────────────────────────────────
export async function generateStructuredJson({
  systemPrompt,
  userPayload,
  geminiSchema,
  openAiSchema,
  schemaName,
  temperature = 0.2,
}) {
  const keys = {
    claude: !!process.env.ANTHROPIC_API_KEY,
    gemini: !!process.env.GEMINI_API_KEY,
    groq:   !!process.env.GROQ_API_KEY,
    openai: !!process.env.OPENAI_API_KEY,
  };
  console.log('[AI] Keys:', keys);

  const errors = [];

  if (keys.claude) {
    try { return await callClaude({ systemPrompt, userPayload, schema: openAiSchema, temperature }); }
    catch (e) { errors.push(`Claude: ${e.message}`); console.error('[AI] Claude failed:', e.message); }
  }

  if (keys.gemini) {
    try { return await callGemini({ systemPrompt, userPayload, schema: geminiSchema, temperature }); }
    catch (e) { errors.push(`Gemini: ${e.message}`); console.error('[AI] Gemini failed:', e.message); }
  }

  if (keys.groq) {
    try { return await callGroq({ systemPrompt, userPayload, schema: openAiSchema, temperature }); }
    catch (e) { errors.push(`Groq: ${e.message}`); console.error('[AI] Groq failed:', e.message); }
  }

  if (keys.openai) {
    try { return await callOpenAI({ systemPrompt, userPayload, schemaName, schema: openAiSchema, temperature }); }
    catch (e) { errors.push(`OpenAI: ${e.message}`); console.error('[AI] OpenAI failed:', e.message); }
  }

  if (!Object.values(keys).some(Boolean)) {
    throw new Error('No AI keys configured in .env.local');
  }

  throw new Error(errors.join(' | '));
}
