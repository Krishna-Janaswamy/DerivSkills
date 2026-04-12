import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { generateStructuredJson } from "@/lib/ai";

// POST /api/resumes/[id]/suggest — get AI suggestion for a specific section
export async function POST(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const resume = await prisma.resume.findFirst({
    where: { id: params.id, userId: session.user.id },
    select: { role: true, content: true },
  });
  if (!resume) return Response.json({ error: "Not found" }, { status: 404 });

  const { section, currentValue, context } = await req.json();

  const systemPrompt = `You are an elite resume writer specializing in ${resume.role} roles.
Your job is to rewrite the provided resume section to be:
- Highly ATS-optimized with the right keywords for a ${resume.role}
- Written with strong action verbs and quantified impact where possible
- Concise, professional, and compelling

Only rewrite what's asked. Return improved text only — no commentary, no preamble.`;

  const sectionInstructions = {
    summary: "Rewrite this professional summary to be a powerful 2-3 sentence value proposition targeting a " + resume.role + " role.",
    experience_bullet: "Rewrite this experience bullet point using the STAR method (Situation-Task-Action-Result) with quantifiable metrics.",
    skills: "Suggest the most in-demand technical skills to add for a " + resume.role + " in 2025.",
    project_description: "Rewrite this project description highlighting technical impact, your role, and technologies used.",
    education: "Suggest how to present this education entry effectively.",
  };

  const instruction = sectionInstructions[section] || `Improve this ${section} section for a ${resume.role} resume.`;

  const schemaDefinition = {
    type: "object",
    properties: {
      improved: { type: "string", description: "The improved text for this section. Plain text, no markdown." },
      explanation: { type: "string", description: "Brief 1-sentence explanation of what changed and why it helps ATS." },
    },
    required: ["improved", "explanation"],
    additionalProperties: false,
  };

  const result = await generateStructuredJson({
    systemPrompt,
    userPayload: {
      instruction,
      section,
      currentValue: currentValue || "(empty)",
      context: context || {},
    },
    geminiSchema: schemaDefinition,
    openAiSchema: schemaDefinition,
    schemaName: "ResumeSuggestion",
    temperature: 0.3,
  });

  return Response.json(result);
}
