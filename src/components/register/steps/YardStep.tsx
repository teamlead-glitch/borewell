import type { District } from "@/types/location";
import Field from "@/components/forms/Field";
import FormCard from "@/components/forms/FormCard";
import LocationFields from "@/components/forms/LocationFields";
import MapPicker from "@/components/forms/MapPicker";
import type { RegisterFormState, SetRegisterField } from "../register-form-state";

export default function YardStep({ form, set, districts }: { form: RegisterFormState; set: SetRegisterField; districts: District[] | null }) {
  return (
    <FormCard step="Step 3 of 3" title="Your registered location" aside="One per company" active>
      <LocationFields idPrefix="r" districts={districts} value={form.place} onChange={(p) => set("place", p)} withWard={false} />
      <Field label="Office / yard address" required htmlFor="r-address">
        <textarea id="r-address" required rows={2} maxLength={1000} className="field-input" value={form.address} onChange={(e) => set("address", e.target.value)} />
      </Field>
      <Field label="Pin your yard" required>
        <MapPicker value={form.pin} onChange={(p) => set("pin", p)} hint="Customers' road distance is measured from this pin." />
      </Field>
    </FormCard>
  );
}
