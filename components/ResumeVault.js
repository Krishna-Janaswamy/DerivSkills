'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ROLES_LIST } from '@/lib/resume-roles';
import { TechGenSpinner } from '@/components/TechGenSpinner';

const SCORE_COLOR = (s) => {
  if (!s && s !== 0) return '#6B7280';
  if (s >= 90) return '#10B981';
  if (s >= 70) return '#F59E0B';
  return '#EF4444';
};

export function ResumeVault() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newRole, setNewRole] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [creating, setCreating] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchResumes();
  }, []);

  async function fetchResumes() {
    setLoading(true);
    try {
      const res = await fetch('/api/resumes');
      if (res.ok) {
        const data = await res.json();
        setResumes(data.resumes || []);
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate() {
    if (!newRole || !newTitle.trim()) return;
    setCreating(true);
    try {
      const res = await fetch('/api/resumes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole, title: newTitle.trim() }),
      });
      if (res.ok) {
        const data = await res.json();
        setShowModal(false);
        setNewRole('');
        setNewTitle('');
        router.push(`/resume-builder/${data.resume.id}`);
      }
    } finally {
      setCreating(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this resume? This cannot be undone.')) return;
    setDeletingId(id);
    try {
      await fetch(`/api/resumes/${id}`, { method: 'DELETE' });
      setResumes(prev => prev.filter(r => r.id !== id));
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div style={{ marginTop: '3rem' }}>
      {/* Section Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, margin: 0 }}>My Resume Vault</h2>
          <p style={{ color: 'var(--text-secondary)', margin: '0.3rem 0 0', fontSize: '0.9rem' }}>
            Role-specific resumes, always ATS-ready
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          style={{
            background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)',
            color: 'white', border: 'none', padding: '0.65rem 1.25rem',
            borderRadius: '10px', fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer',
            transition: 'transform 0.15s', boxShadow: '0 4px 14px rgba(99,102,241,0.35)',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
        >
          + Create Resume
        </button>
      </div>

      {/* Divider */}
      <div style={{ borderTop: '1px solid var(--border)', marginBottom: '1.5rem' }} />

      {loading ? (
        <div style={{ padding: '2rem 0', display: 'grid', placeItems: 'center' }}>
          <TechGenSpinner text="Loading resumes..." />
        </div>
      ) : resumes.length === 0 ? (
        <div style={{
          border: '2px dashed var(--border)', borderRadius: '12px', padding: '3rem',
          textAlign: 'center', color: 'var(--text-secondary)',
        }}>
          <p style={{ fontSize: '2.5rem', margin: '0 0 1rem' }}>📄</p>
          <p style={{ fontWeight: 600, fontSize: '1.05rem' }}>No resumes yet</p>
          <p style={{ fontSize: '0.9rem', marginTop: '0.4rem' }}>
            Create your first role-specific resume and get it ATS-ready.
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.2rem' }}>
          {resumes.map(resume => (
            <ResumeCard
              key={resume.id}
              resume={resume}
              onEdit={() => router.push(`/resume-builder/${resume.id}`)}
              onDelete={() => handleDelete(resume.id)}
              isDeleting={deletingId === resume.id}
            />
          ))}
        </div>
      )}

      {/* Create Modal */}
      {showModal && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
          display: 'grid', placeItems: 'center', zIndex: 1000,
        }}>
          <div style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: '20px', padding: '2rem', width: '100%', maxWidth: '440px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
          }}>
            <h3 style={{ margin: '0 0 0.4rem', fontSize: '1.3rem' }}>Create Role Resume</h3>
            <p style={{ color: 'var(--text-secondary)', margin: '0 0 1.5rem', fontSize: '0.9rem' }}>
              Pick the role you're targeting. Your resume will be pre-scaffolded with the right keywords.
            </p>

            <div style={{ marginBottom: '1rem' }}>
              <label style={labelStyle}>Target Role</label>
              <select
                value={newRole}
                onChange={e => {
                  setNewRole(e.target.value);
                  if (!newTitle) setNewTitle(e.target.value + ' Resume');
                }}
                style={inputStyle}
              >
                <option value="">Select a role...</option>
                {ROLES_LIST.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={labelStyle}>Resume Label</label>
              <input
                type="text"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                placeholder="e.g. Frontend Resume — Meta Application"
                style={inputStyle}
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={() => { setShowModal(false); setNewRole(''); setNewTitle(''); }}
                style={{ flex: 1, padding: '0.8rem', borderRadius: '10px', border: '1px solid var(--border)', background: 'transparent', cursor: 'pointer', fontWeight: 500 }}
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={!newRole || !newTitle.trim() || creating}
                style={{
                  flex: 1, padding: '0.8rem', borderRadius: '10px', border: 'none',
                  background: newRole && newTitle.trim() ? 'linear-gradient(135deg, #8B5CF6, #3B82F6)' : '#374151',
                  color: 'white', cursor: newRole && newTitle.trim() ? 'pointer' : 'not-allowed',
                  fontWeight: 600,
                }}
              >
                {creating ? 'Creating...' : 'Build Resume →'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ResumeCard({ resume, onEdit, onDelete, isDeleting }) {
  const score = resume.atsScore;
  const color = SCORE_COLOR(score);

  return (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: '14px', padding: '1.4rem', display: 'flex', flexDirection: 'column', gap: '1rem',
      transition: 'transform 0.2s, box-shadow 0.2s',
      cursor: 'default',
    }}
      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
    >
      {/* Role badge */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
        <div>
          <span style={{
            display: 'inline-block', background: 'rgba(139, 92, 246, 0.15)', color: '#A78BFA',
            padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600,
            marginBottom: '0.4rem',
          }}>{resume.role}</span>
          <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, lineHeight: 1.3 }}>{resume.title}</h4>
        </div>

        {/* Score ring */}
        <div style={{ flexShrink: 0, textAlign: 'center' }}>
          <svg width="52" height="52" viewBox="0 0 52 52">
            <circle cx="26" cy="26" r="22" fill="none" stroke="#374151" strokeWidth="4" />
            <circle
              cx="26" cy="26" r="22" fill="none" stroke={color} strokeWidth="4"
              strokeDasharray={`${(score || 0) / 100 * 138} 138`}
              strokeLinecap="round"
              transform="rotate(-90 26 26)"
              style={{ transition: 'stroke-dasharray 0.6s ease' }}
            />
            <text x="26" y="30" textAnchor="middle" fontSize="11" fontWeight="700" fill={color}>
              {score ?? '—'}
            </text>
          </svg>
          {resume.isDownloadReady && (
            <div style={{ fontSize: '0.65rem', color: '#10B981', fontWeight: 600, marginTop: '-4px' }}>READY</div>
          )}
        </div>
      </div>

      <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', margin: 0 }}>
        Updated {new Date(resume.updatedAt).toLocaleDateString()}
      </p>

      <div style={{ display: 'flex', gap: '0.6rem' }}>
        <button
          onClick={onEdit}
          style={{
            flex: 1, padding: '0.6rem', borderRadius: '8px', border: 'none',
            background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)',
            color: 'white', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem',
          }}
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          disabled={isDeleting}
          style={{
            padding: '0.6rem 0.9rem', borderRadius: '8px',
            border: '1px solid rgba(239,68,68,0.3)', background: 'rgba(239,68,68,0.08)',
            color: '#EF4444', cursor: 'pointer', fontSize: '0.9rem',
          }}
        >
          {isDeleting ? '...' : '🗑'}
        </button>
      </div>
    </div>
  );
}

const labelStyle = {
  display: 'block', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em',
  textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.4rem',
};
const inputStyle = {
  width: '100%', padding: '12px 14px', borderRadius: '12px',
  border: '1px solid var(--border-color)', fontSize: '1rem', outline: 'none',
};
