"use client";

import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { STORAGE_KEYS } from "@/constants/forms";
import { trackLead } from "@/lib/gtm";
import { submitEnquiry } from "@/services/submissions";
import type { District } from "@/types/location";
import type { Service } from "@/types/service";
import type { SiteContact } from "@/types/settings";
import SubmitBar from "@/components/forms/SubmitBar";
import { useMasters } from "@/components/forms/useMasters";
import { useWizard } from "@/components/forms/wizard/useWizard";
import WizardError from "@/components/forms/wizard/WizardError";
import WizardNav from "@/components/forms/wizard/WizardNav";
import WizardPanel from "@/components/forms/wizard/WizardPanel";
import WizardProgress from "@/components/forms/wizard/WizardProgress";
import EnquiryAside from "./EnquiryAside";
import {
  ENQUIRY_STEPS,
  INITIAL_ENQUIRY,
  enquiryErrorStep,
  enquiryStepError,
  toEnquiryPayload,
  type EnquiryFormState,
  type SetEnquiryField,
} from "./enquiry-form-state";
import DetailsStep from "./steps/DetailsStep";
import NeedsStep from "./steps/NeedsStep";
import PropertyStep from "./steps/PropertyStep";
import SiteStep from "./steps/SiteStep";

type Props = { initialServices: Service[] | null; initialDistricts: District[] | null; contact: SiteContact };

export default function EnquiryForm({ initialServices, initialDistricts, contact }: Props) {
  const router = useRouter();
  const { services, districts } = useMasters(initialServices, initialDistricts);
  const [form, setForm] = useState<EnquiryFormState>(INITIAL_ENQUIRY);
  const [submitting, setSubmitting] = useState(false);
  const { step, go, error, setError, panel } = useWizard();
  const last = ENQUIRY_STEPS.length - 1;

  const set: SetEnquiryField = useCallback((key, value) => setForm((f) => ({ ...f, [key]: value })), []);

  // ?service=<id> from a service card pre-selects that tile. The tiles are on step 2, so it
  // is applied once, on the way there. Read from window (not useSearchParams) so the page
  // stays fully static and cacheable.
  const prefilled = useRef(false);
  function applyServiceFromUrl() {
    if (prefilled.current) return;
    prefilled.current = true;
    const id = Number(new URLSearchParams(window.location.search).get("service"));
    // Services still loading -> trust the id; the API rejects unknown ones
    if (id > 0 && (!services || services.some((s) => s.id === id))) setForm((f) => (f.services.length ? f : { ...f, services: [id] }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    const err = enquiryStepError(step, form);
    if (err) return setError(err);
    if (step === 0) applyServiceFromUrl();
    if (step < last) return go(step + 1);

    setSubmitting(true);
    const res = await submitEnquiry(toEnquiryPayload(form));
    if (!res.success || !res.data) {
      setSubmitting(false);
      const target = enquiryErrorStep(res.errors);
      if (target !== undefined && target !== step) go(target);
      // Field errors say what to fix; anything else (network, server) also offers the phone
      setError(res.errors ? res.error! : `${res.error || "The enquiry wasn't sent."} You can also call us on ${contact.phone}.`);
      return;
    }
    trackLead("enquiry");
    try {
      sessionStorage.setItem(STORAGE_KEYS.ENQUIRY, JSON.stringify(res.data));
    } catch {
      // private mode: the thank-you page shows its general version
    }
    router.push("/enquiry/thank-you");
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)] lg:items-start">
      <EnquiryAside contact={contact} />

      <form onSubmit={submit} className="flex min-w-0 flex-col gap-5">
        <WizardProgress steps={ENQUIRY_STEPS} step={step} onGo={go} label="Enquiry steps" />

        <WizardPanel panelRef={panel}>
          {step === 0 && <DetailsStep form={form} set={set} />}
          {step === 1 && <NeedsStep form={form} set={set} services={services} />}
          {step === 2 && <SiteStep form={form} set={set} districts={districts} />}
          {step === 3 && <PropertyStep form={form} set={set} />}
        </WizardPanel>

        <WizardError message={error} />

        {step === last && (
          <SubmitBar
            consent={form.consent}
            onConsent={(v) => set("consent", v)}
            text="I agree to be contacted about this enquiry. My details go only to the provider finally selected."
            cta="Send enquiry"
            submitting={submitting}
          />
        )}

        <WizardNav steps={ENQUIRY_STEPS} step={step} onBack={() => go(step - 1)} />
      </form>
    </div>
  );
}
