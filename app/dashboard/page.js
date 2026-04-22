'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getActivePlan, clearActivePlan } from '@/src/utils/storage';
import { ActiveDashboard } from '@/components/ActiveDashboard';
import { TechGenSpinner } from '@/components/TechGenSpinner';
import Link from 'next/link';

export default function DashboardPage() {
  const [plan, setPlan] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const savedPlan = getActivePlan();
    setPlan(savedPlan);
    setIsLoaded(true);
  }, []);

  function handleClear() {
    clearActivePlan();
    router.push('/');
  }

  // Removed the early global isLoaded block to enable immediate SSR of the page shell.

  return (
    <main className="page-shell">
      {!isLoaded ? (
        <div style={{ display: 'grid', placeItems: 'center', minHeight: '60vh' }}>
          <TechGenSpinner text="Loading Dashboard..." />
        </div>
      ) : !plan ? (
        <section className="detail-hero" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
          <h1>No Active Plan Found</h1>
          <p className="hero-text" style={{ maxWidth: '600px', margin: '1rem auto 2rem' }}>
            You haven't generated a personalized track yet. Please select a role, provide your availability, and generate an AI-powered plan first.
          </p>
          <Link href="/" className="role-link" style={{ display: 'inline-block' }}>
            Explore Roles & Generate Plan
          </Link>
        </section>
      ) : (
        <ActiveDashboard plan={plan} onClear={handleClear} />
      )}
    </main>
  );
}
