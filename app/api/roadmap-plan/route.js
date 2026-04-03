import { NextResponse } from 'next/server';
import { getRoleById } from '@/src/data/roles';
import { generateStructuredJson } from '@/lib/ai';

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

const ROADMAP_PLAN_OPENAI_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    overview: { type: 'string' },
    roleFit: { type: 'string' },
    targetTimeline: { type: 'string' },
    weeklyPlan: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          phase: { type: 'string' },
          focus: { type: 'string' },
          duration: { type: 'string' },
          outcome: { type: 'string' },
          subtopics: {
            type: 'array',
            items: { type: 'string' },
          },
        },
        required: ['phase', 'focus', 'duration', 'outcome', 'subtopics'],
      },
    },
    priorities: {
      type: 'array',
      items: { type: 'string' },
    },
    firstSteps: {
      type: 'array',
      items: { type: 'string' },
    },
  },
  required: ['overview', 'roleFit', 'targetTimeline', 'weeklyPlan', 'priorities', 'firstSteps'],
};

export async function POST(request) {
  try {
    const { roleId, experienceLevel, weeklyHours, goal, background } = await request.json();
    const role = getRoleById(roleId);

    if (!role) {
      return NextResponse.json({ error: 'Unknown role selected.' }, { status: 400 });
    }

    const plan = await generateStructuredJson({
      systemPrompt:
        'You are an expert AI career roadmap coach. Create concise, professional, realistic study plans tailored to the selected AI role. Use the provided roadmap modules as the backbone. Return JSON only.',
      userPayload: {
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
        instructions:
          'Build a personalized study plan using the exact role roadmap. Keep guidance practical, realistic, and hiring-focused. Mention where the learner should spend extra attention based on their background.',
      },
      geminiSchema: ROADMAP_PLAN_SCHEMA,
      openAiSchema: ROADMAP_PLAN_OPENAI_SCHEMA,
      schemaName: 'roadmap_plan',
      temperature: 0.2,
    });

    return NextResponse.json({ plan });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unable to generate AI roadmap plan.' },
      { status: 500 }
    );
  }
}
