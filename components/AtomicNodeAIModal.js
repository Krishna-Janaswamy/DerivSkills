// /components/AtomicNodeAIModal.js
import { useEffect, useState } from 'react';

export function AtomicNodeAIModal({ nodeId, open, onClose }) {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Preload/cache logic (could use context, SWR, or react-query for real app)
  useEffect(() => {
    if (!open) return;
    setLoading(true);
    setError(null);
    // Try localStorage cache first
    const cacheKey = `ai_node_${nodeId}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      setContent(cached);
      setLoading(false);
      // Optionally, fetch fresh in background
      fetch(`/api/node-ai/${nodeId}`).then(r => r.json()).then(data => {
        if (data.result && data.result !== cached) {
          setContent(data.result);
          localStorage.setItem(cacheKey, data.result);
        }
      });
      return;
    }
    // If not cached, fetch from backend
    fetch(`/api/node-ai/${nodeId}`)
      .then(r => r.json())
      .then(data => {
        setContent(data.result);
        localStorage.setItem(cacheKey, data.result);
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [nodeId, open]);

  if (!open) return null;
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <button onClick={onClose} style={{ float: 'right' }}>Close</button>
        {loading && <div>Loading...</div>}
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {content && <div>{content}</div>}
      </div>
    </div>
  );
}
