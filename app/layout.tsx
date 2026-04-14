// This root layout is intentionally minimal.
// Public pages use app/(public)/layout.tsx
// Admin pages use app/(admin)/layout.tsx
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
