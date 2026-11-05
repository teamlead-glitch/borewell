import { Check, Clock } from "lucide-react";
import { cn } from "@/utils/cn";

/* Thank-you card: big status icon, H1, lead and a badge, then the page's details */
export default function ConfirmCard({
  kind,
  title,
  lead,
  badge,
  children,
}: {
  kind: "done" | "pending";
  title: string;
  lead: React.ReactNode;
  badge?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-[760px] overflow-hidden rounded-[28px] border border-line bg-paper shadow-[0_40px_80px_-48px_rgba(23,35,32,.5)]">
      <div className="flex flex-col items-center gap-4 border-b border-line-soft bg-mist px-6 py-12 text-center">
        <span
          className={cn(
            "grid size-20 place-items-center rounded-full ring-[10px]",
            kind === "done" ? "bg-aquifer text-white ring-aquifer-soft" : "border-2 border-basalt bg-paper ring-line-soft"
          )}
        >
          {kind === "done" ? <Check size={38} strokeWidth={2.6} aria-hidden="true" /> : <Clock size={34} aria-hidden="true" />}
        </span>
        <h1 className="mt-2 text-[38px] font-extrabold">{title}</h1>
        <p className="max-w-[46ch] text-[17px] text-stone">{lead}</p>
        {badge}
      </div>
      <div className="flex flex-col gap-7 p-6 sm:p-10">{children}</div>
    </div>
  );
}
