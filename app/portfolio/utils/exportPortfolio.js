export async function exportPortfolioToVercel({ content, templateId }) {
  const res = await fetch('/api/portfolio/export', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, templateId })
  });
  const data = await res.json();
  if (data.url) {
    window.open(data.url, '_blank');
    return data.url;
  } else {
    throw new Error(data.error || 'Failed to export portfolio');
  }
}
