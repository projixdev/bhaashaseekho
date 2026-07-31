import { privacyPolicy } from "@/content";
import PrivacyPolicyContent from "@/components/privacy/PrivacyPolicyContent";

export const metadata = { title: privacyPolicy.heading };

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyContent />;
}
