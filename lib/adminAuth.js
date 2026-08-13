// Client-side token persistence for the admin dashboard (ROADMAP.md Phase
// 17). localStorage + a Bearer header, not an httpOnly cookie — chosen
// because it matches the pattern already used everywhere else in this
// system (the mobile app stores its own JWT and sends it as
// Authorization: Bearer, the backend already expects that shape on every
// authenticated route) rather than introducing cookie-based auth as a new,
// one-off mechanism. This is the site's first authenticated area, so there
// was no existing pattern to follow beyond that. The real security boundary
// is the backend's requireAdmin check — see lib/adminApi.js and
// app/admin/dashboard/page.js.
const TOKEN_KEY = "bhaashaseekho_admin_token";

export function getAdminToken() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function setAdminToken(token) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(TOKEN_KEY, token);
}

export function clearAdminToken() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(TOKEN_KEY);
}
