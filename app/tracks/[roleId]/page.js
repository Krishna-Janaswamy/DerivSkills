import { notFound } from 'next/navigation';
import { getRoleById, getRoleIds } from '@/src/data/roles';
import { ImmersiveCurriculum } from '@/components/ImmersiveCurriculum';

export function generateStaticParams() {
  return getRoleIds().map((roleId) => ({ roleId }));
}

export function generateMetadata({ params }) {
  const role = getRoleById(params.roleId);

  if (!role) {
    return {
      title: 'Track not found | DerivSkills',
    };
  }

  return {
    title: `${role.title} Track | DerivSkills`,
    description: `Role-specific learning track for ${role.title} with learning modules, durations, and total time estimate.`,
  };
}

export default function TrackPage({ params }) {
  const role = getRoleById(params.roleId);

  if (!role) {
    notFound();
  }

  return (
    <main style={{ width: '100vw', margin: '0', padding: 0 }}>
      <ImmersiveCurriculum role={role} />
    </main>
  );
}
