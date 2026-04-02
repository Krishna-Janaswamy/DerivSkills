import { NextResponse } from 'next/server';
import { getRoleById } from '@/src/data/roles';

// Using standard Gemini schema
const ROADMAP_PLAN_SCHEMA = {
  type: 'OBJECT',
  properties: {
    overview: { type: 'STRING' },
    roleFit: { type: 'STRING' },
    targetTimeline: { type: 'STRING' },
    weeklyPlan: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          phase: { type: 'STRING' },
          focus: { type: 'STRING' },
          duration: { type: 'STRING' },
          outcome: { type: 'STRING' },
          subtopics: {
            type: 'ARRAY',
            items: { type: 'STRING' },
            description: 'List of specific sub-topics/skills for this phase (like Discovery, Priorities, etc.)'
          }
        },
        required: ['phase', 'focus', 'duration', 'outcome', 'subtopics']
      }
    },
    priorities: {
      type: 'ARRAY',
      items: { type: 'STRING' }
    },
    firstSteps: {
      type: 'ARRAY',
      items: { type: 'STRING' }
    }
  },
  required: ['overview', 'roleFit', 'targetTimeline', 'weeklyPlan', 'priorities', 'firstSteps']
};

export async function POST(request) {
  try {
    const { roleId, experienceLevel, weeklyHours, goal, background } = await request.json();
    
    // Check environment variable or fallback to provided key if missing
    const apiKey = process.env.GEMINI_API_KEY || 'AIzaSyB1GekwYs5AZJvKRvPr-iF3LYvv6LN39u4';
    const role = getRoleById(roleId);

    if (!role) {
      return NextResponse.json({ error: 'Unknown role selected.' }, { status: 400 });
    }

    const payload = {
      systemInstruction: {
        parts: [{ text: 'You are an expert AI career roadmap coach. Create concise, professional, realistic study plans tailored to the selected AI role. Use the provided roadmap modules as the backbone. Return JSON only.' }]
      },
      contents: [{
        parts: [{
          text: JSON.stringify({
            role: {
              title: role.title,
              summary: role.summary,
              goalWindow: role.goalWindow,
              marketDemand: role.marketDemand,
              roadmap: role.roadmap,
            },
            learnerProfile: {
              experienceLevel,
              weeklyHours,
              goal,
              background,
            },
            instructions: 'Build a personalized study plan using the exact role roadmap. Keep guidance practical, realistic, and hiring-focused. Mention where the learner should spend extra attention based on their background.'
          })
        }]
      }],
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: ROADMAP_PLAN_SCHEMA,
        temperature: 0.2
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
    const plan = JSON.parse(rawText);

    return NextResponse.json({ plan });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unable to generate AI roadmap plan.' },
      { status: 500 }
    );
  }
}
