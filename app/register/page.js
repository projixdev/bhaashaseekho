import { registerPage, seo } from "@/content";
import RegisterForm from "@/components/forms/RegisterForm";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: seo.register.title,
  description: seo.register.description,
  path: "/register",
  absoluteTitle: true,
});

const breadcrumbs = breadcrumbSchema([{ name: "Get Started", path: "/register" }]);

// Dedicated, minimal-distraction landing page — this is the URL Google Ads
// traffic should point to directly, with the form above the fold.
export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-lg px-6 py-16">
      <JsonLd data={breadcrumbs} />
      <h1 className="font-heading text-3xl font-bold text-foreground">{registerPage.heading}</h1>
      <p className="mt-2 text-secondary">{registerPage.subheading}</p>

      <div className="mt-8 rounded-xl border border-border bg-background p-6 shadow-sm">
        <RegisterForm variant="full" />
      </div>
    </div>
  );
}
