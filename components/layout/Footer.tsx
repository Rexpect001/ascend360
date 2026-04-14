import Link from "next/link";
import { Mail, MapPin } from "lucide-react";

// Social icon SVGs (replacing lucide-react social icons removed in v1+)
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.736l7.732-8.857L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const footerLinks = {
  Organization: [
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/team" },
    { label: "Impact", href: "/impact" },
    { label: "Contact", href: "/contact" },
  ],
  Projects: [
    { label: "Xcel360", href: "/projects/xcel360" },
    { label: "Poverty Reduction", href: "/projects/poverty-reduction" },
    { label: "Climate Action", href: "/projects/climate-action" },
    { label: "All Projects", href: "/projects" },
  ],
  "Get Involved": [
    { label: "Students", href: "/get-involved#students" },
    { label: "Volunteers", href: "/get-involved#volunteers" },
    { label: "Partners", href: "/get-involved#partners" },
    { label: "Blog", href: "/blog" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
  ],
};

const socials = [
  { Icon: TwitterIcon, href: "#", label: "Twitter/X" },
  { Icon: LinkedInIcon, href: "#", label: "LinkedIn" },
  { Icon: InstagramIcon, href: "#", label: "Instagram" },
  { Icon: FacebookIcon, href: "#", label: "Facebook" },
];

export default function Footer() {
  return (
    <footer className="bg-[#1F4788] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="block mb-4">
              <span className="text-white font-bold text-2xl">
                ASCEND<span className="text-[#4CAF50]">360</span>
              </span>
            </Link>
            <p className="text-blue-200 text-sm leading-relaxed mb-6">
              A Nigerian NGO committed to education access, poverty reduction,
              and environmental action — empowering communities to rise.
            </p>
            <div className="flex items-center gap-2 text-blue-200 text-sm mb-3">
              <MapPin size={14} className="flex-shrink-0" />
              <span>Nigeria</span>
            </div>
            <div className="flex items-center gap-2 text-blue-200 text-sm">
              <Mail size={14} className="flex-shrink-0" />
              <a
                href="mailto:info@ascend360.org"
                className="hover:text-white transition-colors"
              >
                info@ascend360.org
              </a>
            </div>
            {/* Socials */}
            <div className="flex items-center gap-3 mt-6">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-blue-400 flex items-center justify-center text-blue-300 hover:bg-[#4CAF50] hover:border-[#4CAF50] hover:text-white transition-all"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
                {heading}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-blue-200 text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-blue-600 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-blue-300 text-sm">
            &copy; {new Date().getFullYear()} ASCEND360. All rights reserved.
            Registered NGO in Nigeria.
          </p>
          <p className="text-blue-300 text-sm">
            Aligned with{" "}
            <span className="text-[#4CAF50] font-medium">
              SDG 4 · SDG 1 · SDG 13
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
