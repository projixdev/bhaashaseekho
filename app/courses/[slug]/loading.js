export default function Loading() {
  return (
    <div className="animate-pulse" aria-hidden="true">
      <div className="h-[420px] w-full bg-border" />

      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="mx-auto h-7 w-72 rounded bg-border" />
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-24 rounded-lg bg-border" />
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 pb-16">
        <div className="mx-auto h-7 w-56 rounded bg-border" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-32 rounded-lg bg-border" />
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 pb-16">
        <div className="h-40 rounded-lg bg-border" />
      </div>
    </div>
  );
}
