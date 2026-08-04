import { home } from "@/content";
import FAQAccordion from "@/components/courses/FAQAccordion";

export default function FAQSection() {
  return (
    <section id="faq" className="scroll-mt-24 bg-background py-16">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-center font-heading text-2xl font-bold text-foreground sm:text-3xl">
          {home.faq.heading}
        </h2>
        <div className="mt-10">
          <FAQAccordion faqs={home.faq.items} />
        </div>
      </div>
    </section>
  );
}
