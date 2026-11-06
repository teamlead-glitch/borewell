import { PAGE_SLUGS } from "@/constants/pageSlugs";
import { getServicesOrThrow } from "@/lib/catalog";
import { fetchPageBySlug } from "@/lib/page-api";
import { generateSeoMetadata } from "@/lib/seo";
import { getSiteContact } from "@/lib/site-settings";
import CtaBand from "@/components/common/CtaBand";
import JsonLd from "@/components/common/JsonLd";
import PageHeader from "@/components/common/PageHeader";
import ServiceGrid from "@/components/services/ServiceGrid";

const slug = PAGE_SLUGS.SERVICES;

export const generateMetadata = () =>
  generateSeoMetadata(slug, undefined, {
    title: "Borewell services in Kerala | Borewell",
    description: "Borewell drilling, flushing, pump fitting, groundwater survey and recharge across Kerala. Every job starts with a site inspection by our team.",
  });

export default async function ServicesPage() {
  // Services are this page's content: if the API is down (and nothing is cached) the page
  // answers 5xx via error.tsx rather than an empty list
  const [page, services, contact] = await Promise.all([fetchPageBySlug(slug), getServicesOrThrow(), getSiteContact()]);

  return (
    <>
      <JsonLd raw={page?.seo_detail?.schema_markup} />
      <PageHeader
        crumb="Services"
        title="Borewell services across Kerala"
        lead="Every job starts with a site inspection by our team. Choose a service to send an enquiry."
      />
      <ServiceGrid services={services} />
      <CtaBand
        title="Get a site inspection first"
        text="Tell us where you want to drill. Our team inspects the site before any provider quotes."
        primary={{ label: "Send enquiry", href: "/enquiry" }}
        secondary={contact.phone && contact.phoneHref ? { label: `Call ${contact.phone}`, href: contact.phoneHref } : undefined}
      />
    </>
  );
}
