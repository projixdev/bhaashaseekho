import { contactPage } from "@/content";

// Shared by the floating/primary/inline WhatsAppButton variants and the
// footer social icon, so the number + prefilled message stay in one place.
export function buildWhatsAppUrl() {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
  const text = encodeURIComponent(contactPage.whatsapp.prefilledMessage);
  return `https://wa.me/${number}?text=${text}`;
}
