import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createRateLimiter, getIp } from "@/lib/rateLimit";

const limiter = createRateLimiter("projects", { windowMs: 60_000, max: 60 });

export async function GET(request: NextRequest) {
  if (!limiter.check(getIp(request))) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const projects = await prisma.project.findMany({
    where: { status: { not: "INACTIVE" } },
    orderBy: { displayOrder: "asc" },
  });

  return NextResponse.json({ data: projects });
}
