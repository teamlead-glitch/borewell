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

// Contact details as the header, footer and pages use them (never null)
export interface SiteContact {
  name: string;
  phone: string;
  phoneHref: string;
  phoneHours: string;
  whatsapp: string;
  whatsappHref: string;
  email: string;
  address: string;
  location: string;
  mapUrl: string;
  hours: { day: string; time: string }[];
}
