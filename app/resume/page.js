'use client';

import { redirect } from 'next/navigation';
import { ResumeAnalyzer } from '@/components/ResumeAnalyzer';

const RESUME_ENABLED = process.env.NEXT_PUBLIC_RESUME_ENABLED === 'true';

export default function ResumePage() {
  if (!RESUME_ENABLED) redirect('/');
  return (
    <main className="page-shell">
      <ResumeAnalyzer />
    </main>
  );
}
