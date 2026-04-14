import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { teamMemberSchema } from "@/lib/validations";

export async function GET(request: NextRequest) {
  const user = await requireAuth(request);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const members = await prisma.teamMember.findMany({
    orderBy: [{ roleType: "asc" }, { displayOrder: "asc" }],
  });

  return NextResponse.json({ data: members });
}

export async function POST(request: NextRequest) {
  const user = await requireAuth(request);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const parsed = teamMemberSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid data", details: parsed.error.flatten() }, { status: 400 });
  }

  const member = await prisma.teamMember.create({
    data: {
      ...parsed.data,
      linkedinUrl: parsed.data.linkedinUrl || null,
      email: parsed.data.email || null,
    },
  });

  return NextResponse.json({ success: true, data: member }, { status: 201 });
}
