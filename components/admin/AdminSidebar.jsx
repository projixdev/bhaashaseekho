"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconChalkboardTeacher,
  IconSchool,
  IconMessage2,
  IconLayoutDashboard,
  IconLogout,
} from "@tabler/icons-react";

// enabled: false items are intentionally inert previews of the eventual
// nav — no route exists for them yet (Students is the last piece of this
// rebuild). Not links, not clickable, just a preview of where it'll land.
const NAV_ITEMS = [
  { href: "/admin/overview", label: "Overview", icon: IconLayoutDashboard, enabled: true },
  { href: "/admin/teachers", label: "Teachers", icon: IconChalkboardTeacher, enabled: true },
  { href: "/admin/students", label: "Students", icon: IconSchool, enabled: false },
  { href: "/admin/feedback", label: "Feedback", icon: IconMessage2, enabled: true },
];

export default function AdminSidebar({ onLogout }) {
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

      <div className="border-t border-border p-3">
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
