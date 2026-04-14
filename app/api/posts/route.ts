import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");
  const category = searchParams.get("category");
  const search = searchParams.get("search");

  const where = {
    status: "PUBLISHED" as const,
    ...(category && { category: { slug: category } }),
    ...(search && {
      OR: [
        { title: { contains: search, mode: "insensitive" as const } },
        { excerpt: { contains: search, mode: "insensitive" as const } },
      ],
    }),
  };

  const [posts, total] = await Promise.all([
    prisma.blogPost.findMany({
      where,
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        featuredImage: true,
        publishedAt: true,
        createdAt: true,
        author: { select: { name: true } },
        category: { select: { name: true, slug: true } },
        content: true,
      },
      orderBy: { publishedAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.blogPost.count({ where }),
  ]);

  return NextResponse.json({
    data: posts,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  });
}
