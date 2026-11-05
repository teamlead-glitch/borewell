import { ExternalLink } from "lucide-react";
import type { SiteContact } from "@/types/settings";
import { MapArt, MapPin } from "@/components/common/MapArt";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

/* Office card over the map art. The real Google Map embed replaces MapArt in phase 2. */
export default function OfficeMap({ contact }: { contact: SiteContact }) {
  return (
    <section className="py-12">
      <Container>
        <div className="relative overflow-hidden rounded-[var(--radius-panel)] border border-line">
          <MapArt className="h-[300px] w-full sm:h-[440px]" />
          <MapPin className="absolute left-[64%] top-[38%] -translate-x-1/2 -translate-y-full" />
          <div className="relative m-4 flex flex-col gap-3 rounded-[var(--radius-card)] bg-paper p-6 shadow-[0_20px_40px_-20px_rgba(23,35,32,.45)] sm:absolute sm:left-6 sm:top-6 sm:m-0 sm:max-w-[330px]">
            <h2 className="text-[22px] font-bold">{contact.name} office</h2>
            <p className="text-[15px] text-stone">{contact.address}</p>
            <dl className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-1 text-[15px]">
              {contact.hours.map((h) => (
                <div key={h.day} className="contents">
                  <dt className="text-stone">{h.day}</dt>
                  <dd className="font-medium">{h.time}</dd>
                </div>
              ))}
            </dl>
            <Button href={contact.mapUrl} variant="dark" className="mt-2 h-11 self-start">
              Open in Google Maps <ExternalLink size={15} aria-hidden="true" />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
