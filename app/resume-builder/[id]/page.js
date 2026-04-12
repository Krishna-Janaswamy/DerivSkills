'use client';

import { ResumeBuilder } from '@/components/ResumeBuilder';
import { useParams } from 'next/navigation';

export default function ResumeBuilderPage() {
  const params = useParams();
  return <ResumeBuilder resumeId={params.id} />;
}
