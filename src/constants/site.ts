import type { SiteContact } from "@/types/settings";

/* ---------- FALLBACK CONTACT DETAILS ---------- */
// Used only while a value is empty in the admin Settings (or the API is unreachable).
// Replace with the client's real details, or simply fill them in the admin.
export const CONTACT_DEFAULTS: SiteContact = {
  name: "Borewell",
  phone: "+91 94470 12345",
  phoneHref: "tel:+919447012345",
  phoneHours: "Mon – Fri, 9:00 am – 6:00 pm",
  whatsapp: "+91 94470 12345",
  whatsappHref: "https://wa.me/919447012345",
  email: "hello@borewell.in",
  address: "2nd Floor, Thekkumkara Building, MG Road, Thrissur, Kerala 680001",
  location: "Thrissur, Kerala",
  mapUrl: "https://maps.google.com/?q=MG+Road+Thrissur+Kerala",
  hours: [
    { day: "Mon – Fri", time: "9:00 am – 6:00 pm" },
    { day: "Saturday", time: "9:00 am – 1:00 pm" },
    { day: "Sunday", time: "Closed" },
  ],
};

export const SINCE_YEAR = 2015;

export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "For providers", href: "/register" },
] as const;

export const FOOTER_LINKS = {
  company: [
    { label: "About us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  getStarted: [
    { label: "Services", href: "/services" },
    { label: "Send an enquiry", href: "/enquiry" },
    { label: "Register your company", href: "/register" },
  ],
  // CMS content pages (admin "Content pages"), served by app/[slug]
  legal: [
    { label: "Privacy policy", href: "/privacy-policy" },
    { label: "Terms", href: "/terms" },
  ],
};

export const STATS = [
  { value: "120+", label: "Verified drilling companies", short: "Providers" },
  { value: "14", label: "Districts covered", short: "Districts" },
  { value: "500+", label: "Enquiries handled", short: "Enquiries" },
  { value: "Every site", label: "Inspected before quoting", short: "Inspected" },
];
