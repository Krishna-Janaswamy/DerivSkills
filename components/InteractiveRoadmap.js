'use client';

import { useState } from 'react';
import { TopicDetailInline } from './TopicDetailInline';

export function InteractiveRoadmap({ roadmap, roleTitle, roleId }) {
  if (!roadmap || roadmap.length === 0) return null;

  // Group roadmap by phaseGroup
  const groups = [];
  let currentGroup = { title: 'Core Tracks', modules: [] };

  roadmap.forEach(mod => {
    if (mod.phaseGroup) {
      if (currentGroup.modules.length > 0) {
        groups.push(currentGroup);
      }
      currentGroup = { title: mod.phaseGroup, modules: [mod] };
    } else {
      currentGroup.modules.push(mod);
    }
  });

  if (currentGroup.modules.length > 0) {
    groups.push(currentGroup);
  }

  const [activeGroupIdx, setActiveGroupIdx] = useState(0);

  const activeGroup = groups[activeGroupIdx];

  return (
    <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', paddingTop: '1rem', paddingBottom: '3rem' }}>
      
      {/* Horizontal Phase Tabs */}
      {groups.length > 1 && (
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          overflowX: 'auto', 
          paddingBottom: '1.5rem', 
          marginBottom: '1rem',
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch',
          borderBottom: '1px solid var(--border-color)'
        }}>
          {groups.map((g, idx) => (
            <button
              key={idx}
              onClick={() => setActiveGroupIdx(idx)}
              style={{
                background: activeGroupIdx === idx ? 'var(--brand)' : 'transparent',
                color: activeGroupIdx === idx ? '#fff' : 'var(--text-secondary)',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '0.95rem',
                fontWeight: 700,
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: activeGroupIdx === idx ? '0 4px 15px rgba(91,140,255,0.4)' : 'none'
              }}
            >
              {g.title.split('—')[0].trim()} {/* E.g. "PHASE 01" */}
            </button>
          ))}
        </div>
      )}

      {/* Grid of Modules for the selected Phase */}
      <div style={{ marginBottom: '2rem' }}>
         <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem', color: 'var(--text-color)', fontWeight: 800 }}>
           {activeGroup.title}
         </h2>
         <div style={{ 
           display: 'grid', 
           gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
           gap: '1.5rem',
           alignItems: 'flex-start' /* Prevent stretching of siblings */
         }}>
           {activeGroup.modules.map((mod, idx) => (
             <ModuleCard key={idx} module={mod} roleTitle={roleTitle} roleId={roleId} index={idx} />
           ))}
         </div>
      </div>
    </div>
  );
}

function ModuleCard({ module, roleTitle, roleId, index }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      style={{
        background: 'var(--surface-color)',
        border: '1px solid var(--border-color)',
        borderRadius: '16px',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        transition: 'all 0.3s ease',
        boxShadow: isExpanded ? '0 10px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)' : '0 4px 15px rgba(0,0,0,0.1)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Top Banner Accent */}
      <div style={{ 
        position: 'absolute', top: 0, left: 0, right: 0, height: '4px', 
        background: 'var(--brand)', opacity: 0.8 
      }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h3 style={{ fontSize: '1.25rem', margin: 0, lineHeight: 1.4 }}>{module.title}</h3>
        <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.08)', padding: '4px 8px', borderRadius: '6px', color: 'var(--text-secondary)', fontWeight: 600 }}>
          {module.duration}
        </span>
      </div>

      <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
        {module.outcomes.length} core concepts
      </p>

      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          width: '100%',
          padding: '0.8rem',
          marginTop: 'auto',
          background: isExpanded ? 'rgba(255,255,255,0.05)' : 'transparent',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          color: 'var(--text-color)',
          cursor: 'pointer',
          fontWeight: 600,
          transition: 'all 0.2s ease',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <span>{isExpanded ? 'Hide Outcomes' : 'View Outcomes'}</span>
        <span style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
          ↓
        </span>
      </button>

      {/* Expanded Outcomes List */}
      <div style={{ 
        display: 'grid', 
        gridTemplateRows: isExpanded ? '1fr' : '0fr',
        transition: 'grid-template-rows 0.3s ease'
      }}>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ paddingTop: '0.5rem', display: 'flex', flexDirection: 'column' }}>
            {module.outcomes.map((outcome, i) => (
              <div key={i} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                padding: '0.8rem 0',
                borderBottom: i !== module.outcomes.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none'
              }}>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-color)', lineHeight: 1.4, flex: 1, paddingRight: '1rem', fontWeight: 500 }}>
                  <span style={{ color: 'var(--brand)', marginRight: '6px' }}>•</span>{outcome}
                </div>
                <div style={{ transform: 'scale(0.85)', transformOrigin: 'right center', margin: 0 }}>
                  <TopicDetailInline topic={outcome} context={module.title} roleTitle={roleTitle} roleId={roleId} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
