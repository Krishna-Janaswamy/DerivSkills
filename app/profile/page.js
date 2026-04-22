'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { useEffect, useMemo, useState } from 'react';
import { TechGenSpinner } from '@/components/TechGenSpinner';
import { fetchProfileAndCache, readProfileCache, writeProfileCache } from '@/src/utils/profile-cache';
import { ResumeVault } from '@/components/ResumeVault';

const RESUME_ENABLED = process.env.NEXT_PUBLIC_RESUME_ENABLED === 'true';

// ── Constants ──────────────────────────────────────────────────────────────────
const EMPTY_DETAILS = {
  headline: '', company: '', location: '', bio: '',
  userType: '', yearsExperience: '', collegeName: '',
  branch: '', discoverySource: '', studentYear: '', studentGroup: '',
};

const TABS = [
  { id: 'identity', label: 'Your Info',   desc: 'Name, role & account' },
  { id: 'background', label: 'Background', desc: 'Education or workplace' },
  { id: 'about', label: 'About You',   desc: 'One-line intro, bio & location' },
];

const inp = {
  width: '100%', padding: '11px 14px', borderRadius: '10px',
  border: '1px solid var(--border-color)', background: 'var(--surface-muted)',
  color: 'var(--text-color)', fontSize: '0.93rem', outline: 'none',
  fontFamily: 'inherit', boxSizing: 'border-box',
  transition: 'border-color 0.15s',
};

const SOURCE_OPTIONS = [
  '', 'LinkedIn', 'Google Search', 'Friend / Colleague',
  'College / University', 'Twitter / X', 'YouTube', 'Other',
];

// ── Sub-components ─────────────────────────────────────────────────────────────
function FieldLabel({ children, optional }) {
  return (
    <label style={{
      display: 'block', fontSize: '0.72rem', fontWeight: 700,
      letterSpacing: '0.09em', textTransform: 'uppercase',
      color: 'var(--text-secondary)', marginBottom: '0.4rem',
    }}>
      {children}
      {!optional && <span style={{ marginLeft: '0.2rem', color: '#ef4444' }}>*</span>}
      {optional && <span style={{ marginLeft: '0.4rem', fontWeight: 400, opacity: 0.6, textTransform: 'none', letterSpacing: 0 }}>optional</span>}
    </label>
  );
}

function Field({ label, optional, children }) {
  return (
    <div>
      <FieldLabel optional={optional}>{label}</FieldLabel>
      {children}
    </div>
  );
}

function SaveStatusDot({ status }) {
  const cfg = {
    saved: { color: '#10b981', label: '✓ Saved' },
    saving: { color: '#f59e0b', label: '⟳ Saving…' },
    unsaved: { color: '#94a3b8', label: '● Unsaved' },
    error: { color: '#ef4444', label: '✕ Error' },
  }[status] || {};
  return (
    <span style={{ fontSize: '0.78rem', fontWeight: 600, color: cfg.color, transition: 'color 0.3s' }}>
      {cfg.label}
    </span>
  );
}

// ── Sign-in gate ───────────────────────────────────────────────────────────────
function SignInGate() {
  return (
    <div style={{
      maxWidth: 480, margin: '4rem auto', padding: '2.5rem 2rem',
      borderRadius: '20px', border: '1px solid var(--border)',
      background: 'var(--surface)', boxShadow: 'var(--shadow)',
      textAlign: 'center', display: 'grid', gap: '1.5rem',
    }}>
      <div style={{ fontSize: '3rem' }}>🔒</div>
      <div>
        <h1 style={{ margin: '0 0 0.5rem', maxWidth: 480, fontSize: '1.6rem', letterSpacing: '-0.02em' }}>Sign in to continue</h1>
        <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
          Your profile is saved and accessible every time you come back.
        </p>
      </div>
      <div style={{ display: 'grid', gap: '0.75rem' }}>
        <button
          onClick={() => signIn('google', { callbackUrl: '/profile' })}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem',
            padding: '0.85rem 1rem', borderRadius: '10px', border: 'none',
            background: '#1a73e8', color: '#fff', fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Continue with Google
        </button>
        <button
          onClick={() => signIn('github', { callbackUrl: '/profile' })}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem',
            padding: '0.85rem 1rem', borderRadius: '10px', border: '1px solid var(--border)',
            background: '#111827', color: '#f9fafb', fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
          Continue with GitHub
        </button>
      </div>
    </div>
  );
}

