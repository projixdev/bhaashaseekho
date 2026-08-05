import Link from "next/link";
import { blog, seo } from "@/content";
import { buildMetadata } from "@/lib/seo";

// No posts exist yet — a real "coming soon" page (not a 404) so the footer
// link works, but noindex since there's nothing here worth ranking until
// actual posts are published.
export const metadata = {
  ...buildMetadata({ title: seo.blog.title, description: seo.blog.description, path: "/blog" }),
  robots: { index: false, follow: true },
};

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-xl px-6 py-24 text-center">
      <h1 className="font-heading text-3xl font-bold text-foreground">{blog.heading}</h1>
      <p className="mt-4 text-secondary">{blog.message}</p>
      <Link
        href={blog.ctaHref}
        className="mt-8 inline-block cursor-pointer rounded-md bg-accent px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
      >
        {blog.ctaLabel}
      </Link>
    </div>
  );
}
