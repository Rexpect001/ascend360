import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const user = await requireAuth(request);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "20");
  const type = searchParams.get("type");
  const read = searchParams.get("read");

  const where = {
    ...(type && { inquiryType: type as "STUDENT" | "VOLUNTEER" | "PARTNER" | "MEDIA" | "OTHER" }),
    ...(read !== null && read !== undefined && { readStatus: read === "true" }),
  };

  const [submissions, total] = await Promise.all([
    prisma.contactSubmission.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.contactSubmission.count({ where }),
  ]);

  return NextResponse.json({ data: submissions, total, page, pageSize, totalPages: Math.ceil(total / pageSize) });
}
