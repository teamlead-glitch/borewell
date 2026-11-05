import { cn } from "@/utils/cn";

/* One wizard step: a fieldset with "Step x of y", the step title and an optional side note */
export default function FormCard({
  step,
  title,
  active,
  aside,
  children,
}: {
  step: string;
  title: string;
  active?: boolean;
  aside?: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset
      className={cn(
        "flex min-w-0 flex-col gap-5 rounded-[var(--radius-panel)] border bg-paper p-6 transition-shadow sm:p-8",
        active ? "border-basalt shadow-[0_24px_48px_-32px_rgba(23,35,32,.55)]" : "border-line"
      )}
    >
      <legend className="sr-only">{title}</legend>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[14px] text-stone">{step}</p>
          <h2 className="mt-1 text-[24px] font-bold">{title}</h2>
        </div>
        {aside && <span className="whitespace-nowrap rounded-full border border-line px-3 py-1 text-[13px] font-medium text-stone">{aside}</span>}
      </div>
      {children}
    </fieldset>
  );
}
