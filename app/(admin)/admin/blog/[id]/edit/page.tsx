import { headers } from "next/headers";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AdminSidebar from "@/components/layout/AdminSidebar";
import BlogPostEditor from "@/components/forms/BlogPostEditor";

interface Props {
  params: Promise<{ id: string }>;
}

async function getPostAndCategories(id: string) {
  try {
    const headerStore = await headers();
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const cookie = headerStore.get("cookie") || "";

    const [postRes, catRes] = await Promise.all([
      fetch(`${baseUrl}/api/admin/posts/${id}`, {
        headers: { cookie },
        cache: "no-store",
      }),
      fetch(`${baseUrl}/api/admin/categories`, {
        headers: { cookie },
        cache: "no-store",
      }),
    ]);

    const post = postRes.ok ? (await postRes.json()).data : null;
    const categories = catRes.ok ? (await catRes.json()).data : [];

    return { post, categories };
  } catch {
    return { post: null, categories: [] };
  }
}

export default async function EditBlogPostPage({ params }: Props) {
  const { id } = await params;
  const headerStore = await headers();
  const userRole = headerStore.get("x-user-role") || "EDITOR";
  const userName = headerStore.get("x-user-name") || "Admin";
  const userEmail = headerStore.get("x-user-email") || "";

  const { post, categories } = await getPostAndCategories(id);
  if (!post) notFound();

  return (
    <div className="flex min-h-screen">
      <AdminSidebar userRole={userRole} userName={userName} userEmail={userEmail} />

      <div className="flex-1 bg-[#F5F5F5]">
        <header className="bg-white border-b border-[#eee] px-8 py-4">
          <Link
            href="/admin/blog"
            className="flex items-center gap-1.5 text-sm text-[#666] hover:text-[#1F4788] mb-2"
          >
            <ArrowLeft size={14} /> Back to Posts
          </Link>
          <h1 className="text-xl font-bold text-[#1F4788]">Edit Post</h1>
          <p className="text-sm text-[#666]">{post.title}</p>
        </header>

        <main className="p-8">
          <BlogPostEditor
            postId={id}
            initialData={{
              title: post.title,
              slug: post.slug,
              content: post.content,
              excerpt: post.excerpt || "",
              featuredImage: post.featuredImage || "",
              categoryId: post.categoryId || post.category?.id || "",
              status: post.status,
              publishedAt: post.publishedAt
                ? new Date(post.publishedAt).toISOString().slice(0, 16)
                : "",
            }}
            categories={categories}
          />
        </main>
      </div>
    </div>
  );
}
