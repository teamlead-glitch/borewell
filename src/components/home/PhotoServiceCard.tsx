import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/types/service";
import { enquiryHref } from "@/utils/services";
import { cn } from "@/utils/cn";

/* Photo card that starts an enquiry for one service. `featured` = the big bento card. */
export default function PhotoServiceCard({ service, featured }: { service: Service; featured?: boolean }) {
  return (
    <Link
      href={enquiryHref(service.id)}
      className={cn(
        "group relative flex h-full flex-col justify-end overflow-hidden text-white",
        featured
          ? "min-h-[380px] rounded-[28px] p-7 shadow-[0_30px_50px_-30px_rgba(11,74,89,.6)]"
          : "min-h-[220px] rounded-[24px] p-6 shadow-[0_10px_30px_-20px_rgba(11,74,89,.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_44px_-22px_rgba(11,74,89,.5)]"
      )}
    >
      <img
        src={service.image}
        alt=""
        loading="lazy"
        className={cn(
          "absolute inset-0 h-full w-full object-cover transition-transform duration-700",
          featured ? "group-hover:scale-105" : "group-hover:scale-110"
        )}
      />
      <span className={cn("absolute inset-0 bg-gradient-to-t from-deep", featured ? "via-deep/60 to-deep/10" : "via-deep/55 to-transparent")} />
      <span
        className={cn(
          "absolute grid place-items-center rounded-full bg-white text-basalt transition-transform duration-300 group-hover:rotate-45",
          featured ? "right-6 top-6 size-12" : "right-5 top-5 size-10"
        )}
      >
        <ArrowUpRight size={featured ? 20 : 18} aria-hidden="true" />
      </span>
      <span className="relative">
        {featured ? (
          <>
            <span className="block text-[30px] font-extrabold leading-tight tracking-tight sm:text-[36px]">{service.name}</span>
            <span className="mt-3 block max-w-[42ch] text-[16px] text-white/80">Work by verified providers only.</span>
          </>
        ) : (
          <>
            <span className="block text-[19px] font-bold">{service.name}</span>
            {service.short && <span className="mt-1 block text-[14.5px] text-white/80">{service.short}</span>}
          </>
        )}
      </span>
    </Link>
  );
}
