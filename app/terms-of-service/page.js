import { seo } from "@/content";
import TermsOfServiceContent from "@/components/legal/TermsOfServiceContent";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: seo.termsOfService.title,
  description: seo.termsOfService.description,
  path: "/terms-of-service",
});

const breadcrumbs = breadcrumbSchema([{ name: "Terms of Service", path: "/terms-of-service" }]);

export default function TermsOfServicePage() {
  return (
    <>
      <JsonLd data={breadcrumbs} />
      <TermsOfServiceContent />
    </>
  );
}
