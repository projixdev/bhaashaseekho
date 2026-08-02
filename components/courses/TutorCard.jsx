import Image from "next/image";
import PlaceholderImage from "@/components/common/PlaceholderImage";

// Mirrors components/about/FounderCard.jsx's layout for visual consistency.
// Falls back to the same placeholder pattern when no real photo exists yet.
export default function TutorCard({ tutor }) {
  return (
    <div className="grid grid-cols-1 gap-6 rounded-lg border border-border bg-muted p-6 sm:grid-cols-[160px_1fr] sm:items-center">
      {tutor.photoUrl ? (
        <div className="relative aspect-square overflow-hidden rounded-lg">
          <Image src={tutor.photoUrl} alt={tutor.name} fill sizes="160px" className="object-cover" />
        </div>
      ) : (
        <PlaceholderImage label="Tutor Photo" aspectClassName="aspect-square" />
      )}

      <div>
        <p className="font-heading font-semibold text-foreground">{tutor.name}</p>
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
