import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await requireAuth(request);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await request.json();

  const story = await prisma.impactStory.update({
    where: { id },
    data: {
      studentName: body.studentName,
      storyTitle: body.storyTitle,
      storyContent: body.storyContent,
      imageUrl: body.imageUrl || null,
      outcome: body.outcome || null,
      isPublished: body.isPublished,
      publishedAt: body.isPublished ? (body.publishedAt ? new Date(body.publishedAt) : new Date()) : null,
    },
  });

  return NextResponse.json({ success: true, data: story });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await requireAuth(request);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await prisma.impactStory.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
