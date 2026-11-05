// Contact details (phone, email, address, hours...) are not kept here: they come only from
// the admin Settings via lib/site-settings.ts.
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
