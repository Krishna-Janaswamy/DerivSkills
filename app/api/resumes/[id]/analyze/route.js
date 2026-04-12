import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { generateStructuredJson } from "@/lib/ai";
import { ROLE_KEYWORDS } from "@/lib/resume-roles";

const ATS_SCORE_THRESHOLD = 90;

// POST /api/resumes/[id]/analyze — run AI ATS scan, persist result & score
export async function POST(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const resume = await prisma.resume.findFirst({
    where: { id: params.id, userId: session.user.id },
  });
  if (!resume) return Response.json({ error: "Not found" }, { status: 404 });

  const content = resume.content;
  const roleKeywords = ROLE_KEYWORDS[resume.role] || [];

  // Flatten structured resume to readable text for AI
  const resumeText = flattenResumeContent(content);

  if (resumeText.trim().length < 50) {
    return Response.json({ error: "Resume is too empty to analyze. Please fill in more sections." }, { status: 400 });
  }

  const systemPrompt = `You are an elite Applicant Tracking System (ATS) expert and Senior Technical Recruiter specializing in ${resume.role} roles.
  
Deeply analyze the provided structured resume data. Evaluate each section critically:
1. Personal Info completeness (name, email, LinkedIn, GitHub).
2. Summary — does it clearly articulate value for a ${resume.role}?
3. Work Experience — are achievements quantified? Are strong action verbs used?
4. Skills — are the critical keywords for a ${resume.role} present?
5. Projects — are they relevant, do they show impact?
6. Education & Certifications — are they listed correctly?

Expected keywords for this role: ${roleKeywords.join(", ")}

Be STRICT. Be SPECIFIC. Point to exact field names. 
Score 0-100 where 100 means the resume would pass every ATS and impress any recruiter.`;

  const schemaDefinition = {
    type: "object",
    properties: {
      overallScore: { type: "integer", description: "ATS score 0-100. Be strict. Average good resume should be 60-75." },
      sectionScores: {
        type: "object",
        description: "Score for each resume section (0-100)",
        properties: {
          personalInfo: { type: "integer" },
          summary: { type: "integer" },
          experience: { type: "integer" },
          skills: { type: "integer" },
          projects: { type: "integer" },
          education: { type: "integer" },
        },
        required: ["personalInfo", "summary", "experience", "skills", "projects", "education"],
        additionalProperties: false,
      },
      faultAreas: {
        type: "array",
        items: {
          type: "object",
          properties: {
            section: { type: "string", description: "Which section: personalInfo, summary, experience, skills, projects, education" },
            category: { type: "string", description: "E.g., Missing Keywords, Weak Verbs, No Metrics, Incomplete" },
            severity: { type: "string", description: "High, Medium, or Low" },
            issue: { type: "string", description: "Specific problem found" },
            suggestion: { type: "string", description: "Precise, actionable fix for this exact issue" },
          },
          required: ["section", "category", "severity", "issue", "suggestion"],
          additionalProperties: false,
        },
      },
      keywordAnalysis: {
        type: "object",
        properties: {
          matchingKeywords: { type: "array", items: { type: "string" } },
          missingKeywords: { type: "array", items: { type: "string" } },
        },
        required: ["matchingKeywords", "missingKeywords"],
        additionalProperties: false,
      },
      strengths: { type: "array", items: { type: "string" } },
    },
    required: ["overallScore", "sectionScores", "faultAreas", "keywordAnalysis", "strengths"],
    additionalProperties: false,
  };

  const analysis = await generateStructuredJson({
    systemPrompt,
    userPayload: { role: resume.role, resumeContent: content, resumeText },
    geminiSchema: schemaDefinition,
    openAiSchema: schemaDefinition,
    schemaName: "ResumeAnalysisResult",
    temperature: 0.1,
  });

  const isDownloadReady = analysis.overallScore >= ATS_SCORE_THRESHOLD;

  // Persist the score & analysis back to DB
  await prisma.resume.update({
    where: { id: params.id },
    data: {
      atsScore: analysis.overallScore,
      analysis,
      isDownloadReady,
    },
  });

  return Response.json({ analysis, isDownloadReady });
}

function flattenResumeContent(content) {
  const c = content || {};
  const lines = [];

  const pi = c.personalInfo || {};
  if (pi.name) lines.push(`Name: ${pi.name}`);
  if (pi.email) lines.push(`Email: ${pi.email}`);
  if (pi.phone) lines.push(`Phone: ${pi.phone}`);
  if (pi.linkedin) lines.push(`LinkedIn: ${pi.linkedin}`);
  if (pi.github) lines.push(`GitHub: ${pi.github}`);
  if (c.summary) lines.push(`\nSummary:\n${c.summary}`);

  if (c.experience?.length) {
    lines.push("\nExperience:");
    c.experience.forEach(exp => {
      lines.push(`${exp.role} at ${exp.company} (${exp.duration})`);
      (exp.bullets || []).forEach(b => lines.push(`  - ${b}`));
    });
  }

  if (c.skills) {
    lines.push(`\nTechnical Skills: ${(c.skills.technical || []).join(", ")}`);
    lines.push(`Soft Skills: ${(c.skills.soft || []).join(", ")}`);
  }

  if (c.projects?.length) {
    lines.push("\nProjects:");
    c.projects.forEach(p => lines.push(`${p.name} (${p.tech}): ${p.description}`));
  }

  if (c.education?.length) {
    lines.push("\nEducation:");
    c.education.forEach(e => lines.push(`${e.degree} — ${e.institution} (${e.year})`));
  }

  if (c.certifications?.length) {
    lines.push(`\nCertifications: ${c.certifications.join(", ")}`);
  }

  return lines.join("\n");
}
