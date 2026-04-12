import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

// GET /api/resumes/[id]/download — streams an ATS-clean HTML resume as printable
export async function GET(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const resume = await prisma.resume.findFirst({
    where: { id: params.id, userId: session.user.id },
  });
  if (!resume) return Response.json({ error: "Not found" }, { status: 404 });

  if (!resume.isDownloadReady) {
    return Response.json({ error: "Resume is not ready for download. Achieve an ATS score of 90+ first." }, { status: 403 });
  }

  const html = buildResumeHTML(resume.content, resume.role, resume.title);

  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Disposition": `inline; filename="${resume.title.replace(/\s+/g, "_")}_Resume.html"`,
    },
  });
}

function buildResumeHTML(content, role, title) {
  const c = content || {};
  const pi = c.personalInfo || {};

  const experienceHTML = (c.experience || []).map(exp => `
    <div class="exp-block">
      <div class="exp-header">
        <strong>${exp.role || "Role"}</strong> — ${exp.company || "Company"}
        <span class="exp-duration">${exp.duration || ""}</span>
      </div>
      <ul>
        ${(exp.bullets || []).map(b => `<li>${b}</li>`).join("")}
      </ul>
    </div>
  `).join("");

  const projectsHTML = (c.projects || []).map(p => `
    <div class="exp-block">
      <div class="exp-header">
        <strong>${p.name || "Project"}</strong>
        ${p.link ? `<a href="${p.link}" class="link">${p.link}</a>` : ""}
      </div>
      <p class="tech-tags">${p.tech || ""}</p>
      <p>${p.description || ""}</p>
    </div>
  `).join("");

  const educationHTML = (c.education || []).map(e => `
    <div class="exp-block">
      <div class="exp-header">
        <strong>${e.degree || "Degree"}</strong> — ${e.institution || "Institution"}
        <span class="exp-duration">${e.year || ""}</span>
      </div>
    </div>
  `).join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${pi.name || title} — ${role}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Inter', Arial, sans-serif; font-size: 11pt; color: #1a1a1a; background: #fff; max-width: 760px; margin: 0 auto; padding: 2rem; }
    h1 { font-size: 22pt; font-weight: 700; color: #111; margin-bottom: 0.2rem; }
    h2 { font-size: 11pt; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: #4B5563; border-bottom: 1.5px solid #E5E7EB; margin: 1.2rem 0 0.7rem; padding-bottom: 0.3rem; }
    .contact { display: flex; gap: 0.8rem; flex-wrap: wrap; color: #374151; font-size: 10pt; margin-bottom: 0.5rem; }
    .contact a { color: #2563EB; text-decoration: none; }
    .summary { color: #374151; line-height: 1.6; }
    .exp-block { margin-bottom: 0.9rem; }
    .exp-header { display: flex; justify-content: space-between; align-items: baseline; }
    .exp-duration { color: #6B7280; font-size: 10pt; white-space: nowrap; margin-left: 1rem; }
    ul { padding-left: 1.2rem; margin-top: 0.3rem; }
    li { margin-bottom: 0.2rem; line-height: 1.5; color: #374151; }
    .skills-grid { display: flex; flex-wrap: wrap; gap: 0.4rem; }
    .skill-tag { background: #F3F4F6; border: 1px solid #E5E7EB; padding: 0.15rem 0.5rem; border-radius: 4px; font-size: 9.5pt; color: #1F2937; }
    .tech-tags { color: #6B7280; font-size: 10pt; margin: 0.2rem 0; font-style: italic; }
    .link { font-size: 9.5pt; color: #2563EB; text-decoration: none; margin-left: 0.5rem; }
    @media print {
      body { padding: 0; }
    }
  </style>
</head>
<body>
  <h1>${pi.name || "Your Name"}</h1>
  <div class="contact">
    ${pi.email ? `<span>${pi.email}</span>` : ""}
    ${pi.phone ? `<span>${pi.phone}</span>` : ""}
    ${pi.location ? `<span>${pi.location}</span>` : ""}
    ${pi.linkedin ? `<a href="${pi.linkedin}">LinkedIn</a>` : ""}
    ${pi.github ? `<a href="${pi.github}">GitHub</a>` : ""}
  </div>
  <p class="role-label" style="color:#6B7280;font-size:10pt;margin-bottom:0.8rem;">${role}</p>

  ${c.summary ? `<h2>Summary</h2><p class="summary">${c.summary}</p>` : ""}

  ${c.experience?.length ? `<h2>Experience</h2>${experienceHTML}` : ""}

  ${(c.skills?.technical?.length || c.skills?.soft?.length) ? `
  <h2>Skills</h2>
  <div class="skills-grid">
    ${[...(c.skills.technical || []), ...(c.skills.soft || [])].map(s => `<span class="skill-tag">${s}</span>`).join("")}
  </div>` : ""}

  ${c.projects?.length ? `<h2>Projects</h2>${projectsHTML}` : ""}

  ${c.education?.length ? `<h2>Education</h2>${educationHTML}` : ""}

  ${c.certifications?.length ? `
  <h2>Certifications</h2>
  <ul>${c.certifications.map(cert => `<li>${cert}</li>`).join("")}</ul>` : ""}
</body>
</html>`;
}
