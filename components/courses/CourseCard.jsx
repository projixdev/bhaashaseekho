import Link from "next/link";
import CourseThumbnail from "@/components/courses/CourseThumbnail";

// ctaHref: "/register" on the dedicated /courses page (default), or
// "#lead-form" when rendered inside the homepage's CoursesPreview so the
// button scrolls to the single homepage lead form instead of navigating away.
export default function CourseCard({ course, ctaLabel = "Get in Touch", ctaHref = "/register" }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-background">
      <Link href={`/courses/${course.slug}`} className="cursor-pointer">
        <CourseThumbnail slug={course.slug} title={course.title} />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <Link href={`/courses/${course.slug}`} className="cursor-pointer">
          <h3 className="font-heading font-semibold text-foreground hover:text-accent">{course.title}</h3>
        </Link>
        <p className="mt-2 flex-1 text-sm text-secondary">{course.shortDescription}</p>
        <Link
          href={ctaHref}
          className="mt-4 inline-block cursor-pointer rounded-md bg-accent px-4 py-2 text-center text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          {ctaLabel}
        </Link>
      </div>
    </div>
  );
}
