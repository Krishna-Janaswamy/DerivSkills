'use client';

import { redirect } from 'next/navigation';
import { ResumeBuilder } from '@/components/ResumeBuilder';
import { useParams } from 'next/navigation';

const RESUME_ENABLED = process.env.NEXT_PUBLIC_RESUME_ENABLED === 'true';

export default function ResumeBuilderPage() {
  if (!RESUME_ENABLED) redirect('/');
  const params = useParams();
  return <ResumeBuilder resumeId={params.id} />;
}

