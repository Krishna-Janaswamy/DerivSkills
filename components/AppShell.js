'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { WelcomeProfileModal } from './WelcomeProfileModal';

export function AppShell({ children }) {
  const pathname = usePathname();

  return (
    <div className="app-frame">
      <WelcomeProfileModal />
      <header className="app-header">
        <Link className="brand-mark brand-link" href="/">
          <div className="brand-logo-shell">
            <img 
              className="brand-logo-image brand-logo-image-shell"
              src="/techgen-logo.png" 
              alt="techGen Logo" 
            />
          </div>
          <div className="brand-copy">
            <strong className="brand-title">DerivSkills</strong>
            <small className="brand-subtitle">BY TECHGEN</small>
          </div>
        </Link>
      </header>

      <div className="app-body">
        <aside className="app-sidebar">
          <div className="sidebar-section">
            <p className="sidebar-label" style={{ marginBottom: '1.2rem' }}>Navigation</p>
            <div className="sidebar-role-list">
              <Link
                href={`/ai-planner`}
                className={`sidebar-role ${pathname === '/ai-planner' ? 'is-current' : ''}`}
                style={{ padding: '16px', fontSize: '1.05rem', fontWeight: 600 }}
              >
                <span>Plan Creator</span>
                <small style={{ marginTop: '4px', fontWeight: 400 }}>Generate your custom plan</small>
              </Link>
              
              <Link
                href={`/tracks`}
                className={`sidebar-role ${pathname.startsWith('/tracks') ? 'is-current' : ''}`}
                style={{ padding: '16px', fontSize: '1.05rem', fontWeight: 600 }}
              >
                <span>Tracks Catalog</span>
                <small style={{ marginTop: '4px', fontWeight: 400 }}>Explore the role structure</small>
              </Link>

              <Link
                href={`/my-learning`}
                className={`sidebar-role ${pathname === '/my-learning' ? 'is-current' : ''}`}
                style={{ padding: '16px', fontSize: '1.05rem', fontWeight: 600 }}
              >
                <span>My Learnings</span>
                <small style={{ marginTop: '4px', fontWeight: 400 }}>Active tracker & dashboard</small>
              </Link>

              <Link
                href={`/portfolio`}
                className={`sidebar-role ${pathname === '/portfolio' ? 'is-current' : ''}`}
                style={{ padding: '16px', fontSize: '1.05rem', fontWeight: 600 }}
              >
                <span>My Portfolio</span>
                <small style={{ marginTop: '4px', fontWeight: 400 }}>Showcase verified skills</small>
              </Link>

              <Link
                href={`/mock-interview`}
                className={`sidebar-role ${pathname === '/mock-interview' ? 'is-current' : ''}`}
                style={{ padding: '16px', fontSize: '1.05rem', fontWeight: 600 }}
              >
                <span>Mock Interview</span>
                <small style={{ marginTop: '4px', fontWeight: 400 }}>Practice with expert-led interview setup</small>
              </Link>
            </div>
          </div>

        </aside>

        <div className="app-main">{children}</div>
      </div>
    </div>
  );
}
