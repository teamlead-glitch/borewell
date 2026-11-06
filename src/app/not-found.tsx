import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { NOT_FOUND } from "@/constants/content";

/* Unknown URL: an unmistakable 404 over the shared banner photo, then the pages most
   visitors were looking for, so the page has a way forward */
export default function NotFound() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-deep text-white">
        <img src="/images/page-banner.jpg" alt="" className="absolute inset-0 -z-10 h-full w-full object-cover object-[center_40%]" />
        <div className="absolute inset-0 -z-10 bg-deep/80" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-deep to-transparent" />
        <Container className="flex flex-col items-center pb-16 pt-28 text-center sm:pb-24 sm:pt-36">
          <p
            aria-hidden="true"
            className="select-none bg-gradient-to-b from-white to-spring/40 bg-clip-text text-[120px] font-extrabold leading-none tracking-[-0.04em] text-transparent sm:text-[200px]"
          >
            {NOT_FOUND.code}
          </p>
          <p className="mt-2 text-[13px] font-semibold uppercase tracking-[0.16em] text-spring">{NOT_FOUND.eyebrow}</p>
          <h1 className="mt-3 text-[34px] font-extrabold sm:text-[48px]">{NOT_FOUND.title}</h1>
          <p className="mt-3 max-w-[46ch] text-[17px] text-white/80 sm:text-[18px]">{NOT_FOUND.lead}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/" variant="light">
              Go to the home page
            </Button>
            <Button href="/enquiry" variant="ghost-light">
              Send enquiry
            </Button>
          </div>
        </Container>
      </section>

      <section className="py-14 sm:py-20" aria-labelledby="nf-links">
        <Container>
          <h2 id="nf-links" className="text-center text-[22px] font-extrabold sm:text-[26px]">
            {NOT_FOUND.linksTitle}
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {NOT_FOUND.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group flex h-full items-start justify-between gap-4 rounded-[var(--radius-card)] border border-line bg-paper px-5 py-4.5 transition-colors hover:border-aquifer"
                >
                  <span className="flex flex-col gap-1">
                    <span className="text-[16px] font-bold leading-snug">{link.title}</span>
                    <span className="text-[14px] leading-snug text-stone">{link.text}</span>
                  </span>
                  <ArrowRight
                    size={18}
                    className="mt-0.5 shrink-0 text-stone-2 transition-[color,transform] group-hover:translate-x-0.5 group-hover:text-aquifer"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
