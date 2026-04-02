import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";

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
    resources: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          title: { type: 'STRING' },
          url: { type: 'STRING' },
          platform: { type: 'STRING', description: '"YouTube" or "Google"' },
          description: { type: 'STRING' },
        },
        required: ['title', 'url', 'platform', 'description'],
      },
      description: 'Exactly 2 YouTube videos and 2 Google Search topics.',
    },
  },
  required: ['definition', 'descriptionPoints', 'usagePoints', 'example', 'resources'],
};

export async function POST(request) {
  try {
    const { topic, context, roleTitle } = await request.json();

    if (!topic || !roleTitle) {
       return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    const topicHash = `${roleTitle.toLowerCase().trim()}_${topic.toLowerCase().trim()}`;

    const existingCache = await prisma.topicExplanationCache.findUnique({
      where: { topicHash }
    });

    if (existingCache) {
      const detail = typeof existingCache.payload === 'string' 
         ? JSON.parse(existingCache.payload) 
         : existingCache.payload;
         
      // Invalidate cache if it's the old schema without descriptionPoints
      if (detail.descriptionPoints) {
        return NextResponse.json({ detail });
      }
    }

    const apiKey = process.env.GEMINI_API_KEY || 'AIzaSyB1GekwYs5AZJvKRvPr-iF3LYvv6LN39u4';

    const payload = {
      systemInstruction: {
        parts: [{ text: 'You are an expert AI tutor. For the provided sub-topic, provide a clear definition. Then provide a "description" in bullet points. Then provide "usage" in bullet points. Then provide a practical real-world example. Finally, provide exactly 4 high-quality reference links (exactly 2 top-trending YouTube channels/videos and exactly 2 highly relevant Google Search recommendations like official docs or top articles). Return JSON only adhering strictly to the schema provided.' }]
      },
      contents: [{
        parts: [{
          text: JSON.stringify({
            role: roleTitle,
            topicToExplain: topic,
            expectedOutcomes: context,
          })
        }]
      }],
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: TOPIC_DETAIL_SCHEMA,
        temperature: 0.3
      }
    };

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: `Gemini request failed: ${JSON.stringify(data)}` }, { status: response.status });
    }

    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
    const detail = JSON.parse(rawText);

    // Overwrite the cache if it existed as the old format, or create it new
    if (existingCache) {
      prisma.topicExplanationCache.update({
        where: { topicHash },
        data: { payload: detail }
      }).catch(err => console.error("Cache Update Error:", err));
    } else {
      prisma.topicExplanationCache.create({
        data: {
          topicHash,
          payload: detail
        }
      }).catch(err => console.error("Cache Write Error:", err));
    }

    return NextResponse.json({ detail });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unable to generate topic detail.' },
      { status: 500 }
    );
  }
}
