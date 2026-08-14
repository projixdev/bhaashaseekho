"use client";

import { Inter } from "next/font/google";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { getAdminToken, clearAdminToken } from "@/lib/adminAuth";

// Scoped to this route group only — app/admin/login keeps the site's
// default fonts untouched (never migrated to this shell; the old all-in-one
// dashboard page it used to link from has been retired now that Overview/
// Teachers/Students/Feedback each have their own page).
const inter = Inter({ subsets: ["latin"], variable: "--font-admin", weight: ["400", "500", "600", "700"] });

const THEME_KEY = "bhaashaseekho_admin_theme";

// This is a client-side redirect for UX only, same disclosure as the
// original single-page dashboard: the real security boundary is the
// backend's requireAdmin check on every request below, not this guard.
export default function AdminAppLayout({ children }) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  // Defaults to light; only overridden once the stored value is read below.
  // No prefers-color-scheme fallback — the ask was an explicit toggle with
  // localStorage persistence, not OS-preference matching.
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (!getAdminToken()) {
      router.replace("/admin/login");
      return;
    }
    // Read the stored theme in the same effect/render pass as the auth
    // check, before setChecked(true) — so the very first frame of real
    // content already has the right theme applied, no light-then-dark flash.
    const stored = window.localStorage.getItem(THEME_KEY);
    if (stored === "dark" || stored === "light") setTheme(stored);
    setChecked(true);
  }, [router]);

  function handleLogout() {
    clearAdminToken();
    router.replace("/admin/login");
  }

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next = current === "dark" ? "light" : "dark";
      window.localStorage.setItem(THEME_KEY, next);
      return next;
    });
  }, []);

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
      data-mode={theme}
      className={`${inter.variable} flex min-h-screen bg-background font-[family-name:var(--font-admin)] motion-safe:transition-colors motion-safe:duration-200`}
    >
      <AdminSidebar onLogout={handleLogout} theme={theme} onToggleTheme={toggleTheme} />
      <main className="min-w-0 flex-1 overflow-x-hidden">{children}</main>
    </div>
  );
}
