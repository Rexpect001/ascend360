import { headers } from "next/headers";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AdminSidebar from "@/components/layout/AdminSidebar";
import BlogPostEditor from "@/components/forms/BlogPostEditor";

async function getCategories() {
  try {
    const headerStore = await headers();
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const cookie = headerStore.get("cookie") || "";

    const res = await fetch(`${baseUrl}/api/admin/categories`, {
      headers: { cookie },
      cache: "no-store",
    });

    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch {
    return [];
  }
}

export default async function NewBlogPostPage() {
  const headerStore = await headers();
  const userRole = headerStore.get("x-user-role") || "EDITOR";
  const userName = headerStore.get("x-user-name") || "Admin";
  const userEmail = headerStore.get("x-user-email") || "";
  const categories = await getCategories();

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
          <h1 className="text-xl font-bold text-[#1F4788]">New Blog Post</h1>
        </header>

        <main className="p-8">
          <BlogPostEditor categories={categories} />
        </main>
      </div>
    </div>
  );
}
