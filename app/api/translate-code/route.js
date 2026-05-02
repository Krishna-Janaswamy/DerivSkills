import { NextResponse } from 'next/server';
import { generateStructuredJson } from '@/lib/ai';
import { getFromCache, setInCache } from '@/lib/cache';
import { errorResponse } from '@/lib/api-security';
import crypto from 'crypto';
import { ALL_PROBLEMS_DICTIONARY } from '@/src/data/all_problems';

const TRANSLATE_SCHEMA = {
  type: 'OBJECT',
  properties: {
    translatedCode: { 
      type: 'STRING',
      description: 'The translated raw code. Strip all markdown backticks like ```java or ```.'
    }
  },
  required: ['translatedCode']
};

const TRANSLATE_OPENAI_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    translatedCode: { type: 'string' }
  },
  required: ['translatedCode']
};

const memoryCache = new Map();
const MEMORY_CACHE_TTL = 30 * 60 * 1000;

function isPlaceholderCode(code = '') {
  return /Placeholder for:|function execute\(\)\s*\{\s*console\.log\("Placeholder/i.test(code);
}

function normalizeJavaCode(code = '') {
  let normalized = code.trim();
  if (!normalized) return normalized;

  normalized = normalized.replace(/```[a-z]*\n([\s\S]*?)```/i, '$1').trim();

  const hasMainMethod = /public\s+static\s+void\s+main\s*\(\s*String\[\]\s+args\s*\)/.test(normalized);
  const lines = normalized.split('\n');
  const importLines = [];
  const bodyLines = [];

  for (const line of lines) {
    if (/^\s*import\s+[\w.*]+\s*;\s*$/.test(line) && bodyLines.length === 0) importLines.push(line);
    else bodyLines.push(line);
  }

  normalized = bodyLines.join('\n').trim();

  if (/public\s+class\s+Main\b/.test(normalized)) {
    const body = hasMainMethod
      ? normalized
      : normalized.replace(
          /public\s+class\s+Main\s*\{/,
          'public class Main {\n    public static void main(String[] args) {\n    }\n'
        );
    return [...importLines, body].join('\n');
  }

  if (/public\s+class\s+\w+/.test(normalized)) {
    normalized = normalized.replace(/public\s+class\s+\w+/, 'public class Main');
    const body = hasMainMethod
      ? normalized
      : normalized.replace(
          /public\s+class\s+Main\s*\{/,
          'public class Main {\n    public static void main(String[] args) {\n    }\n'
        );
    return [...importLines, body].join('\n');
  }

  const classMatches = normalized.match(/\bclass\s+\w+/g) || [];
  if (classMatches.length === 1 && /(?:^|\n)\s*class\s+\w+/.test(normalized) && hasMainMethod) {
    normalized = normalized.replace(/\bclass\s+\w+/, 'public class Main');
    const body = hasMainMethod
      ? normalized
      : normalized.replace(
          /public\s+class\s+Main\s*\{/,
          'public class Main {\n    public static void main(String[] args) {\n    }\n'
        );
    return [...importLines, body].join('\n');
  }

  const sourceLines = normalized
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  const helperClasses = [];
  const helperMethods = [];
  const mainStatements = [];
  const classStart = /^(?:public\s+)?class\s+(\w+)/;
  const methodStart = /^(public|private|protected|static)\s+/;

  let i = 0;
  while (i < sourceLines.length) {
    const line = sourceLines[i];

    if (classStart.test(line)) {
      const block = [line.replace(/^(?:public\s+)?class\s+(\w+)/, 'static class $1')];
      let braceBalance = (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;
      i++;
      while (i < sourceLines.length && braceBalance > 0) {
        block.push(sourceLines[i]);
        braceBalance += (sourceLines[i].match(/\{/g) || []).length - (sourceLines[i].match(/\}/g) || []).length;
        i++;
      }
      helperClasses.push(block.join('\n'));
      continue;
    }

    if (methodStart.test(line)) {
      const firstLine = /\bstatic\b/.test(line)
        ? line
        : line.replace(/^(public|private|protected)\s+/, '$1 static ');
      const block = [firstLine];
      let braceBalance = (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;
      i++;
      while (i < sourceLines.length && braceBalance > 0) {
        block.push(sourceLines[i]);
        braceBalance += (sourceLines[i].match(/\{/g) || []).length - (sourceLines[i].match(/\}/g) || []).length;
        i++;
      }
      helperMethods.push(block.join('\n'));
      continue;
    }

    mainStatements.push(line.endsWith(';') ? line : `${line};`);
    i++;
  }

  const indentedMainStatements = mainStatements.length
    ? mainStatements.map((line) => `        ${line}`).join('\n')
    : '        // Add runnable statements here';

  return [
    ...importLines,
    'public class Main {',
    ...helperClasses.map((block) => block.split('\n').map((line) => `    ${line}`).join('\n')),
    ...helperMethods.map((block) => block.split('\n').map((line) => `    ${line}`).join('\n')),
    '    public static void main(String[] args) {',
    indentedMainStatements,
    '    }',
    '}',
  ].join('\n');
}

export async function POST(request) {
  try {
    const { sourceCode, sourceLang, targetLang } = await request.json();
    if (!sourceCode) return NextResponse.json({ error: 'Missing source code' }, { status: 400 });

    const cleanSourceCode = sourceCode.trim();
    
    // 1. Static Dictionary Lookup (Zero Latency, Zero Cost)
    if (sourceLang === 'javascript') {
       for (const problemKey in ALL_PROBLEMS_DICTIONARY) {
          const problemData = ALL_PROBLEMS_DICTIONARY[problemKey];
          if (problemData.javascript && problemData.javascript.trim() === cleanSourceCode) {
             if (problemData[targetLang] && !isPlaceholderCode(problemData[targetLang])) {
                const translatedCode = targetLang === 'java'
                  ? normalizeJavaCode(problemData[targetLang])
                  : problemData[targetLang];
                return NextResponse.json({ translatedCode, source: 'static_file' });
             }
          }
       }
    }

    const hashPayload = `${cleanSourceCode}::${sourceLang}::${targetLang}`;
    const hash = crypto.createHash('sha256').update(hashPayload).digest('hex');
    const cacheKey = `code-translation:${hash}`;

    if (memoryCache.has(cacheKey)) {
      const cached = memoryCache.get(cacheKey);
      if (Date.now() < cached.expires) {
        return NextResponse.json({ translatedCode: cached.code, source: 'memory' });
      } else {
        memoryCache.delete(cacheKey);
      }
    }

    try {
      const redisCached = await getFromCache(cacheKey);
      if (redisCached && redisCached.translatedCode) {
        memoryCache.set(cacheKey, { code: redisCached.translatedCode, expires: Date.now() + MEMORY_CACHE_TTL });
        return NextResponse.json({ translatedCode: redisCached.translatedCode, source: 'redis' });
      }
    } catch (e) {
      console.warn('[translate-code] Redis read failed', e);
    }

    const javaRequirement = targetLang === 'java'
      ? ' Return complete runnable Java code inside exactly one `public class Main` with `public static void main(String[] args)`. Every helper function must be declared with an explicit return type and `static` if called from main. Do not emit top-level statements outside the class or outside methods.'
      : '';
    const systemPrompt = `You are an expert polyglot programmer. Translate the provided code from ${sourceLang} to ${targetLang}. Preserve the exact logic, algorithms, variable names, and print statements/test cases. Ensure the output is valid, executable ${targetLang} code.${javaRequirement} Do not wrap the code in markdown blocks like \`\`\`python. Just return the raw code string directly in the JSON value.`;
    
    const result = await generateStructuredJson({
      systemPrompt,
      userPayload: { sourceCode },
      geminiSchema: TRANSLATE_SCHEMA,
      openAiSchema: TRANSLATE_OPENAI_SCHEMA,
      schemaName: 'translate_code',
      temperature: 0.1
    });

    let finalCode = result.translatedCode || '';
    
    const match = finalCode.match(/```[a-z]*\n([\s\S]*?)```/);
    if (match) {
        finalCode = match[1].trim();
    }

    if (targetLang === 'java') {
      finalCode = normalizeJavaCode(finalCode);
    }

    memoryCache.set(cacheKey, { code: finalCode, expires: Date.now() + MEMORY_CACHE_TTL });
    try {
      await setInCache(cacheKey, { translatedCode: finalCode }, 60 * 60 * 24 * 30);
    } catch (e) {
      console.warn('[translate-code] Redis write failed', e);
    }

    return NextResponse.json({ translatedCode: finalCode, source: 'ai' });
  } catch (err) {
    return errorResponse(err, '[translate-code]', 500);
  }
}
