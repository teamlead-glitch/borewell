import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/types/service";
import { enquiryHref } from "@/utils/services";

/* Services page card: photo, name, description and an "Enquire" footer */
export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={enquiryHref(service.id)}
      className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-line-soft bg-paper shadow-[0_10px_30px_-20px_rgba(11,74,89,.35)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_50px_-28px_rgba(11,74,89,.5)]"
    >
      <span className="relative block h-[200px] overflow-hidden">
        <img src={service.image} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <span className="absolute inset-0 bg-gradient-to-t from-deep/40 to-transparent" />
      </span>
      <span className="flex flex-1 flex-col p-6">
        <span className="text-[21px] font-bold">{service.name}</span>
        <span className="mt-2 text-[15.5px] text-stone">{service.description || service.short}</span>
        <span className="mt-auto flex items-center justify-between border-t border-line-soft pt-5 text-[15px] font-bold">
          Enquire
          <span className="grid size-10 place-items-center rounded-full bg-aquifer text-white transition-transform group-hover:translate-x-1">
            <ArrowRight size={17} aria-hidden="true" />
          </span>
        </span>
      </span>
    </Link>
  );
}
