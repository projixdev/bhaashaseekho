import { seo } from "@/content";
import PrivacyPolicyContent from "@/components/privacy/PrivacyPolicyContent";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: seo.privacyPolicy.title,
  description: seo.privacyPolicy.description,
  path: "/privacy-policy",
});

const breadcrumbs = breadcrumbSchema([{ name: "Privacy Policy", path: "/privacy-policy" }]);

export default function PrivacyPolicyPage() {
  return (
    <>
      <JsonLd data={breadcrumbs} />
      <PrivacyPolicyContent />
    </>
  );
}
