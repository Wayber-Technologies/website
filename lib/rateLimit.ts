// A small in-memory, fixed-window rate limiter for API routes.
//
// It is best effort: each server instance keeps its own counts, and they reset
// when the instance restarts. That is enough to stop one visitor or a simple
// script hammering the contact form. For a hard, shared limit, add a rate
// limiting rule for /api/contact in the hosting firewall (Vercel: Firewall →
// Rate Limiting), which runs before the request reaches this code.

type Window = { count: number; resetAt: number };

const buckets = new Map<string, Window>();
let lastSweep = 0;

/** Drops expired windows now and then, so the map can't grow without limit. */
function sweep(now: number) {
  if (now - lastSweep < 60_000) return;
  lastSweep = now;
  buckets.forEach((w, key) => {
    if (w.resetAt <= now) buckets.delete(key);
  });
}

/**
 * Counts one hit for `key`. Returns whether it is allowed, and if not, how many
 * seconds until the window resets.
 */
export function rateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  sweep(now);
  const w = buckets.get(key);
  if (!w || w.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfter: 0 };
  }
  w.count += 1;
  return { ok: w.count <= limit, retryAfter: Math.ceil((w.resetAt - now) / 1000) };
}

/** The visitor's IP, from the proxy headers set by the host. */
export function clientIp(headers: Record<string, string | string[] | undefined>) {
  const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v)?.split(",")[0]?.trim();
  return first(headers["x-real-ip"]) || first(headers["x-forwarded-for"]) || "unknown";
}
