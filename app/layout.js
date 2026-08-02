import { Poppins, Open_Sans } from "next/font/google";
import "./globals.css";
import { siteMeta, seo } from "@/content";
import { SITE_URL, OG_IMAGE } from "@/lib/seo";
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
  metadataBase: new URL(SITE_URL),
  title: {
    default: seo.home.title,
    template: `%s | ${siteMeta.name}`,
  },
  description: siteMeta.description,
  openGraph: {
    siteName: siteMeta.name,
    type: "website",
    locale: "en_US",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    images: [OG_IMAGE.url],
  },
  verification: {
    google: "UpCZJhLyssPFts5nMeD7w43ppYd268ebLBwXkIIf-Rg",
  },
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
