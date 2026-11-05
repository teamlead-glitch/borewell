import { Check, Phone } from "lucide-react";
import { APPROVAL_STEPS, PROVIDER_PERKS } from "@/constants/content";
import type { SiteContact } from "@/types/settings";
import VTimeline from "@/components/confirmation/VTimeline";

export default function RegisterAside({ contact }: { contact: SiteContact }) {
  return (
    <aside className="flex flex-col gap-7 rounded-[var(--radius-panel)] bg-deep p-7 text-white lg:sticky lg:top-24">
      <div>
        <h2 className="text-[22px] font-bold">Why register</h2>
        <ul className="mt-4 space-y-3">
          {PROVIDER_PERKS.map((p) => (
            <li key={p} className="flex gap-3 text-[15px] text-white/85">
              <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-[6px] bg-spring text-basalt">
                <Check size={13} strokeWidth={3} aria-hidden="true" />
              </span>
              {p}
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-white/15 pt-6">
        <h2 className="mb-4 text-[22px] font-bold">How approval works</h2>
        <VTimeline steps={APPROVAL_STEPS} doneCount={0} tone="dark" />
      </div>
      <a href={contact.phoneHref} className="flex items-center gap-3 rounded-[var(--radius-card)] bg-white/8 p-4 text-[15px] hover:bg-white/12">
        <Phone size={18} className="text-spring" aria-hidden="true" />
        <span>
          Questions? <b className="tabular-nums">{contact.phone}</b>
        </span>
      </a>
    </aside>
  );
}
