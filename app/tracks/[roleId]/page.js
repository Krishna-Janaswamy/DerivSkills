import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getRoleById, getRoleIds, getTotalWeeks, roles } from '@/src/data/roles';
import { RoleFlowManager } from '@/components/RoleFlowManager';

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

  const totalWeeks = getTotalWeeks(role.roadmap);

  return (
    <main className="page-shell" style={{ maxWidth: '900px', margin: '0 auto', paddingTop: '2rem' }}>
      <div style={{ paddingBottom: '3rem', borderBottom: '1px solid var(--border-color)', marginBottom: '3rem', textAlign: 'center' }}>
        <span className="section-kicker" style={{ marginBottom: '1.5rem' }}>
          Role Progression Map
        </span>
        <h1 className="page-title" style={{ fontSize: '3rem', marginBottom: '1.5rem', letterSpacing: '-0.03em' }}>{role.title}</h1>
        <p className="page-subtitle" style={{ fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
          {role.summary}
        </p>
      </div>

      <RoleFlowManager role={role} />
    </main>
  );
}
