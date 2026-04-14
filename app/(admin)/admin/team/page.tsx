"use client";

import { useState, useEffect, useCallback } from "react";
import AdminSidebar from "@/components/layout/AdminSidebar";
import { Plus, Edit, Trash2, ExternalLink, Mail, ToggleLeft, ToggleRight } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  title: string;
  roleType: "TRUSTEE" | "STAFF" | "MENTOR";
  bio: string | null;
  imageUrl: string | null;
  linkedinUrl: string | null;
  email: string | null;
  displayOrder: number;
  isActive: boolean;
}

const roleLabels = { TRUSTEE: "Trustee", STAFF: "Staff", MENTOR: "Mentor" };
const roleColors: Record<string, string> = {
  TRUSTEE: "bg-[#1F4788] text-white",
  STAFF: "bg-[#4CAF50] text-white",
  MENTOR: "bg-purple-600 text-white",
};

type FormState = {
  name: string;
  title: string;
  roleType: "TRUSTEE" | "STAFF" | "MENTOR";
  bio: string;
  imageUrl: string;
  linkedinUrl: string;
  email: string;
  displayOrder: number;
};

const defaultForm: FormState = {
  name: "",
  title: "",
  roleType: "MENTOR",
  bio: "",
  imageUrl: "",
  linkedinUrl: "",
  email: "",
  displayOrder: 0,
};

