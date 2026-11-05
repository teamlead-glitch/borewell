import { Check } from "lucide-react";
import { cn } from "@/utils/cn";

/* Vertical numbered timeline with a dashed connector; `tone="dark"` for teal panels */
export default function VTimeline({
  steps,
  doneCount = 1,
  tone = "light",
}: {
  steps: { title: string; text: string }[];
  doneCount?: number;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <ol>
      {steps.map((s, i) => (
        <li key={s.title} className="relative grid grid-cols-[32px_1fr] gap-4 pb-6 last:pb-0">
          {i < steps.length - 1 && (
            <span className={cn("absolute bottom-1 left-[15px] top-9 border-l-2 border-dashed", dark ? "border-white/25" : "border-line")} aria-hidden="true" />
          )}
          <span
            className={cn(
              "grid size-8 place-items-center rounded-full text-[14px] font-bold",
              i < doneCount ? "bg-aquifer text-white" : dark ? "border-2 border-white/30 text-white" : "border-2 border-line bg-paper text-stone"
            )}
          >
            {i < doneCount ? <Check size={16} strokeWidth={3} aria-hidden="true" /> : i + 1}
          </span>
          <div className="pt-1">
            <b className="block text-[16px]">{s.title}</b>
            <span className={cn("text-[15px]", dark ? "text-white/60" : "text-stone")}>{s.text}</span>
          </div>
        </li>
      ))}
    </ol>
  );
}
