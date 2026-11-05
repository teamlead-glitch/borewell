import type { Service } from "@/types/service";
import Field from "@/components/forms/Field";
import FormCard from "@/components/forms/FormCard";
import ServicePicker from "@/components/forms/ServicePicker";
import type { EnquiryFormState, SetEnquiryField } from "../enquiry-form-state";

export default function NeedsStep({ form, set, services }: { form: EnquiryFormState; set: SetEnquiryField; services: Service[] | null }) {
  return (
    <FormCard step="Step 2 of 4" title="What do you need?" active>
      <p className="-mt-2 text-[15px] text-stone">Choose one or more.</p>
      <ServicePicker services={services} chosen={form.services} onChange={(ids) => set("services", ids)} />
      <Field label="Tell us more" htmlFor="e-details">
        <textarea
          id="e-details"
          rows={3}
          maxLength={2000}
          className="field-input"
          placeholder="E.g. new borewell for home use, approx. depth if known"
          value={form.details}
          onChange={(e) => set("details", e.target.value)}
        />
      </Field>
    </FormCard>
  );
}
