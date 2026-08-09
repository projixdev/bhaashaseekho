import Hero from "@/components/home/Hero";
import LanguageSelector from "@/components/home/LanguageSelector";
import GoalCards from "@/components/home/GoalCards";
import HowItWorksSteps from "@/components/home/HowItWorksSteps";
import ClassVideo from "@/components/home/ClassVideo";
import ValueProps from "@/components/home/ValueProps";
import BeforeAfter from "@/components/home/BeforeAfter";
import TrustStats from "@/components/home/TrustStats";
import Testimonials from "@/components/home/Testimonials";
import AudienceSection from "@/components/home/AudienceSection";
import FAQSection from "@/components/home/FAQSection";
import LeadCaptureSection from "@/components/home/LeadCaptureSection";
import JsonLd from "@/components/seo/JsonLd";
import { siteMeta, seo, footer } from "@/content";
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
  logo: `${SITE_URL}/logo.png`,
  sameAs: footer.socialLinks.map((link) => link.href),
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationSchema} />
      <Hero />
      <LanguageSelector />
      <GoalCards />
      <HowItWorksSteps />
      <ClassVideo />
      <ValueProps />
      <BeforeAfter />
      <TrustStats />
      <Testimonials />
      <AudienceSection />
      <FAQSection />
      <LeadCaptureSection />
    </>
  );
}
