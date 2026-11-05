import { cn } from "@/utils/cn";

/* Label (+ required star or "(optional)"), the control, and a hint line */
export default function Field({
  label,
  required,
  hint,
  htmlFor,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  htmlFor?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex min-w-0 flex-col gap-2", className)}>
      <label htmlFor={htmlFor} className="text-[15px] font-semibold">
        {label}
        {required ? <span className="text-laterite"> *</span> : <span className="font-normal text-stone"> (optional)</span>}
      </label>
      {children}
      {hint && <p className="text-[13px] text-stone">{hint}</p>}
    </div>
  );
}
