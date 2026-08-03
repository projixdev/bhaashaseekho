import { IconChevronDown } from "@tabler/icons-react";

// Native <details>/<summary> — collapsed by default with zero client JS,
// same pattern as the mobile journey accordion.
export default function FAQAccordion({ faqs }) {
  return (
    <div className="flex flex-col gap-3">
      {faqs.map((faq) => (
        <details key={faq.question} className="group rounded-lg border border-border bg-background p-3">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
            <span className="font-heading font-medium text-foreground">{faq.question}</span>
            <IconChevronDown size={18} className="shrink-0 text-secondary transition-transform group-open:rotate-180" />
          </summary>
          <p className="mt-3 text-sm text-secondary">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
