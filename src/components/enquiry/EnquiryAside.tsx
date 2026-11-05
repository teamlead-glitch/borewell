import { Lock, Phone } from "lucide-react";
import { STEPS } from "@/constants/content";
import type { SiteContact } from "@/types/settings";
import { cn } from "@/utils/cn";
import Button from "@/components/ui/Button";

/* Side panel - moves above the form on phones */
export default function EnquiryAside({ contact }: { contact: SiteContact }) {
  return (
    <aside className="flex flex-col gap-4 lg:sticky lg:top-24">
      <div className="rounded-[var(--radius-panel)] border border-line bg-paper p-6">
        <h2 className="text-[19px] font-bold">What happens after you send this</h2>
        <ol className="mt-5 space-y-4">
          {STEPS.map((s, i) => (
            <li key={s.title} className="grid grid-cols-[30px_1fr] gap-3">
              <span
                className={cn(
                  "grid size-[30px] place-items-center rounded-full text-[14px] font-bold",
                  i === 0 ? "bg-deep text-white" : "border-[1.5px] border-line"
                )}
              >
                {i + 1}
              </span>
              <span>
                <b className="block text-[15px]">{s.title}</b>
                <span className="text-[14px] text-stone">{s.text}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
      <div className="flex gap-3 rounded-[var(--radius-card)] bg-aquifer-soft p-5 text-[14px] text-aquifer-dark">
        <Lock size={18} className="shrink-0" aria-hidden="true" />
        Your phone number is shared only with the provider finally selected for your work.
      </div>
      <div className="rounded-[var(--radius-card)] bg-deep p-5 text-white">
        <b className="text-[16px]">Prefer to talk?</b>
        <p className="mt-1 text-[14px] text-white/70">Call us and we&apos;ll fill this in for you.</p>
        <Button href={contact.phoneHref} variant="light" className="mt-4 h-10 text-[14px]">
          <Phone size={15} aria-hidden="true" /> {contact.phone}
        </Button>
      </div>
    </aside>
  );
}
