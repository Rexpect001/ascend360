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

  const project = await prisma.project.update({
    where: { id },
    data: {
      ...(body.description && { description: body.description }),
      ...(body.longDescription !== undefined && { longDescription: body.longDescription }),
      ...(body.status && { status: body.status }),
      ...(body.featuredImage !== undefined && { featuredImage: body.featuredImage }),
      ...(body.heroImage !== undefined && { heroImage: body.heroImage }),
    },
  });

  return NextResponse.json({ success: true, data: project });
}
