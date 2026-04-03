function extractGeminiText(data) {
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

async function callGemini({
  systemPrompt,
  userPayload,
  schema,
  temperature = 0.2,
}) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('Missing GEMINI_API_KEY');
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: systemPrompt }],
        },
        contents: [
          {
            parts: [{ text: JSON.stringify(userPayload) }],
          },
        ],
        generationConfig: {
          responseMimeType: 'application/json',
          responseSchema: schema,
          temperature,
        },
      }),
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Gemini request failed: ${JSON.stringify(data)}`);
  }

  const rawText = extractGeminiText(data);

  if (!rawText) {
    throw new Error('Gemini returned an empty response.');
  }

  return JSON.parse(rawText);
}

async function callOpenAI({
  systemPrompt,
  userPayload,
  schemaName,
  schema,
  temperature = 0.2,
}) {
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL || 'gpt-5.4-mini';

  if (!apiKey) {
    throw new Error('Missing OPENAI_API_KEY');
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature,
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: JSON.stringify(userPayload),
        },
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: schemaName,
          strict: true,
          schema,
        },
      },
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`OpenAI request failed: ${JSON.stringify(data)}`);
  }

  const rawText = data?.choices?.[0]?.message?.content;

  if (!rawText) {
    throw new Error('OpenAI returned an empty response.');
  }

  return JSON.parse(rawText);
}

async function callGroq({
  systemPrompt,
  userPayload,
  schemaName,
  schema,
  temperature = 0.2,
}) {
  const apiKey = process.env.GROQ_API_KEY;
  const model = process.env.GROQ_MODEL || 'openai/gpt-oss-20b';

  if (!apiKey) {
    throw new Error('Missing GROQ_API_KEY');
  }

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature,
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: JSON.stringify(userPayload),
        },
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: schemaName,
          strict: true,
          schema,
        },
      },
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Groq request failed: ${JSON.stringify(data)}`);
  }

  const rawText = data?.choices?.[0]?.message?.content;

  if (!rawText) {
    throw new Error('Groq returned an empty response.');
  }

  return JSON.parse(rawText);
}

export async function generateStructuredJson({
  systemPrompt,
  userPayload,
  geminiSchema,
  openAiSchema,
  schemaName,
  temperature = 0.2,
}) {
  const errors = [];

  if (process.env.GEMINI_API_KEY) {
    try {
      return await callGemini({
        systemPrompt,
        userPayload,
        schema: geminiSchema,
        temperature,
      });
    } catch (error) {
      errors.push(error instanceof Error ? error.message : 'Gemini failed');
    }
  }

  if (process.env.OPENAI_API_KEY) {
    try {
      return await callOpenAI({
        systemPrompt,
        userPayload,
        schemaName,
        schema: openAiSchema,
        temperature,
      });
    } catch (error) {
      errors.push(error instanceof Error ? error.message : 'OpenAI failed');
    }
  }

  if (process.env.GROQ_API_KEY) {
    try {
      return await callGroq({
        systemPrompt,
        userPayload,
        schemaName,
        schema: openAiSchema,
        temperature,
      });
    } catch (error) {
      errors.push(error instanceof Error ? error.message : 'Groq failed');
    }
  }

  if (!process.env.GEMINI_API_KEY && !process.env.OPENAI_API_KEY && !process.env.GROQ_API_KEY) {
    throw new Error('Missing AI configuration. Add GEMINI_API_KEY, OPENAI_API_KEY, or GROQ_API_KEY.');
  }

  throw new Error(errors.join(' | '));
}
