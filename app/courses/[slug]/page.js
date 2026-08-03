import Link from "next/link";
import { notFound } from "next/navigation";
import { IconCheck, IconVideo, IconClock, IconRepeat, IconUsers } from "@tabler/icons-react";
import { getCourseBySlug, getAllCourseSlugs } from "@/data/courses";
import { siteMeta } from "@/content";
import { buildMetadata, breadcrumbSchema, SITE_URL } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import CourseHero from "@/components/courses/CourseHero";
import JourneyTimeline from "@/components/courses/JourneyTimeline";
import ModuleCard from "@/components/courses/ModuleCard";
import TestimonialCard from "@/components/courses/TestimonialCard";
import FAQAccordion from "@/components/courses/FAQAccordion";

export function generateStaticParams() {
  return getAllCourseSlugs().map((slug) => ({ slug }));
}

// Courses are a fixed, known set (matching CMS data) — any slug outside
// generateStaticParams should 404 immediately at the routing layer instead
// of attempting an on-demand render that Next.js would then cache.
export const dynamicParams = false;

export function generateMetadata({ params }) {
  const course = getCourseBySlug(params.slug);
  if (!course) return {};

  return buildMetadata({
    title: `Learn ${course.name} Online`,
    description: `${course.tagline}. Live, tutor-led ${course.format.batchType} classes with real conversation practice.`,
    path: `/courses/${course.slug}`,
  });
}

function FormatItem({ icon: Icon, label, value, themeColor }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-lg border border-border bg-background p-3 text-center">
      <span
        className="flex h-11 w-11 items-center justify-center rounded-full"
        style={{ backgroundColor: `${themeColor}1a` }}
      >
        <Icon size={22} stroke={1.75} style={{ color: themeColor }} />
      </span>
      <p className="text-xs font-medium uppercase tracking-wide text-secondary">{label}</p>
      <p className="font-heading font-semibold text-foreground">{value}</p>
    </div>
  );
}

export default function CourseDetailPage({ params }) {
  const course = getCourseBySlug(params.slug);
  if (!course) notFound();

  const breadcrumbs = breadcrumbSchema([
    { name: "Courses", path: "/courses" },
    { name: course.name, path: `/courses/${course.slug}` },
  ]);

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: `${course.name} Course`,
    description: course.tagline,
    url: `${SITE_URL}/courses/${course.slug}`,
    provider: {
      "@type": "EducationalOrganization",
      name: siteMeta.name,
      url: SITE_URL,
    },
  };

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <JsonLd data={courseSchema} />

      <CourseHero course={course} />

      <section className="bg-background py-8">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-center font-heading text-2xl font-bold text-foreground sm:text-3xl">
            Who This Course Is For
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {course.whoIsThisFor.map((point) => (
              <div key={point} className="flex items-start gap-3 rounded-lg border border-border bg-background p-3">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: `${course.themeColor}1a` }}
                >
                  <IconCheck size={18} stroke={2} style={{ color: course.themeColor }} />
                </span>
                <p className="min-w-0 pt-1.5 text-sm text-secondary">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted py-8">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-center font-heading text-2xl font-bold text-foreground sm:text-3xl">
            Your Learning Journey
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-secondary">
            From your first conversation with us to speaking with confidence.
          </p>
          <div className="mt-10">
            <JourneyTimeline journey={course.learningJourney} themeColor={course.themeColor} />
          </div>
        </div>
      </section>

      <section className="bg-background py-8">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-center font-heading text-2xl font-bold text-foreground sm:text-3xl">
            What You&rsquo;ll Learn
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {course.modules.map((module, index) => (
              <ModuleCard key={module.title} module={module} index={index} themeColor={course.themeColor} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted py-8">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-center font-heading text-2xl font-bold text-foreground sm:text-3xl">Course Format</h2>
          <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-4">
            <FormatItem icon={IconVideo} label="Mode" value={course.format.mode} themeColor={course.themeColor} />
            <FormatItem icon={IconClock} label="Duration" value={course.format.duration} themeColor={course.themeColor} />
            <FormatItem icon={IconRepeat} label="Frequency" value={course.format.frequency} themeColor={course.themeColor} />
            <FormatItem icon={IconUsers} label="Batch Type" value={course.format.batchType} themeColor={course.themeColor} />
          </div>
          <p className="mt-6 text-center text-sm text-secondary">Held on {course.format.platform}</p>
        </div>
      </section>

      <section className="bg-background py-8">
        <div className="mx-auto max-w-md px-6 text-center">
          <div className="rounded-xl border border-border bg-background p-8 shadow-sm">
            <p className="text-sm font-medium uppercase tracking-wide text-secondary">Starting at</p>
            <p className="mt-2 font-heading text-4xl font-bold text-foreground">{course.pricing.startingAt}</p>
            <p className="mt-2 text-sm text-secondary">{course.pricing.note}</p>
            <Link
              href="/register"
              className="mt-6 inline-block cursor-pointer rounded-md px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: course.themeColor }}
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-muted py-8">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center font-heading text-2xl font-bold text-foreground sm:text-3xl">
            What Learners Say
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {course.testimonials.map((testimonial, index) => (
              <TestimonialCard key={testimonial.name} testimonial={testimonial} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-8">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-center font-heading text-2xl font-bold text-foreground sm:text-3xl">
            Frequently Asked Questions
          </h2>
          <div className="mt-10">
            <FAQAccordion faqs={course.faqs} />
          </div>
        </div>
      </section>

      <section className="py-16 text-center" style={{ backgroundColor: course.themeColor }}>
        <div className="mx-auto max-w-lg px-6">
          <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">
            Ready to Start Learning {course.name}?
          </h2>
          <p className="mt-2 text-white/80">Get in touch and we&rsquo;ll help you get started.</p>
          <Link
            href="/register"
            className="mt-6 inline-block cursor-pointer rounded-md bg-white px-6 py-3 text-base font-semibold transition-opacity hover:opacity-90"
            style={{ color: course.themeColor }}
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
