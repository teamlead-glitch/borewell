// Marketing copy from the approved design. The API has no endpoint for these blocks yet;
// move them to the CMS when it does.

export const STEPS = [
  { who: "You", title: "Send an enquiry", text: "Choose the service and pin the spot where you want the borewell." },
  { who: "Our team", title: "Site inspection", text: "Our own staff visit to check the ground and whether a rig lorry can reach." },
  { who: "Our team", title: "Quotes compared", text: "We collect quotations from verified providers nearest to your land." },
  { who: "Provider", title: "Work begins", text: "The provider you choose calls you to fix a date and starts drilling." },
];

export const WHY_US = [
  { title: "Inspected by our own staff", text: "Not by the provider who wants the job." },
  { title: "Providers matched by road distance", text: "A nearby rig means a lower transport charge for you." },
  { title: "Quotations compared for you", text: "We collect and compare quotes so you don't have to chase calls." },
  { title: "Only verified providers", text: "Every company is checked by phone and in person before it is listed." },
];

export const VALUES = [
  { icon: "eye", title: "We inspect first", text: "Our staff check every site before a single provider is asked to quote." },
  { icon: "shield", title: "Verified providers", text: "Each company is reviewed, and its rigs seen, before it is approved." },
  { icon: "lock", title: "Your number stays private", text: "Shared only with the provider finally selected for your work." },
] as const;

export const STORY = [
  "Borewell started in Thrissur after we watched neighbours pay for two or three dry bores before one gave water. Most of those jobs were quoted over the phone by whoever answered first, without anyone walking the land.",
  "So we turned it around. Our own team looks at the site first, then we ask the nearest verified drilling companies to quote on what we found. You pick, they drill, and we stay on the line until the job is done.",
];

export const PROVIDER_PERKS = [
  "Jobs near your yard, matched by road distance",
  "Every site already inspected by our team",
  "No app or login. Quotes are taken by phone",
];

export const APPROVAL_STEPS = [
  { title: "Send this form", text: "About 5 minutes" },
  { title: "We verify your details", text: "By phone, and a visit to your yard" },
  { title: "Approval email", text: "Then you start getting job calls" },
];

export const PROVIDER_CTA = {
  title: "Get borewell jobs near your yard",
  text: "Register your company once. We call you when an inspected enquiry is close to your location.",
  points: ["No app or login needed", "Jobs matched by road distance", "Quotes taken by phone"],
};
