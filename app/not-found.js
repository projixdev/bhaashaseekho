import Link from "next/link";
import { seo } from "@/content";

// robots.index=false here is a page-level override — 404s should never be
// indexed even though the rest of the site is.
export const metadata = {
  title: { absolute: `${seo.notFound.title} | Bhaasha Seekho` },
  description: seo.notFound.description,
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-6 py-24 text-center">
      <h1 className="font-heading text-3xl font-bold text-foreground">{seo.notFound.title}</h1>
      <p className="mt-4 text-secondary">{seo.notFound.description}</p>
      <Link
        href="/"
        className="mt-8 inline-block cursor-pointer rounded-md bg-accent px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
      >
        Back to Home
      </Link>
    </div>
  );
}
