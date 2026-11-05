"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Phone, X } from "lucide-react";
import { NAV_ITEMS } from "@/constants/site";
import type { SiteContact } from "@/types/settings";
import { cn } from "@/utils/cn";
import Button from "@/components/ui/Button";
import Logo from "@/components/ui/Logo";
import { isActive } from "./nav";

type Props = { open: boolean; onClose: () => void; pathname: string; contact: SiteContact };

/** Slide-in sheet for phones and tablets (below lg) */
export default function MobileMenu({ open, onClose, pathname, contact }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);

  // While open: page scroll locked, focus moved into the sheet, Escape closes.
  // On close, focus goes back to whatever opened it (the menu button).
  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      opener?.focus?.();
    };
  }, [open, onClose]);

  return (
    <div
      className={cn("fixed inset-0 z-50 transition-opacity lg:hidden", open ? "opacity-100" : "pointer-events-none opacity-0")}
      aria-hidden={!open}
      inert={!open}
    >
      <div className="absolute inset-0 bg-deep/40" onClick={onClose} />
      <div
        className={cn(
          "absolute right-0 top-0 flex h-dvh w-[min(360px,88vw)] flex-col bg-mist p-6 text-basalt transition-transform duration-300",
          open ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        <div className="flex items-center justify-between">
          <Logo />
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="grid size-11 place-items-center rounded-full border-[1.5px] border-basalt/20"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>
        <nav aria-label="Mobile" className="mt-10 flex flex-col">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn("border-b border-line py-4 text-[24px] font-bold", isActive(pathname, item.href) ? "text-aquifer" : "text-basalt")}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-3">
          <Button href="/enquiry" onClick={onClose}>
            Send enquiry
          </Button>
          {contact.phone && contact.phoneHref && (
            <Button href={contact.phoneHref} variant="outline">
              <Phone size={16} aria-hidden="true" /> {contact.phone}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
