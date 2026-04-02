'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getActivePlan } from '@/src/utils/storage';

export function DashboardBanner() {
  const [hasPlan, setHasPlan] = useState(false);

  useEffect(() => {
    setHasPlan(!!getActivePlan());
  }, []);

  if (!hasPlan) return null;

  return (
    <div style={{ 
      background: 'var(--brand)', 
      color: 'white', 
      padding: '1rem', 
      textAlign: 'center', 
      borderRadius: '8px', 
      marginBottom: '2rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <span style={{ fontSize: '1.1rem' }}>🚀 <strong>You have an active self-paced roadmap plan!</strong></span>
      <Link href="/dashboard" style={{ 
        color: 'var(--brand)', 
        background: 'white',
        textDecoration: 'none', 
        padding: '0.5rem 1rem',
        borderRadius: '6px',
        fontWeight: 600,
        marginTop: '0.5rem'
      }}>
        Resume Learning Dashboard
      </Link>
    </div>
  );
}
