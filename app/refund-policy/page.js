import { seo } from "@/content";
import RefundPolicyContent from "@/components/legal/RefundPolicyContent";
import JsonLd from "@/components/seo/JsonLd";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: seo.refundPolicy.title,
  description: seo.refundPolicy.description,
  path: "/refund-policy",
});

const breadcrumbs = breadcrumbSchema([{ name: "Refund & Cancellation Policy", path: "/refund-policy" }]);

export default function RefundPolicyPage() {
  return (
    <>
      <JsonLd data={breadcrumbs} />
      <RefundPolicyContent />
    </>
  );
}
