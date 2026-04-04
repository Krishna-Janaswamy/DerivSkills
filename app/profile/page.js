'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { TechGenSpinner } from '@/components/TechGenSpinner';

const EMPTY_DETAILS = {
  headline: '',
  company: '',
  location: '',
  bio: '',
  userType: '',
  yearsExperience: '',
  collegeName: '',
  branch: '',
  discoverySource: '',
};

export default function ProfilePage() {
  const { data: session, status, update } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [customName, setCustomName] = useState('');
  const [presentRole, setPresentRole] = useState('');
  const [professionalDetails, setProfessionalDetails] = useState(EMPTY_DETAILS);
  const [profileError, setProfileError] = useState('');

  useEffect(() => {
    if (!session?.user) return;

    setCustomName(session.user.name || '');
    setPresentRole(session.user.presentRole || '');
  }, [session]);

  useEffect(() => {
    if (!session?.user?.id) return;

    let ignore = false;

    async function loadProfile() {
      setProfileError('');

      try {
        const response = await fetch('/api/profile');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Could not load profile details.');
        }

        if (ignore) return;

        setCustomName(data.user?.name || session.user.name || '');
        setPresentRole(data.user?.presentRole || session.user.presentRole || '');
        setProfessionalDetails({
          headline: data.profileDetails?.headline || '',
          company: data.profileDetails?.company || '',
          location: data.profileDetails?.location || '',
          bio: data.profileDetails?.bio || '',
          userType: data.profileDetails?.userType || '',
          yearsExperience: data.profileDetails?.yearsExperience || '',
          collegeName: data.profileDetails?.collegeName || '',
          branch: data.profileDetails?.branch || '',
          discoverySource: data.profileDetails?.discoverySource || '',
        });
      } catch (error) {
        if (!ignore) {
          setProfileError(error instanceof Error ? error.message : 'Could not load profile details.');
        }
      }
    }

    loadProfile();

    return () => {
      ignore = true;
    };
  }, [session]);

  function updateProfessionalField(field, value) {
    setProfessionalDetails((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSave() {
    if (!session?.user?.id) return;

    setIsSaving(true);
    setProfileError('');

    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: customName,
          presentRole,
          profileDetails: professionalDetails,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Database Error');
      }

      await update();
      setIsEditing(false);
    } catch (error) {
      setProfileError(error instanceof Error ? error.message : 'Failed to save profile.');
    } finally {
      setIsSaving(false);
    }
  }

  if (status === 'loading') {
    return (
      <main className="page-shell" style={{ display: 'grid', placeItems: 'center', height: '60vh' }}>
        <TechGenSpinner text="Initializing Secure Database Session..." />
      </main>
    );
  }

  return (
    <main className="page-shell" style={{ maxWidth: '980px', margin: '0 auto', paddingBottom: '4rem' }}>
      <div
        style={{
          background: 'var(--surface-color)',
          border: '1px solid var(--border-color)',
          borderRadius: '24px',
          padding: '3rem',
          boxShadow: 'var(--shadow)',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
        }}
      >
        {!session ? (
          <>
            <div style={{ textAlign: 'center', display: 'grid', gap: '1rem', justifyItems: 'center' }}>
              <div style={{ fontSize: '4.5rem' }}>👋</div>
              <h1 className="page-title" style={{ margin: 0, fontSize: '3rem', letterSpacing: '-0.03em' }}>Welcome back</h1>
              <p className="page-subtitle" style={{ fontSize: '1.2rem', maxWidth: '420px', margin: 0, lineHeight: 1.6 }}>
                Sign in to securely sync your active tracks, custom analytics, and AI-generated plans to the Cloud.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', maxWidth: '360px', margin: '0 auto' }}>
              <button
                onClick={() => signIn('google')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  padding: '16px',
                  borderRadius: '14px',
                  background: '#ffffff',
                  color: '#000000',
                  border: '1px solid var(--border-color)',
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'transform 0.2s, boxShadow 0.2s',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                }}
              >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" width="24" height="24" alt="Google" />
                Continue with Google
              </button>
            </div>
          </>
        ) : (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: '140px minmax(0, 1fr)', gap: '1.5rem', alignItems: 'center' }}>
              <div style={{ position: 'relative', justifySelf: 'center' }}>
                <img
                  src={session.user.image || 'https://www.svgrepo.com/show/509001/avatar-thinking-2.svg'}
                  alt="Profile Avatar"
                  style={{
                    width: '130px',
                    height: '130px',
                    borderRadius: '50%',
                    border: '4px solid var(--surface-strong)',
                    boxShadow: '0 0 30px rgba(79, 70, 229, 0.4)',
                    objectFit: 'cover',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '4px',
                    right: '4px',
                    background: '#10b981',
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    border: '4px solid #ffffff',
                  }}
                  title="Online"
                />
              </div>

              <div style={{ minWidth: 0 }}>
                <div className="section-kicker" style={{ marginBottom: '1rem' }}>Authorized Profile</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                  <h1 className="page-title" style={{ margin: 0, fontSize: '2.5rem', letterSpacing: '-0.02em' }}>
                    {customName || session.user.name || 'Anonymous User'}
                  </h1>
                  <button
                    onClick={() => setIsEditing((current) => !current)}
                    title="Edit profile details"
                    style={{
                      background: 'var(--surface-strong)',
                      border: '1px solid var(--border-color)',
                      cursor: 'pointer',
                      color: 'var(--text-color)',
                      padding: '8px 12px',
                      borderRadius: '999px',
                      fontWeight: 600,
                    }}
                  >
                    {isEditing ? 'Close editor' : 'Edit profile'}
                  </button>
                </div>

                <p className="page-subtitle" style={{ margin: '0.65rem 0 0', fontSize: '1rem', lineHeight: 1.6 }}>
                  {professionalDetails.headline || presentRole || 'Add your professional headline to complete your profile.'}
                </p>
              </div>
            </div>

            {profileError ? (
              <div style={{ color: '#9f1239', background: '#fff1f2', padding: '1rem', borderRadius: '12px', border: '1px solid #fecdd3' }}>
                {profileError}
              </div>
            ) : null}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '16px' }}>
              <div style={{ padding: '1.25rem', background: 'var(--surface-strong)', borderRadius: '18px', border: '1px solid var(--border-color)' }}>
                <span style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '0.5rem' }}>Email</span>
                <strong style={{ display: 'block', color: 'var(--text-color)', fontSize: '1.05rem', wordBreak: 'break-word' }}>{session.user.email || 'No email available'}</strong>
              </div>

              <div style={{ padding: '1.25rem', background: 'var(--surface-strong)', borderRadius: '18px', border: '1px solid var(--border-color)' }}>
                <span style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '0.5rem' }}>Professional Role</span>
                <strong style={{ display: 'block', color: 'var(--text-color)', fontSize: '1.05rem' }}>{presentRole || 'Not set yet'}</strong>
              </div>

              <div style={{ padding: '1.25rem', background: 'var(--surface-strong)', borderRadius: '18px', border: '1px solid var(--border-color)' }}>
                <span style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '0.5rem' }}>Profile Type</span>
                <strong style={{ display: 'block', color: 'var(--text-color)', fontSize: '1.05rem' }}>
                  {professionalDetails.userType ? professionalDetails.userType.charAt(0).toUpperCase() + professionalDetails.userType.slice(1) : 'Not set yet'}
                </strong>
              </div>

              <div style={{ padding: '1.25rem', background: 'var(--surface-strong)', borderRadius: '18px', border: '1px solid var(--border-color)' }}>
                <span style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '0.5rem' }}>Found Us Via</span>
                <strong style={{ display: 'block', color: 'var(--text-color)', fontSize: '1.05rem' }}>{professionalDetails.discoverySource || 'Not shared yet'}</strong>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '18px' }}>
              <section style={{ padding: '1.5rem', background: 'var(--surface-strong)', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
                <h2 className="page-title" style={{ margin: '0 0 1rem', fontSize: '1.35rem' }}>Professional Summary</h2>
                <div style={{ display: 'grid', gap: '1rem' }}>
                  <div>
                    <span style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '0.35rem' }}>Headline</span>
                    <p className="page-subtitle" style={{ margin: 0, lineHeight: 1.6 }}>{professionalDetails.headline || 'Add a headline like Senior Frontend Engineer or AI Product Analyst.'}</p>
                  </div>
                  <div>
                    <span style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '0.35rem' }}>Company</span>
                    <p className="page-subtitle" style={{ margin: 0, lineHeight: 1.6 }}>{professionalDetails.company || 'No company added yet.'}</p>
                  </div>
                  {professionalDetails.userType === 'professional' ? (
                    <div>
                      <span style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '0.35rem' }}>Years of Experience</span>
                      <p className="page-subtitle" style={{ margin: 0, lineHeight: 1.6 }}>{professionalDetails.yearsExperience || 'No experience range added yet.'}</p>
                    </div>
                  ) : null}
                  {professionalDetails.userType === 'student' ? (
                    <>
                      <div>
                        <span style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '0.35rem' }}>Branch</span>
                        <p className="page-subtitle" style={{ margin: 0, lineHeight: 1.6 }}>{professionalDetails.branch || 'No branch added yet.'}</p>
                      </div>
                      <div>
                        <span style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '0.35rem' }}>College Name</span>
                        <p className="page-subtitle" style={{ margin: 0, lineHeight: 1.6 }}>{professionalDetails.collegeName || 'No college name added yet.'}</p>
                      </div>
                    </>
                  ) : null}
                  <div>
                    <span style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '0.35rem' }}>Location</span>
                    <p className="page-subtitle" style={{ margin: 0, lineHeight: 1.6 }}>{professionalDetails.location || 'No location added yet.'}</p>
                  </div>
                  <div>
                    <span style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '0.35rem' }}>Bio</span>
                    <p className="page-subtitle" style={{ margin: 0, lineHeight: 1.7 }}>{professionalDetails.bio || 'Write a short professional summary so your profile feels complete after sign-in.'}</p>
                  </div>
                </div>
              </section>
            </div>

            {isEditing ? (
              <div style={{ display: 'grid', gap: '1rem', textAlign: 'left', padding: '1.5rem', background: 'var(--surface-strong)', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
                <h2 className="page-title" style={{ margin: 0, fontSize: '1.35rem' }}>Edit Professional Details</h2>

                <div>
                  <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.5rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Display Name</label>
                  <input
                    type="text"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    style={{ width: '100%', padding: '14px 18px', background: '#ffffff', border: '1px solid var(--border-color)', borderRadius: '12px', color: 'var(--text-color)', fontSize: '1.05rem', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.5rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Professional Role</label>
                  <input
                    type="text"
                    placeholder="e.g. Enterprise Architect"
                    value={presentRole}
                    onChange={(e) => setPresentRole(e.target.value)}
                    style={{ width: '100%', padding: '14px 18px', background: '#ffffff', border: '1px solid var(--border-color)', borderRadius: '12px', color: 'var(--text-color)', fontSize: '1.05rem', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.5rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Profile Type</label>
                  <select
                    value={professionalDetails.userType || ''}
                    onChange={(e) => updateProfessionalField('userType', e.target.value)}
                    style={{ width: '100%', padding: '14px 18px', background: '#ffffff', border: '1px solid var(--border-color)', borderRadius: '12px', color: 'var(--text-color)', fontSize: '1rem', outline: 'none' }}
                  >
                    <option value="">Select one</option>
                    <option value="professional">Professional</option>
                    <option value="student">Student</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.5rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Headline</label>
                  <input
                    type="text"
                    placeholder="e.g. Building cloud-native AI systems"
                    value={professionalDetails.headline}
                    onChange={(e) => updateProfessionalField('headline', e.target.value)}
                    style={{ width: '100%', padding: '14px 18px', background: '#ffffff', border: '1px solid var(--border-color)', borderRadius: '12px', color: 'var(--text-color)', fontSize: '1.05rem', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.5rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Company</label>
                    <input
                      type="text"
                      placeholder="e.g. Redis"
                      value={professionalDetails.company}
                      onChange={(e) => updateProfessionalField('company', e.target.value)}
                      style={{ width: '100%', padding: '14px 18px', background: '#ffffff', border: '1px solid var(--border-color)', borderRadius: '12px', color: 'var(--text-color)', fontSize: '1.05rem', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.5rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Location</label>
                    <input
                      type="text"
                      placeholder="e.g. Bengaluru, India"
                      value={professionalDetails.location}
                      onChange={(e) => updateProfessionalField('location', e.target.value)}
                      style={{ width: '100%', padding: '14px 18px', background: '#ffffff', border: '1px solid var(--border-color)', borderRadius: '12px', color: 'var(--text-color)', fontSize: '1.05rem', outline: 'none' }}
                    />
                  </div>
                </div>

                {professionalDetails.userType === 'professional' ? (
                  <div>
                    <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.5rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Years of Experience</label>
                    <input
                      type="text"
                      placeholder="e.g. 3 years"
                      value={professionalDetails.yearsExperience || ''}
                      onChange={(e) => updateProfessionalField('yearsExperience', e.target.value)}
                      style={{ width: '100%', padding: '14px 18px', background: '#ffffff', border: '1px solid var(--border-color)', borderRadius: '12px', color: 'var(--text-color)', fontSize: '1.05rem', outline: 'none' }}
                    />
                  </div>
                ) : null}

                {professionalDetails.userType === 'student' ? (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.5rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Branch</label>
                      <input
                        type="text"
                        placeholder="e.g. Computer Science"
                        value={professionalDetails.branch || ''}
                        onChange={(e) => updateProfessionalField('branch', e.target.value)}
                        style={{ width: '100%', padding: '14px 18px', background: '#ffffff', border: '1px solid var(--border-color)', borderRadius: '12px', color: 'var(--text-color)', fontSize: '1.05rem', outline: 'none' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.5rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>College Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Anna University"
                        value={professionalDetails.collegeName || ''}
                        onChange={(e) => updateProfessionalField('collegeName', e.target.value)}
                        style={{ width: '100%', padding: '14px 18px', background: '#ffffff', border: '1px solid var(--border-color)', borderRadius: '12px', color: 'var(--text-color)', fontSize: '1.05rem', outline: 'none' }}
                      />
                    </div>
                  </div>
                ) : null}

                <div>
                  <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.5rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>How did you find this app?</label>
                  <input
                    type="text"
                    placeholder="e.g. LinkedIn, friend, campus, GitHub"
                    value={professionalDetails.discoverySource || ''}
                    onChange={(e) => updateProfessionalField('discoverySource', e.target.value)}
                    style={{ width: '100%', padding: '14px 18px', background: '#ffffff', border: '1px solid var(--border-color)', borderRadius: '12px', color: 'var(--text-color)', fontSize: '1.05rem', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.5rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Professional Bio</label>
                  <textarea
                    rows="4"
                    placeholder="Write a short professional summary."
                    value={professionalDetails.bio}
                    onChange={(e) => updateProfessionalField('bio', e.target.value)}
                    style={{ width: '100%', padding: '14px 18px', background: '#ffffff', border: '1px solid var(--border-color)', borderRadius: '12px', color: 'var(--text-color)', fontSize: '1rem', outline: 'none', resize: 'vertical' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '0.5rem' }}>
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    style={{ flex: 1, padding: '14px', background: 'var(--brand)', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', opacity: isSaving ? 0.75 : 1 }}
                  >
                    {isSaving ? 'Saving...' : 'Save Profile'}
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    style={{ flex: 1, padding: '14px', background: '#ffffff', color: 'var(--text-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', fontWeight: 600, cursor: 'pointer' }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : null}

            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              style={{
                marginTop: '0.5rem',
                alignSelf: 'center',
                padding: '16px 42px',
                borderRadius: '999px',
                background: '#ffffff',
                color: '#ef4444',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                fontSize: '1.1rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 12px rgba(239, 68, 68, 0.05)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.transform = 'none';
              }}
            >
              Securely Terminate Session
            </button>
          </>
        )}
      </div>
    </main>
  );
}
