import Link from "next/link";
import { home, courses } from "@/content";
import CourseThumbnail from "@/components/courses/CourseThumbnail";

export default function LanguageSelector() {
  return (
    <section id="languages" className="scroll-mt-24 bg-muted py-16">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center font-heading text-2xl font-bold text-foreground sm:text-3xl">
          {home.languageSelector.heading}
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-secondary">{home.languageSelector.subheading}</p>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {courses.map((course) => (
            <Link
              key={course.slug}
              href={`/courses/${course.slug}`}
              className="group flex flex-col overflow-hidden rounded-lg border border-border bg-background transition-shadow hover:shadow-md"
            >
              <CourseThumbnail slug={course.slug} title={course.title} />
              <div className="flex items-center justify-between p-4">
                <span className="font-heading font-semibold text-foreground">{course.title}</span>
                <span className="text-sm font-semibold text-accent transition-transform group-hover:translate-x-0.5">
                  Explore &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
