import Link from "next/link";
import { IconMicrophone, IconPencil, IconSchool, IconTarget } from "@tabler/icons-react";
import { home } from "@/content";

// Order matches home.goals.items: Speak Confidently, Reading & Writing,
// Academic Support, Exam Preparation.
const ICONS = [IconMicrophone, IconPencil, IconSchool, IconTarget];

export default function GoalCards() {
  return (
    <section className="bg-background py-16">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center font-heading text-2xl font-bold text-foreground sm:text-3xl">
          {home.goals.heading}
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-secondary">{home.goals.subheading}</p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {home.goals.items.map((goal, index) => {
            const Icon = ICONS[index];
            return (
              <div key={goal.title} className="flex flex-col rounded-lg border border-border bg-background p-6 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-soft">
                  <Icon size={22} stroke={1.75} className="text-accent" />
                </div>
                <p className="mt-4 font-heading font-semibold text-foreground">{goal.title}</p>
                <p className="text-xs font-medium uppercase tracking-wide text-secondary">{goal.subtitle}</p>
                <p className="mt-2 flex-1 text-sm text-secondary">{goal.description}</p>
                <Link href={home.goals.ctaHref} className="mt-4 text-sm font-semibold text-accent hover:underline">
                  {home.goals.ctaLabel} &rarr;
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
