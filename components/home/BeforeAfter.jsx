import { IconX, IconCheck } from "@tabler/icons-react";
import { home } from "@/content";

export default function BeforeAfter() {
  const { heading, before, after } = home.beforeAfter;

  return (
    <section className="bg-background py-16">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="text-center font-heading text-2xl font-bold text-foreground sm:text-3xl">{heading}</h2>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="rounded-lg border border-border bg-muted p-6">
            <p className="font-heading font-semibold text-foreground">{before.label}</p>
            <ul className="mt-4 flex flex-col gap-3">
              {before.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-secondary">
                  <IconX size={16} stroke={2} className="mt-0.5 shrink-0 text-destructive" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-accent bg-accent-soft p-6">
            <p className="font-heading font-semibold text-foreground">{after.label}</p>
            <ul className="mt-4 flex flex-col gap-3">
              {after.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-secondary">
                  <IconCheck size={16} stroke={2.25} className="mt-0.5 shrink-0 text-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
