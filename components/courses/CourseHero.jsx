import Link from "next/link";
import { SCRIPT_FONTS } from "@/lib/scriptFonts";

export default function CourseHero({ course }) {
  const scriptFontClassName = SCRIPT_FONTS[course.slug] || "";

  return (
    <section
      className="relative overflow-hidden px-6 py-20 text-center sm:py-28"
      style={{ backgroundColor: course.themeColor }}
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 flex select-none items-center justify-center text-[14rem] leading-none text-white opacity-10 sm:text-[18rem] ${scriptFontClassName}`}
      >
        {course.nativeScript}
      </span>

      <div className="relative mx-auto max-w-2xl">
        {course.trustBadge && (
          <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">
            {course.trustBadge}
          </span>
        )}
        <h1 className="mt-4 font-heading text-4xl font-bold text-white sm:text-5xl">{course.name}</h1>
        <p className="mx-auto mt-4 max-w-lg text-lg text-white/80">{course.tagline}</p>
        <Link
          href="/register"
          className="mt-8 inline-block cursor-pointer rounded-md bg-white px-6 py-3 text-base font-semibold transition-opacity hover:opacity-90"
          style={{ color: course.themeColor }}
        >
          Book a Trial Class
        </Link>
      </div>
    </section>
  );
}
