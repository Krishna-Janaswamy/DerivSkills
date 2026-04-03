import { TechGenSpinner } from '@/components/TechGenSpinner';

export default function Loading() {
  return (
    <main className="page-shell" style={{ display: 'grid', placeItems: 'center', minHeight: '60vh' }}>
      <TechGenSpinner text="Loading..." />
    </main>
  );
}
