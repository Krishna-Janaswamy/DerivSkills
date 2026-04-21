'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import { fetchProfileAndCache } from '@/src/utils/profile-cache';

// ── Feature flags ─────────────────────────────────────────────────────────────
const RESUME_ENABLED = process.env.NEXT_PUBLIC_RESUME_ENABLED === 'true';

// ── Nav structure (no My Portfolio) ──────────────────────────────────────────
const NAV_ALL = [
  {
    label: 'Learn',
    href: '/tracks',
    sub: [
      { label: 'Tracks Catalog',  href: '/tracks',      desc: 'Explore role-based learning paths' },
      { label: 'My Learnings',    href: '/my-learning',  desc: 'Active tracker & dashboard' },
      { label: 'Plan Creator',    href: '/ai-planner',   desc: 'Generate your custom plan' },
    ],
  },
  {
    label: 'Practice',
    href: '/mock-interview',
    sub: [
      { label: 'Mock Interview',  href: '/mock-interview', desc: 'AI-powered interview practice' },
    ],
  },
  ...(RESUME_ENABLED ? [{
    label: 'Resume',
    href: '/resume',
    sub: [
      { label: 'AI Resume Studio', href: '/resume',        desc: 'Analyze · Edit · Score · Download' },
      { label: 'Resume Vault',     href: '/profile',       desc: 'Saved role-based resumes' },
    ],
  }] : []),
];
const NAV = NAV_ALL;


export function AppShell({ children }) {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const isAuthenticated  = Boolean(session?.user?.id);
  const isLoadingSession = status === 'loading';

  const [profileOpen, setProfileOpen] = useState(false);
  const [openNav, setOpenNav] = useState(null); // label of currently open dropdown
  const profileRef = useRef(null);
  const navRef     = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function onClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
      if (navRef.current     && !navRef.current.contains(e.target))     setOpenNav(null);
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  // Prefetch profile on profile dropdown open
  useEffect(() => {
    if (!profileOpen || !session?.user?.id) return;
    fetchProfileAndCache(session.user.id).catch(() => {});
  }, [profileOpen, session?.user?.id]);

  const isActive = (item) => {
    if (item.href === pathname) return true;
    return item.sub?.some(s => pathname === s.href || pathname.startsWith(s.href + '/'));
  };

  return (
    <div className="app-frame">
      <header className="app-header">
        {/* Brand */}
        <Link className="brand-mark brand-link" href="/">
          <div className="brand-logo-shell">
            <img className="brand-logo-image brand-logo-image-shell" src="/techgen-logo.png" alt="TechGen Logo" />
          </div>
          <div className="brand-copy">
            <strong className="brand-title">DerivSkills</strong>
            <small className="brand-subtitle">BY TECHGEN</small>
          </div>
        </Link>

        {/* ── Center Nav ─────────────────────────────────────────────────── */}
        <nav className="header-center-nav" ref={navRef}>
          {NAV.map((item) => {
            const active = isActive(item);
            const isOpen = openNav === item.label;
            return (
              <div key={item.label} className="nav-item-wrap">
                <button
                  className={`nav-pill ${active ? 'nav-pill-active' : ''}`}
                  onClick={() => setOpenNav(isOpen ? null : item.label)}
                  aria-expanded={isOpen}
                >
                  {item.label}
                  {item.sub?.length > 1 && <span className="nav-caret">{isOpen ? '▴' : '▾'}</span>}
                </button>

                {/* Dropdown */}
                {isOpen && item.sub?.length > 0 && (
                  <div className="nav-dropdown">
                    {item.sub.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        className={`nav-dropdown-item ${pathname === s.href || pathname.startsWith(s.href + '/') ? 'nav-dropdown-item-active' : ''}`}
                        onClick={() => setOpenNav(null)}
                      >
                        <span className="nav-dropdown-label">{s.label}</span>
                        <span className="nav-dropdown-desc">{s.desc}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* ── Profile ────────────────────────────────────────────────────── */}
        <div className="header-right">
          <div className="profile-dropdown" ref={profileRef}>
            <button
              className="profile-button"
              onClick={() => setProfileOpen((p) => !p)}
              aria-expanded={profileOpen}
            >
              {isLoadingSession ? (
                'Loading...'
              ) : (
                <>
                  <img
                    className="profile-button-avatar"
                    src={session?.user?.image || '/techgen-logo.png'}
                    alt="Avatar"
                  />
                  <span>{session?.user?.name || 'Profile'}</span>
                  <span className="profile-button-caret">▾</span>
                </>
              )}
            </button>
            {profileOpen && (
              <div className="profile-dropdown-menu">
                {isAuthenticated ? (
                  <>
                    <Link href="/profile" className="profile-dropdown-item" onClick={() => setProfileOpen(false)}>
                      Edit profile
                    </Link>
                    <button
                      className="profile-dropdown-item"
                      onClick={() => { setProfileOpen(false); signOut({ callbackUrl: '/' }); }}
                    >
                      Sign out
                    </button>
                  </>
                ) : (
                  <button
                    className="profile-dropdown-item"
                    onClick={() => { setProfileOpen(false); signIn(undefined, { callbackUrl: '/profile' }); }}
                  >
                    Sign in
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* No sidebar — full width body */}
      <div className="app-body no-sidebar">
        <div className="app-main">{children}</div>
      </div>
    </div>
  );
}
