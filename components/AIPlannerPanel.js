'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveActivePlan } from '@/src/utils/storage';
import { roles, getRoleById } from '@/src/data/roles';

const INITIAL_FORM = {
  experienceLevel: 'Beginner',
  weeklyHours: '10',
  goal: '',
  background: '',
};

export function AIPlannerPanel() {
  const [roleId, setRoleId] = useState(roles[0].id);
  const [form, setForm] = useState(INITIAL_FORM);
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/roadmap-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roleId: roleId,
          ...form,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Could not generate plan.');
      }

      setPlan(data.plan);
    } catch (submitError) {
      setError(
        submitError instanceof Error ? submitError.message : 'Could not generate plan.',
      );
    } finally {
      setIsLoading(false);
    }
  }

  function updateField(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  const selectedRole = getRoleById(roleId);

  return (
    <section className="ai-panel" style={{ marginTop: 0, border: 'none', background: 'transparent', padding: '0 1rem' }}>
      <div className="ai-panel-head">
        <div>
          <p className="section-kicker" style={{ marginBottom: '1rem' }}>AI Copilot</p>
          <h2 className="page-title" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Generate a personalized track</h2>
          <p className="page-subtitle" style={{ fontSize: '1.2rem', lineHeight: 1.6 }}>
            Answer a few quick questions to align this track with your current context.  <br />
            The AI planner will instantly tailor the generic track into an actionable, weekly schedule tailored just for you.
          </p>
        </div>
      </div>

      <div className="ai-grid" style={{ marginTop: '2.5rem' }}>
        <form className="ai-form" onSubmit={handleSubmit} style={{ background: 'var(--surface-color)' }}>
          <label className="field">
            <span>Select Target Role</span>
            <select
              value={roleId}
              onChange={(event) => setRoleId(event.target.value)}
              style={{ background: 'var(--bg-color)', border: '1px solid var(--border-color)', color: 'var(--text-color)' }}
            >
              {roles.map(r => (
                <option key={r.id} value={r.id}>{r.title}</option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>Experience level</span>
            <select
              value={form.experienceLevel}
              onChange={(event) => updateField('experienceLevel', event.target.value)}
              style={{ background: 'var(--bg-color)', border: '1px solid var(--border-color)', color: 'var(--text-color)' }}
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </label>

          <label className="field">
            <span>Weekly study hours</span>
            <input
              type="number"
              min="1"
              max="40"
              value={form.weeklyHours}
              onChange={(event) => updateField('weeklyHours', event.target.value)}
              style={{ background: 'var(--bg-color)', border: '1px solid var(--border-color)', color: 'var(--text-color)' }}
            />
          </label>

          <label className="field">
            <span>Career goal</span>
            <textarea
              rows="4"
              placeholder="Example: I want to switch from frontend to LLM engineering in 6 months."
              value={form.goal}
              onChange={(event) => updateField('goal', event.target.value)}
              style={{ background: 'var(--bg-color)', border: '1px solid var(--border-color)', color: 'var(--text-color)' }}
            />
          </label>

          <label className="field">
            <span>Current background</span>
            <textarea
              rows="5"
              placeholder="Share your current skills, projects, strengths, or gaps."
              value={form.background}
              onChange={(event) => updateField('background', event.target.value)}
              style={{ background: 'var(--bg-color)', border: '1px solid var(--border-color)', color: 'var(--text-color)' }}
            />
          </label>

          <button className="role-link" type="submit" disabled={isLoading} style={{ width: '100%', marginTop: '1rem', padding: '1rem' }}>
            {isLoading ? 'Generating plan...' : 'Generate with AI'}
          </button>

          {error ? <div style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>{error}</div> : null}
        </form>

        <div className="ai-result" style={{ background: 'var(--surface-color)', padding: '2rem' }}>
          {plan ? (
            <>
              <div className="ai-summary-card" style={{ background: 'var(--bg-color)' }}>
                <p className="eyebrow">Overview</p>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.8rem' }}>{plan.targetTimeline}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{plan.overview}</p>
              </div>

              <div className="ai-summary-grid">
                <article className="ai-mini-card" style={{ background: 'var(--bg-color)' }}>
                  <p className="eyebrow">Role fit</p>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{plan.roleFit}</p>
                </article>
                <article className="ai-mini-card" style={{ background: 'var(--bg-color)' }}>
                  <p className="eyebrow">Top priorities</p>
                  <ul className="plain-list" style={{ fontSize: '0.9rem' }}>
                    {plan.priorities.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              </div>

              <div className="ai-plan-list">
                {plan.weeklyPlan.map((item) => (
                  <article className="ai-plan-card" key={`${item.phase}-${item.focus}`} style={{ background: 'var(--bg-color)' }}>
                    <div className="timeline-row" style={{ marginBottom: '0.5rem' }}>
                      <h3 style={{ fontSize: '1.05rem', margin: 0 }}>{item.phase}</h3>
                      <span style={{ fontSize: '0.8rem', background: 'var(--surface-color)', padding: '2px 8px', borderRadius: '4px' }}>{item.duration}</span>
                    </div>
                    <p className="ai-plan-focus" style={{ fontSize: '0.95rem' }}>{item.focus}</p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{item.outcome}</p>
                  </article>
                ))}
              </div>

              <article className="ai-mini-card" style={{ background: 'var(--bg-color)' }}>
                <p className="eyebrow">First steps</p>
                <ul className="plain-list" style={{ fontSize: '0.9rem' }}>
                  {plan.firstSteps.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
              
              <div style={{ marginTop: '2rem' }}>
                <button
                  className="role-link"
                  style={{ width: '100%', padding: '1rem', background: 'var(--brand)', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '1rem' }}
                  onClick={() => {
                    saveActivePlan({ roleId: selectedRole.id, roleTitle: selectedRole.title, ...plan });
                    router.push('/my-learning');
                  }}
                >
                  Save Plan & Open Tracker
                </button>
              </div>
            </>
          ) : (
            <div className="ai-empty-state" style={{ background: 'transparent', textAlign: 'center', padding: '4rem 2rem' }}>
              <div style={{ fontSize: '3rem', margin: '0 0 1rem 0' }}>✨</div>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--text-color)' }}>Your AI study plan will appear here</h3>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', margin: '0 auto', lineHeight: 1.6 }}>
                Select a role and generate a tailored version of the track with a realistic
                weekly plan, customized role-fit guidance, and immediate next steps.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
