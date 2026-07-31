import { contactPage } from "@/content";
import ContactForm from "@/components/forms/ContactForm";
import WhatsAppButton from "@/components/common/WhatsAppButton";

export const metadata = { title: contactPage.heading };

// Support/query page — WhatsApp is the primary path, with a lightweight
// optional-message form as a fallback. This is NOT lead capture; that lives
// on /register and the homepage's single lead form.
export default function ContactPage() {
  return (
    <div className="mx-auto max-w-xl px-6 py-16">
      <h1 className="font-heading text-3xl font-bold text-foreground">{contactPage.heading}</h1>
      <p className="mt-2 text-secondary">{contactPage.subheading}</p>

      <div className="mt-8 flex flex-col items-start gap-4 rounded-xl border border-border bg-muted p-6">
        <WhatsAppButton variant="primary" />

        <div className="flex flex-col gap-1 text-sm text-secondary">
          <a href={`mailto:${contactPage.details.email}`} className="hover:text-foreground">
            {contactPage.details.emailLabel}: {contactPage.details.email}
          </a>
          <a href={`tel:${contactPage.details.phone}`} className="hover:text-foreground">
            {contactPage.details.phoneLabel}: {contactPage.details.phone}
          </a>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="font-heading text-lg font-semibold text-foreground">{contactPage.form.heading}</h2>
        <div className="mt-4">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
