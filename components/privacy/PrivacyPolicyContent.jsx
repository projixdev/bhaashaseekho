import { privacyPolicy } from "@/content";

export default function PrivacyPolicyContent() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-heading text-3xl font-bold text-foreground">{privacyPolicy.heading}</h1>
      <p className="mt-2 text-sm italic text-destructive">{privacyPolicy.lastUpdatedLabel}</p>

      <div className="mt-8 flex flex-col gap-8">
        {privacyPolicy.sections.map((section) => (
          <div key={section.heading}>
            <h2 className="font-heading text-lg font-semibold text-foreground">{section.heading}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph} className="mt-2 text-secondary">
                {paragraph}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
