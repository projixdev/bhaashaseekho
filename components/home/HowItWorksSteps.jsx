import Link from "next/link";
import { home } from "@/content";

export default function HowItWorksSteps() {
  return (
    <section id="how-it-works" className="scroll-mt-24 bg-muted py-16">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-center font-heading text-2xl font-bold text-foreground sm:text-3xl">
          {home.howItWorks.heading}
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {home.howItWorks.steps.map((step) => (
            <div key={step.step} className="text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-semibold text-white">
                {step.step}
              </span>
              <p className="mt-4 font-heading font-semibold text-foreground">{step.title}</p>
              <p className="mt-2 text-sm text-secondary">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/register"
            className="cursor-pointer rounded-md bg-accent px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            {home.howItWorks.ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
