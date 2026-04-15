"use client";

import { useEffect } from "react";

// Silently refreshes the access token every 23 hours (token lifetime: 24h)
// so admin sessions stay alive as long as the user is active.
const REFRESH_INTERVAL_MS = 23 * 60 * 60 * 1000;

export default function TokenRefresher() {
  useEffect(() => {
    async function refresh() {
      try {
        await fetch("/api/auth/refresh", { method: "POST" });
      } catch {
        // Network failure — don't disrupt the user
      }
    }

    // Refresh once on mount (handles page reloads near expiry)
    refresh();

    const id = setInterval(refresh, REFRESH_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return null;
}
