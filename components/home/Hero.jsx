import { home } from "@/content";
import HeroIllustration from "@/components/home/HeroIllustration";

export default function Hero() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16 text-center">
      <span className="inline-block rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
        {home.hero.eyebrow}
      </span>
      <h1 className="mt-4 font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl">
        {home.hero.headline}
      </h1>
      <p className="mx-auto mt-4 max-w-lg text-lg text-secondary">{home.hero.subheadline}</p>

      <a
        href="#lead-form"
        className="mt-8 inline-block cursor-pointer rounded-md bg-accent px-6 py-3 text-base font-semibold text-white transition-opacity hover:opacity-90"
      >
        {home.hero.primaryCtaLabel}
      </a>

      <HeroIllustration />
    </section>
  );
}
