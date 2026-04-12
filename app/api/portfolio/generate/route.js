import { generateStructuredJson } from '@/lib/ai';
import { NextResponse } from 'next/server';

const resumeSchema = {
  type: 'object',
  properties: {
    basics: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        headline: { type: 'string' },
        location: { type: 'string' },
        targetRole: { type: 'string' },
        summary: { type: 'string' }
      },
      required: ['name', 'headline', 'location', 'targetRole', 'summary'],
      additionalProperties: false
    },
    coreSkills: {
      type: 'array',
      items: { type: 'string' }
    },
    learningHighlights: {
      type: 'array',
      items: { type: 'string' }
    },
    experienceHighlights: {
      type: 'array',
      items: { type: 'string' }
    },
    projects: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          subtitle: { type: 'string' },
          bullets: {
            type: 'array',
            items: { type: 'string' }
          }
        },
        required: ['name', 'subtitle', 'bullets'],
        additionalProperties: false
      }
    },
    education: {
      type: 'array',
      items: { type: 'string' }
    },
    atsKeywords: {
      type: 'array',
      items: { type: 'string' }
    },
    improvementSuggestions: {
      type: 'array',
      items: { type: 'string' }
    },
    retrievedContext: {
      type: 'array',
      items: { type: 'string' }
    }
  },
  required: [
    'basics',
    'coreSkills',
    'learningHighlights',
    'experienceHighlights',
    'projects',
    'education',
    'atsKeywords',
    'improvementSuggestions',
    'retrievedContext'
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

  skills.slice(0, 14).forEach((skill) => {
    normalizeText(skill.name).split(/\W+/).forEach((term) => term && terms.add(term.toLowerCase()));
    normalizeText(skill.roleTitle).split(/\W+/).forEach((term) => term && terms.add(term.toLowerCase()));
  });

  return Array.from(terms);
}

function scoreSnippet(snippet, queryTerms) {
  const haystack = snippet.toLowerCase();
  return queryTerms.reduce((score, term) => score + (term && haystack.includes(term) ? 1 : 0), 0);
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
    proof: `Completed ${skill.name} under ${skill.roleTitle}${skill.moduleTitle ? ` in ${skill.moduleTitle}` : ''}${skill.timeSpentHours ? ` with roughly ${skill.timeSpentHours} focused hour${skill.timeSpentHours === 1 ? '' : 's'}` : ''}.`
  }));
}

function toClientErrorMessage(error) {
  const message = error instanceof Error ? error.message : 'Failed to generate resume content.';

  if (message.includes('Missing AI configuration')) {
    return 'AI setup is missing. Add GEMINI_API_KEY, OPENAI_API_KEY, or GROQ_API_KEY in your environment and restart the server.';
  }

  if (message.includes('Missing GEMINI_API_KEY') || message.includes('Missing OPENAI_API_KEY') || message.includes('Missing GROQ_API_KEY')) {
    return 'An AI provider key is missing. Check your environment variables and restart the server.';
  }

  if (message.includes('request failed')) {
    return `The AI provider request failed. ${message}`;
  }

  return message;
}

function buildSummary({ userProfile, targetRole, proofMetrics, relevantContext }) {
  const role = normalizeText(targetRole) || normalizeText(userProfile?.presentRole) || 'Software Engineer';
  const experience = normalizeText(userProfile?.yearsExperience);
  const proofLine = proofMetrics?.totalVerifiedSkills
    ? `Backed by ${proofMetrics.totalVerifiedSkills} verified skill${proofMetrics.totalVerifiedSkills === 1 ? '' : 's'} tracked through structured learning.`
    : 'Backed by structured self-driven technical learning.';
  const contextLine = relevantContext.length
    ? 'Resume and project context were used to align the draft more closely to the target role.'
    : 'Focused on translating learning progress into clear role-ready positioning.';

  return `${experience ? `${experience} years of experience and ` : ''}aspiring ${role} with a strong focus on practical, ATS-friendly communication of technical ability. ${proofLine} ${contextLine}`.trim();
}

