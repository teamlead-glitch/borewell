import type { District } from "@/types/location";
import Field from "@/components/forms/Field";
import FormCard from "@/components/forms/FormCard";
import LocationFields from "@/components/forms/LocationFields";
import MapPicker from "@/components/forms/MapPicker";
import type { EnquiryFormState, SetEnquiryField } from "../enquiry-form-state";

export default function SiteStep({ form, set, districts }: { form: EnquiryFormState; set: SetEnquiryField; districts: District[] | null }) {
  return (
    <FormCard step="Step 3 of 4" title="Where is the site?" active>
      <LocationFields idPrefix="e" districts={districts} value={form.place} onChange={(p) => set("place", p)} />
      <Field label="Address" required htmlFor="e-address">
        <textarea
          id="e-address"
          required
          rows={2}
          maxLength={1000}
          className="field-input"
          placeholder="House name / number, street, landmark, PIN"
          value={form.address}
          onChange={(e) => set("address", e.target.value)}
        />
      </Field>
      <Field label="Pin the borewell spot" required>
        <MapPicker value={form.pin} onChange={(p) => set("pin", p)} hint="Tap the exact spot. We measure road distance to providers from this pin." />
      </Field>
    </FormCard>
  );
}
