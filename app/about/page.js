import { about, seo } from "@/content";
import FounderCard from "@/components/about/FounderCard";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: seo.about.title,
  description: seo.about.description,
  path: "/about",
});

const breadcrumbs = breadcrumbSchema([{ name: "About Us", path: "/about" }]);

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <JsonLd data={breadcrumbs} />
      <h1 className="font-heading text-3xl font-bold text-foreground">{about.heading}</h1>

      <div className="mt-6 flex flex-col gap-4 text-secondary">
        {about.story.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <h2 className="mt-10 font-heading text-2xl font-bold text-foreground sm:text-3xl">Meet the Founder</h2>
      <div className="mt-8">
        <FounderCard />
      </div>
    </div>
  );
}
