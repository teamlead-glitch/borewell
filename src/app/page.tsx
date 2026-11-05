import { PROVIDER_CTA } from "@/constants/content";
import { PAGE_SLUGS } from "@/constants/pageSlugs";
import { getServices } from "@/lib/catalog";
import { fetchPageBySlug } from "@/lib/page-api";
import { generateSeoMetadata } from "@/lib/seo";
import { getSiteContact } from "@/lib/site-settings";
import { getSiteUrl } from "@/lib/site-url";
import CtaBand from "@/components/common/CtaBand";
import JsonLd from "@/components/common/JsonLd";
import HomeHero from "@/components/home/HomeHero";
import HowItWorks from "@/components/home/HowItWorks";
import ServicesShowcase from "@/components/home/ServicesShowcase";
import TrustStats from "@/components/home/TrustStats";
import WhyChooseUs from "@/components/home/WhyChooseUs";

const slug = PAGE_SLUGS.HOME;

export const generateMetadata = () => generateSeoMetadata(slug);

export default async function HomePage() {
  const [page, services, contact, siteUrl] = await Promise.all([fetchPageBySlug(slug), getServices(), getSiteContact(), getSiteUrl()]);

  const organisation = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: contact.name,
    url: siteUrl,
    telephone: contact.phone,
    email: contact.email,
    address: { "@type": "PostalAddress", streetAddress: contact.address, addressRegion: "Kerala", addressCountry: "IN" },
    areaServed: "Kerala",
  };

  return (
    <>
      <JsonLd raw={page?.seo_detail?.schema_markup} />
      <JsonLd data={organisation} />
      <HomeHero />
      <TrustStats />
      {/* Hidden (not an error) when the API is down: the rest of the page still stands */}
      {services && <ServicesShowcase services={services} />}
      <HowItWorks />
      <WhyChooseUs />
      {/* Two different actions: register online, or talk it through by phone */}
      <CtaBand
        {...PROVIDER_CTA}
        primary={{ label: "Register your company", href: "/register" }}
        secondary={{ label: `Call ${contact.phone}`, href: contact.phoneHref }}
      />
    </>
  );
}
