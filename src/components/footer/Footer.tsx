import Link from "next/link";
import { FOOTER_LINKS } from "@/constants/site";
import type { SiteContact } from "@/types/settings";
import Logo from "@/components/ui/Logo";
import FooterColumn from "./FooterColumn";

// Fixed year, not new Date(): the footer is part of cached HTML and must match on every server
const COPYRIGHT_YEAR = 2026;

export default function Footer({ contact }: { contact: SiteContact }) {
  return (
    <footer className="mt-auto rounded-t-[36px] bg-deep text-white/70 sm:rounded-t-[48px]">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-5 pb-12 pt-16 sm:px-8 md:grid-cols-[1.5fr_1fr_1fr_1.3fr]">
        <div className="max-w-xs">
          <Logo tone="light" />
          <p className="mt-4 text-[15px]">
            One enquiry, a site inspection by our own team, and quotes from verified borewell companies near you.
          </p>
        </div>
        <FooterColumn title="Company" links={FOOTER_LINKS.company} />
        <FooterColumn title="Get started" links={FOOTER_LINKS.getStarted} />
        <div>
          <h2 className="mb-4 text-[15px] font-semibold text-white">Talk to us</h2>
          <ul className="space-y-2 text-[15px]">
            <li>
              <a href={contact.phoneHref} className="tabular-nums hover:text-white">
                {contact.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="hover:text-white">
                {contact.email}
              </a>
            </li>
            <li>{contact.address}</li>
          </ul>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1200px] flex-wrap justify-between gap-3 border-t border-white/10 px-5 py-6 text-[14px] sm:px-8">
        <span>
          © {COPYRIGHT_YEAR} {contact.name}. Serving all 14 districts of Kerala.
        </span>
        <span className="flex gap-5">
          {FOOTER_LINKS.legal.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-white">
              {link.label}
            </Link>
          ))}
        </span>
      </div>
    </footer>
  );
}
