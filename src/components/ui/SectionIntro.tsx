import { cn } from "@/utils/cn";

/** Eyebrow + H2 (+ optional lead) used at the top of every content section */
export default function SectionIntro({
  eyebrow,
  title,
  lead,
  center,
  className,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  center?: boolean;
  className?: string;
}) {
  return (
    <div className={cn(center && "mx-auto max-w-[640px] text-center", className)}>
      <p className="text-[15px] font-semibold text-aquifer">{eyebrow}</p>
      <h2 className="mt-2 text-[32px] font-extrabold sm:text-[44px]">{title}</h2>
      {lead && <p className="mt-3 text-[17px] text-stone">{lead}</p>}
    </div>
  );
}
