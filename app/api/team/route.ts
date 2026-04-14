import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createRateLimiter, getIp } from "@/lib/rateLimit";

const limiter = createRateLimiter("team", { windowMs: 60_000, max: 60 });

export async function GET(request: NextRequest) {
  if (!limiter.check(getIp(request))) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const members = await prisma.teamMember.findMany({
    where: { isActive: true },
    orderBy: [{ roleType: "asc" }, { displayOrder: "asc" }],
  });

  return NextResponse.json({ data: members });
}
