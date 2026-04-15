"use client";

import { useState } from "react";
import { Plus, Trash2, Shield, KeyRound, Eye, EyeOff } from "lucide-react";
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

function PasswordInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 pr-9 border border-[#ddd] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1F4788]"
      />
      <button type="button" onClick={() => setShow(!show)} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#999]">
        {show ? <EyeOff size={14} /> : <Eye size={14} />}
      </button>
    </div>
  );
}

export default function AdminUsersClient({ users: initial, currentUserId }: { users: User[]; currentUserId: string }) {
  const [users, setUsers] = useState(initial);

  // Create user modal
  const [showCreate, setShowCreate] = useState(false);
  const [createForm, setCreateForm] = useState({ name: "", email: "", role: "EDITOR" as User["role"], password: "" });
  const [createError, setCreateError] = useState("");
  const [creating, setCreating] = useState(false);

  // Change password modal
  const [pwTarget, setPwTarget] = useState<User | null>(null);
  const [pwForm, setPwForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [pwError, setPwError] = useState("");
  const [pwSaving, setPwSaving] = useState(false);
  const [pwSuccess, setPwSuccess] = useState(false);

  async function createUser() {
    if (!createForm.name || !createForm.email || !createForm.password) {
      setCreateError("All fields are required.");
      return;
    }
    setCreating(true);
    setCreateError("");
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createForm),
      });
      const json = await res.json();
      if (!res.ok) { setCreateError(json.error || "Failed to create user."); return; }
      setUsers((prev) => [...prev, json.data]);
      setShowCreate(false);
      setCreateForm({ name: "", email: "", role: "EDITOR", password: "" });
    } catch {
      setCreateError("Network error.");
    } finally {
      setCreating(false);
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

  async function changePassword() {
    if (!pwTarget) return;
    setPwError("");
    if (pwForm.newPassword !== pwForm.confirmPassword) {
      setPwError("Passwords do not match.");
      return;
    }
    setPwSaving(true);
    try {
      const isSelf = pwTarget.id === currentUserId;
      const url = isSelf ? "/api/auth/change-password" : `/api/admin/users/${pwTarget.id}`;
      const body = isSelf
        ? { currentPassword: pwForm.currentPassword, newPassword: pwForm.newPassword }
        : { newPassword: pwForm.newPassword };

      const res = await fetch(url, {
        method: isSelf ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!res.ok) { setPwError(json.error || "Failed to update password."); return; }
      setPwSuccess(true);
      setTimeout(() => { setPwTarget(null); setPwSuccess(false); setPwForm({ currentPassword: "", newPassword: "", confirmPassword: "" }); }, 1500);
    } catch {
      setPwError("Network error.");
    } finally {
      setPwSaving(false);
    }
  }

  return (
    <>
      <div className="flex justify-end mb-4">
        <button onClick={() => setShowCreate(true)} className="btn-primary text-sm py-2 px-5">
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
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-[#fafafa]">
                <td className="px-6 py-4">
                  <p className="font-medium text-[#333] text-sm">
                    {u.name}
                    {u.id === currentUserId && (
                      <span className="ml-2 text-[10px] font-semibold text-[#4CAF50] bg-green-50 px-1.5 py-0.5 rounded">you</span>
                    )}
                  </p>
                  <p className="text-xs text-[#999]">{u.email}</p>
                </td>
                <td className="px-4 py-4">
                  <select
                    value={u.role}
                    onChange={(e) => updateRole(u.id, e.target.value)}
                    disabled={u.id === currentUserId}
                    className={`text-xs font-semibold px-2 py-1 rounded border-0 cursor-pointer disabled:cursor-default ${roleColors[u.role]}`}
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
                  <div className="flex items-center gap-1.5 justify-end">
                    <button
                      onClick={() => { setPwTarget(u); setPwForm({ currentPassword: "", newPassword: "", confirmPassword: "" }); setPwError(""); setPwSuccess(false); }}
                      className="p-1.5 text-[#999] hover:text-[#1F4788] hover:bg-[#f0f4ff] rounded"
                      title="Change password"
                    >
                      <KeyRound size={14} />
                    </button>
                    <button
                      onClick={() => deleteUser(u.id, u.name)}
                      disabled={u.id === currentUserId}
                      className="p-1.5 text-[#999] hover:text-red-500 hover:bg-red-50 rounded disabled:opacity-30 disabled:cursor-not-allowed"
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

      {/* Create user modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="font-bold text-[#1F4788] flex items-center gap-2">
                <Shield size={18} /> Add Admin User
              </h2>
              <button onClick={() => setShowCreate(false)} className="text-[#999] text-xl">×</button>
            </div>
            <div className="p-6 space-y-4">
              {createError && <p className="text-red-500 text-sm bg-red-50 p-3 rounded">{createError}</p>}
              {(["name", "email"] as const).map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-[#333] mb-1.5 capitalize">{field === "name" ? "Full Name" : "Email Address"}</label>
                  <input
                    type={field === "email" ? "email" : "text"}
                    value={createForm[field]}
                    onChange={(e) => setCreateForm((f) => ({ ...f, [field]: e.target.value }))}
                    className="w-full px-3 py-2 border border-[#ddd] rounded text-sm focus:outline-none focus:ring-2 focus:ring-[#1F4788]"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-[#333] mb-1.5">Role</label>
                <select
                  value={createForm.role}
                  onChange={(e) => setCreateForm((f) => ({ ...f, role: e.target.value as User["role"] }))}
                  className="w-full px-3 py-2 border border-[#ddd] rounded text-sm bg-white"
                >
                  <option value="EDITOR">Editor</option>
                  <option value="ADMIN">Admin</option>
                  <option value="VIEWER">Viewer</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#333] mb-1.5">Temporary Password</label>
                <PasswordInput value={createForm.password} onChange={(v) => setCreateForm((f) => ({ ...f, password: v }))} placeholder="Min 12 chars, uppercase, number, special" />
                <p className="text-xs text-[#999] mt-1">User should change this on first login.</p>
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t">
              <button onClick={() => setShowCreate(false)} className="flex-1 px-4 py-2 border border-[#ddd] rounded text-sm hover:bg-[#F5F5F5]">Cancel</button>
              <button onClick={createUser} disabled={creating} className="flex-1 btn-primary text-sm justify-center disabled:opacity-60">
                {creating ? "Creating..." : "Create User"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change password modal */}
      {pwTarget && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="font-bold text-[#1F4788] flex items-center gap-2">
                <KeyRound size={18} />
                {pwTarget.id === currentUserId ? "Change My Password" : `Reset Password — ${pwTarget.name}`}
              </h2>
              <button onClick={() => setPwTarget(null)} className="text-[#999] text-xl">×</button>
            </div>
            <div className="p-6 space-y-4">
              {pwError && <p className="text-red-500 text-sm bg-red-50 p-3 rounded">{pwError}</p>}
              {pwSuccess && <p className="text-green-700 text-sm bg-green-50 p-3 rounded">Password updated successfully!</p>}
              {pwTarget.id === currentUserId && (
                <div>
                  <label className="block text-sm font-medium text-[#333] mb-1.5">Current Password</label>
                  <PasswordInput value={pwForm.currentPassword} onChange={(v) => setPwForm((f) => ({ ...f, currentPassword: v }))} />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-[#333] mb-1.5">New Password</label>
                <PasswordInput value={pwForm.newPassword} onChange={(v) => setPwForm((f) => ({ ...f, newPassword: v }))} placeholder="Min 12 chars, uppercase, number, special" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#333] mb-1.5">Confirm New Password</label>
                <PasswordInput value={pwForm.confirmPassword} onChange={(v) => setPwForm((f) => ({ ...f, confirmPassword: v }))} />
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t">
              <button onClick={() => setPwTarget(null)} className="flex-1 px-4 py-2 border border-[#ddd] rounded text-sm hover:bg-[#F5F5F5]">Cancel</button>
              <button onClick={changePassword} disabled={pwSaving || pwSuccess} className="flex-1 btn-primary text-sm justify-center disabled:opacity-60">
                {pwSaving ? "Saving..." : "Update Password"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
