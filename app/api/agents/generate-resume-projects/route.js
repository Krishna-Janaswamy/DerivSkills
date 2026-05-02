import { generateStructuredJson } from '@/lib/ai';
import { errorResponse }          from '@/lib/api-security';

export async function POST(req) {
  try {
    const { skills, role, jobDescription } = await req.json();

    if (!skills || skills.length === 0) {
      return Response.json({ error: 'No skills provided.' }, { status: 400 });
    }

    const systemPrompt = `You are an expert ATS Resume Writer.
The user needs a "Projects" section for their resume.
Based on their skills: ${skills.join(', ')} and target role: ${role || 'Software Engineer'}, generate 2-3 impressive project entries.
If a job description is provided, tailor the project achievements to match the required keywords.
Format the output as ready-to-use resume bullets focusing on metrics, action verbs, and business impact.`;

    const userPayload = { skills, role, jobDescription };

    const schema = {
      type: "object",
      additionalProperties: false,
      required: ["projects"],
      properties: {
        projects: {
          type: "array",
          items: {
            type: "object",
            required: ["name", "subtitle", "bullets"],
            properties: {
              name: { type: "string", description: "Project Name" },
              subtitle: { type: "string", description: "Technologies used or short tag" },
              bullets: {
                type: "array",
                items: { type: "string", description: "Strong resume bullet point using Action-Context-Result format" }
              }
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
      schemaName: "ResumeProjects",
      temperature: 0.7,
    });

    return Response.json(result);
  } catch (err) {
    return errorResponse(err, '[generate-resume-projects]');
  }
}
