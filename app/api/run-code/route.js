import { NextResponse } from 'next/server';

function normalizeJavaCode(code) {
  let normalized = String(code || '').trim();
  if (!normalized) return normalized;

  normalized = normalized.replace(/```[a-z]*\n([\s\S]*?)```/i, '$1').trim();

  const lines = normalized.split('\n');
  const importLines = [];
  const bodyLines = [];

  for (const line of lines) {
    if (/^\s*import\s+[\w.*]+\s*;\s*$/.test(line) && bodyLines.length === 0) importLines.push(line);
    else bodyLines.push(line);
  }

  normalized = bodyLines.join('\n').trim();

  if (/public\s+class\s+Main\b/.test(normalized)) {
    return [...importLines, normalized].join('\n');
  }

  if (/public\s+class\s+\w+/.test(normalized)) {
    return [...importLines, normalized.replace(/public\s+class\s+\w+/, 'public class Main')].join('\n');
  }

  const classMatches = normalized.match(/\bclass\s+\w+/g) || [];
  if (classMatches.length === 1 && /(?:^|\n)\s*class\s+\w+/.test(normalized) && /main\s*\(\s*String\[\]\s+args\s*\)/.test(normalized)) {
    return [...importLines, normalized.replace(/\bclass\s+\w+/, 'public class Main')].join('\n');
  }

  const sourceLines = normalized.split('\n').map((line) => line.trim()).filter(Boolean);
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

  const sections = [];
  if (helperClasses.length) sections.push(...helperClasses.map((block) => block.split('\n').map((line) => `    ${line}`).join('\n')));
  if (helperMethods.length) sections.push(...helperMethods.map((block) => block.split('\n').map((line) => `    ${line}`).join('\n')));
  sections.push('    public static void main(String[] args) {');
  sections.push(
    mainStatements.length
      ? mainStatements.map((line) => `        ${line}`).join('\n')
      : '        // Add runnable statements here'
  );
  sections.push('    }');

  return [
    ...importLines,
    'public class Main {',
    ...sections,
    '}',
  ].join('\n');
}

export async function POST(req) {
  try {
    const { language, code } = await req.json();
    if (!language || !code) {
      return NextResponse.json({ error: 'Language and code are required' }, { status: 400 });
    }

    // Since Piston API is now whitelisted, we will securely proxy our standard "Run Code" 
    // execution through the Pythontutor sandbox engine we already use for visualization!
    // This provides free, secure execution with step-limit (infinite loop) protection.
    const executableCode = language === 'java' ? normalizeJavaCode(code) : code;

    let endpoint = 'https://pythontutor.com/web_exec_py3.py';
    if (language === 'javascript') endpoint = 'https://pythontutor.com/web_exec_js.py';
    else if (language === 'java') endpoint = 'https://pythontutor.com/web_exec_java.py';
    else if (language === 'c') endpoint = 'https://pythontutor.com/web_exec_c.py';
    else if (language === 'cpp') endpoint = 'https://pythontutor.com/web_exec_cpp.py';

    const url = new URL(endpoint);
    url.searchParams.append('user_script', executableCode);
    url.searchParams.append('options_json', JSON.stringify({
      cumulative_mode: false,
      heap_primitives: false,
      show_only_outputs: false,
      origin: 'opt-frontend.js'
    }));

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'DerivSkills-Execution-Engine/1.0'
      }
    });

    const textData = await response.text();
    let data;
    try {
      data = JSON.parse(textData);
    } catch (e) {
      throw new Error("Execution engine returned an invalid response.");
    }

    if (data && data.trace && data.trace.length > 0) {
       const lastStep = data.trace[data.trace.length - 1];
       
       let finalOutput = lastStep.stdout || '';
       let finalError = '';

       // Check for compilation errors or runtime exceptions
       if (lastStep.event === 'uncaught_exception') {
          finalError = lastStep.exception_msg || 'An unknown exception occurred.';
       }

       return NextResponse.json({
         output: finalOutput,
         error: finalError
       });
    }

    if (data && data.error) {
       return NextResponse.json({ output: '', error: data.error });
    }

    return NextResponse.json({ output: '', error: 'Engine failed to return a valid trace.' });

  } catch (err) {
    console.error('Execution Sandbox Error:', err);
    return NextResponse.json({ error: err.message || 'Internal sandbox error' }, { status: 500 });
  }
}
