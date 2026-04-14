/**
 * Simple in-process rate limiter for Next.js API routes.
 * Creates one Map per named limiter so different endpoints can have
 * independent windows and caps.
 *
 * Usage:
 *   const limiter = createRateLimiter("posts", { windowMs: 60_000, max: 30 });
 *   if (!limiter.check(ip)) return 429;
 */

interface Window {
  count: number;
  resetAt: number;
}

interface Options {
  /** Rolling window in ms (default: 60 000 = 1 min) */
  windowMs?: number;
  /** Max requests per window (default: 60) */
  max?: number;
}

const stores = new Map<string, Map<string, Window>>();

export function createRateLimiter(name: string, opts: Options = {}) {
  const windowMs = opts.windowMs ?? 60_000;
  const max = opts.max ?? 60;

  if (!stores.has(name)) stores.set(name, new Map());
  const store = stores.get(name)!;

  return {
    check(ip: string): boolean {
      const now = Date.now();
      const entry = store.get(ip);

      if (!entry || now > entry.resetAt) {
        store.set(ip, { count: 1, resetAt: now + windowMs });
        return true;
      }
      if (entry.count >= max) return false;
      entry.count++;
      return true;
    },
  };
}

/** Extract IP from a Next.js Request */
export function getIp(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}
