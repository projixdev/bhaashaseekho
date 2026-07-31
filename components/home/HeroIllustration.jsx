// Hand-built flat illustration (no stock photo/AI image dependency) of a
// live video lesson: a tutor on the main screen, a student in a smaller
// inset window, and a chat bubble suggesting live back-and-forth. Colors
// match the existing design tokens (primary navy, accent orange) exactly,
// hardcoded rather than referencing CSS vars for guaranteed SVG rendering.
export default function HeroIllustration() {
  return (
    <div className="relative mx-auto mt-10 max-w-md">
      {/* Organic blob + accent circle sitting behind the illustration so the
          hero isn't just plain white space. */}
      <div
        aria-hidden="true"
        className="absolute -inset-8 -z-10 rounded-[42%_58%_53%_47%/48%_42%_58%_52%] bg-accent-soft"
      />
      <div aria-hidden="true" className="absolute -right-6 -top-6 -z-10 h-28 w-28 rounded-full bg-primary opacity-10" />

      <svg viewBox="0 0 400 300" className="w-full" role="img" aria-label="Illustration of a live video language lesson">
        {/* Laptop screen */}
        <rect x="40" y="30" width="320" height="200" rx="16" fill="#0F172A" />
        <rect x="60" y="50" width="280" height="160" rx="10" fill="#FFFFFF" />

        {/* Tutor — main participant */}
        <circle cx="150" cy="110" r="30" fill="#B45309" />
        <path d="M108 178 Q150 132 192 178 L192 195 L108 195 Z" fill="#B45309" />

        {/* Student — smaller inset call window */}
        <rect x="268" y="148" width="58" height="48" rx="8" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" />
        <circle cx="297" cy="167" r="11" fill="#0F172A" />
        <path d="M281 191 Q297 176 313 191 Z" fill="#0F172A" />

        {/* Chat bubble with typing dots */}
        <rect x="205" y="58" width="90" height="40" rx="12" fill="#FEF3C7" />
        <path d="M220 98 L220 111 L238 98 Z" fill="#FEF3C7" />
        <circle cx="230" cy="78" r="4" fill="#B45309" />
        <circle cx="250" cy="78" r="4" fill="#B45309" />
        <circle cx="270" cy="78" r="4" fill="#B45309" />

        {/* Laptop base */}
        <path d="M20 230 L380 230 L360 250 L40 250 Z" fill="#334155" />

        {/* Decorative floating shapes */}
        <circle cx="45" cy="60" r="8" fill="#B45309" opacity="0.5" />
        <circle cx="368" cy="235" r="10" fill="#0F172A" opacity="0.15" />
        <rect x="18" y="196" width="16" height="16" rx="4" fill="#B45309" opacity="0.3" transform="rotate(20 26 204)" />
      </svg>
    </div>
  );
}
