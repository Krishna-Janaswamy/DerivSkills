import { generateStructuredJson } from "@/lib/ai";

export async function POST(req) {
  try {
    const { resumeText, jobDescription, targetRole } = await req.json();

    if (!resumeText || resumeText.trim().length < 50) {
      return Response.json({ error: "Please upload a valid resume. Could not extract enough text." }, { status: 400 });
    }

    const role = targetRole || "General Software Engineering / Tech Role";
    const jd   = jobDescription || "Not provided — evaluate against general industry standards.";

    const systemPrompt = `You are a strict ATS (Applicant Tracking System) expert and Senior Technical Recruiter.
Analyze the resume for the target role: "${role}".

CRITICAL: You MUST return EVERY field in the JSON schema, no exceptions.
Even if the resume is blank, garbled, or unreadable, return:
  - overallScore: an integer (use 5 for unreadable/garbled)
  - faultAreas: array of issues found (at minimum flag that the resume is unreadable)
  - matchingKeywords: [] (empty array if nothing matches)
  - missingKeywords: [] (empty array if no JD provided)
  - strengths: [] (empty array if no strengths found)
  - sectionScores: object with all 6 keys set to integers (use 5 for unreadable sections)

Scoring guide: unreadable = 5, very poor = 10-25, poor = 25-45, average = 45-65, good = 65-80, excellent = 80-100.`;

    // Groq rule: EVERY property key MUST appear in required[].
    // We cannot use optional fields. The prompt instructs the model to always return all fields.
    const schema = {
      type: "object",
      additionalProperties: false,
      required: ["overallScore", "faultAreas", "matchingKeywords", "missingKeywords", "strengths", "sectionScores"],
      properties: {
        overallScore:      { type: "integer", description: "ATS score 0-100. Use 5 for garbled/unreadable resumes." },
        faultAreas: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            required: ["category", "severity", "issue", "suggestion", "section"],
            properties: {
              category:   { type: "string" },
              severity:   { type: "string", enum: ["High", "Medium", "Low"] },
              issue:      { type: "string" },
              suggestion: { type: "string" },
              section:    { type: "string", enum: ["personalInfo", "summary", "experience", "skills", "projects", "education", "certifications"] },
            },
          },
        },
        matchingKeywords:  { type: "array", items: { type: "string" }, description: "Keywords from resume that match target role. Return [] if none." },
        missingKeywords:   { type: "array", items: { type: "string" }, description: "Important role keywords missing from resume. Return [] if no JD provided." },
        strengths:         { type: "array", items: { type: "string" }, description: "Resume strengths. Return [] if resume is unreadable." },
        sectionScores: {
          type: "object",
          additionalProperties: false,
          required: ["personalInfo", "summary", "experience", "skills", "projects", "education"],
          properties: {
            personalInfo: { type: "integer", description: "Score 0-100. Use 5 if section is missing/garbled." },
            summary:      { type: "integer", description: "Score 0-100. Use 5 if section is missing/garbled." },
            experience:   { type: "integer", description: "Score 0-100. Use 5 if section is missing/garbled." },
            skills:       { type: "integer", description: "Score 0-100. Use 5 if section is missing/garbled." },
            projects:     { type: "integer", description: "Score 0-100. Use 5 if section is missing/garbled." },
            education:    { type: "integer", description: "Score 0-100. Use 5 if section is missing/garbled." },
          },
        },
      },
    };


    const raw = await generateStructuredJson({
      systemPrompt,
      userPayload: { targetRole: role, jobDescription: jd, resumeText },
      geminiSchema: schema,
      openAiSchema: schema,
      schemaName: "ResumeAnalysisResult",
      temperature: 0.1,
    });

    // ── Normalise — safe defaults for any field the model omitted ──────────────
    const defaultSectionScores = { personalInfo:50, summary:50, experience:50, skills:50, projects:50, education:50 };

    const analysis = {
      overallScore: typeof raw.overallScore === "number" ? raw.overallScore : 0,
      faultAreas:   Array.isArray(raw.faultAreas) ? raw.faultAreas : [],
      keywordAnalysis: {
        matchingKeywords: Array.isArray(raw.matchingKeywords) ? raw.matchingKeywords : [],
        missingKeywords:  Array.isArray(raw.missingKeywords)  ? raw.missingKeywords  : [],
      },
      strengths:    Array.isArray(raw.strengths) ? raw.strengths : [],
      sectionScores: raw.sectionScores
        ? { ...defaultSectionScores, ...raw.sectionScores }
        : defaultSectionScores,
    };

    return Response.json(analysis);
  } catch (err) {
    console.error("Resume Analysis Error:", err);
    return Response.json({ error: err.message || "Failed to analyze resume." }, { status: 500 });
  }
}
