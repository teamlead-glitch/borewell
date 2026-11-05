import Field from "@/components/forms/Field";
import FormCard from "@/components/forms/FormCard";
import PhoneInput from "@/components/forms/PhoneInput";
import type { RegisterFormState, SetRegisterField } from "../register-form-state";

const digits = (v: string) => v.replace(/\D/g, "");

export default function CompanyStep({ form, set }: { form: RegisterFormState; set: SetRegisterField }) {
  return (
    <FormCard step="Step 1 of 3" title="Company details" active>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Company name" required htmlFor="r-company">
          <input id="r-company" required maxLength={255} className="field-input" value={form.company} onChange={(e) => set("company", e.target.value)} autoComplete="organization" />
        </Field>
        <Field label="Contact person" required htmlFor="r-person">
          <input id="r-person" required maxLength={255} className="field-input" value={form.person} onChange={(e) => set("person", e.target.value)} autoComplete="name" />
        </Field>
        <Field label="Phone" required htmlFor="r-phone">
          <PhoneInput id="r-phone" required value={form.phone} onChange={(v) => set("phone", v)} autoComplete="tel-national" />
        </Field>
        <Field label="Alternate phone" htmlFor="r-phone2">
          <PhoneInput id="r-phone2" value={form.phone2} onChange={(v) => set("phone2", v)} />
        </Field>
        <Field label="Email" required htmlFor="r-email" hint="Approval and job confirmations are sent here.">
          <input id="r-email" type="email" required maxLength={255} className="field-input" value={form.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" />
        </Field>
        <Field label="GST / registration no." htmlFor="r-gst">
          <input id="r-gst" maxLength={50} className="field-input" value={form.gst} onChange={(e) => set("gst", e.target.value)} />
        </Field>
        <Field label="Years in business" htmlFor="r-years">
          <input id="r-years" inputMode="numeric" maxLength={3} className="field-input" value={form.years} onChange={(e) => set("years", digits(e.target.value))} />
        </Field>
        <Field label="No. of rigs / vehicles" htmlFor="r-rigs">
          <input id="r-rigs" inputMode="numeric" maxLength={4} className="field-input" value={form.rigs} onChange={(e) => set("rigs", digits(e.target.value))} />
        </Field>
      </div>
    </FormCard>
  );
}
