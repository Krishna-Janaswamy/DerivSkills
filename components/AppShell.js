'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import { fetchProfileAndCache } from '@/src/utils/profile-cache';


export function AppShell({ children }) {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const isAuthenticated = Boolean(session?.user?.id);
  const isLoadingSession = status === 'loading';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isMenuOpen || !session?.user?.id) return;
    fetchProfileAndCache(session.user.id).catch((err) => {
      console.warn('Prefetch profile failed', err);
    });
  }, [isMenuOpen, session?.user?.id]);

  return (
    <div className="app-frame">
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

        <div className="header-right">
          <div className="profile-dropdown" ref={menuRef}>
            <button
              className="profile-button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-expanded={isMenuOpen}
            >
              {isLoadingSession ? (
                'Loading...'
              ) : (
                <>
                  <img
                    className="profile-button-avatar"
                    src={session?.user?.image || '/techgen-logo.png'}
                    alt="Profile avatar"
                  />
                  <span>{session?.user?.name || 'Profile'}</span>
                  <span className="profile-button-caret">▾</span>
                </>
              )}
            </button>
            {isMenuOpen && (
              <div className="profile-dropdown-menu">
                {isAuthenticated ? (
                  <>
                    <Link href="/profile" className="profile-dropdown-item">
                      Edit profile
                    </Link>
                    <button
                      className="profile-dropdown-item"
                      onClick={() => {
                        setIsMenuOpen(false);
                        signOut({ callbackUrl: '/' });
                      }}
                    >
                      Sign out
                    </button>
                  </>
                ) : (
                  <button
                    className="profile-dropdown-item"
                    onClick={() => {
                      setIsMenuOpen(false);
                      signIn(undefined, { callbackUrl: '/profile' });
                    }}
                  >
                    Sign in
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
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
