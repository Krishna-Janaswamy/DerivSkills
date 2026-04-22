import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { code, language } = await req.json();

    let endpoint = 'https://pythontutor.com/web_exec_py3.py';
    if (language === 'javascript') endpoint = 'https://pythontutor.com/web_exec_js.py';
    else if (language === 'java') endpoint = 'https://pythontutor.com/web_exec_java.py';
    else if (language === 'c') endpoint = 'https://pythontutor.com/web_exec_c.py';
    else if (language === 'cpp') endpoint = 'https://pythontutor.com/web_exec_cpp.py';

    const url = new URL(endpoint);
    url.searchParams.append('user_script', code);
    url.searchParams.append('raw_input_json', '');
    url.searchParams.append('options_json', JSON.stringify({
      cumulative_mode: false,
      heap_primitives: "nevernest",
      show_only_outputs: false,
      origin: "opt-frontend.js"
    }));

    // Perform the fetch using heavy browser spoofing to bypass basic Cloudflare checks
    const res = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': 'https://pythontutor.com/visualize.html',
        'Origin': 'https://pythontutor.com',
        'Connection': 'keep-alive',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin'
      }
    });

    if (!res.ok) {
      const errText = await res.text();
      return NextResponse.json({ error: `Third-party API returned ${res.status}: ${errText.substring(0, 100)}` }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error("Trace Proxy Error:", error);
    return NextResponse.json({ error: 'Failed to fetch trace data from execution engine.' }, { status: 500 });
  }
}
