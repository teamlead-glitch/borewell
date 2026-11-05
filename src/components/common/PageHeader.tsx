import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Container from "@/components/ui/Container";

/* Inner-page banner: breadcrumb, the page's one H1 and a lead, over the shared teal-tinted photo */
export default function PageHeader({
  crumb,
  title,
  lead,
  children,
}: {
  crumb: string;
  title: string;
  lead?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-deep text-white">
      <img
        src="/images/page-banner.jpg"
        alt=""
        fetchPriority="high"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-[center_40%]"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-deep via-deep/80 to-deep/30" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-deep/60 to-transparent" />
      <Container className="relative pb-12 pt-28 sm:pb-20 sm:pt-36">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[14px] text-white/65">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <ChevronRight size={14} aria-hidden="true" />
          <span aria-current="page" className="text-white">
            {crumb}
          </span>
        </nav>
        <h1 className="mt-4 max-w-[18ch] text-[38px] font-extrabold sm:text-[54px]">{title}</h1>
        {lead && <p className="mt-4 max-w-[46ch] text-[17px] text-white/80 sm:text-[18px]">{lead}</p>}
        {children}
      </Container>
    </section>
  );
}
