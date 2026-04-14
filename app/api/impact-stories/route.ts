import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createRateLimiter, getIp } from "@/lib/rateLimit";

const limiter = createRateLimiter("impact-stories", { windowMs: 60_000, max: 60 });

export async function GET(request: NextRequest) {
  if (!limiter.check(getIp(request))) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const stories = await prisma.impactStory.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: "desc" },
  });

  return NextResponse.json({ data: stories });
}
