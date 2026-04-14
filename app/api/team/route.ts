import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const members = await prisma.teamMember.findMany({
    where: { isActive: true },
    orderBy: [{ roleType: "asc" }, { displayOrder: "asc" }],
  });

  return NextResponse.json({ data: members });
}
