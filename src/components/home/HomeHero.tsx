import { ArrowDown, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

/* Full-width photo hero with the page's H1 */
export default function HomeHero() {
  return (
    <section className="relative isolate overflow-hidden bg-deep text-white">
      <img
        src="/images/hero-rig.jpg"
        alt=""
        fetchPriority="high"
        className="absolute inset-0 -z-10 h-full w-full -scale-x-100 object-cover object-[70%_62%] sm:object-[center_68%]"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#05202a] via-[#05202a]/75 to-[#05202a]/5" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-[#05202a]/80 to-transparent" />
      <Container className="pb-36 pt-36 sm:pb-44 sm:pt-44">
        <div className="max-w-[700px]">
          <p className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[14px] font-medium">
            <span className="size-2 rounded-full bg-spring" aria-hidden="true" />
            Serving all 14 districts of Kerala
          </p>
          <h1 className="mt-6 text-[40px] font-extrabold sm:text-[60px] lg:text-[68px]">The right borewell team for your land, inspected first.</h1>
          <p className="mt-6 max-w-[50ch] text-[17px] leading-relaxed text-white/80 sm:text-[19px]">
            Our team inspects your site, collects quotes from verified borewell companies near you, and you choose who does the work.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href="/enquiry">
              Send enquiry <ArrowRight size={17} aria-hidden="true" />
            </Button>
            <Button href="#how" variant="ghost-light">
              How it works <ArrowDown size={17} aria-hidden="true" />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
