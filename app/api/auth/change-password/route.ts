import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser, verifyPassword, hashPassword, validatePassword } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const user = await getAuthUser(request);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { currentPassword, newPassword } = body;

  if (!currentPassword || !newPassword) {
    return NextResponse.json({ error: "Both current and new password are required." }, { status: 400 });
  }

  const validationError = validatePassword(newPassword);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const dbUser = await prisma.user.findUnique({ where: { id: user.userId } });
  if (!dbUser) return NextResponse.json({ error: "User not found." }, { status: 404 });

  const isValid = await verifyPassword(currentPassword, dbUser.passwordHash);
  if (!isValid) {
    return NextResponse.json({ error: "Current password is incorrect." }, { status: 400 });
  }

  const passwordHash = await hashPassword(newPassword);
  await prisma.user.update({ where: { id: user.userId }, data: { passwordHash } });

  return NextResponse.json({ success: true });
}
