'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { ActiveDashboard } from '@/components/ActiveDashboard';
import { TechGenSpinner } from '@/components/TechGenSpinner';
import { computePlanAnalytics } from '@/src/utils/progress';
import { useCloudSync } from '@/components/Providers';

export default function MyLearningPage() {
  const { learningData, triggerSync, isLoaded, status } = useCloudSync();
  const [activeTab, setActiveTab] = useState(null);
  const [globalStats, setGlobalStats] = useState({
    totalTracks: 0,
    highestProgressRole: 'One track',
    highestProgress: 0,
    completedSubtopics: 0,
    continueLearningCount: 0,
    totalSeconds: 0
  });

  const buildGlobalStats = useCallback((data) => {
    const plansMap = data.activePlans || {};
    const roleKeys = Object.keys(plansMap);

    if (roleKeys.length === 0) {
      return { totalTracks: 0, highestProgressRole: '---', highestProgress: 0, completedSubtopics: 0, continueLearningCount: 0, totalSeconds: 0 };
    }

    let maxProgress = 0;
    let maxRole = plansMap[roleKeys[0]].roleTitle;
    let completedSubtopics = 0;
    let continueLearningCount = 0;
    let totalSeconds = 0;

    roleKeys.forEach((key) => {
      const plan = plansMap[key];
      const subProgress = data.subtopicProgress[key] || {};
      const subTime = data.subtopicTimeTracker[key] || {};

      const analytics = computePlanAnalytics(plan, subProgress, subTime);
      completedSubtopics += analytics.completedSubtopics;
      continueLearningCount += analytics.continueLearningCount;
      totalSeconds += analytics.totalSeconds;

      if (analytics.progressPercent >= maxProgress) {
        maxProgress = analytics.progressPercent;
        maxRole = plan.roleTitle;
      }
    });

    return { totalTracks: roleKeys.length, highestProgressRole: maxRole, highestProgress: maxProgress, completedSubtopics, continueLearningCount, totalSeconds };
  }, []);

  useEffect(() => {
    if (isLoaded) {
      setGlobalStats(buildGlobalStats(learningData));
      
      const roleKeys = Object.keys(learningData.activePlans || {});
      if (roleKeys.length > 0 && !roleKeys.includes(activeTab)) {
        setActiveTab(roleKeys[0]);
      }
    }
  }, [isLoaded, learningData, activeTab, buildGlobalStats]);

  function handleClear(roleId) {
    const confirmEnd = window.confirm('Are you sure you want to completely end and discard tracking for this specific role?');
    if (!confirmEnd) return;

    const newPlans = { ...learningData.activePlans };
    delete newPlans[roleId];
    
    const newProgress = { ...learningData.subtopicProgress };
    delete newProgress[roleId];

    const newTime = { ...learningData.subtopicTimeTracker };
    delete newTime[roleId];

    triggerSync({ ...learningData, activePlans: newPlans, subtopicProgress: newProgress, subtopicTimeTracker: newTime });

    const remainingKeys = Object.keys(newPlans);
    setActiveTab(remainingKeys.length > 0 ? remainingKeys[0] : null);
  }

  if (!isLoaded || status === 'loading') {
    return (
      <main className="page-shell" style={{ display: 'grid', placeItems: 'center', height: '60vh' }}>
        <TechGenSpinner text="Hydrating Tracking Data..." />
      </main>
    );
  }

  const plansMap = learningData.activePlans || {};
  const rolesArray = Object.values(plansMap);
  const totalHours = Math.floor(globalStats.totalSeconds / 3600);
  const totalMinutes = Math.floor((globalStats.totalSeconds % 3600) / 60);

  return (
    <main className="page-shell">
      {rolesArray.length > 0 ? (
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ background: 'var(--surface-color)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)', marginBottom: '2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
            <p className="section-kicker" style={{ margin: '0 0 0.8rem 0' }}>Learning Analytics Board</p>
            <h2 className="page-title" style={{ margin: '0 0 0.8rem 0', fontSize: '1.8rem' }}>
              Your entire skill track progress is syncing transparently with PostgreSQL.
            </h2>
            <p className="page-subtitle" style={{ margin: 0, fontSize: '1rem', lineHeight: 1.6 }}>
              Any changes made here are bound natively to Javascript memory, avoiding disk I/O, and automatically batch synchronized directly back to your secure Cloud Profile.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
            <div style={{ background: 'var(--surface-color)', padding: '1.25rem', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
              <p style={{ margin: '0 0 0.4rem 0', color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Active Tracks</p>
              <strong style={{ fontSize: '2rem' }}>{globalStats.totalTracks}</strong>
            </div>
            <div style={{ background: 'var(--surface-color)', padding: '1.25rem', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
              <p style={{ margin: '0 0 0.4rem 0', color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Subtopics Done</p>
              <strong style={{ fontSize: '2rem', color: '#10b981' }}>{globalStats.completedSubtopics}</strong>
            </div>
            <div style={{ background: 'var(--surface-color)', padding: '1.25rem', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
              <p style={{ margin: '0 0 0.4rem 0', color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Continue Learning</p>
              <strong style={{ fontSize: '2rem', color: '#f59e0b' }}>{globalStats.continueLearningCount}</strong>
            </div>
            <div style={{ background: 'var(--surface-color)', padding: '1.25rem', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
              <p style={{ margin: '0 0 0.4rem 0', color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Focused Time</p>
              <strong style={{ fontSize: '2rem', color: '#10b981' }}>{totalHours}h {totalMinutes}m</strong>
            </div>
            <div style={{ background: 'var(--surface-color)', padding: '1.25rem', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
              <p style={{ margin: '0 0 0.4rem 0', color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Closest Finish</p>
              <strong style={{ fontSize: '1.1rem', display: 'block', marginBottom: '0.25rem' }}>{globalStats.highestProgressRole}</strong>
              <span style={{ color: 'var(--text-secondary)' }}>{globalStats.highestProgress}% complete</span>
            </div>
          </div>

          {rolesArray.length > 1 && (
            <div style={{ display: 'flex', gap: '2rem', borderBottom: '1px solid var(--border-color)', marginBottom: '3rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
              {rolesArray.map((plan) => (
                <button
                  key={plan.roleId}
                  onClick={() => setActiveTab(plan.roleId)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    padding: '0.5rem 0.5rem',
                    fontSize: '1.05rem',
                    letterSpacing: '0.02em',
                    fontWeight: activeTab === plan.roleId ? 700 : 500,
                    color: activeTab === plan.roleId ? 'var(--brand)' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    position: 'relative',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.2s'
                  }}
                >
                  {plan.roleTitle} Board
                  {activeTab === plan.roleId && (
                    <div style={{ position: 'absolute', bottom: '-8px', left: 0, right: 0, height: '3px', background: 'var(--brand)', borderRadius: '4px 4px 0 0' }}></div>
                  )}
                </button>
              ))}
            </div>
          )}

          {activeTab && plansMap[activeTab] && (
            <ActiveDashboard
              plan={plansMap[activeTab]}
              onClear={() => handleClear(activeTab)}
            />
          )}
        </div>
      ) : (
        <div style={{ padding: '4rem 2rem', textAlign: 'center', background: 'var(--surface-color)', borderRadius: '16px', border: '1px solid var(--border-color)', maxWidth: '600px', margin: '4rem auto', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
          <div style={{ fontSize: '3rem', margin: '0 0 1rem 0' }}>📂</div>
          <h2 style={{ marginBottom: '1rem', fontSize: '1.8rem' }}>No Analytics Yet</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.6 }}>
            Start a track first, and this learning tab will turn into your analytical board with subtopic focus timers and track progress.
          </p>
          <div style={{ marginTop: '2rem' }}>
            <Link href="/tracks" className="role-link" style={{ textDecoration: 'none' }}>
              Open Track Catalog
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
