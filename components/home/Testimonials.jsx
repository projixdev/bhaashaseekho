import { home } from "@/content";
import Reveal from "@/components/common/Reveal";
import Avatar from "@/components/common/Avatar";

export default function Testimonials() {
  return (
    <section className="bg-muted py-8">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center font-heading text-2xl font-bold text-foreground sm:text-3xl">
          {home.testimonials.heading}
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {home.testimonials.items.map((item, index) => (
            <Reveal key={item.name} delayMs={index * 100}>
              <blockquote className="h-full rounded-lg border border-border bg-background p-6">
                <p className="text-sm text-secondary">&ldquo;{item.quote}&rdquo;</p>
                <footer className="mt-4 flex items-center gap-3">
                  <Avatar name={item.name} index={index} />
                  <span className="text-sm font-semibold text-foreground">{item.name}</span>
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
