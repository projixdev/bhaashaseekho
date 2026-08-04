// Stand-in for a real video embed — no video file exists yet (client to
// provide). Same spirit as PlaceholderImage: a clearly-labeled, good-looking
// placeholder rather than a broken <video> or an iframe pointing nowhere.
export default function VideoPlaceholder({ label, sublabel, aspectClassName = "aspect-video", className = "" }) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`relative flex items-center justify-center overflow-hidden rounded-xl bg-primary ${aspectClassName} ${className}`}
    >
      <div aria-hidden="true" className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent opacity-20" />
      <div aria-hidden="true" className="absolute -bottom-14 -left-14 h-48 w-48 rounded-full bg-white opacity-5" />

      <div className="relative flex flex-col items-center gap-3 px-6 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-primary shadow-lg">
          <svg viewBox="0 0 24 24" fill="currentColor" className="ml-1 h-6 w-6">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
        <div>
          <p className="font-heading font-semibold text-white">{label}</p>
          {sublabel && <p className="mt-1 text-sm text-white/70">{sublabel}</p>}
        </div>
      </div>
    </div>
  );
}
