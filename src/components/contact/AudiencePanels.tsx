import { Drill, Truck } from "lucide-react";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

/* Two routes in: customers to the enquiry, providers to registration */
export default function AudiencePanels() {
  return (
    <section className="pb-20 sm:pb-24">
      <Container className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col items-start gap-3 rounded-[var(--radius-card)] bg-deep p-8 text-white">
          <Drill className="text-spring" aria-hidden="true" />
          <h2 className="text-[26px] font-bold">Need a borewell service?</h2>
          <p className="text-[16px] text-white/70">Send an enquiry with your location. We&apos;ll call you to arrange an inspection.</p>
          <Button href="/enquiry" variant="light" className="mt-3">
            Send enquiry
          </Button>
        </div>
        <div className="flex flex-col items-start gap-3 rounded-[var(--radius-card)] border border-line bg-paper p-8">
          <Truck className="text-aquifer" aria-hidden="true" />
          <h2 className="text-[26px] font-bold">Are you a service provider?</h2>
          <p className="text-[16px] text-stone">Register your company and we&apos;ll call you about jobs near your yard.</p>
          <Button href="/register" variant="outline" className="mt-3">
            Register your company
          </Button>
        </div>
      </Container>
    </section>
  );
}
