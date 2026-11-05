import { cn } from "@/utils/cn";

/*
  Rises into view as it scrolls in (CSS scroll-driven animation in globals.css; visible by
  default where unsupported or with reduced motion). `step` staggers items of a sequence.
  Reserved for the "How it works" steps - the site's one orchestrated motion.
*/
export default function Reveal({
  children,
  className,
  step = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  step?: number;
  as?: "div" | "li";
}) {
  return (
    <Tag className={cn("reveal", className)} style={{ "--step": step } as React.CSSProperties}>
      {children}
    </Tag>
  );
}
