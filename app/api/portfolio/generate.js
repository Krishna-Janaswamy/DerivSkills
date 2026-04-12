import { generateStructuredJson } from '@/lib/ai';
import { NextResponse } from 'next/server';

const portfolioContentSchema = {
  type: 'object',
  properties: {
    executiveSummary: { type: 'string' },
    positioningStatement: { type: 'string' },
    aboutSection: { type: 'string' },
    linkedinSummary: { type: 'string' },
    selectedSkills: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          rationale: { type: 'string' },
          evidence: { type: 'string' }
        },
        required: ['name', 'rationale', 'evidence'],
        additionalProperties: false
      }
    },
    proofHighlights: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          detail: { type: 'string' }
        },
        required: ['title', 'detail'],
        additionalProperties: false
      }
    },
    featuredProjects: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          whyItFits: { type: 'string' },
          bullet: { type: 'string' }
        },
        required: ['name', 'whyItFits', 'bullet'],
        additionalProperties: false
      }
    },
    portfolioSections: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          section: { type: 'string' },
          content: { type: 'string' }
        },
        required: ['section', 'content'],
        additionalProperties: false
      }
    },
    resumeBullets: {
      type: 'array',
      items: { type: 'string' }
    },
    gapAnalysis: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          gap: { type: 'string' },
          whyItMatters: { type: 'string' },
          action: { type: 'string' }
        },
        required: ['gap', 'whyItMatters', 'action'],
        additionalProperties: false
      }
    },
    nextActions: {
      type: 'array',
      items: { type: 'string' }
    },
    retrievalInsights: {
      type: 'array',
      items: { type: 'string' }
    }
  },
  required: [
    'executiveSummary',
    'positioningStatement',
    'aboutSection',
    'linkedinSummary',
    'selectedSkills',
    'proofHighlights',
    'featuredProjects',
    'portfolioSections',
    'resumeBullets',
    'gapAnalysis',
    'nextActions',
    'retrievalInsights'
  ],
  additionalProperties: false
};

function normalizeText(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function splitIntoSnippets(text, source) {
  const clean = normalizeText(text);
  if (!clean) return [];

  return clean
    .split(/\n{2,}/)
    .map((chunk) => chunk.replace(/\s+/g, ' ').trim())
    .filter(Boolean)
    .map((snippet, index) => ({ source, snippet, index }));
}

function collectQueryTerms({ skills, targetRole, careerGoal, desiredTone }) {
  const terms = new Set();

  normalizeText(targetRole).split(/\W+/).forEach((term) => term && terms.add(term.toLowerCase()));
  normalizeText(careerGoal).split(/\W+/).forEach((term) => term && terms.add(term.toLowerCase()));
  normalizeText(desiredTone).split(/\W+/).forEach((term) => term && terms.add(term.toLowerCase()));

  skills.slice(0, 12).forEach((skill) => {
    normalizeText(skill.name).split(/\W+/).forEach((term) => term && terms.add(term.toLowerCase()));
    normalizeText(skill.roleTitle).split(/\W+/).forEach((term) => term && terms.add(term.toLowerCase()));
  });

  return Array.from(terms);
}

function scoreSnippet(snippet, queryTerms) {
  const haystack = snippet.toLowerCase();
  return queryTerms.reduce((score, term) => {
    if (!term) return score;
    return haystack.includes(term) ? score + 1 : score;
  }, 0);
}

function retrieveRelevantContext({ resumeText, projectNotes, jobDescription, customNotes, skills, targetRole, careerGoal, desiredTone }) {
  const queryTerms = collectQueryTerms({ skills, targetRole, careerGoal, desiredTone });
  const snippets = [
    ...splitIntoSnippets(resumeText, 'resume'),
    ...splitIntoSnippets(projectNotes, 'projects'),
    ...splitIntoSnippets(jobDescription, 'job'),
    ...splitIntoSnippets(customNotes, 'notes')
  ];

  return snippets
    .map((entry) => ({
      ...entry,
      score: scoreSnippet(entry.snippet, queryTerms)
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, 8)
    .map((entry) => `[${entry.source}] ${entry.snippet}`);
}

function buildSkillEvidence(skills) {
  return skills.map((skill) => ({
    name: skill.name,
    roleTitle: skill.roleTitle,
    moduleTitle: skill.moduleTitle,
    proof: `Completed under ${skill.roleTitle}${skill.moduleTitle ? ` in ${skill.moduleTitle}` : ''}${skill.timeSpentHours ? ` with roughly ${skill.timeSpentHours} focused hour${skill.timeSpentHours === 1 ? '' : 's'}` : ''}.`
  }));
}

export async function POST(request) {
  try {
    const {
      skills = [],
      templateId,
      targetRole = '',
      careerGoal = '',
      desiredTone = '',
      userProfile = {},
      resumeText = '',
      projectNotes = '',
      jobDescription = '',
      customNotes = '',
      proofMetrics = {}
    } = await request.json();

    const relevantContext = retrieveRelevantContext({
      resumeText,
      projectNotes,
      jobDescription,
      customNotes,
      skills,
      targetRole,
      careerGoal,
      desiredTone
    });

    const systemPrompt = `
You are building a premium portfolio strategy pack for a technical learner.

Your job is to transform verified learning progress into credible, differentiated portfolio copy and recommendations.

Rules:
- Make the user sound sharp, specific, and honest.
- Use only the provided facts. Do not invent companies, shipped products, or work history.
- Frame verified learning progress as evidence of discipline, direction, and technical depth.
- Prefer proof-backed positioning over hype.
- Keep copy concrete and portfolio-ready.
- If context from retrieved snippets is present, use it carefully and only when it strengthens credibility.
- Featured projects must be realistic build ideas aligned to the verified skills and target role.
- Gap analysis must be constructive and productively actionable.
`;

    const aiResult = await generateStructuredJson({
      systemPrompt,
      userPayload: {
        templateId,
        targetRole: normalizeText(targetRole),
        careerGoal: normalizeText(careerGoal),
        desiredTone: normalizeText(desiredTone),
        userProfile,
        proofMetrics,
        verifiedSkills: buildSkillEvidence(skills),
        retrievedContext: relevantContext
      },
      geminiSchema: portfolioContentSchema,
      openAiSchema: portfolioContentSchema,
      schemaName: 'portfolioContent',
      temperature: 0.7,
    });

    return NextResponse.json({
      content: {
        ...aiResult,
        retrievedContext
      }
    });
  } catch (error) {
    console.error('Portfolio generation failed', error);
    return NextResponse.json({ error: 'Failed to generate portfolio content.' }, { status: 500 });
  }
}
