import { Plus_Jakarta_Sans, DM_Sans } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
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

export const metadata: Metadata = {
  title: {
    default: "ASCEND360 | Education Access, Poverty Reduction & Climate Action",
    template: "%s | ASCEND360",
  },
  description:
    "ASCEND360 is a Nigerian NGO committed to education access (SDG 4), poverty reduction, and environmental action — empowering communities through programs like Xcel360.",
  keywords: ["NGO", "Nigeria", "education", "scholarship", "SDG 4", "Xcel360"],
  openGraph: {
    siteName: "ASCEND360",
    locale: "en_NG",
    type: "website",
  },
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakartaSans.variable} ${dmSans.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
