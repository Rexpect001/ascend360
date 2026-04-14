import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const user = await requireAuth(request);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [
    totalPosts,
    publishedPosts,
    draftPosts,
    totalSubmissions,
    unreadSubmissions,
    totalTeamMembers,
    totalImpactStories,
    publishedStories,
  ] = await Promise.all([
    prisma.blogPost.count(),
    prisma.blogPost.count({ where: { status: "PUBLISHED" } }),
    prisma.blogPost.count({ where: { status: "DRAFT" } }),
    prisma.contactSubmission.count(),
    prisma.contactSubmission.count({ where: { readStatus: false } }),
    prisma.teamMember.count({ where: { isActive: true } }),
    prisma.impactStory.count(),
    prisma.impactStory.count({ where: { isPublished: true } }),
  ]);

  const recentSubmissions = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    select: {
      id: true,
      name: true,
      email: true,
      inquiryType: true,
      createdAt: true,
      readStatus: true,
    },
  });

  return NextResponse.json({
    data: {
      posts: { total: totalPosts, published: publishedPosts, draft: draftPosts },
      submissions: { total: totalSubmissions, unread: unreadSubmissions },
      team: { total: totalTeamMembers },
      stories: { total: totalImpactStories, published: publishedStories },
      recentSubmissions,
    },
  });
}
