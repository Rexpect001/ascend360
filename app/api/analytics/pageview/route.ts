import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createRateLimiter, getIp } from "@/lib/rateLimit";

const limiter = createRateLimiter("pageview", { windowMs: 10_000, max: 20 });

function detectDevice(ua: string): string {
  if (/tablet|ipad|playbook|silk/i.test(ua)) return "tablet";
  if (/mobile|iphone|ipod|android|blackberry|opera mini|windows phone/i.test(ua)) return "mobile";
  return "desktop";
}

export async function POST(request: NextRequest) {
  if (!limiter.check(getIp(request))) {
    return NextResponse.json({ ok: false }, { status: 429 });
  }

  try {
    const body = await request.json();
    const path = typeof body.path === "string" ? body.path.slice(0, 500) : "/";
    const referrer = typeof body.referrer === "string" ? body.referrer.slice(0, 500) : null;
    const ua = request.headers.get("user-agent") || "";
    const device = detectDevice(ua);

    await prisma.pageView.create({ data: { path, referrer, device } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
