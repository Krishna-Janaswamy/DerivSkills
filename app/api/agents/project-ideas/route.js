import { generateStructuredJson } from '@/lib/ai';
import { errorResponse }          from '@/lib/api-security';

export async function POST(req) {
  try {
    const { skills, role, experienceLevel = 'Intermediate' } = await req.json();

    if (!skills || skills.length === 0) {
      return Response.json({ error: 'No skills provided.' }, { status: 400 });
    }

    const systemPrompt = `You are an expert technical career coach and software architect.
Suggest 3 practical, portfolio-worthy project ideas for a ${experienceLevel} ${role || 'Software Engineer'}.
The projects should utilize these skills: ${skills.join(', ')}.
Each project should be realistic, solve a real-world problem, and be impressive on a resume.`;

    const userPayload = { skills, role, experienceLevel };

    const schema = {
      type: "object",
      additionalProperties: false,
      required: ["projects"],
      properties: {
        projects: {
          type: "array",
          items: {
            type: "object",
            required: ["title", "description", "difficulty", "techStack", "learningOutcomes"],
            properties: {
              title: { type: "string" },
              description: { type: "string" },
              difficulty: { type: "string", enum: ["Beginner", "Intermediate", "Advanced"] },
              techStack: { type: "array", items: { type: "string" } },
              learningOutcomes: { type: "array", items: { type: "string" } }
            }
          }
        }
      }
    };

    const result = await generateStructuredJson({
      systemPrompt,
      userPayload,
      geminiSchema: schema,
      openAiSchema: schema,
      schemaName: "ProjectIdeas",
      temperature: 0.7,
    });

    return Response.json(result);
  } catch (err) {
    return errorResponse(err, '[project-ideas]');
  }
}
