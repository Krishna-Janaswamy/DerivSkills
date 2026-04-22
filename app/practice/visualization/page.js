'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function VisualizationPage() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('');
  const [traceData, setTraceData] = useState(null);
  const [vizStep, setVizStep] = useState(0);
  const [isTracing, setIsTracing] = useState(true);

  useEffect(() => {
    const storedCode = sessionStorage.getItem('derivskills_viz_code');
    const storedLang = sessionStorage.getItem('derivskills_viz_lang') || 'javascript';
    
    if (!storedCode) {
      alert("No code found to visualize.");
      router.push('/practice');
      return;
    }

    setCode(storedCode);
    setLanguage(storedLang);
    fetchTrace(storedCode, storedLang);
  }, []);

  const fetchTrace = async (codeToRun, langToRun) => {
    try {
      const res = await fetch('/api/trace', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: codeToRun, language: langToRun })
      });
      
      const data = await res.json();
      
      if (data && data.trace) {
        setTraceData(data.trace);
        setVizStep(0);
      } else if (data && data.error) {
        alert("Execution Error: " + data.error);
        router.push('/practice');
      } else {
        alert("Failed to generate trace for this code.");
        router.push('/practice');
      }
    } catch (e) {
       alert("Error fetching execution trace. Our engine could not process this code.");
       router.push('/practice');
    } finally {
      setIsTracing(false);
    }
  };

  const handleVizStep = (direction) => {
    if (!traceData) return;
    let newStep = vizStep + direction;
    if (newStep < 0) newStep = 0;
    if (newStep >= traceData.length) newStep = traceData.length - 1;
    setVizStep(newStep);
  };

  const renderValue = (val, heap) => {
    if (val === null) return 'null';
    if (val === undefined) return 'undefined';
    if (Array.isArray(val)) {
      if (val[0] === 'REF') {
        const refId = val[1];
        return <span style={{ color: '#fbbf24', fontWeight: 700 }}>&rarr; id {refId}</span>;
      }
      if (val[0] === 'JS_SPECIAL_VAL' || val[0] === 'SPECIAL_FLOAT') {
        return <span style={{ color: '#f472b6', fontStyle: 'italic', fontWeight: 600 }}>{val[1]}</span>;
      }
      if (val[0] === 'C_DATA') {
        // C_DATA format: ["C_DATA", "0x...", "type", value]
        const type = val[2];
        const innerVal = val[3];
        return (
          <span style={{ display: 'inline-flex', gap: '4px', alignItems: 'center' }}>
             <span style={{ color: '#94a3b8', fontSize: '0.8em' }}>({type})</span>
             <span>{renderValue(innerVal, heap)}</span>
          </span>
        );
      }
      return `[${val.join(', ')}]`;
    }
    if (typeof val === 'string') return <span style={{ color: '#10b981' }}>"{val}"</span>;
    if (typeof val === 'number') return <span style={{ color: '#60a5fa' }}>{val}</span>;
    if (typeof val === 'boolean') return <span style={{ color: '#f472b6' }}>{val ? 'true' : 'false'}</span>;
    return String(val);
  };

  if (isTracing) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: 'var(--bg-color)', color: 'white', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
         <div style={{ animation: 'spin 2s linear infinite', fontSize: '3rem', marginBottom: '1rem' }}>⚙️</div>
         <h2 style={{ letterSpacing: '0.05em' }}>ANALYZING CODE TRACE...</h2>
         <style dangerouslySetInnerHTML={{__html: `@keyframes spin { 100% { transform: rotate(360deg); } }`}} />
      </div>
    );
  }

  if (!traceData) return null;

  const currentTrace = traceData[vizStep];

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
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1rem 2rem', background: 'var(--surface-color)', borderBottom: '1px solid var(--border-color)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, var(--brand), var(--accent))',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            fontWeight: 900, fontSize: '1.5rem', letterSpacing: '-0.02em'
          }}>
            DerivSkills Execution Engine
          </div>
          <div style={{ height: '24px', width: '1px', background: 'var(--border-color)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ color: 'var(--brand)', fontSize: '0.8rem', fontWeight: 800, padding: '4px 8px', background: 'rgba(91,140,255,0.1)', borderRadius: '4px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              NATIVE TRACER
            </div>
            <select 
              value={language}
              onChange={(e) => {
                 const newLang = e.target.value;
                 setLanguage(newLang);
                 sessionStorage.setItem('derivskills_viz_lang', newLang);
                 setIsTracing(true);
                 fetchTrace(code, newLang);
              }}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-color)',
                padding: '6px 12px',
                borderRadius: '6px',
                fontSize: '0.8rem',
                fontWeight: 600,
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="javascript">JS</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="c">C</option>
              <option value="cpp">C++</option>
            </select>
          </div>
        </div>
        
        <button 
          onClick={() => router.push('/practice')}
          style={{
            background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)',
            padding: '8px 16px', borderRadius: '8px', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s', textTransform: 'uppercase', letterSpacing: '0.05em'
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#ef4444'; e.currentTarget.style.color = '#fff'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'; e.currentTarget.style.color = '#ef4444'; }}
        >
          ← Back to Practice
        </button>
      </header>

      <div style={{ flex: 1, display: 'flex', padding: '2rem', gap: '2rem', overflow: 'hidden' }}>
        {/* Left: Code Box */}
        <div style={{ flex: 1, background: '#0d0f14', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
          <div style={{ padding: '1rem 1.5rem', background: 'var(--surface-color)', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Source Code Playback
          </div>
          <div style={{ padding: '1rem', overflowY: 'auto', flex: 1, fontFamily: '"Fira Code", "JetBrains Mono", monospace', fontSize: '1rem', lineHeight: 1.6 }}>
             {code.split('\n').map((line, idx) => (
               <div key={idx} style={{ 
                 display: 'flex', 
                 background: currentTrace.line === idx + 1 ? 'rgba(91,140,255,0.15)' : 'transparent',
                 borderLeft: currentTrace.line === idx + 1 ? '3px solid var(--brand)' : '3px solid transparent',
                 padding: '4px 8px',
                 color: currentTrace.line === idx + 1 ? '#fff' : '#94a3b8',
                 transition: 'all 0.1s ease',
                 borderRadius: '0 4px 4px 0'
               }}>
                 <span style={{ width: '40px', opacity: currentTrace.line === idx + 1 ? 0.8 : 0.4, userSelect: 'none', textAlign: 'right', paddingRight: '12px' }}>{idx + 1}</span>
                 <span style={{ whiteSpace: 'pre' }}>{line || ' '}</span>
               </div>
             ))}
             {currentTrace.event === 'uncaught_exception' && (
                <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.3)', fontWeight: 600, fontSize: '0.9rem', lineHeight: 1.5 }}>
                   ❌ <span style={{ textTransform: 'uppercase', fontSize: '0.75rem', opacity: 0.8, display: 'block', marginBottom: '4px' }}>Exception Details:</span>
                   {currentTrace.exception_msg}
                </div>
             )}
             
             {currentTrace.stdout && (
                <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(91,140,255,0.1)', color: '#60a5fa', borderRadius: '8px', border: '1px solid rgba(91,140,255,0.3)', fontFamily: '"Fira Code", monospace', fontSize: '0.9rem' }}>
                   <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', marginBottom: '4px', opacity: 0.8, color: '#94a3b8' }}>Console Output:</div>
                   {currentTrace.stdout}
                </div>
             )}

             {vizStep === traceData.length - 1 && currentTrace.event !== 'uncaught_exception' && (
               <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderRadius: '8px', border: '1px solid rgba(16,185,129,0.2)', textAlign: 'center', fontWeight: 600 }}>
                 ✅ Execution Complete
               </div>
             )}
          </div>
        </div>

        {/* Right: Frames & Objects Controls */}
        <div style={{ width: '450px', display: 'flex', flexDirection: 'column', gap: '1.5rem', overflow: 'hidden' }}>
           {/* Controls */}
           <div style={{ background: 'var(--surface-color)', borderRadius: '12px', border: '1px solid var(--border-color)', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', flexShrink: 0 }}>
              <div style={{ fontWeight: 800, color: '#fff', fontSize: '1.1rem', letterSpacing: '-0.02em' }}>Execution Controls</div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => handleVizStep(-1)} disabled={vizStep <= 0} style={{ flex: 1, padding: '12px', background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-color)', borderRadius: '8px', cursor: vizStep <= 0 ? 'not-allowed' : 'pointer', fontWeight: 700, opacity: vizStep <= 0 ? 0.4 : 1, transition: 'all 0.2s' }}>
                   ← Step Back
                </button>
                <button onClick={() => handleVizStep(1)} disabled={vizStep >= traceData.length - 1} style={{ flex: 1, padding: '12px', background: 'linear-gradient(135deg, var(--brand), var(--accent))', border: 'none', color: '#fff', borderRadius: '8px', cursor: vizStep >= traceData.length - 1 ? 'not-allowed' : 'pointer', fontWeight: 700, opacity: vizStep >= traceData.length - 1 ? 0.4 : 1, transition: 'all 0.2s', boxShadow: '0 4px 15px rgba(91,140,255,0.3)' }}>
                   Step Fwd →
                </button>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '0.5rem' }}>
                 <div style={{ flex: 1, height: '6px', background: 'var(--bg-color)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${(vizStep / Math.max(1, traceData.length - 1)) * 100}%`, background: 'var(--brand)', transition: 'width 0.3s ease' }} />
                 </div>
                 <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600, minWidth: '40px', textAlign: 'right' }}>
                   {vizStep} / {traceData.length - 1}
                 </div>
              </div>
           </div>

           {/* Frames and Objects Inspector */}
           <div style={{ flex: 1, background: 'var(--surface-color)', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
              <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <span style={{ color: 'var(--text-secondary)', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Frames & Objects</span>
                 <span style={{ fontSize: '0.65rem', background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px', color: 'var(--text-secondary)' }}>NATIVE HEAP INSPECTOR</span>
              </div>
              <div style={{ padding: '1rem', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                 
                 {/* Frames Section */}
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>Stack Frames</div>
                    
                    {Object.keys(currentTrace.globals || {}).length > 0 && (
                      <div style={{ background: 'var(--bg-color)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', padding: '10px' }}>
                         <div style={{ color: 'var(--brand)', fontWeight: 800, fontSize: '0.85rem', marginBottom: '8px' }}>Global Frame</div>
                         {Object.entries(currentTrace.globals).map(([k, v]) => (
                            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid rgba(255,255,255,0.02)', fontFamily: '"Fira Code", monospace', fontSize: '0.85rem' }}>
                               <span style={{ fontWeight: 600 }}>{k === '__return__' ? <span style={{color: '#f472b6'}}>Return Value</span> : k}</span>
                               <span>{renderValue(v, currentTrace.heap)}</span>
                            </div>
                         ))}
                      </div>
                    )}

                    {(currentTrace.stack_to_render || []).map((frame, i) => (
                      <div key={i} style={{ background: 'var(--bg-color)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', padding: '10px' }}>
                         <div style={{ color: 'var(--brand)', fontWeight: 800, fontSize: '0.85rem', marginBottom: '8px' }}>{frame.func_name}</div>
                         {Object.keys(frame.encoded_locals || {}).length === 0 && <span style={{fontSize: '0.8rem', opacity: 0.5}}>(empty)</span>}
                         {Object.entries(frame.encoded_locals || {}).map(([k, v]) => (
                            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid rgba(255,255,255,0.02)', fontFamily: '"Fira Code", monospace', fontSize: '0.85rem' }}>
                               <span style={{ fontWeight: 600 }}>{k === '__return__' ? <span style={{color: '#f472b6'}}>Return Value</span> : k}</span>
                               <span>{renderValue(v, currentTrace.heap)}</span>
                            </div>
                         ))}
                      </div>
                    ))}
                 </div>

                 {/* Objects / Heap Section */}
                 {Object.keys(currentTrace.heap || {}).length > 0 && (
                   <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>Objects (Heap)</div>
                      {Object.entries(currentTrace.heap).map(([objId, objData]) => (
                        <div key={objId} style={{ background: 'var(--bg-color)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', padding: '10px' }}>
                           <div style={{ color: '#fbbf24', fontWeight: 800, fontSize: '0.8rem', marginBottom: '4px' }}>id {objId}</div>
                           <div style={{ fontFamily: '"Fira Code", monospace', fontSize: '0.85rem' }}>
                              {objData[0] === 'LIST' || objData[0] === 'TUPLE' ? (
                                  <div>
                                    <span style={{color: '#94a3b8'}}>{objData[0] === 'LIST' ? '[' : '('} </span>
                                    {objData.slice(1).map((v, idx) => (
                                       <span key={idx}>{idx > 0 && ', '}{renderValue(v, currentTrace.heap)}</span>
                                    ))}
                                    <span style={{color: '#94a3b8'}}> {objData[0] === 'LIST' ? ']' : ')'}</span>
                                  </div>
                              ) : objData[0] === 'DICT' ? (
                                  <div>
                                    <span style={{color: '#94a3b8'}}>{"{"}</span>
                                    {objData.slice(1).map((pair, idx) => (
                                       <div key={idx} style={{ paddingLeft: '1rem', color: '#e2e8f0' }}>
                                          {renderValue(pair[0], currentTrace.heap)}: {renderValue(pair[1], currentTrace.heap)}
                                       </div>
                                    ))}
                                    <span style={{color: '#94a3b8'}}>{"}"}</span>
                                  </div>
                              ) : objData[0] === 'JS_FUNCTION' ? (
                                  <div style={{ color: '#60a5fa', whiteSpace: 'pre-wrap', wordBreak: 'break-all', background: 'rgba(96,165,250,0.1)', padding: '12px', borderRadius: '6px', marginTop: '4px', lineHeight: 1.5 }}>
                                     <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 800 }}>Function Body</div>
                                     {objData[2]}
                                  </div>
                              ) : objData[0] === 'INSTANCE' || objData[0] === 'CLASS' ? (
                                  <div>
                                    <span style={{color: '#f472b6', fontWeight: 700}}>{objData[1]} </span><span style={{color: '#94a3b8'}}>{"{"}</span>
                                    {objData.slice(2).map((pair, idx) => (
                                       <div key={idx} style={{ paddingLeft: '1rem', color: '#e2e8f0' }}>
                                          {renderValue(pair[0], currentTrace.heap)}: {renderValue(pair[1], currentTrace.heap)}
                                       </div>
                                    ))}
                                    <span style={{color: '#94a3b8'}}>{"}"}</span>
                                  </div>
                              ) : objData[0] === 'C_ARRAY' ? (
                                  <div>
                                    <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginBottom: '4px' }}>C Array <span style={{color: '#f472b6'}}>{objData[2]}</span></div>
                                    <span style={{color: '#94a3b8'}}>[ </span>
                                    {objData.slice(3).map((v, idx) => (
                                       <span key={idx}>{idx > 0 && ', '}{renderValue(v, currentTrace.heap)}</span>
                                    ))}
                                    <span style={{color: '#94a3b8'}}> ]</span>
                                  </div>
                              ) : objData[0] === 'C_STRUCT' ? (
                                  <div>
                                    <div style={{ color: '#94a3b8', fontSize: '0.75rem', marginBottom: '4px' }}>Struct <span style={{color: '#f472b6'}}>{objData[2]}</span></div>
                                    <span style={{color: '#94a3b8'}}>{"{"}</span>
                                    {objData.slice(3).map((pair, idx) => (
                                       <div key={idx} style={{ paddingLeft: '1rem', color: '#e2e8f0' }}>
                                          <span style={{color: '#f472b6'}}>{pair[0]}</span>: {renderValue(pair[1], currentTrace.heap)}
                                       </div>
                                    ))}
                                    <span style={{color: '#94a3b8'}}>{"}"}</span>
                                  </div>
                              ) : objData[0] === 'C_DATA' ? (
                                  <div>
                                     <span style={{ color: '#94a3b8' }}>({objData[2]})</span> {renderValue(objData[3], currentTrace.heap)}
                                  </div>
                              ) : (
                                  <span style={{color: '#e2e8f0'}}>{JSON.stringify(objData)}</span>
                              )}
                           </div>
                        </div>
                      ))}
                   </div>
                 )}

              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
