async function parseApiResponse(response, fallbackMessage) {
  const contentType = response.headers.get('content-type') || '';
  const raw = await response.text();

  if (!raw) {
    throw new Error(fallbackMessage);
  }

  if (!contentType.includes('application/json')) {
    if (raw.startsWith('<!DOCTYPE') || raw.startsWith('<html')) {
      throw new Error('Export returned an HTML page instead of JSON. Please retry in a few moments.');
    }
    throw new Error(fallbackMessage);
  }

  try {
    return JSON.parse(raw);
  } catch {
    throw new Error('Export returned invalid JSON. Please retry.');
  }
}

export async function exportPortfolioToVercel({ content, templateId }) {
  const res = await fetch('/api/portfolio/export', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, templateId })
  });

  const data = await parseApiResponse(res, 'Failed to export portfolio.');

  if (data?.download?.html && data?.download?.filename) {
    const blob = new Blob([data.download.html], { type: 'text/html;charset=utf-8' });
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = data.download.filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(blobUrl);
  }

  if (!res.ok) {
    throw new Error(data?.error || 'Failed to export portfolio.');
  }

  if (data.url) {
    window.open(data.url, '_blank');
    return data.url;
  } else {
    throw new Error(data.error || 'Failed to export portfolio');
  }
}
