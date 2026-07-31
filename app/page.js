import Hero from "@/components/home/Hero";
import ValueProps from "@/components/home/ValueProps";
import CoursesPreview from "@/components/home/CoursesPreview";
import Testimonials from "@/components/home/Testimonials";
import LeadCaptureSection from "@/components/home/LeadCaptureSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueProps />
      <CoursesPreview />
      <Testimonials />
      <LeadCaptureSection />
    </>
  );
}
