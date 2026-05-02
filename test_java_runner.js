const http = require('https');

function runTest(code, name) {
    const url = new URL('https://pythontutor.com/web_exec_java.py');
    url.searchParams.append('user_script', code);
    url.searchParams.append('options_json', JSON.stringify({
        cumulative_mode: false,
        heap_primitives: false,
        show_only_outputs: false,
        origin: 'opt-frontend.js'
    }));

    return new Promise((resolve) => {
        http.get(url.toString(), (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                console.log(\`--- \${name} ---\`);
                try {
                    const parsed = JSON.parse(data);
                    if (parsed.error) console.log("ERROR:", parsed.error);
                    else if (parsed.trace) {
                        const last = parsed.trace[parsed.trace.length-1];
                        if (last.event === 'uncaught_exception') {
                            console.log("EXCEPTION:", last.exception_msg);
                        } else {
                            console.log("OUTPUT:", last.stdout);
                        }
                    }
                } catch(e) {
                    console.log("Parse Error:", e.message);
                }
                resolve();
            });
        }).on('error', (e) => {
            console.log("HTTP Error:", e.message);
            resolve();
        });
    });
}

async function run() {
    await runTest("public class Main { public static void main(String[] args) { System.out.print(1); } }", "No Comment");
    await runTest("// comment\\npublic class Main { public static void main(String[] args) { System.out.print(1); } }", "With Single Line Comment");
    await runTest("/* comment */\\npublic class Main { public static void main(String[] args) { System.out.print(1); } }", "With Multi Line Comment");
    await runTest("public class Solution { public static void main(String[] args) { System.out.print(1); } }", "Class Solution");
    await runTest("class Main { public static void main(String[] args) { System.out.print(1); } }", "Without public");
}

run();
