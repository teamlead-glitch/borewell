import Field from "@/components/forms/Field";
import FormCard from "@/components/forms/FormCard";
import PhoneInput from "@/components/forms/PhoneInput";
import type { EnquiryFormState, SetEnquiryField } from "../enquiry-form-state";

export default function DetailsStep({ form, set }: { form: EnquiryFormState; set: SetEnquiryField }) {
  return (
    <FormCard step="Step 1 of 4" title="Your details" active>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" required htmlFor="e-name">
          <input
            id="e-name"
            required
            maxLength={255}
            className="field-input"
            placeholder="Your name"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            autoComplete="name"
          />
        </Field>
        <Field label="Phone number" required htmlFor="e-phone" hint="Our team will call you on this number, even if you don't finish this form.">
          <PhoneInput id="e-phone" required value={form.phone} onChange={(v) => set("phone", v)} autoComplete="tel-national" />
        </Field>
        <Field label="Email" htmlFor="e-email" hint="We'll send your enquiry reference here.">
          <input
            id="e-email"
            type="email"
            maxLength={255}
            className="field-input"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            autoComplete="email"
          />
        </Field>
      </div>
    </FormCard>
  );
}
