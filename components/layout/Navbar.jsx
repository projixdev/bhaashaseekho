"use client";

import { useState } from "react";
import Link from "next/link";
import { siteMeta, nav } from "@/content";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2">
        {/*
          A dedicated vector lockup (icon + wordmark already composed
          correctly, 680x140 viewBox) — SVGs stay crisp at any size, unlike
          the raster logo.png/logo1.png files, so no cropping/scaling hacks
          are needed here. Plain <img>, not next/image: Next's built-in
          optimizer can't process local SVGs (confirmed — it 400s even with
          dangerouslyAllowSVG on), and there's no resizing/format-conversion
          benefit to be had for a 4KB vector file anyway.
        */}
        <Link href="/" className="flex shrink-0 items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/bhaasha_seekho_navbar_logo.svg" alt={siteMeta.name} width={194} height={40} className="h-10 w-auto" />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {nav.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-secondary transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={nav.ctaHref}
            className="cursor-pointer rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            {nav.ctaLabel}
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-foreground md:hidden"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="h-6 w-6">
            {isOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {isOpen && (
        <nav className="flex flex-col gap-1 border-t border-border px-6 py-4 md:hidden">
          {nav.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="rounded-md px-2 py-2.5 text-sm font-medium text-secondary hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={nav.ctaHref}
            onClick={() => setIsOpen(false)}
            className="mt-1 cursor-pointer rounded-md bg-accent px-4 py-2.5 text-center text-sm font-semibold text-white"
          >
            {nav.ctaLabel}
          </Link>
        </nav>
      )}
    </header>
  );
}
