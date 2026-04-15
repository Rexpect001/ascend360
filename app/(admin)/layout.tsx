import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "../../app/globals.css";
import TokenRefresher from "@/components/ui/TokenRefresher";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "ASCEND360 Admin Portal",
    template: "%s | ASCEND360 Admin",
  },
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <TokenRefresher />
        {children}
      </body>
    </html>
  );
}
