import {
  IconSchool,
  IconTarget,
  IconUser,
  IconUsers,
  IconClock,
  IconWorld,
  IconBooks,
  IconMessageCircle,
} from "@tabler/icons-react";
import { home } from "@/content";
import Reveal from "@/components/common/Reveal";

// Order matches home.valueProps.items. Icon/background alternate navy/orange
// so the grid doesn't read as flat and same-colored.
const ICONS = [
  { Icon: IconSchool, iconClassName: "text-primary", bgClassName: "bg-accent-soft" },
  { Icon: IconTarget, iconClassName: "text-white", bgClassName: "bg-primary" },
  { Icon: IconUser, iconClassName: "text-primary", bgClassName: "bg-accent-soft" },
  { Icon: IconUsers, iconClassName: "text-white", bgClassName: "bg-primary" },
  { Icon: IconClock, iconClassName: "text-primary", bgClassName: "bg-accent-soft" },
  { Icon: IconWorld, iconClassName: "text-white", bgClassName: "bg-primary" },
  { Icon: IconBooks, iconClassName: "text-primary", bgClassName: "bg-accent-soft" },
  { Icon: IconMessageCircle, iconClassName: "text-white", bgClassName: "bg-primary" },
];

export default function ValueProps() {
  return (
    <section className="bg-muted py-16">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center font-heading text-2xl font-bold text-foreground sm:text-3xl">
          {home.valueProps.heading}
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {home.valueProps.items.map((item, index) => {
            const { Icon, iconClassName, bgClassName } = ICONS[index];
            return (
              <Reveal key={item.title} delayMs={(index % 4) * 80}>
                <div className="h-full rounded-lg border border-border bg-background p-6">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-full ${bgClassName}`}>
                    <Icon size={24} stroke={1.75} className={iconClassName} />
                  </div>
                  <h3 className="mt-4 font-heading font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm text-secondary">{item.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
