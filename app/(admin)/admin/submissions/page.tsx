"use client";

import { useState, useEffect, useCallback } from "react";
import AdminSidebar from "@/components/layout/AdminSidebar";
import { CheckCircle, Circle, Trash2, ChevronDown, ChevronUp, Download } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface Submission {
  id: string;
  name: string;
  email: string;
  message: string;
  inquiryType: string;
  createdAt: string;
  readStatus: boolean;
  notes: string | null;
}

const typeLabels: Record<string, string> = {
  STUDENT: "Student",
  VOLUNTEER: "Volunteer",
  PARTNER: "Partner",
  MEDIA: "Media",
  OTHER: "Other",
};

const typeColors: Record<string, string> = {
  STUDENT: "bg-blue-100 text-blue-700",
  VOLUNTEER: "bg-purple-100 text-purple-700",
  PARTNER: "bg-green-100 text-green-700",
  MEDIA: "bg-yellow-100 text-yellow-700",
  OTHER: "bg-gray-100 text-gray-600",
};

export default function AdminSubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("");
  const [filterRead, setFilterRead] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const fetchSubmissions = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ pageSize: "50" });
      if (filterType) params.set("type", filterType);
      if (filterRead) params.set("read", filterRead);

      const res = await fetch(`/api/admin/submissions?${params}`);
      const data = await res.json();
      setSubmissions(data.data || []);
      setTotal(data.total || 0);
    } finally {
      setLoading(false);
    }
  }, [filterType, filterRead]);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  async function toggleRead(id: string, current: boolean) {
    await fetch(`/api/admin/submissions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ readStatus: !current }),
    });
    setSubmissions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, readStatus: !current } : s))
    );
  }

  async function deleteSubmission(id: string) {
    if (!confirm("Delete this submission?")) return;
    await fetch(`/api/admin/submissions/${id}`, { method: "DELETE" });
    setSubmissions((prev) => prev.filter((s) => s.id !== id));
    setTotal((t) => t - 1);
  }

  function exportCSV() {
    const headers = ["Name", "Email", "Type", "Date", "Read", "Message"];
    const rows = submissions.map((s: Submission) => [
      s.name,
      s.email,
      s.inquiryType,
      new Date(s.createdAt).toLocaleDateString(),
      s.readStatus ? "Yes" : "No",
      `"${s.message.replace(/"/g, '""')}"`,
    ]);
    const csv = [headers, ...rows].map((r: string[]) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ascend360-submissions.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  const unread = submissions.filter((s) => !s.readStatus).length;

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <div className="flex-1 bg-[#F5F5F5]">
        <header className="bg-white border-b border-[#eee] px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-[#1F4788]">
              Contact Submissions
            </h1>
            <p className="text-sm text-[#666]">
              {total} total · {unread} unread
            </p>
          </div>
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 text-sm border border-[#ddd] rounded px-4 py-2 hover:bg-[#F5F5F5] transition-colors"
          >
            <Download size={14} /> Export CSV
          </button>
        </header>

        <main className="p-8">
          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-6">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-[#ddd] rounded text-sm bg-white focus:outline-none"
            >
              <option value="">All Types</option>
              {Object.entries(typeLabels).map(([v, l]) => (
                <option key={v} value={v}>{l}</option>
              ))}
            </select>
            <select
              value={filterRead}
              onChange={(e) => setFilterRead(e.target.value)}
              className="px-3 py-2 border border-[#ddd] rounded text-sm bg-white focus:outline-none"
            >
              <option value="">All Status</option>
              <option value="false">Unread</option>
              <option value="true">Read</option>
            </select>
            {(filterType || filterRead) && (
              <button
                onClick={() => { setFilterType(""); setFilterRead(""); }}
                className="text-xs text-[#999] hover:text-[#333]"
              >
                Clear filters
              </button>
            )}
          </div>

          {/* Submissions */}
          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="bg-white rounded shadow-sm h-16 animate-pulse" />
              ))}
            </div>
          ) : submissions.length === 0 ? (
            <div className="bg-white rounded shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-16 text-center">
              <p className="text-[#999]">No submissions found.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {submissions.map((sub: Submission) => (
                <div
                  key={sub.id}
                  className={`bg-white rounded shadow-[0_2px_8px_rgba(0,0,0,0.08)] overflow-hidden ${
                    !sub.readStatus ? "border-l-4 border-[#4CAF50]" : ""
                  }`}
                >
                  <div
                    className="flex items-center gap-4 px-5 py-4 cursor-pointer"
                    onClick={() => setExpanded(expanded === sub.id ? null : sub.id)}
                  >
                    {/* Read toggle */}
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleRead(sub.id, sub.readStatus); }}
                      className="flex-shrink-0 text-[#999] hover:text-[#4CAF50] transition-colors"
                      aria-label={sub.readStatus ? "Mark unread" : "Mark read"}
                    >
                      {sub.readStatus ? (
                        <CheckCircle size={18} className="text-[#4CAF50]" />
                      ) : (
                        <Circle size={18} />
                      )}
                    </button>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold text-[#333] text-sm">{sub.name}</p>
                        <span
                          className={`text-xs font-semibold px-2 py-0.5 rounded-full ${typeColors[sub.inquiryType] || ""}`}
                        >
                          {typeLabels[sub.inquiryType] || sub.inquiryType}
                        </span>
                        {!sub.readStatus && (
                          <span className="text-xs bg-[#4CAF50] text-white px-2 py-0.5 rounded-full font-semibold">
                            New
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#999] mt-0.5">
                        {sub.email} · {formatDate(sub.createdAt)}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={(e) => { e.stopPropagation(); deleteSubmission(sub.id); }}
                        className="p-1.5 text-[#999] hover:text-red-500 hover:bg-red-50 rounded"
                        aria-label="Delete submission"
                      >
                        <Trash2 size={14} />
                      </button>
                      {expanded === sub.id ? (
                        <ChevronUp size={16} className="text-[#999]" />
                      ) : (
                        <ChevronDown size={16} className="text-[#999]" />
                      )}
                    </div>
                  </div>

                  {expanded === sub.id && (
                    <div className="px-5 pb-5 border-t border-[#f0f0f0] pt-4">
                      <p className="text-sm text-[#444] whitespace-pre-wrap leading-relaxed">
                        {sub.message}
                      </p>
                      <div className="flex gap-3 mt-4">
                        <a
                          href={`mailto:${sub.email}?subject=Re: Your ASCEND360 enquiry`}
                          className="text-xs font-semibold text-[#4CAF50] border border-[#4CAF50] rounded px-3 py-1.5 hover:bg-[#4CAF50] hover:text-white transition-colors"
                        >
                          Reply via Email
                        </a>
                        {!sub.readStatus && (
                          <button
                            onClick={() => toggleRead(sub.id, sub.readStatus)}
                            className="text-xs font-semibold text-[#666] border border-[#ddd] rounded px-3 py-1.5 hover:bg-[#F5F5F5] transition-colors"
                          >
                            Mark as Read
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
