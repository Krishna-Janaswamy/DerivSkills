import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { NextResponse } from 'next/server';

function runCommand(command) {
  return new Promise((resolve) => {
    exec(command, { timeout: 10000 }, (error, stdout, stderr) => {
      resolve({ stdout, stderr, error });
    });
  });
}

export async function POST(req) {
  try {
    const { language, code } = await req.json();
    if (!language || !code) {
      return NextResponse.json({ error: 'Language and code are required' }, { status: 400 });
    }

    const tmpDir = os.tmpdir();
    const id = Date.now().toString() + Math.floor(Math.random() * 1000);
    
    let command = '';
    let filePath = '';

    if (language === 'javascript') {
      filePath = path.join(tmpDir, `script_${id}.js`);
      fs.writeFileSync(filePath, code);
      command = `node ${filePath}`;
    } else if (language === 'python') {
      filePath = path.join(tmpDir, `script_${id}.py`);
      fs.writeFileSync(filePath, code);
      command = `python3 ${filePath}`;
    } else if (language === 'java') {
      const dirPath = path.join(tmpDir, `java_${id}`);
      fs.mkdirSync(dirPath, { recursive: true });
      
      const match = code.match(/public\s+class\s+([A-Za-z0-9_]+)/);
      const className = match ? match[1] : 'Main';
      filePath = path.join(dirPath, `${className}.java`);
      fs.writeFileSync(filePath, code);
      command = `cd ${dirPath} && java ${className}.java`;
    } else if (language === 'c') {
      const dirPath = path.join(tmpDir, `c_${id}`);
      fs.mkdirSync(dirPath, { recursive: true });
      filePath = path.join(dirPath, `main.c`);
      const outPath = path.join(dirPath, `a.out`);
      fs.writeFileSync(filePath, code);
      command = `gcc -x c ${filePath} -o ${outPath} && ${outPath}`;
    } else if (language === 'cpp') {
      const dirPath = path.join(tmpDir, `cpp_${id}`);
      fs.mkdirSync(dirPath, { recursive: true });
      filePath = path.join(dirPath, `main.cpp`);
      const outPath = path.join(dirPath, `a.out`);
      fs.writeFileSync(filePath, code);
      command = `g++ -x c++ ${filePath} -o ${outPath} && ${outPath}`;
    } else {
      return NextResponse.json({ error: 'Unsupported language' }, { status: 400 });
    }

    const { stdout, stderr, error } = await runCommand(command);
    
    // Clean up
    try {
      if (language === 'java' || language === 'c' || language === 'cpp') {
        fs.rmSync(path.dirname(filePath), { recursive: true, force: true });
      } else {
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      }
    } catch (e) {
      console.error('Cleanup error:', e);
    }

    return NextResponse.json({
      output: stdout || '',
      error: stderr || (error ? error.message : '')
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
