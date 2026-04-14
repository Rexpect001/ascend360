import { headers } from "next/headers";
import AdminSidebar from "@/components/layout/AdminSidebar";
import AdminProjectsClient from "./AdminProjectsClient";

async function getProjects() {
  try {
    const headerStore = await headers();
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const cookie = headerStore.get("cookie") || "";
    const res = await fetch(`${baseUrl}/api/projects`, { headers: { cookie }, cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch { return []; }
}

export default async function AdminProjectsPage() {
  const headerStore = await headers();
  const userRole = headerStore.get("x-user-role") || "EDITOR";
  const userName = headerStore.get("x-user-name") || "Admin";
  const userEmail = headerStore.get("x-user-email") || "";
  const projects = await getProjects();

  return (
    <div className="flex min-h-screen">
      <AdminSidebar userRole={userRole} userName={userName} userEmail={userEmail} />
      <div className="flex-1 bg-[#F5F5F5]">
        <header className="bg-white border-b border-[#eee] px-8 py-4">
          <h1 className="text-xl font-bold text-[#1F4788]">Projects</h1>
          <p className="text-sm text-[#666]">Edit project descriptions and status</p>
        </header>
        <main className="p-8">
          <AdminProjectsClient projects={projects} />
        </main>
      </div>
    </div>
  );
}
