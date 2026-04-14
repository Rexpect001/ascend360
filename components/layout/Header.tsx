"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Projects",
    href: "/projects",
    children: [
      { label: "Xcel360", href: "/projects/xcel360" },
      { label: "Poverty Reduction", href: "/projects/poverty-reduction" },
      { label: "Climate Action", href: "/projects/climate-action" },
    ],
  },
  { label: "Blog", href: "/blog" },
  { label: "Impact", href: "/impact" },
  { label: "Team", href: "/team" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-[#1F4788] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-white font-bold text-xl tracking-wide">
              ASCEND<span className="text-[#4CAF50]">360</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.href} className="relative group">
                  <button
                    className={cn(
                      "flex items-center gap-1 text-sm font-medium transition-colors",
                      pathname.startsWith(link.href)
                        ? "text-[#4CAF50]"
                        : "text-white hover:text-[#4CAF50]"
                    )}
                  >
                    {link.label}
                    <ChevronDown size={14} />
                  </button>
                  <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-[#333] hover:bg-[#F5F5F5] hover:text-[#1F4788]"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "text-[#4CAF50]"
                      : "text-white hover:text-[#4CAF50]"
                  )}
                >
                  {link.label}
                </Link>
              )
            )}
            <Link href="/get-involved" className="btn-primary text-sm py-2 px-4">
              Get Involved
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden bg-[#1a3d6e] border-t border-[#2d5aab]">
          <nav className="flex flex-col px-4 py-3 gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.href}>
                  <button
                    className="flex items-center justify-between w-full py-2 text-sm font-medium text-white"
                    onClick={() => setProjectsOpen(!projectsOpen)}
                  >
                    {link.label}
                    <ChevronDown
                      size={14}
                      className={cn("transition-transform", projectsOpen && "rotate-180")}
                    />
                  </button>
                  {projectsOpen && (
                    <div className="pl-4 flex flex-col gap-1">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="py-1.5 text-sm text-blue-200 hover:text-white"
                          onClick={() => setMobileOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "py-2 text-sm font-medium",
                    pathname === link.href ? "text-[#4CAF50]" : "text-white"
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              )
            )}
            <Link
              href="/get-involved"
              className="btn-primary text-sm py-2 px-4 mt-2 text-center"
              onClick={() => setMobileOpen(false)}
            >
              Get Involved
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
