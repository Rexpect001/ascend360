import { headers } from "next/headers";
import Link from "next/link";
import {
  TrendingUp,
  Eye,
  Smartphone,
  Monitor,
  Tablet,
  MessageSquare,
  BarChart2,
  ArrowRight,
} from "lucide-react";
import AdminSidebar from "@/components/layout/AdminSidebar";

type AnalyticsData = {
  overview: { views30d: number; views7d: number };
  topPages: { path: string; views: number }[];
  devices: { device: string; count: number }[];
  submissionsByType: { type: string; count: number }[];
  dailyViews: { day: string; count: number }[];
};

async function getAnalytics(): Promise<AnalyticsData | null> {
  try {
    const headerStore = await headers();
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const cookie = headerStore.get("cookie") || "";

    const res = await fetch(`${baseUrl}/api/admin/analytics`, {
      headers: { cookie },
      cache: "no-store",
    });

    if (!res.ok) return null;
    const json = await res.json();
    return json.data;
  } catch {
    return null;
  }
}

function inquiryLabel(type: string) {
  const map: Record<string, string> = {
    STUDENT: "Student",
    VOLUNTEER: "Volunteer",
    PARTNER: "Partner",
    MEDIA: "Media",
    OTHER: "Other",
  };
  return map[type] ?? type;
}

function deviceIcon(device: string) {
  if (device === "mobile") return Smartphone;
  if (device === "tablet") return Tablet;
  return Monitor;
}

