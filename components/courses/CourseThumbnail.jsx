import { SCRIPT_FONTS } from "@/lib/scriptFonts";

// Script-art thumbnails instead of stock photos — each course's own
// language script, layered (large faint + smaller bold), on a brand-color
// background. Zero external image assets needed.
const SCRIPT_MAP = {
  kannada: { text: "ಕನ್ನಡ", fontClassName: SCRIPT_FONTS.kannada, bgClassName: "bg-primary" },
  hindi: { text: "हिन्दी", fontClassName: SCRIPT_FONTS.hindi, bgClassName: "bg-accent" },
  telugu: { text: "తెలుగు", fontClassName: SCRIPT_FONTS.telugu, bgClassName: "bg-primary" },
};

export default function CourseThumbnail({ slug, title }) {
  const script = SCRIPT_MAP[slug];

  return (
    <div className="relative aspect-[4/3] overflow-hidden">
      {/* Badge with the Latin-script name, for anyone who doesn't read the
          native script shown behind it. */}
      <span className="absolute left-3 top-3 z-10 rounded-full bg-background/90 px-2.5 py-1 text-xs font-semibold text-primary backdrop-blur">
        {title}
      </span>

      {script ? (
        <div
          role="img"
          aria-label={`${title} course`}
          className={`relative flex h-full w-full items-center justify-center ${script.bgClassName}`}
        >
          <span className={`${script.fontClassName} select-none text-7xl leading-none text-white opacity-20`}>
            {script.text}
          </span>
          <span className={`${script.fontClassName} absolute text-3xl leading-none text-white`}>{script.text}</span>
        </div>
      ) : (
        <div className="h-full w-full bg-muted" role="img" aria-label={`${title} course`} />
      )}
    </div>
  );
}