export default function AdminTeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [form, setForm] = useState<FormState>(defaultForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchMembers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/team");
      const data = await res.json();
      setMembers(data.data || []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchMembers(); }, [fetchMembers]);

  function openNew() {
    setEditing(null);
    setForm(defaultForm);
    setError("");
    setShowModal(true);
  }

  function openEdit(m: TeamMember) {
    setEditing(m);
    setForm({
      name: m.name,
      title: m.title,
      roleType: m.roleType,
      bio: m.bio || "",
      imageUrl: m.imageUrl || "",
      linkedinUrl: m.linkedinUrl || "",
      email: m.email || "",
      displayOrder: m.displayOrder,
    });
    setError("");
    setShowModal(true);
  }

  async function handleSave() {
    setSaving(true);
    setError("");
    try {
      const url = editing
        ? `/api/admin/team/${editing.id}`
        : "/api/admin/team";
      const method = editing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();

      if (!res.ok) {
        setError(json.error || "Failed to save.");
        return;
      }

      setShowModal(false);
      fetchMembers();
    } catch {
      setError("Network error.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete ${name}?`)) return;
    await fetch(`/api/admin/team/${id}`, { method: "DELETE" });
    setMembers((prev) => prev.filter((m) => m.id !== id));
  }

  async function toggleActive(m: TeamMember) {
    await fetch(`/api/admin/team/${m.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...m, isActive: !m.isActive }),
    });
    setMembers((prev) =>
      prev.map((t) => (t.id === m.id ? { ...t, isActive: !t.isActive } : t))
    );
  }

  const grouped = members.reduce<Record<string, TeamMember[]>>((acc, m) => {
    if (!acc[m.roleType]) acc[m.roleType] = [];
    acc[m.roleType].push(m);
    return acc;
  }, {});

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 bg-[#F5F5F5]">
        <header className="bg-white border-b border-[#eee] px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-[#1F4788]">Team Members</h1>
            <p className="text-sm text-[#666]">{members.length} members</p>
          </div>
          <button onClick={openNew} className="btn-primary text-sm py-2 px-5">
            <Plus size={16} /> Add Member
          </button>
        </header>

        <main className="p-8 space-y-8">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-white rounded shadow-sm h-48 animate-pulse" />
              ))}
            </div>
          ) : (
            ["TRUSTEE", "STAFF", "MENTOR"].map((role) => {
              const group = grouped[role];
              if (!group || group.length === 0) return null;
              return (
                <section key={role}>
                  <h2 className="text-sm font-bold text-[#666] uppercase tracking-wider mb-4">
                    {roleLabels[role as keyof typeof roleLabels]}s ({group.length})
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {group.map((m) => (
                      <div
                        key={m.id}
                        className={`bg-white rounded shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-5 ${
                          !m.isActive ? "opacity-60" : ""
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#1F4788] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                              {m.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-semibold text-[#333] text-sm">{m.name}</p>
                              <p className="text-xs text-[#666]">{m.title}</p>
                            </div>
                          </div>
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${roleColors[m.roleType]}`}>
                            {roleLabels[m.roleType as keyof typeof roleLabels]}
                          </span>
                        </div>
                        {m.bio && (
                          <p className="text-xs text-[#666] leading-relaxed line-clamp-2 mb-3">
                            {m.bio}
                          </p>
                        )}
                        <div className="flex items-center gap-2 justify-between">
                          <div className="flex gap-2">
                            {m.linkedinUrl && (
                              <a
                                href={m.linkedinUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 text-[#666] hover:text-[#0A66C2] rounded"
                                title="LinkedIn"
                              >
                                <ExternalLink size={14} />
                              </a>
                            )}
                            {m.email && (
                              <a
                                href={`mailto:${m.email}`}
                                className="p-1.5 text-[#666] hover:text-[#4CAF50] rounded"
                              >
                                <Mail size={14} />
                              </a>
                            )}
                          </div>
                          <div className="flex gap-1">
                            <button
                              onClick={() => toggleActive(m)}
                              className="p-1.5 text-[#666] hover:text-[#1F4788] rounded"
                              title={m.isActive ? "Deactivate" : "Activate"}
                            >
                              {m.isActive ? (
                                <ToggleRight size={16} className="text-[#4CAF50]" />
                              ) : (
                                <ToggleLeft size={16} />
                              )}
                            </button>
                            <button
                              onClick={() => openEdit(m)}
                              className="p-1.5 text-[#666] hover:text-[#1F4788] hover:bg-[#F5F5F5] rounded"
                            >
                              <Edit size={14} />
                            </button>
                            <button
                              onClick={() => handleDelete(m.id, m.name)}
                              className="p-1.5 text-[#666] hover:text-red-500 hover:bg-red-50 rounded"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              );
            })
          )}

          {!loading && members.length === 0 && (
            <div className="bg-white rounded p-16 text-center shadow-sm">
              <p className="text-[#999] mb-4">No team members yet.</p>
              <button onClick={openNew} className="btn-primary text-sm">
                <Plus size={16} /> Add First Member
              </button>
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
                {editing ? "Edit Team Member" : "Add Team Member"}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-[#999] hover:text-[#333] text-xl leading-none">×</button>
            </div>
            <div className="p-6 space-y-4">
              {error && (
                <p className="text-red-500 text-sm bg-red-50 p-3 rounded">{error}</p>
              )}
              {[
                { label: "Full Name", field: "name", type: "text", required: true },
                { label: "Title / Role", field: "title", type: "text", required: true },
                { label: "Photo URL", field: "imageUrl", type: "url" },
                { label: "LinkedIn URL", field: "linkedinUrl", type: "url" },
                { label: "Email", field: "email", type: "email" },
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
                <label className="block text-sm font-medium text-[#333] mb-1.5">Role Type</label>
                <select
                  value={form.roleType}
                  onChange={(e) => setForm((f) => ({ ...f, roleType: e.target.value as typeof f.roleType }))}
                  className="w-full px-3 py-2 border border-[#ddd] rounded text-sm bg-white"
                >
                  <option value="TRUSTEE">Trustee</option>
                  <option value="STAFF">Staff</option>
                  <option value="MENTOR">Mentor</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#333] mb-1.5">Bio</label>
                <textarea
                  rows={3}
                  value={form.bio}
                  onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
                  className="w-full px-3 py-2 border border-[#ddd] rounded text-sm resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#333] mb-1.5">Display Order</label>
                <input
                  type="number"
                  value={form.displayOrder}
                  onChange={(e) => setForm((f) => ({ ...f, displayOrder: parseInt(e.target.value) || 0 }))}
                  className="w-full px-3 py-2 border border-[#ddd] rounded text-sm"
                />
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t">
              <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 border border-[#ddd] rounded text-sm font-medium hover:bg-[#F5F5F5]">
                Cancel
              </button>
              <button onClick={handleSave} disabled={saving} className="flex-1 btn-primary text-sm justify-center disabled:opacity-60">
                {saving ? "Saving..." : editing ? "Update" : "Add Member"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
