import { PAGE_SLUGS } from "@/constants/pageSlugs";
import { getDistricts, getServices } from "@/lib/catalog";
import { generateSeoMetadata } from "@/lib/seo";
import { getSiteContact } from "@/lib/site-settings";
import PageHeader from "@/components/common/PageHeader";
import Container from "@/components/ui/Container";
import EnquiryForm from "@/components/enquiry/EnquiryForm";

export const generateMetadata = () =>
  generateSeoMetadata(PAGE_SLUGS.ENQUIRY, undefined, {
    title: "Send a borewell enquiry | Borewell",
    description: "Takes about 3 minutes. Tell us what you need and where; our team calls you to arrange a free site inspection.",
  });

export default async function EnquiryPage() {
  // Masters go into the HTML; null -> the form fetches them in the browser
  const [services, districts, contact] = await Promise.all([getServices(), getDistricts(), getSiteContact()]);

  return (
    <>
      <PageHeader crumb="Send an enquiry" title="Send a borewell enquiry" lead="Takes about 3 minutes. Our team will call you to arrange a free site inspection." />
      <section className="py-12 sm:py-16">
        <Container>
          <EnquiryForm initialServices={services} initialDistricts={districts} contact={contact} />
        </Container>
      </section>
    </>
  );
}
