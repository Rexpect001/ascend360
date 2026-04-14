import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import BlogList from "@/components/sections/BlogList";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights, student stories, scholarship opportunities, and news from ASCEND360 — Nigeria's education access NGO.",
};

async function getInitialData() {
  const [postsData, categories] = await Promise.all([
    prisma.blogPost.findMany({
      where: { status: "PUBLISHED" },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        featuredImage: true,
        publishedAt: true,
        content: true,
        author: { select: { name: true } },
        category: { select: { name: true, slug: true } },
      },
      orderBy: { publishedAt: "desc" },
      take: 9,
    }),
    prisma.category.findMany({
      include: {
        _count: { select: { posts: { where: { status: "PUBLISHED" } } } },
      },
      orderBy: { name: "asc" },
    }),
  ]);

  const total = await prisma.blogPost.count({ where: { status: "PUBLISHED" } });

  return { postsData, categories, total };
}

export default async function BlogPage() {
  const { postsData, categories, total } = await getInitialData();

  // Serialize dates for client component
  const posts = postsData.map((p: typeof postsData[number]) => ({
    ...p,
    publishedAt: p.publishedAt ? p.publishedAt.toISOString() : null,
  }));

  const cats = categories.map((c: typeof categories[number]) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    _count: c._count,
  }));

  return (
    <>
      {/* Hero */}
      <section
        className="relative py-24 px-4 text-white text-center overflow-hidden hero-section"
        style={{ backgroundImage: "url('/images/about-bg.svg')" }}
      >
        <div className="absolute inset-0" style={{ background: "rgba(10,28,68,0.80)" }} />
        <div className="absolute inset-0 bg-dots-white" />
        <div className="orb w-72 h-72 bg-[#4CAF50] top-[-60px] right-[-40px] opacity-[0.14] animate-float-a" />
        <div className="orb w-56 h-56 bg-[#2196F3] bottom-[-30px] left-[-30px] opacity-[0.16] animate-float-b" />
        <div className="max-w-3xl mx-auto relative z-10">
          <p className="text-[#4CAF50] font-semibold uppercase tracking-widest text-sm mb-3">
            Our Blog
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Stories, Insights & Opportunities
          </h1>
          <p className="text-blue-100 text-lg leading-relaxed">
            Student success stories, scholarship opportunities, education
            insights, and news from across the ASCEND360 community.
          </p>
        </div>
      </section>

      <BlogList initialPosts={posts} initialTotal={total} categories={cats} />
    </>
  );
}
