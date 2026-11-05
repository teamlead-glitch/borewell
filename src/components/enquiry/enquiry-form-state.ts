import type { Place } from "@/types/location";
import type { EnquiryPayload, EnquiryStepPayload } from "@/types/submission";
import { EMPTY_PIN, type Pin } from "@/components/forms/MapPicker";

export const ENQUIRY_STEPS = ["Your details", "What do you need?", "Where is the site?", "About the property"];

export type EnquiryFormState = {
  name: string;
  phone: string;
  email: string;
  services: number[];
  details: string;
  place: Place;
  address: string;
  pin: Pin;
  propertyType: string;
  extent: string;
  unit: string;
  road: string;
  rig: string;
  nearby: string;
  consent: boolean;
};

export type SetEnquiryField = <K extends keyof EnquiryFormState>(key: K, value: EnquiryFormState[K]) => void;

export const INITIAL_ENQUIRY: EnquiryFormState = {
  name: "",
  phone: "",
  email: "",
  services: [],
  details: "",
  place: { districtId: "", taluk: "", panchayat: "", ward: "" },
  address: "",
  pin: EMPTY_PIN,
  propertyType: "residential",
  extent: "",
  unit: "cents",
  road: "",
  rig: "",
  nearby: "",
  consent: false,
};

/** Checks the browser can't do itself; required inputs are handled natively */
export function enquiryStepError(step: number, f: EnquiryFormState): string {
  if (step === 1 && !f.services.length) return "Choose at least one service.";
  if (step === 2 && !f.pin.set) return "Tap the map to pin the borewell spot.";
  if (step === 3 && (!f.road || !f.rig)) return "Tell us about road and rig access.";
  return "";
}

// API field -> wizard step, so a server-side error takes the visitor to the right step
const FIELD_STEP: Record<string, number> = {
  customer_name: 0,
  phone: 0,
  email: 0,
  services: 1,
  details: 1,
  district_id: 2,
  taluk: 2,
  panchayat: 2,
  ward: 2,
  address: 2,
  latitude: 2,
  longitude: 2,
};

export function enquiryErrorStep(errors?: Record<string, string[]>): number | undefined {
  const field = Object.keys(errors ?? {})[0];
  return field ? (FIELD_STEP[field] ?? 3) : undefined;
}

export function toEnquiryPayload(f: EnquiryFormState): EnquiryPayload {
  const extent = parseFloat(f.extent);
  return {
    customer_name: f.name.trim(),
    phone: f.phone,
    email: f.email.trim() || undefined,
    services: f.services,
    details: f.details.trim() || undefined,
    district_id: Number(f.place.districtId),
    taluk: f.place.taluk,
    panchayat: f.place.panchayat,
    ward: f.place.ward.trim(),
    address: f.address.trim(),
    latitude: f.pin.lat,
    longitude: f.pin.lng,
    property_type: f.propertyType || undefined,
    property_extent: Number.isFinite(extent) ? extent : undefined,
    extent_unit: Number.isFinite(extent) ? f.unit : undefined,
    road_access: f.road || undefined,
    rig_access: f.rig || undefined,
    nearby_well_info: f.nearby.trim() || undefined,
    consent: f.consent,
  };
}

/** What is known after `step` finished steps (1-4), for the background save. Empty values
 *  and an unpinned map are left out, so the API only stores what the visitor gave. */
export function toEnquiryStepPayload(f: EnquiryFormState, step: number, draftToken: string | null): EnquiryStepPayload {
  const full = toEnquiryPayload(f);
  // Consent is only given with the final "Send enquiry"
  const known = Object.fromEntries(
    Object.entries(full).filter(([k, v]) => k !== "consent" && v !== undefined && v !== "" && !(Array.isArray(v) && v.length === 0))
  ) as Partial<EnquiryPayload>;
  if (!known.district_id) delete known.district_id;
  // Property type has a default; only send it once the visitor has been on that step
  if (step < ENQUIRY_STEPS.length) delete known.property_type;
  if (!f.pin.set) {
    delete known.latitude;
    delete known.longitude;
  }
  return { ...known, customer_name: full.customer_name, phone: full.phone, step, draft_token: draftToken ?? undefined };
}
