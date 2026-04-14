import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const user = await requireAuth(request);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const [
    totalViews30d,
    totalViews7d,
    viewsByPage,
    viewsByDevice,
    submissionsByType,
    dailyViews,
  ] = await Promise.all([
    // Total views last 30 days
    prisma.pageView.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),

    // Total views last 7 days
    prisma.pageView.count({ where: { createdAt: { gte: sevenDaysAgo } } }),

    // Top pages (last 30 days)
    prisma.pageView.groupBy({
      by: ["path"],
      where: { createdAt: { gte: thirtyDaysAgo } },
      _count: { path: true },
      orderBy: { _count: { path: "desc" } },
      take: 10,
    }),

    // Device breakdown (last 30 days)
    prisma.pageView.groupBy({
      by: ["device"],
      where: { createdAt: { gte: thirtyDaysAgo } },
      _count: { device: true },
    }),

    // Contact submissions by inquiry type (all time)
    prisma.contactSubmission.groupBy({
      by: ["inquiryType"],
      _count: { inquiryType: true },
    }),

    // Daily views for last 30 days — raw query for date truncation
    prisma.$queryRaw<{ day: Date; count: bigint }[]>`
      SELECT DATE_TRUNC('day', created_at) as day, COUNT(*) as count
      FROM page_views
      WHERE created_at >= ${thirtyDaysAgo}
      GROUP BY day
      ORDER BY day ASC
    `,
  ]);

  return NextResponse.json({
    data: {
      overview: {
        views30d: totalViews30d,
        views7d: totalViews7d,
      },
      topPages: viewsByPage.map((r) => ({ path: r.path, views: r._count.path })),
      devices: viewsByDevice.map((r) => ({ device: r.device ?? "unknown", count: r._count.device })),
      submissionsByType: submissionsByType.map((r) => ({
        type: r.inquiryType,
        count: r._count.inquiryType,
      })),
      dailyViews: dailyViews.map((r) => ({
        day: r.day.toISOString().split("T")[0],
        count: Number(r.count),
      })),
    },
  });
}
