import type { Service } from "@/types/service";
import ServiceTile from "./ServiceTile";

/* Service options (checkboxes) in two columns. The caller passes only the services to offer. */
export default function ServicePicker({
  services,
  chosen,
  onChange,
}: {
  services: Service[] | null;
  chosen: number[];
  onChange: (ids: number[]) => void;
}) {
  if (!services) return <p className="text-[15px] text-stone">Loading services…</p>;

  const toggle = (id: number) => onChange(chosen.includes(id) ? chosen.filter((x) => x !== id) : [...chosen, id]);

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {services.map((s) => (
        <ServiceTile key={s.id} name={s.name} short={s.short} checked={chosen.includes(s.id)} onToggle={() => toggle(s.id)} />
      ))}
    </div>
  );
}
