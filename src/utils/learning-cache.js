const CACHE_PREFIX = 'learningCache:';
const CACHE_MAX_AGE_MS = 60 * 1000;

function keyFor(userId) {
  return userId ? `${CACHE_PREFIX}${userId}` : null;
}

export function readLearningCache(userId) {
  if (typeof window === 'undefined' || !userId) return null;
  const key = keyFor(userId);
  const raw = localStorage.getItem(key);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (!parsed.timestamp || Date.now() - parsed.timestamp > CACHE_MAX_AGE_MS) {
      return null;
    }
    return parsed.data || null;
  } catch (error) {
    console.warn('learning cache parse failed', error);
    localStorage.removeItem(key);
    return null;
  }
}

export function writeLearningCache(userId, data) {
  if (typeof window === 'undefined' || !userId || !data) return;
  try {
    const key = keyFor(userId);
    localStorage.setItem(key, JSON.stringify({ timestamp: Date.now(), data }));
  } catch (error) {
    console.warn('learning cache write failed', error);
  }
}

export function clearLearningCache(userId) {
  if (typeof window === 'undefined' || !userId) return;
  const key = keyFor(userId);
  if (key) {
    localStorage.removeItem(key);
  }
}
