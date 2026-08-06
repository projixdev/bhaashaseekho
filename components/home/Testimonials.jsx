import { IconStarFilled, IconStar } from "@tabler/icons-react";
import { home } from "@/content";
import Reveal from "@/components/common/Reveal";
import Avatar from "@/components/common/Avatar";

export default function Testimonials() {
  return (
    <section id="reviews" className="scroll-mt-24 bg-background py-16">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center font-heading text-2xl font-bold text-foreground sm:text-3xl">
          {home.testimonials.heading}
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {home.testimonials.items.map((item, index) => (
            <Reveal key={item.name} delayMs={index * 100}>
              <blockquote className="h-full rounded-lg border border-border bg-background p-6 shadow-sm">
                <div className="flex gap-0.5" aria-label={`${item.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, i) =>
                    i < item.rating ? (
                      <IconStarFilled key={i} size={16} className="text-accent" />
                    ) : (
                      <IconStar key={i} size={16} className="text-border" />
                    )
                  )}
                </div>
                <p className="mt-3 text-sm text-secondary">&ldquo;{item.quote}&rdquo;</p>
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
