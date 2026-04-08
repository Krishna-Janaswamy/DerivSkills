const CACHE_PREFIX = 'profileCache:';
const CACHE_MAX_AGE_MS = 30 * 1000;

function getStorageKey(userId) {
  if (!userId) return null;
  return `${CACHE_PREFIX}${userId}`;
}

export function readProfileCache(userId, maxAgeMs = CACHE_MAX_AGE_MS) {
  if (typeof window === 'undefined' || !userId) return null;
  const raw = localStorage.getItem(getStorageKey(userId));
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (!parsed.timestamp || Date.now() - parsed.timestamp > maxAgeMs) {
      return null;
    }
    return parsed;
  } catch (error) {
    console.warn('Profile cache parse failed', error);
    localStorage.removeItem(getStorageKey(userId));
    return null;
  }
}

export function writeProfileCache(userId, payload) {
  if (typeof window === 'undefined' || !userId || !payload) return;
  try {
    localStorage.setItem(
      getStorageKey(userId),
      JSON.stringify({ ...payload, timestamp: Date.now() }),
    );
  } catch (error) {
    console.warn('Profile cache write failed', error);
  }
}

export async function fetchProfileAndCache(userId) {
  if (!userId) throw new Error('Missing userId for profile fetch');
  const response = await fetch('/api/profile', { headers: { 'cache-control': 'no-store' } });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Failed to fetch profile');
  }
  const payload = {
    user: data.user,
    profileDetails: data.profileDetails,
    providers: data.providers,
  };
  writeProfileCache(userId, payload);
  return payload;
}

export function clearProfileCache(userId) {
  if (typeof window === 'undefined') return;
  const key = getStorageKey(userId);
  if (key) {
    localStorage.removeItem(key);
  }
}
