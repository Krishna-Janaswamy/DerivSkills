import { prisma }      from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { withSecurity, requireAuth, rateLimit } from '@/lib/api-security';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request) {
  const authResult = await requireAuth();
  if (authResult instanceof NextResponse) return authResult;
  const { session } = authResult;

  const rlResult = await rateLimit(session.user.id, { limit: 60, window: 60, prefix: 'rl:sync:' });
  if (rlResult) return rlResult;

  try {
    const dbUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { learningData: true },
    });
    return NextResponse.json({ success: true, learningData: dbUser?.learningData || {} });
  } catch (error) {
    console.error('GET Sync Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request) {
  const guard = await withSecurity(request, {
    auth:      true,
    rateLimit: { limit: 30, window: 60, prefix: 'rl:sync:' },
    // Body is free-form learningData — just ensure it's an object, not a giant payload
    schema: {},
  });
  if (!guard.ok) return guard.response;
  const { session, body } = guard;

  // Guard against giant payloads (> 64 KB)
  const payloadSize = JSON.stringify(body).length;
  if (payloadSize > 65536) {
    return NextResponse.json({ error: 'Payload too large.' }, { status: 413 });
  }
  if (typeof body !== 'object' || Array.isArray(body)) {
    return NextResponse.json({ error: 'Body must be a JSON object.' }, { status: 422 });
  }

  try {
    const currentUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { learningData: true },
    });
    const currentLearningData =
      currentUser?.learningData &&
      typeof currentUser.learningData === 'object' &&
      !Array.isArray(currentUser.learningData)
        ? currentUser.learningData : {};

    await prisma.user.update({
      where: { id: session.user.id },
      // Preserve profileDetails and other metadata while merging learning state
      data: { learningData: { ...currentLearningData, ...body } },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('PUT Sync Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
