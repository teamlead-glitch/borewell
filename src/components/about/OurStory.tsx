import { STORY } from "@/constants/content";
import { SINCE_YEAR, STATS } from "@/constants/site";
import Container from "@/components/ui/Container";
import SectionIntro from "@/components/ui/SectionIntro";

export default function OurStory() {
  return (
    <section className="py-20 sm:py-28">
      <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="relative h-[380px] sm:h-[460px]">
          <img
            src="/images/kerala-palms.jpg"
            alt="Coconut and areca palms around a pond in Kerala"
            loading="lazy"
            className="absolute left-0 top-0 h-[74%] w-[70%] rounded-[28px] object-cover shadow-[0_30px_50px_-30px_rgba(11,74,89,.6)]"
          />
          <img
            src="/images/site-aerial.jpg"
            alt="Aerial view of a plot inspected by our team"
            loading="lazy"
            className="absolute bottom-0 right-0 h-[56%] w-[54%] rounded-[28px] border-[6px] border-mist object-cover shadow-[0_30px_50px_-30px_rgba(11,74,89,.6)]"
          />
          <div className="absolute bottom-6 left-2 rounded-[22px] bg-paper px-6 py-4 shadow-[0_24px_48px_-20px_rgba(11,74,89,.45)] sm:left-6">
            <b className="block text-[32px] font-extrabold tracking-tight text-aquifer">{SINCE_YEAR}</b>
            <span className="text-[14px] text-stone">Serving Kerala since</span>
          </div>
        </div>

        <div>
          <SectionIntro eyebrow="Our story" title="Why we started" />
          <div className="mt-6 space-y-4 text-[17px] leading-relaxed text-stone">
            {STORY.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <dl className="mt-8 grid grid-cols-3 gap-3">
            {STATS.slice(0, 3).map((s) => (
              <div key={s.label} className="flex flex-col-reverse rounded-[20px] border border-line-soft bg-paper p-4 shadow-[0_10px_30px_-22px_rgba(11,74,89,.4)]">
                <dt className="text-[13.5px] text-stone">{s.short}</dt>
                <dd className="text-[26px] font-extrabold tabular-nums tracking-tight text-aquifer">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
