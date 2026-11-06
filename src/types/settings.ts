// GET /settings (MasterController@settings) - Settings::KEYS plus ready-made links
export interface ApiSettings {
  company_name: string | null;
  email: string | null;
  phone: string | null;
  phone_hours: string | null;
  whatsapp: string | null;
  address: string | null;
  location: string | null;
  map_url: string | null;
  hours_weekdays: string | null;
  hours_saturday: string | null;
  hours_sunday: string | null;
  phone_link: string | null;
  whatsapp_link: string | null;
}

// Contact details as the header, footer and pages use them. Every value comes from the admin
// Settings; null (or an empty hours list) means "not set" and the UI hides it.
export interface SiteContact {
  // Brand name for "© ..." and labels: the admin company name, else the site name
  name: string;
  // The admin company name exactly as entered (null when empty)
  companyName: string | null;
  phone: string | null;
  phoneHref: string | null;
  phoneHours: string | null;
  whatsapp: string | null;
  whatsappHref: string | null;
  email: string | null;
  address: string | null;
  location: string | null;
  // Normal Google Maps page for "Get directions" / "Open in Google Maps"
  mapUrl: string | null;
  // Google Maps iframe src for the Contact page map (null: the map art is shown)
  mapEmbedUrl: string | null;
  // Always the three rows (Mon – Fri, Saturday, Sunday); time is null when not set
  hours: { day: string; time: string | null }[];
}
