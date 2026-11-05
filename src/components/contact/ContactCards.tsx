import { Mail, MapPin, MessageCircle, Phone, type LucideIcon } from "lucide-react";
import type { SiteContact } from "@/types/settings";
import ActionLink from "@/components/ui/ActionLink";
import Container from "@/components/ui/Container";
import CopyButton from "@/components/ui/CopyButton";

type Card = { icon: LucideIcon; label: string; value: string | null; note: string | null; action: React.ReactNode };

/* Call / WhatsApp / Email / Visit cards that overlap the page banner.
 * Values come only from admin > Settings: an empty one (and its button) is simply left out; the label stays. */
export default function ContactCards({ contact }: { contact: SiteContact }) {
  const cards: Card[] = [
    {
      icon: Phone,
      label: "Call",
      value: contact.phone,
      note: contact.phoneHours,
      action: contact.phone && <CopyButton value={contact.phone} label="Copy number" />,
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: contact.whatsapp,
      note: "Replies within working hours",
      action: contact.whatsappHref && <ActionLink href={contact.whatsappHref}>Open WhatsApp</ActionLink>,
    },
    {
      icon: Mail,
      label: "Email",
      value: contact.email,
      note: "We reply within 1 working day",
      action: contact.email && <CopyButton value={contact.email} label="Copy email" />,
    },
    {
      icon: MapPin,
      label: "Visit",
      value: contact.location,
      note: contact.address,
      action: contact.mapUrl && <ActionLink href={contact.mapUrl}>Get directions</ActionLink>,
    },
  ];

  return (
    <section className="relative z-10 -mt-8 sm:-mt-12">
      <Container className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ icon: CardIcon, label, value, note, action }) => (
          <div
            key={label}
            className="flex flex-col gap-2 rounded-[24px] border border-line-soft bg-paper p-6 shadow-[0_24px_48px_-28px_rgba(11,74,89,.5)] transition-transform duration-300 hover:-translate-y-1"
          >
            <span className="grid size-12 place-items-center rounded-[16px] bg-gradient-to-br from-aquifer to-spring text-white">
              <CardIcon size={20} aria-hidden="true" />
            </span>
            <p className="mt-3 text-[14px] text-stone">{label}</p>
            {value && <p className="break-words text-[19px] font-bold tabular-nums">{value}</p>}
            {note && <p className="text-[14px] text-stone">{note}</p>}
            {action && <div className="mt-auto pt-3">{action}</div>}
          </div>
        ))}
      </Container>
    </section>
  );
}
