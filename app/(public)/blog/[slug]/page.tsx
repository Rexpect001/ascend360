import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Clock, User, Tag, BookOpen } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatDate, estimateReadTime } from "@/lib/utils";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { slug, status: "PUBLISHED" },
    select: { title: true, excerpt: true, featuredImage: true },
  });

  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.excerpt || undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
      images: post.featuredImage ? [post.featuredImage] : [],
    },
  };
}

async function getPost(slug: string) {
  const post = await prisma.blogPost.findUnique({
    where: { slug, status: "PUBLISHED" },
    include: {
      author: { select: { name: true } },
      category: { select: { name: true, slug: true } },
    },
  });

  if (!post) return null;

  const related = await prisma.blogPost.findMany({
    where: {
      status: "PUBLISHED",
      categoryId: post.categoryId,
      NOT: { id: post.id },
    },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      featuredImage: true,
      publishedAt: true,
      content: true,
      category: { select: { name: true } },
    },
    orderBy: { publishedAt: "desc" },
    take: 3,
  });

  return { post, related };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const data = await getPost(slug);

  if (!data) notFound();
  const { post, related } = data;

  return (
    <>
      {/* Featured image */}
      {post.featuredImage && (
        <div className="relative w-full h-72 md:h-96">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main content */}
          <article className="lg:col-span-3">
            {/* Back link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-[#666] hover:text-[#1F4788] mb-6"
            >
              <ArrowLeft size={14} /> Back to Blog
            </Link>

            {/* Category */}
            <div className="mb-4">
              <Link
                href={`/blog?category=${post.category.slug}`}
                className="inline-block text-xs font-bold text-[#4CAF50] bg-[#4CAF50]/10 px-3 py-1 rounded-full hover:bg-[#4CAF50]/20 transition-colors"
              >
                {post.category.name}
              </Link>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#1F4788] leading-tight mb-5">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-[#666] mb-8 pb-8 border-b border-[#eee]">
              <span className="flex items-center gap-1.5">
                <User size={14} className="text-[#999]" />
                {post.author.name}
              </span>
              {post.publishedAt && (
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-[#999]" />
                  {formatDate(post.publishedAt)}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Clock size={14} className="text-[#999]" />
                {estimateReadTime(post.content)} min read
              </span>
            </div>

            {/* Content */}
            <div
              className="prose"
              dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, "<br />") }}
            />

            {/* Author bio card */}
            <div className="mt-12 bg-[#F5F5F5] rounded-lg p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[#1F4788] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                {post.author.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-bold text-[#333]">{post.author.name}</p>
                <p className="text-sm text-[#666]">ASCEND360 Team</p>
                <p className="text-sm text-[#666] mt-1 leading-relaxed">
                  Part of the ASCEND360 team working to expand education access
                  across Nigeria.
                </p>
              </div>
            </div>

            {/* Share */}
            <div className="mt-8 flex items-center gap-3">
              <span className="text-sm font-semibold text-[#555]">
                Share this post:
              </span>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-[#1DA1F2] hover:underline"
              >
                Twitter/X
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-[#0A66C2] hover:underline"
              >
                LinkedIn
              </a>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-8">
            {/* Category badge */}
            <div className="bg-white rounded shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-5">
              <h3 className="font-bold text-[#1F4788] mb-3 text-sm flex items-center gap-2">
                <Tag size={14} /> Category
              </h3>
              <Link
                href={`/blog?category=${post.category.slug}`}
                className="text-sm text-[#4CAF50] font-semibold hover:underline"
              >
                {post.category.name}
              </Link>
            </div>

            {/* Related posts */}
            {related.length > 0 && (
              <div className="bg-white rounded shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-5">
                <h3 className="font-bold text-[#1F4788] mb-4 text-sm">
                  Related Posts
                </h3>
                <div className="space-y-4">
                  {related.map((r: typeof related[number]) => (
                    <Link
                      key={r.id}
                      href={`/blog/${r.slug}`}
                      className="block group"
                    >
                      {r.featuredImage ? (
                        <div className="relative h-28 rounded overflow-hidden mb-2">
                          <Image
                            src={r.featuredImage}
                            alt={r.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-200"
                          />
                        </div>
                      ) : (
                        <div className="h-28 rounded bg-gradient-to-br from-[#1F4788] to-[#2d5aab] flex items-center justify-center mb-2">
                          <BookOpen size={24} className="text-white/30" />
                        </div>
                      )}
                      <p className="text-sm font-semibold text-[#333] group-hover:text-[#1F4788] line-clamp-2 leading-snug">
                        {r.title}
                      </p>
                      <p className="text-xs text-[#999] mt-1">
                        {estimateReadTime(r.content)} min read
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="bg-[#1F4788] rounded p-5 text-white text-center">
              <h3 className="font-bold mb-2 text-sm">Get Involved</h3>
              <p className="text-blue-200 text-xs mb-4 leading-relaxed">
                Ready to join ASCEND360's mission?
              </p>
              <Link
                href="/get-involved"
                className="block bg-[#4CAF50] text-white text-xs font-bold py-2.5 px-4 rounded hover:bg-[#388E3C] transition-colors"
              >
                Learn How →
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
