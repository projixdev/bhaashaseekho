import Link from "next/link";
import { siteMeta, nav, footer } from "@/content";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-3">
        <div>
          <p className="font-heading text-lg font-semibold text-foreground">{siteMeta.name}</p>
          <p className="mt-2 max-w-xs text-sm text-secondary">{siteMeta.description}</p>
        </div>

        <div>
          <p className="text-sm font-semibold text-foreground">{footer.quickLinksHeading}</p>
          <ul className="mt-3 flex flex-col gap-2">
            {nav.links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-secondary hover:text-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-foreground">{footer.contactHeading}</p>
          <p className="mt-3 text-sm text-secondary">{footer.contact.email}</p>
          <p className="text-sm text-secondary">{footer.contact.phone}</p>

          <div className="mt-4 flex gap-4">
            {footer.socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="text-sm text-secondary hover:text-foreground"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border px-6 py-5 text-center text-xs text-secondary">
        {footer.copyright} · <Link href="/privacy-policy" className="hover:text-foreground">Privacy Policy</Link>
      </div>
    </footer>
  );
}
