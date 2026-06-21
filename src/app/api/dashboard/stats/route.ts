import { Role, UserType, BlogStatus } from "@prisma/client";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await getCurrentUser();

  if (!user || (user.role !== Role.ADMIN && user.role !== Role.EDITOR)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 403 });
  }

  const [totalUsers, totalInternalUsers, totalExternalUsers, totalArticles, totalPublishedArticles, totalDraftArticles, totalCompetitions, totalComments] =
    await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { userType: UserType.INTERNAL } }),
      prisma.user.count({ where: { userType: UserType.EXTERNAL } }),
      prisma.blog.count(),
      prisma.blog.count({ where: { status: BlogStatus.PUBLISHED } }),
      prisma.blog.count({ where: { status: BlogStatus.DRAFT } }),
      prisma.competition.count(),
      prisma.comment.count(),
    ]);

  return NextResponse.json({
    totalUsers,
    totalInternalUsers,
    totalExternalUsers,
    totalArticles,
    totalPublishedArticles,
    totalDraftArticles,
    totalCompetitions,
    totalComments,
  });
}
