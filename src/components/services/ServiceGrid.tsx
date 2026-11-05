import type { Service } from "@/types/service";
import Container from "@/components/ui/Container";
import NotSureCard from "./NotSureCard";
import ServiceCard from "./ServiceCard";

/* Every service from the admin, then the "not sure" card in the last slot */
export default function ServiceGrid({ services }: { services: Service[] }) {
  return (
    <section className="py-16 sm:py-24">
      <Container className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <ServiceCard key={s.id} service={s} />
        ))}
        <NotSureCard />
      </Container>
    </section>
  );
}
