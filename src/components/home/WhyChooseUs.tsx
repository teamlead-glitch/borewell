import { ArrowRight, Check, Lock } from "lucide-react";
import { WHY_US } from "@/constants/content";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SectionIntro from "@/components/ui/SectionIntro";

export default function WhyChooseUs() {
  return (
    <section className="py-20 sm:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <div className="relative">
          <img
            src="/images/site-aerial.jpg"
            alt="Aerial view of a plot with coconut palms, the kind of land our team inspects"
            loading="lazy"
            className="h-[340px] w-full rounded-[32px] object-cover shadow-[0_40px_60px_-40px_rgba(11,74,89,.7)] sm:h-[500px]"
          />
          <div className="absolute -bottom-7 left-4 right-4 flex max-w-sm items-start gap-3 rounded-[22px] border border-line-soft bg-white/90 p-4 shadow-[0_24px_48px_-20px_rgba(11,74,89,.45)] backdrop-blur-md sm:-right-6 sm:left-auto">
            <span className="grid size-11 shrink-0 place-items-center rounded-[14px] bg-aquifer-soft text-aquifer">
              <Lock size={19} aria-hidden="true" />
            </span>
            <p className="text-[15px]">
              <b className="block">Your number stays private</b>
              <span className="text-stone">Shared only with the provider you&apos;re matched with.</span>
            </p>
          </div>
        </div>

        <div className="pt-4 lg:pt-0">
          <SectionIntro eyebrow="Why choose us" title="We do the legwork before anyone drills" />
          <ul className="mt-8 flex flex-col gap-3">
            {WHY_US.map((w) => (
              <li key={w.title} className="flex gap-4 rounded-[20px] border border-line-soft bg-paper p-4 shadow-[0_10px_30px_-22px_rgba(11,74,89,.4)]">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-aquifer to-spring text-white">
                  <Check size={17} strokeWidth={3} aria-hidden="true" />
                </span>
                <span>
                  <b className="block text-[17px]">{w.title}</b>
                  <span className="text-[15px] text-stone">{w.text}</span>
                </span>
              </li>
            ))}
          </ul>
          <Button href="/enquiry" variant="dark" className="mt-8">
            Send enquiry <ArrowRight size={17} aria-hidden="true" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
