/* ---------- POST /enquiry (StoreEnquiryRequest) ---------- */
export interface EnquiryPayload {
  customer_name: string;
  phone: string;
  email?: string;
  services: number[];
  details?: string;
  district_id: number;
  taluk: string;
  panchayat: string;
  ward: string;
  address: string;
  latitude: number;
  longitude: number;
  property_type?: string;
  property_extent?: number;
  extent_unit?: string;
  road_access?: string;
  rig_access?: string;
  nearby_well_info?: string;
  consent: boolean;
  // From POST /enquiry/step: the API turns that Incomplete enquiry into this one
  draft_token?: string;
}

/* ---------- POST /enquiry/step (SaveEnquiryStepRequest) ----------
 * Each finished step is saved as an "Incomplete" enquiry the team can follow up.
 * Only name + phone are required; anything else is sent when known. */
export type EnquiryStepPayload = Partial<Omit<EnquiryPayload, "consent">> &
  Pick<EnquiryPayload, "customer_name" | "phone"> & {
    step: number;
    draft_token?: string;
  };

export interface EnquiryStepResult {
  draft_token: string | null;
}

export interface EnquiryResult {
  reference: string;
  customer_name: string;
  phone: string;
  services: string[];
  location: string;
  property: string | null;
  acknowledgement_sent_to: string | null;
}

/* ---------- POST /provider/register (RegisterProviderRequest) ---------- */
export interface ProviderPayload {
  company_name: string;
  contact_person: string;
  phone: string;
  alternate_phone?: string;
  email: string;
  gst_number?: string;
  years_in_business?: number;
  no_of_rigs?: number;
  services: number[];
  district_id: number;
  taluk: string;
  panchayat: string;
  address: string;
  latitude: number;
  longitude: number;
  terms_accepted: boolean;
  // From POST /provider/register/step: the API turns that Incomplete provider into this one
  draft_token?: string;
}

/* ---------- POST /provider/register/step (SaveProviderStepRequest) ----------
 * Each finished step is saved as an "Incomplete" provider the team can follow up.
 * Step 1 (company, contact person, phone, email) is required; the rest when known. */
export type ProviderStepPayload = Partial<Omit<ProviderPayload, "terms_accepted">> &
  Pick<ProviderPayload, "company_name" | "contact_person" | "phone" | "email"> & {
    step: number;
    draft_token?: string;
  };

export interface ProviderStepResult {
  draft_token: string | null;
}

export interface ProviderResult {
  id: number;
  company_name: string;
  email: string;
  phone: string;
  approval_status: string;
  services: string[];
}
