import { generateStructuredJson } from "@/lib/ai";

export async function POST(req) {
  try {
    const { resumeText } = await req.json();

    if (!resumeText || resumeText.trim().length < 50) {
      return Response.json({ error: "Resume text too short to parse." }, { status: 400 });
    }

    const systemPrompt = `You are an expert resume parser.
Extract ALL information from the resume text and return it as structured JSON.
- If a field is not found, return an empty string "" or empty array [].
- Clean up garbled PDF characters in bullet points.
- Detect the most likely target role from the content.
- Return every required field — do not skip any.`;

    // Groq requires additionalProperties:false on EVERY object (including nested)
    const schema = {
      type: "object",
      additionalProperties: false,
      required: [
        "name","email","phone","location","linkedin","github",
        "summary","technicalSkills","softSkills","certifications",
        "detectedRole","experience","projects","education",
      ],
      properties: {
        name:            { type: "string" },
        email:           { type: "string" },
        phone:           { type: "string" },
        location:        { type: "string" },
        linkedin:        { type: "string" },
        github:          { type: "string" },
        summary:         { type: "string" },
        technicalSkills: { type: "array", items: { type: "string" } },
        softSkills:      { type: "array", items: { type: "string" } },
        certifications:  { type: "array", items: { type: "string" } },
        detectedRole:    { type: "string" },
        experience: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            required: ["company","role","duration","bullets"],
            properties: {
              company:  { type: "string" },
              role:     { type: "string" },
              duration: { type: "string" },
              bullets:  { type: "array", items: { type: "string" } },
            },
          },
        },
        projects: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            required: ["name","tech","description","link"],
            properties: {
              name:        { type: "string" },
              tech:        { type: "string" },
              description: { type: "string" },
              link:        { type: "string" },
            },
          },
        },
        education: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            required: ["institution","degree","year"],
            properties: {
              institution: { type: "string" },
              degree:      { type: "string" },
              year:        { type: "string" },
            },
          },
        },
      },
    };

    const raw = await generateStructuredJson({
      systemPrompt,
      userPayload: { resumeText },
      geminiSchema: schema,
      openAiSchema: schema,
      schemaName: "ParsedResume",
      temperature: 0.1,
    });

    // ── Regex-based fallback for structured fields ─────────────────────────
    // These patterns are deterministic — far more reliable than AI on garbled PDF text.
    const rx = {
      email:    resumeText.match(/[\w.+\-]+@[\w\-]+\.[a-zA-Z]{2,6}/)?.[0]    || '',
      phone:    resumeText.match(/(?:\+91[\s\-]?)?[6-9]\d{9}|(?:\+\d{1,3}[\s\-]?)?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{4}/)?.[0] || '',
      linkedin: resumeText.match(/(?:linkedin\.com\/in\/|linkedin\.com\/pub\/)[\w\-\/]+/)?.[0]
                  ? 'https://' + resumeText.match(/(?:linkedin\.com\/in\/|linkedin\.com\/pub\/)[\w\-\/]+/)[0]
                  : '',
      github:   resumeText.match(/github\.com\/[\w\-]+/)?.[0]
                  ? 'https://' + resumeText.match(/github\.com\/[\w\-]+/)[0]
                  : '',
    };

    // ── Garbled text detector ───────────────────────────────────────────────
    // Garbled PDFs (encoded fonts) produce names like "Ggaphrrash Krishnajanaswammai"
    // The signs: repeated leading char (Gg, Ss), 4+ consecutive consonants, very low vowel ratio
    const isGarbled = (s) => {
      if (!s || s.trim().length < 2) return true;
      const CONSONANTS = /[bcdfghjklmnpqrstvwxyz]{4,}/i;
      const LOW_VOWELS = (s.match(/[aeiou]/gi) || []).length / s.length < 0.12;
      const REPEATED_LEAD = /^([A-Z])\1/i.test(s.replace(/\s+/g, '').slice(0, 4));
      return CONSONANTS.test(s) || LOW_VOWELS || REPEATED_LEAD;
    };

    // ── Determine overall text quality (are >40% of top lines garbled?) ─────
    const topLines = resumeText.split('\n').map(l => l.trim()).filter(l => l.length > 3).slice(0, 15);
    const garbledLines = topLines.filter(l => isGarbled(l)).length;
    const textQuality = topLines.length > 0 ? (1 - garbledLines / topLines.length) : 0;
    const isPoorQuality = textQuality < 0.6; // <60% readable lines

    // ── Name heuristic: first short, clean, non-URL line in top 10 lines ──
    const nameLine = topLines.find(l =>
      l.length > 2 && l.length < 60 &&
      !isGarbled(l) &&
      !/[@\/\\.com|github|linkedin|mailto|http|phone|tel|mobile|email]/i.test(l) &&
      !/^\d/.test(l)
    ) || '';

    const safeVal = (aiVal, fallback = '') =>
      (aiVal && !isGarbled(aiVal)) ? aiVal : fallback;

    const parsed = {
      personalInfo: {
        name:     safeVal(raw.name, nameLine),
        email:    safeVal(raw.email, rx.email),
        phone:    safeVal(raw.phone, rx.phone),
        location: safeVal(raw.location),
        linkedin: safeVal(raw.linkedin, rx.linkedin),
        github:   safeVal(raw.github,   rx.github),
      },

      summary:        raw.summary        || '',
      experience:     Array.isArray(raw.experience)     ? raw.experience     : [],
      projects:       Array.isArray(raw.projects)       ? raw.projects       : [],
      skills: {
        technical: Array.isArray(raw.technicalSkills) ? raw.technicalSkills : [],
        soft:      Array.isArray(raw.softSkills)      ? raw.softSkills      : [],
      },
      education:      Array.isArray(raw.education)      ? raw.education      : [],
      certifications: Array.isArray(raw.certifications) ? raw.certifications : [],
      detectedRole:   raw.detectedRole || '',
    };

    return Response.json({ parsed, textQuality: Math.round(textQuality * 100), isPoorQuality });
  } catch (err) {
    console.error("[parse-resume] Error:", err);
    return Response.json({ error: err.message || "Failed to parse resume." }, { status: 500 });
  }
}
