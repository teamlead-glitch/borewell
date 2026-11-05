import Link from "next/link";
import { ArrowRight } from "lucide-react";

/** White pill link with a nudging arrow ("All services", "View all services") */
export default function PillLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-1.5 rounded-full border border-line bg-paper px-5 py-3 text-[15px] font-semibold hover:border-aquifer hover:text-aquifer"
    >
      {children}
      <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
    </Link>
  );
}
