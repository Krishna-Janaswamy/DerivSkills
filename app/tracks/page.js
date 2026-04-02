'use client';

import { useState } from 'react';
import { roles } from '@/src/data/roles';
import Link from 'next/link';

export default function RoadmapCatalogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Web & App', 'Data & AI', 'Infra & Security', 'Product & Design'];

  const getCategory = (role) => {
    const text = (role.title + ' ' + role.summary).toLowerCase();
    
    if (text.includes('ai') || text.includes('data') || text.includes('machine learning') || text.includes('bi analyst')) return 'Data & AI';
    if (text.includes('front') || text.includes('back') || text.includes('stack') || text.includes('ios') || text.includes('android') || text.includes('game')) return 'Web & App';
    if (text.includes('devops') || text.includes('devsecops') || text.includes('security') || text.includes('qa') || text.includes('blockchain') || text.includes('postgresql')) return 'Infra & Security';
    
    return 'Product & Design';
  };

  const filteredRoles = roles.filter(role => {
    const matchesSearch = role.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          role.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || getCategory(role) === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="page-shell" style={{ maxWidth: '1400px', width: '100%', margin: '0 auto', padding: '0 0 4rem' }}>
      
      {/* Sticky Premium Dashboard Header */}
      <div style={{
        position: 'sticky', top: '18px', zIndex: 40,
        background: 'var(--surface-color)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        padding: '1.5rem 2rem',
        marginBottom: '2rem',
        boxShadow: 'var(--shadow-soft)',
        display: 'flex', flexDirection: 'column', gap: '1.5rem'
      }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <h1 className="page-title" style={{ margin: '0 0 0.4rem 0', fontSize: '2.5rem', letterSpacing: '-0.03em' }}>
              Career Architecture
            </h1>
            <p className="page-subtitle" style={{ margin: 0, fontSize: '1.05rem', fontWeight: 500 }}>
              Select a specialized track to begin your role-based progression.
            </p>
          </div>
          
          {/* Custom Search Input */}
          <div style={{ position: 'relative', minWidth: '340px', flex: '1 1 auto', maxWidth: '450px' }}>
            <span style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5, fontSize: '1.2rem' }}>🔍</span>
            <input 
              type="text" 
              placeholder="Search 26 industry roles..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                background: 'var(--bg-soft)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-color)',
                padding: '16px 16px 16px 52px',
                borderRadius: '8px',
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.3s ease',
              }}
              onFocus={(e) => { 
                e.target.style.borderColor = 'var(--brand)'; 
                e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)'; 
                e.target.style.background = 'var(--surface-color)';
              }}
              onBlur={(e) => { 
                e.target.style.borderColor = 'var(--border-color)'; 
                e.target.style.boxShadow = 'none'; 
                e.target.style.background = 'var(--bg-soft)';
              }}
            />
          </div>
        </div>

        {/* Dynamic Category Pills */}
        <div style={{ display: 'flex', gap: '0.8rem', overflowX: 'auto', paddingBottom: '0.4rem' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '10px 20px',
                borderRadius: '6px',
                border: `1px solid ${activeCategory === cat ? 'var(--brand)' : 'var(--border-color)'}`,
                background: activeCategory === cat ? 'var(--brand)' : 'var(--bg-soft)',
                color: activeCategory === cat ? '#fff' : 'var(--text-secondary)',
                fontSize: '0.95rem',
                fontWeight: activeCategory === cat ? 600 : 500,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => { if (activeCategory !== cat) e.target.style.background = 'var(--border-color)' }}
              onMouseLeave={(e) => { if (activeCategory !== cat) e.target.style.background = 'var(--bg-soft)' }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Roles */}
      {filteredRoles.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem', padding: '0 0.5rem' }}>
          {filteredRoles.map(role => (
            <Link 
              key={role.id} 
              href={`/tracks/${role.id}`}
              style={{ 
                display: 'flex', flexDirection: 'column', padding: '1.5rem', 
                background: 'var(--surface-color)', borderRadius: '8px', 
                border: '1px solid var(--border-color)', textDecoration: 'none',
                transition: 'all 0.2s ease', 
                position: 'relative', overflow: 'hidden',
                boxShadow: 'var(--shadow-soft)'
              }}
              onMouseEnter={e => { 
                e.currentTarget.style.transform = 'translateY(-2px)'; 
                e.currentTarget.style.borderColor = 'var(--brand)';
                e.currentTarget.style.boxShadow = 'var(--shadow)';
                e.currentTarget.querySelector('.arrow-fx').style.transform = 'translateX(6px)';
              }}
              onMouseLeave={e => { 
                e.currentTarget.style.transform = 'translateY(0) scale(1)'; 
                e.currentTarget.style.borderColor = 'var(--border-color)';
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
                <span style={{ fontSize: '0.75rem', background: 'var(--bg-soft)', color: 'var(--text-secondary)', padding: '5px 12px', borderRadius: '4px', fontWeight: 600, textTransform: 'uppercase', border: '1px solid var(--border-color)' }}>
                  {role.goalWindow}
                </span>
                <span style={{ fontSize: '0.75rem', background: 'var(--bg-soft)', color: 'var(--text-secondary)', padding: '5px 12px', borderRadius: '4px', fontWeight: 600, border: '1px solid var(--border-color)' }}>
                  {role.roadmap.length} Modules
                </span>
              </div>

              <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: '0 0 2rem 0', flex: 1, position: 'relative', zIndex: 1 }}>
                {role.summary || 'A comprehensive, step-by-step roadmap to master this role.'}
              </p>
              
              <div style={{ fontSize: '0.90rem', color: 'var(--text-color)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.2rem', position: 'relative', zIndex: 1 }}>
                Explore Strategy 
                <span className="arrow-fx" style={{ transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)', display: 'inline-block' }}>→</span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '8rem 2rem', background: 'var(--surface-color)', borderRadius: '24px', border: '1px dashed var(--border-color)', marginTop: '2rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1.5rem', opacity: 0.4 }}>📭</div>
          <h3 style={{ fontSize: '1.8rem', margin: '0 0 0.8rem 0' }}>No paths found</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Try adjusting your search query or category filters.</p>
        </div>
      )}
    </main>
  );
}
