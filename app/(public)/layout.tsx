import { Plus_Jakarta_Sans, DM_Sans } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageViewTracker from "@/components/ui/PageViewTracker";
import type { Metadata } from "next";

const jakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ascend360.org";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ASCEND360 | Education Access, Poverty Reduction & Climate Action",
    template: "%s | ASCEND360",
  },
  description:
    "ASCEND360 is a Nigerian NGO committed to education access (SDG 4), poverty reduction, and environmental action — empowering communities through programmes like Xcel360.",
  keywords: [
    "NGO Nigeria", "education access", "scholarship Nigeria", "SDG 4",
    "Xcel360", "Nigerian students", "poverty reduction", "climate action",
    "mentorship Nigeria", "Mastercard Foundation",
  ],
  authors: [{ name: "ASCEND360" }],
  creator: "ASCEND360",
  publisher: "ASCEND360",
  robots: { index: true, follow: true },
  openGraph: {
    siteName: "ASCEND360",
    locale: "en_NG",
    type: "website",
    url: SITE_URL,
    title: "ASCEND360 | Education Access, Poverty Reduction & Climate Action",
    description:
      "A Nigerian NGO committed to education access, poverty reduction, and environmental action — empowering communities through Xcel360 and beyond.",
    images: [{ url: "/images/og-default.png", width: 1200, height: 630, alt: "ASCEND360" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ASCEND360 | Education Access, Poverty Reduction & Climate Action",
    description:
      "A Nigerian NGO committed to education access, poverty reduction, and environmental action.",
    images: ["/images/og-default.png"],
  },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: "ASCEND360",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.png`,
  description:
    "ASCEND360 is a registered Nigerian NGO committed to education access (SDG 4), poverty reduction (SDG 1), and environmental action (SDG 13).",
  foundingDate: "2024",
  areaServed: "Nigeria",
  email: "info@ascend360.org",
  sameAs: [],
};

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakartaSans.variable} ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        {/* Skip to main content — hidden until focused (WCAG 2.1 AA) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-[#1F4788] focus:text-white focus:px-4 focus:py-2 focus:rounded focus:font-semibold focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
        >
          Skip to main content
        </a>
        <PageViewTracker />
        <Header />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
