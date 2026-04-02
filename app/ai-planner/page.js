import { AIPlannerPanel } from '@/components/AIPlannerPanel';

export const metadata = {
  title: 'AI Plan Creator | AI Career Roadmaps',
  description: 'Generate a personalized, intelligent tracking plan for your AI career goals.',
};

export default function AIPlannerPage() {
  return (
    <main className="page-shell">
      <AIPlannerPanel />
    </main>
  );
}
