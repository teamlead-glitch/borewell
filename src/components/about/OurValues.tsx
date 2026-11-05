import { VALUES } from "@/constants/content";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import SectionIntro from "@/components/ui/SectionIntro";

export default function OurValues() {
  return (
    <section className="bg-paper py-20 sm:py-28">
      <Container>
        <SectionIntro center eyebrow="What we stand for" title="How we work for you" />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {VALUES.map((v) => (
            <div key={v.title} className="h-full rounded-[28px] bg-mist p-8 transition-all duration-300 hover:-translate-y-1 hover:bg-aquifer-soft">
                <span className="grid size-14 place-items-center rounded-[18px] bg-gradient-to-br from-aquifer to-spring text-white shadow-[0_12px_24px_-12px_rgba(15,110,140,.8)]">
                  <Icon name={v.icon} size={24} />
                </span>
                <h3 className="mt-6 text-[21px] font-bold">{v.title}</h3>
                <p className="mt-2 text-[16px] text-stone">{v.text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
