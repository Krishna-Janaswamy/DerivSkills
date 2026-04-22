import { NextResponse }  from 'next/server';
import { prisma }         from '@/lib/prisma';
import { generateStructuredJson } from '@/lib/ai';
import { withSecurity, errorResponse } from '@/lib/api-security';
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
  const guard = await withSecurity(request, {
    auth:      false,
    rateLimit: { limit: 10, window: 60, prefix: 'rl:topic:' },
    schema: {
      topic:     { type: 'string', required: true, minLength: 1, maxLength: 200 },
      roleTitle: { type: 'string', required: true, minLength: 1, maxLength: 100 },
      context:   { type: 'string', required: false, maxLength: 500 },
    },
  });
  if (!guard.ok) return guard.response;
  const { topic, context, roleTitle } = guard.body;

  try {
    const normalizedRole = normalizeCachePart(roleTitle);
    const normalizedTopic = normalizeCachePart(topic);
    const topicHash = `${normalizedRole}_${normalizedTopic}`;
    const redisKey = `topic-detail:v1:${topicHash}`;

    try {
      const cachedDetail = await getFromCache(redisKey);
      if (isCompleteDetail(cachedDetail)) {
        return NextResponse.json({ detail: cachedDetail, source: 'redis-cache' });
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
        try {
          await setInCache(redisKey, detail, TOPIC_DETAIL_CACHE_TTL_SECONDS);
        } catch (cacheError) {
          console.warn('[topic-detail] Redis cache warm failed:', cacheError?.message);
        }
        return NextResponse.json({ detail, source: 'database-cache' });
      }
    }

    const detail = await generateStructuredJson({
      systemPrompt:
        'You are an expert AI tutor. For the provided sub-topic, provide a clear definition. Then provide a simple description in short bullet points. Then provide practical usage bullet points. Then provide one real-world example in very simple language. Finally, provide one short code example or practical illustration that helps a learner understand the concept quickly. Return JSON only adhering strictly to the schema provided.',
      userPayload: { role: roleTitle, topicToExplain: topic, expectedOutcomes: context },
      geminiSchema: TOPIC_DETAIL_SCHEMA,
      openAiSchema: TOPIC_DETAIL_OPENAI_SCHEMA,
      schemaName: 'topic_detail',
      temperature: 0.3,
    });

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

    return NextResponse.json({ detail, source: 'live-api' });
  } catch (error) {
    return errorResponse(error, '[topic-detail]');
  }
}
