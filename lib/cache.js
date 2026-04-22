// /lib/cache.js (production-ready Redis)
import { Redis } from '@upstash/redis';

let redis;

function getRedis() {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return null;
  }

  if (!redis) {
    redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
  }

  return redis;
}

export async function getFromCache(key) {
  const client = getRedis();
  if (!client) return null;

  const value = await client.get(key);
  if (!value) return null;

  return typeof value === 'string' ? JSON.parse(value) : value;
}

export async function setInCache(key, value, ttlSeconds = 3600) {
  const client = getRedis();
  if (!client) return;

  await client.set(key, JSON.stringify(value), { ex: ttlSeconds });
}
