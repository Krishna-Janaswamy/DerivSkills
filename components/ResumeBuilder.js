'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import { TechGenSpinner } from '@/components/TechGenSpinner';

// ─── Constants ─────────────────────────────────────────────────────────────────
const SEVERITY_COLORS = { High: '#EF4444', Medium: '#F59E0B', Low: '#10B981' };
const SCORE_COLOR = (s) => { if (s >= 90) return '#10B981'; if (s >= 70) return '#F59E0B'; return '#EF4444'; };
const SAVE_DEBOUNCE_MS = 1500;

const EMPTY_CONTENT = {
  personalInfo: { name: '', email: '', phone: '', location: '', linkedin: '', github: '' },
  summary: '',
  experience: [],
  projects: [],
  skills: { technical: [], soft: [] },
  education: [],
  certifications: [],
};

// ─── Main Component ─────────────────────────────────────────────────────────────
export function ResumeBuilder({ resumeId }) {
  const [resume, setResume] = useState(null);
  const [content, setContent] = useState(EMPTY_CONTENT);
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState('saved'); // 'saved' | 'saving' | 'unsaved'
  const [activeSection, setActiveSection] = useState('personalInfo');
  const [suggestion, setSuggestion] = useState(null);
  const [suggestionLoading, setSuggestionLoading] = useState(false);
  const [isDownloadReady, setIsDownloadReady] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const router = useRouter();
  const debounceRef = useRef(null);
  const contentRef = useRef(content);
  contentRef.current = content;

  // ── Load resume on mount ─────────────────────────────────────────────────────
  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/resumes/${resumeId}`);
      if (!res.ok) { router.push('/profile'); return; }
      const { resume: r } = await res.json();
      setResume(r);
      setContent(r.content || EMPTY_CONTENT);
      if (r.analysis) setAnalysis(r.analysis);
      setIsDownloadReady(r.isDownloadReady);
    }
    load();
  }, [resumeId, router]);

  // ── Auto-save with debounce ──────────────────────────────────────────────────
  const triggerSave = useCallback(() => {
    setSaveStatus('unsaved');
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setSaveStatus('saving');
      setIsSaving(true);
      try {
        await fetch(`/api/resumes/${resumeId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content: contentRef.current }),
        });
        setSaveStatus('saved');
        // Re-analyze after save
        runAnalysis();
      } finally {
        setIsSaving(false);
      }
    }, SAVE_DEBOUNCE_MS);
  }, [resumeId]);

  function updateContent(updater) {
    setContent(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      return next;
    });
    triggerSave();
  }

  // ── ATS Analysis ─────────────────────────────────────────────────────────────
  async function runAnalysis() {
    setIsAnalyzing(true);
    try {
      const res = await fetch(`/api/resumes/${resumeId}/analyze`, { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setAnalysis(data.analysis);
        setIsDownloadReady(data.isDownloadReady);
      }
    } finally {
      setIsAnalyzing(false);
    }
  }

  // ── AI Suggest ───────────────────────────────────────────────────────────────
  async function fetchSuggestion(section, currentValue, context) {
    setSuggestion(null);
    setSuggestionLoading(true);
    try {
      const res = await fetch(`/api/resumes/${resumeId}/suggest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section, currentValue, context }),
      });
      if (res.ok) {
        const data = await res.json();
        setSuggestion({ section, ...data });
      }
    } finally {
      setSuggestionLoading(false);
    }
  }

  // ── Download ─────────────────────────────────────────────────────────────────
  async function handleDownload() {
    setDownloading(true);
    try {
      const res = await fetch(`/api/resumes/${resumeId}/download`);
      if (!res.ok) { alert('Download not available yet.'); return; }
      const html = await res.text();
      const blob = new Blob([html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${resume?.title?.replace(/\s+/g, '_') || 'Resume'}.html`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setDownloading(false);
    }
  }

  if (!resume) return (
    <div style={{ display: 'grid', placeItems: 'center', height: '80vh' }}>
      <TechGenSpinner text="Loading Resume Builder..." />
    </div>
  );

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr 320px', height: 'calc(100vh - 64px)', overflow: 'hidden' }}>

      {/* ── LEFT: Editor Panel ─────────────────────────────────────────── */}
      <div style={{
        borderRight: '1px solid rgba(255,255,255,0.08)',
        overflowY: 'auto', padding: '1.5rem 1.2rem',
        background: 'rgba(13, 17, 23, 0.95)',
      }}>
        {/* Header */}
        <div style={{ marginBottom: '1.5rem' }}>
          <button
            onClick={() => router.push('/profile')}
            style={{ background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer', fontSize: '0.85rem', marginBottom: '0.8rem', padding: 0 }}
          >
            ← Back to Profile
          </button>
          <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>{resume.title}</h2>
          <span style={{ display: 'inline-block', background: 'rgba(139,92,246,0.2)', color: '#A78BFA', padding: '0.15rem 0.6rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 600, marginTop: '0.3rem' }}>
            {resume.role}
          </span>
          <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: saveStatus === 'saved' ? '#10B981' : saveStatus === 'saving' ? '#F59E0B' : '#9CA3AF' }}>
            {saveStatus === 'saved' ? '✓ Auto-saved' : saveStatus === 'saving' ? '⟳ Saving...' : '● Unsaved changes'}
          </div>
        </div>

        {/* Section Tabs */}
        <SectionNav activeSection={activeSection} onSelect={setActiveSection} />

        {/* Editor Sections */}
        <div style={{ marginTop: '1rem' }}>
          {activeSection === 'personalInfo' && (
            <PersonalInfoEditor
              data={content.personalInfo}
              onChange={pi => updateContent(c => ({ ...c, personalInfo: { ...c.personalInfo, ...pi } }))}
              onSuggest={(field, val) => fetchSuggestion('personalInfo', val, { field })}
            />
          )}
          {activeSection === 'summary' && (
            <SummaryEditor
              value={content.summary}
              onChange={v => updateContent(c => ({ ...c, summary: v }))}
              onSuggest={() => fetchSuggestion('summary', content.summary, {})}
            />
          )}
          {activeSection === 'experience' && (
            <ExperienceEditor
              items={content.experience}
              onChange={exp => updateContent(c => ({ ...c, experience: exp }))}
              onSuggest={(bullet, idx, bIdx) => fetchSuggestion('experience_bullet', bullet, { jobIndex: idx, bulletIndex: bIdx })}
            />
          )}
          {activeSection === 'skills' && (
            <SkillsEditor
              data={content.skills}
              onChange={skills => updateContent(c => ({ ...c, skills }))}
              onSuggest={() => fetchSuggestion('skills', content.skills.technical.join(', '), {})}
            />
          )}
          {activeSection === 'projects' && (
            <ProjectsEditor
              items={content.projects}
              onChange={projects => updateContent(c => ({ ...c, projects }))}
              onSuggest={(desc, idx) => fetchSuggestion('project_description', desc, { projectIndex: idx })}
            />
          )}
          {activeSection === 'education' && (
            <EducationEditor
              items={content.education}
              onChange={ed => updateContent(c => ({ ...c, education: ed }))}
            />
          )}
          {activeSection === 'certifications' && (
            <CertificationsEditor
              items={content.certifications}
              onChange={certs => updateContent(c => ({ ...c, certifications: certs }))}
            />
          )}
        </div>
      </div>

      {/* ── CENTER: ATS Cockpit ────────────────────────────────────────── */}
      <div style={{ overflowY: 'auto', padding: '1.5rem', background: 'rgba(10, 14, 20, 0.98)' }}>
        <ATSCockpit
          analysis={analysis}
          isAnalyzing={isAnalyzing}
          isDownloadReady={isDownloadReady}
          onAnalyze={runAnalysis}
          onDownload={handleDownload}
          downloading={downloading}
        />
      </div>

      {/* ── RIGHT: AI Suggestion Panel ────────────────────────────────── */}
      <div style={{
        borderLeft: '1px solid rgba(255,255,255,0.08)',
        overflowY: 'auto', padding: '1.5rem 1.2rem',
        background: 'rgba(13, 17, 23, 0.95)',
      }}>
        <AISuggestionPanel
          suggestion={suggestion}
          loading={suggestionLoading}
          onApply={(section, improved) => {
            if (section === 'summary') {
              updateContent(c => ({ ...c, summary: improved }));
            } else if (section === 'skills') {
              const newSkills = improved.split(',').map(s => s.trim()).filter(Boolean);
              updateContent(c => ({ ...c, skills: { ...c.skills, technical: [...new Set([...c.skills.technical, ...newSkills])] } }));
            }
            setSuggestion(null);
          }}
          onClose={() => setSuggestion(null)}
        />
      </div>
    </div>
  );
}

// ─── Section Navigator ──────────────────────────────────────────────────────────
const SECTIONS = [
  { id: 'personalInfo', label: '👤 Personal Info' },
  { id: 'summary', label: '📝 Summary' },
  { id: 'experience', label: '💼 Experience' },
  { id: 'skills', label: '🛠 Skills' },
  { id: 'projects', label: '🚀 Projects' },
  { id: 'education', label: '🎓 Education' },
  { id: 'certifications', label: '📜 Certifications' },
];
function SectionNav({ activeSection, onSelect }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
      {SECTIONS.map(s => (
        <button
          key={s.id}
          onClick={() => onSelect(s.id)}
          style={{
            textAlign: 'left', padding: '0.6rem 0.8rem', borderRadius: '8px', border: 'none',
            background: activeSection === s.id ? 'rgba(139,92,246,0.2)' : 'transparent',
            color: activeSection === s.id ? '#A78BFA' : '#9CA3AF',
            fontWeight: activeSection === s.id ? 600 : 400,
            cursor: 'pointer', fontSize: '0.9rem', transition: 'all 0.15s',
          }}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}

// ─── ATS Cockpit ─────────────────────────────────────────────────────────────────
function ATSCockpit({ analysis, isAnalyzing, isDownloadReady, onAnalyze, onDownload, downloading }) {
  const score = analysis?.overallScore ?? null;
  const color = SCORE_COLOR(score ?? 0);

  const radarData = analysis ? [
    { subject: 'Personal Info', A: analysis.sectionScores?.personalInfo ?? 50 },
    { subject: 'Summary', A: analysis.sectionScores?.summary ?? 50 },
    { subject: 'Experience', A: analysis.sectionScores?.experience ?? 50 },
    { subject: 'Skills', A: analysis.sectionScores?.skills ?? 50 },
    { subject: 'Projects', A: analysis.sectionScores?.projects ?? 50 },
    { subject: 'Education', A: analysis.sectionScores?.education ?? 50 },
  ] : [];

  const severityData = [
    { name: 'High', count: (analysis?.faultAreas || []).filter(f => f.severity === 'High').length },
    { name: 'Med', count: (analysis?.faultAreas || []).filter(f => f.severity === 'Medium').length },
    { name: 'Low', count: (analysis?.faultAreas || []).filter(f => f.severity === 'Low').length },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700 }}>ATS Cockpit</h2>
        <button
          onClick={onAnalyze}
          disabled={isAnalyzing}
          style={{
            padding: '0.5rem 1rem', borderRadius: '8px', border: 'none',
            background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)',
            color: 'white', cursor: isAnalyzing ? 'wait' : 'pointer', fontWeight: 600, fontSize: '0.85rem',
          }}
        >
          {isAnalyzing ? '⟳ Scanning...' : '▶ Run Deep Scan'}
        </button>
      </div>

      {isAnalyzing && <div style={{ textAlign: 'center', padding: '2rem 0' }}><TechGenSpinner text="Running AI ATS analysis..." /></div>}

      {!analysis && !isAnalyzing && (
        <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#9CA3AF', border: '2px dashed rgba(255,255,255,0.1)', borderRadius: '12px' }}>
          <p style={{ fontSize: '2rem', margin: '0 0 0.8rem' }}>🎯</p>
          <p style={{ fontWeight: 600, marginBottom: '0.4rem' }}>Fill in your resume sections</p>
          <p style={{ fontSize: '0.85rem' }}>Then click "Run Deep Scan" to get your ATS score and fault breakdown.</p>
        </div>
      )}

      {analysis && !isAnalyzing && (
        <>
          {/* Score Ring */}
          <div style={{
            background: 'rgba(17,24,39,0.7)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)',
            padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem',
          }}>
            <h3 style={{ margin: 0, color: '#9CA3AF', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Overall ATS Score</h3>
            <svg width="140" height="140" viewBox="0 0 140 140">
              <circle cx="70" cy="70" r="58" fill="none" stroke="#1F2937" strokeWidth="10" />
              <circle
                cx="70" cy="70" r="58" fill="none" stroke={color} strokeWidth="10"
                strokeDasharray={`${score / 100 * 364} 364`}
                strokeLinecap="round" transform="rotate(-90 70 70)"
                style={{ transition: 'stroke-dasharray 0.8s cubic-bezier(0.4,0,0.2,1)' }}
              />
              <text x="70" y="65" textAnchor="middle" fontSize="32" fontWeight="800" fill={color}>{score}</text>
              <text x="70" y="85" textAnchor="middle" fontSize="12" fill="#6B7280">/100</text>
            </svg>
            {isDownloadReady ? (
              <div style={{ textAlign: 'center' }}>
                <p style={{ color: '#10B981', fontWeight: 700, marginBottom: '0.8rem' }}>🎉 ATS Ready! Download unlocked.</p>
                <button
                  onClick={onDownload}
                  disabled={downloading}
                  style={{
                    padding: '0.75rem 2rem', borderRadius: '10px', border: 'none',
                    background: 'linear-gradient(135deg, #10B981, #059669)',
                    color: 'white', fontWeight: 700, cursor: 'pointer', fontSize: '1rem',
                    boxShadow: '0 4px 14px rgba(16,185,129,0.4)',
                  }}
                >
                  {downloading ? 'Preparing...' : '⬇ Download Resume'}
                </button>
              </div>
            ) : (
              <p style={{ color: '#6B7280', fontSize: '0.85rem', textAlign: 'center' }}>
                Reach <strong style={{ color: '#F59E0B' }}>90+</strong> to unlock download
              </p>
            )}
          </div>

          {/* Radar Chart */}
          <div style={{ background: 'rgba(17,24,39,0.7)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', padding: '1.5rem' }}>
            <h3 style={{ margin: '0 0 1rem', color: '#9CA3AF', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Section Analysis</h3>
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#1F2937" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#9CA3AF', fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Score" dataKey="A" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.45} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Fault Severity Bar */}
          <div style={{ background: 'rgba(17,24,39,0.7)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', padding: '1.5rem' }}>
            <h3 style={{ margin: '0 0 1rem', color: '#9CA3AF', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Fault Severity</h3>
            <ResponsiveContainer width="100%" height={140}>
              <BarChart data={severityData} barSize={32}>
                <XAxis dataKey="name" tick={{ fill: '#9CA3AF', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: 'rgba(255,255,255,0.03)' }} contentStyle={{ background: '#1F2937', border: 'none', borderRadius: '8px' }} />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {severityData.map((entry, i) => (
                    <Cell key={i} fill={Object.values(SEVERITY_COLORS)[i]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Keywords */}
          <KeywordPanel analysis={analysis} />

          {/* Fault Areas */}
          <FaultAreaList faultAreas={analysis.faultAreas || []} />
        </>
      )}
    </div>
  );
}

function KeywordPanel({ analysis }) {
  const matching = analysis?.keywordAnalysis?.matchingKeywords || [];
  const missing = analysis?.keywordAnalysis?.missingKeywords || [];
  return (
    <div style={{ background: 'rgba(17,24,39,0.7)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <h4 style={{ color: '#10B981', margin: '0 0 0.7rem', fontSize: '0.85rem', fontWeight: 600 }}>✓ Present Keywords</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {matching.length > 0 ? matching.map((kw, i) => (
            <span key={i} style={{ background: 'rgba(16,185,129,0.15)', color: '#34D399', padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.78rem' }}>{kw}</span>
          )) : <span style={{ color: '#6B7280', fontSize: '0.85rem' }}>None found yet</span>}
        </div>
      </div>
      <div>
        <h4 style={{ color: '#EF4444', margin: '0 0 0.7rem', fontSize: '0.85rem', fontWeight: 600 }}>✕ Missing Keywords</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {missing.length > 0 ? missing.map((kw, i) => (
            <span key={i} style={{ background: 'rgba(239,68,68,0.15)', color: '#F87171', padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.78rem' }}>{kw}</span>
          )) : <span style={{ color: '#10B981', fontSize: '0.85rem' }}>All key keywords present! 🎉</span>}
        </div>
      </div>
    </div>
  );
}

function FaultAreaList({ faultAreas }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
      <h3 style={{ margin: 0, color: '#9CA3AF', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
        Fault Areas & Action Plan
      </h3>
      {faultAreas.length === 0 ? (
        <p style={{ color: '#10B981', textAlign: 'center', padding: '1rem' }}>No critical faults! Outstanding resume. 🎉</p>
      ) : (
        faultAreas.map((fault, idx) => (
          <div key={idx} style={{
            background: 'rgba(17,24,39,0.7)', borderLeft: `4px solid ${SEVERITY_COLORS[fault.severity] || '#6B7280'}`,
            padding: '1rem 1.2rem', borderRadius: '0 10px 10px 0',
            border: '1px solid rgba(255,255,255,0.06)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', alignItems: 'flex-start' }}>
              <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#F3F4F6' }}>{fault.category}</span>
              <span style={{
                fontSize: '0.72rem', padding: '0.15rem 0.5rem', borderRadius: '10px', fontWeight: 600,
                background: `${SEVERITY_COLORS[fault.severity]}20`, color: SEVERITY_COLORS[fault.severity],
                whiteSpace: 'nowrap', marginLeft: '0.5rem',
              }}>
                {fault.section} · {fault.severity}
              </span>
            </div>
            <p style={{ color: '#9CA3AF', fontSize: '0.83rem', margin: '0 0 0.6rem', lineHeight: 1.5 }}>{fault.issue}</p>
            <div style={{ background: 'rgba(16,185,129,0.07)', padding: '0.6rem 0.8rem', borderRadius: '6px', border: '1px dashed rgba(16,185,129,0.25)' }}>
              <p style={{ color: '#A7F3D0', margin: 0, fontSize: '0.83rem', lineHeight: 1.5 }}>
                <strong style={{ color: '#34D399' }}>Fix: </strong>{fault.suggestion}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

// ─── AI Suggestion Panel ─────────────────────────────────────────────────────────
function AISuggestionPanel({ suggestion, loading, onApply, onClose }) {
  return (
    <div>
      <h3 style={{ margin: '0 0 1rem', fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        ✨ AI Suggestions
      </h3>
      {loading && <div style={{ padding: '2rem 0', textAlign: 'center' }}><TechGenSpinner text="AI is thinking..." /></div>}
      {!loading && !suggestion && (
        <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#6B7280', border: '2px dashed rgba(255,255,255,0.08)', borderRadius: '12px' }}>
          <p style={{ fontSize: '1.8rem', margin: '0 0 0.8rem' }}>✨</p>
          <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>Click any <strong style={{ color: '#A78BFA' }}>✨ Suggest</strong> button</p>
          <p style={{ fontSize: '0.82rem', marginTop: '0.4rem' }}>inside the editor to get AI-powered improvements for that section.</p>
        </div>
      )}
      {!loading && suggestion && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', animation: 'fadeIn 0.3s ease' }}>
          <div style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '12px', padding: '1.2rem' }}>
            <p style={{ color: '#A78BFA', fontWeight: 600, margin: '0 0 0.7rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              ✨ Improved Version
            </p>
            <p style={{ color: '#E5E7EB', lineHeight: 1.7, fontSize: '0.92rem', margin: 0, whiteSpace: 'pre-wrap' }}>
              {suggestion.improved}
            </p>
          </div>
          <div style={{ background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '8px', padding: '0.8rem 1rem' }}>
            <p style={{ color: '#A7F3D0', margin: 0, fontSize: '0.82rem', lineHeight: 1.5 }}>
              <strong style={{ color: '#34D399' }}>Why this helps: </strong>{suggestion.explanation}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.7rem' }}>
            <button
              onClick={() => onApply(suggestion.section, suggestion.improved)}
              style={{
                flex: 1, padding: '0.75rem', borderRadius: '8px', border: 'none',
                background: 'linear-gradient(135deg, #8B5CF6, #3B82F6)',
                color: 'white', fontWeight: 600, cursor: 'pointer',
              }}
            >
              Apply Suggestion
            </button>
            <button
              onClick={onClose}
              style={{ padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'transparent', color: '#9CA3AF', cursor: 'pointer' }}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Editor Sections ─────────────────────────────────────────────────────────────
const fieldStyle = {
  width: '100%', padding: '10px 12px', borderRadius: '8px',
  background: 'rgba(31,41,55,0.8)', border: '1px solid rgba(255,255,255,0.1)',
  color: 'white', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box',
};
const SuggestBtn = ({ onClick }) => (
  <button
    onClick={onClick}
    style={{
      padding: '0.3rem 0.7rem', borderRadius: '6px', border: '1px solid rgba(139,92,246,0.4)',
      background: 'rgba(139,92,246,0.1)', color: '#A78BFA', cursor: 'pointer',
      fontSize: '0.75rem', fontWeight: 600, transition: 'background 0.15s',
    }}
  >✨ Suggest</button>
);
const FieldLabel = ({ children, action }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
    <label style={{ color: '#9CA3AF', fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{children}</label>
    {action}
  </div>
);
function AddBtn({ onClick, label }) {
  return (
    <button onClick={onClick} style={{
      width: '100%', padding: '0.6rem', borderRadius: '8px', border: '2px dashed rgba(255,255,255,0.1)',
      background: 'transparent', color: '#9CA3AF', cursor: 'pointer', fontWeight: 500, marginTop: '0.5rem',
    }}>+ {label}</button>
  );
}

function PersonalInfoEditor({ data, onChange }) {
  const fields = [
    { key: 'name', label: 'Full Name', placeholder: 'Jane Doe' },
    { key: 'email', label: 'Email', placeholder: 'jane@example.com' },
    { key: 'phone', label: 'Phone', placeholder: '+1 (555) 000-0000' },
    { key: 'location', label: 'Location', placeholder: 'San Francisco, CA' },
    { key: 'linkedin', label: 'LinkedIn URL', placeholder: 'linkedin.com/in/janedoe' },
    { key: 'github', label: 'GitHub URL', placeholder: 'github.com/janedoe' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {fields.map(f => (
        <div key={f.key}>
          <FieldLabel>{f.label}</FieldLabel>
          <input
            type="text" value={data[f.key] || ''} placeholder={f.placeholder}
            onChange={e => onChange({ [f.key]: e.target.value })}
            style={fieldStyle}
          />
        </div>
      ))}
    </div>
  );
}

function SummaryEditor({ value, onChange, onSuggest }) {
  return (
    <div>
      <FieldLabel action={<SuggestBtn onClick={onSuggest} />}>Professional Summary</FieldLabel>
      <textarea
        value={value} placeholder="Write a compelling 2-3 sentence value proposition..."
        onChange={e => onChange(e.target.value)}
        rows={6}
        style={{ ...fieldStyle, resize: 'vertical', lineHeight: 1.6 }}
      />
    </div>
  );
}

function ExperienceEditor({ items, onChange, onSuggest }) {
  function addItem() {
    onChange([...items, { id: crypto.randomUUID(), company: '', role: '', duration: '', bullets: [''] }]);
  }
  function removeItem(idx) { onChange(items.filter((_, i) => i !== idx)); }
  function updateField(idx, field, val) {
    const next = [...items];
    next[idx] = { ...next[idx], [field]: val };
    onChange(next);
  }
  function updateBullet(idx, bIdx, val) {
    const next = [...items];
    next[idx].bullets[bIdx] = val;
    onChange(next);
  }
  function addBullet(idx) {
    const next = [...items];
    next[idx].bullets.push('');
    onChange(next);
  }
  function removeBullet(idx, bIdx) {
    const next = [...items];
    next[idx].bullets = next[idx].bullets.filter((_, i) => i !== bIdx);
    onChange(next);
  }
  return (
    <div>
      {items.map((exp, idx) => (
        <div key={exp.id || idx} style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '1rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
            <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#E5E7EB' }}>Experience #{idx + 1}</span>
            <button onClick={() => removeItem(idx)} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', fontSize: '0.8rem' }}>Remove</button>
          </div>
          {[['role', 'Job Title', 'Senior Frontend Engineer'], ['company', 'Company', 'Acme Corp'], ['duration', 'Duration', 'Jan 2023 – Present']].map(([key, label, ph]) => (
            <div key={key} style={{ marginBottom: '0.7rem' }}>
              <FieldLabel>{label}</FieldLabel>
              <input type="text" value={exp[key] || ''} placeholder={ph} onChange={e => updateField(idx, key, e.target.value)} style={fieldStyle} />
            </div>
          ))}
          <FieldLabel>Bullet Points (1 achievement per line)</FieldLabel>
          {(exp.bullets || []).map((b, bIdx) => (
            <div key={bIdx} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'flex-start' }}>
              <textarea
                value={b} placeholder="Improved app performance by 40% using React memoization..."
                onChange={e => updateBullet(idx, bIdx, e.target.value)}
                rows={2}
                style={{ ...fieldStyle, flex: 1, resize: 'vertical' }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                <SuggestBtn onClick={() => onSuggest(b, idx, bIdx)} />
                <button onClick={() => removeBullet(idx, bIdx)} style={{ padding: '0.2rem 0.4rem', borderRadius: '4px', border: 'none', background: 'rgba(239,68,68,0.1)', color: '#EF4444', cursor: 'pointer', fontSize: '0.75rem' }}>✕</button>
              </div>
            </div>
          ))}
          <button onClick={() => addBullet(idx)} style={{ background: 'none', border: 'none', color: '#8B5CF6', cursor: 'pointer', fontSize: '0.82rem', marginTop: '0.3rem' }}>+ Add bullet</button>
        </div>
      ))}
      <AddBtn onClick={addItem} label="Add Experience" />
    </div>
  );
}

function SkillsEditor({ data, onChange, onSuggest }) {
  const [techInput, setTechInput] = useState('');
  const [softInput, setSoftInput] = useState('');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
      <div>
        <FieldLabel action={<SuggestBtn onClick={onSuggest} />}>Technical Skills</FieldLabel>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.6rem' }}>
          {(data.technical || []).map((s, i) => (
            <span key={i} style={{ background: 'rgba(139,92,246,0.2)', color: '#A78BFA', padding: '0.2rem 0.6rem 0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              {s}
              <button onClick={() => onChange({ ...data, technical: data.technical.filter((_, j) => j !== i) })} style={{ background: 'none', border: 'none', color: '#7C3AED', cursor: 'pointer', fontSize: '0.7rem', padding: 0 }}>✕</button>
            </span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input type="text" value={techInput} onChange={e => setTechInput(e.target.value)} placeholder="Add skill (press Enter)" style={{ ...fieldStyle, flex: 1 }}
            onKeyDown={e => { if (e.key === 'Enter' && techInput.trim()) { onChange({ ...data, technical: [...(data.technical || []), techInput.trim()] }); setTechInput(''); } }}
          />
        </div>
      </div>
      <div>
        <FieldLabel>Soft Skills</FieldLabel>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.6rem' }}>
          {(data.soft || []).map((s, i) => (
            <span key={i} style={{ background: 'rgba(59,130,246,0.2)', color: '#93C5FD', padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              {s}
              <button onClick={() => onChange({ ...data, soft: data.soft.filter((_, j) => j !== i) })} style={{ background: 'none', border: 'none', color: '#3B82F6', cursor: 'pointer', fontSize: '0.7rem', padding: 0 }}>✕</button>
            </span>
          ))}
        </div>
        <input type="text" value={softInput} onChange={e => setSoftInput(e.target.value)} placeholder="Add soft skill (press Enter)" style={fieldStyle}
          onKeyDown={e => { if (e.key === 'Enter' && softInput.trim()) { onChange({ ...data, soft: [...(data.soft || []), softInput.trim()] }); setSoftInput(''); } }}
        />
      </div>
    </div>
  );
}

function ProjectsEditor({ items, onChange, onSuggest }) {
  function add() { onChange([...items, { id: crypto.randomUUID(), name: '', tech: '', description: '', link: '' }]); }
  function update(idx, field, val) { const n = [...items]; n[idx] = { ...n[idx], [field]: val }; onChange(n); }
  function remove(idx) { onChange(items.filter((_, i) => i !== idx)); }
  return (
    <div>
      {items.map((p, idx) => (
        <div key={p.id || idx} style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '1rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
            <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#E5E7EB' }}>Project #{idx + 1}</span>
            <button onClick={() => remove(idx)} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', fontSize: '0.8rem' }}>Remove</button>
          </div>
          {[['name', 'Project Name', 'e.g. DerivSkills Platform'], ['tech', 'Technologies', 'React, Next.js, PostgreSQL'], ['link', 'Link (optional)', 'github.com/you/project']].map(([key, label, ph]) => (
            <div key={key} style={{ marginBottom: '0.7rem' }}><FieldLabel>{label}</FieldLabel>
              <input type="text" value={p[key] || ''} placeholder={ph} onChange={e => update(idx, key, e.target.value)} style={fieldStyle} />
            </div>
          ))}
          <FieldLabel action={<SuggestBtn onClick={() => onSuggest(p.description, idx)} />}>Description</FieldLabel>
          <textarea value={p.description || ''} rows={3} placeholder="Built a scalable learning platform that..."
            onChange={e => update(idx, 'description', e.target.value)}
            style={{ ...fieldStyle, resize: 'vertical' }}
          />
        </div>
      ))}
      <AddBtn onClick={add} label="Add Project" />
    </div>
  );
}

function EducationEditor({ items, onChange }) {
  function add() { onChange([...items, { id: crypto.randomUUID(), institution: '', degree: '', year: '' }]); }
  function update(idx, field, val) { const n = [...items]; n[idx] = { ...n[idx], [field]: val }; onChange(n); }
  function remove(idx) { onChange(items.filter((_, i) => i !== idx)); }
  return (
    <div>
      {items.map((e, idx) => (
        <div key={e.id || idx} style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '1rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
            <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Education #{idx + 1}</span>
            <button onClick={() => remove(idx)} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', fontSize: '0.8rem' }}>Remove</button>
          </div>
          {[['institution', 'Institution', 'MIT'], ['degree', 'Degree', 'B.Tech Computer Science'], ['year', 'Year / Year Range', '2019 – 2023']].map(([key, label, ph]) => (
            <div key={key} style={{ marginBottom: '0.7rem' }}>
              <FieldLabel>{label}</FieldLabel>
              <input type="text" value={e[key] || ''} placeholder={ph} onChange={ev => update(idx, key, ev.target.value)} style={fieldStyle} />
            </div>
          ))}
        </div>
      ))}
      <AddBtn onClick={add} label="Add Education" />
    </div>
  );
}

function CertificationsEditor({ items, onChange }) {
  const [input, setInput] = useState('');
  return (
    <div>
      <FieldLabel>Certifications</FieldLabel>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.8rem' }}>
        {items.map((cert, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', background: 'rgba(31,41,55,0.5)', padding: '0.6rem 0.8rem', borderRadius: '8px' }}>
            <span style={{ color: '#E5E7EB', fontSize: '0.9rem' }}>{cert}</span>
            <button onClick={() => onChange(items.filter((_, j) => j !== i))} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer' }}>✕</button>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="e.g. AWS Solutions Architect" style={{ ...fieldStyle, flex: 1 }}
          onKeyDown={e => { if (e.key === 'Enter' && input.trim()) { onChange([...items, input.trim()]); setInput(''); } }}
        />
        <button onClick={() => { if (input.trim()) { onChange([...items, input.trim()]); setInput(''); } }}
          style={{ padding: '0.5rem 0.8rem', borderRadius: '8px', border: 'none', background: '#8B5CF6', color: 'white', cursor: 'pointer' }}>+</button>
      </div>
    </div>
  );
}
