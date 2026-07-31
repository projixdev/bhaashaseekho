import { Poppins, Open_Sans } from "next/font/google";
import "./globals.css";
import { siteMeta } from "@/content";
import { GTMHeadScript, GTMNoScript } from "@/components/layout/GTMScripts";
import UtmCapture from "@/components/UtmCapture";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["500", "600", "700"],
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

export const metadata = {
  title: `${siteMeta.name} — ${siteMeta.tagline}`,
  description: siteMeta.description,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <GTMHeadScript />
      </head>
      <body className={`${poppins.variable} ${openSans.variable} font-sans antialiased`}>
        <GTMNoScript />
        <UtmCapture />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton variant="floating" />
      </body>
    </html>
  );
}
