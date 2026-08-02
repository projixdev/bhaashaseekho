import { siteMeta } from "@/content";

// Re-exported so every SEO-related file (sitemap, robots, JSON-LD, page
// metadata) pulls the production domain from one place.
export const SITE_URL = siteMeta.url;

// Static 1200x630 brand card (public/og-image.png) shared by every page's
// Open Graph / Twitter tags. Not next/og ImageResponse: that dynamic-image
// convention crashes at build time on Windows (upstream @vercel/og bug —
// it eagerly reads its bundled default font via a malformed file:// URL).
export const OG_IMAGE = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: `${siteMeta.name} — ${siteMeta.tagline}`,
};

// Builds a per-page Metadata object: title (templated via the root layout's
// title.template unless absoluteTitle is set), description, canonical, and
// matching Open Graph / Twitter tags. `path` is site-root-relative (e.g.
// "/about") and resolves against metadataBase set in the root layout.
export function buildMetadata({ title, description, path = "/", absoluteTitle = false }) {
  const fullTitle = absoluteTitle ? title : `${title} | ${siteMeta.name}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: siteMeta.name,
      type: "website",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [OG_IMAGE.url],
    },
  };
}

// Home > ... breadcrumb JSON-LD for inner pages. `items` is the trail after
// Home, e.g. [{ name: "Courses", path: "/courses" }].
export function breadcrumbSchema(items) {
  const trail = [{ name: "Home", path: "/" }, ...items];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path === "/" ? "" : item.path}`,
    })),
  };
}
