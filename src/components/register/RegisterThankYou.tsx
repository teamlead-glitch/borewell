"use client";

import { Phone } from "lucide-react";
import { STORAGE_KEYS } from "@/constants/forms";
import type { SiteContact } from "@/types/settings";
import type { ProviderResult } from "@/types/submission";
import ConfirmCard from "@/components/confirmation/ConfirmCard";
import { useStoredResult } from "@/components/confirmation/useStoredResult";
import VTimeline from "@/components/confirmation/VTimeline";
import Button from "@/components/ui/Button";

export default function RegisterThankYou({ contact }: { contact: SiteContact }) {
  const d = useStoredResult<ProviderResult>(STORAGE_KEYS.REGISTER);
  const email = d?.email;

  return (
    <ConfirmCard
      kind="pending"
      title="Registration received"
      lead={
        d ? (
          <>
            Thank you, {d.company_name}. Your registration is waiting for approval. We&apos;ll email <b className="text-basalt">{email}</b> once
            it&apos;s approved.
          </>
        ) : (
          "Thank you. Your registration is waiting for approval. We'll email you once it's approved."
        )
      }
      badge={<span className="rounded-full border border-line bg-paper px-4 py-1.5 text-[14px] font-semibold">Status: waiting for approval</span>}
    >
      <VTimeline
        steps={[
          { title: "Registration sent", text: "Today" },
          { title: "Our team checks your details", text: "We may call you and visit your yard" },
          { title: "Approval email", text: email ? `Sent to ${email}` : "Sent to your registered email" },
          { title: "We call you about nearby jobs", text: "Quotes are taken by phone; you get an email for each one." },
        ]}
      />
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-[var(--radius-card)] bg-aquifer-soft p-5 text-[15px] text-aquifer-dark">
        <span>Your subscription is arranged with our team by phone.</span>
        {contact.phone && contact.phoneHref && (
          <Button href={contact.phoneHref} variant="outline" className="h-10 border-aquifer-dark text-[14px] text-aquifer-dark">
            <Phone size={15} aria-hidden="true" /> {contact.phone}
          </Button>
        )}
      </div>
      <div className="flex justify-center">
        <Button href="/" variant="dark">
          Back to home
        </Button>
      </div>
    </ConfirmCard>
  );
}
