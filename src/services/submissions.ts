import { api } from "@/services/api";
import type {
  EnquiryPayload,
  EnquiryResult,
  EnquiryStepPayload,
  EnquiryStepResult,
  ProviderPayload,
  ProviderResult,
  ProviderStepPayload,
  ProviderStepResult,
} from "@/types/submission";

// Both endpoints are throttled to 10 a minute per IP on the API
export const submitEnquiry = (payload: EnquiryPayload) => api.post<EnquiryResult>("/enquiry", payload);

export const registerProvider = (payload: ProviderPayload) => api.post<ProviderResult>("/provider/register", payload);

// Background saves after each wizard step (30 a minute per IP); they never block the visitor
export const saveEnquiryStep = (payload: EnquiryStepPayload) => api.post<EnquiryStepResult>("/enquiry/step", payload);

export const saveProviderStep = (payload: ProviderStepPayload) => api.post<ProviderStepResult>("/provider/register/step", payload);
