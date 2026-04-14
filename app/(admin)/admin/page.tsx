import { headers } from "next/headers";
import Link from "next/link";
import {
  FileText,
  MessageSquare,
  Users,
  Heart,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowRight,
} from "lucide-react";
import AdminSidebar from "@/components/layout/AdminSidebar";

async function getStats() {
  try {
    const headerStore = await headers();
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const cookie = headerStore.get("cookie") || "";

    const res = await fetch(`${baseUrl}/api/admin/stats`, {
      headers: { cookie },
      cache: "no-store",
    });

    if (!res.ok) return null;
    const data = await res.json();
    return data.data;
  } catch {
    return null;
  }
}

export default async function AdminDashboardPage() {
  const headerStore = await headers();
  const userName = headerStore.get("x-user-name") || "Admin";
  const userEmail = headerStore.get("x-user-email") || "";
  const userRole = headerStore.get("x-user-role") || "EDITOR";

  const stats = await getStats();

  const statCards = stats
    ? [
        {
          label: "Published Posts",
          value: stats.posts.published,
          sub: `${stats.posts.draft} drafts`,
          icon: FileText,
          href: "/admin/blog",
          color: "#1F4788",
        },
        {
          label: "Unread Submissions",
          value: stats.submissions.unread,
          sub: `${stats.submissions.total} total`,
          icon: MessageSquare,
          href: "/admin/submissions",
          color: stats.submissions.unread > 0 ? "#E53E3E" : "#4CAF50",
        },
        {
          label: "Team Members",
          value: stats.team.total,
          sub: "active members",
          icon: Users,
          href: "/admin/team",
          color: "#4CAF50",
        },
        {
          label: "Impact Stories",
          value: stats.stories.published,
          sub: `${stats.stories.total} total`,
          icon: Heart,
          href: "/admin/impact",
          color: "#FF9800",
        },
      ]
    : [];

  const quickActions = [
    { label: "Write New Post", href: "/admin/blog/new", icon: FileText },
    { label: "Add Team Member", href: "/admin/team/new", icon: Users },
    { label: "Add Impact Story", href: "/admin/impact/new", icon: Heart },
    { label: "View Submissions", href: "/admin/submissions", icon: MessageSquare },
  ];

  return (
    <div className="flex min-h-screen">
      <AdminSidebar userRole={userRole} userName={userName} userEmail={userEmail} />

      <div className="flex-1 bg-[#F5F5F5]">
        {/* Top bar */}
        <header className="bg-white border-b border-[#eee] px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-[#1F4788]">Dashboard</h1>
              <p className="text-sm text-[#666]">
                Welcome back, {userName}
              </p>
            </div>
            <Link href="/admin/blog/new" className="btn-primary text-sm py-2 px-5">
              + New Post
            </Link>
          </div>
        </header>

        <main className="p-8">
          {/* Stats Grid */}
          {stats ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statCards.map(({ label, value, sub, icon: Icon, href, color }) => (
                <Link
                  key={label}
                  href={href}
                  className="bg-white rounded shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-6 hover:-translate-y-0.5 transition-transform"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${color}15` }}
                    >
                      <Icon size={20} style={{ color }} />
                    </div>
                    <ArrowRight size={14} className="text-[#ccc]" />
                  </div>
                  <p className="text-3xl font-extrabold text-[#333] mb-1">{value}</p>
                  <p className="text-sm font-medium text-[#333]">{label}</p>
                  <p className="text-xs text-[#999] mt-0.5">{sub}</p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mb-8 flex items-start gap-3">
              <AlertCircle size={16} className="text-yellow-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-yellow-700">
                Could not load stats — database may not be connected yet. Run{" "}
                <code className="font-mono bg-yellow-100 px-1 rounded">npm run db:migrate && npm run db:seed</code>.
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Actions */}
            <div className="bg-white rounded shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-6">
              <h2 className="font-bold text-[#1F4788] mb-4">Quick Actions</h2>
              <div className="space-y-2">
                {quickActions.map(({ label, href, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center gap-3 p-3 rounded hover:bg-[#F5F5F5] transition-colors text-[#333] text-sm"
                  >
                    <Icon size={16} className="text-[#4CAF50]" />
                    {label}
                    <ArrowRight size={12} className="text-[#ccc] ml-auto" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent Submissions */}
            <div className="lg:col-span-2 bg-white rounded shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-[#1F4788]">Recent Submissions</h2>
                <Link
                  href="/admin/submissions"
                  className="text-xs text-[#4CAF50] font-semibold hover:underline"
                >
                  View All
                </Link>
              </div>
              {stats?.recentSubmissions?.length > 0 ? (
                <div className="space-y-3">
                  {stats.recentSubmissions.map(
                    (sub: {
                      id: string;
                      name: string;
                      email: string;
                      inquiryType: string;
                      createdAt: string;
                      readStatus: boolean;
                    }) => (
                      <div
                        key={sub.id}
                        className="flex items-start gap-3 py-3 border-b border-[#f0f0f0] last:border-0"
                      >
                        <div className="mt-0.5">
                          {sub.readStatus ? (
                            <CheckCircle size={14} className="text-[#4CAF50]" />
                          ) : (
                            <Clock size={14} className="text-orange-500" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-[#333] truncate">
                            {sub.name}
                          </p>
                          <p className="text-xs text-[#999] truncate">{sub.email}</p>
                        </div>
                        <span className="text-xs bg-[#F5F5F5] text-[#666] px-2 py-0.5 rounded flex-shrink-0">
                          {sub.inquiryType}
                        </span>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <p className="text-sm text-[#999] text-center py-8">
                  No submissions yet
                </p>
              )}
            </div>
          </div>

          {/* Getting Started checklist */}
          <div className="mt-6 bg-[#1F4788] rounded p-6 text-white">
            <h2 className="font-bold mb-4 flex items-center gap-2">
              <TrendingUp size={18} />
              Getting Started Checklist
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              {[
                { task: "Add team member photos", href: "/admin/team" },
                { task: "Write your first blog post", href: "/admin/blog/new" },
                { task: "Add an impact story", href: "/admin/impact/new" },
                { task: "Update project descriptions", href: "/admin/projects" },
                { task: "Review contact submissions", href: "/admin/submissions" },
                { task: "Configure site settings", href: "/admin/settings" },
              ].map(({ task, href }) => (
                <Link
                  key={task}
                  href={href}
                  className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors"
                >
                  <div className="w-4 h-4 border border-blue-400 rounded flex-shrink-0" />
                  {task}
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
