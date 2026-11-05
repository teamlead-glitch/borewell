"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { STORAGE_KEYS } from "@/constants/forms";
import { trackLead } from "@/lib/gtm";
import { registerProvider } from "@/services/submissions";
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
import RegisterAside from "./RegisterAside";
import {
  INITIAL_REGISTER,
  REGISTER_STEPS,
  registerErrorStep,
  registerStepError,
  toProviderPayload,
  type RegisterFormState,
  type SetRegisterField,
} from "./register-form-state";
import CompanyStep from "./steps/CompanyStep";
import OfferedServicesStep from "./steps/OfferedServicesStep";
import YardStep from "./steps/YardStep";

type Props = { initialServices: Service[] | null; initialDistricts: District[] | null; contact: SiteContact };

export default function RegisterForm({ initialServices, initialDistricts, contact }: Props) {
  const router = useRouter();
  const { services, districts } = useMasters(initialServices, initialDistricts);
  const [form, setForm] = useState<RegisterFormState>(INITIAL_REGISTER);
  const [submitting, setSubmitting] = useState(false);
  const { step, go, error, setError, panel } = useWizard();
  const last = REGISTER_STEPS.length - 1;

  const set: SetRegisterField = useCallback((key, value) => setForm((f) => ({ ...f, [key]: value })), []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    const err = registerStepError(step, form);
    if (err) return setError(err);
    if (step < last) return go(step + 1);

    setSubmitting(true);
    const res = await registerProvider(toProviderPayload(form));
    if (!res.success || !res.data) {
      setSubmitting(false);
      const target = registerErrorStep(res.errors);
      if (target !== undefined && target !== step) go(target);
      // Field errors say what to fix; anything else (network, server) also offers the phone
      setError(res.errors ? res.error! : `${res.error || "The registration wasn't sent."} ${contact.phone ? `You can also call us on ${contact.phone}.` : "Try sending it again."}`);
      return;
    }
    trackLead("provider_registration");
    try {
      sessionStorage.setItem(STORAGE_KEYS.REGISTER, JSON.stringify(res.data));
    } catch {
      // private mode: the thank-you page shows its general version
    }
    router.push("/register/thank-you");
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[340px_minmax(0,1fr)] lg:items-start">
      <RegisterAside contact={contact} />

      <form onSubmit={submit} className="flex min-w-0 flex-col gap-5">
        <WizardProgress steps={REGISTER_STEPS} step={step} onGo={go} label="Registration steps" />

        <WizardPanel panelRef={panel}>
          {step === 0 && <CompanyStep form={form} set={set} />}
          {step === 1 && <OfferedServicesStep form={form} set={set} services={services} />}
          {step === 2 && <YardStep form={form} set={set} districts={districts} />}
        </WizardPanel>

        <WizardError message={error} />

        {step === last && (
          <SubmitBar
            consent={form.consent}
            onConsent={(v) => set("consent", v)}
            text="I confirm these details are correct and agree to the platform terms, including the subscription arranged with your team."
            cta="Send registration"
            submitting={submitting}
          />
        )}

        <WizardNav steps={REGISTER_STEPS} step={step} onBack={() => go(step - 1)} />
      </form>
    </div>
  );
}
