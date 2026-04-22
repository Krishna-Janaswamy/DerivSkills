import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { language, code } = await req.json();
    if (!language || !code) {
      return NextResponse.json({ error: 'Language and code are required' }, { status: 400 });
    }

    // Since Piston API is now whitelisted, we will securely proxy our standard "Run Code" 
    // execution through the Pythontutor sandbox engine we already use for visualization!
    // This provides free, secure execution with step-limit (infinite loop) protection.
    let endpoint = 'https://pythontutor.com/web_exec_py3.py';
    if (language === 'javascript') endpoint = 'https://pythontutor.com/web_exec_js.py';
    else if (language === 'java') endpoint = 'https://pythontutor.com/web_exec_java.py';
    else if (language === 'c') endpoint = 'https://pythontutor.com/web_exec_c.py';
    else if (language === 'cpp') endpoint = 'https://pythontutor.com/web_exec_cpp.py';

    const url = new URL(endpoint);
    url.searchParams.append('user_script', code);
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
