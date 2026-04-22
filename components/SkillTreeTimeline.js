'use client';

import { useState } from 'react';
import { TopicDetailInline } from './TopicDetailInline';

export function SkillTreeTimeline({ roadmap, roleTitle, roleId }) {
  if (!roadmap || roadmap.length === 0) return null;

  return (
    <div style={{ 
      width: '100%', 
      maxWidth: '1000px', 
      margin: '0 auto', 
      paddingTop: '3rem',
      paddingBottom: '5rem',
      position: 'relative'
    }}>
      
      {/* The Central Absolute Backbone Stem */}
      <div className="classic-stem" style={{ 
        position: 'absolute', 
        top: '0', 
        bottom: '0', 
        left: '50%', 
        transform: 'translateX(-50%)',
        width: '3px', 
        background: 'var(--border-color)',
        zIndex: 0
      }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', position: 'relative', zIndex: 1 }}>
        {roadmap.map((module, phaseIdx) => (
          <div key={phaseIdx} style={{ display: 'contents' }}>
            {module.phaseGroup && (
              <div style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                margin: '4rem 0 2rem 0',
                zIndex: 10
              }}>
                <div style={{
                  background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)',
                  border: '1px solid var(--brand)',
                  color: 'white',
                  padding: '16px 48px',
                  borderRadius: '16px',
                  fontWeight: 900,
                  fontSize: '1.4rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  textAlign: 'center'
                }}>
                  {module.phaseGroup}
                </div>
              </div>
            )}
            <TreeNode module={module} roleTitle={roleTitle} roleId={roleId} />
          </div>
        ))}
      </div>
      
      {/* Mobile Responsive Override to collapse tree to single column if screen is tight */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 768px) {
          .classic-stem {
            left: 20px !important;
            transform: none !important;
          }
          .branch-row {
            justify-content: flex-end !important;
          }
          .branch-line {
            left: 20px !important;
            right: auto !important;
            width: calc(100% - 20px - 85%) !important; 
          }
          .stem-dot {
            left: 20px !important;
          }
          .atomic-box {
            width: 85% !important;
          }
        }
      `}} />
    </div>
  );
}

function TreeNode({ module, roleTitle, roleId }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* The Central Root Phase Badge */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: isOpen ? 'var(--brand)' : 'var(--bg-color)',
          border: `2px solid ${isOpen ? 'var(--brand)' : 'var(--text-color)'}`,
          color: isOpen ? '#fff' : 'var(--text-color)',
          padding: '12px 35px',
          borderRadius: '999px',
          fontWeight: 800,
          fontSize: '1.2rem',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          marginBottom: isOpen ? '2.5rem' : '0.5rem',
          position: 'relative',
          zIndex: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: isOpen ? '0 10px 30px rgba(79, 70, 229, 0.4)' : '0 4px 15px rgba(0,0,0,0.3)',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
           <span>{module.title}</span>
           <span style={{ transition: 'transform 0.3s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>↓</span>
        </div>
        <span style={{ fontSize: '0.75rem', opacity: 0.7, marginTop: '4px' }}>{module.duration}</span>
      </div>

      {/* The Symmetrical Subtopic Branches (Animated Container) */}
      <div style={{ 
        display: 'grid', 
        gridTemplateRows: isOpen ? '1fr' : '0fr',
        transition: 'grid-template-rows 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        width: '100%' 
      }}>
        <div style={{ overflow: 'hidden', width: '100%' }}>
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '2rem', paddingBottom: isOpen ? '1rem' : '0', paddingTop: '1rem' }}>
            {module.outcomes.map((outcome, idx) => {
              const isLeft = idx % 2 === 0;

              return (
                <div key={idx} className="branch-row" style={{ 
                  display: 'flex', 
                  justifyContent: isLeft ? 'flex-start' : 'flex-end',
                  width: '100%',
                  position: 'relative',
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? 'translateY(0)' : 'translateY(-10px)',
                  transition: `all 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${idx * 0.05}s`
                }}>
                  
                  {/* The Connecting Horizontal Branch */}
                  <div className="branch-line" style={{
                    position: 'absolute',
                    top: '50%',
                    [isLeft ? 'right' : 'left']: '50%',
                    width: 'calc(50% - (42%))', // Connects stem to box precisely
                    height: '2px',
                    background: 'var(--border-color)',
                    zIndex: 1
                  }} />

                  {/* The Connector Dot on the stem */}
                  <div className="stem-dot" style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '14px',
                    height: '14px',
                    background: 'var(--bg-color)',
                    border: '3px solid var(--text-color)',
                    borderRadius: '50%',
                    zIndex: 2
                  }} />

                  {/* The Atomic Topic Box */}
                  <div className="atomic-box" style={{ 
                    width: '42%', // Ensures tight spacing around center
                    background: 'var(--surface-color)', 
                    border: '1px solid var(--border-color)',
                    padding: '1.2rem',
                    borderRadius: '8px',
                    position: 'relative',
                    zIndex: 3,
                    display: 'flex', 
                    flexDirection: 'column',
                    gap: '1rem',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                  }}>
                    <strong style={{ fontSize: '1rem', color: 'var(--text-color)', lineHeight: 1.4 }}>
                      {outcome}
                    </strong>
                    <div style={{ alignSelf: 'flex-start' }}>
                      <TopicDetailInline topic={outcome} context={module.title} roleTitle={roleTitle} roleId={roleId} />
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
}
