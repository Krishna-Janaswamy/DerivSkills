'use client';

import { useEffect, useMemo, useState } from 'react';
import { useAIPortfolioContent } from './hooks/useAIPortfolioContent';
import { openResumePrintView } from './utils/exportResume';
import { TechGenSpinner } from '@/components/TechGenSpinner';
import { useCloudSync } from '@/components/Providers';
import { getRoleById } from '@/src/data/roles';

const STRATEGY_DEFAULTS = {
  targetRole: '',
  careerGoal: '',
  desiredTone: 'Proof-driven and clear',
  resumeText: '',
  projectNotes: '',
  jobDescription: '',
  customNotes: '',
};

const RESUME_FILE_TYPES = '.txt,.md,.json,.csv,.pdf';

async function readTextFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(typeof reader.result === 'string' ? reader.result : '');
    reader.onerror = () => reject(new Error(`Could not read ${file.name}`));
    reader.readAsText(file);
  });
}

async function readPdfFile(file) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/api/portfolio/extract-text', {
    method: 'POST',
    body: formData,
  });

  const data = await parseJsonResponse(response, `Could not extract text from ${file.name}.`);

  if (!response.ok) {
    throw new Error(data?.error || `Could not extract text from ${file.name}.`);
  }

  if (!data?.text) {
    throw new Error(`No readable text was found in ${file.name}.`);
  }

  return data.text;
}

async function readFileAsText(file) {
  const extension = file.name.split('.').pop()?.toLowerCase();

  if (file.type === 'application/pdf' || extension === 'pdf') {
    return readPdfFile(file);
  }

  return readTextFile(file);
}

async function parseJsonResponse(response, fallbackMessage) {
  const contentType = response.headers.get('content-type') || '';
  const raw = await response.text();

  if (!raw) {
    if (!response.ok) {
      throw new Error(fallbackMessage);
    }
    return null;
  }

  if (!contentType.includes('application/json')) {
    if (response.status === 401 || response.status === 403) {
      throw new Error('Please sign in again to load your profile context.');
    }

    if (raw.startsWith('<!DOCTYPE') || raw.startsWith('<html')) {
      throw new Error('The profile service returned an HTML page instead of JSON.');
    }

    throw new Error(fallbackMessage);
  }

  try {
    return JSON.parse(raw);
  } catch {
    throw new Error('The profile service returned invalid JSON.');
  }
}

function arrayToTextarea(items = []) {
  return (items || []).join('\n');
}

function textareaToArray(value) {
  return value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
}

