'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { TechGenSpinner } from '@/components/TechGenSpinner';
import { useCloudSync } from '@/components/Providers';
import { getRoleById } from '@/src/data/roles';

export default function PortfolioPage() {
  const { learningData, triggerSync, isLoaded, status } = useCloudSync();
  const [resumeUrl, setResumeUrl] = useState('');
  const [isHovered, setIsHovered] = useState(null);

  // Extract 'done' subtopics efficiently
  const verifiedSkills = useMemo(() => {
    if (!learningData || !learningData.subtopicProgress) return [];
    
    const skillsList = [];
    
    // Loop through all plans
    Object.keys(learningData.subtopicProgress).forEach((roleId) => {
      const roleProgress = learningData.subtopicProgress[roleId];
      const role = getRoleById(roleId);
      
      // Loop through all topics in that plan
      Object.keys(roleProgress).forEach((topicKey) => {
        if (roleProgress[topicKey] === 'done') {
          // topicKey is usually "Phase Name_Topic Name"
          const parts = topicKey.split('_');
          const topicName = parts.length > 1 ? parts[1] : parts[0];
          
          skillsList.push({
            name: topicName,
            roleTitle: role ? role.title : 'General'
          });
        }
      });
    });
    
    // Deduplicate just in case
    const uniqueSkills = [];
    const seen = new Set();
    skillsList.forEach(s => {
      if (!seen.has(s.name)) {
        seen.add(s.name);
        uniqueSkills.push(s);
      }
    });
    
    return uniqueSkills;
  }, [learningData]);

  if (!isLoaded || status === 'loading') {
    return (
      <main className="page-shell" style={{ display: 'grid', placeItems: 'center', height: '60vh' }}>
        <TechGenSpinner text="Analyzing Cloud Profiles..." />
      </main>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <main className="page-shell" style={{ maxWidth: '800px', margin: '4rem auto', paddingBottom: '4rem' }}>
        <div style={{ padding: '4rem 2rem', textAlign: 'center', background: 'var(--surface-color)', borderRadius: '24px', border: '1px solid var(--border-color)', boxShadow: '0 25px 50px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1.5rem', opacity: 0.8 }}>🎨</div>
          <h2 className="page-title" style={{ marginBottom: '1rem', fontSize: '2.5rem' }}>Portfolio sync is paused</h2>
          <p className="page-subtitle" style={{ marginBottom: '2rem', lineHeight: 1.6, fontSize: '1.1rem' }}>
            Login is temporarily disabled while domain security and authentication setup are being finalized. Portfolio sync will return once sign-in is restored.
          </p>
        </div>
      </main>
    );
  }

  const handleResumeSave = (e) => {
    e.preventDefault();
    if (!resumeUrl) return;
    
    // Merge resume URL directly into learningData custom properties
    triggerSync({
      ...learningData,
      portfolioMeta: {
        ...(learningData.portfolioMeta || {}),
        resumeLink: resumeUrl
      }
    });

    alert("Resume saved to Cloud Profile!");
  };

  const savedResume = learningData?.portfolioMeta?.resumeLink;

  const templates = [
    {
      id: 'minimal_white',
      name: 'The Agency Grid',
      description: 'Stark white canvas, sharp typography, and asymmetrical grids. Built for design-focused developers.',
      image: '/portfolio/portfolio_minimal_white_1775154485091.png'
    },
    {
      id: 'enterprise_slate',
      name: 'The Enterprise Engineer',
      description: 'Classic corporate layout combining slate navy tones and exact structuring for back-end reliability.',
      image: '/portfolio/portfolio_enterprise_slate_1775154504728.png'
    },
    {
      id: 'clean_docs',
      name: 'The Technical Writer',
      description: 'Heavily inspired by Stripe Docs. Sidebar navigation and focus purely on legibility and API specifications.',
      image: '/portfolio/portfolio_clean_docs_1775154523247.png'
    },
    {
      id: 'academic_grid',
      name: 'The Classical Print',
      description: 'Sophisticated column grids using elegant serif typography. Strict black and white aesthetic for research academics.',
      image: '/portfolio/portfolio_academic_grid_1775154542185.png'
    }
  ];

  return (
    <main className="page-shell" style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '5rem' }}>
      <header style={{ marginBottom: '3rem' }}>
        <span className="section-kicker" style={{ marginBottom: '1rem' }}>
          Career Showcase
        </span>
        <h1 className="page-title" style={{ fontSize: '3rem', margin: '0 0 1rem 0', letterSpacing: '-0.03em' }}>My Portfolio Toolkit</h1>
        <p className="page-subtitle" style={{ fontSize: '1.1rem', maxWidth: '800px', lineHeight: 1.6, margin: 0 }}>
          Transition horizontally from learning entirely into application. Here you can attach your existing resume, export verified skills pulled directly from your tracking history, and plan your customized portfolio website.
        </p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
        
        {/* Résumé Gateway */}
        <section style={{ background: 'var(--surface-color)', padding: '2.5rem', borderRadius: '24px', border: '1px solid var(--border-color)', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '2rem' }}>📄</span>
            <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Resume Gateway</h2>
          </div>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.6 }}>
            Consolidate your active resume link (Google Drive, Notion, PDF link) here. As your system tracks skills automatically, you can cross-reference them to ensure your resume stays updated.
          </p>

          {savedResume ? (
            <div style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '1.5rem', borderRadius: '12px' }}>
               <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                 <div>
                    <span style={{ display: 'block', color: '#10b981', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.3rem' }}>Active Resume Hook</span>
                    <a href={savedResume} target="_blank" rel="noreferrer" style={{ color: 'var(--text-color)', fontWeight: 600, wordBreak: 'break-all' }}>{savedResume}</a>
                 </div>
                 <button 
                   onClick={() => triggerSync({ ...learningData, portfolioMeta: { ...learningData.portfolioMeta, resumeLink: '' }})}
                   style={{ background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem' }}
                 >
                   Edit
                 </button>
               </div>
            </div>
          ) : (
            <form onSubmit={handleResumeSave} style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
              <input
                type="url"
                required
                placeholder="https://docs.google.com/document/d/..."
                value={resumeUrl}
                onChange={(e) => setResumeUrl(e.target.value)}
                style={{
                  width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)',
                  color: 'white', padding: '16px', borderRadius: '12px', fontSize: '1rem', outline: 'none'
                }}
              />
              <button 
                 type="submit"
                 style={{ 
                   background: 'var(--brand)', color: 'white', border: 'none', padding: '16px', borderRadius: '12px', 
                   fontSize: '1.05rem', fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s' 
                 }}
              >
                Attach Resume
              </button>
            </form>
          )}
        </section>

        {/* Dynamic Verified Skills Matrix */}
        <section style={{ background: 'var(--surface-color)', padding: '2.5rem', borderRadius: '24px', border: '1px solid var(--border-color)', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '2rem' }}>⚡️</span>
              <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Verified Skills</h2>
            </div>
            <span style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '4px 10px', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 700 }}>
              {verifiedSkills.length} Verified
            </span>
          </div>
          
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.6 }}>
            Every time you complete a subtopic inside <strong>My Learnings</strong>, it is permanently harvested here. Use these keywords aggressively inside your portfolio and LinkedIn.
          </p>

          {verifiedSkills.length > 0 ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
              {verifiedSkills.map((skill, i) => (
                <div key={i} style={{ 
                  background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', 
                  padding: '10px 16px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '4px'
                }}>
                  <span style={{ color: 'var(--text-color)', fontWeight: 600, fontSize: '0.95rem' }}>{skill.name}</span>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{skill.roleTitle}</span>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', border: '1px dashed var(--border-color)' }}>
              <span style={{ fontSize: '2rem', opacity: 0.5 }}>🌱</span>
              <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>Your skill matrix is empty. Start a track and click "Mark as done" to populate this vault.</p>
            </div>
          )}
        </section>
      </div>

      <div style={{ padding: '0 1rem' }}>
        <h2 style={{ fontSize: '2rem', margin: '0 0 0.5rem 0' }}>Portfolio Architect Mockups</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', margin: '0 0 2rem 0', maxWidth: '600px' }}>
          When constructing your personal website, pick a design schema that heavily aligns with your industry role.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
           {templates.map((template) => (
             <article 
               key={template.id}
               onMouseEnter={() => setIsHovered(template.id)}
               onMouseLeave={() => setIsHovered(null)}
               style={{ 
                 background: 'var(--surface-color)', 
                 borderRadius: '24px', 
                 overflow: 'hidden',
                 border: `1px solid ${isHovered === template.id ? 'var(--brand)' : 'var(--border-color)'}`,
                 transition: 'all 0.3s ease',
                 boxShadow: isHovered === template.id ? '0 20px 40px rgba(0,0,0,0.3), 0 0 20px rgba(79, 70, 229, 0.2)' : '0 10px 30px rgba(0,0,0,0.1)',
                 transform: isHovered === template.id ? 'translateY(-8px)' : 'none'
               }}
             >
               <div style={{ 
                 height: '240px', 
                 width: '100%', 
                 backgroundImage: `url('${template.image}')`,
                 backgroundSize: 'cover',
                 backgroundPosition: 'top',
                 borderBottom: '1px solid var(--border-color)'
               }} />
               <div style={{ padding: '2rem' }}>
                 <h3 style={{ fontSize: '1.4rem', margin: '0 0 0.8rem 0', color: 'var(--text-color)' }}>{template.name}</h3>
                 <p style={{ color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6, fontSize: '0.95rem' }}>
                   {template.description}
                 </p>
               </div>
               <div style={{ padding: '0 2rem 2rem 2rem' }}>
                  <button style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--border-color)', borderRadius: '12px', fontWeight: 600, cursor: 'not-allowed', color: 'var(--text-secondary)' }}>
                    Export Coming Soon
                  </button>
               </div>
             </article>
           ))}
        </div>
      </div>
    </main>
  );
}
