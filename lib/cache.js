// /lib/cache.js (production-ready Redis)
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export async function getFromCache(key) {
  const value = await redis.get(key);
  return value ? JSON.parse(value) : null;
}

export async function setInCache(key, value, ttlSeconds = 3600) {
  await redis.set(key, JSON.stringify(value), { ex: ttlSeconds });
}
