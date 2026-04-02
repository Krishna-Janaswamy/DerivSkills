'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';

const LOCAL_KEY = 'derivskills-onboarding';

const EMPTY_FORM = {
  userType: '',
  profession: '',
  company: '',
  yearsExperience: '',
  branch: '',
  collegeName: '',
  discoverySource: '',
};

function readLocalOnboarding() {
  if (typeof window === 'undefined') return null;

  try {
    const raw = window.localStorage.getItem(LOCAL_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeLocalOnboarding(data) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
}

export function WelcomeProfileModal() {
  const { data: session, status, update } = useSession();
  const [isReady, setIsReady] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [profileSnapshot, setProfileSnapshot] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    if (status === 'loading') return;

    let ignore = false;

    async function initialize() {
      const localData = readLocalOnboarding();

      if (status === 'unauthenticated') {
        if (ignore) return;
        if (localData?.onboardingCompleted) {
          setForm((current) => ({ ...current, ...localData }));
          setIsOpen(false);
        } else {
          setForm((current) => ({ ...current, ...localData }));
          setIsOpen(true);
        }
        setIsReady(true);
        return;
      }

      try {
        const response = await fetch('/api/profile');
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Could not load onboarding state.');
        }

        if (ignore) return;

        const remoteProfile = {
          name: data.user?.name || session?.user?.name || '',
          presentRole: data.user?.presentRole || session?.user?.presentRole || '',
          profileDetails: data.profileDetails || {},
        };

        setProfileSnapshot(remoteProfile);

        const mergedForm = {
          ...EMPTY_FORM,
          userType: data.profileDetails?.userType || localData?.userType || '',
          profession: data.user?.presentRole || localData?.profession || '',
          company: data.profileDetails?.company || localData?.company || '',
          yearsExperience: data.profileDetails?.yearsExperience || localData?.yearsExperience || '',
          branch: data.profileDetails?.branch || localData?.branch || '',
          collegeName: data.profileDetails?.collegeName || localData?.collegeName || '',
          discoverySource: data.profileDetails?.discoverySource || localData?.discoverySource || '',
        };

        setForm(mergedForm);

        if (data.profileDetails?.onboardingCompleted) {
          setIsOpen(false);
          setIsReady(true);
          return;
        }

        if (localData?.onboardingCompleted) {
          await fetch('/api/profile', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: remoteProfile.name,
              presentRole: localData.profession || remoteProfile.presentRole,
              profileDetails: {
                ...remoteProfile.profileDetails,
                userType: localData.userType || '',
                company: localData.company || remoteProfile.profileDetails.company || '',
                yearsExperience: localData.yearsExperience || '',
                branch: localData.branch || '',
                collegeName: localData.collegeName || '',
                discoverySource: localData.discoverySource || '',
                onboardingCompleted: true,
              },
            }),
          });

          await update();
          setIsOpen(false);
        } else {
          setIsOpen(true);
        }
      } catch {
        if (!ignore) {
          setIsOpen(!localData?.onboardingCompleted);
          setForm((current) => ({ ...current, ...localData }));
        }
      } finally {
        if (!ignore) {
          setIsReady(true);
        }
      }
    }

    initialize();

    return () => {
      ignore = true;
    };
  }, [session, status, update]);

  const steps = useMemo(() => {
    const base = [
      {
        key: 'userType',
        title: 'Tell us about you',
        description: 'Are you a working professional or a student?',
        placeholder: '',
        type: 'choice',
        options: [
          { label: 'Professional', value: 'professional' },
          { label: 'Student', value: 'student' },
        ],
      },
    ];

    if (form.userType === 'professional') {
      base.push(
        {
          key: 'profession',
          title: 'What is your profession?',
          description: 'Share your current role or professional title.',
          placeholder: 'e.g. Software Engineer',
          type: 'text',
        },
        {
          key: 'company',
          title: 'Which company are you with?',
          description: 'This helps us personalize your profile context.',
          placeholder: 'e.g. Redis',
          type: 'text',
        },
        {
          key: 'yearsExperience',
          title: 'How much experience do you have?',
          description: 'Add your years of experience.',
          placeholder: 'e.g. 4 years',
          type: 'text',
        },
      );
    }

    if (form.userType === 'student') {
      base.push(
        {
          key: 'branch',
          title: 'What are you studying?',
          description: 'Share your branch, major, or area of study.',
          placeholder: 'e.g. Computer Science',
          type: 'text',
        },
        {
          key: 'collegeName',
          title: 'Which college are you from?',
          description: 'Add your college or university name.',
          placeholder: 'e.g. IIT Madras',
          type: 'text',
        },
      );
    }

    base.push({
      key: 'discoverySource',
      title: 'How did you find this app?',
      description: 'This helps us understand what is working.',
      placeholder: 'e.g. LinkedIn, friend, college, GitHub, X',
      type: 'text',
    });

    return base;
  }, [form.userType]);

  useEffect(() => {
    if (stepIndex >= steps.length) {
      setStepIndex(Math.max(steps.length - 1, 0));
    }
  }, [stepIndex, steps.length]);

  function updateField(key, value) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function canContinue() {
    const step = steps[stepIndex];
    if (!step) return false;
    return String(form[step.key] || '').trim().length > 0;
  }

  async function handleComplete() {
    const payload = {
      ...form,
      onboardingCompleted: true,
    };

    writeLocalOnboarding(payload);

    if (status === 'authenticated') {
      setIsSaving(true);

      try {
        await fetch('/api/profile', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: profileSnapshot?.name || session?.user?.name || '',
            presentRole:
              form.userType === 'professional'
                ? form.profession
                : profileSnapshot?.presentRole || session?.user?.presentRole || 'Student',
            profileDetails: {
              ...(profileSnapshot?.profileDetails || {}),
              userType: form.userType,
              company: form.company,
              yearsExperience: form.yearsExperience,
              branch: form.branch,
              collegeName: form.collegeName,
              discoverySource: form.discoverySource,
              onboardingCompleted: true,
            },
          }),
        });

        await update();
      } finally {
        setIsSaving(false);
      }
    }

    setIsOpen(false);
  }

  function handleNext() {
    if (!canContinue()) return;

    if (stepIndex === steps.length - 1) {
      handleComplete();
      return;
    }

    setStepIndex((current) => current + 1);
  }

  function handleBack() {
    if (stepIndex === 0) return;
    setStepIndex((current) => current - 1);
  }

  if (!isReady || !isOpen) return null;

  const currentStep = steps[stepIndex];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15, 23, 42, 0.34)',
        display: 'grid',
        placeItems: 'center',
        zIndex: 100,
        padding: '24px',
      }}
    >
      <div
        style={{
          width: 'min(520px, 100%)',
          background: 'var(--surface-color)',
          border: '1px solid var(--border-color)',
          borderRadius: '24px',
          boxShadow: '0 24px 80px rgba(15, 23, 42, 0.18)',
          padding: '28px',
          display: 'grid',
          gap: '18px',
        }}
      >
        <div className="section-kicker" style={{ width: 'fit-content' }}>
          Quick Intro
        </div>

        <div>
          <h2 className="page-title" style={{ margin: '0 0 0.5rem 0', fontSize: '1.8rem' }}>
            {currentStep.title}
          </h2>
          <p className="page-subtitle" style={{ margin: 0, lineHeight: 1.6 }}>
            {currentStep.description}
          </p>
        </div>

        {currentStep.type === 'choice' ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {currentStep.options.map((option) => {
              const isActive = form[currentStep.key] === option.value;

              return (
                <button
                  key={option.value}
                  onClick={() => updateField(currentStep.key, option.value)}
                  style={{
                    padding: '16px',
                    borderRadius: '16px',
                    border: `1px solid ${isActive ? 'var(--brand)' : 'var(--border-color)'}`,
                    background: isActive ? 'rgba(37, 99, 235, 0.08)' : 'var(--surface-strong)',
                    color: 'var(--text-color)',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        ) : (
          <input
            autoFocus
            type="text"
            value={form[currentStep.key] || ''}
            onChange={(event) => updateField(currentStep.key, event.target.value)}
            placeholder={currentStep.placeholder}
            style={{
              width: '100%',
              padding: '16px 18px',
              borderRadius: '14px',
              border: '1px solid var(--border-color)',
              background: '#ffffff',
              color: 'var(--text-color)',
              fontSize: '1rem',
              outline: 'none',
            }}
          />
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
          <span className="page-subtitle" style={{ fontSize: '0.9rem' }}>
            Step {stepIndex + 1} of {steps.length}
          </span>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={handleBack}
              disabled={stepIndex === 0}
              style={{
                padding: '12px 16px',
                borderRadius: '999px',
                border: '1px solid var(--border-color)',
                background: '#ffffff',
                color: 'var(--text-secondary)',
                fontWeight: 600,
                cursor: stepIndex === 0 ? 'not-allowed' : 'pointer',
                opacity: stepIndex === 0 ? 0.5 : 1,
              }}
            >
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={!canContinue() || isSaving}
              style={{
                padding: '12px 18px',
                borderRadius: '999px',
                border: 'none',
                background: 'var(--brand)',
                color: '#ffffff',
                fontWeight: 700,
                cursor: !canContinue() || isSaving ? 'not-allowed' : 'pointer',
                opacity: !canContinue() || isSaving ? 0.65 : 1,
              }}
            >
              {isSaving ? 'Saving...' : stepIndex === steps.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
