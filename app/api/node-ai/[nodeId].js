// /app/api/node-ai/[nodeId].js
// Atomic node AI assistance: cache → DB → AI
import { NextResponse } from 'next/server';
import { getFromCache, setInCache } from '@/lib/cache';
import { getNodeAIResultFromDB, setNodeAIResultInDB } from '@/lib/db';
import { callOpenAI } from '@/lib/ai';

const pendingNodeAIRequests = new Map();

async function fetchLatestNodeAIResult(nodeId) {
  if (pendingNodeAIRequests.has(nodeId)) {
    return pendingNodeAIRequests.get(nodeId);
  }

  const requestPromise = (async () => {
    try {
      const aiResult = await callOpenAI({ nodeId });
      await setNodeAIResultInDB(nodeId, aiResult);
      await setInCache(nodeId, aiResult);
      return aiResult;
    } finally {
      pendingNodeAIRequests.delete(nodeId);
    }
  })();

  pendingNodeAIRequests.set(nodeId, requestPromise);
  return requestPromise;
}

export async function GET(request, { params }) {
  const { nodeId } = params;

  const cachedValue = await getFromCache(nodeId);
  if (cachedValue) {
    return NextResponse.json({ result: cachedValue, source: 'cache' });
  }

  const dbValue = await getNodeAIResultFromDB(nodeId);
  if (dbValue) {
    await setInCache(nodeId, dbValue);
    return NextResponse.json({ result: dbValue, source: 'db' });
  }

  const aiResult = await fetchLatestNodeAIResult(nodeId);
  return NextResponse.json({ result: aiResult, source: 'ai' });
}
