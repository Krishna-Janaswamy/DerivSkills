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
  preferredTimeline: 'this-week',
  notes: '',
};

const INTERVIEW_TYPE_LABELS = {
  technical: 'Technical depth check',
  behavioral: 'Behavioral round',
  system_design: 'System design round',
  mixed: 'Mixed interview loop',
};

const SENIORITY_LABELS = {
  student: 'Student / intern',
  'early-career': '0-3 years',
  mid: '3-7 years',
  senior: 'Senior / lead',
};

const TIMELINE_LABELS = {
  'next-24-hours': 'Within 24 hours',
  'this-week': 'This week',
  'next-week': 'Next week',
  flexible: 'Flexible',
};

const SIMPLE_STEPS = [
  'Add your target role and your current background.',
  'Choose the type of mock interview you want.',
  'Send the request so it is saved and the scheduler gets notified.',
];

export default function MockInterviewPage() {
  const { data: session } = useSession();
  const [form, setForm] = useState(DEFAULT_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [bookingResult, setBookingResult] = useState(null);

  function resetFeedback() {
    setSubmitError('');
    setBookingResult(null);
  }

  useEffect(() => {
    if (!session?.user) return;

    let ignore = false;

    async function hydrateProfile() {
      try {
        const response = await fetch('/api/profile');
        const data = await response.json();

        if (!response.ok || ignore) {
          return;
        }

        const profileDetails = data.profileDetails || {};
        const currentRole =
          data.user?.presentRole ||
          (profileDetails.userType === 'student' ? 'Student' : '') ||
          '';
        const organization = profileDetails.company || profileDetails.collegeName || '';

        setForm((current) => ({
          ...current,
          fullName: current.fullName || data.user?.name || session.user.name || '',
          email: current.email || data.user?.email || session.user.email || '',
          currentRole: current.currentRole || currentRole,
          organization: current.organization || organization,
        }));
      } catch {
        if (!ignore) {
          setForm((current) => ({
            ...current,
            fullName: current.fullName || session.user.name || '',
            email: current.email || session.user.email || '',
          }));
        }
      }
    }

    hydrateProfile();

    return () => {
      ignore = true;
    };
  }, [session]);

  const requestPreview = useMemo(() => {
    const candidateName = form.fullName.trim() || 'The candidate';
    const currentRole = form.currentRole.trim() || 'current background not provided';
    const organization = form.organization.trim() || 'organization not provided';
    const role = form.targetRole.trim() || 'target role not provided';
    const type = INTERVIEW_TYPE_LABELS[form.interviewType];
    const level = SENIORITY_LABELS[form.seniority];
    const timeline = TIMELINE_LABELS[form.preferredTimeline];

    return `${candidateName} is requesting a ${type.toLowerCase()} for ${role}. The session should match ${level.toLowerCase()} expectations and be planned ${timeline.toLowerCase()}. Current background: ${currentRole} at ${organization}. ${form.notes.trim() ? `Additional context: ${form.notes.trim()}` : 'The candidate wants focused feedback and realistic interview practice.'}`;
  }, [form]);

  function updateField(field, value) {
    resetFeedback();
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    resetFeedback();

    if (!form.fullName.trim() || !form.email.trim() || !form.targetRole.trim()) {
      setSubmitError('Please add your name, email, and target role before sending the request.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/mock-interview-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          interviewTypeLabel: INTERVIEW_TYPE_LABELS[form.interviewType],
          seniorityLabel: SENIORITY_LABELS[form.seniority],
          preferredTimelineLabel: TIMELINE_LABELS[form.preferredTimeline],
          requestPreview,
        }),
      });
      const contentType = response.headers.get('content-type') || '';
      const data = contentType.includes('application/json')
        ? await response.json()
        : { error: 'Unexpected server response. Please try again.' };

      if (!response.ok) {
        throw new Error(data.error || 'Could not prepare the booking request.');
      }

      setBookingResult(data);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Could not send the booking request.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="page-shell" style={{ maxWidth: '980px' }}>
      <section
        style={{
          background: 'var(--surface-color)',
          border: '1px solid var(--border-color)',
          borderRadius: '24px',
          padding: '32px',
          boxShadow: 'var(--shadow)',
          display: 'grid',
          gap: '24px',
        }}
      >
        <div style={{ display: 'grid', gap: '12px' }}>
          <p className="section-kicker" style={{ margin: 0, width: 'fit-content' }}>Mock Interview</p>
          <h1 className="page-title" style={{ margin: 0, maxWidth: '18ch' }}>
            Book a clean, role-based mock interview.
          </h1>
          <p className="page-subtitle" style={{ margin: 0, maxWidth: '62ch', lineHeight: 1.7 }}>
            Share your target role and interview details. We will save the booking request in the app and notify the scheduler at <strong>krishna.jms07@gmail.com</strong>.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '14px',
          }}
        >
          {SIMPLE_STEPS.map((step, index) => (
            <div
              key={step}
              style={{
                background: 'var(--surface-strong)',
                border: '1px solid var(--border)',
                borderRadius: '18px',
                padding: '18px',
              }}
            >
              <span
                style={{
                  display: 'inline-flex',
                  width: '28px',
                  height: '28px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '999px',
                  background: 'rgba(37, 99, 235, 0.12)',
                  color: 'var(--brand)',
                  fontWeight: 700,
                  marginBottom: '12px',
                }}
              >
                {index + 1}
              </span>
              <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.65 }}>{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        style={{
          marginTop: '24px',
          display: 'grid',
          gap: '20px',
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            background: 'var(--surface-color)',
            border: '1px solid var(--border-color)',
            borderRadius: '24px',
            padding: '28px',
            boxShadow: 'var(--shadow)',
            display: 'grid',
            gap: '16px',
          }}
        >
          <div style={{ display: 'grid', gap: '6px' }}>
            <h2 className="page-title" style={{ margin: 0, fontSize: '1.7rem' }}>Interview Request</h2>
            <p className="page-subtitle" style={{ margin: 0, lineHeight: 1.6 }}>
              Keep it simple. Fill the key details and send the request.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
            <Field label="Full name">
              <input value={form.fullName} onChange={(event) => updateField('fullName', event.target.value)} placeholder="Krishna Janaswamy" style={inputStyle} />
            </Field>
            <Field label="Email address">
              <input type="email" value={form.email} onChange={(event) => updateField('email', event.target.value)} placeholder="name@example.com" style={inputStyle} />
            </Field>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
            <Field label="Current role or status">
              <input value={form.currentRole} onChange={(event) => updateField('currentRole', event.target.value)} placeholder="Student or Software Engineer" style={inputStyle} />
            </Field>
            <Field label="Company or college">
              <input value={form.organization} onChange={(event) => updateField('organization', event.target.value)} placeholder="Redis or IIT Madras" style={inputStyle} />
            </Field>
          </div>

          <Field label="Target role">
            <input value={form.targetRole} onChange={(event) => updateField('targetRole', event.target.value)} placeholder="Backend Engineer" style={inputStyle} />
          </Field>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
            <Field label="Interview type">
              <select value={form.interviewType} onChange={(event) => updateField('interviewType', event.target.value)} style={inputStyle}>
                <option value="technical">Technical depth check</option>
                <option value="behavioral">Behavioral round</option>
                <option value="system_design">System design round</option>
                <option value="mixed">Mixed interview loop</option>
              </select>
            </Field>
            <Field label="Seniority">
              <select value={form.seniority} onChange={(event) => updateField('seniority', event.target.value)} style={inputStyle}>
                <option value="student">Student / intern</option>
                <option value="early-career">0-3 years</option>
                <option value="mid">3-7 years</option>
                <option value="senior">Senior / lead</option>
              </select>
            </Field>
          </div>

          <Field label="Preferred timeline">
            <select value={form.preferredTimeline} onChange={(event) => updateField('preferredTimeline', event.target.value)} style={inputStyle}>
              <option value="next-24-hours">Within 24 hours</option>
              <option value="this-week">This week</option>
              <option value="next-week">Next week</option>
              <option value="flexible">Flexible</option>
            </select>
          </Field>

          <Field label="Additional notes">
            <textarea
              value={form.notes}
              onChange={(event) => updateField('notes', event.target.value)}
              rows={4}
              placeholder="Mention any focus areas or interview concerns."
              style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }}
            />
          </Field>

          <button type="submit" className="role-link" style={{ width: '100%' }}>
            {isSubmitting ? 'Preparing Booking Request...' : 'Send Booking Request'}
          </button>

          {bookingResult?.warning && (
            <p style={{ margin: 0, color: '#92400e', fontWeight: 600, lineHeight: 1.7 }}>
              {bookingResult.warning}
            </p>
          )}

          {bookingResult && !bookingResult.warning && (
            <p style={{ margin: 0, color: '#166534', fontWeight: 600, lineHeight: 1.7 }}>
              {bookingResult.message}
            </p>
          )}

          {submitError && (
            <p style={{ margin: 0, color: '#b91c1c', fontWeight: 600 }}>
              {submitError}
            </p>
          )}
        </form>
      </section>
    </main>
  );
}

function Field({ label, children }) {
  return (
    <label style={{ display: 'grid', gap: '8px' }}>
      <span style={{ fontWeight: 600, color: 'var(--text-color)' }}>{label}</span>
      {children}
    </label>
  );
}

const inputStyle = {
  padding: '14px 16px',
  borderRadius: '14px',
  border: '1px solid var(--border-color)',
  fontSize: '1rem',
  background: '#fff',
  width: '100%',
};
