import { Check } from "lucide-react";
import { cn } from "@/utils/cn";

/* Selectable service tile (a checkbox) with the service photo */
export default function ServiceTile({
  name,
  short,
  image,
  checked,
  disabled,
  onToggle,
}: {
  name: string;
  short: string;
  image?: string;
  checked: boolean;
  disabled?: boolean;
  onToggle: () => void;
}) {
  return (
    <label
      className={cn(
        "group relative flex cursor-pointer flex-col overflow-hidden rounded-[var(--radius-card)] border-[1.5px] transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-aquifer",
        disabled && "cursor-not-allowed border-dashed bg-mist text-stone",
        !disabled && (checked ? "border-aquifer bg-aquifer-soft/60" : "border-line bg-paper hover:border-stone-2")
      )}
    >
      <input type="checkbox" className="sr-only" checked={checked} disabled={disabled} onChange={onToggle} />
      {image && (
        <span className="relative block h-[110px] overflow-hidden">
          <img
            src={image}
            alt=""
            loading="lazy"
            className={cn("h-full w-full object-cover transition-transform duration-500", !disabled && "group-hover:scale-105", disabled && "opacity-60 grayscale")}
          />
          {checked && <span className="absolute inset-0 bg-aquifer/25" />}
        </span>
      )}
      <span
        className={cn(
          "absolute right-3 top-3 grid size-6 place-items-center rounded-[7px] border-[1.5px] shadow-sm",
          checked ? "border-aquifer bg-aquifer text-white" : "border-white bg-white/90"
        )}
        aria-hidden="true"
      >
        {checked && <Check size={14} strokeWidth={3} />}
      </span>
      <span className="flex flex-col gap-1.5 p-4">
        <span className="text-[15px] font-semibold leading-snug">{name}</span>
        {short && <span className="text-[13px] text-stone">{short}</span>}
      </span>
    </label>
  );
}
