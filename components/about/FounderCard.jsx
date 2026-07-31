import { about } from "@/content";
import PlaceholderImage from "@/components/common/PlaceholderImage";

export default function FounderCard() {
  return (
    <div className="grid gap-6 rounded-lg border border-border bg-muted p-6 sm:grid-cols-[200px_1fr] sm:items-center">
      <PlaceholderImage label={about.founder.imageLabel} aspectClassName="aspect-square" />
      <div>
        <p className="font-heading font-semibold text-foreground">{about.founder.name}</p>
        <p className="text-sm text-accent">{about.founder.role}</p>
        <p className="mt-2 text-sm text-secondary">{about.founder.bio}</p>
      </div>
    </div>
  );
}
