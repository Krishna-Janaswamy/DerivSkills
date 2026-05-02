'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function PracticePage() {
  const router = useRouter();
  
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const textareaRef = useRef(null);

  // Helper to parse markdown blocks and auto-detect language
  const processInitialCode = (rawCode, rawLang) => {
    if (!rawCode) return { code: '', lang: rawLang || 'javascript' };
    
    let finalCode = rawCode;
    let finalLang = rawLang;

    // Strip markdown wrappers (e.g. ```java ... ```)
    const match = finalCode.match(/```([a-z]*)\n([\s\S]*?)```/);
    if (match) {
      if (match[1] && !finalLang) {
        finalLang = match[1].toLowerCase();
      }
      finalCode = match[2].trim();
    }

    // Heuristics for language detection if still unknown or default
    if (!finalLang || finalLang === 'javascript' || finalLang === 'js') {
      if (finalCode.includes('public static void main') || finalCode.includes('System.out.println') || finalCode.includes('import java.')) {
        finalLang = 'java';
      } else if (finalCode.includes('def ') || finalCode.includes('print(') || finalCode.includes('import sys')) {
        finalLang = 'python';
      } else if (finalCode.includes('#include') || finalCode.includes('int main()')) {
        finalLang = finalCode.includes('cout') || finalCode.includes('std::') || finalCode.includes('#include <iostream>') ? 'cpp' : 'c';
      }
    }

    // Normalize common markdown identifiers to our select options
    if (finalLang === 'js' || finalLang === 'node') finalLang = 'javascript';
    if (finalLang === 'py') finalLang = 'python';
    if (finalLang === 'c++') finalLang = 'cpp';

    return { code: finalCode, lang: finalLang || 'javascript' };
  };

  // Sync initial state if URL params change or load from sessionStorage
  useEffect(() => {
    let urlCode = null;
    let urlLang = null;
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      urlCode = params.get('code');
      urlLang = params.get('lang');
    }
    
    const storedCode = sessionStorage.getItem('ide_initial_code');
    const vizCode = sessionStorage.getItem('derivskills_viz_code');
    const sourceCode = urlCode || storedCode || vizCode;
    
    const storedLang = sessionStorage.getItem('ide_initial_lang');
    const vizLang = sessionStorage.getItem('derivskills_viz_lang');
    const sourceLang = urlLang || storedLang || vizLang;

    if (sourceCode) {
      const { code: cleanCode, lang: detectedLang } = processInitialCode(sourceCode, sourceLang);
      setCode(cleanCode);
      setLanguage(detectedLang);
    } else if (sourceLang) {
      setLanguage(sourceLang);
    }

    if (storedCode) sessionStorage.removeItem('ide_initial_code');
    if (storedLang) sessionStorage.removeItem('ide_initial_lang');
  }, []);

  const handleFormatCode = () => {
    if (!code) return;
    
    let rawCode = code;
    let newLang = language;
    
    // Auto-strip markdown wrappers if the user pasted them directly and hit format
    const match = rawCode.match(/```([a-z]*)\n([\s\S]*?)```/);
    if (match) {
      rawCode = match[2].trim();
      if (match[1]) newLang = match[1].toLowerCase();
      if (newLang === 'js' || newLang === 'node') newLang = 'javascript';
      if (newLang === 'py') newLang = 'python';
      if (newLang === 'c++') newLang = 'cpp';
      if (['javascript', 'python', 'java', 'c', 'cpp'].includes(newLang)) {
        setLanguage(newLang);
      }
    }
    
    if (newLang === 'python' || rawCode.match(/def |print\(|import sys/)) {
      // Python: Just trim trailing whitespaces
      setCode(rawCode.split('\n').map(line => line.trimEnd()).join('\n'));
      return;
    }
    
    // C / C++ / Java / JS Robust Auto-Indenter
    let inString = false;
    let inChar = false;
    let inLineComment = false;
    let inBlockComment = false;
    let parenDepth = 0;
    let res = '';

    for (let i = 0; i < rawCode.length; i++) {
      let c = rawCode[i];
      let next = rawCode[i + 1] || '';
      let prev = i > 0 ? rawCode[i - 1] : '';

      if (!inString && !inChar && !inLineComment && !inBlockComment) {
        if (c === '/' && next === '/') { inLineComment = true; res += c; continue; }
        if (c === '/' && next === '*') { inBlockComment = true; res += c; continue; }
        if (c === '"' && prev !== '\\') { inString = true; res += c; continue; }
        if (c === "'" && prev !== '\\') { inChar = true; res += c; continue; }

        if (c === '(') { parenDepth++; res += c; continue; }
        if (c === ')') { parenDepth = Math.max(0, parenDepth - 1); res += c; continue; }

        if (c === '{') { res += '{\n'; continue; }
        if (c === '}') { res += '\n}\n'; continue; }
        if (c === ';') {
          res += parenDepth === 0 ? ';\n' : ';';
          continue;
        }
      } else {
        if (inLineComment && c === '\n') inLineComment = false;
        if (inBlockComment && c === '*' && next === '/') { inBlockComment = false; res += c; i++; res += '/'; continue; }
        if (inString && c === '"' && prev !== '\\') inString = false;
        if (inChar && c === "'" && prev !== '\\') inChar = false;
      }
      res += c;
    }

    let formatted = res.replace(/\r\n/g, '\n').split('\n').map(line => line.trim()).filter(line => line).join('\n');
    let indentLevel = 0;
    let lines = formatted.split('\n');
    let result = [];
    
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      const openBraces = (line.match(/\{/g) || []).length;
      const closeBraces = (line.match(/\}/g) || []).length;
      
      // If line starts with closing brace, indent it one level less visually
      if (line.match(/^}/)) {
        result.push('  '.repeat(Math.max(0, indentLevel - 1)) + line);
      } else {
        result.push('  '.repeat(indentLevel) + line);
      }
      
      indentLevel += (openBraces - closeBraces);
      if (indentLevel < 0) indentLevel = 0;
    }
    
    setCode(result.join('\n'));
  };

  const handleVisualize = () => {
    sessionStorage.setItem('derivskills_viz_code', code);
    sessionStorage.setItem('derivskills_viz_lang', language);
    router.push('/practice/visualization');
  };

  const handleReview = async () => {
    setIsRunning(true);
    setOutput('Analyzing code...');
    setErrorMsg('');
    
    let executableCode = code;
    const match = executableCode.match(/```[a-z]*\n([\s\S]*?)```/);
    if (match) {
      executableCode = match[1].trim();
      setCode(executableCode);
    }
    
    try {
      const res = await fetch('/api/agents/code-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ language, code: executableCode })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Code review failed');
      }
      
      let reviewText = `📊 Code Review Summary\n${'-'.repeat(40)}\n${data.summary}\n\n`;
      reviewText += `⏱ Complexity:\n• Time: ${data.timeComplexity}\n• Space: ${data.spaceComplexity}\n\n`;
      
      if (data.issues && data.issues.length > 0) {
        reviewText += `🚨 Issues Found:\n${data.issues.map(i => `• ${i}`).join('\n')}\n\n`;
      } else {
        reviewText += `✅ No major issues found.\n\n`;
      }
      
      if (data.improvements && data.improvements.length > 0) {
        reviewText += `💡 Suggested Improvements:\n${data.improvements.map(i => `• ${i}`).join('\n')}\n`;
      }
      
      setOutput(reviewText);
    } catch (err) {
      setErrorMsg(err.message);
      setOutput('');
    } finally {
      setIsRunning(false);
    }
  };

  const handleRun = async () => {
    setIsRunning(true);
    setOutput('');
    setErrorMsg('');
    
    // Safety check: strip markdown before executing if somehow still present
    let executableCode = code;
    const match = executableCode.match(/```[a-z]*\n([\s\S]*?)```/);
    if (match) {
      executableCode = match[1].trim();
      setCode(executableCode);
    }
    
    try {
      const res = await fetch('/api/run-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ language, code: executableCode })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Execution failed');
      }
      
      setOutput(data.output);
      if (data.error) {
        setErrorMsg(data.error);
      }
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setIsRunning(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;

      // Insert tab (2 spaces)
      setCode(code.substring(0, start) + '  ' + code.substring(end));

      // Put caret at right position again
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 2;
        }
      }, 0);
    }
  };

  const handlePaste = (e) => {
    const pastedText = e.clipboardData.getData('text');
    if (!pastedText) return;

    // Check if pasted text is wrapped in markdown blocks
    const match = pastedText.match(/```([a-z]*)\n([\s\S]*?)```/);
    if (match) {
      e.preventDefault();
      const rawLang = match[1].toLowerCase();
      const cleanCode = match[2].trim();
      
      // Auto update language
      let newLang = rawLang;
      if (newLang === 'js' || newLang === 'node') newLang = 'javascript';
      if (newLang === 'py') newLang = 'python';
      if (newLang === 'c++') newLang = 'cpp';
      
      if (!newLang) {
        if (cleanCode.includes('public static void main') || cleanCode.includes('import java.')) newLang = 'java';
        else if (cleanCode.includes('def ') || cleanCode.includes('print(')) newLang = 'python';
        else if (cleanCode.includes('#include')) newLang = cleanCode.includes('cout') ? 'cpp' : 'c';
      }
      
      if (['javascript', 'python', 'java', 'c', 'cpp'].includes(newLang)) {
        setLanguage(newLang);
      }
      
      // Insert clean code at cursor position
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      const newCode = code.substring(0, start) + cleanCode + code.substring(end);
      setCode(newCode);
      
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + cleanCode.length;
        }
      }, 0);
    }
  };

  const handleLanguageChange = async (e) => {
    const newLang = e.target.value;
    const oldLang = language;
    setLanguage(newLang);
    
    if (code.trim()) {
      setIsRunning(true);
      setOutput('Translating code to ' + newLang + '...');
      setErrorMsg('');
      try {
        const res = await fetch('/api/translate-code', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sourceCode: code, sourceLang: oldLang, targetLang: newLang })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Translation failed');
        setCode(data.translatedCode);
        setOutput('Translation successful! Ready to run.');
      } catch (err) {
        setErrorMsg('Failed to translate code: ' + err.message);
        setOutput('');
      } finally {
        setIsRunning(false);
      }
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh', 
      background: 'var(--bg-color)', 
      color: 'var(--text-color)',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {/* Header */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 2rem',
        background: 'var(--surface-color)',
        borderBottom: '1px solid var(--border-color)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, var(--brand), var(--accent))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 900,
            fontSize: '1.5rem',
            letterSpacing: '-0.02em'
          }}>
            Practice Studio
          </div>
          <div style={{ height: '24px', width: '1px', background: 'var(--border-color)' }} />
          <select 
            value={language}
            onChange={handleLanguageChange}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-color)',
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '0.9rem',
              fontWeight: 600,
              outline: 'none',
              cursor: 'pointer',
              appearance: 'none'
            }}
          >
            <option value="javascript">JavaScript (Node.js)</option>
            <option value="python">Python 3</option>
            <option value="java">Java</option>
            <option value="c">C</option>
            <option value="cpp">C++</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={handleFormatCode}
            disabled={!code.trim() || language === 'python'}
            style={{
              background: 'transparent',
              color: 'var(--text-color)',
              border: '1px solid var(--border-color)',
              padding: '10px 16px',
              borderRadius: '8px',
              fontWeight: 800,
              fontSize: '0.85rem',
              cursor: !code.trim() || language === 'python' ? 'not-allowed' : 'pointer',
              opacity: !code.trim() || language === 'python' ? 0.5 : 1,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
            onMouseEnter={e => { if (code.trim() && language !== 'python') e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
            title={language === 'python' ? 'Formatting disabled for Python to prevent indentation errors' : 'Auto-format code'}
          >
            🪄 Format
          </button>

          <button
            onClick={handleVisualize}
            disabled={!code.trim()}
            style={{
              background: 'transparent',
              color: 'var(--text-color)',
              border: '1px solid var(--border-color)',
              padding: '10px 24px',
              borderRadius: '8px',
              fontWeight: 800,
              fontSize: '0.9rem',
              cursor: !code.trim() ? 'not-allowed' : 'pointer',
              opacity: !code.trim() ? 0.5 : 1,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
          >
            👁 Visualize
          </button>

          <button
            onClick={handleReview}
            disabled={isRunning || !code.trim()}
            style={{
              background: 'transparent',
              color: 'var(--text-color)',
              border: '1px solid var(--border-color)',
              padding: '10px 24px',
              borderRadius: '8px',
              fontWeight: 800,
              fontSize: '0.9rem',
              cursor: isRunning || !code.trim() ? 'not-allowed' : 'pointer',
              opacity: isRunning || !code.trim() ? 0.5 : 1,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
            onMouseEnter={e => { if (!isRunning && code.trim()) e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
          >
            🤖 Review
          </button>

          <button 
            onClick={handleRun}
            disabled={isRunning || !code.trim()}
            style={{
              background: isRunning ? 'var(--surface-color)' : 'linear-gradient(135deg, var(--brand), var(--accent))',
              color: isRunning ? 'var(--text-secondary)' : 'white',
              border: isRunning ? '1px solid var(--border-color)' : 'none',
              padding: '10px 24px',
              borderRadius: '8px',
              fontWeight: 800,
              opacity: !code.trim() ? 0.5 : 1,
              cursor: isRunning || !code.trim() ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: isRunning ? 'none' : '0 4px 15px rgba(91,140,255,0.3)',
              transition: 'all 0.2s',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            {isRunning ? (
              <>
                <span style={{ animation: 'spin 2s linear infinite' }}>⚙️</span> Compiling...
              </>
            ) : (
              <>
                ▶ Run Code
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div style={{ 
        display: 'flex', 
        flex: 1, 
        overflow: 'hidden' 
      }}>
        {/* Editor Pane */}
        <div style={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column',
          borderRight: '1px solid var(--border-color)',
          background: '#0d0f14' // Slightly darker for editor
        }}>
          <div style={{
            padding: '12px 20px',
            background: 'var(--surface-color)',
            borderBottom: '1px solid var(--border-color)',
            fontSize: '0.8rem',
            fontWeight: 700,
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em'
          }}>
            Editor
          </div>
          <div style={{ flex: 1, position: 'relative' }}>
            <textarea
              ref={textareaRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={handleKeyDown}
              onPaste={handlePaste}
              spellCheck={false}
              style={{
                width: '100%',
                height: '100%',
                padding: '20px',
                background: 'transparent',
                color: '#e2e8f0',
                fontFamily: '"Fira Code", "JetBrains Mono", monospace',
                fontSize: '1rem',
                lineHeight: 1.6,
                border: 'none',
                outline: 'none',
                resize: 'none',
                tabSize: 2
              }}
              placeholder={`// Write your ${language} code here...`}
            />
          </div>
        </div>

        {/* Console Pane */}
        <div style={{ 
          width: '40%', 
          display: 'flex', 
          flexDirection: 'column',
          background: '#090a0f' // Very dark for console
        }}>
          <div style={{
            padding: '12px 20px',
            background: 'var(--surface-color)',
            borderBottom: '1px solid var(--border-color)',
            fontSize: '0.8rem',
            fontWeight: 700,
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span>Console Output</span>
            <button 
              onClick={() => { setOutput(''); setErrorMsg(''); }}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--text-color)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
            >
              Clear
            </button>
          </div>
          <div style={{ 
            flex: 1, 
            padding: '20px', 
            overflowY: 'auto',
            fontFamily: '"Fira Code", "JetBrains Mono", monospace',
            fontSize: '0.9rem',
            lineHeight: 1.6
          }}>
            {!output && !errorMsg && !isRunning && (
              <div style={{ color: 'var(--text-secondary)', opacity: 0.5, fontStyle: 'italic' }}>
                System ready. Awaiting execution...
              </div>
            )}
            
            {output && (
              <pre style={{ margin: 0, color: '#e2e8f0', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                {output}
              </pre>
            )}
            
            {errorMsg && (
              <pre style={{ 
                margin: output ? '20px 0 0 0' : 0, 
                color: '#ef4444', 
                whiteSpace: 'pre-wrap', 
                wordBreak: 'break-all',
                background: 'rgba(239, 68, 68, 0.05)',
                padding: '12px',
                borderRadius: '6px',
                borderLeft: '4px solid #ef4444'
              }}>
                {errorMsg}
              </pre>
            )}
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}} />
    </div>
  );
}
