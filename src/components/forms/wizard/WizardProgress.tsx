import { cn } from "@/utils/cn";

/* Progress bar - earlier steps can be revisited, later ones only via Next */
export default function WizardProgress({ steps, step, onGo, label }: { steps: string[]; step: number; onGo: (i: number) => void; label: string }) {
  return (
    <ol className="grid gap-2" style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }} aria-label={label}>
      {steps.map((title, i) => (
        <li key={title}>
          <button
            type="button"
            disabled={i >= step}
            onClick={() => onGo(i)}
            aria-current={i === step ? "step" : undefined}
            className="flex w-full flex-col gap-2 text-left disabled:cursor-default"
          >
            <span className={cn("h-1.5 rounded-full transition-colors", i < step ? "bg-deep" : i === step ? "bg-aquifer" : "bg-line")} />
            <span className={cn("text-[13px] font-semibold", i === step ? "text-basalt" : "text-stone", i < step && "hover:text-basalt")}>
              <span className="sm:hidden">Step {i + 1}</span>
              <span className="hidden sm:inline">
                {i + 1}. {title}
              </span>
            </span>
          </button>
        </li>
      ))}
    </ol>
  );
}
