import { NextResponse } from 'next/server';

function buildHtmlDocument(content, templateId) {
  const safeContent = JSON.stringify(content, null, 2);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Portfolio Export - ${templateId}</title>
    <style>
      body {
        margin: 0;
        padding: 40px 20px;
        background: #f6f7fb;
        color: #0f172a;
        font-family: "DM Sans", system-ui, sans-serif;
      }
      main {
        max-width: 960px;
        margin: 0 auto;
        background: white;
        border-radius: 20px;
        padding: 32px;
        box-shadow: 0 20px 50px rgba(15, 23, 42, 0.08);
      }
      h1 {
        margin-top: 0;
      }
      pre {
        white-space: pre-wrap;
        word-break: break-word;
        background: #0f172a;
        color: #e2e8f0;
        padding: 20px;
        border-radius: 16px;
        overflow: auto;
      }
      .meta {
        color: #475569;
        margin-bottom: 24px;
      }
    </style>
  </head>
  <body>
    <main>
      <h1>Portfolio Export</h1>
      <p class="meta">Template: ${templateId}</p>
      <pre>${safeContent}</pre>
    </main>
  </body>
</html>`;
}

export async function POST(request) {
  try {
    const { templateId, content } = await request.json();

    if (!templateId) {
      return NextResponse.json({ error: 'Choose a portfolio template before exporting.' }, { status: 400 });
    }

    if (!content) {
      return NextResponse.json({ error: 'Generate portfolio content before exporting.' }, { status: 400 });
    }

    const vercelToken = process.env.VERCEL_TOKEN;
    const vercelProjectId = process.env.VERCEL_PROJECT_ID;

    if (!vercelToken || !vercelProjectId) {
      return NextResponse.json({
        error: 'Vercel publishing is not configured yet. Add VERCEL_TOKEN and VERCEL_PROJECT_ID to enable real publishing.',
        download: {
          filename: `portfolio-${templateId}.html`,
          html: buildHtmlDocument(content, templateId),
        },
      }, { status: 501 });
    }

    return NextResponse.json({
      error: 'Vercel publishing is not implemented yet for this project.',
      download: {
        filename: `portfolio-${templateId}.html`,
        html: buildHtmlDocument(content, templateId),
      },
    }, { status: 501 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to export portfolio.' }, { status: 500 });
  }
}
