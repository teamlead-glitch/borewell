import { Check } from "lucide-react";
import { cn } from "@/utils/cn";

/* Progress tracker: a vertical timeline on phones, 4 in a row from sm */
export default function Tracker({ steps, doneCount = 1 }: { steps: { title: string; text: string }[]; doneCount?: number }) {
  return (
    <ol className="mx-auto flex max-w-[320px] flex-col sm:grid sm:max-w-none sm:grid-cols-4">
      {steps.map((s, i) => {
        const last = i === steps.length - 1;
        return (
          <li key={s.title} className={cn("relative flex items-start gap-4 text-left sm:flex-col sm:items-center sm:gap-1.5 sm:text-center", !last && "pb-6 sm:pb-0")}>
            {!last && (
              <>
                {/* Phone: line down to the next circle */}
                <span className="absolute bottom-0 left-[15px] top-8 w-[2px] bg-line sm:hidden" aria-hidden="true" />
                {/* sm+: line across to the next circle */}
                <span className="absolute left-1/2 top-[15px] hidden h-[2px] w-full bg-line sm:block" aria-hidden="true" />
              </>
            )}
            <span
              className={cn(
                "relative grid size-8 shrink-0 place-items-center rounded-full text-[14px] font-bold",
                i < doneCount ? "bg-aquifer text-white" : "border-2 border-line bg-paper text-stone"
              )}
            >
              {i < doneCount ? <Check size={16} strokeWidth={3} aria-hidden="true" /> : i + 1}
            </span>
            <span className="flex flex-col gap-0.5 pt-1 sm:mt-1 sm:gap-1.5 sm:pt-0">
              <b className="text-[15px] leading-snug">{s.title}</b>
              <span className="text-[13px] text-stone">{s.text}</span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}
