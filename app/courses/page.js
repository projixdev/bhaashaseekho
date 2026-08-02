import { coursesPage, courses, siteMeta, seo } from "@/content";
import CourseCard from "@/components/courses/CourseCard";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata, breadcrumbSchema, SITE_URL } from "@/lib/seo";

export const metadata = buildMetadata({
  title: seo.courses.title,
  description: seo.courses.description,
  path: "/courses",
});

const breadcrumbs = breadcrumbSchema([{ name: "Courses", path: "/courses" }]);

const courseSchemas = courses.map((course) => ({
  "@context": "https://schema.org",
  "@type": "Course",
  name: `${course.title} Course`,
  description: course.shortDescription,
  url: `${SITE_URL}/courses`,
  provider: {
    "@type": "EducationalOrganization",
    name: siteMeta.name,
    url: SITE_URL,
  },
}));

export default function CoursesPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <JsonLd data={breadcrumbs} />
      {courseSchemas.map((schema) => (
        <JsonLd key={schema.name} data={schema} />
      ))}
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
