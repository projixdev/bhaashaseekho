import Link from "next/link";
import Image from "next/image";
import { IconBrandInstagram, IconBrandWhatsapp, IconMail, IconCheck, IconAward } from "@tabler/icons-react";
import { siteMeta, footer } from "@/content";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const SOCIAL_ICONS = {
  Instagram: IconBrandInstagram,
  WhatsApp: IconBrandWhatsapp,
  Gmail: IconMail,
};

const TRUST_BADGE_ICONS = {
  "Free Trial Class": IconCheck,
  "Experienced Tutors": IconAward,
};

// Shared by the brand block and the bottom bar. WhatsApp and Gmail are
// derived here (not stored in content.js) — WhatsApp reuses the same
// wa.me link builder as the floating WhatsAppButton, and Gmail is a
// mailto: to footer.contact.email. These icons ARE the email/phone
// contact points now — there's no separate plain-text line duplicating
// them elsewhere in the footer.
function SocialIcons({ className = "" }) {
  const links = [
    ...footer.socialLinks,
    { label: "WhatsApp", href: buildWhatsAppUrl() },
    { label: "Gmail", href: `mailto:${footer.contact.email}` },
  ];

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {links.map((social) => {
        const Icon = SOCIAL_ICONS[social.label];
        const isMailto = social.href.startsWith("mailto:");
        return (
          <a
            key={social.label}
            href={social.href}
            aria-label={social.label}
            className="text-secondary transition-colors hover:text-accent"
            {...(!isMailto && { target: "_blank", rel: "noopener noreferrer" })}
          >
            {Icon ? <Icon size={20} stroke={1.75} /> : social.label}
          </a>
        );
      })}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3">
            <Image src={siteMeta.logoUrl} alt={`${siteMeta.name} logo`} width={48} height={48} className="h-12 w-12" />
            <span className="flex flex-col leading-tight">
              <span className="font-heading text-base font-bold text-foreground">{siteMeta.name}</span>
              <span className="text-xs text-secondary">{siteMeta.tagline}</span>
            </span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-secondary">{siteMeta.description}</p>
          <p className="mt-3 text-sm font-semibold text-accent">{footer.trustStat}</p>
          <SocialIcons className="mt-4" />
        </div>

        {footer.columns.map((column) => (
          <div key={column.heading}>
            <p className="font-heading text-sm font-bold text-accent">{column.heading}</p>
            <ul className="mt-3 flex flex-col gap-2">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-secondary transition-colors hover:text-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border bg-accent-soft px-6 py-4">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-2 sm:justify-start">
          {footer.trustBadges.map((badge) => {
            const Icon = TRUST_BADGE_ICONS[badge.label];
            return (
              <span key={badge.label} className="flex items-center gap-2 text-sm font-medium text-foreground">
                {Icon && <Icon size={18} stroke={1.75} className="text-accent" />}
                {badge.label}
              </span>
            );
          })}
        </div>
      </div>

      {/* pb-20 on mobile: the fixed WhatsAppButton (bottom-5 right-5, 56px)
          sits in the same corner as this bar's content once scrolled to
          the true end of the page — extra bottom padding here means it
          overlaps blank space instead of the copyright text or icons. */}
      <div className="border-t border-border px-6 py-6 pb-20 sm:pb-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-sm text-secondary sm:flex-row sm:justify-between">
          <p className="text-center text-xs text-secondary">{footer.copyright}</p>
          <SocialIcons />
        </div>
      </div>
    </footer>
  );
}
