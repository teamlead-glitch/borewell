"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone } from "lucide-react";
import type { SiteContact } from "@/types/settings";
import { cn } from "@/utils/cn";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";
import DesktopNav from "./DesktopNav";
import MobileMenu from "./MobileMenu";
import { useScrolled } from "./useScrolled";

// Pages without a teal banner at the top start with the solid (white) header
const SOLID_PATHS = /\/thank-you$/;

export default function Header({ contact }: { contact: SiteContact }) {
  const pathname = usePathname();
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const solid = scrolled || SOLID_PATHS.test(pathname);

  return (
    <header className={cn("fixed inset-x-0 top-0 z-40 px-3 transition-[padding] duration-300 sm:px-5", solid ? "pt-3 text-basalt" : "pt-0 text-white")}>
      {/* scrolled: a solid white floating bar; at the top: transparent over the banner */}
      <div
        className={cn(
          "mx-auto flex max-w-[1240px] items-center gap-8 rounded-full px-4 transition-all duration-300 sm:px-6",
          solid
            ? "h-[64px] border border-line-soft bg-white shadow-[0_12px_40px_-16px_rgba(11,74,89,.35)]"
            : "h-[76px] border border-transparent bg-transparent"
        )}
      >
        <Link href="/" aria-label={`${contact.name} home`}>
          <Logo tone={solid ? "dark" : "light"} />
        </Link>

        <DesktopNav pathname={pathname} solid={solid} />

        <div className="ml-auto hidden items-center gap-5 lg:flex">
          {contact.phone && contact.phoneHref && (
            <a href={contact.phoneHref} className="flex items-center gap-2 text-[15px] font-semibold tabular-nums">
              <Phone size={16} className={solid ? "text-aquifer" : "text-spring"} aria-hidden="true" />
              {contact.phone}
            </a>
          )}
          <Button href="/enquiry" variant={solid ? "primary" : "light"} className="h-11">
            Send enquiry
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className={cn("ml-auto grid size-11 place-items-center rounded-full border-[1.5px] lg:hidden", solid ? "border-basalt/15" : "border-white/30")}
          aria-label="Open menu"
          aria-expanded={open}
        >
          <Menu size={20} />
        </button>
      </div>

      <MobileMenu open={open} onClose={close} pathname={pathname} contact={contact} />
    </header>
  );
}
