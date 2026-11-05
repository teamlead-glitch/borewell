import { STATS } from "@/constants/site";
import Container from "@/components/ui/Container";

/* Trust numbers: a card that overlaps the bottom of the hero */
export default function TrustStats() {
  return (
    <Container className="relative z-10 -mt-20">
      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[28px] bg-line-soft shadow-[0_30px_60px_-30px_rgba(11,74,89,.45)] md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col-reverse bg-paper px-6 py-6 sm:px-8 sm:py-7">
              <dt className="mt-1 text-[14px] text-stone">{s.label}</dt>
              <dd className="text-[28px] font-extrabold tabular-nums tracking-tight text-aquifer sm:text-[34px]">{s.value}</dd>
            </div>
          ))}
        </dl>
    </Container>
  );
}
