"use client";

import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { getAdminToken, clearAdminToken } from "@/lib/adminAuth";

// Scoped to this route group only — app/admin/login and the not-yet-
// migrated app/admin/dashboard keep the site's default fonts untouched.
const inter = Inter({ subsets: ["latin"], variable: "--font-admin", weight: ["400", "500", "600", "700"] });

// This is a client-side redirect for UX only, same disclosure as the
// original single-page dashboard: the real security boundary is the
// backend's requireAdmin check on every request below, not this guard.
export default function AdminAppLayout({ children }) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!getAdminToken()) {
      router.replace("/admin/login");
      return;
    }
    setChecked(true);
  }, [router]);

  function handleLogout() {
    clearAdminToken();
    router.replace("/admin/login");
  }

  if (!checked) {
    return (
      <div
        data-theme="admin"
        className={`${inter.variable} flex min-h-screen items-center justify-center bg-background font-[family-name:var(--font-admin)]`}
      >
        <p className="text-sm text-secondary">Loading…</p>
      </div>
    );
  }

  return (
    <div
      data-theme="admin"
      className={`${inter.variable} flex min-h-screen bg-background font-[family-name:var(--font-admin)]`}
    >
      <AdminSidebar onLogout={handleLogout} />
      <main className="min-w-0 flex-1 overflow-x-hidden">{children}</main>
    </div>
  );
}
