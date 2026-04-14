"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { formatDateShort, estimateReadTime } from "@/lib/utils";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featuredImage: string | null;
  publishedAt: string | null;
  content: string;
  author: { name: string };
  category: { name: string; slug: string };
}

interface Category {
  id: string;
  name: string;
  slug: string;
  _count: { posts: number };
}

interface Props {
  initialPosts: Post[];
  initialTotal: number;
  categories: Category[];
}

const PAGE_SIZE = 9;

export default function BlogList({ initialPosts, initialTotal, categories }: Props) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [total, setTotal] = useState(initialTotal);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const fetchPosts = useCallback(async (p: number, q: string, cat: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(p),
        pageSize: String(PAGE_SIZE),
        ...(q && { search: q }),
        ...(cat && { category: cat }),
      });
      const res = await fetch(`/api/posts?${params}`);
      const data = await res.json();
      setPosts(data.data);
      setTotal(data.total);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
    }, 350);
    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    fetchPosts(page, search, activeCategory);
  }, [page, search, activeCategory, fetchPosts]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  function handleCategory(slug: string) {
    setActiveCategory(slug === activeCategory ? "" : slug);
    setPage(1);
  }

  return (
    <>
      {/* Search + Filters */}
      <div className="bg-[#F5F5F5] py-6 px-4 sticky top-16 z-30 border-b border-[#e0e0e0]">
        <div className="max-w-6xl mx-auto">
          {/* Search */}
          <div className="relative max-w-xl mb-4">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999]"
            />
            <input
              type="search"
              placeholder="Search posts..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-[#ddd] rounded bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#1F4788]"
            />
          </div>
          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCategory("")}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
                activeCategory === ""
                  ? "bg-[#1F4788] text-white"
                  : "bg-white text-[#555] border border-[#ddd] hover:border-[#1F4788] hover:text-[#1F4788]"
              }`}
            >
              All Posts ({total})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => handleCategory(cat.slug)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
                  activeCategory === cat.slug
                    ? "bg-[#1F4788] text-white"
                    : "bg-white text-[#555] border border-[#ddd] hover:border-[#1F4788] hover:text-[#1F4788]"
                }`}
              >
                {cat.name} ({cat._count.posts})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Posts grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded shadow-[0_2px_8px_rgba(0,0,0,0.08)] overflow-hidden animate-pulse">
                  <div className="h-48 bg-[#eee]" />
                  <div className="p-5 space-y-3">
                    <div className="h-3 bg-[#eee] rounded w-24" />
                    <div className="h-4 bg-[#eee] rounded" />
                    <div className="h-4 bg-[#eee] rounded w-3/4" />
                    <div className="h-3 bg-[#eee] rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen size={48} className="text-[#ccc] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-[#555] mb-1">
                No posts found
              </h3>
              <p className="text-[#999] text-sm">
                {search
                  ? `No results for "${search}"`
                  : "No posts in this category yet."}
              </p>
              {(search || activeCategory) && (
                <button
                  onClick={() => {
                    setSearchInput("");
                    setSearch("");
                    setActiveCategory("");
                    setPage(1);
                  }}
                  className="mt-4 text-[#4CAF50] font-semibold text-sm hover:underline"
                >
                  Clear filters
                </button>
              )}
            </div>
          ) : (
            <>
              <p className="text-sm text-[#999] mb-6">
                Showing {posts.length} of {total} post{total !== 1 ? "s" : ""}
                {search && ` for "${search}"`}
                {activeCategory &&
                  ` in ${categories.find((c) => c.slug === activeCategory)?.name}`}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <article
                    key={post.id}
                    className="bg-white rounded shadow-[0_2px_8px_rgba(0,0,0,0.08)] overflow-hidden hover:-translate-y-1 transition-transform duration-200 flex flex-col"
                  >
                    {post.featuredImage ? (
                      <div className="relative h-48 overflow-hidden flex-shrink-0">
                        <Image
                          src={post.featuredImage}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-48 bg-gradient-to-br from-[#1F4788] to-[#2d5aab] flex items-center justify-center flex-shrink-0">
                        <BookOpen size={40} className="text-white/30" />
                      </div>
                    )}
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold text-[#4CAF50] bg-[#4CAF50]/10 px-2 py-0.5 rounded">
                          {post.category.name}
                        </span>
                        <span className="text-xs text-[#999]">
                          {estimateReadTime(post.content)} min read
                        </span>
                      </div>
                      <h2 className="font-bold text-[#1F4788] mb-2 line-clamp-2 leading-snug">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="text-[#666] text-sm line-clamp-2 mb-4 flex-1">
                          {post.excerpt}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#f0f0f0]">
                        <div>
                          <p className="text-xs font-medium text-[#555]">
                            {post.author.name}
                          </p>
                          <p className="text-xs text-[#999]">
                            {post.publishedAt
                              ? formatDateShort(post.publishedAt)
                              : ""}
                          </p>
                        </div>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="text-xs font-bold text-[#4CAF50] hover:underline"
                        >
                          Read More →
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  <button
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className="w-9 h-9 flex items-center justify-center rounded border border-[#ddd] disabled:opacity-40 hover:border-[#1F4788] hover:text-[#1F4788] transition-colors"
                    aria-label="Previous page"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((n) => n === 1 || n === totalPages || Math.abs(n - page) <= 1)
                    .reduce<(number | "...")[]>((acc, n, idx, arr) => {
                      if (idx > 0 && n - (arr[idx - 1] as number) > 1) acc.push("...");
                      acc.push(n);
                      return acc;
                    }, [])
                    .map((item, i) =>
                      item === "..." ? (
                        <span key={`e${i}`} className="px-2 text-[#999]">…</span>
                      ) : (
                        <button
                          key={item}
                          onClick={() => setPage(item as number)}
                          className={`w-9 h-9 flex items-center justify-center rounded text-sm font-medium transition-colors ${
                            page === item
                              ? "bg-[#1F4788] text-white"
                              : "border border-[#ddd] hover:border-[#1F4788] hover:text-[#1F4788]"
                          }`}
                        >
                          {item}
                        </button>
                      )
                    )}
                  <button
                    onClick={() => setPage(Math.min(totalPages, page + 1))}
                    disabled={page === totalPages}
                    className="w-9 h-9 flex items-center justify-center rounded border border-[#ddd] disabled:opacity-40 hover:border-[#1F4788] hover:text-[#1F4788] transition-colors"
                    aria-label="Next page"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
