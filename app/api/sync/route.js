import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dbUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { learningData: true },
    });

    return NextResponse.json({ success: true, learningData: dbUser?.learningData || {} });
  } catch (error) {
    console.error("GET Sync Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const currentUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { learningData: true },
    });

    const currentLearningData =
      currentUser?.learningData &&
      typeof currentUser.learningData === "object" &&
      !Array.isArray(currentUser.learningData)
        ? currentUser.learningData
        : {};

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        // Preserve non-learning metadata such as profileDetails while updating synced learning state.
        learningData: {
          ...currentLearningData,
          ...body,
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PUT Sync Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
