'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';

const DEFAULT_FORM = {
  fullName: '',
  email: '',
  currentRole: '',
  organization: '',
  targetRole: '',
  interviewType: 'technical',
  seniority: 'early-career',
  notes: '',
};

const inp = {
  width: '100%', padding: '10px 13px', borderRadius: '8px',
  border: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.05)',
  color: 'var(--text-color)', fontSize: '0.93rem', fontFamily: 'inherit',
  boxSizing: 'border-box', outline: 'none',
};

function Field({ label, required, children }) {
  return (
    <div style={{ display: 'grid', gap: '5px' }}>
      <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-color)' }}>
        {label}{required && <span style={{ color: '#ef4444', marginLeft: 2 }}>*</span>}
      </label>
      {children}
    </div>
  );
}

export default function MockInterviewPage() {
  const { data: session } = useSession();
  const [form, setForm] = useState(DEFAULT_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [bookingResult, setBookingResult] = useState(null);
  const [bookingStats, setBookingStats] = useState(null);

  function resetFeedback() { setSubmitError(''); setBookingResult(null); }
  function set(field, value) { resetFeedback(); setForm(f => ({ ...f, [field]: value })); }

  useEffect(() => {
    if (!session?.user) return;
    let ignore = false;
    async function hydrate() {
      try {
        const [profRes, statsRes] = await Promise.all([
          fetch('/api/profile'),
          fetch('/api/mock-interview-booking')
        ]);
        
        if (!ignore && statsRes.ok) {
          const stats = await statsRes.json();
          setBookingStats(stats);
        }

        const data = await profRes.json();
        if (!profRes.ok || ignore) return;
        const pd  = data.profileDetails || {};
        const role = data.user?.presentRole || (pd.userType === 'student' ? 'Student' : '') || '';
        const org  = pd.company || pd.collegeName || '';
        setForm(f => ({
          ...f,
          fullName:     f.fullName     || data.user?.name  || session.user.name  || '',
          email:        f.email        || data.user?.email || session.user.email || '',
          currentRole:  f.currentRole  || role,
          organization: f.organization || org,
        }));
      } catch {
        if (!ignore) setForm(f => ({
          ...f,
          fullName: f.fullName || session.user.name  || '',
          email:    f.email    || session.user.email || '',
        }));
      }
    }
    hydrate();
    return () => { ignore = true; };
  }, [session]);

  const requestPreview = useMemo(() => {
    const name = form.fullName.trim() || 'The candidate';
    const role = form.targetRole.trim() || 'not provided';
    const bg   = form.currentRole.trim() || 'not provided';
    const org  = form.organization.trim() || 'not provided';
    return `${name} — ${form.interviewType} interview for ${role}. Level: ${form.seniority}. Background: ${bg} at ${org}.${form.notes.trim() ? ` Notes: ${form.notes.trim()}` : ''}`;
  }, [form]);

  async function handleSubmit(e) {
    e.preventDefault();
    resetFeedback();
    if (!form.fullName.trim() || !form.email.trim() || !form.targetRole.trim()) {
      setSubmitError('Please fill in your name, email, and target role.');
      return;
    }
    setIsSubmitting(true);
    try {
      const res  = await fetch('/api/mock-interview-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, requestPreview }),
      });
      const ct   = res.headers.get('content-type') || '';
      const data = ct.includes('application/json') ? await res.json() : { error: 'Unexpected response.' };
      if (!res.ok) throw new Error(data.error || 'Something went wrong.');
      setBookingResult(data);
      
      // Refresh stats after successful booking
      const statsRes = await fetch('/api/mock-interview-booking');
      if (statsRes.ok) setBookingStats(await statsRes.json());
      
    } catch (err) {
      const isFetch = !err?.message || ['fetch','network','Failed to fetch'].some(k => err.message.includes(k));
      setSubmitError(isFetch ? 'Could not reach the server. Please check your connection.' : err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="page-shell" style={{ maxWidth: 700, margin: '0 auto' }}>

      {/* Page title */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ margin: '0 0 0.3rem', fontSize: '1.6rem', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-color)' }}>
            Book a Mock Interview
          </h1>
          <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            Fill in the form below and our team will get back to you to confirm a time.
            {' '}<span style={{ color: '#ef4444' }}>*</span> fields are required.
          </p>
        </div>
        {bookingStats && (
          <div style={{ background: 'var(--surface-muted)', border: '1px solid var(--border)', padding: '0.6rem 1rem', borderRadius: '10px', textAlign: 'right' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.2rem' }}>
              Requests Used
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: bookingStats.count >= bookingStats.limit ? '#ef4444' : 'var(--brand)' }}>
              {bookingStats.count} <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 600 }}>/ {bookingStats.limit}</span>
            </div>
          </div>
        )}
      </div>

      {/* Form card */}
      <form
        onSubmit={handleSubmit}
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          padding: '2rem',
          boxShadow: 'var(--shadow-soft)',
          display: 'grid',
          gap: '1.25rem',
        }}
      >
        {/* Name + Email */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <Field label="Full Name" required>
            <input type="text" value={form.fullName} onChange={e => set('fullName', e.target.value)} style={inp} />
          </Field>
          <Field label="Email Address" required>
            <input type="email" value={form.email} onChange={e => set('email', e.target.value)} style={inp} />
          </Field>
        </div>

        {/* Current Role + Org */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <Field label="Current Role">
            <input type="text" value={form.currentRole} onChange={e => set('currentRole', e.target.value)} style={inp} />
          </Field>
          <Field label="Company / College">
            <input type="text" value={form.organization} onChange={e => set('organization', e.target.value)} style={inp} />
          </Field>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '0.25rem 0' }} />

        {/* Target role */}
        <Field label="Target Role" required>
          <input type="text" value={form.targetRole} onChange={e => set('targetRole', e.target.value)} style={inp} />
        </Field>

        {/* Interview type + Seniority */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <Field label="Interview Type">
            <select value={form.interviewType} onChange={e => set('interviewType', e.target.value)} style={{ ...inp, cursor: 'pointer' }}>
              <option value="technical">Technical</option>
              <option value="behavioral">Behavioural</option>
              <option value="system_design">System Design</option>
              <option value="mixed">Mixed</option>
            </select>
          </Field>
          <Field label="Seniority">
            <select value={form.seniority} onChange={e => set('seniority', e.target.value)} style={{ ...inp, cursor: 'pointer' }}>
              <option value="student">Student / Intern</option>
              <option value="early-career">0–3 years</option>
              <option value="mid">3–7 years</option>
              <option value="senior">Senior / Lead</option>
            </select>
          </Field>
        </div>

        {/* Notes */}
        <Field label="Additional Notes">
          <textarea
            value={form.notes}
            onChange={e => set('notes', e.target.value)}
            rows={4}
            style={{ ...inp, resize: 'vertical', lineHeight: 1.65 }}
          />
        </Field>

        {/* Feedback */}
        {submitError && (
          <p style={{ margin: 0, fontSize: '0.86rem', color: '#b91c1c', fontWeight: 500 }}>⚠️ {submitError}</p>
        )}
        {bookingResult?.warning && (
          <p style={{ margin: 0, fontSize: '0.86rem', color: '#92400e', fontWeight: 500 }}>{bookingResult.warning}</p>
        )}
        {bookingResult && !bookingResult.warning && (
          <p style={{ margin: 0, fontSize: '0.86rem', color: '#166534', fontWeight: 600 }}>✓ {bookingResult.message}</p>
        )}

        {/* Submit */}
        {(() => {
          const limitReachedMsg = bookingStats?.count >= bookingStats?.limit 
            ? "You have reached your maximum limit of requests." 
            : (bookingStats?.nextAvailableAt && new Date(bookingStats.nextAvailableAt) > new Date() 
                ? `You can send your next request after ${new Date(bookingStats.nextAvailableAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}` 
                : null);

          return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button
                type="submit"
                disabled={isSubmitting || !!limitReachedMsg}
                style={{
                  padding: '0.85rem', borderRadius: '10px', border: 'none',
                  background: limitReachedMsg ? 'var(--surface-strong)' : 'var(--brand)', 
                  color: limitReachedMsg ? 'var(--text-secondary)' : '#fff',
                  fontWeight: 700, fontSize: '0.95rem', fontFamily: 'inherit',
                  cursor: isSubmitting ? 'wait' : (limitReachedMsg ? 'not-allowed' : 'pointer'),
                  opacity: isSubmitting ? 0.75 : 1,
                  transition: 'all 0.2s',
                }}
              >
                {isSubmitting ? 'Sending…' : 'Send Request'}
              </button>
              {limitReachedMsg && (
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#f59e0b', fontWeight: 500, textAlign: 'center' }}>
                  ⏳ {limitReachedMsg}
                </p>
              )}
            </div>
          );
        })()}
      </form>
    </main>
  );
}
