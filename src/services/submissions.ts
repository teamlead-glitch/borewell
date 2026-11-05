import { api } from "@/services/api";
import type { EnquiryPayload, EnquiryResult, ProviderPayload, ProviderResult } from "@/types/submission";

// Both endpoints are throttled to 10 a minute per IP on the API
export const submitEnquiry = (payload: EnquiryPayload) => api.post<EnquiryResult>("/enquiry", payload);

export const registerProvider = (payload: ProviderPayload) => api.post<ProviderResult>("/provider/register", payload);
