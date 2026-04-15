import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, hashPassword, validatePassword } from "@/lib/auth";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  const { id } = await params;
  const body = await request.json();

  // Admin password reset (no current password required)
  if (body.newPassword) {
    const err = validatePassword(body.newPassword);
    if (err) return NextResponse.json({ error: err }, { status: 400 });
    const passwordHash = await hashPassword(body.newPassword);
    await prisma.user.update({ where: { id }, data: { passwordHash } });
    return NextResponse.json({ success: true });
  }

  const user = await prisma.user.update({
    where: { id },
    data: {
      ...(body.role && { role: body.role }),
      ...(body.isActive !== undefined && { isActive: body.isActive }),
    },
    select: { id: true, name: true, email: true, role: true, isActive: true },
  });

  return NextResponse.json({ success: true, data: user });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await requireAdmin(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

  const { id } = await params;

  // Prevent deleting yourself
  if (id === admin.userId) {
    return NextResponse.json({ error: "Cannot delete your own account" }, { status: 400 });
  }

  await prisma.user.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
