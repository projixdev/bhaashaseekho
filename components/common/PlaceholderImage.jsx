// Stand-in for a real photo/graphic. No external image service, no network
// dependency — just a clearly-labeled block so it's obvious to the client
// exactly what needs to be swapped in, and where.
export default function PlaceholderImage({ label, aspectClassName = "aspect-video", className = "" }) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`flex items-center justify-center rounded-lg border border-dashed border-border bg-muted ${aspectClassName} ${className}`}
    >
      <div className="flex flex-col items-center gap-2 px-4 text-center text-secondary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          className="h-8 w-8 opacity-60"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="9" cy="9" r="2" />
          <path d="m21 15-5-5L5 21" />
        </svg>
        <span className="text-sm font-medium">{label}</span>
      </div>
    </div>
  );
}
