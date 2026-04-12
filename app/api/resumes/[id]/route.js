import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

// GET /api/resumes/[id]
export async function GET(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const resume = await prisma.resume.findFirst({
    where: { id: params.id, userId: session.user.id },
  });

  if (!resume) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json({ resume });
}

// PUT /api/resumes/[id] — auto-save content
export async function PUT(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { content, title } = body;

  // Verify ownership
  const existing = await prisma.resume.findFirst({
    where: { id: params.id, userId: session.user.id },
    select: { id: true },
  });
  if (!existing) return Response.json({ error: "Not found" }, { status: 404 });

  const updated = await prisma.resume.update({
    where: { id: params.id },
    data: {
      ...(content !== undefined && { content }),
      ...(title !== undefined && { title }),
    },
  });

  return Response.json({ resume: updated });
}

// DELETE /api/resumes/[id]
export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const existing = await prisma.resume.findFirst({
    where: { id: params.id, userId: session.user.id },
    select: { id: true },
  });
  if (!existing) return Response.json({ error: "Not found" }, { status: 404 });

  await prisma.resume.delete({ where: { id: params.id } });
  return Response.json({ success: true });
}
