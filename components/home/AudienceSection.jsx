import { IconBriefcase, IconSchool, IconWorld, IconHome, IconTarget } from "@tabler/icons-react";
import { home } from "@/content";

// Order matches home.audiences.items.
const ICONS = [IconBriefcase, IconSchool, IconWorld, IconHome, IconTarget];

export default function AudienceSection() {
  return (
    <section className="bg-muted py-16">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center font-heading text-2xl font-bold text-foreground sm:text-3xl">
          {home.audiences.heading}
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {home.audiences.items.map((item, index) => {
            const Icon = ICONS[index];
            return (
              <div key={item.title} className="rounded-lg border border-border bg-background p-5 text-center">
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-accent-soft">
                  <Icon size={22} stroke={1.75} className="text-accent" />
                </div>
                <p className="mt-3 font-heading font-semibold text-foreground">{item.title}</p>
                <p className="mt-1.5 text-sm text-secondary">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
