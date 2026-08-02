import { IconStarFilled, IconStar } from "@tabler/icons-react";
import Avatar from "@/components/common/Avatar";

export default function TestimonialCard({ testimonial, index = 0 }) {
  return (
    <blockquote className="h-full rounded-lg border border-border bg-background p-6">
      <div className="flex gap-0.5" aria-label={`${testimonial.rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) =>
          i < testimonial.rating ? (
            <IconStarFilled key={i} size={16} className="text-accent" />
          ) : (
            <IconStar key={i} size={16} className="text-border" />
          )
        )}
      </div>
      <p className="mt-3 text-sm text-secondary">&ldquo;{testimonial.quote}&rdquo;</p>
      <footer className="mt-4 flex items-center gap-3">
        <Avatar name={testimonial.name} index={index} />
        <span className="text-sm font-semibold text-foreground">{testimonial.name}</span>
      </footer>
    </blockquote>
  );
}
