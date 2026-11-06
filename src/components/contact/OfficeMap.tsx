import { ExternalLink } from "lucide-react";
import type { SiteContact } from "@/types/settings";
import { MapArt, MapPin } from "@/components/common/MapArt";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

/* Office card over the map. The map is the Google Maps embed from admin > Settings
 * ("Google Maps Link"); without a usable link the map art from the approved design is shown.
 * Values come only from admin > Settings: an empty one is left out (a day without hours too). */
export default function OfficeMap({ contact }: { contact: SiteContact }) {
  const hours = contact.hours.filter((h) => h.time);
  return (
    <section className="py-12">
      <Container>
        <div className="relative overflow-hidden rounded-[var(--radius-panel)] border border-line">
          {contact.mapEmbedUrl ? (
            <iframe
              src={contact.mapEmbedUrl}
              title={`Map: ${contact.name}`}
              className="block h-[300px] w-full border-0 sm:h-[440px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          ) : (
            <>
              <MapArt className="h-[300px] w-full sm:h-[440px]" />
              <MapPin className="absolute left-[64%] top-[38%] -translate-x-1/2 -translate-y-full" />
            </>
          )}
          <div className="relative m-4 flex flex-col gap-3 rounded-[var(--radius-card)] bg-paper p-6 shadow-[0_20px_40px_-20px_rgba(23,35,32,.45)] sm:absolute sm:left-6 sm:top-6 sm:m-0 sm:max-w-[330px]">
            {contact.companyName && <h2 className="text-[22px] font-bold">{contact.companyName}</h2>}
            {contact.address && <p className="text-[15px] text-stone">{contact.address}</p>}
            {/* Only the days that have hours in admin > Settings */}
            {hours.length > 0 && (
              <dl className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-1 text-[15px]">
                {hours.map((h) => (
                  <div key={h.day} className="contents">
                    <dt className="text-stone">{h.day}</dt>
                    <dd className="font-medium">{h.time}</dd>
                  </div>
                ))}
              </dl>
            )}
            {contact.mapUrl && (
              <Button href={contact.mapUrl} variant="dark" className="mt-2 h-11 self-start">
                Open in Google Maps <ExternalLink size={15} aria-hidden="true" />
              </Button>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
