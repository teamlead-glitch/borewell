import { STEPS } from "@/constants/content";
import { cn } from "@/utils/cn";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionIntro from "@/components/ui/SectionIntro";

/* Four numbered steps joined by a dashed line on desktop. `#how` is the hero's anchor. */
export default function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-20 bg-paper py-20 sm:py-28">
      <Container>
        <SectionIntro center eyebrow="How it works" title="From enquiry to drilling in four steps" />
        <ol className="relative mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <span className="absolute left-[12%] right-[12%] top-8 hidden border-t-2 border-dashed border-line lg:block" aria-hidden="true" />
          {STEPS.map((step, i) => (
            <Reveal as="li" key={step.title} step={i} className="relative">
              <div className="flex h-full flex-col items-center rounded-[24px] px-4 text-center">
                <span
                  className={cn(
                    "relative grid size-16 place-items-center rounded-full text-[20px] font-extrabold ring-8 ring-paper",
                    i === 0
                      ? "bg-gradient-to-br from-aquifer to-spring text-white shadow-[0_14px_28px_-12px_rgba(15,110,140,.8)]"
                      : "border-2 border-line bg-paper text-basalt"
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="mt-5 rounded-full bg-aquifer-soft px-3 py-1 text-[13px] font-semibold text-aquifer-dark">{step.who}</span>
                <h3 className="mt-3 text-[21px] font-bold">{step.title}</h3>
                <p className="mt-2 max-w-[28ch] text-[15.5px] text-stone">{step.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
