'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCloudSync } from './Providers';
import { TechGenSpinner } from './TechGenSpinner';
import { getSubtopicKey } from '@/src/utils/progress';

function OutcomeBrick({ outcome, moduleTitle, roleId, roleTitle, isLoaded, learningData, triggerSync }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [detail, setDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const isActiveTrack = isLoaded && learningData && learningData.activePlans && !!learningData.activePlans[roleId];
  const subtopicKey = getSubtopicKey(moduleTitle, outcome);
  const progressStatus = learningData?.subtopicProgress?.[roleId]?.[subtopicKey];
  const isDone = progressStatus === 'done';

  async function toggleExpand() {
     if (isExpanded) {
        setIsExpanded(false);
        return;
     }
     setIsExpanded(true);
     if (!detail && !isLoading) {
       setIsLoading(true);
       try {
         const res = await fetch('/api/topic-detail', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ topic: outcome, context: moduleTitle, roleTitle })
         });
         const data = await res.json();
         if (!res.ok) throw new Error(data.error);
         setDetail(data.detail);
       } catch (err) {
         setError(err.message || 'Failed to load details.');
       }
       setIsLoading(false);
     }
  }

  function handleToggleDone(e) {
     e.stopPropagation();
     if (!isActiveTrack) {
        alert("Please enroll in the track first to save your progress!");
        return;
     }
     const currentProgress = learningData.subtopicProgress?.[roleId] || {};
     triggerSync({
       ...learningData,
       subtopicProgress: {
         ...learningData.subtopicProgress,
         [roleId]: {
           ...currentProgress,
           [subtopicKey]: isDone ? undefined : 'done' 
         }
       }
     });
  }

  return (
    <div className="outcome-brick" style={{ 
      gridColumn: isExpanded ? '1 / -1' : 'auto',
      background: isExpanded ? 'rgba(0,0,0,0.1)' : 'var(--surface-color)',
      border: isExpanded ? '2px solid var(--brand)' : '2px solid var(--border-color)',
      borderRadius: '16px',
      overflow: 'hidden',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: isExpanded ? 'default' : 'pointer',
      boxShadow: isExpanded ? '0 10px 40px rgba(91,140,255,0.1)' : '0 6px 0 var(--border-color)',
      transform: isExpanded ? 'translateY(6px)' : 'translateY(0)',
      display: 'flex',
      flexDirection: 'column'
    }}
    onClick={() => { if(!isExpanded) toggleExpand(); }}
    onMouseEnter={e => {
        if (!isExpanded) {
          e.currentTarget.style.transform = 'translateY(2px)';
          e.currentTarget.style.boxShadow = '0 4px 0 var(--border-color)';
        }
    }}
    onMouseLeave={e => {
        if (!isExpanded) {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 6px 0 var(--border-color)';
        }
    }}
    >
       {/* Clickable Header */}
       <div className="outcome-brick-header"
         style={{ 
           display: 'flex', alignItems: 'center',
           padding: '1.25rem 1.5rem',
           background: isExpanded ? 'rgba(91,140,255,0.05)' : 'transparent',
         }}
       >
          <button 
             onClick={handleToggleDone}
             style={{ 
               display: 'flex', alignItems: 'center', gap: '6px',
               padding: '6px 12px', borderRadius: '999px', 
               border: isDone ? '1px solid rgba(16,185,129,0.3)' : '1px solid var(--border-color)',
               background: isDone ? 'rgba(16,185,129,0.1)' : 'var(--surface-color)',
               color: isDone ? '#10b981' : 'var(--text-secondary)',
               fontWeight: 700, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em',
               marginRight: '1rem', cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
               boxShadow: isDone ? '0 0 15px rgba(16,185,129,0.2) inset, 0 0 10px rgba(16,185,129,0.2)' : 'none',
             }}
             title={isActiveTrack ? "Toggle Status" : "Enroll to track progress"}
             onMouseEnter={e => {
                if (!isDone) {
                   e.currentTarget.style.borderColor = 'var(--text-secondary)';
                   e.currentTarget.style.color = 'var(--text-color)';
                }
             }}
             onMouseLeave={e => {
                if (!isDone) {
                   e.currentTarget.style.borderColor = 'var(--border-color)';
                   e.currentTarget.style.color = 'var(--text-secondary)';
                }
             }}
          >
             {isDone ? (
               <><div style={{ fontSize: '0.9rem', lineHeight: 1 }}>🌟</div> Mastered</>
             ) : (
               <><div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor', boxShadow: '0 0 5px currentColor' }} /> Pending</>
             )}
          </button>
          <div style={{ flex: 1, fontSize: isExpanded ? '1.3rem' : '1.1rem', fontWeight: 600, color: isDone ? 'var(--text-secondary)' : 'var(--text-color)', textDecoration: isDone ? 'line-through' : 'none', transition: 'all 0.2s' }}>
             {outcome}
          </div>
          {isExpanded && (
             <button 
                onClick={(e) => { e.stopPropagation(); toggleExpand(); }}
                style={{ background: 'transparent', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '6px 12px', color: 'var(--text-secondary)', cursor: 'pointer', fontWeight: 600 }}
             >
                Close
             </button>
          )}
       </div>
       
       {/* Expanded Body */}
       <div style={{ 
          display: 'grid',
          gridTemplateRows: isExpanded ? '1fr' : '0fr',
          transition: 'grid-template-rows 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
       }}>
           <div style={{ overflow: 'hidden' }}>
             <div style={{ padding: '0 2rem 2rem 2rem' }}>
               <div style={{ height: '1px', background: 'var(--border-color)', margin: '0 0 2rem 0' }} />
               
               {isLoading ? (
                 <div style={{ padding: '2rem 0', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                   <div style={{ animation: 'spin 2s linear infinite', fontSize: '1.5rem' }}>✨</div>
                   <span>Loading learning content...</span>
                 </div>
               ) : error ? (
                 <div style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: '8px' }}>
                   Failed: {error}
                 </div>
               ) : detail ? (
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', animation: 'fadeIn 0.5s ease' }}>
                    <div>
                      <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--brand)' }}>Definition</h4>
                      <p style={{ margin: 0, fontSize: '1.1rem', lineHeight: 1.6, color: 'var(--text-color)' }}>{detail.definition}</p>
                    </div>

                    <div className="topic-detail-two-col" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '2rem' }}>
                      <div style={{ background: 'var(--bg-color)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                        <h4 style={{ margin: '0 0 1rem 0', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>Core Concepts</h4>
                        <ul style={{ margin: 0, paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-color)' }}>
                          {(detail.descriptionPoints || [detail.description]).map((point, i) => (
                            <li key={i} style={{ fontSize: '1rem', lineHeight: 1.5 }}>{point}</li>
                          ))}
                        </ul>
                      </div>

                      <div style={{ background: 'var(--bg-color)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                        <h4 style={{ margin: '0 0 1rem 0', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>Real World Usage</h4>
                        <ul style={{ margin: 0, paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'var(--text-color)' }}>
                          {(detail.usagePoints || []).map((point, i) => (
                            <li key={i} style={{ fontSize: '1rem', lineHeight: 1.5 }}>{point}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div style={{ position: 'relative' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0 0 0.5rem 0' }}>
                        <h4 style={{ margin: 0, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>Practical Illustration</h4>
                        {(() => {
                           const codeStr = detail.illustration || detail.example || '';
                           if (!codeStr) return null;
                           
                           const t = codeStr.toLowerCase();
                           const hasCodeSyntax = t.includes('```') || t.includes('public class') || t.includes('system.out') || t.includes('console.log') || t.includes('function ') || t.includes('const ') || t.includes('let ') || t.includes('def ') || t.includes('print(') || t.includes('import ') || t.includes('#include') || t.includes('int main') || t.includes('return ') || t.includes('class ') || t.includes('var ') || t.includes('for(') || t.includes('for ');
                           const hasBraces = (codeStr.match(/[{}]/g) || []).length >= 2;
                           const hasSemis = (codeStr.match(/;/g) || []).length >= 2;
                           const isLikelyCode = hasCodeSyntax || hasBraces || hasSemis;
                           
                           if (!isLikelyCode) return null;
                           
                           return (
                             <button 
                               onClick={(e) => {
                                 e.stopPropagation();
                                 let detectedLang = 'python';
                                 if (codeStr.includes('public class') || codeStr.includes('System.out.print')) detectedLang = 'java';
                                 else if (codeStr.includes('console.log') || codeStr.includes('const ') || codeStr.includes('let ')) detectedLang = 'javascript';
                                 
                                 sessionStorage.setItem('ide_initial_code', codeStr);
                                 sessionStorage.setItem('ide_initial_lang', detectedLang);
                                 window.open('/practice', '_blank');
                               }}
                               style={{
                                 background: 'linear-gradient(135deg, var(--brand), var(--accent))',
                                 color: 'white',
                                 border: 'none',
                                 borderRadius: '6px',
                                 padding: '6px 12px',
                                 fontSize: '0.75rem',
                                 fontWeight: 700,
                                 cursor: 'pointer',
                                 display: 'flex',
                                 alignItems: 'center',
                                 gap: '6px',
                                 boxShadow: '0 2px 10px rgba(91,140,255,0.2)',
                                 transition: 'all 0.2s'
                               }}
                             >
                               <span style={{ fontSize: '1rem' }}>💻</span> Practice in IDE
                             </button>
                           );
                        })()}
                      </div>
                      <div style={{ margin: 0, fontSize: '1rem', lineHeight: 1.7, background: '#0f1117', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border-color)', borderLeft: '4px solid var(--brand)', fontFamily: 'monospace', whiteSpace: 'pre-wrap', color: '#e2e8f0', overflowX: 'auto' }}>
                        {detail.illustration || detail.example}
                      </div>
                    </div>
                 </div>
               ) : null}
             </div>
           </div>
       </div>
    </div>
  )
}

export function ImmersiveCurriculum({ role }) {
  const router = useRouter();
  const { learningData, triggerSync, isLoaded } = useCloudSync();

  if (!role || !role.roadmap) return null;

  const phases = [];
  let currentGroup = { title: 'Core Tracks', modules: [] };
  
  role.roadmap.forEach(mod => {
    if (mod.phaseGroup) {
      if (currentGroup.modules.length > 0) phases.push(currentGroup);
      currentGroup = { title: mod.phaseGroup, modules: [mod] };
    } else {
      currentGroup.modules.push(mod);
    }
  });
  if (currentGroup.modules.length > 0) phases.push(currentGroup);

  const [activePhaseIdx, setActivePhaseIdx] = useState(0);
  const [activeModuleIdx, setActiveModuleIdx] = useState(0);

  const activePhase = phases[activePhaseIdx] || phases[0];
  const activeModule = activePhase?.modules[activeModuleIdx] || activePhase?.modules[0];

  const isActiveTrack = isLoaded && learningData && learningData.activePlans && !!learningData.activePlans[role.id];

  function handleStart() {
    const defaultPlan = {
      roleId: role.id,
      roleTitle: role.title,
      targetTimeline: role.goalWindow,
      overview: role.summary,
      roleFit: 'Following the standard enterprise track.',
      priorities: ['Consistency', 'Focus on Outcomes'],
      firstSteps: ['Review the first module', 'Set a study schedule'],
      weeklyPlan: role.roadmap.map(node => ({
        phase: node.phaseGroup || node.title,
        duration: node.duration,
        focus: node.title,
        outcome: `Complete all ${node.outcomes?.length || 0} core subtopics for this module.`,
        subtopics: node.outcomes || []
      }))
    };
    const newPlans = { ...(learningData?.activePlans || {}), [role.id]: defaultPlan };
    triggerSync({ ...(learningData || {}), activePlans: newPlans });
  }

  function handleEnd() {
    if (window.confirm(`Are you sure you want to completely discard tracking and progress for the ${role.title} track?`)) {
      const newPlans = { ...learningData.activePlans };
      delete newPlans[role.id];
      const newProgress = { ...learningData.subtopicProgress };
      delete newProgress[role.id];
      const newTime = { ...learningData.subtopicTimeTracker };
      delete newTime[role.id];
      triggerSync({ ...learningData, activePlans: newPlans, subtopicProgress: newProgress, subtopicTimeTracker: newTime });
    }
  }

  return (
    <div className="curriculum-shell" style={{ display: 'flex', minHeight: 'calc(100vh - 80px)', background: 'var(--bg-color)', width: '100vw', margin: '0 calc(-50vw + 50%)', position: 'relative' }}>
      
      {/* LEFT SIDEBAR: Navigational Blueprint */}
      <div className="curriculum-sidebar" style={{ 
        width: '360px', 
        borderRight: '1px solid var(--border-color)', 
        background: 'var(--surface-color)',
        display: 'flex', flexDirection: 'column',
        position: 'sticky',
        top: 0,
        height: 'calc(100vh - 80px)',
        overflow: 'hidden',
        zIndex: 50
      }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, var(--brand), var(--accent))' }} />
          <h1 style={{ fontSize: '1.6rem', lineHeight: 1.1, margin: '0 0 0.5rem 0', fontWeight: 900, letterSpacing: '-0.02em' }}>{role.title}</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.4, margin: 0 }}>{role.summary}</p>
          
          <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {!isLoaded ? (
              <div style={{ width: '100%', padding: '0.75rem', background: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: '6px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem', opacity: 0.7 }}>
                Syncing Profile...
              </div>
            ) : isActiveTrack ? (
              <>
                <button 
                  onClick={() => router.push('/my-learning')}
                  style={{ width: '100%', padding: '0.75rem', background: 'linear-gradient(135deg, var(--brand), var(--accent))', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 700, boxShadow: '0 4px 10px rgba(91,140,255,0.2)', transition: 'transform 0.2s', letterSpacing: '0.02em', fontSize: '0.9rem' }}
                >
                  Go to Active Dashboard
                </button>
                <button 
                  onClick={handleEnd}
                  style={{ width: '100%', padding: '0.5rem', background: 'transparent', color: '#ef4444', border: 'none', cursor: 'pointer', fontSize: '0.8rem' }}
                >
                  Unenroll & Clear Progress
                </button>
              </>
            ) : (
              <button 
                onClick={handleStart}
                style={{ width: '100%', padding: '0.75rem', background: 'transparent', color: 'var(--text-color)', border: '2px solid var(--brand)', borderRadius: '6px', cursor: 'pointer', fontWeight: 700, fontSize: '0.95rem', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--brand)'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-color)'; }}
              >
                Enroll in Track
              </button>
            )}
          </div>
        </div>

        <div style={{ overflowY: 'auto', padding: '1.5rem 1rem 3rem 1rem', flex: 1, scrollbarWidth: 'none' }}>
          {phases.map((phase, pIdx) => (
            <div key={pIdx} style={{ marginBottom: '2rem' }}>
              <div style={{ marginBottom: '1rem', paddingLeft: '14px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--brand)', letterSpacing: '0.05em', textTransform: 'uppercase', opacity: 0.9 }}>
                  {(phase.title.split('—')[0] || phase.title).trim()} 
                </span>
                {(() => {
                   const m = phase.title.match(/\((.*?)\)/);
                   const lvl = m ? m[1] : null;
                   if (!lvl) return null;
                   const cMap = {
                     'beginner': { bg: 'rgba(16, 185, 129, 0.1)', fg: '#10b981' },
                     'intermediate': { bg: 'rgba(245, 158, 11, 0.1)', fg: '#f59e0b' },
                     'advanced': { bg: 'rgba(239, 68, 68, 0.1)', fg: '#ef4444' },
                     'master': { bg: 'rgba(139, 92, 246, 0.1)', fg: '#8b5cf6' }
                   };
                   const colors = cMap[lvl.toLowerCase()] || { bg: 'rgba(255,255,255,0.1)', fg: 'var(--text-secondary)' };
                   return (
                     <span style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', padding: '2px 6px', borderRadius: '4px', background: colors.bg, color: colors.fg }}>
                       {lvl}
                     </span>
                   )
                })()}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {phase.modules.map((mod, mIdx) => {
                  const isSelected = activePhaseIdx === pIdx && activeModuleIdx === mIdx;
                  return (
                    <button
                      key={mIdx}
                      onClick={() => { setActivePhaseIdx(pIdx); setActiveModuleIdx(mIdx); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      style={{
                        textAlign: 'left',
                        padding: '12px 14px',
                        background: isSelected ? 'rgba(91,140,255,0.08)' : 'transparent',
                        border: 'none',
                        borderLeft: isSelected ? '3px solid var(--brand)' : '3px solid transparent',
                        color: isSelected ? 'var(--text-color)' : 'var(--text-secondary)',
                        borderRadius: '0 8px 8px 0',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        fontWeight: isSelected ? 700 : 500,
                        transition: 'all 0.2s',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <span style={{ maxWidth: '85%' }}>{mod.title}</span>
                      {isSelected && <span style={{ color: 'var(--brand)', fontSize: '1.2rem' }}>→</span>}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT MAIN PANEL: Brick Wall Area */}
      <div className="curriculum-main" style={{ 
        flex: 1, 
        padding: '5rem 6rem', 
        overflowY: 'auto', 
        height: 'calc(100vh - 80px)', 
        position: 'relative' 
      }}>
         <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--brand)', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.85rem' }}>
                  {(activePhase.title.split('—')[0] || activePhase.title).trim()}
                </span>
                {(() => {
                   const m = activePhase.title.match(/\((.*?)\)/);
                   const lvl = m ? m[1] : null;
                   if (!lvl) return null;
                   const cMap = {
                     'beginner': { bg: 'rgba(16, 185, 129, 0.1)', fg: '#10b981' },
                     'intermediate': { bg: 'rgba(245, 158, 11, 0.1)', fg: '#f59e0b' },
                     'advanced': { bg: 'rgba(239, 68, 68, 0.1)', fg: '#ef4444' },
                     'master': { bg: 'rgba(139, 92, 246, 0.1)', fg: '#8b5cf6' }
                   };
                   const colors = cMap[lvl.toLowerCase()] || { bg: 'rgba(255,255,255,0.1)', fg: 'var(--text-secondary)' };
                   return (
                     <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', background: colors.bg, color: colors.fg, textTransform: 'uppercase' }}>
                       {lvl}
                     </span>
                   )
                })()}
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
                <h2 style={{ fontSize: '2.8rem', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1, margin: 0, color: 'var(--text-color)' }}>
                  {activeModule.title}
                </h2>
                
                <div style={{ 
                  display: 'inline-flex', alignItems: 'center', background: 'rgba(91,140,255,0.05)', padding: '8px 16px', 
                  borderRadius: '12px', border: '1px solid rgba(91,140,255,0.15)', color: 'var(--brand)', fontWeight: 700, 
                  fontSize: '0.9rem' 
                }}>
                  <span style={{ marginRight: '6px' }}>⏱️</span> {activeModule.duration}
                </div>
              </div>
            </div>

            {/* THE BRICK WALL OUTCOMES */}
            <div className="outcomes-grid" style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
              gap: '1.5rem',
              alignItems: 'start'
            }}>
              {(activeModule.outcomes || []).map((outcome, idx) => (
                <OutcomeBrick 
                  key={`${activeModule.title}-${idx}`} 
                  outcome={outcome} 
                  moduleTitle={activeModule.title} 
                  roleId={role.id} 
                  roleTitle={role.title} 
                  isLoaded={isLoaded} 
                  learningData={learningData} 
                  triggerSync={triggerSync} 
                />
              ))}
            </div>
            
            <div style={{ marginTop: '5rem', padding: '3rem', borderTop: '1px solid var(--border-color)', textAlign: 'center' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '1.5rem' }}>Ready to proceed to the next fundamental?</p>
              <button 
                onClick={() => {
                   let nextMod = activeModuleIdx + 1;
                   let nextPhase = activePhaseIdx;
                   if (nextMod >= activePhase.modules.length) {
                      nextMod = 0;
                      nextPhase = Math.min(nextPhase + 1, phases.length - 1);
                   }
                   setActiveModuleIdx(nextMod);
                   setActivePhaseIdx(nextPhase);
                   window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{ padding: '1rem 3rem', background: 'transparent', color: 'var(--text-color)', border: '1px solid var(--border-color)', borderRadius: '999px', fontSize: '1.1rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--surface-color)'; e.currentTarget.style.borderColor = 'var(--text-color)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'var(--border-color)'; }}
              >
                Proceed to Next Module
              </button>
            </div>
         </div>
      </div>
    </div>
  )
}
