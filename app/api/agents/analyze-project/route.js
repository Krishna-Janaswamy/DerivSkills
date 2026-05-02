import { generateStructuredJson } from '@/lib/ai';
import { errorResponse }          from '@/lib/api-security';

export async function POST(req) {
  try {
    const { files, projectContext } = await req.json();

    if (!files || !Array.isArray(files) || files.length === 0) {
      return Response.json({ error: 'No files provided for analysis.' }, { status: 400 });
    }

    // Limit files to prevent massive payloads
    const limitedFiles = files.slice(0, 15).map(f => ({
      path: f.path,
      content: typeof f.content === 'string' ? f.content.slice(0, 2500) : ''
    }));

    const systemPrompt = `You are a Senior Principal Staff Engineer conducting a comprehensive project-level code review.
Analyze the provided multi-file project architecture and codebase.
Focus on:
1. Overall Architecture and Design Patterns
2. Cross-file dependencies and logic flow
3. Project-wide security vulnerabilities
4. Scalability and performance bottlenecks
5. Maintainability and refactoring opportunities`;

    const userPayload = { projectContext, files: limitedFiles };

    const schema = {
      type: "object",
      additionalProperties: false,
      required: ["architectureSummary", "securityVulnerabilities", "performanceBottlenecks", "refactoringSuggestions", "overallQualityScore"],
      properties: {
        architectureSummary: { type: "string", description: "Overview of the project structure and design patterns used." },
        securityVulnerabilities: { type: "array", items: { type: "string" }, description: "List of security issues found across the codebase." },
        performanceBottlenecks: { type: "array", items: { type: "string" }, description: "List of performance issues found across the codebase." },
        refactoringSuggestions: {
          type: "array",
          items: {
            type: "object",
            required: ["file", "suggestion"],
            properties: {
              file: { type: "string", description: "Path or name of the file." },
              suggestion: { type: "string", description: "Detailed refactoring suggestion." }
            }
          }
        },
        overallQualityScore: { type: "integer", description: "Score from 0 to 100 representing overall code health." }
      }
    };

    const result = await generateStructuredJson({
      systemPrompt,
      userPayload,
      geminiSchema: schema,
      openAiSchema: schema,
      schemaName: "ProjectAnalysis",
      temperature: 0.3,
    });

    return Response.json(result);
  } catch (err) {
    return errorResponse(err, '[analyze-project]');
  }
}
