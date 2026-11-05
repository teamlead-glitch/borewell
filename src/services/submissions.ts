import { api } from "@/services/api";
import type { EnquiryPayload, EnquiryResult, EnquiryStepPayload, EnquiryStepResult, ProviderPayload, ProviderResult } from "@/types/submission";

// Both endpoints are throttled to 10 a minute per IP on the API
export const submitEnquiry = (payload: EnquiryPayload) => api.post<EnquiryResult>("/enquiry", payload);

// Background save after each enquiry step (30 a minute per IP); never blocks the visitor
export const saveEnquiryStep = (payload: EnquiryStepPayload) => api.post<EnquiryStepResult>("/enquiry/step", payload);

export const registerProvider = (payload: ProviderPayload) => api.post<ProviderResult>("/provider/register", payload);
