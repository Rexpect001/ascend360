"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  Users,
  Heart,
  MessageSquare,
  UserCog,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: FileText, label: "Blog Posts", href: "/admin/blog" },
  { icon: FolderOpen, label: "Projects", href: "/admin/projects" },
  { icon: Users, label: "Team", href: "/admin/team" },
  { icon: Heart, label: "Impact Stories", href: "/admin/impact" },
  { icon: MessageSquare, label: "Submissions", href: "/admin/submissions" },
  { icon: UserCog, label: "Users", href: "/admin/users", adminOnly: true },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

interface AdminSidebarProps {
  userRole?: string;
  userName?: string;
  userEmail?: string;
}

export default function AdminSidebar({ userRole, userName, userEmail }: AdminSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <aside
      className={cn(
        "relative flex flex-col bg-[#1F4788] text-white transition-all duration-300 min-h-screen",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-blue-600">
        {!collapsed && (
          <Link href="/admin" className="font-bold text-lg">
            ASCEND<span className="text-[#4CAF50]">360</span>
            <span className="text-blue-300 text-xs ml-1">Admin</span>
          </Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded hover:bg-blue-600 transition-colors ml-auto"
          aria-label="Toggle sidebar"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-2 space-y-1">
        {navItems
          .filter((item) => !item.adminOnly || userRole === "ADMIN")
          .map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                title={collapsed ? item.label : undefined}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-[#4CAF50] text-white"
                    : "text-blue-200 hover:bg-blue-600 hover:text-white"
                )}
              >
                <item.icon size={18} className="flex-shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
      </nav>

      {/* Bottom section */}
      <div className="border-t border-blue-600 p-4 space-y-3">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-md text-sm text-blue-200 hover:bg-blue-600 hover:text-white transition-colors",
            collapsed && "justify-center"
          )}
          title={collapsed ? "View Site" : undefined}
        >
          <ExternalLink size={16} className="flex-shrink-0" />
          {!collapsed && <span>View Site</span>}
        </a>

        {!collapsed && userName && (
          <div className="px-3 py-2">
            <p className="text-white text-sm font-medium truncate">{userName}</p>
            <p className="text-blue-300 text-xs truncate">{userEmail}</p>
            <span className="inline-block mt-1 text-xs bg-blue-600 text-blue-200 px-2 py-0.5 rounded">
              {userRole}
            </span>
          </div>
        )}

        <button
          onClick={handleLogout}
          className={cn(
            "flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm text-blue-200 hover:bg-red-600 hover:text-white transition-colors",
            collapsed && "justify-center"
          )}
          title={collapsed ? "Logout" : undefined}
        >
          <LogOut size={16} className="flex-shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
