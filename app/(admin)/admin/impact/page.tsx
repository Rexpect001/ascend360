"use client";

import { useState, useEffect, useCallback } from "react";
import AdminSidebar from "@/components/layout/AdminSidebar";
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { formatDateShort } from "@/lib/utils";

interface ImpactStory {
  id: string;
  studentName: string;
  storyTitle: string;
  storyContent: string;
  imageUrl: string | null;
  outcome: string | null;
  isPublished: boolean;
  createdAt: string;
  publishedAt: string | null;
}

const defaultForm = {
  studentName: "",
  storyTitle: "",
  storyContent: "",
  imageUrl: "",
  outcome: "",
  isPublished: false,
};

export default function AdminImpactPage() {
  const [stories, setStories] = useState<ImpactStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<ImpactStory | null>(null);
  const [form, setForm] = useState(defaultForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchStories = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/impact");
      const data = await res.json();
      setStories(data.data || []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchStories(); }, [fetchStories]);

  function openNew() {
    setEditing(null);
    setForm(defaultForm);
    setError("");
    setShowModal(true);
  }

  function openEdit(s: ImpactStory) {
    setEditing(s);
    setForm({
      studentName: s.studentName,
      storyTitle: s.storyTitle,
      storyContent: s.storyContent,
      imageUrl: s.imageUrl || "",
      outcome: s.outcome || "",
      isPublished: s.isPublished,
    });
    setError("");
    setShowModal(true);
  }

  async function handleSave() {
    if (!form.studentName || !form.storyTitle || !form.storyContent) {
      setError("Student name, title, and content are required.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const url = editing
        ? `/api/admin/impact/${editing.id}`
        : "/api/admin/impact";
      const method = editing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          publishedAt: form.isPublished ? new Date().toISOString() : null,
        }),
      });
      const json = await res.json();

      if (!res.ok) {
        setError(json.error || "Failed to save.");
        return;
      }

      setShowModal(false);
      fetchStories();
    } catch {
      setError("Network error.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete "${name}"?`)) return;
    await fetch(`/api/admin/impact/${id}`, { method: "DELETE" });
    setStories((prev) => prev.filter((s) => s.id !== id));
  }

  async function togglePublish(s: ImpactStory) {
    const res = await fetch(`/api/admin/impact/${s.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentName: s.studentName,
        storyTitle: s.storyTitle,
        storyContent: s.storyContent,
        imageUrl: s.imageUrl,
        outcome: s.outcome,
        isPublished: !s.isPublished,
        publishedAt: !s.isPublished ? new Date().toISOString() : null,
      }),
    });
    if (res.ok) {
      setStories((prev) =>
        prev.map((t) =>
          t.id === s.id ? { ...t, isPublished: !s.isPublished } : t
        )
      );
    }
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 bg-[#F5F5F5]">
        <header className="bg-white border-b border-[#eee] px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-[#1F4788]">Impact Stories</h1>
            <p className="text-sm text-[#666]">
              {stories.filter((s) => s.isPublished).length} published · {stories.length} total
            </p>
          </div>
          <button onClick={openNew} className="btn-primary text-sm py-2 px-5">
            <Plus size={16} /> Add Story
          </button>
        </header>

        <main className="p-8">
          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-white rounded shadow-sm h-20 animate-pulse" />
              ))}
            </div>
          ) : stories.length === 0 ? (
            <div className="bg-white rounded p-16 text-center shadow-sm">
              <p className="text-[#999] mb-4">No impact stories yet.</p>
              <button onClick={openNew} className="btn-primary text-sm">
                <Plus size={16} /> Add First Story
              </button>
            </div>
          ) : (
            <div className="bg-white rounded shadow-[0_2px_8px_rgba(0,0,0,0.08)] overflow-hidden">
              <table className="w-full">
                <thead className="bg-[#F5F5F5] border-b border-[#eee]">
                  <tr>
                    <th className="text-left text-xs font-semibold text-[#666] px-6 py-3">Student</th>
                    <th className="text-left text-xs font-semibold text-[#666] px-4 py-3 hidden md:table-cell">Outcome</th>
                    <th className="text-left text-xs font-semibold text-[#666] px-4 py-3">Status</th>
                    <th className="text-left text-xs font-semibold text-[#666] px-4 py-3 hidden lg:table-cell">Date</th>
                    <th className="text-right text-xs font-semibold text-[#666] px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0f0f0]">
                  {stories.map((s: ImpactStory) => (
                    <tr key={s.id} className="hover:bg-[#fafafa]">
                      <td className="px-6 py-4">
                        <p className="font-medium text-[#333] text-sm">{s.studentName}</p>
                        <p className="text-xs text-[#999] line-clamp-1">{s.storyTitle}</p>
                      </td>
                      <td className="px-4 py-4 hidden md:table-cell">
                        <span className="text-xs text-[#555]">
                          {s.outcome || "—"}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                            s.isPublished
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {s.isPublished ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td className="px-4 py-4 hidden lg:table-cell">
                        <span className="text-xs text-[#999]">
                          {formatDateShort(s.createdAt)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 justify-end">
                          <button
                            onClick={() => togglePublish(s)}
                            className="p-1.5 text-[#666] hover:text-[#4CAF50] rounded"
                            title={s.isPublished ? "Unpublish" : "Publish"}
                          >
                            {s.isPublished ? <EyeOff size={15} /> : <Eye size={15} />}
                          </button>
                          <button
                            onClick={() => openEdit(s)}
                            className="p-1.5 text-[#666] hover:text-[#1F4788] hover:bg-[#F5F5F5] rounded"
                          >
                            <Edit size={15} />
                          </button>
                          <button
                            onClick={() => handleDelete(s.id, s.storyTitle)}
                            className="p-1.5 text-[#666] hover:text-red-500 hover:bg-red-50 rounded"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="font-bold text-[#1F4788]">
                {editing ? "Edit Story" : "Add Impact Story"}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-[#999] hover:text-[#333] text-xl">×</button>
            </div>
            <div className="p-6 space-y-4">
              {error && <p className="text-red-500 text-sm bg-red-50 p-3 rounded">{error}</p>}
              {[
                { label: "Student Name", field: "studentName", type: "text", required: true },
                { label: "Story Title", field: "storyTitle", type: "text", required: true },
                { label: "Outcome (e.g. Won Mastercard Scholarship)", field: "outcome", type: "text" },
                { label: "Photo URL", field: "imageUrl", type: "url" },
              ].map(({ label, field, type, required }) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-[#333] mb-1.5">
                    {label} {required && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type={type}
                    value={form[field as keyof typeof form] as string}
                    onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                    className="w-full px-3 py-2 border border-[#ddd] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1F4788]"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-[#333] mb-1.5">
                  Story Content <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={5}
                  value={form.storyContent}
                  onChange={(e) => setForm((f) => ({ ...f, storyContent: e.target.value }))}
                  className="w-full px-3 py-2 border border-[#ddd] rounded text-sm resize-y"
                  placeholder="Tell the student's story in their own words..."
                />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isPublished}
                  onChange={(e) => setForm((f) => ({ ...f, isPublished: e.target.checked }))}
                  className="w-4 h-4 accent-[#4CAF50]"
                />
                <span className="text-sm font-medium text-[#333]">
                  Publish immediately
                </span>
              </label>
            </div>
            <div className="flex gap-3 p-6 border-t">
              <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 border border-[#ddd] rounded text-sm font-medium hover:bg-[#F5F5F5]">
                Cancel
              </button>
              <button onClick={handleSave} disabled={saving} className="flex-1 btn-primary text-sm justify-center disabled:opacity-60">
                {saving ? "Saving..." : editing ? "Update" : "Add Story"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
