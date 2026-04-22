'use client';

import { useState } from 'react';
import { roles } from '@/src/data/roles';
import Link from 'next/link';

export default function RoadmapCatalogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeType, setActiveType] = useState('role'); // 'role' or 'skill'

  const filteredRoles = roles.filter(role => {
    const matchesSearch = role.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = role.type === activeType;
    return matchesSearch && matchesType;
  });

  return (
    <main className="page-shell" style={{ maxWidth: '1400px', width: '100%', margin: '0 auto', padding: '0 0 4rem' }}>

      {/* Short Contextual Header */}
      <div style={{ padding: '2rem 1rem 1.5rem 1rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', background: 'rgba(91,140,255,0.1)', border: '1px solid rgba(91,140,255,0.2)', borderRadius: '999px', fontSize: '0.7rem', fontWeight: 800, color: 'var(--brand)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--brand)', boxShadow: '0 0 8px var(--brand)' }}></span>
          Skill Matrix Active
        </div>
        <h1 className="page-title" style={{ margin: '0 0 0.5rem 0', fontSize: '2.6rem', letterSpacing: '-0.03em', fontWeight: 900, background: 'linear-gradient(135deg, #ffffff 0%, #a5b4fc 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Career Architecture
        </h1>
        <p style={{ margin: 0, fontSize: '1.15rem', color: 'var(--text-secondary)', maxWidth: '600px', lineHeight: 1.5 }}>
          Select a specialized engineering track or master the exact core skills demanded by top-tier tech companies.
        </p>
      </div>

      {/* Sleek Command Bar Header */}
      <div style={{
        position: 'sticky', top: '24px', zIndex: 40,
        background: 'rgba(10, 12, 18, 0.8)',
        backdropFilter: 'blur(32px)',
        WebkitBackdropFilter: 'blur(32px)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: '20px',
        padding: '1rem',
        marginBottom: '3rem',
        boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255,255,255,0.08) inset',
        display: 'flex', alignItems: 'center', gap: '1.5rem',
        flexWrap: 'wrap'
      }}>

        {/* Master Toggle: Role vs Skill */}
        <div style={{ flex: '1 1 300px', display: 'flex', background: 'rgba(0,0,0,0.4)', padding: '6px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)' }}>
          <button
            onClick={() => setActiveType('skill')}
            style={{
              flex: 1, padding: '12px 16px', fontSize: '0.95rem', fontWeight: 700,
              background: activeType === 'skill' ? 'rgba(91,140,255,0.15)' : 'transparent',
              color: activeType === 'skill' ? 'var(--brand)' : 'rgba(255,255,255,0.4)',
              borderRadius: '12px', border: 'none', cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: activeType === 'skill' ? '0 4px 12px rgba(91,140,255,0.1), inset 0 1px 1px rgba(91,140,255,0.2)' : 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
            }}
          >
            ⚡ Core Skills
          </button>
          <button
            onClick={() => setActiveType('role')}
            style={{
              flex: 1, padding: '12px 16px', fontSize: '0.95rem', fontWeight: 700,
              background: activeType === 'role' ? 'rgba(255,255,255,0.12)' : 'transparent',
              color: activeType === 'role' ? '#fff' : 'rgba(255,255,255,0.4)',
              borderRadius: '12px', border: 'none', cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: activeType === 'role' ? '0 4px 12px rgba(0,0,0,0.2), inset 0 1px 1px rgba(255,255,255,0.1)' : 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
            }}
          >
            💼 Industry Roles
          </button>
        </div>

        {/* Custom Search Input */}
        <div style={{ flex: '2 1 400px', position: 'relative' }}>
          <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', opacity: 0.6, fontSize: '1.2rem' }}>🔍</span>
          <input
            type="text"
            placeholder={`Search ${roles.filter(r => r.type === activeType).length} ${activeType}s...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              color: '#fff',
              padding: '16px 20px 16px 50px',
              borderRadius: '16px',
              fontSize: '1rem',
              outline: 'none',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--brand)';
              e.target.style.background = 'rgba(0, 0, 0, 0.2)';
              e.target.style.boxShadow = '0 0 0 4px rgba(91,140,255,0.15), inset 0 2px 5px rgba(0,0,0,0.2)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.05)';
              e.target.style.background = 'rgba(255, 255, 255, 0.03)';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>
      </div>

      {/* Dynamic Grid */}
      {filteredRoles.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem', padding: '0 0.5rem' }}>
          {filteredRoles.map(role => {
            const isSkill = role.type === 'skill';
            return (
              <Link
                key={role.id}
                href={`/tracks/${role.id}`}
                style={{
                  display: 'flex', flexDirection: 'column', padding: '1.5rem',
                  background: isSkill ? 'rgba(91,140,255,0.02)' : 'var(--surface-color)',
                  borderRadius: '16px',
                  border: isSkill ? '1px solid rgba(91,140,255,0.12)' : '1px solid var(--border-color)',
                  textDecoration: 'none',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative', overflow: 'hidden',
                  boxShadow: 'var(--shadow-soft)'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = 'var(--brand)';
                  e.currentTarget.style.boxShadow = isSkill
                    ? '0 12px 24px rgba(91,140,255,0.15), 0 0 0 2px rgba(91,140,255,0.2)'
                    : '0 12px 24px rgba(0,0,0,0.15), 0 0 0 2px rgba(91,140,255,0.15)';
                  e.currentTarget.querySelector('.arrow-fx').style.transform = 'translateX(6px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.borderColor = isSkill ? 'rgba(91,140,255,0.12)' : 'var(--border-color)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-soft)';
                  e.currentTarget.querySelector('.arrow-fx').style.transform = 'translateX(0)';
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.2rem', gap: '0.5rem', position: 'relative', zIndex: 1 }}>
                  <h3 style={{ margin: 0, fontSize: '1.3rem', color: 'var(--text-color)', lineHeight: 1.3, fontWeight: 700 }}>
                    {role.title}
                  </h3>
                </div>

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '1.2rem', position: 'relative', zIndex: 1 }}>
                  <span style={{ fontSize: '0.75rem', background: isSkill ? 'rgba(91,140,255,0.1)' : 'rgba(255,255,255,0.03)', color: isSkill ? 'var(--brand)' : 'var(--text-secondary)', padding: '5px 12px', borderRadius: '6px', fontWeight: 700, textTransform: 'uppercase', border: isSkill ? '1px solid rgba(91,140,255,0.2)' : '1px solid rgba(255,255,255,0.08)' }}>
                    {role.goalWindow}
                  </span>
                  <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.03)', color: 'var(--text-secondary)', padding: '5px 12px', borderRadius: '6px', fontWeight: 600, border: '1px solid rgba(255,255,255,0.08)' }}>
                    {role.roadmap.length} Modules
                  </span>
                </div>

                <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: '0 0 2rem 0', flex: 1, position: 'relative', zIndex: 1 }}>
                  {role.summary || `A comprehensive, step-by-step roadmap to master this ${activeType}.`}
                </p>

                <div style={{ fontSize: '0.90rem', color: 'var(--brand)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', borderTop: isSkill ? '1px solid rgba(91,140,255,0.15)' : '1px solid var(--border-color)', paddingTop: '1.2rem', position: 'relative', zIndex: 1, transition: 'color 0.2s' }}>
                  Explore {isSkill ? 'Skill' : 'Track'}
                  <span className="arrow-fx" style={{ transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)', display: 'inline-block' }}>→</span>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '8rem 2rem', background: 'var(--surface-color)', borderRadius: '24px', border: '1px dashed var(--border-color)', marginTop: '2rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1.5rem', opacity: 0.4 }}>📭</div>
          <h3 style={{ fontSize: '1.8rem', margin: '0 0 0.8rem 0' }}>No {activeType}s found</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Try adjusting your search query or category filters.</p>
        </div>
      )}
    </main>
  );
}
