import { home } from "@/content";
import RegisterForm from "@/components/forms/RegisterForm";
import WhatsAppButton from "@/components/common/WhatsAppButton";

// The single lead-capture form on the homepage — every "Book a Trial Class" /
// course CTA on this page scrolls here rather than opening a separate form.
export default function LeadCaptureSection() {
  return (
    <section id="lead-form" className="scroll-mt-24 bg-primary py-16">
      <div className="mx-auto max-w-lg px-6">
        <h2 className="text-center font-heading text-2xl font-bold text-white sm:text-3xl">
          {home.leadForm.heading}
        </h2>
        <p className="mt-2 text-center text-white/80">{home.leadForm.subheading}</p>

        <div className="mt-8 rounded-xl border border-border bg-background p-6 shadow-sm">
          <RegisterForm />
        </div>

        <div className="mt-6 flex flex-col items-center gap-3 text-center">
          <WhatsAppButton variant="inline" />
          <p className="text-sm text-white/70">{home.leadForm.helperText}</p>
        </div>
      </div>
    </section>
  );
}