function buildFallbackResume({
  skills,
  targetRole,
  userProfile,
  proofMetrics,
  relevantContext,
}) {
  const primaryRole = normalizeText(targetRole) || normalizeText(userProfile?.presentRole) || 'Software Engineer';
  const strongestTrack = proofMetrics?.strongestTracks?.[0]?.roleTitle || primaryRole;
  const coreSkills = skills.slice(0, 10).map((skill) => skill.name);
  const learningHighlights = skills.slice(0, 5).map((skill) => (
    `Completed ${skill.name} as part of the ${skill.roleTitle} roadmap${skill.moduleTitle ? ` under ${skill.moduleTitle}` : ''}${skill.timeSpentHours ? ` with roughly ${skill.timeSpentHours} focused hour${skill.timeSpentHours === 1 ? '' : 's'}` : ''}.`
  ));

  const projects = [
    {
      name: `${primaryRole} Portfolio Project`,
      subtitle: `Role-aligned build for ${primaryRole}`,
      bullets: [
        `Designed a project that demonstrates ${coreSkills.slice(0, 3).join(', ')} in a practical, portfolio-ready format.`,
        `Focused the implementation on clear architecture, maintainable code, and recruiter-friendly presentation of technical decisions.`,
        `Used project documentation and execution notes to translate learning progress into proof-backed resume value.`
      ]
    },
    {
      name: `${strongestTrack} Systems Exercise`,
      subtitle: `Learning-backed proof project`,
      bullets: [
        `Built a focused exercise around ${strongestTrack} concepts to reinforce hands-on understanding of production-style workflows.`,
        `Captured technical tradeoffs, implementation details, and outcomes in resume-ready bullet format.`,
        `Positioned the project as evidence of consistency, problem solving, and practical technical growth.`
      ]
    }
  ];

  const education = [];

  if (normalizeText(userProfile?.collegeName)) {
    education.push(
      `${normalizeText(userProfile.collegeName)}${normalizeText(userProfile?.branch) ? ` - ${normalizeText(userProfile.branch)}` : ''}`
    );
  } else {
    education.push('Education details can be added or edited here before downloading.');
  }

  return {
    basics: {
      name: normalizeText(userProfile?.name) || 'Your Name',
      headline: normalizeText(userProfile?.headline) || `ATS-Friendly ${primaryRole} Resume`,
      location: normalizeText(userProfile?.location) || '',
      targetRole: primaryRole,
      summary: buildSummary({ userProfile, targetRole: primaryRole, proofMetrics, relevantContext }),
    },
    coreSkills: coreSkills.length ? coreSkills : ['JavaScript', 'React', 'APIs', 'Git', 'Problem Solving'],
    learningHighlights: learningHighlights.length ? learningHighlights : ['Structured technical learning is in progress and can be expanded with more verified topics.'],
    experienceHighlights: [
      `Translating structured learning progress into role-ready resume bullets for ${primaryRole}.`,
      `Demonstrated consistency through tracked roadmap completion and focused technical study.`,
      `Prepared portfolio-quality projects and ATS-friendly positioning aligned to the target role.`
    ],
    projects,
    education,
    atsKeywords: Array.from(new Set([primaryRole, strongestTrack, ...coreSkills])).slice(0, 12),
    improvementSuggestions: [
      'Add one real project with measurable outcomes to strengthen recruiter confidence.',
      'Tailor the summary and skills list against a specific job description before applying.',
      'Replace placeholder education or project entries with real details before downloading.'
    ],
    retrievedContext: relevantContext,
    generationMode: 'fallback',
  };
}

export async function POST(request) {
  let payload = {};
  let relevantContext = [];

  try {
    payload = await request.json();

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
    } = payload;

    if (!templateId || typeof templateId !== 'string') {
      return NextResponse.json({ error: 'Please choose a resume style before generating content.' }, { status: 400 });
    }

    if (!Array.isArray(skills) || skills.length === 0) {
      return NextResponse.json({ error: 'No verified skills were found yet. Complete a few topics first, then retry.' }, { status: 400 });
    }

    relevantContext = retrieveRelevantContext({
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
You are an expert ATS resume writer for technical candidates.

Your job is to generate a strong V1 resume draft using:
- verified learning progress
- profile details
- optional pasted resume context
- optional job description

Rules:
- Keep the resume ATS-friendly and honest.
- Do not invent employment history, shipped products, companies, or metrics.
- Use learning progress as proof of direction, consistency, and technical readiness.
- Write concise, impact-oriented bullets.
- Make the summary targeted to the role.
- If the user has no strong work history, lean on learning proof, projects, and capability framing.
- Project ideas must be realistic and portfolio-worthy.
- ATS keywords should align to the target role and supplied job description when present.
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
      geminiSchema: resumeSchema,
      openAiSchema: resumeSchema,
      schemaName: 'resumeDraft',
      temperature: 0.7,
    });

    return NextResponse.json({
      content: {
        ...aiResult,
        retrievedContext: relevantContext,
        generationMode: 'ai',
      }
    });
  } catch (error) {
    console.error('Resume generation failed', error);

    const fallbackContent = buildFallbackResume({
      skills: Array.isArray(payload.skills) ? payload.skills : [],
      targetRole: payload.targetRole,
      userProfile: payload.userProfile || {},
      proofMetrics: payload.proofMetrics || {},
      relevantContext,
    });

    return NextResponse.json({
      content: fallbackContent,
      error: toClientErrorMessage(error),
    });
  }
}
