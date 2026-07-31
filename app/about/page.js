import { about } from "@/content";
import FounderCard from "@/components/about/FounderCard";

export const metadata = { title: about.heading };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-heading text-3xl font-bold text-foreground">{about.heading}</h1>

      <div className="mt-6 flex flex-col gap-4 text-secondary">
        {about.story.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <div className="mt-10">
        <FounderCard />
      </div>
    </div>
  );
}
