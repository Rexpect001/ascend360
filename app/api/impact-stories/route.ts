import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const stories = await prisma.impactStory.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: "desc" },
  });

  return NextResponse.json({ data: stories });
}
