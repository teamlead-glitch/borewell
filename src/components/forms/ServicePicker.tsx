import type { Service } from "@/types/service";
import ServiceTile from "./ServiceTile";

/* Grid of service tiles (checkboxes). `lockVerifiedOnly`: providers can't pick the
   verified-only service - the admin grants it after verification. */
export default function ServicePicker({
  services,
  chosen,
  onChange,
  lockVerifiedOnly,
}: {
  services: Service[] | null;
  chosen: number[];
  onChange: (ids: number[]) => void;
  lockVerifiedOnly?: boolean;
}) {
  if (!services) return <p className="text-[15px] text-stone">Loading services…</p>;

  const toggle = (id: number) => onChange(chosen.includes(id) ? chosen.filter((x) => x !== id) : [...chosen, id]);

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {services.map((s) => {
        const locked = lockVerifiedOnly && s.verifiedOnly;
        return (
          <ServiceTile
            key={s.id}
            name={s.name}
            image={s.image}
            short={locked ? "Granted by our team after verification" : s.short}
            checked={chosen.includes(s.id)}
            disabled={locked}
            onToggle={() => toggle(s.id)}
          />
        );
      })}
    </div>
  );
}
