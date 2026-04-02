'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { WelcomeProfileModal } from './WelcomeProfileModal';

export function AppShell({ children }) {
  const pathname = usePathname();
  const { data: session } = useSession();

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


        <Link
          href={`/profile`}
          style={{ 
            display: 'flex', alignItems: 'center', gap: '10px',
            padding: '8px 16px', borderRadius: '18px',
            background: session ? 'rgba(79, 70, 229, 0.15)' : 'var(--surface-muted)',
            border: `1px solid ${session ? 'rgba(79, 70, 229, 0.3)' : 'var(--border)'}`,
            boxShadow: session ? '0 4px 12px rgba(79, 70, 229, 0.15)' : 'none',
            textDecoration: 'none', transition: 'all 0.2s',
            height: '100%'
          }}
        >
          {session ? (
            <>
              <img 
                src={session.user.image || 'https://www.svgrepo.com/show/509001/avatar-thinking-2.svg'} 
                alt="Avatar" 
                style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--brand)' }} 
              />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-color)', fontWeight: 600, lineHeight: 1.1 }}>Profile</span>
                <small style={{ fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.75rem' }}>{session.user.name}</small>
              </div>
            </>
          ) : (
            <>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', display: 'grid', placeItems: 'center', color: '#fff', fontSize: '0.9rem' }}>
                👤
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-color)', fontWeight: 600, lineHeight: 1.1 }}>Sign In</span>
                <small style={{ fontWeight: 400, color: 'var(--text-secondary)', fontSize: '0.75rem' }}>Sync progress</small>
              </div>
            </>
          )}
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
            </div>
          </div>

        </aside>

        <div className="app-main">{children}</div>
      </div>
    </div>
  );
}
