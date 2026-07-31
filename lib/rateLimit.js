// Basic in-memory, per-key rate limiter. Lives only in this module's memory,
// so it resets on cold start and doesn't share state across serverless
// instances — an accepted limitation for a v1 skeleton. Swappable for
// Upstash/Redis later without changing anything at the call sites.
const buckets = new Map();

export function checkRateLimit(key, { limit = 5, windowMs = 10 * 60 * 1000 } = {}) {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now > bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true };
  }

  if (bucket.count >= limit) {
    return { allowed: false };
  }

  bucket.count += 1;
  return { allowed: true };
}

export function getClientIp(request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}
