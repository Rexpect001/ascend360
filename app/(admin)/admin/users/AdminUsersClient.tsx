"use client";

import { useState } from "react";
import { Plus, Trash2, Shield } from "lucide-react";
import { formatDateShort } from "@/lib/utils";

interface User {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "EDITOR" | "VIEWER";
  isActive: boolean;
  lastLogin: string | null;
  createdAt: string;
}

const roleColors: Record<string, string> = {
  ADMIN: "bg-red-100 text-red-700",
  EDITOR: "bg-blue-100 text-blue-700",
  VIEWER: "bg-gray-100 text-gray-600",
};

export default function AdminUsersClient({ users: initial }: { users: User[] }) {
  const [users, setUsers] = useState(initial);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", role: "EDITOR" as "ADMIN" | "EDITOR" | "VIEWER", password: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function createUser() {
    if (!form.name || !form.email || !form.password) {
      setError("All fields are required.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Failed to create user.");
        return;
      }
      setUsers((prev) => [...prev, json.data]);
      setShowModal(false);
      setForm({ name: "", email: "", role: "EDITOR", password: "" });
    } catch {
      setError("Network error.");
    } finally {
      setSaving(false);
    }
  }

  async function updateRole(id: string, role: string) {
    await fetch(`/api/admin/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role }),
    });
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role: role as User["role"] } : u)));
  }

  async function deleteUser(id: string, name: string) {
    if (!confirm(`Delete user ${name}? This cannot be undone.`)) return;
    await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
    setUsers((prev) => prev.filter((u) => u.id !== id));
  }

  return (
    <>
      <div className="flex justify-end mb-4">
        <button onClick={() => setShowModal(true)} className="btn-primary text-sm py-2 px-5">
          <Plus size={16} /> Add User
        </button>
      </div>

      <div className="bg-white rounded shadow-[0_2px_8px_rgba(0,0,0,0.08)] overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#F5F5F5] border-b border-[#eee]">
            <tr>
              <th className="text-left text-xs font-semibold text-[#666] px-6 py-3">User</th>
              <th className="text-left text-xs font-semibold text-[#666] px-4 py-3">Role</th>
              <th className="text-left text-xs font-semibold text-[#666] px-4 py-3 hidden lg:table-cell">Last Login</th>
              <th className="text-right text-xs font-semibold text-[#666] px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f0f0f0]">
            {users.map((u: User) => (
              <tr key={u.id} className="hover:bg-[#fafafa]">
                <td className="px-6 py-4">
                  <p className="font-medium text-[#333] text-sm">{u.name}</p>
                  <p className="text-xs text-[#999]">{u.email}</p>
                </td>
                <td className="px-4 py-4">
                  <select
                    value={u.role}
                    onChange={(e) => updateRole(u.id, e.target.value)}
                    className={`text-xs font-semibold px-2 py-1 rounded border-0 cursor-pointer ${roleColors[u.role]}`}
                  >
                    <option value="ADMIN">ADMIN</option>
                    <option value="EDITOR">EDITOR</option>
                    <option value="VIEWER">VIEWER</option>
                  </select>
                </td>
                <td className="px-4 py-4 hidden lg:table-cell">
                  <span className="text-xs text-[#999]">
                    {u.lastLogin ? formatDateShort(u.lastLogin) : "Never"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 justify-end">
                    <button
                      onClick={() => deleteUser(u.id, u.name)}
                      className="p-1.5 text-[#999] hover:text-red-500 hover:bg-red-50 rounded"
                      title="Delete user"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="font-bold text-[#1F4788] flex items-center gap-2">
                <Shield size={18} /> Add Admin User
              </h2>
              <button onClick={() => setShowModal(false)} className="text-[#999] text-xl">×</button>
            </div>
            <div className="p-6 space-y-4">
              {error && <p className="text-red-500 text-sm bg-red-50 p-3 rounded">{error}</p>}
              {[
                { label: "Full Name", field: "name", type: "text" },
                { label: "Email Address", field: "email", type: "email" },
              ].map(({ label, field, type }) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-[#333] mb-1.5">{label}</label>
                  <input
                    type={type}
                    value={form[field as "name" | "email"]}
                    onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                    className="w-full px-3 py-2 border border-[#ddd] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1F4788]"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-[#333] mb-1.5">Role</label>
                <select
                  value={form.role}
                  onChange={(e) => setForm((f) => ({ ...f, role: e.target.value as User["role"] }))}
                  className="w-full px-3 py-2 border border-[#ddd] rounded text-sm bg-white"
                >
                  <option value="EDITOR">Editor</option>
                  <option value="ADMIN">Admin</option>
                  <option value="VIEWER">Viewer</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#333] mb-1.5">
                  Temporary Password
                </label>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                  placeholder="Min 12 chars, uppercase, number, special char"
                  className="w-full px-3 py-2 border border-[#ddd] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1F4788]"
                />
                <p className="text-xs text-[#999] mt-1">
                  User should change this on first login.
                </p>
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t">
              <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 border border-[#ddd] rounded text-sm hover:bg-[#F5F5F5]">
                Cancel
              </button>
              <button onClick={createUser} disabled={saving} className="flex-1 btn-primary text-sm justify-center disabled:opacity-60">
                {saving ? "Creating..." : "Create User"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
