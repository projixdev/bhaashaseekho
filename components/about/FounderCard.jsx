import Image from "next/image";
import { about } from "@/content";

export default function FounderCard() {
  return (
    <div className="grid gap-6 rounded-lg border border-border bg-muted p-6 sm:grid-cols-[200px_1fr] sm:items-center">
      <div className="relative aspect-square overflow-hidden rounded-lg">
        {/* object-top: source is a tall portrait with the face in the
            upper third — default center-cropping into a square would cut
            off the top of the head.
            sizes: this box actually renders at 200px (sm:grid-cols-[200px_1fr])
            or ~100vw minus the page's px-6 + this card's p-6 padding on
            mobile — a smaller `sizes` here was telling the browser to fetch
            a ~128px source and upscale it into a 200-300px box, which is
            what was making the photo look blurry/soft. */}
        <Image
          src={about.founder.photoUrl || "/image.png"}
          alt={about.founder.name}
          fill
          sizes="(min-width: 640px) 200px, calc(100vw - 96px)"
          className="object-cover object-top"
        />
      </div>
      <div>
        <p className="font-heading font-semibold text-foreground">{about.founder.name}</p>
        <p className="text-sm text-accent">{about.founder.role}</p>
        <p className="mt-2 text-sm text-secondary">{about.founder.bio}</p>
      </div>
    </div>
  );
}
