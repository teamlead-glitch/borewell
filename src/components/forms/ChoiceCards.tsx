import { Check, type LucideIcon } from "lucide-react";
import { cn } from "@/utils/cn";

export type Choice = { value: string; label: string; hint?: string; icon: LucideIcon };

/* Single choice as icon cards (a radio group) - friendlier than a select for key questions */
export default function ChoiceCards({
  name,
  options,
  value,
  onChange,
  label,
}: {
  name: string;
  options: Choice[];
  value: string;
  onChange: (v: string) => void;
  label: string;
}) {
  return (
    <div role="radiogroup" aria-label={label} className={cn("grid gap-3", options.length === 2 ? "grid-cols-2" : "grid-cols-1 sm:grid-cols-3")}>
      {options.map(({ value: v, label: l, hint, icon: OptionIcon }) => {
        const on = value === v;
        return (
          <label
            key={v}
            className={cn(
              "relative flex cursor-pointer items-center gap-3 rounded-[var(--radius-card)] border-[1.5px] p-4 transition-all has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-aquifer sm:flex-col sm:items-start",
              on ? "border-aquifer bg-aquifer-soft/60 shadow-[0_12px_24px_-18px_rgba(15,110,140,.8)]" : "border-line bg-paper hover:-translate-y-0.5 hover:border-stone-2"
            )}
          >
            <input type="radio" name={name} value={v} checked={on} onChange={() => onChange(v)} className="sr-only" />
            <span className={cn("grid size-10 shrink-0 place-items-center rounded-full transition-colors", on ? "bg-aquifer text-white" : "bg-mist text-basalt")} aria-hidden="true">
              <OptionIcon size={19} />
            </span>
            <span className="flex min-w-0 flex-col gap-0.5 pr-6 sm:pr-0">
              <span className="text-[15px] font-semibold leading-snug">{l}</span>
              {hint && <span className="text-[13px] text-stone">{hint}</span>}
            </span>
            <span
              className={cn(
                "absolute right-3 top-3 grid size-5 place-items-center rounded-full border-[1.5px] transition-colors",
                on ? "border-aquifer bg-aquifer text-white" : "border-line bg-paper"
              )}
              aria-hidden="true"
            >
              {on && <Check size={12} strokeWidth={3.5} />}
            </span>
          </label>
        );
      })}
    </div>
  );
}
