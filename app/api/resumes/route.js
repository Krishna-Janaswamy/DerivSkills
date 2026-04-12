import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { ROLE_KEYWORDS } from "@/lib/resume-roles";

// GET /api/resumes — list all resumes for current user
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const resumes = await prisma.resume.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: "desc" },
    select: {
      id: true, role: true, title: true, atsScore: true,
      isDownloadReady: true, createdAt: true, updatedAt: true,
    },
  });

  return Response.json({ resumes });
}

// POST /api/resumes — create a new resume
export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { role, title } = await req.json();
  if (!role || !title) {
    return Response.json({ error: "role and title are required" }, { status: 400 });
  }

  // Scaffold skeleton content with role-specific hints
  const roleKeywords = ROLE_KEYWORDS[role] || [];
  const content = {
    personalInfo: { name: "", email: "", phone: "", location: "", linkedin: "", github: "" },
    summary: "",
    experience: [],
    projects: [],
    skills: { technical: roleKeywords.slice(0, 5), soft: [] },
    education: [],
    certifications: [],
  };

  const resume = await prisma.resume.create({
    data: {
      userId: session.user.id,
      role,
      title,
      content,
    },
  });

  return Response.json({ resume }, { status: 201 });
}
