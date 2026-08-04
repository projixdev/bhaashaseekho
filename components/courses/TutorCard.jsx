import Image from "next/image";
import { IconUser, IconStarFilled } from "@tabler/icons-react";

// Mirrors components/about/FounderCard.jsx's layout for visual consistency.
// Falls back to a generic avatar icon (not an empty "photo pending" box)
// when no real photo exists yet — a deliberate placeholder, not a broken one.
export default function TutorCard({ tutor }) {
  return (
    <div className="grid grid-cols-1 gap-6 rounded-lg border border-border bg-muted p-6 sm:grid-cols-[160px_1fr] sm:items-center">
      {tutor.photoUrl ? (
        <div className="relative aspect-square overflow-hidden rounded-lg">
          <Image src={tutor.photoUrl} alt={tutor.name} fill sizes="160px" className="object-cover" />
        </div>
      ) : (
        <div
          role="img"
          aria-label={tutor.name}
          className="flex aspect-square items-center justify-center rounded-lg bg-primary"
        >
          <IconUser size={56} stroke={1.5} className="text-white/70" />
        </div>
      )}

      <div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <p className="font-heading font-semibold text-foreground">{tutor.name}</p>
          {tutor.rating && (
            <span className="flex items-center gap-1 text-sm font-medium text-foreground">
              <IconStarFilled size={14} className="text-accent" />
              {tutor.rating}
            </span>
          )}
          {tutor.studentsCount && (
            <span className="text-sm text-secondary">{tutor.studentsCount} students taught</span>
          )}
        </div>
        <p className="mt-2 text-sm text-secondary">{tutor.bio}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {tutor.credentials.map((credential) => (
            <span
              key={credential}
              className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-secondary"
            >
              {credential}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