export default async function AnalyticsPage() {
  const headerStore = await headers();
  const userName = headerStore.get("x-user-name") || "Admin";
  const userEmail = headerStore.get("x-user-email") || "";
  const userRole = headerStore.get("x-user-role") || "EDITOR";

  const data = await getAnalytics();

  const totalDevices = data?.devices.reduce((s, d) => s + d.count, 0) || 0;
  const totalSubmissions = data?.submissionsByType.reduce((s, d) => s + d.count, 0) || 0;

  // Sparkline: normalise daily views to a 0-40 height bar chart
  const maxDaily = data ? Math.max(...data.dailyViews.map((d) => d.count), 1) : 1;

  return (
    <div className="flex min-h-screen">
      <AdminSidebar userRole={userRole} userName={userName} userEmail={userEmail} />

      <div className="flex-1 bg-[#F5F5F5]">
        {/* Top bar */}
        <header className="bg-white border-b border-[#eee] px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-[#1F4788]">Analytics</h1>
              <p className="text-sm text-[#666]">Site traffic &amp; form submissions — last 30 days</p>
            </div>
            <Link href="/admin" className="text-sm text-[#4CAF50] font-semibold hover:underline flex items-center gap-1">
              Dashboard <ArrowRight size={14} />
            </Link>
          </div>
        </header>

        <main className="p-8 space-y-8">
          {!data ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded p-4 text-sm text-yellow-700">
              Analytics data unavailable — run <code className="bg-yellow-100 px-1 rounded font-mono">npm run db:migrate</code> to create the page_views table.
            </div>
          ) : (
            <>
              {/* ── Overview cards ── */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-full bg-[#1F4788]/10 flex items-center justify-center">
                      <Eye size={18} className="text-[#1F4788]" />
                    </div>
                    <span className="text-xs text-[#999]">30 days</span>
                  </div>
                  <p className="text-3xl font-extrabold text-[#333]">{data.overview.views30d.toLocaleString()}</p>
                  <p className="text-sm text-[#666] mt-1">Page Views</p>
                </div>

                <div className="bg-white rounded shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-full bg-[#4CAF50]/10 flex items-center justify-center">
                      <TrendingUp size={18} className="text-[#4CAF50]" />
                    </div>
                    <span className="text-xs text-[#999]">7 days</span>
                  </div>
                  <p className="text-3xl font-extrabold text-[#333]">{data.overview.views7d.toLocaleString()}</p>
                  <p className="text-sm text-[#666] mt-1">Views This Week</p>
                </div>

                <div className="bg-white rounded shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-full bg-[#FF9800]/10 flex items-center justify-center">
                      <MessageSquare size={18} className="text-[#FF9800]" />
                    </div>
                    <span className="text-xs text-[#999]">all time</span>
                  </div>
                  <p className="text-3xl font-extrabold text-[#333]">{totalSubmissions.toLocaleString()}</p>
                  <p className="text-sm text-[#666] mt-1">Form Submissions</p>
                </div>

                <div className="bg-white rounded shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-full bg-[#9C27B0]/10 flex items-center justify-center">
                      <BarChart2 size={18} className="text-[#9C27B0]" />
                    </div>
                    <span className="text-xs text-[#999]">30 days</span>
                  </div>
                  <p className="text-3xl font-extrabold text-[#333]">
                    {data.topPages.length > 0 ? data.topPages[0].path : "—"}
                  </p>
                  <p className="text-sm text-[#666] mt-1">Top Page</p>
                </div>
              </div>

              {/* ── Daily sparkline ── */}
              <div className="bg-white rounded shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-6">
                <h2 className="font-bold text-[#1F4788] mb-4">Daily Page Views (30 days)</h2>
                {data.dailyViews.length === 0 ? (
                  <p className="text-sm text-[#999] text-center py-8">No data yet — start getting visitors!</p>
                ) : (
                  <div className="flex items-end gap-1 h-20">
                    {data.dailyViews.map((d) => (
                      <div key={d.day} className="group relative flex-1 flex flex-col items-center justify-end h-full">
                        <div
                          className="w-full bg-[#1F4788]/20 hover:bg-[#1F4788]/50 rounded-t transition-colors"
                          style={{ height: `${Math.max(4, (d.count / maxDaily) * 100)}%` }}
                        />
                        <span className="absolute bottom-full mb-1 text-[10px] text-[#666] bg-white border border-[#eee] px-1 rounded hidden group-hover:block whitespace-nowrap z-10">
                          {d.day}: {d.count}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* ── Top pages ── */}
                <div className="lg:col-span-2 bg-white rounded shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-6">
                  <h2 className="font-bold text-[#1F4788] mb-4">Top Pages</h2>
                  {data.topPages.length === 0 ? (
                    <p className="text-sm text-[#999] text-center py-8">No page view data yet</p>
                  ) : (
                    <div className="space-y-3">
                      {data.topPages.map((p, i) => {
                        const pct = Math.round((p.views / (data.topPages[0]?.views || 1)) * 100);
                        return (
                          <div key={p.path} className="flex items-center gap-3">
                            <span className="text-xs text-[#999] w-4 text-right">{i + 1}</span>
                            <div className="flex-1">
                              <div className="flex justify-between text-sm mb-1">
                                <span className="font-medium text-[#333] truncate">{p.path || "/"}</span>
                                <span className="text-[#666] ml-2 flex-shrink-0">{p.views.toLocaleString()}</span>
                              </div>
                              <div className="h-1.5 bg-[#f0f0f0] rounded-full">
                                <div
                                  className="h-full bg-[#1F4788] rounded-full"
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* ── Device breakdown ── */}
                <div className="bg-white rounded shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-6">
                  <h2 className="font-bold text-[#1F4788] mb-4">Devices</h2>
                  {data.devices.length === 0 ? (
                    <p className="text-sm text-[#999] text-center py-8">No data yet</p>
                  ) : (
                    <div className="space-y-4">
                      {data.devices.map((d) => {
                        const DevIcon = deviceIcon(d.device);
                        const pct = totalDevices > 0 ? Math.round((d.count / totalDevices) * 100) : 0;
                        return (
                          <div key={d.device} className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-[#F5F5F5] rounded flex items-center justify-center flex-shrink-0">
                              <DevIcon size={16} className="text-[#1F4788]" />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between text-sm mb-1">
                                <span className="capitalize font-medium text-[#333]">{d.device}</span>
                                <span className="text-[#666]">{pct}%</span>
                              </div>
                              <div className="h-1.5 bg-[#f0f0f0] rounded-full">
                                <div
                                  className="h-full bg-[#4CAF50] rounded-full"
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* ── Submissions by type ── */}
              <div className="bg-white rounded shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-6">
                <h2 className="font-bold text-[#1F4788] mb-4">
                  Contact Submissions by Type
                  <Link href="/admin/submissions" className="ml-3 text-xs text-[#4CAF50] font-normal hover:underline">
                    View all →
                  </Link>
                </h2>
                {data.submissionsByType.length === 0 ? (
                  <p className="text-sm text-[#999] text-center py-6">No submissions yet</p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {data.submissionsByType.map((s) => (
                      <div key={s.type} className="text-center p-4 bg-[#F5F5F5] rounded">
                        <p className="text-2xl font-extrabold text-[#1F4788]">{s.count}</p>
                        <p className="text-xs text-[#666] mt-1">{inquiryLabel(s.type)}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
