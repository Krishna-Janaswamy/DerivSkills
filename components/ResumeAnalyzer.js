'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import { TechGenSpinner } from '@/components/TechGenSpinner';

// ── Constants ───────────────────────────────────────────────────────────────────
const SEV_COLOR = { High: '#ef4444', Medium: '#f59e0b', Low: '#10b981' };
const scoreColor = (s) => !s ? 'var(--muted)' : s >= 90 ? '#10b981' : s >= 70 ? '#f59e0b' : '#ef4444';

const STEPS = [
  { id: 'personalInfo', icon: '👤', label: 'Personal Info',    desc: 'Name, contact, and links' },
  { id: 'summary',      icon: '📝', label: 'Summary',          desc: 'Your professional value proposition' },
  { id: 'experience',   icon: '💼', label: 'Experience',       desc: 'Work history and achievements' },
  { id: 'skills',       icon: '🛠',  label: 'Skills',           desc: 'Technical and soft skills' },
  { id: 'projects',     icon: '🚀', label: 'Projects',         desc: 'Portfolio and side projects' },
  { id: 'education',    icon: '🎓', label: 'Education',        desc: 'Degrees and institutions' },
  { id: 'certifications', icon: '📜', label: 'Certifications', desc: 'Credentials and courses' },
];

const EMPTY_CONTENT = {
  personalInfo: { name:'', email:'', phone:'', location:'', linkedin:'', github:'' },
  summary:'', experience:[], projects:[],
  skills:{ technical:[], soft:[] },
  education:[], certifications:[],
};

const card = {
  background:'var(--surface-color)', border:'1px solid var(--border-color)',
  borderRadius:'14px', boxShadow:'0 1px 4px rgba(0,0,0,0.06)',
};

const inp = {
  width:'100%', padding:'9px 12px', borderRadius:'8px',
  background:'var(--surface-muted)', border:'1px solid var(--border-color)',
  color:'var(--text-color)', fontSize:'0.88rem', outline:'none',
  boxSizing:'border-box', fontFamily:'inherit',
};

const _id = () => Math.random().toString(36).slice(2);

// ── Flatten content → plain text ─────────────────────────────────────────────
function flattenContent(c) {
  const lines = [];
  const pi = c.personalInfo || {};
  if (pi.name) lines.push(pi.name);
  if (pi.email) lines.push(pi.email);
  if (pi.location) lines.push(pi.location);
  if (c.summary) lines.push(c.summary);
  (c.experience||[]).forEach(e => { lines.push(`${e.role} at ${e.company} (${e.duration})`); (e.bullets||[]).forEach(b=>lines.push(b)); });
  lines.push((c.skills?.technical||[]).join(', '));
  (c.projects||[]).forEach(p=>lines.push(`${p.name}: ${p.description}`));
  (c.education||[]).forEach(e=>{
    const parts = [e.level, e.degree, e.specialization, e.institution, e.board, e.year, e.percentage].filter(Boolean);
    lines.push(parts.join(' '));
  });
  lines.push((c.certifications||[]).join(', '));
  return lines.join('\n');
}

function getSectionRawContent(stepId, content, fullResumeText) {
  switch (stepId) {
    case 'personalInfo': {
      // Always send the full resume text so the AI can extract real values.
      // The parsed personalInfo fields may be empty if PDF extraction was partial.
      if (fullResumeText && fullResumeText.length > 50) return fullResumeText;
      // Fallback: if we have some fields already filled, send those
      const existing = Object.entries(content.personalInfo || {})
        .filter(([, v]) => v)
        .map(([k, v]) => `${k}: ${v}`)
        .join('\n');
      return existing || 'No personal information available — user needs to fill in fields manually.';
    }
    case 'summary':      return content.summary || 'No summary written yet.';
    case 'experience':   return JSON.stringify(content.experience || []);
    case 'skills':       return JSON.stringify(content.skills || {});
    case 'projects':     return JSON.stringify(content.projects || []);
    case 'certifications': {
      // Pass role + existing certs + skills so AI recommends relevant standard certs
      const skills = (c.skills?.technical || []).slice(0, 15).join(', ');
      const existing = (c.certifications || []).join(', ') || 'None yet';
      return `Target role: ${r || 'Software Engineer'}\nSkills: ${skills}\nExisting certifications: ${existing}`;
    }
    case 'education':    return JSON.stringify(content.education || []);
    default: return '';
  }
}


