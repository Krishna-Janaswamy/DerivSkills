import { generateStructuredJson } from '@/lib/ai';
import { errorResponse }          from '@/lib/api-security';

export async function POST(req) {
  try {
    const { code, language } = await req.json();

    if (!code || !code.trim()) {
      return Response.json({ error: 'No code provided for review.' }, { status: 400 });
    }

    const systemPrompt = `You are an expert ${language} code reviewer.
Review the following code for:
1. Bugs or logic errors
2. Time and space complexity
3. Best practices and optimizations
4. Security vulnerabilities (if any)

Keep your feedback concise, direct, and helpful. Format your response exactly as requested.`;

    const userPayload = {
      language,
      code: code.slice(0, 3000) // limit code length to avoid context limits
    };

    const schema = {
      type: "object",
      additionalProperties: false,
      required: ["issues", "improvements", "timeComplexity", "spaceComplexity", "summary"],
      properties: {
        summary: {
          type: "string",
          description: "A short 1-2 sentence overall summary of the code quality."
        },
        issues: {
          type: "array",
          items: { type: "string" },
          description: "List of bugs, logic errors, or critical flaws. Empty array if none."
        },
        improvements: {
          type: "array",
          items: { type: "string" },
          description: "List of suggestions for better performance, readability, or best practices."
        },
        timeComplexity: {
          type: "string",
          description: "Estimated time complexity (e.g., O(N), O(N log N))."
        },
        spaceComplexity: {
          type: "string",
          description: "Estimated space complexity (e.g., O(1), O(N))."
        }
      }
    };

    const result = await generateStructuredJson({
      systemPrompt,
      userPayload,
      geminiSchema: schema,
      openAiSchema: schema,
      schemaName: "CodeReview",
      temperature: 0.2,
    });

    return Response.json(result);
  } catch (err) {
    return errorResponse(err, '[code-review]');
  }
}
