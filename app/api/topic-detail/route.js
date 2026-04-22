import { NextResponse }  from 'next/server';
import { prisma }         from '@/lib/prisma';
import { generateStructuredJson } from '@/lib/ai';
import { withSecurity, errorResponse } from '@/lib/api-security';


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
    const topicHash = `${roleTitle.toLowerCase().trim()}_${topic.toLowerCase().trim()}`;

    const existingCache = await prisma.topicExplanationCache.findUnique({ where: { topicHash } });
    if (existingCache) {
      const detail = typeof existingCache.payload === 'string'
        ? JSON.parse(existingCache.payload)
        : existingCache.payload;
      if (detail.descriptionPoints && detail.illustration) {
        return NextResponse.json({ detail });
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

    if (existingCache) {
      prisma.topicExplanationCache.update({ where: { topicHash }, data: { payload: detail } })
        .catch(err => console.error('Cache Update Error:', err));
    } else {
      prisma.topicExplanationCache.create({ data: { topicHash, payload: detail } })
        .catch(err => console.error('Cache Write Error:', err));
    }

    return NextResponse.json({ detail });
  } catch (error) {
    return errorResponse(error, '[topic-detail]');
  }
}

