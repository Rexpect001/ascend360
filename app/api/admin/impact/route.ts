import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { impactStorySchema } from "@/lib/validations";

export async function GET(request: NextRequest) {
  const user = await requireAuth(request);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const stories = await prisma.impactStory.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ data: stories });
}

export async function POST(request: NextRequest) {
  const user = await requireAuth(request);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const parsed = impactStorySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid data", details: parsed.error.flatten() }, { status: 400 });
    }

    const story = await prisma.impactStory.create({
      data: {
        studentName: parsed.data.studentName,
        storyTitle: parsed.data.storyTitle,
        storyContent: parsed.data.storyContent,
        imageUrl: parsed.data.imageUrl || null,
        outcome: parsed.data.outcome || null,
        isPublished: parsed.data.isPublished,
        publishedAt: parsed.data.isPublished ? new Date() : null,
      },
    });

    return NextResponse.json({ success: true, data: story }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
