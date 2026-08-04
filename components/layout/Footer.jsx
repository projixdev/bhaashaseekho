import Link from "next/link";
import Image from "next/image";
import { siteMeta, footer } from "@/content";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-5">
        <div className="sm:col-span-2 lg:col-span-1">
          <Image src="/image.png" alt={siteMeta.name} width={64} height={64} className="h-16 w-16" />
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

          {footer.socialLinks.length > 0 && (
            <div className="flex gap-4">
              {footer.socialLinks.map((social) => (
                <a key={social.label} href={social.href} className="hover:text-foreground">
                  {social.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-border px-6 py-5 text-center text-xs text-secondary">{footer.copyright}</div>
    </footer>
  );
}