// ── Avatar hero card ───────────────────────────────────────────────────────────
function ProfileHero({ session, customName, presentRole, saveStatus, onSignOut }) {
  const initials = (customName || session?.user?.name || '?')
    .split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: '20px', padding: '2rem',
      display: 'flex', alignItems: 'center', gap: '1.5rem',
      flexWrap: 'wrap', position: 'relative',
      boxShadow: 'var(--shadow-soft)',
    }}>
      {/* Avatar */}
      <div style={{ position: 'relative', flexShrink: 0 }}>
        {session?.user?.image
          ? <img src={session.user.image} alt="Avatar" referrerPolicy="no-referrer"
            style={{
              width: 72, height: 72, borderRadius: '50%', objectFit: 'cover',
              border: '3px solid var(--brand)', boxShadow: '0 0 0 4px rgba(37,99,235,0.12)'
            }} />
          : <div style={{
            width: 72, height: 72, borderRadius: '50%', fontSize: '1.5rem', fontWeight: 800,
            background: 'linear-gradient(135deg, #2563eb, #7c3aed)', color: 'white',
            display: 'grid', placeItems: 'center',
            boxShadow: '0 0 0 4px rgba(37,99,235,0.12)',
          }}>{initials}</div>
        }
        {/* Provider badge */}
        {session?.user?.email && (
          <div style={{
            position: 'absolute', bottom: -2, right: -2,
            width: 22, height: 22, borderRadius: '50%',
            background: 'var(--surface)', border: '2px solid var(--border)',
            display: 'grid', placeItems: 'center', fontSize: '0.7rem',
          }}>✓</div>
        )}
      </div>

      {/* Copy */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <h1 style={{
          margin: '0 0 0.25rem', fontSize: '1.4rem', fontWeight: 700,
          letterSpacing: '-0.02em', lineHeight: 1.2,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {customName || session?.user?.name || 'Your Name'}
        </h1>
        <p style={{ margin: '0 0 0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          {presentRole || 'No role set yet'}
          {' · '}
          <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>{session?.user?.email}</span>
        </p>
        <SaveStatusDot status={saveStatus} />
      </div>

      {/* Sign out */}
      <button
        onClick={onSignOut}
        style={{
          padding: '0.5rem 1rem', borderRadius: '8px',
          border: '1px solid var(--border)', background: 'transparent',
          color: 'var(--text-secondary)', fontSize: '0.83rem', fontWeight: 600,
          cursor: 'pointer', flexShrink: 0,
        }}
      >
        Log out
      </button>
    </div>
  );
}

// ── Tab bar ───────────────────────────────────────────────────────────────────
function TabBar({ active, onChange }) {
  return (
    <div style={{
      display: 'flex', gap: '4px',
      background: 'var(--surface-muted)', padding: '5px',
      borderRadius: '12px', border: '1px solid var(--border)',
    }}>
      {TABS.map(t => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          style={{
            flex: 1, padding: '0.6rem 0.5rem', borderRadius: '8px', border: 'none',
            background: active === t.id ? 'var(--surface)' : 'transparent',
            color: active === t.id ? 'var(--text-color)' : 'var(--text-secondary)',
            fontWeight: active === t.id ? 700 : 500, fontSize: '0.85rem', cursor: 'pointer',
            boxShadow: active === t.id ? 'var(--shadow-soft)' : 'none',
            transition: 'all 0.18s', whiteSpace: 'nowrap',
          }}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

// ── Section card wrapper ──────────────────────────────────────────────────────
function SectionCard({ title, subtitle, children }) {
  return (
    <div style={{
      background: 'var(--surface)', border: '1px solid var(--border)',
      borderRadius: '16px', padding: '1.75rem', boxShadow: 'var(--shadow-soft)',
    }}>
      {(title || subtitle) && (
        <div style={{ marginBottom: '1.25rem' }}>
          {title && <p style={{ margin: '0 0 0.2rem', fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-color)' }}>{title}</p>}
          {subtitle && <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{subtitle}</p>}
        </div>
      )}
      <div style={{ display: 'grid', gap: '1rem' }}>
        {children}
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function ProfilePage() {
  const { data: session, status, update } = useSession();
  const userId = session?.user?.id;

  const [customName, setCustomName] = useState('');
  const [presentRole, setPresentRole] = useState('');
  const [details, setDetails] = useState(EMPTY_DETAILS);
  const [activeTab, setActiveTab] = useState('identity');
  const [saveStatus, setSaveStatus] = useState('saved'); // saved | saving | unsaved | error
  const [profileError, setProfileError] = useState('');
  const [isProfileReady, setIsProfileReady] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const cacheKey = useMemo(() => (userId ? `profileCache:${userId}` : null), [userId]);

  // ── Hydrate from cache first, then DB ────────────────────────────────────────
  function applyPayload(payload) {
    setCustomName(payload.user?.name || '');
    setPresentRole(payload.user?.presentRole || '');
    setDetails({
      headline: payload.profileDetails?.headline || '',
      company: payload.profileDetails?.company || '',
      location: payload.profileDetails?.location || '',
      bio: payload.profileDetails?.bio || '',
      userType: payload.profileDetails?.userType || '',
      yearsExperience: payload.profileDetails?.yearsExperience || '',
      collegeName: payload.profileDetails?.collegeName || '',
      branch: payload.profileDetails?.branch || '',
      discoverySource: payload.profileDetails?.discoverySource || '',
      studentYear: payload.profileDetails?.studentYear || '',
      studentGroup: payload.profileDetails?.studentGroup || '',
    });
  }

  useEffect(() => {
    if (!userId) { setIsProfileReady(false); return; }
    
    // 1. Try loading from cache immediately for instant UI
    const cached = readProfileCache(userId);
    if (cached) { 
      applyPayload(cached); 
      setIsProfileReady(true); 
    } else {
      setIsProfileReady(false);
    }

    // 2. Always fetch fresh data from API in the background
    let ignore = false;
    async function load() {
      try {
        const payload = await fetchProfileAndCache(userId);
        if (!ignore) { applyPayload(payload); }
      } catch (e) {
        if (!ignore) setProfileError('We could not load your profile right now. Please refresh and try again.');
      } finally {
        if (!ignore) setIsProfileReady(true);
      }
    }
    load();
    return () => { ignore = true; };
  }, [userId]);

  // ── Field helpers ────────────────────────────────────────────────────────────
  function setField(key, val) {
    setDetails(d => ({ ...d, [key]: val }));
    setSaveStatus('unsaved');
  }

  // ── Save ──────────────────────────────────────────────────────────────────────
  async function handleSave(e) {
    e.preventDefault();
    if (!session?.user?.id) return;
    setSaveStatus('saving');
    setProfileError('');
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: customName, presentRole, profileDetails: details }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Save failed');
      
      // Update local cache so we don't flash old data on navigation
      const currentCache = readProfileCache(session.user.id);
      if (currentCache) {
        writeProfileCache(session.user.id, {
          ...currentCache,
          user: { ...currentCache.user, name: customName, presentRole },
          profileDetails: details
        });
      }
      
      await update();
      setSaveStatus('saved');
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } catch (err) {
      setSaveStatus('error');
      // data.error is already sanitized by the API — only fall back to a generic message
      // for pure network failures (where err.message would be a browser fetch error)
      const isApiError = err?.message && !err.message.includes('fetch') && !err.message.includes('network') && !err.message.includes('Failed to fetch');
      setProfileError(isApiError ? err.message : 'Could not save your profile. Please check your connection and try again.');
    }
  }

  // ── States ───────────────────────────────────────────────────────────────────
  if (status === 'loading') return (
    <main className="page-shell" style={{ display: 'grid', placeItems: 'center', height: '60vh' }}>
      <TechGenSpinner text="Loading session…" />
    </main>
  );

  if (!session) return (
    <main className="page-shell"><SignInGate /></main>
  );

  if (!isProfileReady) return (
    <main className="page-shell" style={{ display: 'grid', placeItems: 'center', height: '60vh' }}>
      <TechGenSpinner text="Loading profile…" />
    </main>
  );

  const isStudent = details.userType === 'student';
  const isProfessional = details.userType === 'professional';

  return (
    <main className="page-shell" style={{ maxWidth: 680, margin: '0 auto', padding: '2.5rem 0 5rem' }}>
      <form onSubmit={handleSave} style={{ display: 'grid', gap: '1.25rem' }}>

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <ProfileHero
          session={session}
          customName={customName}
          presentRole={presentRole}
          saveStatus={saveStatus}
          onSignOut={() => signOut({ callbackUrl: '/' })}
        />

        {/* ── Tab bar ───────────────────────────────────────────────────── */}
        <TabBar active={activeTab} onChange={setActiveTab} />

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* TAB: Identity                                                   */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        {activeTab === 'identity' && (
          <>
            <SectionCard title="Your name & role" subtitle="This is how you appear to others on the platform">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <Field label="Full Name">
                    <input
                      type="text" required value={customName}
                      onChange={e => { setCustomName(e.target.value); setSaveStatus('unsaved'); }}
                      style={inp}
                    />
                  </Field>
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <Field label="Email Address">
                    <input type="email" value={session.user?.email || ''} disabled
                      style={{ ...inp, background: 'var(--surface-strong)', cursor: 'not-allowed', opacity: 0.7 }} />
                  </Field>
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <Field label="Target Role" optional>
                    <input
                      type="text" value={presentRole}
                      onChange={e => { setPresentRole(e.target.value); setSaveStatus('unsaved'); }}
                      style={inp}
                    />
                  </Field>
                </div>
              </div>
            </SectionCard>

            <SectionCard title="Are you a student or working?" subtitle="Choose the one that fits you — it changes what we ask next">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
                {[
                  { val: 'student', emoji: '🎓', label: 'Student', sub: 'Currently in college or university' },
                  { val: 'professional', emoji: '💼', label: 'Working', sub: 'Employed or freelancing' },
                ].map(opt => (
                  <button
                    key={opt.val}
                    type="button"
                    onClick={() => { setField('userType', opt.val); }}
                    style={{
                      padding: '1rem', borderRadius: '12px', border: '2px solid',
                      borderColor: details.userType === opt.val ? 'var(--brand)' : 'var(--border)',
                      background: details.userType === opt.val ? 'rgba(37,99,235,0.06)' : 'var(--surface-muted)',
                      cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s',
                    }}
                  >
                    <div style={{ fontSize: '1.4rem', marginBottom: '0.3rem' }}>{opt.emoji}</div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-color)' }}>{opt.label}</div>
                    <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>{opt.sub}</div>
                  </button>
                ))}
              </div>
            </SectionCard>
          </>
        )}

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* TAB: Background                                                 */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        {activeTab === 'background' && (
          <>
            {!details.userType && (
              <div style={{
                padding: '1.25rem', borderRadius: '12px', border: '1px dashed var(--border)',
                background: 'var(--surface-muted)', color: 'var(--text-secondary)',
                textAlign: 'center', fontSize: '0.9rem',
              }}>
                👆 First go to <strong>Your Info</strong> and tell us if you are a student or working — then come back here.
              </div>
            )}

            {isStudent && (
              <SectionCard title="College details" subtitle="Tell us a bit about where you are studying">
                <Field label="College / University">
                  <input type="text" value={details.collegeName} required
                    onChange={e => setField('collegeName', e.target.value)}
                    style={inp} />
                </Field>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <Field label="Department / Stream">
                    <input type="text" value={details.branch} required
                      onChange={e => setField('branch', e.target.value)}
                      style={inp} />
                  </Field>
                  <Field label="Current Year">
                    <input type="text" value={details.studentYear} required
                      onChange={e => setField('studentYear', e.target.value)}
                      style={inp} />
                  </Field>
                </div>
                <Field label="Batch / Section" optional>
                  <input type="text" value={details.studentGroup}
                    onChange={e => setField('studentGroup', e.target.value)}
                    style={inp} />
                </Field>
              </SectionCard>
            )}

            {isProfessional && (
              <SectionCard title="Where do you work?" subtitle="Your current job details">
                <Field label="Company name">
                  <input type="text" value={details.company} required
                    onChange={e => setField('company', e.target.value)}
                    style={inp} />
                </Field>
                <Field label="Years Of Experience">
                  <select value={details.yearsExperience} required
                    onChange={e => setField('yearsExperience', e.target.value)}
                    style={{ ...inp, cursor: 'pointer' }}>
                    <option value="">Choose one…</option>
                    {['Less than 1 year', '1 year', '2 years', '3 years', '4 years', '5 years', '6 to 8 years', '9 to 12 years', 'More than 12 years'].map(o =>
                      <option key={o} value={o}>{o}</option>
                    )}
                  </select>
                </Field>
              </SectionCard>
            )}

            <SectionCard title="Where did you hear about us?" subtitle="Just curious — helps us know where people find us">
              <Field label="Where You Found Us" optional>
                <select value={details.discoverySource}
                  onChange={e => setField('discoverySource', e.target.value)}
                  style={{ ...inp, cursor: 'pointer' }}>
                  {SOURCE_OPTIONS.map(o => <option key={o} value={o}>{o || 'Choose one…'}</option>)}
                </select>
              </Field>
            </SectionCard>
          </>
        )}

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* TAB: About                                                      */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        {activeTab === 'about' && (
          <>
            <SectionCard title="Your one-line intro" subtitle="Shown under your name — keep it short and to the point">
              <Field label="One-Line Intro" optional>
                <input type="text" value={details.headline}
                  onChange={e => setField('headline', e.target.value)}
                  style={inp} />
              </Field>
            </SectionCard>

            <SectionCard title="About yourself" subtitle="A few lines about who you are and what you are working towards">
              <Field label="About You" optional>
                <textarea value={details.bio}
                  onChange={e => setField('bio', e.target.value)}
                  rows={4}
                  style={{ ...inp, resize: 'vertical', lineHeight: 1.65 }} />
                <p style={{ margin: '0.3rem 0 0', fontSize: '0.75rem', color: 'var(--muted)' }}>
                  {details.bio.trim().split(/\s+/).filter(Boolean).length} words · aim for 40–80
                </p>
              </Field>
            </SectionCard>

            <SectionCard title="Where are you based?" subtitle="Your city and country — helps personalise your experience">
              <Field label="City & Country" optional>
                <input type="text" value={details.location}
                  onChange={e => setField('location', e.target.value)}
                  style={inp} />
              </Field>
            </SectionCard>
          </>
        )}

        {/* ── Error banner ──────────────────────────────────────────────── */}
        {profileError && (
          <div style={{
            padding: '0.85rem 1rem', borderRadius: '10px',
            background: 'rgba(239,68,68,0.06)', color: '#b91c1c',
            border: '1px solid rgba(239,68,68,0.2)', fontSize: '0.88rem', fontWeight: 500,
          }}>
            ⚠️ {profileError}
          </div>
        )}

        {/* ── Save button ───────────────────────────────────────────────── */}
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <button
            type="submit"
            disabled={saveStatus === 'saving'}
            style={{
              flex: 1, padding: '0.9rem 1.5rem', borderRadius: '12px', border: 'none',
              background: saveSuccess ? '#10b981' : 'var(--brand)',
              color: 'white', fontWeight: 700, fontSize: '0.95rem',
              cursor: saveStatus === 'saving' ? 'wait' : 'pointer',
              opacity: saveStatus === 'saving' ? 0.8 : 1,
              transition: 'background 0.3s, opacity 0.2s',
              boxShadow: '0 4px 12px rgba(37,99,235,0.22)',
            }}
          >
            {saveSuccess ? '✓ Saved!' : saveStatus === 'saving' ? '⟳ Saving…' : 'Save Profile'}
          </button>

          {saveStatus === 'unsaved' && (
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
              You have unsaved changes
            </span>
          )}
        </div>
      </form>

      {/* ── Resume Vault (feature-flagged) ──────────────────────────────── */}
      {RESUME_ENABLED && <div style={{ marginTop: '2rem' }}><ResumeVault /></div>}
    </main>
  );
}
