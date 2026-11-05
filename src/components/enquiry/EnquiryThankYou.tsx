"use client";

import { Phone } from "lucide-react";
import { STORAGE_KEYS } from "@/constants/forms";
import type { SiteContact } from "@/types/settings";
import type { EnquiryResult } from "@/types/submission";
import ConfirmCard from "@/components/confirmation/ConfirmCard";
import Tracker from "@/components/confirmation/Tracker";
import { useStoredResult } from "@/components/confirmation/useStoredResult";
import Button from "@/components/ui/Button";
import CopyButton from "@/components/ui/CopyButton";

const TRACKER = [
  { title: "Sent", text: "Today" },
  { title: "Site inspection", text: "Our team calls you" },
  { title: "Quotes", text: "We compare them" },
  { title: "Provider confirmed", text: "They call you" },
];

export default function EnquiryThankYou({ contact }: { contact: SiteContact }) {
  const d = useStoredResult<EnquiryResult>(STORAGE_KEYS.ENQUIRY);

  return (
    <ConfirmCard
      kind="done"
      title="Enquiry received"
      lead={
        d ? (
          <>
            Thank you, {d.customer_name}. Our team will call you on <b className="text-basalt">+91 {d.phone}</b> to arrange a site inspection.
          </>
        ) : (
          "Thank you. Our team will call you to arrange a site inspection."
        )
      }
      badge={
        d && (
          <div className="flex items-center gap-3 rounded-full border border-line bg-paper py-1.5 pl-5 pr-1.5">
            <span className="text-[14px] text-stone">Reference</span>
            <b className="text-[18px] tabular-nums tracking-wide">{d.reference}</b>
            <CopyButton value={d.reference} label="Copy" />
          </div>
        )
      }
    >
      <Tracker steps={TRACKER} />

      {d && (
        <dl className="grid gap-4 rounded-[var(--radius-card)] border border-line-soft p-5 text-[16px] sm:grid-cols-2">
          {[
            ["Services", d.services.join(", ") || "General enquiry"],
            ["Location", d.location],
            ["Property", d.property || "Not given"],
            ["Reference sent to", d.acknowledgement_sent_to || "No email given"],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="text-[13px] text-stone">{k}</dt>
              <dd className="font-medium">{v}</dd>
            </div>
          ))}
        </dl>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-[var(--radius-card)] bg-aquifer-soft p-5 text-[15px] text-aquifer-dark">
        <span>
          Need to change something?{" "}
          {d ? (
            <>
              Quote <b>{d.reference}</b> when you call.
            </>
          ) : (
            "Call our team."
          )}
        </span>
        {contact.phone && contact.phoneHref && (
          <Button href={contact.phoneHref} variant="outline" className="h-10 border-aquifer-dark text-[14px] text-aquifer-dark">
            <Phone size={15} aria-hidden="true" /> {contact.phone}
          </Button>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <Button href="/" variant="dark">
          Back to home
        </Button>
        <Button href="/services" variant="outline">
          View services
        </Button>
      </div>
    </ConfirmCard>
  );
}
