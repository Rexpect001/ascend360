import { headers } from "next/headers";
import AdminSidebar from "@/components/layout/AdminSidebar";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default async function AdminSettingsPage() {
  const headerStore = await headers();
  const userRole = headerStore.get("x-user-role") || "EDITOR";
  const userName = headerStore.get("x-user-name") || "Admin";
  const userEmail = headerStore.get("x-user-email") || "";

  return (
    <div className="flex min-h-screen">
      <AdminSidebar userRole={userRole} userName={userName} userEmail={userEmail} />
      <div className="flex-1 bg-[#F5F5F5]">
        <header className="bg-white border-b border-[#eee] px-8 py-4">
          <h1 className="text-xl font-bold text-[#1F4788]">Settings</h1>
          <p className="text-sm text-[#666]">Site configuration and preferences</p>
        </header>
        <main className="p-8 max-w-2xl space-y-6">
          {/* Site info */}
          <div className="bg-white rounded shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-6">
            <h2 className="font-bold text-[#1F4788] mb-4">Site Information</h2>
            <div className="space-y-4">
              {[
                { label: "Site Name", value: "ASCEND360" },
                { label: "Contact Email", value: "info@ascend360.org" },
                { label: "Site URL", value: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000" },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between py-2 border-b border-[#f5f5f5]">
                  <span className="text-sm font-medium text-[#555]">{label}</span>
                  <span className="text-sm text-[#333] font-mono">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="bg-white rounded shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-6">
            <h2 className="font-bold text-[#1F4788] mb-4">Quick Links</h2>
            <div className="space-y-2">
              {[
                { label: "View Public Site", href: "/" },
                { label: "Blog Posts", href: "/admin/blog" },
                { label: "Manage Team", href: "/admin/team" },
                { label: "Submissions Inbox", href: "/admin/submissions" },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("/") && !href.startsWith("/admin") ? "_blank" : undefined}
                  className="flex items-center justify-between py-2.5 px-3 rounded hover:bg-[#F5F5F5] transition-colors"
                >
                  <span className="text-sm text-[#333]">{label}</span>
                  <ExternalLink size={13} className="text-[#999]" />
                </a>
              ))}
            </div>
          </div>

          {/* Env info */}
          <div className="bg-[#1F4788]/5 border border-[#1F4788]/20 rounded p-5">
            <h3 className="font-semibold text-[#1F4788] text-sm mb-2">Environment</h3>
            <p className="text-xs text-[#555] leading-relaxed">
              To update environment variables (database URL, API keys, etc.), edit the
              <code className="mx-1 bg-[#eee] px-1 rounded font-mono">.env</code>
              file and redeploy. See{" "}
              <Link href="/admin" className="text-[#4CAF50] hover:underline">
                SETUP.md
              </Link>{" "}
              for deployment instructions.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
