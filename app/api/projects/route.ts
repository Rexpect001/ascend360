import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const projects = await prisma.project.findMany({
    where: { status: { not: "INACTIVE" } },
    orderBy: { displayOrder: "asc" },
  });

  return NextResponse.json({ data: projects });
}
