import { DM_Sans, Fraunces } from 'next/font/google';
import './globals.css';
import { AppShell } from '@/components/AppShell';
import Providers from '@/components/Providers';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-serif',
});

export const metadata = {
  title: 'DerivSkills',
  description:
    'Explore role-specific AI career roadmaps with modules, timelines, and job-readiness estimates.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${fraunces.variable}`}>
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
