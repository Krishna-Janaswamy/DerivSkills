'use client';

import {
  XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Area, AreaChart,
  BarChart, Bar
} from 'recharts';
import { getSubtopicKey } from '@/src/utils/progress';

export function TelemetryCharts({ plan, subtopicProgress, timeSpent, analytics }) {
  // Mastery Data Curve
  const masteryData = plan.weeklyPlan.map(item => {
    const topics = item.subtopics?.length ? item.subtopics : [item.focus];
    const completed = topics.filter(t => subtopicProgress[getSubtopicKey(item.phase, t)] === 'done').length;
    return {
      phase: item.phase,
      completion: Math.round((completed / (topics.length || 1)) * 100),
    };
  });

  // Time Distribution Data Modeled in Minutes
  const timeData = plan.weeklyPlan.map(item => {
    const topics = item.subtopics?.length ? item.subtopics : [item.focus];
    const seconds = topics.reduce((acc, t) => acc + (timeSpent[getSubtopicKey(item.phase, t)] || 0), 0);
    return {
      phase: item.phase,
      minutes: Math.round(seconds / 60)
    };
  });

  function formatTime(sec) {
    if (!sec) return '0m 0s';
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    if (h > 0) return `${h}h ${m}m`;
    return `${m}m ${sec % 60}s`;
  }

  const formatText = (val) => val && typeof val === 'string' ? val.substring(0, 12) + '...' : '';

  return (
    <div style={{ marginBottom: '3rem' }}>
      
      {/* KPI Stripe */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ background: 'var(--surface-color)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
          <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-secondary)', fontWeight: 600 }}>Track Progress</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginTop: '0.5rem' }}>
            <strong style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--text-color)' }}>{analytics.progressPercent}%</strong>
          </div>
        </div>
        <div style={{ background: 'var(--surface-color)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
          <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-secondary)', fontWeight: 600 }}>Closed Elements</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginTop: '0.5rem' }}>
            <strong style={{ fontSize: '2.5rem', fontWeight: 700, color: '#10b981' }}>{analytics.completedSubtopics}</strong>
            <span style={{ color: 'var(--text-secondary)' }}>/ {analytics.totalSubtopics}</span>
          </div>
        </div>
        <div style={{ background: 'var(--surface-color)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
          <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-secondary)', fontWeight: 600 }}>Pending Setup</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginTop: '0.5rem' }}>
            <strong style={{ fontSize: '2.5rem', fontWeight: 700, color: '#f59e0b' }}>{analytics.continueLearningCount}</strong>
          </div>
        </div>
        <div style={{ background: 'var(--surface-color)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
          <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-secondary)', fontWeight: 600 }}>Focused Time</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginTop: '0.5rem' }}>
            <strong style={{ fontSize: '2.2rem', fontWeight: 700, color: 'var(--brand)' }}>{formatTime(analytics.totalSeconds)}</strong>
          </div>
        </div>
      </div>

      {/* Advanced Chart Grid */}
      <div style={{ background: 'var(--surface-color)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
          
          {/* Chart 1: The Trajectory Line */}
          <div>
            <h4 style={{ margin: '0 0 1.5rem 0', color: 'var(--text-color)', fontSize: '1.1rem' }}>Curriculum Mastery Curve</h4>
            <div style={{ width: '100%', height: 260 }}>
              <ResponsiveContainer>
                <AreaChart data={masteryData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorComp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                  <XAxis dataKey="phase" tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={formatText} />
                  <YAxis tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: 'var(--surface-color)', borderRadius: '8px', border: '1px solid var(--border-color)', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', color: 'var(--text-color)' }}
                  />
                  <Area type="monotone" dataKey="completion" name="Phase Completion %" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorComp)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Time Distribution Blocks */}
          <div>
            <h4 style={{ margin: '0 0 1.5rem 0', color: 'var(--text-color)', fontSize: '1.1rem' }}>Focus Distribution Tracker</h4>
            <div style={{ width: '100%', height: 260 }}>
              <ResponsiveContainer>
                <BarChart data={timeData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                  <XAxis dataKey="phase" tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={formatText} />
                  <YAxis tick={{ fill: 'var(--text-secondary)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <RechartsTooltip 
                    cursor={{ fill: 'var(--bg-color)', opacity: 0.8 }}
                    contentStyle={{ backgroundColor: 'var(--surface-color)', borderRadius: '8px', border: '1px solid var(--border-color)', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', color: 'var(--text-color)' }}
                  />
                  <Bar dataKey="minutes" name="Focus Time (Minutes)" fill="var(--brand)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
