import Hero from "@/components/home/Hero";
import ValueProps from "@/components/home/ValueProps";
import CoursesPreview from "@/components/home/CoursesPreview";
import Testimonials from "@/components/home/Testimonials";
import LeadCaptureSection from "@/components/home/LeadCaptureSection";
import JsonLd from "@/components/seo/JsonLd";
import { siteMeta, seo } from "@/content";
import { buildMetadata, SITE_URL } from "@/lib/seo";

export const metadata = buildMetadata({
  title: seo.home.title,
  description: seo.home.description,
  path: "/",
  absoluteTitle: true,
});

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: siteMeta.name,
  description: siteMeta.description,
  url: SITE_URL,
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationSchema} />
      <Hero />
      <ValueProps />
      <CoursesPreview />
      <Testimonials />
      <LeadCaptureSection />
    </>
  );
}
