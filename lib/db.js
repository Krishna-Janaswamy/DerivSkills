// /lib/db.js
import { prisma } from '@/lib/prisma';

export async function getNodeAIResultFromDB(nodeId) {
  const result = await prisma.ai_node_cache.findUnique({ where: { node_id: nodeId } });
  return result ? result.ai_result : null;
}

export async function setNodeAIResultInDB(nodeId, aiResult) {
  await prisma.ai_node_cache.upsert({
    where: { node_id: nodeId },
    update: { ai_result: aiResult, updated_at: new Date() },
    create: { node_id: nodeId, ai_result: aiResult },
  });
}
