import { coursesPage, courses } from "@/content";
import CourseCard from "@/components/courses/CourseCard";

export const metadata = { title: coursesPage.heading };

export default function CoursesPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="font-heading text-3xl font-bold text-foreground">{coursesPage.heading}</h1>
      <p className="mt-2 max-w-2xl text-secondary">{coursesPage.subheading}</p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <CourseCard key={course.slug} course={course} ctaLabel={coursesPage.cardCtaLabel} />
        ))}
      </div>
    </div>
  );
}
