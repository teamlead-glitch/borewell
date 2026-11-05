import { cn } from "@/utils/cn";

/** Page-width wrapper: 1200px max with the side padding used everywhere */
export default function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[1200px] px-5 sm:px-8", className)}>{children}</div>;
}