// ════════════════════════════════════════════════════════════════════════════
export function ResumeAnalyzer() {
  const [phase, setPhase] = useState('upload');
  const [file, setFile] = useState(null);
  const [targetRole, setTargetRole] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [content, setContent] = useState(EMPTY_CONTENT);
  const [rawResumeText, setRawResumeText] = useState('');
  const [pastedText, setPastedText] = useState('');   // fallback: user pastes text directly
  const [analysis, setAnalysis] = useState(null);
  const [prevScore, setPrevScore] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [step, setStep] = useState(0);           // current wizard step 0-6
  const [error, setError] = useState('');
  const [processingStep, setProcessingStep] = useState('');

  const [suggestion, setSuggestion] = useState(null);
  const [suggLoading, setSuggLoading] = useState(false);
  const [appliedFlash, setAppliedFlash] = useState(false);
  const [scoreFlash, setScoreFlash] = useState(false);
  const [isPoorQuality, setIsPoorQuality] = useState(false); // PDF extraction was garbled

  // Visual flash when AI suggestion is applied
  const flash = () => { setAppliedFlash(true); setTimeout(() => setAppliedFlash(false), 1200); };

  const fileInputRef = useRef(null);
  const analyzeTimer = useRef(null);
  const contentRef   = useRef(content);
  contentRef.current = content;

  // ── Check if a section has enough content to suggest improvements ─────────
  const hasMeaningfulContent = (stepId, c) => {
    switch (stepId) {
      case 'personalInfo': return Object.values(c.personalInfo||{}).some(v=>v?.trim().length>0);
      case 'summary':      return (c.summary||'').trim().length > 40;
      case 'experience':   return c.experience?.length > 0 && c.experience.some(e=>(e.bullets||[]).length>0 || e.role || e.company);
      case 'skills':       return (c.skills?.technical||[]).length > 0;
      case 'projects':     return c.projects?.length > 0 && c.projects.some(p=>p.name||p.description);
      case 'education':    return c.education?.length > 0;
      case 'certifications': return true; // always show suggestions regardless of existing certs
      default: return false;
    }
  };

  // Auto-fetch suggestion on step change — ONLY if section already has content.
  // If empty, show a 'write first' prompt instead.
  useEffect(() => {
    if (phase !== 'wizard') return;
    setSuggestion(null);
    const stepId = STEPS[step].id;
    // Certifications and summary: never auto-fetch — user must manually trigger
    if (!['summary','certifications'].includes(stepId) && hasMeaningfulContent(stepId, contentRef.current)) {
      fetchStepSuggestion(stepId);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, phase]);

  // ── Fetch AI suggestion for current section ─────────────────────────────────
  const fetchStepSuggestion = async (stepId) => {
    setSuggLoading(true);
    try {
      const c = contentRef.current;
      const faultsForSection = (analysis?.faultAreas || []).filter(f => f.section === stepId);
      const res = await fetch('/api/suggest-fix', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: stepId,
          sectionContent: getSectionRawContent(stepId, c, rawResumeText),
          fullResumeText: rawResumeText || flattenContent(c),
          faultsForSection,
          targetRole,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        // Normalize — json_object mode may return fields in unexpected types
        // improved: always a string
        if (data.improved !== undefined && typeof data.improved !== 'string') {
          data.improved = Array.isArray(data.improved)
            ? data.improved.join('\n')
            : String(data.improved ?? '');
        }
        // changes: always an array of strings
        if (data.changes && !Array.isArray(data.changes)) {
          data.changes = typeof data.changes === 'string'
            ? data.changes.split(/[•\n]+/).map(s => s.trim()).filter(Boolean)
            : Object.values(data.changes);
        }
        if (!Array.isArray(data.changes)) data.changes = [];
        setSuggestion(data);
      }
    } catch (e) {
      console.error('[suggest]', e);
    } finally {
      setSuggLoading(false);
    }
  };

  // ── Initial scan ─────────────────────────────────────────────────────────────
  const handleInitialScan = async () => {
    const hasPaste = pastedText.trim().length > 80;
    if (!file && !hasPaste) { setError('Please upload a resume or paste your resume text.'); return; }
    try {
      setPhase('processing'); setError('');
      let resumeText = '';

      if (hasPaste) {
        // User pasted text directly — skip extraction
        resumeText = pastedText.trim();
      } else {
        setProcessingStep('Extracting text from your resume...');
        const fd = new FormData(); fd.append('file', file);
        const extRes = await fetch('/api/extract-resume-text', { method:'POST', body:fd });
        const extData = await extRes.json();
        if (!extRes.ok) {
          // Extraction failed — switch back to upload and suggest paste
          setPhase('upload');
          setError(extData.error + ' — or paste your resume text in the box below.');
          return;
        }
        resumeText = extData.text;
      }

      setRawResumeText(resumeText);

      setProcessingStep('Parsing resume into editable sections...');
      const parseRes = await fetch('/api/parse-resume', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ resumeText }),
      });
      const parseData = await parseRes.json();
      if (!parseRes.ok) throw new Error(parseData.error || 'Failed to parse resume.');
      const parsed = parseData.parsed;
      if (parseData.isPoorQuality) setIsPoorQuality(true);

      const newContent = {
        personalInfo: parsed.personalInfo || EMPTY_CONTENT.personalInfo,
        summary:      parsed.summary || '',
        experience:   (parsed.experience||[]).map(e=>({...e,id:_id()})),
        projects:     (parsed.projects||[]).map(p=>({...p,id:_id()})),
        skills:       parsed.skills || { technical:[], soft:[] },
        education:    (parsed.education||[]).map(e=>({...e,id:_id()})),
        certifications: parsed.certifications || [],
      };
      setContent(newContent);
      contentRef.current = newContent;
      if (parsed.detectedRole && !targetRole) setTargetRole(parsed.detectedRole);

      setProcessingStep('Running initial ATS analysis...');
      const aRes = await fetch('/api/analyze-resume', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ resumeText, jobDescription, targetRole: targetRole || parsed.detectedRole }),
      });
      const aData = await aRes.json();
      if (!aRes.ok) throw new Error(aData.error || 'ATS analysis failed.');
      setAnalysis(aData); setPrevScore(null);
      setStep(0);
      setPhase('wizard');
    } catch (err) {
      console.error(err);
      setError(err.message || 'Something went wrong.');
      setPhase('upload');
    }
  };

  // ── Debounced re-analyze after edits ────────────────────────────────────────
  const scheduleAnalysis = useCallback(() => {
    clearTimeout(analyzeTimer.current);
    analyzeTimer.current = setTimeout(async () => {
      setIsAnalyzing(true);
      try {
        const text = flattenContent(contentRef.current);
        if (text.trim().length < 50) return;
        const res = await fetch('/api/analyze-resume', {
          method:'POST', headers:{'Content-Type':'application/json'},
          body: JSON.stringify({ resumeText: text, jobDescription, targetRole }),
        });
        if (res.ok) {
          const data = await res.json();
          setAnalysis(prev => {
            if (prev) setPrevScore(prev.overallScore);
            return data;
          });
          // Pulse the score ring so user notices the update
          setScoreFlash(true);
          setTimeout(() => setScoreFlash(false), 1500);
        }
      } finally { setIsAnalyzing(false); }
    }, 2000);
  }, [jobDescription, targetRole]);

  const updateContent = useCallback((updater) => {
    setContent(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      contentRef.current = next;
      return next;
    });
    scheduleAnalysis();
    // Re-fetch suggestion if the section now has content (handles empty→written case)
    const stepId = STEPS[step]?.id;
    if (stepId && !suggestion && !suggLoading && hasMeaningfulContent(stepId, contentRef.current)) {
      fetchStepSuggestion(stepId);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scheduleAnalysis, step]);

  // ── Apply AI fix to content ──────────────────────────────────────────────────
  const applyFix = (stepId, sugg) => {
    if (!sugg?.improved) return;
    const text = sugg.improved.trim();


    switch (stepId) {

      case 'personalInfo': {
        // Parse strict "field: value" lines only — reject anything else (raw JSON, headers, etc.)
        const VALID_FIELDS = { name:1, fullname:'name', email:1, phone:1, mobile:'phone',
          location:1, city:'location', linkedin:1, github:1 };
        const updates = {};
        text.split('\n').forEach(line => {
          // Must match exactly: word(s): non-empty value
          const match = line.match(/^([a-zA-Z][a-zA-Z ]*?):\s*(.+)$/);
          if (!match) return;
          const rawKey = match[1].trim().toLowerCase().replace(/\s+/g,''); // 'full name' -> 'fullname'
          const val = match[2].trim();
          if (!val || val.startsWith('{') || val.startsWith('[') || val.startsWith('"')) return; // reject JSON
          const mapped = typeof VALID_FIELDS[rawKey] === 'string' ? VALID_FIELDS[rawKey] : (VALID_FIELDS[rawKey] ? rawKey : null);
          if (mapped) updates[mapped] = val;
        });
        if (Object.keys(updates).length > 0) {
          updateContent(c => ({ ...c, personalInfo: { ...c.personalInfo, ...updates } }));
          flash();
        }
        break;
      }

      case 'summary':
        updateContent(c => ({ ...c, summary: text }));
        flash();
        break;

      case 'experience': {
        // Only keep lines that start with a bullet marker — discard any
        // role/company/date header lines the AI may accidentally include.
        const bullets = text
          .split('\n')
          .map(l => l.trim())
          .filter(l => /^[\u2022\-\*>]/.test(l))   // must start with bullet char
          .map(l => l.replace(/^[\u2022\-\*>]\s*/, '').trim())
          .filter(Boolean);

        if (bullets.length > 0) {
          updateContent(c => ({
            ...c,
            experience: c.experience.length > 0
              ? c.experience.map((exp, i) => i === 0 ? { ...exp, bullets } : exp)
              : [{ id: _id(), company: '', role: '', duration: '', bullets }],
          }));
          flash();
        } else {
          // Fallback: if AI didn’t use bullet chars, take all non-empty lines
          const fallbackBullets = text.split('\n').map(l => l.trim()).filter(Boolean);
          if (fallbackBullets.length > 0) {
            updateContent(c => ({
              ...c,
              experience: c.experience.length > 0
                ? c.experience.map((exp, i) => i === 0 ? { ...exp, bullets: fallbackBullets } : exp)
                : [{ id: _id(), company: '', role: '', duration: '', bullets: fallbackBullets }],
            }));
            flash();
          }
        }
        break;
      }

      case 'skills': {
        const toAdd = text.split(',').map(s => s.trim()).filter(Boolean);
        if (toAdd.length > 0) {
          updateContent(c => ({
            ...c,
            skills: { ...c.skills, technical: [...new Set([...(c.skills?.technical || []), ...toAdd])] },
          }));
          flash();
        }
        break;
      }

      case 'projects': {
        updateContent(c => ({
          ...c,
          projects: c.projects.length > 0
            ? c.projects.map((p, i) => i === 0 ? { ...p, description: text } : p)
            : [{ id: _id(), name: '', tech: '', description: text, link: '' }],
        }));
        flash();
        break;
      }

      case 'education': {
        // API returns lines like "B.Tech CS | IIT Bombay | 2019–2023"
        const newEntries = text.split('\n')
          .map(line => {
            const parts = line.split('|').map(p => p.trim());
            if (parts.length >= 2) return { id: _id(), degree: parts[0]||'', institution: parts[1]||'', year: parts[2]||'' };
            return null;
          }).filter(Boolean);
        if (newEntries.length > 0) {
          updateContent(c => ({ ...c, education: [...c.education, ...newEntries] }));
          flash();
        }
        break;
      }

      case 'certifications': {
        const newCerts = text.split(',').map(s => s.trim()).filter(Boolean);
        updateContent(c => ({ ...c, certifications: [...new Set([...(c.certifications || []), ...newCerts])] }));
        flash();
        break;
      }

      default:
        updateContent(c => c);
        break;
    }
  };

  // ── Download ─────────────────────────────────────────────────────────────────
  const handleDownload = () => {
    const html = buildResumeHTML(content, targetRole);
    const blob = new Blob([html], { type:'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `${(content.personalInfo.name||'Resume').replace(/\s+/g,'_')}_ATS_Resume.html`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const score = analysis?.overallScore ?? null;
  const scoreDelta = (analysis && prevScore != null) ? analysis.overallScore - prevScore : null;
  const isDownloadReady = (score ?? 0) >= 90;
  const faultsBySection = (analysis?.faultAreas||[]).reduce((acc,f)=>{ acc[f.section]=(acc[f.section]||0)+1; return acc; }, {});
  const currentStepId = STEPS[step]?.id;
  const currentFaults = (analysis?.faultAreas||[]).filter(f => f.section === currentStepId);

  // ════════════════════════════════════════════════════════════════════════════
  return (
    <div>
      {/* ── UPLOAD ────────────────────────────────────────────────────────── */}
      {phase === 'upload' && (
        <main className="page-shell">
          <div style={{ ...card, padding:'2rem', marginBottom:'2rem' }}>
            <p className="section-kicker" style={{ margin:'0 0 0.8rem' }}>AI Resume Studio</p>
            <h1 className="page-title" style={{ margin:'0 0 0.8rem', fontSize:'2.2rem' }}>
              Step-by-Step ATS Resume Builder
            </h1>
            <p className="page-subtitle" style={{ margin:'0 0 1.2rem', lineHeight:1.7 }}>
              Upload your resume → AI parses it → you walk through each section step-by-step
              with <strong>specific AI suggestions on your actual content</strong> → live ATS score updates as you fix →
              download once you hit <strong style={{ color:'#10b981' }}>90+</strong>.
            </p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:'0.5rem' }}>
              {['📤 Auto-parse PDF','🔢 Step-by-step wizard','⚡ AI rewrites your content','📊 Live ATS score','⬇ Download at 90+'].map(f=>(
                <span key={f} className="section-kicker" style={{ margin:0, fontSize:'0.73rem' }}>{f}</span>
              ))}
            </div>
          </div>

          {error && <ErrorBanner msg={error} onClose={()=>setError('')}/>}

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px,1fr))', gap:'1.5rem' }}>
            {/* Drop zone */}
            <div
              onDragOver={e=>e.preventDefault()}
              onDrop={e=>{ e.preventDefault(); if(e.dataTransfer.files?.[0]){setFile(e.dataTransfer.files[0]);setError('');} }}
              onClick={()=>fileInputRef.current.click()}
              style={{ ...card, textAlign:'center', cursor:'pointer', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'2.8rem 2rem', position:'relative', border:`2px dashed ${file?'var(--brand)':'var(--border-color)'}`, background:file?'rgba(37,99,235,0.04)':'var(--surface-color)', transition:'all 0.2s' }}
            >
              <span style={{ position:'absolute', top:'10px', right:'10px', background:'rgba(239,68,68,0.1)', color:'#ef4444', border:'1px solid rgba(239,68,68,0.2)', fontSize:'0.68rem', fontWeight:700, padding:'0.12rem 0.5rem', borderRadius:'20px' }}>REQUIRED</span>
              <input type="file" accept=".pdf,.txt" ref={fileInputRef} onChange={e=>{if(e.target.files?.[0]){setFile(e.target.files[0]);setError('');}}} style={{display:'none'}}/>
              <div style={{ fontSize:'2.8rem', marginBottom:'0.8rem' }}>{file?'✅':'📄'}</div>
              <h3 style={{ margin:'0 0 0.3rem', color:file?'var(--brand)':'var(--text-color)', fontWeight:600 }}>{file?`✓ ${file.name}`:'Drop your resume here'}</h3>
              <p style={{ color:'var(--muted)', fontSize:'0.85rem', margin:0 }}>{file?'Click to replace':'PDF or TXT · Click to browse'}</p>
            </div>

            {/* Options */}
            <div style={{ ...card, padding:'1.5rem', display:'flex', flexDirection:'column', gap:'1rem' }}>
              <div>
                <FieldLabel>Target Role <span style={{color:'var(--muted)',fontWeight:400}}>(optional — AI detects it)</span></FieldLabel>
                <input type="text" value={targetRole} onChange={e=>setTargetRole(e.target.value)} placeholder="e.g. Senior Frontend Engineer" style={inp}/>
              </div>
              <div style={{ flex:1, display:'flex', flexDirection:'column' }}>
                <FieldLabel>Job Description <span style={{color:'var(--muted)',fontWeight:400}}>(optional)</span></FieldLabel>
                <textarea value={jobDescription} onChange={e=>setJobDescription(e.target.value)} placeholder="Paste JD for keyword matching..." rows={4} style={{...inp,resize:'vertical',flex:1}}/>
              </div>
              <button onClick={handleInitialScan} disabled={!file && pastedText.trim().length < 80}
                style={{ padding:'0.9rem', borderRadius:'10px', border:'none', fontWeight:700, fontSize:'1rem',
                  background:(file||pastedText.trim().length>=80)?'var(--brand)':'var(--surface-muted)',
                  color:(file||pastedText.trim().length>=80)?'white':'var(--muted)',
                  cursor:(file||pastedText.trim().length>=80)?'pointer':'not-allowed',
                  boxShadow:(file||pastedText.trim().length>=80)?'0 4px 14px rgba(37,99,235,0.25)':'none', transition:'all 0.2s' }}>
                {(file||pastedText.trim().length>=80)?'🚀 Start Step-by-Step Wizard':'⬆ Upload Resume or Paste Text'}
              </button>
            </div>
          </div>

          {/* Paste fallback */}
          <div style={{ ...card, padding:'1.5rem', marginTop:'1.5rem' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'0.8rem', marginBottom:'0.8rem' }}>
              <div style={{ flex:1, height:'1px', background:'var(--border-color)' }}/>
              <span style={{ color:'var(--muted)', fontSize:'0.8rem', fontWeight:600 }}>OR PASTE YOUR RESUME TEXT</span>
              <div style={{ flex:1, height:'1px', background:'var(--border-color)' }}/>
            </div>
            <p style={{ color:'var(--muted)', fontSize:'0.82rem', margin:'0 0 0.7rem', lineHeight:1.5 }}>
              If your PDF is not being read correctly, copy all text from your resume (Ctrl+A → Ctrl+C in your PDF viewer) and paste it here.
            </p>
            <textarea
              value={pastedText}
              onChange={e => setPastedText(e.target.value)}
              placeholder="Paste your full resume text here..."
              rows={8}
              style={{ ...inp, resize:'vertical', lineHeight:1.6 }}
            />
            {pastedText.trim().length >= 80 && (
              <p style={{ color:'#10b981', fontSize:'0.78rem', margin:'0.4rem 0 0', fontWeight:500 }}>
                ✓ {pastedText.trim().split(/\s+/).length} words detected — click the button above to analyze
              </p>
            )}
          </div>
        </main>
      )}


      {/* ── PROCESSING ────────────────────────────────────────────────────── */}
      {phase === 'processing' && (
        <main className="page-shell" style={{ display:'grid', placeItems:'center', minHeight:'60vh' }}>
          <div style={{ textAlign:'center' }}>
            <TechGenSpinner text={processingStep}/>
            <div style={{ display:'flex', gap:'0.5rem', justifyContent:'center', marginTop:'2rem', alignItems:'center' }}>
              {['Extract','Parse','Analyze'].map((s,i)=>{
                const idx = processingStep.includes('Extract')?0:processingStep.includes('Pars')?1:2;
                return (<React.Fragment key={s}>
                  <div style={{ display:'flex', alignItems:'center', gap:'0.35rem' }}>
                    <div style={{ width:'24px', height:'24px', borderRadius:'50%', background:i<=idx?'var(--brand)':'var(--surface-muted)', border:`1px solid ${i<=idx?'var(--brand)':'var(--border-color)'}`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.7rem', fontWeight:700, color:i<=idx?'white':'var(--muted)' }}>{i<idx?'✓':i+1}</div>
                    <span style={{ color:i<=idx?'var(--text-color)':'var(--muted)', fontSize:'0.82rem', fontWeight:i<=idx?600:400 }}>{s}</span>
                  </div>
                  {i<2&&<div style={{ width:'28px', height:'1px', background:'var(--border-color)' }}/>}
                </React.Fragment>);
              })}
            </div>
            <p style={{ color:'var(--muted)', marginTop:'0.8rem', fontSize:'0.82rem' }}>10–25 seconds · please do not refresh</p>
          </div>
        </main>
      )}

      {/* ── WIZARD ────────────────────────────────────────────────────────── */}
      {phase === 'wizard' && (
        <div style={{ display:'flex', flexDirection:'column', height:'calc(100vh - 84px)' }}>

          {/* ── Top bar: step progress + live score ───────────────────── */}
          <div style={{ background:'var(--surface-color)', borderBottom:'1px solid var(--border-color)', padding:'0 1.5rem', flexShrink:0, display:'flex', alignItems:'center', gap:'1.5rem', height:'56px' }}>
            {/* Step pills */}
            <div style={{ display:'flex', gap:'4px', flex:1, overflowX:'auto' }}>
              {STEPS.map((s,i) => {
                const faults = faultsBySection[s.id]||0;
                const sScore = analysis?.sectionScores?.[s.id];
                const isActive = i===step;
                const isDone = i<step;
                return (
                  <button key={s.id} onClick={()=>setStep(i)}
                    style={{ display:'flex', alignItems:'center', gap:'6px', padding:'5px 12px', borderRadius:'999px', border:`1px solid ${isActive?'var(--brand)':isDone&&!faults?'rgba(16,185,129,0.3)':faults?'rgba(239,68,68,0.25)':'var(--border-color)'}`, background:isActive?'rgba(37,99,235,0.08)':isDone&&!faults?'rgba(16,185,129,0.06)':'transparent', cursor:'pointer', whiteSpace:'nowrap', transition:'all 0.15s' }}>
                    <span style={{ fontSize:'0.75rem' }}>{isDone&&!faults?'✓':s.icon}</span>
                    <span style={{ fontSize:'0.78rem', fontWeight:isActive?700:500, color:isActive?'var(--brand)':isDone&&!faults?'#10b981':'var(--text-secondary)' }}>{s.label}</span>
                    {/* Section score badge */}
                    {sScore != null && (
                      <span style={{ background:sScore>=75?'rgba(16,185,129,0.15)':sScore>=50?'rgba(245,158,11,0.15)':'rgba(239,68,68,0.12)', color:sScore>=75?'#059669':sScore>=50?'#d97706':'#ef4444', fontSize:'0.62rem', fontWeight:700, padding:'1px 5px', borderRadius:'8px', lineHeight:1.4 }}>{sScore}</span>
                    )}
                    {faults>0&&<span style={{ background:'rgba(239,68,68,0.12)', color:'#ef4444', fontSize:'0.65rem', fontWeight:700, padding:'0 5px', borderRadius:'10px' }}>{faults}</span>}
                  </button>
                );
              })}
            </div>
            {/* Live Score */}
            <div style={{ display:'flex', alignItems:'center', gap:'0.6rem', flexShrink:0, borderLeft:'1px solid var(--border-color)', paddingLeft:'1.2rem' }}>
              {isAnalyzing && <span style={{ color:'#f59e0b', fontSize:'0.73rem' }}>⟳ updating...</span>}
              <div style={{ display:'flex', alignItems:'baseline', gap:'4px' }}>
                <span style={{
                    fontSize:'1.5rem', fontWeight:800, color:scoreColor(score), lineHeight:1,
                    display:'inline-block',
                    transition:'transform 0.3s ease, color 0.4s',
                    transform: scoreFlash ? 'scale(1.25)' : 'scale(1)',
                  }}>{score??'—'}</span>
                <span style={{ fontSize:'0.7rem', color:'var(--muted)' }}>/100</span>
              </div>
              {scoreDelta!==null&&scoreDelta!==0&&(
                <span style={{ background:scoreDelta>0?'rgba(16,185,129,0.1)':'rgba(239,68,68,0.1)', color:scoreDelta>0?'#10b981':'#ef4444', border:`1px solid ${scoreDelta>0?'#10b981':'#ef4444'}`, fontSize:'0.72rem', fontWeight:700, padding:'2px 7px', borderRadius:'12px' }}>
                  {scoreDelta>0?'+':''}{scoreDelta}
                </span>
              )}
              {isDownloadReady&&(
                <button onClick={handleDownload} style={{ padding:'6px 14px', borderRadius:'8px', border:'none', background:'#10b981', color:'white', fontWeight:700, cursor:'pointer', fontSize:'0.78rem', boxShadow:'0 2px 8px rgba(16,185,129,0.3)' }}>⬇ Download</button>
              )}
            </div>
          </div>

          {/* ── Wizard body ───────────────────────────────────────────── */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 380px', flex:1, overflow:'hidden', background:'var(--bg-color)' }}>

            {/* LEFT: Editor ─────────────────────────────────────────── */}
            <div style={{ overflowY:'auto', padding:'1.5rem 2rem', display:'flex', flexDirection:'column', gap:'1.5rem' }}>
              {/* Section header */}
              <div>
                <div style={{ display:'flex', alignItems:'center', gap:'0.6rem', marginBottom:'0.3rem' }}>
                  <span style={{ fontSize:'1.6rem' }}>{STEPS[step].icon}</span>
                  <div>
                    <h2 style={{ margin:0, fontSize:'1.2rem', fontWeight:700, color:'var(--text-color)' }}>
                      Step {step+1} of {STEPS.length}: {STEPS[step].label}
                    </h2>
                    <p style={{ margin:0, color:'var(--muted)', fontSize:'0.85rem' }}>{STEPS[step].desc}</p>
                  </div>
                </div>
                {/* Progress bar */}
                <div style={{ background:'var(--surface-muted)', borderRadius:'4px', height:'4px', marginTop:'0.8rem', overflow:'hidden' }}>
                  <div style={{ height:'100%', width:`${((step+1)/STEPS.length)*100}%`, background:'var(--brand)', borderRadius:'4px', transition:'width 0.3s ease' }}/>
                </div>
              </div>

              {/* Editor */}
              <div style={{ ...card, padding:'1.5rem' }}>
                {currentStepId==='personalInfo' && isPoorQuality && (
                  <div style={{ background:'rgba(245,158,11,0.08)', border:'1px solid rgba(245,158,11,0.35)', borderRadius:'10px', padding:'0.8rem 1rem', marginBottom:'0.5rem', display:'flex', gap:'0.6rem', alignItems:'flex-start' }}>
                    <span style={{ fontSize:'1.1rem', flexShrink:0 }}>⚠️</span>
                    <div>
                      <p style={{ margin:'0 0 0.2rem', fontWeight:700, fontSize:'0.83rem', color:'#92400e' }}>PDF font couldn't be decoded</p>
                      <p style={{ margin:0, fontSize:'0.78rem', color:'#92400e', lineHeight:1.5 }}>
                        Your PDF uses custom/embedded fonts that couldn't be read. Fields below may be empty or incorrect — please fill them in manually. Or save your resume as <strong>.txt</strong> and re-upload for better results.
                      </p>
                    </div>
                  </div>
                )}
                {currentStepId==='personalInfo'  && <PersonalInfoEditor data={content.personalInfo} onChange={pi=>updateContent(c=>({...c,personalInfo:{...c.personalInfo,...pi}}))}/>}
                {currentStepId==='summary'        && <SummaryEditor value={content.summary} onChange={v=>updateContent(c=>({...c,summary:v}))}/>}
                {currentStepId==='experience'     && <ExperienceEditor items={content.experience} onChange={exp=>updateContent(c=>({...c,experience:exp}))}/>}
                {currentStepId==='skills'         && <SkillsEditor data={content.skills} onChange={skills=>updateContent(c=>({...c,skills}))}/>}
                {currentStepId==='projects'       && <ProjectsEditor items={content.projects} onChange={p=>updateContent(c=>({...c,projects:p}))}/>}
                {currentStepId==='education'      && <EducationEditor items={content.education} onChange={ed=>updateContent(c=>({...c,education:ed}))}/>}
                {currentStepId==='certifications' && <CertificationsEditor items={content.certifications} onChange={certs=>updateContent(c=>({...c,certifications:certs}))}/>}
              </div>

              {/* Prev / Next */}
              <div style={{ display:'flex', justifyContent:'space-between', gap:'1rem' }}>
                <button onClick={()=>setStep(s=>Math.max(0,s-1))} disabled={step===0}
                  style={{ padding:'0.7rem 1.5rem', borderRadius:'10px', border:'1px solid var(--border-color)', background:'var(--surface-color)', color:step===0?'var(--muted)':'var(--text-color)', cursor:step===0?'not-allowed':'pointer', fontWeight:600, fontSize:'0.9rem' }}>
                  ← Previous
                </button>
                {step < STEPS.length-1 ? (
                  <button onClick={()=>setStep(s=>s+1)}
                    style={{ padding:'0.7rem 1.8rem', borderRadius:'10px', border:'none', background:'var(--brand)', color:'white', cursor:'pointer', fontWeight:700, fontSize:'0.9rem', boxShadow:'0 4px 12px rgba(37,99,235,0.25)' }}>
                    Next: {STEPS[step+1].label} →
                  </button>
                ) : (
                  <button onClick={handleDownload} disabled={!isDownloadReady}
                    style={{ padding:'0.7rem 1.8rem', borderRadius:'10px', border:'none', background:isDownloadReady?'#10b981':'var(--surface-muted)', color:isDownloadReady?'white':'var(--muted)', cursor:isDownloadReady?'pointer':'not-allowed', fontWeight:700, fontSize:'0.9rem', boxShadow:isDownloadReady?'0 4px 12px rgba(16,185,129,0.3)':'none' }}>
                    {isDownloadReady?'⬇ Download ATS Resume':`Reach 90 to download (${90-(score||0)} pts left)`}
                  </button>
                )}
              </div>
            </div>

            {/* RIGHT: AI Assistant panel ───────────────────────────── */}
            <div style={{ borderLeft:'1px solid var(--border-color)', overflowY:'auto', background:'var(--surface-color)', display:'flex', flexDirection:'column' }}>

              {/* Section score */}
              {analysis?.sectionScores && (
                <div style={{ padding:'1rem 1.2rem', borderBottom:'1px solid var(--border-color)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                  <div>
                    <p style={{ margin:0, fontSize:'0.72rem', color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.07em', fontWeight:700 }}>Section Score</p>
                    <p style={{ margin:0, fontSize:'1.4rem', fontWeight:800, color:scoreColor(analysis.sectionScores[currentStepId]) }}>{analysis.sectionScores[currentStepId]??'—'}<span style={{ fontSize:'0.75rem', color:'var(--muted)', fontWeight:400 }}>/100</span></p>
                  </div>
                  <button onClick={()=>{setSuggestion(null);fetchStepSuggestion(currentStepId);}} style={{ padding:'6px 12px', borderRadius:'8px', border:'1px solid var(--border-color)', background:'var(--surface-muted)', color:'var(--text-secondary)', cursor:'pointer', fontSize:'0.75rem', fontWeight:600 }}>↻ Refresh</button>
                </div>
              )}

              {/* Faults for this section */}
              {currentFaults.length > 0 && (
                <div style={{ padding:'0.8rem 1rem', borderBottom:'1px solid var(--border-color)' }}>
                  <p style={{ margin:'0 0 0.5rem', fontSize:'0.72rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.07em', color:'var(--muted)' }}>⚠ Faults Found</p>
                  {currentFaults.map((f,i)=>(
                    <div key={i} style={{ borderLeft:`3px solid ${SEV_COLOR[f.severity]||'var(--muted)'}`, padding:'0.5rem 0.7rem', borderRadius:'0 7px 7px 0', background:`${SEV_COLOR[f.severity]||'#8888'}08`, marginBottom:'0.5rem' }}>
                      <p style={{ margin:'0 0 0.2rem', fontWeight:600, fontSize:'0.78rem', color:'var(--text-color)' }}>{f.category} <span style={{ color:SEV_COLOR[f.severity], fontSize:'0.68rem', fontWeight:700 }}>{f.severity}</span></p>
                      <p style={{ margin:'0 0 0.3rem', color:'var(--text-secondary)', fontSize:'0.75rem', lineHeight:1.4 }}>{f.issue}</p>
                      <p style={{ margin:0, color:'#059669', fontSize:'0.74rem', lineHeight:1.4 }}><strong>Fix: </strong>{f.suggestion}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* AI suggestion panel — Experience, Skills, Summary (manual), Certifications (manual) */}
              {['summary','experience','skills','certifications'].includes(currentStepId) && (
              <div style={{ flex:1, padding:'1rem' }}>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'0.8rem' }}>
                  <p style={{ margin:0, fontSize:'0.72rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.07em', color:'var(--muted)' }}>
                    {currentStepId === 'certifications' ? '🏅 Suggested Certs' : '✨ AI Improvement'}
                  </p>
                  {suggestion && <span style={{ background:'rgba(16,185,129,0.1)', color:'#10b981', fontSize:'0.68rem', fontWeight:600, padding:'2px 8px', borderRadius:'10px', border:'1px solid rgba(16,185,129,0.2)' }}>Role-specific</span>}
                </div>

                {suggLoading && (
                  <div style={{ textAlign:'center', padding:'2rem 1rem', color:'var(--muted)' }}>
                    <div style={{ fontSize:'1.5rem', marginBottom:'0.5rem' }}>🤖</div>
                    <p style={{ fontSize:'0.83rem', margin:'0 0 0.3rem', fontWeight:500, color:'var(--text-secondary)' }}>Analyzing your {STEPS[step].label}...</p>
                    <p style={{ fontSize:'0.75rem', margin:0 }}>AI is reading your actual content</p>
                  </div>
                )}

                {!suggLoading && !suggestion && !hasMeaningfulContent(currentStepId, content) && (
                  <div style={{ textAlign:'center', padding:'1.5rem 1rem' }}>
                    <div style={{ fontSize:'1.8rem', marginBottom:'0.5rem' }}>✏️</div>
                    <p style={{ fontSize:'0.83rem', fontWeight:600, color:'var(--text-secondary)', margin:'0 0 0.3rem' }}>
                      Add some content above first
                    </p>
                    <p style={{ fontSize:'0.75rem', color:'var(--muted)', margin:'0 0 1rem', lineHeight:1.5 }}>
                      Once you write your {STEPS[step].label}, AI will suggest specific improvements.
                    </p>
                  </div>
                )}

                {!suggLoading && !suggestion && hasMeaningfulContent(currentStepId, content) && (
                  <div style={{ textAlign:'center', padding:'1rem' }}>
                    <button onClick={() => fetchStepSuggestion(currentStepId)}
                      style={{ padding:'0.6rem 1.2rem', borderRadius:'8px', border:'none', background:'var(--brand)', color:'white', fontWeight:700, cursor:'pointer', fontSize:'0.83rem' }}>
                      ✨ Get AI Suggestions
                    </button>
                  </div>
                )}

                {!suggLoading && suggestion && (
                  <div style={{ display:'flex', flexDirection:'column', gap:'0.9rem' }}>

                        {/* ── Per-section granular controls ─────────────── */}

                        {/* PERSONAL INFO — per field apply (already individual) */}
                        {currentStepId === 'personalInfo' && (() => {
                          const fieldLines = (suggestion.improved || '')
                            .split('\n').map(l => l.trim())
                            .filter(l => /^[a-zA-Z][a-zA-Z ]*?:\s*.+$/.test(l) && !l.startsWith('{'));
                          if (!fieldLines.length) return <p style={{color:'var(--muted)',fontSize:'0.82rem',margin:0}}>No extractable fields found — edit the fields above manually.</p>;
                          return (
                            <div style={{display:'flex',flexDirection:'column',gap:'0.4rem'}}>
                              {fieldLines.map((line, i) => {
                                const colonIdx = line.indexOf(':');
                                const field = line.slice(0, colonIdx).trim();
                                const value = line.slice(colonIdx + 1).trim();
                                return (
                                  <div key={i} style={{display:'flex',alignItems:'center',justifyContent:'space-between',background:'var(--surface-muted)',borderRadius:'7px',padding:'0.45rem 0.7rem',border:'1px solid var(--border-color)'}}>
                                    <div style={{flex:1,minWidth:0}}>
                                      <span style={{color:'var(--muted)',fontSize:'0.65rem',fontWeight:700,textTransform:'uppercase'}}>{field}</span>
                                      <p style={{margin:0,color:'var(--text-color)',fontSize:'0.83rem',fontWeight:500,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{value}</p>
                                    </div>
                                    <button onClick={() => {
                                      const VALID = {name:1,fullname:'name',email:1,phone:1,mobile:'phone',location:1,linkedin:1,github:1};
                                      const rawKey = field.toLowerCase().replace(/\s+/g,'');
                                      const mapped = typeof VALID[rawKey]==='string'?VALID[rawKey]:(VALID[rawKey]?rawKey:null);
                                      if(mapped){ updateContent(c=>({...c,personalInfo:{...c.personalInfo,[mapped]:value}})); flash(); }
                                    }} style={{padding:'3px 12px',borderRadius:'6px',border:'1px solid var(--brand)',background:'transparent',color:'var(--brand)',cursor:'pointer',fontSize:'0.72rem',fontWeight:700,flexShrink:0,marginLeft:'0.6rem'}}>
                                      + Use
                                    </button>
                                  </div>
                                );
                              })}
                            </div>
                          );
                        })()}

                        {/* EXPERIENCE — each bullet individually addable */}
                        {currentStepId === 'experience' && (() => {
                          const bullets = (suggestion.improved || '').split('\n')
                            .map(l => l.trim())
                            .filter(l => /^[•\-\*>]/.test(l))
                            .map(l => l.replace(/^[•\-\*>]\s*/, '').trim())
                            .filter(Boolean);
                          const fallback = bullets.length === 0
                            ? (suggestion.improved || '').split('\n').map(l=>l.trim()).filter(Boolean)
                            : [];
                          const items = bullets.length > 0 ? bullets : fallback;
                          if (!items.length) return <p style={{color:'var(--muted)',fontSize:'0.82rem',margin:0}}>No bullet points found.</p>;
                          return (
                            <div style={{display:'flex',flexDirection:'column',gap:'0.35rem'}}>
                              <p style={{margin:'0 0 0.3rem',fontSize:'0.7rem',fontWeight:700,color:'var(--muted)',textTransform:'uppercase'}}>Click + to add individual bullets to your resume</p>
                              {items.map((bullet, i) => (
                                <div key={i} style={{display:'flex',alignItems:'flex-start',gap:'0.5rem',background:'var(--surface-muted)',borderRadius:'7px',padding:'0.45rem 0.6rem',border:'1px solid var(--border-color)'}}>
                                  <span style={{color:'var(--brand)',fontWeight:700,flexShrink:0,marginTop:'1px'}}>•</span>
                                  <p style={{margin:0,flex:1,color:'var(--text-color)',fontSize:'0.81rem',lineHeight:1.55}}>{bullet}</p>
                                  <button onClick={() => {
                                    updateContent(c => ({
                                      ...c,
                                      experience: c.experience.length > 0
                                        ? c.experience.map((exp, idx) => idx === 0
                                            ? { ...exp, bullets: [...(exp.bullets||[]), bullet] }
                                            : exp)
                                        : [{ id:_id(), company:'', role:'', duration:'', bullets:[bullet] }],
                                    }));
                                    flash();
                                  }} style={{padding:'2px 10px',borderRadius:'6px',border:'1px solid var(--brand)',background:'transparent',color:'var(--brand)',cursor:'pointer',fontSize:'0.72rem',fontWeight:700,flexShrink:0,alignSelf:'center'}}>
                                    +
                                  </button>
                                </div>
                              ))}
                            </div>
                          );
                        })()}

                        {/* SKILLS — each skill chip clickable to add individually */}
                        {currentStepId === 'skills' && (() => {
                          const skills = (suggestion.improved || '').split(',').map(s=>s.trim()).filter(Boolean);
                          if (!skills.length) return <p style={{color:'var(--muted)',fontSize:'0.82rem',margin:0}}>No skills suggested.</p>;
                          return (
                            <div>
                              <p style={{margin:'0 0 0.4rem',fontSize:'0.7rem',fontWeight:700,color:'var(--muted)',textTransform:'uppercase'}}>Click a skill to add it</p>
                              <div style={{display:'flex',flexWrap:'wrap',gap:'0.35rem'}}>
                                {skills.map((s, i) => (
                                  <button key={i} onClick={() => {
                                    updateContent(c => ({
                                      ...c,
                                      skills: {...c.skills, technical:[...new Set([...(c.skills?.technical||[]),s])]},
                                    }));
                                    flash();
                                  }}
                                  title="Click to add this skill"
                                  style={{background:'rgba(37,99,235,0.07)',color:'var(--brand)',padding:'0.2rem 0.65rem',borderRadius:'12px',fontSize:'0.78rem',border:'1px solid rgba(37,99,235,0.25)',cursor:'pointer',fontWeight:500,transition:'all 0.15s'}}
                                  onMouseEnter={e=>{ e.target.style.background='var(--brand)'; e.target.style.color='white'; }}
                                  onMouseLeave={e=>{ e.target.style.background='rgba(37,99,235,0.07)'; e.target.style.color='var(--brand)'; }}
                                  >
                                    + {s}
                                  </button>
                                ))}
                              </div>
                            </div>
                          );
                        })()}

                        {/* CERTIFICATIONS — each cert clickable to add */}
                        {currentStepId === 'certifications' && (() => {
                          const certs = (suggestion.improved || '').split(',').map(s=>s.trim()).filter(Boolean);
                          if (!certs.length) return <p style={{color:'var(--muted)',fontSize:'0.82rem',margin:0}}>No certifications suggested.</p>;
                          return (
                            <div>
                              <p style={{margin:'0 0 0.4rem',fontSize:'0.7rem',fontWeight:700,color:'var(--muted)',textTransform:'uppercase'}}>Click to add each certification</p>
                              <div style={{display:'flex',flexWrap:'wrap',gap:'0.35rem'}}>
                                {certs.map((c, i) => (
                                  <button key={i} onClick={() => {
                                    updateContent(ct => ({...ct, certifications:[...new Set([...(ct.certifications||[]),c])]}));
                                    flash();
                                  }}
                                  style={{background:'rgba(16,185,129,0.07)',color:'#059669',padding:'0.2rem 0.65rem',borderRadius:'12px',fontSize:'0.78rem',border:'1px solid rgba(16,185,129,0.25)',cursor:'pointer',fontWeight:500,transition:'all 0.15s'}}
                                  onMouseEnter={e=>{ e.target.style.background='#059669'; e.target.style.color='white'; }}
                                  onMouseLeave={e=>{ e.target.style.background='rgba(16,185,129,0.07)'; e.target.style.color='#059669'; }}
                                  >
                                    + {c}
                                  </button>
                                ))}
                              </div>
                            </div>
                          );
                        })()}

                        {/* EDUCATION — each entry with individual Add button */}
                        {currentStepId === 'education' && (() => {
                          const entries = (suggestion.improved || '').split('\n')
                            .map(l => l.trim()).filter(Boolean)
                            .map(line => {
                              const parts = line.split('|').map(p=>p.trim());
                              return parts.length >= 2 ? { degree:parts[0]||'', institution:parts[1]||'', year:parts[2]||'' } : null;
                            }).filter(Boolean);
                          if (!entries.length) return (
                            <p style={{color:'var(--muted)',fontSize:'0.82rem',margin:0,lineHeight:1.5}}>
                              {suggestion.improved || 'No specific entries suggested.'}
                            </p>
                          );
                          return (
                            <div style={{display:'flex',flexDirection:'column',gap:'0.35rem'}}>
                              {entries.map((e, i) => (
                                <div key={i} style={{display:'flex',alignItems:'center',justifyContent:'space-between',background:'var(--surface-muted)',borderRadius:'7px',padding:'0.45rem 0.7rem',border:'1px solid var(--border-color)'}}>
                                  <div>
                                    <p style={{margin:0,color:'var(--text-color)',fontSize:'0.83rem',fontWeight:600}}>{e.degree}</p>
                                    <p style={{margin:0,color:'var(--muted)',fontSize:'0.75rem'}}>{e.institution}{e.year ? ` · ${e.year}` : ''}</p>
                                  </div>
                                  <button onClick={() => {
                                    updateContent(c=>({...c,education:[...c.education,{id:_id(),...e}]}));
                                    flash();
                                  }} style={{padding:'3px 12px',borderRadius:'6px',border:'1px solid var(--brand)',background:'transparent',color:'var(--brand)',cursor:'pointer',fontSize:'0.72rem',fontWeight:700,flexShrink:0,marginLeft:'0.6rem'}}>
                                    + Add
                                  </button>
                                </div>
                              ))}
                            </div>
                          );
                        })()}

                        {/* SUMMARY & PROJECTS — preview with "Use This" button */}
                        {(currentStepId === 'summary' || currentStepId === 'projects') && suggestion.improved && (
                          <div>
                            <p style={{margin:'0 0 0.4rem',fontSize:'0.7rem',fontWeight:700,color:'var(--muted)',textTransform:'uppercase'}}>AI Preview</p>
                            <p style={{margin:'0 0 0.6rem',color:'var(--text-color)',fontSize:'0.83rem',lineHeight:1.65,whiteSpace:'pre-wrap',background:'var(--surface-muted)',borderRadius:'7px',padding:'0.6rem 0.8rem',border:'1px solid var(--border-color)'}}>{suggestion.improved}</p>
                            <div style={{display:'flex',gap:'0.5rem'}}>
                              <button
                                onClick={() => applyFix(currentStepId, suggestion)}
                                style={{flex:1,padding:'0.5rem',borderRadius:'8px',border:'none',background:appliedFlash?'#10b981':'var(--brand)',color:'white',fontWeight:700,cursor:'pointer',fontSize:'0.83rem',transition:'background 0.3s'}}
                              >
                                {appliedFlash ? '✓ Applied!' : (Boolean(content[currentStepId]) && (typeof content[currentStepId] === 'string' ? content[currentStepId].trim().length > 0 : true)) ? '↩ Replace with this' : '✅ Use This'}
                              </button>
                              <button
                                onClick={() => {
                                  if (typeof navigator !== 'undefined') navigator.clipboard?.writeText(suggestion.improved);
                                }}
                                style={{padding:'0.5rem 0.8rem',borderRadius:'8px',border:'1px solid var(--border-color)',background:'transparent',color:'var(--text-secondary)',cursor:'pointer',fontSize:'0.83rem'}}
                                title="Copy to clipboard"
                              >
                                📋
                              </button>
                            </div>
                            <p style={{margin:'0.35rem 0 0',color:'var(--muted)',fontSize:'0.71rem'}}>Or copy parts of it and paste into the editor directly</p>
                          </div>
                        )}


                    {/* What changed */}
                    {Array.isArray(suggestion.changes) && suggestion.changes.length > 0 && (
                      <div style={{ background:'var(--surface-muted)', borderRadius:'8px', padding:'0.7rem 0.8rem' }}>
                        <p style={{ margin:'0 0 0.4rem', fontSize:'0.72rem', fontWeight:700, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.05em' }}>What changes</p>
                        {suggestion.changes.map((c,i)=>(
                          <p key={i} style={{ margin:'0 0 0.25rem', color:'var(--text-secondary)', fontSize:'0.77rem', lineHeight:1.4, display:'flex', gap:'0.4rem' }}>
                            <span style={{ color:'var(--brand)', flexShrink:0 }}>→</span>{c}
                          </p>
                        ))}
                      </div>
                    )}

                    {/* ATS Impact */}
                    {suggestion.whyItHelps && (
                      <div style={{ background:'rgba(16,185,129,0.05)', border:'1px solid rgba(16,185,129,0.15)', borderRadius:'8px', padding:'0.65rem 0.8rem' }}>
                        <p style={{ margin:0, color:'#059669', fontSize:'0.77rem', lineHeight:1.5 }}>
                          <strong>ATS Impact: </strong>{suggestion.whyItHelps}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {!suggLoading && !suggestion && (
                  <div style={{ textAlign:'center', padding:'2rem 1rem', color:'var(--muted)' }}>
                    <p style={{ fontSize:'0.88rem' }}>AI suggestion failed to load.</p>
                    <button onClick={()=>fetchStepSuggestion(currentStepId)} style={{ padding:'6px 14px', borderRadius:'8px', border:'1px solid var(--border-color)', background:'var(--surface-muted)', color:'var(--text-secondary)', cursor:'pointer', fontSize:'0.78rem', marginTop:'0.5rem' }}>Try Again</button>
                  </div>
                )}
              </div>
              )} {/* end AI panel — summary/experience/skills only */}

              {/* Radar for this section context */}
              {analysis && (
                <div style={{ borderTop:'1px solid var(--border-color)', padding:'0.8rem 1rem' }}>
                  <p style={{ margin:'0 0 0.4rem', fontSize:'0.72rem', fontWeight:700, color:'var(--muted)', textTransform:'uppercase', letterSpacing:'0.07em' }}>All Sections</p>
                  <ResponsiveContainer width="100%" height={160}>
                    <RadarChart data={[
                      {s:'Personal', A:analysis.sectionScores?.personalInfo??50},
                      {s:'Summary',  A:analysis.sectionScores?.summary??50},
                      {s:'Exp',      A:analysis.sectionScores?.experience??50},
                      {s:'Skills',   A:analysis.sectionScores?.skills??50},
                      {s:'Projects', A:analysis.sectionScores?.projects??50},
                      {s:'Edu',      A:analysis.sectionScores?.education??50},
                    ]}>
                      <PolarGrid stroke="var(--border-color)"/>
                      <PolarAngleAxis dataKey="s" tick={{fill:'var(--muted)',fontSize:9}}/>
                      <PolarRadiusAxis angle={30} domain={[0,100]} tick={false} axisLine={false}/>
                      <Radar name="Score" dataKey="A" stroke="var(--brand)" fill="var(--brand)" fillOpacity={0.15}/>
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Shared ──────────────────────────────────────────────────────────────────────
const FieldLabel = ({children})=><label style={{display:'block',color:'var(--muted)',fontSize:'0.71rem',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.07em',marginBottom:'0.3rem'}}>{children}</label>;
const AddBtn = ({onClick,label})=><button onClick={onClick} style={{width:'100%',padding:'0.5rem',borderRadius:'7px',border:'2px dashed var(--border-color)',background:'transparent',color:'var(--muted)',cursor:'pointer',marginTop:'0.4rem',fontSize:'0.82rem'}}>+ {label}</button>;

function ErrorBanner({msg,onClose}){
  return <div style={{display:'flex',gap:'0.8rem',background:'rgba(239,68,68,0.05)',border:'1px solid rgba(239,68,68,0.2)',borderRadius:'10px',padding:'0.9rem 1.1rem',marginBottom:'1.5rem'}}>
    <span>⚠️</span>
    <div style={{flex:1}}><p style={{color:'#ef4444',fontWeight:600,margin:'0 0 0.15rem',fontSize:'0.9rem'}}>Error</p><p style={{color:'#b91c1c',margin:0,fontSize:'0.83rem'}}>{msg}</p></div>
    <button onClick={onClose} style={{background:'none',border:'none',color:'#ef4444',cursor:'pointer'}}>✕</button>
  </div>;
}

// ── Section Editors ─────────────────────────────────────────────────────────────
function PersonalInfoEditor({data,onChange}){
  const fields=[['name','Full Name','Jane Doe'],['email','Email','jane@example.com'],['phone','Phone','+1 555-000-0000'],['location','Location','San Francisco, CA'],['linkedin','LinkedIn','linkedin.com/in/jane'],['github','GitHub','github.com/jane']];
  return <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
    <p style={{margin:'0 0 0.5rem',color:'var(--muted)',fontSize:'0.85rem',lineHeight:1.5}}>Make sure your name, email, phone, location, and LinkedIn are complete — these are ATS-required fields.</p>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0.8rem'}}>
      {fields.map(([k,l,p])=><div key={k} style={k==='name'?{gridColumn:'1/-1'}:{}}><FieldLabel>{l}</FieldLabel><input type="text" value={data[k]||''} placeholder={p} onChange={e=>onChange({[k]:e.target.value})} style={inp}/></div>)}
    </div>
  </div>;
}
function SummaryEditor({value,onChange}){
  const wc=value.trim().split(/\s+/).filter(Boolean).length;
  return <div>
    <p style={{margin:'0 0 0.8rem',color:'var(--muted)',fontSize:'0.85rem',lineHeight:1.5}}>Your summary is the first thing ATS reads. It should be 50-80 words, packed with role-specific keywords.</p>
    <textarea value={value} rows={6} placeholder="Write a compelling summary..." onChange={e=>onChange(e.target.value)} style={{...inp,resize:'vertical',lineHeight:1.7}}/>
    <p style={{margin:'0.3rem 0 0',color:wc<30?'#ef4444':wc>100?'#f59e0b':'#10b981',fontSize:'0.75rem'}}>{wc} words {wc<30?'(too short — aim for 50+)':wc>100?'(too long — keep under 100)':'(good length)'}</p>
  </div>;
}
function ExperienceEditor({items,onChange}){
  const add=()=>onChange([...items,{id:_id(),company:'',role:'',duration:'',bullets:['']}]);
  const rm=(i)=>onChange(items.filter((_,j)=>j!==i));
  const upd=(i,k,v)=>{const n=[...items];n[i]={...n[i],[k]:v};onChange(n);};
  const updB = (i, bi, v) => {
    const n = items.map((e, ei) => ei !== i ? e : {
      ...e, bullets: e.bullets.map((b, bj) => bj === bi ? v : b),
    });
    onChange(n);
  };
  const addB = (i) => {
    const n = items.map((e, ei) => ei !== i ? e : {
      ...e, bullets: [...(e.bullets || []), ''],
    });
    onChange(n);
  };
  const rmB = (i, bi) => {
    const n = items.map((e, ei) => ei !== i ? e : {
      ...e, bullets: (e.bullets || []).filter((_, bj) => bj !== bi),
    });
    onChange(n);
  };

  return <div>
    <p style={{margin:'0 0 1rem',color:'var(--muted)',fontSize:'0.85rem',lineHeight:1.5}}>Each bullet should follow: <strong>Action verb → What you did → Measurable result</strong>. e.g. "Led migration to microservices, reducing load time by 40%."</p>
    {items.map((e,i)=><div key={e.id||i} style={{border:'1px solid var(--border-color)',borderRadius:'10px',padding:'1rem',marginBottom:'1rem',background:'var(--surface-muted)'}}>
      <div style={{display:'flex',justifyContent:'space-between',marginBottom:'0.8rem'}}>
        <span style={{fontSize:'0.85rem',fontWeight:700,color:'var(--text-color)'}}>Experience #{i+1}</span>
        <button onClick={()=>rm(i)} style={{background:'none',border:'none',color:'#ef4444',cursor:'pointer',fontSize:'0.78rem'}}>Remove</button>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0.6rem',marginBottom:'0.6rem'}}>
        {[['role','Job Title','Senior Engineer'],['company','Company','Acme Corp']].map(([k,l,p])=><div key={k}><FieldLabel>{l}</FieldLabel><input type="text" value={e[k]||''} placeholder={p} onChange={ev=>upd(i,k,ev.target.value)} style={inp}/></div>)}
      </div>
      <div style={{marginBottom:'0.8rem'}}><FieldLabel>Duration</FieldLabel><input type="text" value={e.duration||''} placeholder="Jan 2023 – Present" onChange={ev=>upd(i,'duration',ev.target.value)} style={inp}/></div>
      <FieldLabel>Achievement Bullets</FieldLabel>
      {(e.bullets||[]).map((b,bi)=><div key={bi} style={{display:'flex',gap:'0.35rem',marginBottom:'0.4rem',alignItems:'flex-start'}}>
        <span style={{color:'var(--muted)',fontSize:'0.8rem',paddingTop:'10px',flexShrink:0}}>•</span>
        <textarea value={b} rows={2} placeholder="Led X achieving Y by doing Z..." onChange={ev=>updB(i,bi,ev.target.value)} style={{...inp,flex:1,resize:'vertical'}}/>
        <button onClick={()=>rmB(i,bi)} style={{padding:'4px 7px',background:'rgba(239,68,68,0.08)',border:'1px solid rgba(239,68,68,0.15)',color:'#ef4444',borderRadius:'5px',cursor:'pointer',flexShrink:0,marginTop:'2px'}}>✕</button>
      </div>)}
      <button onClick={()=>addB(i)} style={{background:'none',border:'none',color:'var(--brand)',cursor:'pointer',fontSize:'0.78rem',fontWeight:500,marginTop:'0.2rem'}}>+ Add bullet</button>
    </div>)}
    <AddBtn onClick={add} label="Add Another Role"/>
  </div>;
}
function SkillsEditor({data,onChange}){
  const [ti,setTi]=useState('');const [si,setSi]=useState('');
  const tag=(s,color,onRm)=><span style={{background:`${color}10`,color,padding:'0.18rem 0.6rem',borderRadius:'999px',fontSize:'0.78rem',display:'flex',alignItems:'center',gap:'0.3rem',border:`1px solid ${color}20`}}>{s}<button onClick={onRm} style={{background:'none',border:'none',color,cursor:'pointer',fontSize:'0.65rem',padding:0,lineHeight:1}}>✕</button></span>;
  return <div style={{display:'flex',flexDirection:'column',gap:'1.2rem'}}>
    <p style={{margin:0,color:'var(--muted)',fontSize:'0.85rem',lineHeight:1.5}}>List skills specifically — "React 18" beats "JavaScript frameworks". ATS matches exact keywords from the job description.</p>
    <div><FieldLabel>Technical Skills <span style={{color:'var(--muted)',fontWeight:400,textTransform:'none'}}>(Enter to add)</span></FieldLabel>
      <div style={{display:'flex',flexWrap:'wrap',gap:'0.3rem',marginBottom:'0.5rem',minHeight:'32px'}}>{(data.technical||[]).map((s,i)=>tag(s,'var(--brand)',()=>onChange({...data,technical:data.technical.filter((_,j)=>j!==i)})))}</div>
      <input type="text" value={ti} onChange={e=>setTi(e.target.value)} placeholder="e.g. React, TypeScript, Node.js..." style={inp} onKeyDown={e=>{if(e.key==='Enter'&&ti.trim()){onChange({...data,technical:[...(data.technical||[]),ti.trim()]});setTi('');}}}/>
    </div>
    <div><FieldLabel>Soft Skills <span style={{color:'var(--muted)',fontWeight:400,textTransform:'none'}}>(Enter to add)</span></FieldLabel>
      <div style={{display:'flex',flexWrap:'wrap',gap:'0.3rem',marginBottom:'0.5rem',minHeight:'32px'}}>{(data.soft||[]).map((s,i)=>tag(s,'#0284c7',()=>onChange({...data,soft:data.soft.filter((_,j)=>j!==i)})))}</div>
      <input type="text" value={si} onChange={e=>setSi(e.target.value)} placeholder="e.g. Leadership, Agile..." style={inp} onKeyDown={e=>{if(e.key==='Enter'&&si.trim()){onChange({...data,soft:[...(data.soft||[]),si.trim()]});setSi('');}}}/>
    </div>
  </div>;
}
function ProjectsEditor({items,onChange}){
  const add=()=>onChange([...items,{id:_id(),name:'',tech:'',description:'',link:''}]);
  const rm=(i)=>onChange(items.filter((_,j)=>j!==i));
  const upd=(i,k,v)=>{const n=[...items];n[i]={...n[i],[k]:v};onChange(n);};
  return <div>
    <p style={{margin:'0 0 1rem',color:'var(--muted)',fontSize:'0.85rem',lineHeight:1.5}}>Show impact: "built metrics dashboard used by 5,000+ users" beats "built dashboard". Include technologies prominently.</p>
    {items.map((p,i)=><div key={p.id||i} style={{border:'1px solid var(--border-color)',borderRadius:'10px',padding:'1rem',marginBottom:'0.8rem',background:'var(--surface-muted)'}}>
      <div style={{display:'flex',justifyContent:'space-between',marginBottom:'0.8rem'}}><span style={{fontSize:'0.85rem',fontWeight:700,color:'var(--text-color)'}}>Project #{i+1}</span><button onClick={()=>rm(i)} style={{background:'none',border:'none',color:'#ef4444',cursor:'pointer',fontSize:'0.78rem'}}>Remove</button></div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0.6rem',marginBottom:'0.6rem'}}>
        {[['name','Project Name','DerivSkills'],['tech','Technologies','React, Node.js, PostgreSQL']].map(([k,l,ph])=><div key={k}><FieldLabel>{l}</FieldLabel><input type="text" value={p[k]||''} placeholder={ph} onChange={e=>upd(i,k,e.target.value)} style={inp}/></div>)}
      </div>
      <div style={{marginBottom:'0.5rem'}}><FieldLabel>Link (optional)</FieldLabel><input type="text" value={p.link||''} placeholder="github.com/you/project" onChange={e=>upd(i,'link',e.target.value)} style={inp}/></div>
      <FieldLabel>Description</FieldLabel><textarea value={p.description||''} rows={3} placeholder="Built X using Y, resulting in Z..." onChange={e=>upd(i,'description',e.target.value)} style={{...inp,resize:'vertical'}}/>
    </div>)}
    <AddBtn onClick={add} label="Add Project"/>
  </div>;
}
// Simple pre-built education slots (Indian format)
const EDU_SLOTS = [
  { level: '10th',       icon: '🏫', label: '10th / SSC',        subtitle: 'School · Matriculation' },
  { level: '12th',       icon: '🏫', label: '12th / HSC',        subtitle: 'Intermediate · Junior College' },
  { level: 'graduation', icon: '🎓', label: 'Graduation',        subtitle: 'B.Tech · B.E. · B.Sc · B.Com · B.A.' },
  { level: 'postgrad',   icon: '🎓', label: 'Post Graduation',   subtitle: 'M.Tech · MBA · M.Sc · MCA' },
  { level: 'phd',        icon: '🔬', label: 'PhD / Doctorate',   subtitle: 'Research degree' },
];

function EducationEditor({ items, onChange }) {
  // Get or create entry for a given slot level
  const getSlot = (level) => items.find(e => e.level === level);
  const setSlot = (level, fields) => {
    const existing = items.find(e => e.level === level);
    if (existing) {
      onChange(items.map(e => e.level === level ? { ...e, ...fields } : e));
    } else {
      onChange([...items, { id: _id(), level, institution:'', degree:'', specialization:'', year:'', percentage:'', ...fields }]);
    }
  };
  const clearSlot = (level) => onChange(items.filter(e => e.level !== level));
  const hasSlot = (level) => !!items.find(e => e.level === level && (e.institution || e.degree || e.year));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {EDU_SLOTS.map(slot => {
        const entry = getSlot(slot.level) || {};
        const filled = hasSlot(slot.level);
        const isSchool = slot.level === '10th' || slot.level === '12th';
        const isHigher = slot.level === 'graduation' || slot.level === 'postgrad';
        const isPhD = slot.level === 'phd';

        return (
          <div key={slot.level} style={{
            border: `1px solid ${filled ? 'rgba(37,99,235,0.3)' : 'var(--border-color)'}`,
            borderRadius: '10px',
            overflow: 'hidden',
            background: filled ? 'rgba(37,99,235,0.02)' : 'var(--surface-muted)',
            transition: 'all 0.2s',
          }}>
            {/* Slot header */}
            <div style={{ display:'flex', alignItems:'center', gap:'0.6rem', padding:'0.7rem 1rem' }}>
              <span style={{ fontSize:'1.1rem' }}>{slot.icon}</span>
              <div style={{ flex:1 }}>
                <p style={{ margin:0, fontWeight:700, fontSize:'0.85rem', color:'var(--text-color)' }}>{slot.label}</p>
                <p style={{ margin:0, fontSize:'0.72rem', color:'var(--muted)' }}>{slot.subtitle}</p>
              </div>
              {filled
                ? <span style={{ fontSize:'0.72rem', color:'#10b981', fontWeight:600, background:'rgba(16,185,129,0.1)', padding:'2px 8px', borderRadius:'8px' }}>✓ Filled</span>
                : <span style={{ fontSize:'0.72rem', color:'var(--muted)' }}>Optional</span>
              }
              {filled && (
                <button onClick={() => clearSlot(slot.level)}
                  style={{ background:'none', border:'none', color:'#ef4444', cursor:'pointer', fontSize:'0.75rem', marginLeft:'0.4rem' }}>✕</button>
              )}
            </div>

            {/* Slot fields */}
            <div style={{ padding:'0 1rem 0.9rem', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.5rem' }}>
              {/* Institution */}
              <div style={{ gridColumn:'1/-1' }}>
                <FieldLabel>{isSchool ? 'School Name' : isPhD ? 'University / Institute' : 'College / University'}</FieldLabel>
                <input type="text" value={entry.institution||''} style={inp}
                  placeholder={isSchool ? 'e.g. Delhi Public School, CBSE' : isPhD ? 'e.g. IIT Bombay' : 'e.g. Anna University, VTU'}
                  onChange={ev => setSlot(slot.level, { institution: ev.target.value })} />
              </div>

              {/* 12th stream */}
              {slot.level === '12th' && (
                <div>
                  <FieldLabel>Stream</FieldLabel>
                  <select value={entry.specialization||''} onChange={ev => setSlot(slot.level, { specialization: ev.target.value })}
                    style={{ ...inp, cursor:'pointer' }}>
                    <option value="">Select...</option>
                    {['Science (PCM)','Science (PCB)','Commerce','Arts / Humanities','Vocational'].map(s=>
                      <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              )}

              {/* Degree for UG/PG */}
              {isHigher && (
                <div>
                  <FieldLabel>{slot.level==='graduation' ? 'Degree' : 'Degree / Programme'}</FieldLabel>
                  <input type="text" value={entry.degree||''} style={inp}
                    placeholder={slot.level==='graduation' ? 'B.Tech / B.Sc / B.Com' : 'M.Tech / MBA / M.Sc'}
                    onChange={ev => setSlot(slot.level, { degree: ev.target.value })} />
                </div>
              )}

              {/* Branch/specialization for UG/PG/PhD */}
              {(isHigher || isPhD) && (
                <div>
                  <FieldLabel>{isPhD ? 'Research Topic' : 'Branch / Specialization'}</FieldLabel>
                  <input type="text" value={entry.specialization||''} style={inp}
                    placeholder={isPhD ? 'e.g. Deep Learning' : 'e.g. Computer Science'}
                    onChange={ev => setSlot(slot.level, { specialization: ev.target.value })} />
                </div>
              )}

              {/* Year */}
              <div>
                <FieldLabel>Year</FieldLabel>
                <input type="text" value={entry.year||''} style={inp}
                  placeholder={isSchool ? '2018' : '2019 – 2023'}
                  onChange={ev => setSlot(slot.level, { year: ev.target.value })} />
              </div>

              {/* % / CGPA */}
              <div>
                <FieldLabel>% / CGPA</FieldLabel>
                <input type="text" value={entry.percentage||''} style={inp}
                  placeholder="85% or 8.5 CGPA"
                  onChange={ev => setSlot(slot.level, { percentage: ev.target.value })} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
function CertificationsEditor({items,onChange}){
  const [input,setInput]=useState('');
  return <div>
    <p style={{margin:'0 0 0.8rem',color:'var(--muted)',fontSize:'0.85rem',lineHeight:1.5}}>Use exact certification names as they appear on the issuer's website for best ATS matching.</p>
    {items.map((c,i)=><div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',background:'var(--surface-muted)',padding:'0.5rem 0.8rem',borderRadius:'8px',marginBottom:'0.35rem',border:'1px solid var(--border-color)'}}><span style={{color:'var(--text-color)',fontSize:'0.85rem'}}>📜 {c}</span><button onClick={()=>onChange(items.filter((_,j)=>j!==i))} style={{background:'none',border:'none',color:'#ef4444',cursor:'pointer'}}>✕</button></div>)}
    <input type="text" value={input} onChange={e=>setInput(e.target.value)} placeholder="e.g. AWS Certified Solutions Architect" style={{...inp,marginTop:'0.3rem'}} onKeyDown={e=>{if(e.key==='Enter'&&input.trim()){onChange([...items,input.trim()]);setInput('');}}}/>
  </div>;
}

// ── HTML Resume Builder ─────────────────────────────────────────────────────────
function buildResumeHTML(content, role) {
  const pi=content.personalInfo||{};
  const exp=(content.experience||[]).map(e=>`<div class="block"><div class="row"><strong>${e.role||''}</strong><span class="muted">${e.duration||''}</span></div><div class="muted">${e.company||''}</div><ul>${(e.bullets||[]).map(b=>`<li>${b}</li>`).join('')}</ul></div>`).join('');
  const proj=(content.projects||[]).map(p=>`<div class="block"><div class="row"><strong>${p.name||''}</strong>${p.link?`<a href="${p.link}">${p.link}</a>`:''}</div><div class="muted" style="font-style:italic">${p.tech||''}</div><p>${p.description||''}</p></div>`).join('');
  const edu=(content.education||[]).map(e=>`<div class="block"><div class="row"><strong>${e.degree||''}</strong><span class="muted">${e.year||''}</span></div><div class="muted">${e.institution||''}</div></div>`).join('');
  const skills=[...(content.skills?.technical||[]),...(content.skills?.soft||[])];
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>${pi.name||'Resume'}</title><style>@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Inter',Arial,sans-serif;font-size:11pt;color:#111;max-width:780px;margin:0 auto;padding:2rem}h1{font-size:22pt;font-weight:700}h2{font-size:10.5pt;font-weight:600;text-transform:uppercase;letter-spacing:.1em;color:#555;border-bottom:1.5px solid #E5E7EB;margin:1.1rem 0 .6rem;padding-bottom:.25rem}.contact{display:flex;flex-wrap:wrap;gap:.6rem;color:#374151;font-size:10pt;margin:.3rem 0 .6rem}.contact a{color:#2563EB;text-decoration:none}.block{margin-bottom:.75rem}.row{display:flex;justify-content:space-between;align-items:baseline}.muted{color:#6B7280;font-size:10pt}ul{padding-left:1.1rem;margin-top:.25rem}li{margin-bottom:.15rem;line-height:1.5}.skills{display:flex;flex-wrap:wrap;gap:.3rem}.skill{background:#F3F4F6;border:1px solid #E5E7EB;padding:.12rem .45rem;border-radius:4px;font-size:9.5pt}a{color:#2563EB;text-decoration:none;font-size:9.5pt;margin-left:.3rem}p{line-height:1.6;color:#374151;margin:.3rem 0}</style></head><body><h1>${pi.name||'Your Name'}</h1><p style="color:#6B7280;font-size:10pt;margin:.2rem 0">${role||''}</p><div class="contact">${pi.email?`<span>${pi.email}</span>`:''}${pi.phone?`<span>${pi.phone}</span>`:''}${pi.location?`<span>${pi.location}</span>`:''}${pi.linkedin?`<a href="${pi.linkedin}">LinkedIn</a>`:''}${pi.github?`<a href="${pi.github}">GitHub</a>`:''}</div>${content.summary?`<p style="margin-bottom:.8rem">${content.summary}</p>`:''}${content.experience?.length?`<h2>Experience</h2>${exp}`:''}${skills.length?`<h2>Skills</h2><div class="skills">${skills.map(s=>`<span class="skill">${s}</span>`).join('')}</div>`:''}${content.projects?.length?`<h2>Projects</h2>${proj}`:''}${content.education?.length?`<h2>Education</h2>${edu}`:''}${content.certifications?.length?`<h2>Certifications</h2><ul>${content.certifications.map(c=>`<li>${c}</li>`).join('')}</ul>`:''}</body></html>`;
}
