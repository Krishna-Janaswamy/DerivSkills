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

  // Sync initial state if URL params change or load from sessionStorage
  useEffect(() => {
    let urlCode = null;
    let urlLang = null;
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      urlCode = params.get('code');
      urlLang = params.get('lang');
    }
    
    if (urlCode) {
      setCode(urlCode);
    } else {
      const storedCode = sessionStorage.getItem('ide_initial_code');
      const vizCode = sessionStorage.getItem('derivskills_viz_code');
      if (storedCode) {
        setCode(storedCode);
        sessionStorage.removeItem('ide_initial_code');
      } else if (vizCode) {
        setCode(vizCode);
      }
    }

    if (urlLang) {
      setLanguage(urlLang);
    } else {
      const storedLang = sessionStorage.getItem('ide_initial_lang');
      const vizLang = sessionStorage.getItem('derivskills_viz_lang');
      if (storedLang) {
        setLanguage(storedLang);
        sessionStorage.removeItem('ide_initial_lang');
      } else if (vizLang) {
        setLanguage(vizLang);
      }
    }
  }, []);

  const handleVisualize = () => {
    sessionStorage.setItem('derivskills_viz_code', code);
    sessionStorage.setItem('derivskills_viz_lang', language);
    router.push('/practice/visualization');
  };

  const handleRun = async () => {
    setIsRunning(true);
    setOutput('');
    setErrorMsg('');
    
    try {
      const res = await fetch('/api/run-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ language, code })
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
            onChange={(e) => setLanguage(e.target.value)}
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
