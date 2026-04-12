function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderList(items) {
  return items.map((item) => `<li>${escapeHtml(item)}</li>`).join('');
}

function buildResumeHtml(resume) {
  const projects = (resume.projects || [])
    .map((project) => `
      <section class="project">
        <div class="project-header">
          <strong>${escapeHtml(project.name)}</strong>
          <span>${escapeHtml(project.subtitle)}</span>
        </div>
        <ul>${renderList(project.bullets || [])}</ul>
      </section>
    `)
    .join('');

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(resume.basics?.name || 'Resume')}</title>
    <style>
      :root {
        color-scheme: light;
      }
      body {
        margin: 0;
        background: #eef2ff;
        color: #0f172a;
        font-family: "DM Sans", system-ui, sans-serif;
      }
      .page {
        max-width: 900px;
        margin: 32px auto;
        background: #fff;
        padding: 40px;
        box-shadow: 0 24px 60px rgba(15, 23, 42, 0.12);
      }
      h1, h2 {
        margin: 0;
      }
      .hero {
        border-bottom: 2px solid #0f172a;
        padding-bottom: 20px;
        margin-bottom: 24px;
      }
      .hero p {
        margin: 10px 0 0 0;
        color: #475569;
      }
      .grid {
        display: grid;
        grid-template-columns: 1.1fr 1.9fr;
        gap: 28px;
      }
      .section {
        margin-bottom: 24px;
      }
      .section h2 {
        font-size: 0.9rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        margin-bottom: 10px;
      }
      ul {
        margin: 0;
        padding-left: 18px;
        line-height: 1.6;
      }
      .project {
        margin-bottom: 18px;
      }
      .project-header {
        display: flex;
        justify-content: space-between;
        gap: 12px;
        margin-bottom: 8px;
        color: #334155;
      }
      @media print {
        body {
          background: #fff;
        }
        .page {
          margin: 0;
          max-width: none;
          box-shadow: none;
        }
      }
    </style>
  </head>
  <body>
    <main class="page">
      <header class="hero">
        <h1>${escapeHtml(resume.basics?.name)}</h1>
        <p>${escapeHtml(resume.basics?.headline)}</p>
        <p>${escapeHtml(resume.basics?.targetRole)}${resume.basics?.location ? ` • ${escapeHtml(resume.basics.location)}` : ''}</p>
      </header>

      <div class="section">
        <h2>Professional Summary</h2>
        <p>${escapeHtml(resume.basics?.summary)}</p>
      </div>

      <div class="grid">
        <aside>
          <section class="section">
            <h2>Core Skills</h2>
            <ul>${renderList(resume.coreSkills || [])}</ul>
          </section>
          <section class="section">
            <h2>ATS Keywords</h2>
            <ul>${renderList(resume.atsKeywords || [])}</ul>
          </section>
          <section class="section">
            <h2>Education</h2>
            <ul>${renderList(resume.education || [])}</ul>
          </section>
        </aside>

        <section>
          <section class="section">
            <h2>Learning Highlights</h2>
            <ul>${renderList(resume.learningHighlights || [])}</ul>
          </section>
          <section class="section">
            <h2>Experience Highlights</h2>
            <ul>${renderList(resume.experienceHighlights || [])}</ul>
          </section>
          <section class="section">
            <h2>Projects</h2>
            ${projects}
          </section>
        </section>
      </div>
    </main>
  </body>
</html>`;
}

function downloadBlob(filename, blob) {
  const blobUrl = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = blobUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(blobUrl);
}

export function downloadResumeHtml(resume) {
  const html = buildResumeHtml(resume);
  const filename = `${(resume.basics?.name || 'resume').toLowerCase().replace(/\s+/g, '-')}-resume.html`;
  downloadBlob(filename, new Blob([html], { type: 'text/html;charset=utf-8' }));
}

export function openResumePrintView(resume) {
  const html = buildResumeHtml(resume);
  const printWindow = window.open('', '_blank', 'noopener,noreferrer');

  if (!printWindow) {
    throw new Error('Unable to open print preview. Please allow pop-ups for this site.');
  }

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.focus();
}
