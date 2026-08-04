import { home } from "@/content";

export default function TrustStats() {
  return (
    <section className="bg-primary py-12">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-center font-heading text-lg font-semibold text-white/90 sm:text-xl">
          {home.trustStats.heading}
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {home.trustStats.items.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-heading text-3xl font-bold text-white sm:text-4xl">{stat.value}</p>
              <p className="mt-1 text-sm text-white/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
