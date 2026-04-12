import { useState } from 'react';

async function parseApiResponse(response, fallbackMessage) {
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
      throw new Error('Your session has expired. Please sign in again and retry.');
    }

    if (raw.startsWith('<!DOCTYPE') || raw.startsWith('<html')) {
      throw new Error('The resume service returned an HTML page instead of JSON. Please refresh and try again.');
    }

    throw new Error(fallbackMessage);
  }

  try {
    return JSON.parse(raw);
  } catch {
    throw new Error('The resume service returned invalid JSON. Please try again.');
  }
}

export function useAIPortfolioContent() {
  const [aiContent, setAIContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateContent = async (payload) => {
    setLoading(true);
    setError(null);
    setAIContent(null);
    try {
      const res = await fetch('/api/portfolio/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await parseApiResponse(res, 'Could not generate your resume draft right now.');

      if (!res.ok) {
        throw new Error(data?.error || 'Could not generate your resume draft right now.');
      }

      if (!data?.content) {
        throw new Error('The resume service did not return any content.');
      }

      setAIContent(data.content);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { aiContent, loading, error, generateContent };
}
