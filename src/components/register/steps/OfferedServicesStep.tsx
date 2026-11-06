import type { Service } from "@/types/service";
import { providerServices } from "@/utils/services";
import FormCard from "@/components/forms/FormCard";
import ServicePicker from "@/components/forms/ServicePicker";
import type { RegisterFormState, SetRegisterField } from "../register-form-state";

export default function OfferedServicesStep({ form, set, services }: { form: RegisterFormState; set: SetRegisterField; services: Service[] | null }) {
  return (
    <FormCard step="Step 2 of 3" title="Services you offer" aside={`${form.services.length} selected`} active>
      <ServicePicker services={providerServices(services)} chosen={form.services} onChange={(ids) => set("services", ids)} />
    </FormCard>
  );
}
