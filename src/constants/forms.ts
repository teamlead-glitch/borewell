// Values must match the API (Enquiry::EXTENT_UNIT_LABELS in borewell-admin-and-api)
export const EXTENT_UNITS = [
  { value: "cents", label: "Cents" },
  { value: "acres", label: "Acres" },
];

// Same rule as the API (regex:/^[6-9][0-9]{9}$/), so the browser catches it first
export const MOBILE_PATTERN = "[6-9][0-9]{9}";

// sessionStorage keys: the thank-you pages read what the API answered
export const STORAGE_KEYS = {
  ENQUIRY: "bw-enquiry",
  REGISTER: "bw-register",
} as const;

// Fallback map centre (Thrissur) until the real map picker arrives
export const DEFAULT_COORDS = { lat: 10.5276, lng: 76.2144 };
