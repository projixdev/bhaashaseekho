// Not linked from any public nav (see Navbar.jsx — untouched), reachable
// only by direct URL. noindex/nofollow reinforces "not discoverable" for
// search engines; it isn't the security boundary — requireAdmin on the
// backend is (see lib/adminApi.js / app/admin/dashboard/page.js).
export const metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }) {
  return <div className="min-h-screen bg-background">{children}</div>;
}
