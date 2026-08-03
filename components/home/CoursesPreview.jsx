import Link from "next/link";
import { home, courses } from "@/content";
import CourseCard from "@/components/courses/CourseCard";

export default function CoursesPreview() {
  return (
    <section className="bg-background py-8">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
            {home.coursesPreview.heading}
          </h2>
          <Link href={home.coursesPreview.viewAllHref} className="text-sm font-semibold text-accent hover:underline">
            {home.coursesPreview.viewAllLabel} →
          </Link>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.slug} course={course} ctaHref="#lead-form" />
          ))}
        </div>
      </div>
    </section>
  );
}
