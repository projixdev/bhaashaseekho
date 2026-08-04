import Link from "next/link";
import { IconCheck } from "@tabler/icons-react";
import { home } from "@/content";
import VideoPlaceholder from "@/components/common/VideoPlaceholder";

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <div className="grid items-center gap-10 lg:grid-cols-[55%_45%] lg:gap-14">
        <div>
          <span className="inline-block rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
            {home.hero.eyebrow}
          </span>
          <h1 className="mt-4 font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl">
            {home.hero.headline}
          </h1>
          <p className="mt-4 text-lg text-secondary">{home.hero.subheadline}</p>
          <p className="mt-2 font-heading font-semibold text-foreground">{home.hero.languageLine}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {home.hero.goalTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-secondary"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/register"
              className="cursor-pointer rounded-md bg-accent px-6 py-3 text-base font-semibold text-white transition-opacity hover:opacity-90"
            >
              {home.hero.primaryCtaLabel}
            </Link>
            <Link
              href="/courses"
              className="cursor-pointer rounded-md border border-border px-6 py-3 text-base font-semibold text-foreground transition-colors hover:bg-muted"
            >
              {home.hero.secondaryCtaLabel}
            </Link>
          </div>

          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2">
            {home.hero.trustBadges.map((badge) => (
              <span key={badge} className="flex items-center gap-1.5 text-sm text-secondary">
                <IconCheck size={16} stroke={2.25} className="text-accent" />
                {badge}
              </span>
            ))}
          </div>
        </div>

        <VideoPlaceholder
          label={home.hero.videoLabel}
          sublabel={home.hero.videoNote}
          aspectClassName="aspect-[4/5] sm:aspect-video lg:aspect-[4/5]"
        />
      </div>
    </section>
  );
}
