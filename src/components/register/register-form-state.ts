import type { Place } from "@/types/location";
import type { ProviderPayload, ProviderStepPayload } from "@/types/submission";
import { EMPTY_PIN, type Pin } from "@/components/forms/MapPicker";

export const REGISTER_STEPS = ["Company details", "Services you offer", "Your location"];

export type RegisterFormState = {
  company: string;
  person: string;
  phone: string;
  phone2: string;
  email: string;
  gst: string;
  years: string;
  rigs: string;
  services: number[];
  place: Place;
  address: string;
  pin: Pin;
  consent: boolean;
};

export type SetRegisterField = <K extends keyof RegisterFormState>(key: K, value: RegisterFormState[K]) => void;

export const INITIAL_REGISTER: RegisterFormState = {
  company: "",
  person: "",
  phone: "",
  phone2: "",
  email: "",
  gst: "",
  years: "",
  rigs: "",
  services: [],
  place: { districtId: "", taluk: "", panchayat: "", ward: "" },
  address: "",
  pin: EMPTY_PIN,
  consent: false,
};

export function registerStepError(step: number, f: RegisterFormState): string {
  if (step === 1 && !f.services.length) return "Choose at least one service you offer.";
  if (step === 2 && !f.pin.set) return "Tap the map to pin your yard.";
  return "";
}

const FIELD_STEP: Record<string, number> = { services: 1, district_id: 2, taluk: 2, panchayat: 2, address: 2, latitude: 2, longitude: 2, terms_accepted: 2 };

export function registerErrorStep(errors?: Record<string, string[]>): number | undefined {
  const field = Object.keys(errors ?? {})[0];
  return field ? (FIELD_STEP[field] ?? 0) : undefined;
}

const optionalInt = (v: string) => (v === "" ? undefined : Number.parseInt(v, 10));

export function toProviderPayload(f: RegisterFormState): ProviderPayload {
  return {
    company_name: f.company.trim(),
    contact_person: f.person.trim(),
    phone: f.phone,
    alternate_phone: f.phone2 || undefined,
    email: f.email.trim(),
    gst_number: f.gst.trim() || undefined,
    years_in_business: optionalInt(f.years),
    no_of_rigs: optionalInt(f.rigs),
    services: f.services,
    district_id: Number(f.place.districtId),
    taluk: f.place.taluk,
    panchayat: f.place.panchayat,
    address: f.address.trim(),
    latitude: f.pin.lat,
    longitude: f.pin.lng,
    terms_accepted: f.consent,
  };
}

/** What is known after `step` finished steps (1-3), for the background save. Empty values
 *  and an unpinned map are left out, so the API only stores what the company gave. */
export function toProviderStepPayload(f: RegisterFormState, step: number, draftToken: string | null): ProviderStepPayload {
  const full = toProviderPayload(f);
  // Terms are only accepted with the final "Send registration"
  const known = Object.fromEntries(
    Object.entries(full).filter(([k, v]) => k !== "terms_accepted" && v !== undefined && v !== "" && !(Array.isArray(v) && v.length === 0))
  ) as Partial<ProviderPayload>;
  if (!known.district_id) delete known.district_id;
  if (!f.pin.set) {
    delete known.latitude;
    delete known.longitude;
  }
  return {
    ...known,
    company_name: full.company_name,
    contact_person: full.contact_person,
    phone: full.phone,
    email: full.email,
    step,
    draft_token: draftToken ?? undefined,
  };
}
