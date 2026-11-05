import { cn } from "@/utils/cn";

/* Number input with an attached unit switch, e.g. 10 [Cents | Acres] */
export default function UnitInput({
  id,
  value,
  onChange,
  unit,
  onUnit,
  units,
  placeholder,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  unit: string;
  onUnit: (u: string) => void;
  units: { value: string; label: string }[];
  placeholder?: string;
}) {
  return (
    <div className="flex h-[52px] items-center gap-2 rounded-[var(--radius-field)] border-[1.5px] border-line bg-paper pl-4 pr-1.5 transition-[border-color,box-shadow] focus-within:border-aquifer focus-within:shadow-[0_0_0_3px_var(--color-aquifer-soft)] hover:border-stone-2">
      <input
        id={id}
        inputMode="decimal"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/[^\d.]/g, ""))}
        className="h-full min-w-0 flex-1 bg-transparent text-[15px] text-basalt placeholder:text-stone-2"
        // the wrapper shows focus; inline style beats the global :focus-visible ring
        style={{ outline: "none" }}
      />
      <div role="radiogroup" aria-label="Unit" className="flex shrink-0 rounded-[9px] bg-mist p-1">
        {units.map((u) => (
          <label
            key={u.value}
            className={cn(
              "cursor-pointer rounded-[7px] px-3 py-1.5 text-[14px] font-semibold transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-aquifer",
              unit === u.value ? "bg-deep text-white shadow-sm" : "text-stone hover:text-basalt"
            )}
          >
            <input type="radio" name={`${id}-unit`} value={u.value} checked={unit === u.value} onChange={() => onUnit(u.value)} className="sr-only" />
            {u.label}
          </label>
        ))}
      </div>
    </div>
  );
}
