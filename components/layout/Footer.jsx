import Link from "next/link";
import Image from "next/image";
import { IconBrandInstagram, IconBrandWhatsapp, IconMail } from "@tabler/icons-react";
import { siteMeta, footer } from "@/content";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

// IconMail (plain envelope) instead of IconBrandGmail — the Gmail
// wordmark glyph reads as an ambiguous "M" at 20px, and a mailto: link
// opens whatever mail client the visitor has, not necessarily Gmail.
const SOCIAL_ICONS = {
  Instagram: IconBrandInstagram,
  WhatsApp: IconBrandWhatsapp,
  Gmail: IconMail,
};

export default function Footer() {
  // Instagram comes from content.js (needs a real profile URL supplied);
  // WhatsApp and Gmail are derived here since the phone/email already live
  // in footer.contact and the wa.me link builder is shared with WhatsAppButton.
  const socialLinks = [
    ...footer.socialLinks,
    { label: "WhatsApp", href: buildWhatsAppUrl() },
    { label: "Gmail", href: `mailto:${footer.contact.email}` },
  ];

  return (
    <footer className="border-t border-border bg-muted">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-5">
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt={`${siteMeta.name} logo`} width={48} height={48} className="h-12 w-12" />
            <span className="flex flex-col leading-tight">
              <span className="font-heading text-base font-bold text-foreground">{siteMeta.name}</span>
              <span className="text-xs text-secondary">{siteMeta.tagline}</span>
            </span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-secondary">{siteMeta.description}</p>
        </div>

        {footer.columns.map((column) => (
          <div key={column.heading}>
            <p className="text-sm font-semibold text-foreground">{column.heading}</p>
            <ul className="mt-3 flex flex-col gap-2">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-secondary hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border px-6 py-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 text-sm text-secondary sm:flex-row sm:justify-between">
          <div className="flex flex-col items-center gap-1 sm:flex-row sm:gap-4">
            <span>{footer.contact.email}</span>
            <span>{footer.contact.phone}</span>
          </div>

          <div className="flex gap-4">
            {socialLinks.map((social) => {
              const Icon = SOCIAL_ICONS[social.label];
              const isMailto = social.href.startsWith("mailto:");
              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="text-secondary transition-colors hover:text-foreground"
                  {...(!isMailto && { target: "_blank", rel: "noopener noreferrer" })}
                >
                  {Icon ? <Icon size={20} stroke={1.75} /> : social.label}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div className="border-t border-border px-6 py-5 text-center text-xs text-secondary">{footer.copyright}</div>
    </footer>
  );
}
