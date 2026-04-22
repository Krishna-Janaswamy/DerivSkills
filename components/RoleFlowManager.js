'use client';

import { useRouter } from 'next/navigation';
import { InteractiveRoadmap } from './InteractiveRoadmap';
import { TechGenSpinner } from './TechGenSpinner';
import { useCloudSync } from './Providers';

export function RoleFlowManager({ role }) {
  const router = useRouter();
  const { learningData, triggerSync, isLoaded } = useCloudSync();

  const isActive = isLoaded && learningData.activePlans && !!learningData.activePlans[role.id];

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
        outcome: `Complete all ${node.outcomes.length} core subtopics for this module.`,
        subtopics: node.outcomes
      }))
    };

    const newPlans = { ...learningData.activePlans, [role.id]: defaultPlan };
    triggerSync({ ...learningData, activePlans: newPlans });
  }

  function handleEnd() {
    const confirmEnd = window.confirm(`Are you sure you want to completely discard tracking and progress for the ${role.title} track?`);
    if (confirmEnd) {
      const newPlans = { ...learningData.activePlans };
      delete newPlans[role.id];
      
      const newProgress = { ...learningData.subtopicProgress };
      delete newProgress[role.id];

      const newTime = { ...learningData.subtopicTimeTracker };
      delete newTime[role.id];

      triggerSync({ ...learningData, activePlans: newPlans, subtopicProgress: newProgress, subtopicTimeTracker: newTime });
    }
  }

  if (!isLoaded) {
    return (
      <div style={{ minHeight: '500px', display: 'grid', placeItems: 'center' }}>
        <TechGenSpinner text="Loading Tracking Data..." />
      </div>
    );
  }

  return (
    <div style={{ position: 'relative' }}>
      
      {/* Management Strip */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
        {isActive ? (
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', background: 'var(--surface-color)', padding: '1rem 2rem', borderRadius: '12px', border: '1px solid var(--brand)', boxShadow: '0 0 15px rgba(79, 70, 229, 0.15)' }}>
            <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-color)' }}>Currently Enrolled</span>
            <button 
              onClick={() => router.push('/my-learning')}
              className="role-link"
              style={{ padding: '0.5rem 1rem' }}
            >
              Open Learning Board
            </button>
            <button 
              onClick={handleEnd}
              style={{ padding: '0.5rem 1rem', background: 'transparent', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '6px', cursor: 'pointer', transition: 'all 0.2s', fontWeight: 600 }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              End Role
            </button>
          </div>
        ) : (
           <div style={{ textAlign: 'center', zIndex: 10, position: 'relative' }}>
             <button 
                onClick={handleStart}
                style={{ padding: '1.2rem 3rem', background: 'var(--brand)', color: 'white', border: 'none', borderRadius: '50px', fontSize: '1.2rem', fontWeight: 700, cursor: 'pointer', boxShadow: '0 10px 25px rgba(79, 70, 229, 0.4)', transition: 'transform 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
             >
               Start {role.title} Track
             </button>
           </div>
        )}
      </div>

      {/* The Track content */}
      <div style={{ 
        position: 'relative', 
        filter: isActive ? 'none' : 'blur(8px) grayscale(50%)',
        opacity: isActive ? 1 : 0.6,
        pointerEvents: isActive ? 'auto' : 'none',
        transition: 'all 0.5s ease'
      }}>
        {!isActive && (
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to bottom, rgba(11, 15, 25, 0.1), rgba(11, 15, 25, 0.9) 80%)', zIndex: 5 }} />
        )}
        
        <section style={{ padding: '2rem 0', background: 'transparent', border: 'none', boxShadow: 'none' }}>
          <InteractiveRoadmap roadmap={role.roadmap} roleTitle={role.title} roleId={role.id} />
        </section>
      </div>
    </div>
  );
}
