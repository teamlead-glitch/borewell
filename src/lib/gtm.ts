// All tags are configured inside GTM; never push personal data (names, phones, emails)
type DataLayerWindow = Window & { dataLayer?: Record<string, unknown>[] };

export function pushToDataLayer(data: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const w = window as DataLayerWindow;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push(data);
}

export function trackLead(formName: "enquiry" | "provider_registration") {
  pushToDataLayer({ event: "generate_lead", form_name: formName });
}
