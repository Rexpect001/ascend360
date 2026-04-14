"use client";

import { useState } from "react";
import { Edit, Save, X } from "lucide-react";

interface Project {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription: string | null;
  status: string;
  sdgAlignment: string | null;
}

export default function AdminProjectsClient({ projects: initial }: { projects: Project[] }) {
  const [projects, setProjects] = useState(initial);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Project>>({});
  const [saving, setSaving] = useState(false);

  const statusColors: Record<string, string> = {
    ACTIVE: "bg-green-100 text-green-700",
    COMING_SOON: "bg-yellow-100 text-yellow-700",
    INACTIVE: "bg-gray-100 text-gray-600",
  };

  function startEdit(p: Project) {
    setEditing(p.id);
    setForm({ description: p.description, longDescription: p.longDescription || "", status: p.status });
  }

  async function saveEdit(id: string) {
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, ...form } : p)));
        setEditing(null);
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      {projects.map((p: Project) => (
        <div key={p.id} className="bg-white rounded shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="font-bold text-[#1F4788] text-lg">{p.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-[#999]">/projects/{p.slug}</span>
                {p.sdgAlignment && (
                  <span className="text-xs font-semibold text-[#4CAF50]">{p.sdgAlignment}</span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColors[p.status] || ""}`}>
                {p.status.replace("_", " ")}
              </span>
              {editing === p.id ? (
                <button onClick={() => setEditing(null)} className="p-1.5 text-[#999] hover:text-[#333]">
                  <X size={16} />
                </button>
              ) : (
                <button onClick={() => startEdit(p)} className="p-1.5 text-[#666] hover:text-[#1F4788] hover:bg-[#F5F5F5] rounded">
                  <Edit size={16} />
                </button>
              )}
            </div>
          </div>

          {editing === p.id ? (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#555] mb-1">Status</label>
                <select
                  value={form.status || p.status}
                  onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
                  className="px-3 py-2 border border-[#ddd] rounded text-sm bg-white"
                >
                  <option value="ACTIVE">Active</option>
                  <option value="COMING_SOON">Coming Soon</option>
                  <option value="INACTIVE">Inactive</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-[#555] mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={form.description ?? p.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-[#ddd] rounded text-sm resize-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#555] mb-1">Long Description</label>
                <textarea
                  rows={5}
                  value={form.longDescription ?? p.longDescription ?? ""}
                  onChange={(e) => setForm((f) => ({ ...f, longDescription: e.target.value }))}
                  className="w-full px-3 py-2 border border-[#ddd] rounded text-sm resize-y"
                />
              </div>
              <button
                onClick={() => saveEdit(p.id)}
                disabled={saving}
                className="btn-primary text-sm py-2 px-5"
              >
                <Save size={14} /> {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          ) : (
            <p className="text-sm text-[#555] leading-relaxed">{p.description}</p>
          )}
        </div>
      ))}
    </div>
  );
}
