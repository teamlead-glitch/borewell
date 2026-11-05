import { PAGE_SLUGS } from "@/constants/pageSlugs";
import { fetchPageBySlug } from "@/lib/page-api";
import { generateSeoMetadata } from "@/lib/seo";
import { getSiteContact } from "@/lib/site-settings";
import JsonLd from "@/components/common/JsonLd";
import PageHeader from "@/components/common/PageHeader";
import AudiencePanels from "@/components/contact/AudiencePanels";
import ContactCards from "@/components/contact/ContactCards";
import OfficeMap from "@/components/contact/OfficeMap";

const slug = PAGE_SLUGS.CONTACT;

export const generateMetadata = () =>
  generateSeoMetadata(slug, undefined, {
    title: "Contact Borewell",
    description: "Call, WhatsApp, email or visit the Borewell team in Kerala. For a new borewell job, send an enquiry and we'll arrange a site inspection.",
  });

export default async function ContactPage() {
  const [page, contact] = await Promise.all([fetchPageBySlug(slug), getSiteContact()]);

  return (
    <>
      <JsonLd raw={page?.seo_detail?.schema_markup} />
      <PageHeader
        crumb="Contact"
        title="Talk to our team"
        lead="Call, message or visit us. For a new borewell job, the enquiry form is the quickest way to get started."
      />
      <ContactCards contact={contact} />
      <OfficeMap contact={contact} />
      <AudiencePanels />
    </>
  );
}
