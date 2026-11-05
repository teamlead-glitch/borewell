import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

type Cta = { label: string; href: string };

/* Teal call-to-action panel with ripple rings, used at the foot of most pages */
export default function CtaBand({
  title,
  text,
  primary,
  secondary,
  points,
}: {
  title: string;
  text: string;
  primary: Cta;
  secondary?: Cta;
  points?: string[];
}) {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-[var(--radius-panel)] bg-hero px-6 py-10 text-white sm:px-12 sm:py-14">
          <svg className="pointer-events-none absolute -bottom-24 -right-10 h-[320px] w-[320px] text-spring/15" viewBox="0 0 100 100" aria-hidden="true">
            {[10, 22, 34, 46].map((r) => (
              <circle key={r} cx="50" cy="50" r={r} fill="none" stroke="currentColor" strokeWidth="1.2" />
            ))}
          </svg>
          <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <h2 className="text-[32px] font-bold sm:text-[40px]">{title}</h2>
              <p className="mt-3 max-w-[48ch] text-[17px] text-white/70">{text}</p>
              {points && (
                <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[15px] text-white/85">
                  {points.map((p) => (
                    <li key={p} className="flex items-center gap-2">
                      <span className="size-2 rounded-full bg-spring" aria-hidden="true" />
                      {p}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Button href={primary.href} variant="light">
                {primary.label}
              </Button>
              {secondary && (
                <Button href={secondary.href} variant="ghost-light">
                  {secondary.label}
                </Button>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
