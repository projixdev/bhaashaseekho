"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";

// The root layout (app/layout.js) wraps every route in the app, admin
// included — nested layouts (app/admin/layout.js) can only add to what's
// inside {children}, they can never remove chrome an ancestor layout
// already rendered. This is that root cause fixed at the one place that
// actually controls it: /admin/* is a separate application surface (own
// sidebar nav) and must never show the public marketing nav/footer/WhatsApp
// widget, regardless of how deep the admin route tree grows later.
export default function SiteChrome({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <main>{children}</main>;
  }

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton variant="floating" />
    </>
  );
}
