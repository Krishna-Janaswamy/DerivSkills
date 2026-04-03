'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useCloudSync } from './Providers';
import { getSubtopicKey } from '@/src/utils/progress';

export function TopicDetailInline({ topic, context, roleTitle, roleId }) {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [detail, setDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { learningData, triggerSync, isLoaded } = useCloudSync();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Ambient Auto-Timer for Focus Tracking
  useEffect(() => {
    let interval = null;
    
    // Start tracking once AI text is rendered
    if (isOpen && isLoaded && roleId && learningData && detail) { 
      interval = setInterval(() => {
        const key = getSubtopicKey(context, topic);
        const currentTracker = learningData.subtopicTimeTracker?.[roleId] || {};
        const nextTracker = { ...currentTracker, [key]: (currentTracker[key] || 0) + 1 };
        
        triggerSync({
          ...learningData,
          subtopicTimeTracker: {
            ...learningData.subtopicTimeTracker,
            [roleId]: nextTracker
          }
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isOpen, isLoaded, detail, roleId, context, topic, learningData, triggerSync]);

  function handleMarkStatus(status) {
    if (!roleId || !isLoaded) return;
    const key = getSubtopicKey(context, topic);
    const currentProgress = learningData.subtopicProgress?.[roleId] || {};
    
    triggerSync({
      ...learningData,
      subtopicProgress: {
        ...learningData.subtopicProgress,
        [roleId]: {
          ...currentProgress,
          [key]: status
        }
      }
    });
    setIsOpen(false);
  }

  async function loadDetail() {
    setIsOpen(true);
    if (detail || isLoading) return;

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/topic-detail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, context, roleTitle })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      setDetail(data.detail);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <button 
        onClick={loadDetail}
        style={{
          background: 'transparent',
          color: 'var(--brand)',
          border: '1px solid var(--brand)',
          padding: '0.4rem 0.8rem',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '0.85rem',
          fontWeight: 600,
          marginRight: '0.5rem',
          marginBottom: '0.5rem',
          display: 'inline-block'
        }}
      >
        Explore {topic}
      </button>

      {mounted && isOpen && createPortal(
        <div 
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '1rem',
            backdropFilter: 'blur(3px)'
          }}
          onClick={() => setIsOpen(false)}
        >
          <div 
            style={{
              background: 'var(--surface-color, #ffffff)',
              color: 'var(--text-color, #111827)',
              padding: '2rem',
              borderRadius: '12px',
              maxWidth: '700px',
              width: '100%',
              maxHeight: '85vh',
              overflowY: 'auto',
              position: 'relative',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              textAlign: 'left'
            }}
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setIsOpen(false)}
              style={{
                position: 'absolute',
                top: '1rem', right: '1.2rem',
                background: 'var(--bg-color, #f3f4f6)', border: 'none',
                width: '32px', height: '32px',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.2rem', cursor: 'pointer',
                color: 'var(--text-secondary, #4b5563)',
                transition: 'background 0.2s'
              }}
              title="Close"
              onMouseEnter={e => e.currentTarget.style.background = '#e5e7eb'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--bg-color, #f3f4f6)'}
            >
              &times;
            </button>
            
            <h2 style={{ marginTop: 0, marginBottom: '1.5rem', paddingRight: '2.5rem', fontSize: '1.8rem' }}>
              {topic}
            </h2>

            {isLoading ? (
              <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-secondary)' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem', animation: 'spin 2s linear infinite' }}>✨</div>
                <p style={{ fontSize: '1.1rem' }}>Generating a simple explanation and practical example...</p>
              </div>
            ) : error ? (
              <div style={{ color: '#dc2626', padding: '1rem', background: '#fef2f2', border: '1px solid #f87171', borderRadius: '8px' }}>
                <strong>Failed to load:</strong> {error}
              </div>
            ) : detail ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div>
                  <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>Definition</h4>
                  <p style={{ margin: 0, fontSize: '1.05rem', lineHeight: 1.6 }}>{detail.definition}</p>
                </div>
                
                <div>
                  <h4 style={{ margin: '0 0 0.8rem 0', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>Description</h4>
                  <ul style={{ margin: 0, paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {(detail.descriptionPoints || [detail.description]).map((point, i) => (
                      <li key={i} style={{ fontSize: '1.05rem', lineHeight: 1.6 }}>{point}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 style={{ margin: '0 0 0.8rem 0', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>Usage Scenarios</h4>
                  <ul style={{ margin: 0, paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {(detail.usagePoints || []).map((point, i) => (
                      <li key={i} style={{ fontSize: '1.05rem', lineHeight: 1.6 }}>{point}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>Code / Practical Example</h4>
                  <p style={{ margin: 0, fontSize: '1.05rem', lineHeight: 1.7, background: 'var(--bg-color, #f9fafb)', padding: '1.2rem', borderRadius: '8px', borderLeft: '4px solid var(--brand, #3b82f6)', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
                    {detail.illustration || detail.example}
                  </p>
                </div>

                <div>
                  <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>Real World Example</h4>
                  <p style={{ margin: 0, fontSize: '1.05rem', lineHeight: 1.7, background: 'var(--surface-strong, #f8fafc)', padding: '1.2rem', borderRadius: '8px', border: '1px solid var(--border-color, #e5e7eb)' }}>
                    {detail.example}
                  </p>
                </div>

                {/* Progress Tracking Injector */}
                {roleId && isLoaded && (
                  <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)', flexWrap: 'wrap' }}>
                    <button 
                      onClick={() => handleMarkStatus('done')}
                      style={{ flex: 1, minWidth: '200px', padding: '1rem', background: '#10b981', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1.05rem', fontWeight: 600, cursor: 'pointer', transition: 'background 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#059669'}
                      onMouseLeave={e => e.currentTarget.style.background = '#10b981'}
                    >
                      Mark as Done
                    </button>
                    <button 
                      onClick={() => handleMarkStatus('continue')}
                      style={{ flex: 1, minWidth: '200px', padding: '1rem', background: 'transparent', color: 'var(--brand)', border: '1px solid var(--brand)', borderRadius: '8px', fontSize: '1.05rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'var(--brand)'; e.currentTarget.style.color = 'white'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--brand)'; }}
                    >
                      Keep Pending
                    </button>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>
      , document.body)}
    </>
  );
}
