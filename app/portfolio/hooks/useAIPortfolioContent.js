import { useState } from 'react';

export function useAIPortfolioContent() {
  const [aiContent, setAIContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateContent = async (skills, templateId) => {
    setLoading(true);
    setError(null);
    setAIContent(null);
    try {
      const res = await fetch('/api/portfolio/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skills, templateId })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to generate content');
      setAIContent(data.content);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { aiContent, loading, error, generateContent };
}
