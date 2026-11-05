import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { Service } from "@/types/service";
import { enquiryHref } from "@/utils/services";
import Container from "@/components/ui/Container";
import PillLink from "@/components/ui/PillLink";
import SectionIntro from "@/components/ui/SectionIntro";

/* Compact two-column list of every service (About page) */
export default function ServicesChecklist({ services }: { services: Service[] }) {
  if (!services.length) return null;
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionIntro eyebrow="What we arrange" title="Our services" />
          <PillLink href="/services">View all services</PillLink>
        </div>
        <ul className="mt-10 grid gap-3 md:grid-cols-2">
          {services.map((s) => (
            <li key={s.id}>
              <Link
                href={enquiryHref(s.id)}
                className="group flex items-center gap-4 rounded-[20px] border border-line-soft bg-paper px-5 py-5 transition-all hover:border-aquifer/40 hover:shadow-[0_16px_32px_-22px_rgba(11,74,89,.5)]"
              >
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-aquifer to-spring text-white shadow-[0_6px_14px_-6px_rgba(15,110,140,.8)] transition-transform group-hover:scale-110">
                  <Check size={15} strokeWidth={3} aria-hidden="true" />
                </span>
                <span className="text-[17px] font-bold">{s.name}</span>
                <ArrowRight size={18} className="ml-auto text-stone-2 transition-all group-hover:translate-x-1 group-hover:text-aquifer" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