function extractKeywords(text) {
  return Array.from(
    new Set(
      (text || '')
        .toLowerCase()
        .match(/[a-z][a-z0-9.+#-]{2,}/g) || []
    )
  );
}

function computeAtsReview(resumeDraft, jobDescription) {
  if (!resumeDraft) {
    return { score: 0, checks: [], suggestions: [] };
  }

  const checks = [];
  let score = 0;

  const summaryLength = resumeDraft.basics?.summary?.trim().length || 0;
  const coreSkillsCount = resumeDraft.coreSkills?.length || 0;
  const projectsCount = resumeDraft.projects?.length || 0;
  const learningCount = resumeDraft.learningHighlights?.length || 0;
  const experienceCount = resumeDraft.experienceHighlights?.length || 0;
  const educationCount = resumeDraft.education?.length || 0;
  const atsKeywordCount = resumeDraft.atsKeywords?.length || 0;
  const projectBulletCount = (resumeDraft.projects || []).reduce((sum, project) => sum + (project.bullets?.length || 0), 0);
  const jdKeywords = extractKeywords(jobDescription);
  const draftKeywords = new Set(extractKeywords([
    resumeDraft.basics?.headline,
    resumeDraft.basics?.summary,
    ...(resumeDraft.coreSkills || []),
    ...(resumeDraft.atsKeywords || []),
    ...(resumeDraft.learningHighlights || []),
    ...(resumeDraft.experienceHighlights || []),
  ].join(' ')));
  const keywordMatches = jdKeywords.filter((keyword) => draftKeywords.has(keyword));
  const keywordCoverage = jdKeywords.length ? Math.round((keywordMatches.length / jdKeywords.length) * 100) : null;

  if (summaryLength >= 180) {
    score += 15;
    checks.push({ label: 'Professional summary has enough detail', passed: true });
  } else {
    checks.push({ label: 'Professional summary is still thin', passed: false });
  }

  if (coreSkillsCount >= 8) {
    score += 15;
    checks.push({ label: 'Core skills section is strong', passed: true });
  } else {
    checks.push({ label: 'Add more role-relevant core skills', passed: false });
  }

  if (projectsCount >= 2 && projectBulletCount >= 6) {
    score += 20;
    checks.push({ label: 'Projects provide enough proof points', passed: true });
  } else {
    checks.push({ label: 'Projects need more proof-backed bullets', passed: false });
  }

  if (learningCount >= 3) {
    score += 15;
    checks.push({ label: 'Learning proof is visible', passed: true });
  } else {
    checks.push({ label: 'Learning proof should be clearer', passed: false });
  }

  if (experienceCount >= 3) {
    score += 10;
    checks.push({ label: 'Experience highlights are present', passed: true });
  } else {
    checks.push({ label: 'Experience highlights need more substance', passed: false });
  }

  if (educationCount >= 1) {
    score += 5;
    checks.push({ label: 'Education section is present', passed: true });
  } else {
    checks.push({ label: 'Add education details', passed: false });
  }

  if (atsKeywordCount >= 8) {
    score += 10;
    checks.push({ label: 'ATS keyword list is healthy', passed: true });
  } else {
    checks.push({ label: 'Expand ATS keywords', passed: false });
  }

  if (keywordCoverage !== null) {
    if (keywordCoverage >= 30) {
      score += 10;
      checks.push({ label: `Job description alignment is ${keywordCoverage}%`, passed: true });
    } else {
      checks.push({ label: `Job description alignment is only ${keywordCoverage}%`, passed: false });
    }
  }

  const suggestions = [];

  if (summaryLength < 180) suggestions.push('Expand the summary so it clearly states your target role, strongest technical areas, and proof of learning consistency.');
  if (coreSkillsCount < 8) suggestions.push('Add more hard skills that recruiters will search for in ATS systems.');
  if (projectsCount < 2 || projectBulletCount < 6) suggestions.push('Strengthen the projects section with at least two projects and outcome-oriented bullets.');
  if (learningCount < 3) suggestions.push('Keep 3-5 learning highlights so your verified roadmap progress is visible.');
  if (keywordCoverage !== null && keywordCoverage < 30) suggestions.push('Mirror more terminology from the job description in your summary, skills, and project bullets.');
  if (educationCount < 1) suggestions.push('Add education details or a strong equivalent credential section before download.');

  return {
    score: Math.min(100, score),
    checks,
    suggestions,
    keywordCoverage,
  };
}

export default function PortfolioPage() {
  const { learningData, triggerSync, isLoaded, status } = useCloudSync();
  const [resumeUrl, setResumeUrl] = useState('');
  const [isHovered, setIsHovered] = useState(null);
  const { aiContent, loading: aiLoading, error: aiError, generateContent } = useAIPortfolioContent();
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [strategyInputs, setStrategyInputs] = useState(STRATEGY_DEFAULTS);
  const [resumeDraft, setResumeDraft] = useState(null);
  const [uploadStatus, setUploadStatus] = useState({
    resumeText: '',
    projectNotes: '',
    jobDescription: '',
    customNotes: '',
  });

  const verifiedSkills = useMemo(() => {
    if (!learningData || !learningData.subtopicProgress) return [];
    const skillsList = [];
    Object.keys(learningData.subtopicProgress).forEach((roleId) => {
      const roleProgress = learningData.subtopicProgress[roleId];
      const role = getRoleById(roleId);
      Object.keys(roleProgress).forEach((topicKey) => {
        if (roleProgress[topicKey] === 'done') {
          const parts = topicKey.split('::');
          const moduleTitle = parts[0] || '';
          const topicName = parts[1] || parts[0];
          const seconds = learningData?.subtopicTimeTracker?.[roleId]?.[topicKey] || 0;
          skillsList.push({
            name: topicName,
            roleTitle: role ? role.title : 'General',
            moduleTitle,
            topicKey,
            roleId,
            timeSpentHours: Math.max(1, Math.round(seconds / 3600))
          });
        }
      });
    });
    const uniqueSkills = [];
    const seen = new Set();
    skillsList.forEach(s => {
      if (!seen.has(s.name)) {
        seen.add(s.name);
        uniqueSkills.push(s);
      }
    });
    return uniqueSkills.slice(0, 24);
  }, [learningData]);

  const proofMetrics = useMemo(() => {
    const roleBreakdown = Object.entries(learningData?.subtopicProgress || {}).map(([roleId, roleProgress]) => {
      const completed = Object.values(roleProgress || {}).filter((value) => value === 'done').length;
      const role = getRoleById(roleId);
      return {
        roleId,
        roleTitle: role?.title || roleId,
        completed
      };
    }).filter((entry) => entry.completed > 0);

    const totalHours = Object.values(learningData?.subtopicTimeTracker || {}).reduce((sum, roleTracker) => {
      if (!roleTracker || typeof roleTracker !== 'object') return sum;
      return sum + Object.values(roleTracker).reduce((roleSum, seconds) => roleSum + (typeof seconds === 'number' ? seconds : 0), 0);
    }, 0);

    return {
      totalVerifiedSkills: verifiedSkills.length,
      totalLearningHours: Math.round(totalHours / 3600),
      strongestTracks: roleBreakdown.sort((a, b) => b.completed - a.completed).slice(0, 3)
    };
  }, [learningData, verifiedSkills]);

  const atsReview = useMemo(
    () => computeAtsReview(resumeDraft, strategyInputs.jobDescription),
    [resumeDraft, strategyInputs.jobDescription]
  );

  useEffect(() => {
    let ignore = false;

    async function loadProfile() {
      if (status !== 'authenticated') return;
      try {
        const response = await fetch('/api/profile', { headers: { 'cache-control': 'no-store' } });
        const data = await parseJsonResponse(response, 'Could not load profile context for the portfolio.');
        if (!response.ok || ignore || !data) return;
        setProfileData(data);
        setStrategyInputs((current) => ({
          ...current,
          targetRole: current.targetRole || data?.user?.presentRole || '',
        }));
      } catch {
        // Best-effort enrichment for the portfolio strategist.
      }
    }

    loadProfile();
    return () => {
      ignore = true;
    };
  }, [status]);

  useEffect(() => {
    if (aiContent) {
      setResumeDraft(aiContent);
    }
  }, [aiContent]);

  // Remove global loading block to allow SSR of the page shell and header.

  const handleResumeSave = (e) => {
    e.preventDefault();
    if (!resumeUrl) return;
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
  const profileDetails = profileData?.profileDetails || {};
  const topTracks = proofMetrics.strongestTracks;

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


  const handleGeneratePortfolio = (templateId) => {
    setSelectedTemplate(templateId);
    generateContent(
      {
        skills: verifiedSkills,
        templateId,
        targetRole: strategyInputs.targetRole,
        careerGoal: strategyInputs.careerGoal,
        desiredTone: strategyInputs.desiredTone,
        resumeText: strategyInputs.resumeText,
        projectNotes: strategyInputs.projectNotes,
        jobDescription: strategyInputs.jobDescription,
        customNotes: strategyInputs.customNotes,
        proofMetrics,
        userProfile: {
          name: profileData?.user?.name || '',
          presentRole: profileData?.user?.presentRole || '',
          headline: profileDetails.headline || '',
          bio: profileDetails.bio || '',
          company: profileDetails.company || '',
          location: profileDetails.location || '',
          yearsExperience: profileDetails.yearsExperience || '',
          userType: profileDetails.userType || '',
          collegeName: profileDetails.collegeName || '',
          branch: profileDetails.branch || ''
        }
      }
    );
  };

  const updateStrategyInput = (field, value) => {
    setStrategyInputs((current) => ({
      ...current,
      [field]: value
    }));
  };

  const handleFileUpload = async (field, file) => {
    if (!file) return;

    setUploadStatus((current) => ({
      ...current,
      [field]: `Uploading ${file.name}...`
    }));

    try {
      const text = await readFileAsText(file);
      setStrategyInputs((current) => ({
        ...current,
        [field]: current[field] ? `${current[field]}\n\n${text}` : text
      }));
      setUploadStatus((current) => ({
        ...current,
        [field]: `${file.name} added`
      }));
    } catch (error) {
      setUploadStatus((current) => ({
        ...current,
        [field]: error instanceof Error ? error.message : 'Upload failed'
      }));
    }
  };

  return (
    <main className="page-shell" style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '5rem' }}>
      <header style={{ marginBottom: '3rem' }}>
        <span className="section-kicker" style={{ marginBottom: '1rem' }}>
          Resume Studio
        </span>
        <h1 className="page-title" style={{ fontSize: '3rem', margin: '0 0 1rem 0', letterSpacing: '-0.03em' }}>ATS Resume Builder</h1>
        <p className="page-subtitle" style={{ fontSize: '1.1rem', maxWidth: '800px', lineHeight: 1.6, margin: 0 }}>
          Turn tracked learning into an ATS-friendly, proof-backed resume. Add role-specific context, upload your current resume, generate a strong draft from verified skills, and edit it live before download.
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
            Consolidate your active resume link here, or upload text-based resume content directly into the portfolio strategist. As your system tracks skills automatically, you can cross-reference them to ensure your resume stays updated.
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

          <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)', display: 'grid', gap: '0.75rem' }}>
            <span style={{ fontWeight: 600 }}>Upload resume text for AI retrieval</span>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
              Upload `.pdf`, `.txt`, `.md`, `.json`, or `.csv` files here if you want the resume generator to pull phrasing and evidence from your resume.
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <input
                type="file"
                accept={RESUME_FILE_TYPES}
                onChange={(e) => handleFileUpload('resumeText', e.target.files?.[0])}
                style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}
              />
              {uploadStatus.resumeText ? (
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{uploadStatus.resumeText}</span>
              ) : null}
            </div>
            {strategyInputs.resumeText ? (
              <div style={{ color: '#10b981', fontSize: '0.9rem' }}>
                Resume text is loaded into the strategist and will be used during generation.
              </div>
            ) : null}
          </div>
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

          {!isLoaded || status === 'loading' ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <TechGenSpinner text="Loading Verified Skills..." />
            </div>
          ) : verifiedSkills.length > 0 ? (
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

      <section style={{ background: 'var(--surface-color)', padding: '2.5rem', borderRadius: '24px', border: '1px solid var(--border-color)', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', marginBottom: '3rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <span style={{ fontSize: '2rem' }}>🧭</span>
          <div>
            <h2 style={{ fontSize: '1.7rem', margin: 0 }}>Portfolio Strategy Inputs</h2>
            <p style={{ color: 'var(--text-secondary)', margin: '0.4rem 0 0 0', lineHeight: 1.6 }}>
              We combine verified learning proof, your positioning goal, and optional source text from resume, projects, and job descriptions before generating an ATS-friendly resume draft.
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ padding: '1.25rem', borderRadius: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)' }}>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>Phase 1</div>
            <strong style={{ display: 'block', marginBottom: '0.4rem' }}>Structured resume generation</strong>
            <span style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>Summary, ATS skills, learning highlights, project bullets, and education are generated as editable sections.</span>
          </div>
          <div style={{ padding: '1.25rem', borderRadius: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)' }}>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>Phase 2</div>
            <strong style={{ display: 'block', marginBottom: '0.4rem' }}>Proof, projects, and ATS fit</strong>
            <span style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>We translate learning history into strong resume bullets, portfolio-worthy projects, and ATS keyword alignment.</span>
          </div>
          <div style={{ padding: '1.25rem', borderRadius: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)' }}>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>Phase 3</div>
            <strong style={{ display: 'block', marginBottom: '0.4rem' }}>Light retrieval without full RAG</strong>
            <span style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>Paste resume, projects, job descriptions, or notes and we pull the most relevant context into the resume prompt.</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
          <label style={{ display: 'grid', gap: '0.5rem' }}>
            <span style={{ fontWeight: 600 }}>Target role</span>
            <input
              value={strategyInputs.targetRole}
              onChange={(e) => updateStrategyInput('targetRole', e.target.value)}
              placeholder="Backend Engineer, AI Engineer, Full Stack Developer..."
              style={{ width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '14px 16px', borderRadius: '12px', fontSize: '0.95rem', outline: 'none' }}
            />
          </label>
          <label style={{ display: 'grid', gap: '0.5rem' }}>
            <span style={{ fontWeight: 600 }}>Career goal</span>
            <input
              value={strategyInputs.careerGoal}
              onChange={(e) => updateStrategyInput('careerGoal', e.target.value)}
              placeholder="Internship push, switch to backend, freelance portfolio..."
              style={{ width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '14px 16px', borderRadius: '12px', fontSize: '0.95rem', outline: 'none' }}
            />
          </label>
          <label style={{ display: 'grid', gap: '0.5rem' }}>
            <span style={{ fontWeight: 600 }}>Portfolio tone</span>
            <input
              value={strategyInputs.desiredTone}
              onChange={(e) => updateStrategyInput('desiredTone', e.target.value)}
              placeholder="Minimal, technical, enterprise, founder-like..."
              style={{ width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '14px 16px', borderRadius: '12px', fontSize: '0.95rem', outline: 'none' }}
            />
          </label>
        </div>

        <div style={{ display: 'grid', gap: '1rem' }}>
          <label style={{ display: 'grid', gap: '0.5rem' }}>
            <span style={{ fontWeight: 600 }}>Resume text for retrieval</span>
            <textarea
              value={strategyInputs.resumeText}
              onChange={(e) => updateStrategyInput('resumeText', e.target.value)}
              placeholder="Paste your resume summary or key sections here to improve accuracy."
              rows={5}
              style={{ width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '14px 16px', borderRadius: '12px', fontSize: '0.95rem', outline: 'none', resize: 'vertical' }}
            />
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              You can paste directly here, or use the upload option in Resume Gateway above.
            </span>
          </label>
          <label style={{ display: 'grid', gap: '0.5rem' }}>
            <span style={{ fontWeight: 600 }}>Project notes or shipped work</span>
            <textarea
              value={strategyInputs.projectNotes}
              onChange={(e) => updateStrategyInput('projectNotes', e.target.value)}
              placeholder="Paste project descriptions, GitHub README text, case-study notes, or achievements."
              rows={5}
              style={{ width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '14px 16px', borderRadius: '12px', fontSize: '0.95rem', outline: 'none', resize: 'vertical' }}
            />
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              Paste project context here. File upload is only available in Resume Gateway.
            </span>
          </label>
          <label style={{ display: 'grid', gap: '0.5rem' }}>
            <span style={{ fontWeight: 600 }}>Target job description</span>
            <textarea
              value={strategyInputs.jobDescription}
              onChange={(e) => updateStrategyInput('jobDescription', e.target.value)}
              placeholder="Paste a real job description to align portfolio language and recommendations."
              rows={5}
              style={{ width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '14px 16px', borderRadius: '12px', fontSize: '0.95rem', outline: 'none', resize: 'vertical' }}
            />
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              Paste the job description here so ATS scoring can compare keywords.
            </span>
          </label>
          <label style={{ display: 'grid', gap: '0.5rem' }}>
            <span style={{ fontWeight: 600 }}>Extra notes</span>
            <textarea
              value={strategyInputs.customNotes}
              onChange={(e) => updateStrategyInput('customNotes', e.target.value)}
              placeholder="Anything else the AI should know: preferred messaging, achievements, constraints, industries..."
              rows={4}
              style={{ width: '100%', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '14px 16px', borderRadius: '12px', fontSize: '0.95rem', outline: 'none', resize: 'vertical' }}
            />
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              Paste any extra guidance here. File upload is only available in Resume Gateway.
            </span>
          </label>
        </div>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
        <div style={{ background: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: '18px', padding: '1.5rem' }}>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Verified skills</div>
          <div style={{ fontSize: '2rem', fontWeight: 700, marginTop: '0.4rem' }}>{proofMetrics.totalVerifiedSkills}</div>
        </div>
        <div style={{ background: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: '18px', padding: '1.5rem' }}>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Learning hours</div>
          <div style={{ fontSize: '2rem', fontWeight: 700, marginTop: '0.4rem' }}>{proofMetrics.totalLearningHours}</div>
        </div>
        <div style={{ background: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: '18px', padding: '1.5rem' }}>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Strongest track</div>
          <div style={{ fontSize: '1.2rem', fontWeight: 700, marginTop: '0.4rem' }}>{topTracks[0]?.roleTitle || 'Build a track first'}</div>
        </div>
      </section>

      <div style={{ padding: '0 1rem' }}>
        <h2 style={{ fontSize: '2rem', margin: '0 0 0.5rem 0' }}>Resume Style Directions</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', margin: '0 0 2rem 0', maxWidth: '600px' }}>
          Pick a direction that matches the role you are targeting. The resume draft adapts to your verified learning proof, profile signals, and any source material you add above.
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
                  <button
                    style={{ width: '100%', padding: '12px', background: 'var(--brand)', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 600, cursor: 'pointer' }}
                    onClick={() => handleGeneratePortfolio(template.id)}
                    disabled={aiLoading && selectedTemplate === template.id}
                  >
                    {aiLoading && selectedTemplate === template.id ? 'Generating...' : 'Generate Resume Draft'}
                  </button>
               </div>
             </article>
           ))}
        </div>

        {resumeDraft && (
          <div style={{ marginTop: '3rem', background: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: '18px', padding: '2rem' }}>
            {resumeDraft.generationMode === 'fallback' ? (
              <div style={{ marginBottom: '1rem', background: 'rgba(251, 191, 36, 0.12)', border: '1px solid rgba(251, 191, 36, 0.3)', color: '#fbbf24', padding: '12px 14px', borderRadius: '12px', lineHeight: 1.6 }}>
                AI generation was unavailable, so this draft was built from your verified learning data, profile details, and uploaded context. You can keep editing it and download it normally.
              </div>
            ) : null}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
              <div>
                <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Editable Resume Draft</h2>
                <p style={{ color: 'var(--text-secondary)', margin: '0.4rem 0 0 0' }}>
                  The full draft is shown first so you can review it like a real resume. Edit below and watch the preview update live before download.
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button
                  style={{ background: 'var(--brand)', color: 'white', border: 'none', borderRadius: '10px', padding: '12px 18px', fontWeight: 600, cursor: 'pointer' }}
                  onClick={() => openResumePrintView(resumeDraft)}
                >
                  Download / Print PDF
                </button>
              </div>
            </div>

            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-color)', borderRadius: '18px', padding: '1.25rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                  <div style={{ background: 'rgba(15, 23, 42, 0.4)', borderRadius: '14px', padding: '1rem' }}>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>ATS Score</div>
                    <div style={{ fontSize: '2.2rem', fontWeight: 700, marginTop: '0.4rem' }}>{atsReview.score}/100</div>
                    <div style={{ color: 'var(--text-secondary)', marginTop: '0.4rem', lineHeight: 1.6 }}>
                      {atsReview.score >= 80 ? 'Strong draft. Final polish and targeting should make this application-ready.' : atsReview.score >= 60 ? 'Solid base. A few targeted changes will improve recruiter and ATS performance.' : 'Needs work before download. Use the checks below to strengthen the draft.'}
                    </div>
                  </div>
                  <div style={{ background: 'rgba(15, 23, 42, 0.4)', borderRadius: '14px', padding: '1rem' }}>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Job Match</div>
                    <div style={{ fontSize: '2.2rem', fontWeight: 700, marginTop: '0.4rem' }}>
                      {atsReview.keywordCoverage !== null ? `${atsReview.keywordCoverage}%` : 'N/A'}
                    </div>
                    <div style={{ color: 'var(--text-secondary)', marginTop: '0.4rem', lineHeight: 1.6 }}>
                      {atsReview.keywordCoverage !== null ? 'Keyword overlap between the resume draft and the current job description.' : 'Add a job description above to measure ATS alignment more accurately.'}
                    </div>
                  </div>
                  <div style={{ background: 'rgba(15, 23, 42, 0.4)', borderRadius: '14px', padding: '1rem' }}>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Before Download</div>
                    <ul style={{ margin: '0.7rem 0 0 0', paddingLeft: '1.1rem', lineHeight: 1.7 }}>
                      {atsReview.suggestions.slice(0, 3).map((suggestion, index) => (
                        <li key={`${suggestion}-${index}`}>{suggestion}</li>
                      ))}
                      {!atsReview.suggestions.length ? <li>Resume looks balanced across the key ATS checks.</li> : null}
                    </ul>
                  </div>
                </div>
              </div>

              <div style={{ background: '#fff', color: '#0f172a', borderRadius: '18px', padding: '2rem', boxShadow: '0 20px 40px rgba(15, 23, 42, 0.08)' }}>
                <div style={{ borderBottom: '2px solid #0f172a', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                  <h2 style={{ fontSize: '2rem', margin: 0 }}>{resumeDraft.basics.name}</h2>
                  <div style={{ color: '#334155', marginTop: '0.4rem', fontWeight: 600 }}>{resumeDraft.basics.headline}</div>
                  <div style={{ color: '#475569', marginTop: '0.4rem' }}>
                    {resumeDraft.basics.targetRole}{resumeDraft.basics.location ? ` • ${resumeDraft.basics.location}` : ''}
                  </div>
                </div>

                <section style={{ marginBottom: '1.25rem' }}>
                  <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.7rem' }}>Professional Summary</h3>
                  <p style={{ lineHeight: 1.7, margin: 0 }}>{resumeDraft.basics.summary}</p>
                </section>

                <section style={{ marginBottom: '1.25rem' }}>
                  <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.7rem' }}>Core Skills</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {resumeDraft.coreSkills.map((skill, index) => (
                      <span key={`${skill}-${index}`} style={{ background: '#e2e8f0', borderRadius: '999px', padding: '6px 10px', fontSize: '0.9rem' }}>{skill}</span>
                    ))}
                  </div>
                </section>

                <section style={{ marginBottom: '1.25rem' }}>
                  <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.7rem' }}>Learning Highlights</h3>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', lineHeight: 1.7 }}>
                    {resumeDraft.learningHighlights.map((item, index) => (
                      <li key={`${item}-${index}`}>{item}</li>
                    ))}
                  </ul>
                </section>

                <section style={{ marginBottom: '1.25rem' }}>
                  <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.7rem' }}>Experience Highlights</h3>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', lineHeight: 1.7 }}>
                    {resumeDraft.experienceHighlights.map((item, index) => (
                      <li key={`${item}-${index}`}>{item}</li>
                    ))}
                  </ul>
                </section>

                <section style={{ marginBottom: '1.25rem' }}>
                  <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.7rem' }}>Projects</h3>
                  <div style={{ display: 'grid', gap: '1rem' }}>
                    {resumeDraft.projects.map((project, index) => (
                      <div key={`${project.name}-${index}`} style={{ borderTop: index === 0 ? 'none' : '1px solid #e2e8f0', paddingTop: index === 0 ? 0 : '1rem' }}>
                        <input
                          value={project.name}
                          onChange={(e) => setResumeDraft((current) => ({
                            ...current,
                            projects: current.projects.map((item, itemIndex) => itemIndex === index ? { ...item, name: e.target.value } : item)
                          }))}
                          style={{ width: '100%', fontWeight: 700, fontSize: '1rem', background: 'transparent', border: 'none', color: '#0f172a', padding: 0, marginBottom: '0.3rem' }}
                        />
                        <input
                          value={project.subtitle}
                          onChange={(e) => setResumeDraft((current) => ({
                            ...current,
                            projects: current.projects.map((item, itemIndex) => itemIndex === index ? { ...item, subtitle: e.target.value } : item)
                          }))}
                          style={{ width: '100%', background: 'transparent', border: 'none', color: '#475569', padding: 0, marginBottom: '0.5rem' }}
                        />
                        <textarea
                          value={arrayToTextarea(project.bullets)}
                          onChange={(e) => setResumeDraft((current) => ({
                            ...current,
                            projects: current.projects.map((item, itemIndex) => itemIndex === index ? { ...item, bullets: textareaToArray(e.target.value) } : item)
                          }))}
                          rows={4}
                          style={{ width: '100%', background: '#f8fafc', border: '1px solid #e2e8f0', color: '#0f172a', padding: '10px', borderRadius: '10px', resize: 'vertical' }}
                        />
                      </div>
                    ))}
                  </div>
                </section>

                <section style={{ marginBottom: '1.25rem' }}>
                  <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.7rem' }}>Education</h3>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', lineHeight: 1.7 }}>
                    {resumeDraft.education.map((item, index) => (
                      <li key={`${item}-${index}`}>{item}</li>
                    ))}
                  </ul>
                </section>

                <section style={{ marginBottom: '1.25rem' }}>
                  <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.7rem' }}>ATS Keywords</h3>
                  <p style={{ lineHeight: 1.7, margin: 0 }}>{resumeDraft.atsKeywords.join(', ')}</p>
                </section>

                <section>
                  <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.7rem' }}>Context Used</h3>
                  {resumeDraft.retrievedContext?.length ? (
                    <ul style={{ margin: 0, paddingLeft: '1.2rem', lineHeight: 1.7 }}>
                      {resumeDraft.retrievedContext.map((item, index) => (
                        <li key={`${item}-${index}`}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p style={{ color: '#475569', margin: 0 }}>Only your tracked learning proof and profile details were used.</p>
                  )}
                </section>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-color)', borderRadius: '18px', padding: '1.5rem' }}>
                <div style={{ marginBottom: '1rem' }}>
                  <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Customize The Draft</h3>
                  <p style={{ color: 'var(--text-secondary)', margin: '0.4rem 0 0 0', lineHeight: 1.6 }}>
                    Edit below and the full resume preview above updates immediately. Work through the sections in order, then check the ATS score before downloading.
                  </p>
                </div>

                <div style={{ display: 'grid', gap: '1rem' }}>
                  <div style={{ background: 'rgba(0,0,0,0.05)', padding: '1rem 1.25rem', borderRadius: '14px', display: 'grid', gap: '0.8rem' }}>
                    <h3 style={{ margin: 0 }}>Basics</h3>
                    <input value={resumeDraft.basics.name} onChange={(e) => setResumeDraft((current) => ({ ...current, basics: { ...current.basics, name: e.target.value } }))} style={{ width: '100%', background: 'rgba(0,0,0,0.15)', border: '1px solid rgba(255,255,255,0.08)', color: 'white', padding: '12px', borderRadius: '10px' }} />
                    <input value={resumeDraft.basics.headline} onChange={(e) => setResumeDraft((current) => ({ ...current, basics: { ...current.basics, headline: e.target.value } }))} style={{ width: '100%', background: 'rgba(0,0,0,0.15)', border: '1px solid rgba(255,255,255,0.08)', color: 'white', padding: '12px', borderRadius: '10px' }} />
                    <input value={resumeDraft.basics.targetRole} onChange={(e) => setResumeDraft((current) => ({ ...current, basics: { ...current.basics, targetRole: e.target.value } }))} style={{ width: '100%', background: 'rgba(0,0,0,0.15)', border: '1px solid rgba(255,255,255,0.08)', color: 'white', padding: '12px', borderRadius: '10px' }} />
                    <input value={resumeDraft.basics.location} onChange={(e) => setResumeDraft((current) => ({ ...current, basics: { ...current.basics, location: e.target.value } }))} style={{ width: '100%', background: 'rgba(0,0,0,0.15)', border: '1px solid rgba(255,255,255,0.08)', color: 'white', padding: '12px', borderRadius: '10px' }} />
                    <textarea value={resumeDraft.basics.summary} onChange={(e) => setResumeDraft((current) => ({ ...current, basics: { ...current.basics, summary: e.target.value } }))} rows={6} style={{ width: '100%', background: 'rgba(0,0,0,0.15)', border: '1px solid rgba(255,255,255,0.08)', color: 'white', padding: '12px', borderRadius: '10px', resize: 'vertical' }} />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                    <div style={{ background: 'rgba(0,0,0,0.05)', padding: '1rem 1.25rem', borderRadius: '14px' }}>
                      <h3 style={{ marginTop: 0 }}>Core Skills</h3>
                      <textarea value={arrayToTextarea(resumeDraft.coreSkills)} onChange={(e) => setResumeDraft((current) => ({ ...current, coreSkills: textareaToArray(e.target.value) }))} rows={8} style={{ width: '100%', background: 'rgba(0,0,0,0.15)', border: '1px solid rgba(255,255,255,0.08)', color: 'white', padding: '12px', borderRadius: '10px', resize: 'vertical' }} />
                    </div>
                    <div style={{ background: 'rgba(0,0,0,0.05)', padding: '1rem 1.25rem', borderRadius: '14px' }}>
                      <h3 style={{ marginTop: 0 }}>ATS Keywords</h3>
                      <textarea value={arrayToTextarea(resumeDraft.atsKeywords)} onChange={(e) => setResumeDraft((current) => ({ ...current, atsKeywords: textareaToArray(e.target.value) }))} rows={8} style={{ width: '100%', background: 'rgba(0,0,0,0.15)', border: '1px solid rgba(255,255,255,0.08)', color: 'white', padding: '12px', borderRadius: '10px', resize: 'vertical' }} />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                    <div style={{ background: 'rgba(0,0,0,0.05)', padding: '1rem 1.25rem', borderRadius: '14px' }}>
                      <h3 style={{ marginTop: 0 }}>Learning Highlights</h3>
                      <textarea value={arrayToTextarea(resumeDraft.learningHighlights)} onChange={(e) => setResumeDraft((current) => ({ ...current, learningHighlights: textareaToArray(e.target.value) }))} rows={8} style={{ width: '100%', background: 'rgba(0,0,0,0.15)', border: '1px solid rgba(255,255,255,0.08)', color: 'white', padding: '12px', borderRadius: '10px', resize: 'vertical' }} />
                    </div>
                    <div style={{ background: 'rgba(0,0,0,0.05)', padding: '1rem 1.25rem', borderRadius: '14px' }}>
                      <h3 style={{ marginTop: 0 }}>Experience Highlights</h3>
                      <textarea value={arrayToTextarea(resumeDraft.experienceHighlights)} onChange={(e) => setResumeDraft((current) => ({ ...current, experienceHighlights: textareaToArray(e.target.value) }))} rows={8} style={{ width: '100%', background: 'rgba(0,0,0,0.15)', border: '1px solid rgba(255,255,255,0.08)', color: 'white', padding: '12px', borderRadius: '10px', resize: 'vertical' }} />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                    <div style={{ background: 'rgba(0,0,0,0.05)', padding: '1rem 1.25rem', borderRadius: '14px' }}>
                      <h3 style={{ marginTop: 0 }}>Education</h3>
                      <textarea value={arrayToTextarea(resumeDraft.education)} onChange={(e) => setResumeDraft((current) => ({ ...current, education: textareaToArray(e.target.value) }))} rows={5} style={{ width: '100%', background: 'rgba(0,0,0,0.15)', border: '1px solid rgba(255,255,255,0.08)', color: 'white', padding: '12px', borderRadius: '10px', resize: 'vertical' }} />
                    </div>
                    <div style={{ background: 'rgba(0,0,0,0.05)', padding: '1rem 1.25rem', borderRadius: '14px' }}>
                      <h3 style={{ marginTop: 0 }}>Improvement Suggestions</h3>
                      <textarea value={arrayToTextarea(resumeDraft.improvementSuggestions)} onChange={(e) => setResumeDraft((current) => ({ ...current, improvementSuggestions: textareaToArray(e.target.value) }))} rows={5} style={{ width: '100%', background: 'rgba(0,0,0,0.15)', border: '1px solid rgba(255,255,255,0.08)', color: 'white', padding: '12px', borderRadius: '10px', resize: 'vertical' }} />
                    </div>
                  </div>

                  <div style={{ background: 'rgba(0,0,0,0.05)', padding: '1rem 1.25rem', borderRadius: '14px' }}>
                    <h3 style={{ marginTop: 0 }}>Projects</h3>
                    <div style={{ display: 'grid', gap: '1rem' }}>
                      {resumeDraft.projects.map((project, index) => (
                        <div key={`${project.name}-${index}`} style={{ borderTop: index === 0 ? 'none' : '1px solid rgba(255,255,255,0.08)', paddingTop: index === 0 ? 0 : '1rem' }}>
                          <input
                            value={project.name}
                            onChange={(e) => setResumeDraft((current) => ({
                              ...current,
                              projects: current.projects.map((item, itemIndex) => itemIndex === index ? { ...item, name: e.target.value } : item)
                            }))}
                            style={{ width: '100%', fontWeight: 700, background: 'rgba(0,0,0,0.15)', border: '1px solid rgba(255,255,255,0.08)', color: 'white', padding: '12px', borderRadius: '10px', marginBottom: '0.5rem' }}
                          />
                          <input
                            value={project.subtitle}
                            onChange={(e) => setResumeDraft((current) => ({
                              ...current,
                              projects: current.projects.map((item, itemIndex) => itemIndex === index ? { ...item, subtitle: e.target.value } : item)
                            }))}
                            style={{ width: '100%', background: 'rgba(0,0,0,0.15)', border: '1px solid rgba(255,255,255,0.08)', color: 'white', padding: '12px', borderRadius: '10px', marginBottom: '0.5rem' }}
                          />
                          <textarea
                            value={arrayToTextarea(project.bullets)}
                            onChange={(e) => setResumeDraft((current) => ({
                              ...current,
                              projects: current.projects.map((item, itemIndex) => itemIndex === index ? { ...item, bullets: textareaToArray(e.target.value) } : item)
                            }))}
                            rows={5}
                            style={{ width: '100%', background: 'rgba(0,0,0,0.15)', border: '1px solid rgba(255,255,255,0.08)', color: 'white', padding: '12px', borderRadius: '10px', resize: 'vertical' }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ background: 'rgba(0,0,0,0.05)', padding: '1rem 1.25rem', borderRadius: '14px' }}>
                    <h3 style={{ marginTop: 0 }}>ATS Verification Checklist</h3>
                    <div style={{ display: 'grid', gap: '0.7rem' }}>
                      {atsReview.checks.map((check, index) => (
                        <div key={`${check.label}-${index}`} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <span style={{ color: check.passed ? '#10b981' : '#fbbf24', fontWeight: 700 }}>{check.passed ? 'PASS' : 'FIX'}</span>
                          <span>{check.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {aiError && <div style={{ color: 'red', marginTop: '1rem' }}>{aiError}</div>}
      </div>
    </main>
  );
}
