import Link from "next/link";
import { NAV_ITEMS } from "@/constants/site";
import { cn } from "@/utils/cn";
import { isActive } from "./nav";

export default function DesktopNav({ pathname, solid }: { pathname: string; solid: boolean }) {
  return (
    <nav aria-label="Main" className="hidden items-center gap-1 text-[15px] font-medium lg:flex">
      {NAV_ITEMS.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "rounded-full px-3.5 py-2 transition-colors",
              active
                ? solid
                  ? "bg-aquifer-soft text-aquifer-dark"
                  : "bg-white/15 text-white"
                : solid
                  ? "text-stone hover:text-basalt"
                  : "text-white/75 hover:text-white"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
