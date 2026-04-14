import { headers } from "next/headers";
import Link from "next/link";
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import AdminSidebar from "@/components/layout/AdminSidebar";
import { formatDateShort } from "@/lib/utils";

async function getPosts() {
  try {
    const headerStore = await headers();
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const cookie = headerStore.get("cookie") || "";

    const res = await fetch(`${baseUrl}/api/admin/posts?pageSize=50`, {
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

const statusStyles: Record<string, string> = {
  PUBLISHED: "bg-green-100 text-green-700",
  DRAFT: "bg-yellow-100 text-yellow-700",
  ARCHIVED: "bg-gray-100 text-gray-600",
};

export default async function AdminBlogPage() {
  const headerStore = await headers();
  const userRole = headerStore.get("x-user-role") || "EDITOR";
  const userName = headerStore.get("x-user-name") || "Admin";
  const userEmail = headerStore.get("x-user-email") || "";

  const posts = await getPosts();

  return (
    <div className="flex min-h-screen">
      <AdminSidebar userRole={userRole} userName={userName} userEmail={userEmail} />

      <div className="flex-1 bg-[#F5F5F5]">
        <header className="bg-white border-b border-[#eee] px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-[#1F4788]">Blog Posts</h1>
            <p className="text-sm text-[#666]">{posts.length} total posts</p>
          </div>
          <Link href="/admin/blog/new" className="btn-primary text-sm py-2 px-5">
            <Plus size={16} /> New Post
          </Link>
        </header>

        <main className="p-8">
          {posts.length === 0 ? (
            <div className="bg-white rounded shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-16 text-center">
              <p className="text-[#999] mb-4">No blog posts yet.</p>
              <Link href="/admin/blog/new" className="btn-primary text-sm">
                <Plus size={16} /> Write Your First Post
              </Link>
            </div>
          ) : (
            <div className="bg-white rounded shadow-[0_2px_8px_rgba(0,0,0,0.08)] overflow-hidden">
              <table className="w-full">
                <thead className="bg-[#F5F5F5] border-b border-[#eee]">
                  <tr>
                    <th className="text-left text-xs font-semibold text-[#666] px-6 py-3">
                      Title
                    </th>
                    <th className="text-left text-xs font-semibold text-[#666] px-4 py-3 hidden md:table-cell">
                      Author
                    </th>
                    <th className="text-left text-xs font-semibold text-[#666] px-4 py-3 hidden lg:table-cell">
                      Category
                    </th>
                    <th className="text-left text-xs font-semibold text-[#666] px-4 py-3">
                      Status
                    </th>
                    <th className="text-left text-xs font-semibold text-[#666] px-4 py-3 hidden lg:table-cell">
                      Date
                    </th>
                    <th className="text-right text-xs font-semibold text-[#666] px-6 py-3">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0f0f0]">
                  {posts.map(
                    (post: {
                      id: string;
                      title: string;
                      slug: string;
                      status: string;
                      publishedAt: string | null;
                      updatedAt: string;
                      author: { name: string };
                      category: { name: string };
                    }) => (
                      <tr key={post.id} className="hover:bg-[#fafafa]">
                        <td className="px-6 py-4">
                          <p className="font-medium text-[#333] text-sm line-clamp-1">
                            {post.title}
                          </p>
                          <p className="text-xs text-[#999] mt-0.5">/{post.slug}</p>
                        </td>
                        <td className="px-4 py-4 hidden md:table-cell">
                          <span className="text-sm text-[#555]">
                            {post.author.name}
                          </span>
                        </td>
                        <td className="px-4 py-4 hidden lg:table-cell">
                          <span className="text-sm text-[#555]">
                            {post.category.name}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusStyles[post.status] || ""}`}
                          >
                            {post.status}
                          </span>
                        </td>
                        <td className="px-4 py-4 hidden lg:table-cell">
                          <span className="text-xs text-[#999]">
                            {post.publishedAt
                              ? formatDateShort(post.publishedAt)
                              : formatDateShort(post.updatedAt)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 justify-end">
                            {post.status === "PUBLISHED" && (
                              <a
                                href={`/blog/${post.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 text-[#666] hover:text-[#1F4788] hover:bg-[#F5F5F5] rounded"
                                title="View live"
                              >
                                <Eye size={15} />
                              </a>
                            )}
                            <Link
                              href={`/admin/blog/${post.id}/edit`}
                              className="p-1.5 text-[#666] hover:text-[#1F4788] hover:bg-[#F5F5F5] rounded"
                              title="Edit"
                            >
                              <Edit size={15} />
                            </Link>
                            <DeletePostButton id={post.id} title={post.title} />
                          </div>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

// Inline delete button component
function DeletePostButton({ id, title }: { id: string; title: string }) {
  return (
    <form
      action={async () => {
        "use server";
        // Deletion is handled client-side via the edit page for safety
      }}
    >
      <button
        type="button"
        className="p-1.5 text-[#666] hover:text-red-500 hover:bg-red-50 rounded"
        title="Delete"
        onClick={undefined}
        aria-label={`Delete ${title}`}
      >
        <Trash2 size={15} />
      </button>
    </form>
  );
}
