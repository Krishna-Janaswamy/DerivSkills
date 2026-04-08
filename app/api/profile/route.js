import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { getFromCache, setInCache } from "@/lib/cache";

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        presentRole: true,
        emailVerified: true,
        learningData: true,
        accounts: {
          select: {
            provider: true,
            type: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const cacheKey = `profile:${user.id}`;
    let cachedProfile = null;
    try {
      cachedProfile = await getFromCache(cacheKey);
    } catch (cacheError) {
      console.warn("Profile cache read failed", cacheError);
    }

    if (cachedProfile) {
      return NextResponse.json({ ...cachedProfile, source: "cache" });
    }

    const learningData =
      user.learningData && typeof user.learningData === "object" && !Array.isArray(user.learningData)
        ? user.learningData
        : {};

    const profileDetails =
      learningData.profileDetails && typeof learningData.profileDetails === "object"
        ? learningData.profileDetails
        : {};

    const payload = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        presentRole: user.presentRole,
        emailVerified: user.emailVerified,
      },
      profileDetails: {
        headline: profileDetails.headline || "",
        company: profileDetails.company || "",
        location: profileDetails.location || "",
        bio: profileDetails.bio || "",
        userType: profileDetails.userType || "",
        yearsExperience: profileDetails.yearsExperience || "",
        collegeName: profileDetails.collegeName || "",
        branch: profileDetails.branch || "",
        discoverySource: profileDetails.discoverySource || "",
        studentYear: profileDetails.studentYear || "",
        studentGroup: profileDetails.studentGroup || "",
        onboardingCompleted: Boolean(profileDetails.onboardingCompleted),
      },
      providers: user.accounts.map((account) => account.provider),
    };

    try {
      await setInCache(cacheKey, payload, 300);
    } catch (cacheError) {
      console.warn("Profile cache write failed", cacheError);
    }

    return NextResponse.json({ ...payload, source: "db" });
  } catch (error) {
    console.error("Profile API Error:", error);
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const body = await request.json();
    const { name, presentRole, profileDetails } = body;

    const currentUser = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        learningData: true,
      },
    });

    const currentLearningData =
      currentUser?.learningData &&
      typeof currentUser.learningData === "object" &&
      !Array.isArray(currentUser.learningData)
        ? currentUser.learningData
        : {};

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: name,
        presentRole: presentRole,
        learningData: {
          ...currentLearningData,
          profileDetails: {
            headline: profileDetails?.headline || "",
            company: profileDetails?.company || "",
            location: profileDetails?.location || "",
            bio: profileDetails?.bio || "",
            userType: profileDetails?.userType || "",
            yearsExperience: profileDetails?.yearsExperience || "",
            collegeName: profileDetails?.collegeName || "",
            branch: profileDetails?.branch || "",
            discoverySource: profileDetails?.discoverySource || "",
            studentYear: profileDetails?.studentYear || "",
            studentGroup: profileDetails?.studentGroup || "",
            onboardingCompleted: Boolean(profileDetails?.onboardingCompleted),
          },
        },
      },
    });

    const accounts = await prisma.account.findMany({
      where: { userId: session.user.id },
      select: { provider: true },
    });

    const cacheKey = `profile:${session.user.id}`;
    try {
      await setInCache(cacheKey, {
        user: {
          id: updatedUser.id,
          name: updatedUser.name,
          email: updatedUser.email,
        image: updatedUser.image,
        presentRole: updatedUser.presentRole,
        emailVerified: updatedUser.emailVerified,
      },
      profileDetails: {
        headline: profileDetails?.headline || "",
        company: profileDetails?.company || "",
        location: profileDetails?.location || "",
        bio: profileDetails?.bio || "",
        userType: profileDetails?.userType || "",
        yearsExperience: profileDetails?.yearsExperience || "",
        collegeName: profileDetails?.collegeName || "",
        branch: profileDetails?.branch || "",
        discoverySource: profileDetails?.discoverySource || "",
        studentYear: profileDetails?.studentYear || "",
        studentGroup: profileDetails?.studentGroup || "",
        onboardingCompleted: Boolean(profileDetails?.onboardingCompleted),
      },
      providers: accounts.map((account) => account.provider),
      }, 300);
    } catch (cacheError) {
      console.warn("Profile cache update failed", cacheError);
    }

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Profile API Error:", error);
    return NextResponse.json({ error: "Failed to securely save profile" }, { status: 500 });
  }
}
