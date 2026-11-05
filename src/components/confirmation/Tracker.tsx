import { Check } from "lucide-react";
import { cn } from "@/utils/cn";

/* Horizontal progress tracker (2 columns on phones, 4 in a row from sm) */
export default function Tracker({ steps, doneCount = 1 }: { steps: { title: string; text: string }[]; doneCount?: number }) {
  return (
    <ol className="grid grid-cols-2 gap-y-6 sm:grid-cols-4">
      {steps.map((s, i) => (
        <li key={s.title} className="relative flex flex-col items-center gap-1.5 text-center">
          {i < steps.length - 1 && <span className="absolute left-1/2 top-[15px] hidden h-[2px] w-full bg-line sm:block" aria-hidden="true" />}
          <span
            className={cn(
              "relative grid size-8 place-items-center rounded-full text-[14px] font-bold",
              i < doneCount ? "bg-aquifer text-white" : "border-2 border-line bg-paper text-stone"
            )}
          >
            {i < doneCount ? <Check size={16} strokeWidth={3} aria-hidden="true" /> : i + 1}
          </span>
          <b className="mt-1 text-[15px]">{s.title}</b>
          <span className="text-[13px] text-stone">{s.text}</span>
        </li>
      ))}
    </ol>
  );
}
