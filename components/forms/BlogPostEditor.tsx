"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save, Eye, Trash2, AlertCircle } from "lucide-react";
import { blogPostSchema, type BlogPostFormData } from "@/lib/validations";
import { slugify } from "@/lib/utils";
import ImageUpload from "@/components/ui/ImageUpload";
import RichTextEditor from "@/components/ui/RichTextEditor";

interface Category {
  id: string;
  name: string;
}

interface Props {
  postId?: string;
  initialData?: {
    title: string;
    slug: string;
    content: string;
    excerpt?: string;
    featuredImage?: string;
    categoryId: string;
    status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
    publishedAt?: string;
  };
  categories: Category[];
}

export default function BlogPostEditor({ postId, initialData, categories }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [autoSlug, setAutoSlug] = useState(!postId);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isDirty },
  } = useForm<BlogPostFormData>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      content: initialData?.content || "",
      excerpt: initialData?.excerpt || "",
      featuredImage: initialData?.featuredImage || "",
      categoryId: initialData?.categoryId || "",
      status: initialData?.status || "DRAFT",
      publishedAt: initialData?.publishedAt || "",
    },
  });

  const titleValue = watch("title");

  // Auto-generate slug from title on new posts
  useEffect(() => {
    if (autoSlug && titleValue) {
      setValue("slug", slugify(titleValue), { shouldDirty: false });
    }
  }, [titleValue, autoSlug, setValue]);

  async function onSubmit(data: BlogPostFormData) {
    setSaving(true);
    setError("");

    try {
      const url = postId
        ? `/api/admin/posts/${postId}`
        : "/api/admin/posts";
      const method = postId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.error || "Failed to save post.");
        return;
      }

      router.push("/admin/blog");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!postId) return;
    if (!confirm("Are you sure you want to delete this post? This cannot be undone.")) return;

    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/posts/${postId}`, { method: "DELETE" });
      if (res.ok) {
        router.push("/admin/blog");
        router.refresh();
      } else {
        setError("Failed to delete post.");
        setDeleting(false);
      }
    } catch {
      setError("Network error.");
      setDeleting(false);
    }
  }

  const currentSlug = watch("slug");
  const currentStatus = watch("status");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && (
        <div className="flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6 text-sm">
          <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-[#333] mb-1.5">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Post title..."
              {...register("title")}
              className="w-full px-4 py-2.5 border border-[#ddd] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1F4788] font-medium"
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
            )}
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-[#333] mb-1.5">
              URL Slug <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <span className="flex items-center px-3 bg-[#F5F5F5] border border-r-0 border-[#ddd] rounded-l text-xs text-[#999]">
                /blog/
              </span>
              <input
                type="text"
                {...register("slug")}
                onFocus={() => setAutoSlug(false)}
                className="flex-1 px-3 py-2.5 border border-[#ddd] rounded-r text-sm focus:outline-none focus:ring-2 focus:ring-[#1F4788] font-mono"
              />
            </div>
            {errors.slug && (
              <p className="text-red-500 text-xs mt-1">{errors.slug.message}</p>
            )}
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-[#333] mb-1.5">
              Content <span className="text-red-500">*</span>
            </label>
            <RichTextEditor
              value={watch("content") || ""}
              onChange={(html) => setValue("content", html, { shouldDirty: true, shouldValidate: true })}
              placeholder="Write your post content here…"
            />
            {errors.content && (
              <p className="text-red-500 text-xs mt-1">{errors.content.message}</p>
            )}
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium text-[#333] mb-1.5">
              Excerpt{" "}
              <span className="text-[#999] font-normal text-xs">
                (auto-generated if left blank)
              </span>
            </label>
            <textarea
              rows={3}
              placeholder="Short summary shown in blog listings and social previews..."
              {...register("excerpt")}
              className="w-full px-4 py-2.5 border border-[#ddd] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1F4788] resize-none"
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Publish actions */}
          <div className="bg-white border border-[#eee] rounded p-5 shadow-sm">
            <h3 className="font-semibold text-[#1F4788] mb-4 text-sm">
              Publish
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-[#555] mb-1.5">
                  Status
                </label>
                <select
                  {...register("status")}
                  className="w-full px-3 py-2 border border-[#ddd] rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#1F4788]"
                >
                  <option value="DRAFT">Draft</option>
                  <option value="PUBLISHED">Published</option>
                  <option value="ARCHIVED">Archived</option>
                </select>
              </div>

              {currentStatus === "PUBLISHED" && (
                <div>
                  <label className="block text-xs font-medium text-[#555] mb-1.5">
                    Publish Date
                  </label>
                  <input
                    type="datetime-local"
                    {...register("publishedAt")}
                    className="w-full px-3 py-2 border border-[#ddd] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1F4788]"
                  />
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 btn-primary text-sm py-2 px-4 justify-center disabled:opacity-60"
                >
                  <Save size={14} />
                  {saving ? "Saving..." : currentStatus === "PUBLISHED" ? "Publish" : "Save Draft"}
                </button>
              </div>

              {postId && currentStatus === "PUBLISHED" && (
                <a
                  href={`/blog/${currentSlug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 w-full text-xs text-[#666] border border-[#ddd] rounded py-2 hover:bg-[#F5F5F5] transition-colors"
                >
                  <Eye size={13} /> View Live Post
                </a>
              )}
            </div>
          </div>

          {/* Category */}
          <div className="bg-white border border-[#eee] rounded p-5 shadow-sm">
            <h3 className="font-semibold text-[#1F4788] mb-4 text-sm">
              Category <span className="text-red-500">*</span>
            </h3>
            <select
              {...register("categoryId")}
              className="w-full px-3 py-2 border border-[#ddd] rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#1F4788]"
              defaultValue=""
            >
              <option value="" disabled>
                Select category...
              </option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="text-red-500 text-xs mt-1">{errors.categoryId.message}</p>
            )}
          </div>

          {/* Featured image */}
          <div className="bg-white border border-[#eee] rounded p-5 shadow-sm">
            <h3 className="font-semibold text-[#1F4788] mb-4 text-sm">
              Featured Image
            </h3>
            <ImageUpload
              value={watch("featuredImage") || ""}
              onChange={(url) => setValue("featuredImage", url, { shouldDirty: true })}
              folder="blog"
              label="Featured Image"
            />
          </div>

          {/* Delete */}
          {postId && (
            <div className="bg-white border border-red-100 rounded p-5 shadow-sm">
              <h3 className="font-semibold text-red-600 mb-3 text-sm">
                Danger Zone
              </h3>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="flex items-center gap-2 text-red-600 border border-red-200 rounded px-4 py-2 text-sm font-semibold hover:bg-red-50 transition-colors disabled:opacity-50 w-full justify-center"
              >
                <Trash2 size={14} />
                {deleting ? "Deleting..." : "Delete Post"}
              </button>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
