import { Check } from "lucide-react";
import { cn } from "@/utils/cn";

/* Selectable service option (a checkbox): name and short line, no photo, so a long list of
   services stays compact and easy to scan */
export default function ServiceTile({ name, short, checked, onToggle }: { name: string; short: string; checked: boolean; onToggle: () => void }) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-start gap-3.5 rounded-[var(--radius-card)] border-[1.5px] px-4 py-3.5 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-aquifer",
        checked ? "border-aquifer bg-aquifer-soft/60" : "border-line bg-paper hover:border-stone-2"
      )}
    >
      <input type="checkbox" className="sr-only" checked={checked} onChange={onToggle} />
      <span
        className={cn(
          "mt-0.5 grid size-[22px] shrink-0 place-items-center rounded-[7px] border-[1.5px] transition-colors",
          checked ? "border-aquifer bg-aquifer text-white" : "border-stone-2 bg-paper"
        )}
        aria-hidden="true"
      >
        {checked && <Check size={14} strokeWidth={3} />}
      </span>
      <span className="flex min-w-0 flex-col gap-0.5">
        <span className="text-[15.5px] font-semibold leading-snug">{name}</span>
        {short && <span className="text-[13.5px] leading-snug text-stone">{short}</span>}
      </span>
    </label>
  );
}
