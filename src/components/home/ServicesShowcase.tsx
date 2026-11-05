import type { Service } from "@/types/service";
import { splitFeatured } from "@/utils/services";
import Container from "@/components/ui/Container";
import PillLink from "@/components/ui/PillLink";
import SectionIntro from "@/components/ui/SectionIntro";
import PhotoServiceCard from "./PhotoServiceCard";

// The bento grid has room for the featured card plus four
const REGULAR_ON_HOME = 4;

export default function ServicesShowcase({ services }: { services: Service[] }) {
  if (!services.length) return null;
  const { featured, regular } = splitFeatured(services);

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionIntro eyebrow="Services" title="What we can arrange" lead="Pick a service to start an enquiry." />
          <PillLink href="/services">All services</PillLink>
        </div>

        <div className="mt-10 grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
          <div className="md:col-span-2 lg:row-span-2">
            <PhotoServiceCard service={featured} featured />
          </div>
          {regular.slice(0, REGULAR_ON_HOME).map((s) => (
            <PhotoServiceCard key={s.id} service={s} />
          ))}
        </div>
      </Container>
    </section>
  );
}
