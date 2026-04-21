import { generateStructuredJson } from '@/lib/ai';
import { errorResponse }          from '@/lib/api-security';


export async function POST(req) {
  try {
    const {
      section,
      sectionContent,
      fullResumeText,
      faultsForSection,
      targetRole,
    } = await req.json();

    const role = targetRole || "Software Engineer";
    const faultContext = (faultsForSection || [])
      .map((f, i) => `${i + 1}. ${f.category}: ${f.issue}`)
      .join("\n") || "Improve generally for ATS.";

    // ── Per-section prompts: short, unambiguous, model-friendly ──────────────
    // personalInfo is handled differently — it gets the full resume text
    // and must extract/improve each field. All other sections get the parsed
    // section JSON and must return the improved version in the correct format.

    let systemPrompt, userContent;

    if (section === "personalInfo") {
      systemPrompt = `You are an expert resume writer. Extract and improve the candidate's personal information from their resume text.
Return ONLY plain text lines in this exact format (one field per line):
name: <full name>
email: <email address>
phone: <phone number>
location: <City, Country>
linkedin: <LinkedIn URL>
github: <GitHub URL>

Rules:
- Only include fields you can find in the resume text
- No JSON, no brackets, no quotes, no extra text
- If a field is missing, suggest an improvement or skip it
- Return improved versions in the 'improved' field`;

      userContent = {
        targetRole: role,
        resumeText: (sectionContent || fullResumeText || "").slice(0, 1800),
        faults: faultContext,
      };
    } else {
      const formatMap = {
        summary: "A single improved paragraph (50-80 words) with strong action verbs and role keywords.",
        experience: "Bullet points only — each line starts with '•'. No headers, no job titles, no dates.",
        skills: "Comma-separated list of skills to ADD (e.g. TypeScript, Docker, Redis).",
        projects: "2-3 sentence description: 'Built X using Y, achieving Z'.",
        education: "One line per entry: Degree | Institution | Year (e.g. B.Tech CS | IIT Bombay | 2019-2023).",
        certifications: "Comma-separated list of 5-8 industry-standard certification names to PURSUE (e.g. AWS Certified Solutions Architect – Associate, Google Cloud Professional Data Engineer). Only include real, widely-recognized certifications relevant to the role and skills. Do NOT include certs already listed in existing certifications.",
      };


      systemPrompt = `You are an expert ATS resume writer for ${role} roles.
Improve the candidate's ${section} section based on their ACTUAL content.
Do NOT invent experience — only enhance what exists.
Target ATS keywords for ${role} in 2025.
Format for 'improved': ${formatMap[section] || "Improved plain text."}`;

      userContent = {
        targetRole: role,
        section,
        currentContent: (sectionContent || "").slice(0, 1500),
        resumeContext: (fullResumeText || "").slice(0, 800),
        faults: faultContext,
      };
    }

    const schema = {
      type: "object",
      additionalProperties: false,
      required: ["improved", "changes", "whyItHelps"],
      properties: {
        improved: {
          type: "string",
          description: "The improved content in the exact format specified.",
        },
        changes: {
          type: "array",
          items: { type: "string" },
          description: "2-3 specific changes made (reference actual content, not generic advice).",
        },
        whyItHelps: {
          type: "string",
          description: "One sentence on ATS impact: e.g. '+8 points — adds Docker, Kubernetes keywords.'",
        },
      },
    };

    const result = await generateStructuredJson({
      systemPrompt,
      userPayload: userContent,
      geminiSchema: schema,
      openAiSchema: schema,
      schemaName: "ResumeSectionFix",
      temperature: 0.3,
    });

    // Normalize response — Groq json_object mode can return unexpected types
    const improved = typeof result.improved === 'string'
      ? result.improved
      : Array.isArray(result.improved)
        ? result.improved.join('\n')
        : String(result.improved ?? '');

    let changes = result.changes;
    if (!Array.isArray(changes)) {
      changes = typeof changes === 'string'
        ? changes.split(/[•\n]+/).map(s => s.trim()).filter(Boolean)
        : changes ? Object.values(changes) : [];
    }

    return Response.json({ section, improved, changes, whyItHelps: result.whyItHelps || '' });

  } catch (err) {
    return errorResponse(err, '[suggest-fix]');
  }
}
