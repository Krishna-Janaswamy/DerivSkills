'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { useEffect, useMemo, useState } from 'react';
import { TechGenSpinner } from '@/components/TechGenSpinner';
import { fetchProfileAndCache, readProfileCache } from '@/src/utils/profile-cache';

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
  studentYear: '',
  studentGroup: '',
};

export default function ProfilePage() {
  const { data: session, status, update } = useSession();
  const userId = session?.user?.id;
  const [customName, setCustomName] = useState('');
  const [presentRole, setPresentRole] = useState('');
  const [professionalDetails, setProfessionalDetails] = useState(EMPTY_DETAILS);
  const [isSaving, setIsSaving] = useState(false);
  const [profileError, setProfileError] = useState('');
  const [isProfileReady, setIsProfileReady] = useState(false);
  const cacheKey = useMemo(() => (userId ? `profileCache:${userId}` : null), [userId]);

  useEffect(() => {
    if (!userId) return;
    const cached = readProfileCache(userId);
    if (!cached) return;
    setCustomName(cached.user?.name || session?.user?.name || '');
    setPresentRole(cached.user?.presentRole || session?.user?.presentRole || '');
    setProfessionalDetails({
      headline: cached.profileDetails?.headline || '',
      company: cached.profileDetails?.company || '',
      location: cached.profileDetails?.location || '',
      bio: cached.profileDetails?.bio || '',
      userType: cached.profileDetails?.userType || '',
      yearsExperience: cached.profileDetails?.yearsExperience || '',
      collegeName: cached.profileDetails?.collegeName || '',
      branch: cached.profileDetails?.branch || '',
      discoverySource: cached.profileDetails?.discoverySource || '',
      studentYear: cached.profileDetails?.studentYear || '',
      studentGroup: cached.profileDetails?.studentGroup || '',
    });
    setIsProfileReady(true);
  }, [userId, session?.user?.name, session?.user?.presentRole]);

  useEffect(() => {
    setCustomName(session?.user?.name || '');
    setPresentRole(session?.user?.presentRole || '');
  }, [session?.user?.name, session?.user?.presentRole]);

  useEffect(() => {
    if (!cacheKey) return;
    try {
      const stored = localStorage.getItem(cacheKey);
      if (!stored) return;
      const parsed = JSON.parse(stored);
      if (!parsed) return;
      setCustomName(parsed.user?.name || session?.user?.name || '');
      setPresentRole(parsed.user?.presentRole || session?.user?.presentRole || '');
      setProfessionalDetails({
        headline: parsed.profileDetails?.headline || '',
        company: parsed.profileDetails?.company || '',
        location: parsed.profileDetails?.location || '',
        bio: parsed.profileDetails?.bio || '',
        userType: parsed.profileDetails?.userType || '',
        yearsExperience: parsed.profileDetails?.yearsExperience || '',
        collegeName: parsed.profileDetails?.collegeName || '',
        branch: parsed.profileDetails?.branch || '',
        discoverySource: parsed.profileDetails?.discoverySource || '',
        studentYear: parsed.profileDetails?.studentYear || '',
        studentGroup: parsed.profileDetails?.studentGroup || '',
      });
      setIsProfileReady(true);
    } catch {
      // ignore cache errors
    }
  }, [cacheKey, session?.user?.name, session?.user?.presentRole]);

  useEffect(() => {
    if (!userId) {
      setIsProfileReady(false);
      return;
    }

    setIsProfileReady(false);
    setProfileError('');

    let ignore = false;

    async function loadProfile() {
      try {
        const payload = await fetchProfileAndCache(userId);

        if (ignore) return;

        const profilePayload = {
          headline: payload.profileDetails.headline || '',
          company: payload.profileDetails.company || '',
          location: payload.profileDetails.location || '',
          bio: payload.profileDetails.bio || '',
          userType: payload.profileDetails.userType || '',
          yearsExperience: payload.profileDetails.yearsExperience || '',
          collegeName: payload.profileDetails.collegeName || '',
          branch: payload.profileDetails.branch || '',
          discoverySource: payload.profileDetails.discoverySource || '',
          studentYear: payload.profileDetails.studentYear || '',
          studentGroup: payload.profileDetails.studentGroup || '',
        };

        setCustomName(payload.user?.name || session.user.name || '');
        setPresentRole(payload.user?.presentRole || session.user.presentRole || '');
        setProfessionalDetails(profilePayload);
      } catch (error) {
        if (!ignore) {
          setProfileError(error instanceof Error ? error.message : 'Could not load profile details.');
        }
      } finally {
        if (!ignore) {
          setIsProfileReady(true);
        }
      }
    }

    loadProfile();

    return () => {
      ignore = true;
    };
  }, [session, status]);

  function updateProfessionalField(field, value) {
    setProfessionalDetails((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSave(event) {
    event.preventDefault();
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
    <main className="page-shell" style={{ maxWidth: '720px', margin: '0 auto', padding: '3rem 0' }}>
      {!session ? (
        <div
          style={{
            padding: '2.5rem',
            borderRadius: '20px',
            border: '1px solid var(--border)',
            background: 'var(--surface)',
            boxShadow: 'var(--shadow-soft)',
            textAlign: 'center',
            display: 'grid',
            gap: '1rem',
          }}
        >
          <h1 className="page-title" style={{ margin: 0, fontSize: '2.2rem' }}>Sign in to update your profile</h1>
          <p className="page-subtitle" style={{ margin: 0, color: 'var(--text-secondary)' }}>
            Use Google or GitHub so your updates stay synced across devices.
          </p>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            <button
              onClick={() => signIn('google', { callbackUrl: '/profile' })}
              style={{
                padding: '0.95rem 1rem',
                borderRadius: '999px',
                border: 'none',
                background: '#1a73e8',
                color: '#fff',
                fontWeight: 600,
                fontSize: '1rem',
                cursor: 'pointer',
              }}
            >
              Continue with Google
            </button>
            <button
              onClick={() => signIn('github', { callbackUrl: '/profile' })}
              style={{
                padding: '0.95rem 1rem',
                borderRadius: '999px',
                border: '1px solid var(--border)',
                background: '#111827',
                color: '#f9fafb',
                fontWeight: 600,
                fontSize: '1rem',
                cursor: 'pointer',
              }}
            >
              Continue with GitHub
            </button>
          </div>
        </div>
      ) : !isProfileReady ? (
        <div
          style={{
            padding: '2.5rem',
            borderRadius: '20px',
            border: '1px solid var(--border)',
            background: 'var(--surface)',
            boxShadow: 'var(--shadow-soft)',
            display: 'grid',
            gap: '1.5rem',
            justifyItems: 'center',
          }}
        >
          <TechGenSpinner text="Loading profile..." />
        </div>
      ) : (
        <div
          style={{
            padding: '2.5rem',
            borderRadius: '20px',
            border: '1px solid var(--border)',
            background: 'var(--surface)',
            boxShadow: 'var(--shadow-soft)',
            display: 'grid',
            gap: '1.5rem',
          }}
        >
          <div>
            <h1 className="page-title" style={{ margin: 0, fontSize: '2.2rem' }}>Profile</h1>
            <p className="page-subtitle" style={{ margin: '0.25rem 0 1rem', color: 'var(--text-secondary)' }}>
              Keep your name and role aligned across every device you use.
            </p>
          </div>
          <form onSubmit={handleSave} style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--text-secondary)',
                  marginBottom: '0.4rem',
                }}
              >
                Full name
              </label>
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)',
                  outline: 'none',
                  fontSize: '1rem',
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--text-secondary)',
                  marginBottom: '0.4rem',
                }}
              >
                Email
              </label>
              <input
                type="email"
                value={session.user?.email || ''}
                disabled
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)',
                  background: 'var(--surface-muted)',
                  color: 'var(--text-secondary)',
                  fontSize: '1rem',
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--text-secondary)',
                  marginBottom: '0.4rem',
                }}
              >
                Profile type
              </label>
              <select
                value={professionalDetails.userType}
                onChange={(e) => updateProfessionalField('userType', e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)',
                  fontSize: '1rem',
                }}
              >
                <option value="">Select one</option>
                <option value="student">Student</option>
                <option value="professional">Professional</option>
              </select>
            </div>

            {professionalDetails.userType === 'student' && (
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--text-secondary)',
                      marginBottom: '0.4rem',
                    }}
                  >
                    Year
                  </label>
                  <input
                    type="text"
                    value={professionalDetails.studentYear || ''}
                    onChange={(e) => updateProfessionalField('studentYear', e.target.value)}
                    placeholder="e.g. 3rd year"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '12px',
                      border: '1px solid var(--border-color)',
                      fontSize: '1rem',
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--text-secondary)',
                      marginBottom: '0.4rem',
                    }}
                  >
                    Group
                  </label>
                  <input
                    type="text"
                    value={professionalDetails.studentGroup || ''}
                    onChange={(e) => updateProfessionalField('studentGroup', e.target.value)}
                    placeholder="e.g. Cohort name"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '12px',
                      border: '1px solid var(--border-color)',
                      fontSize: '1rem',
                    }}
                  />
                </div>
              </div>
            )}

            {professionalDetails.userType === 'professional' && (
              <div style={{ display: 'grid', gap: '0.75rem' }}>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--text-secondary)',
                      marginBottom: '0.4rem',
                    }}
                  >
                    Company
                  </label>
                  <input
                    type="text"
                    value={professionalDetails.company || ''}
                    onChange={(e) => updateProfessionalField('company', e.target.value)}
                    placeholder="e.g. Current employer"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '12px',
                      border: '1px solid var(--border-color)',
                      fontSize: '1rem',
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--text-secondary)',
                      marginBottom: '0.4rem',
                    }}
                  >
                    Years of experience
                  </label>
                  <input
                    type="text"
                    value={professionalDetails.yearsExperience || ''}
                    onChange={(e) => updateProfessionalField('yearsExperience', e.target.value)}
                    placeholder="e.g. 4 years"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '12px',
                      border: '1px solid var(--border-color)',
                      fontSize: '1rem',
                    }}
                  />
                </div>
              </div>
            )}

            {profileError ? (
              <div style={{ padding: '0.75rem 1rem', borderRadius: '12px', background: '#fef2f2', color: '#b91c1c', border: '1px solid #fecaca' }}>
                {profileError}
              </div>
            ) : null}

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                type="submit"
                disabled={isSaving}
                style={{
                  flex: '1 1 auto',
                  padding: '0.95rem 1rem',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'var(--brand)',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  opacity: isSaving ? 0.75 : 1,
                }}
              >
                {isSaving ? 'Saving...' : 'Save profile'}
              </button>
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: '/' })}
                style={{
                  flex: '1 1 auto',
                  padding: '0.95rem 1rem',
                  borderRadius: '12px',
                  border: '1px solid var(--border)',
                  background: '#fff',
                  color: 'var(--text-secondary)',
                  fontWeight: 600,
                  fontSize: '1rem',
                  cursor: 'pointer',
                }}
              >
                Log out
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}
