"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconChalkboardTeacher,
  IconSchool,
  IconMessage2,
  IconLayoutDashboard,
  IconLogout,
  IconSun,
  IconMoon,
} from "@tabler/icons-react";

const NAV_ITEMS = [
  { href: "/admin/overview", label: "Overview", icon: IconLayoutDashboard, enabled: true },
  { href: "/admin/teachers", label: "Teachers", icon: IconChalkboardTeacher, enabled: true },
  { href: "/admin/students", label: "Students", icon: IconSchool, enabled: true },
  { href: "/admin/feedback", label: "Feedback", icon: IconMessage2, enabled: true },
];

function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === "dark";
  return (
    <button
      onClick={onToggle}
      role="switch"
      aria-checked={isDark}
      className="flex w-full items-center justify-between gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-secondary transition-colors hover:bg-muted hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      <span className="flex items-center gap-3">
        {isDark ? (
          <IconMoon size={20} stroke={1.75} aria-hidden="true" />
        ) : (
          <IconSun size={20} stroke={1.75} aria-hidden="true" />
        )}
        {isDark ? "Dark mode" : "Light mode"}
      </span>
      {/* motion-safe: only the pure-CSS pill/thumb slide is gated — this is
          decorative motion (the state is already conveyed by the icon,
          label, and aria-checked), not essential to perceiving the change,
          so fully disabling it under prefers-reduced-motion is correct
          rather than just shortening it. */}
      <span
        aria-hidden="true"
        className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full motion-safe:transition-colors motion-safe:duration-200 ${
          isDark ? "bg-primary" : "bg-border"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 translate-x-0.5 transform rounded-full bg-white shadow motion-safe:transition-transform motion-safe:duration-200 ${
            isDark ? "translate-x-4" : "translate-x-0.5"
          }`}
        />
      </span>
    </button>
  );
}

export default function AdminSidebar({ onLogout, theme, onToggleTheme }) {
  const pathname = usePathname();

  return (
    <aside className="flex w-60 shrink-0 flex-col border-r border-border bg-card">
      <div className="flex h-16 items-center border-b border-border px-5">
        <span className="text-base font-semibold text-card-foreground">Bhaasha Seekho</span>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-3">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          if (!item.enabled) {
            return (
              <div
                key={item.href}
                aria-disabled="true"
                className="flex items-center justify-between gap-3 rounded-md px-3 py-2.5 text-sm text-secondary opacity-60"
              >
                <span className="flex items-center gap-3">
                  <Icon size={20} stroke={1.75} aria-hidden="true" />
                  {item.label}
                </span>
                <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-secondary">
                  Soon
                </span>
              </div>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
                active ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
              }`}
            >
              <Icon size={20} stroke={1.75} aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-col gap-1 border-t border-border p-3">
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        <button
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-secondary transition-colors hover:bg-muted hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <IconLogout size={20} stroke={1.75} aria-hidden="true" />
          Log out
        </button>
      </div>
    </aside>
  );
}
