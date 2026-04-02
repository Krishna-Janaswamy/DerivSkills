'use client';

import { useEffect, useState } from 'react';
import { TopicDetailInline } from './TopicDetailInline';
import { TelemetryCharts } from './TelemetryCharts';
import { computePlanAnalytics, getSubtopicKey } from '@/src/utils/progress';
import { useCloudSync } from '@/components/Providers';

export function ActiveDashboard({ plan, onClear }) {
  const { learningData, triggerSync } = useCloudSync();
  // Derive isolated maps straight from authenticated Memory structure
  const subtopicProgress = learningData?.subtopicProgress?.[plan.roleId] || {};
  const timeSpent = learningData?.subtopicTimeTracker?.[plan.roleId] || {};

  function setSubtopicStatus(phase, topic, status) {
    const key = getSubtopicKey(phase, topic);
    const nextProgressMap = { ...subtopicProgress, [key]: status };
    
    // Bubble into React RAM Cloud Sync provider
    triggerSync({
      ...learningData,
      subtopicProgress: {
        ...learningData.subtopicProgress,
        [plan.roleId]: nextProgressMap
      }
    });
  }

  function formatTime(seconds) {
    if (!seconds) return '0m 0s';
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) return `${h}h ${m}m`;
    return `${m}m ${s}s`;
  }

  const analytics = computePlanAnalytics(plan, subtopicProgress, timeSpent);
  return (
    <div className="active-dashboard" style={{ maxWidth: '900px', margin: '0 auto' }}>
      <header style={{ marginBottom: '2.5rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.8rem' }}>
              <span className="section-kicker" style={{ padding: '6px 10px' }}>
                Analytical Board
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{plan.targetTimeline}</span>
            </div>
            <h2 style={{ fontSize: '2rem', margin: '0 0 0.8rem 0', letterSpacing: '-0.02em', fontWeight: 700 }}>{plan.roleTitle}</h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: '650px', margin: 0, lineHeight: 1.6 }}>
              Time tracking and status toggling now lives directly inside the interactive topics. Click on any subtopic to start ambient time tracking.
            </p>
          </div>

          <button
            onClick={onClear}
            style={{ padding: '0.6rem 1rem', background: 'transparent', color: '#f87171', border: '1px solid rgba(248, 113, 113, 0.3)', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, transition: 'all 0.2s' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(248, 113, 113, 0.1)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
          >
            Discard Plan
          </button>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem', alignItems: 'center' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginRight: '0.2rem', fontWeight: 600 }}>PRIORITIES:</span>
          {plan.priorities.slice(0, 4).map((item, idx) => (
            <span key={idx} style={{ fontSize: '0.85rem', color: 'var(--text-color)', background: 'var(--surface-color)', padding: '6px 14px', borderRadius: '999px', border: '1px solid var(--border-color)', fontWeight: 500 }}>
              {item}
            </span>
          ))}
        </div>

        <TelemetryCharts 
          plan={plan} 
          subtopicProgress={subtopicProgress} 
          timeSpent={timeSpent} 
          analytics={analytics} 
        />
      </header>
    </div>
  );
}
