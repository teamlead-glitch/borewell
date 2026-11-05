import { PAGE_SLUGS } from "@/constants/pageSlugs";
import { getServices } from "@/lib/catalog";
import { fetchPageBySlug } from "@/lib/page-api";
import { generateSeoMetadata } from "@/lib/seo";
import OurStory from "@/components/about/OurStory";
import OurValues from "@/components/about/OurValues";
import ServicesChecklist from "@/components/about/ServicesChecklist";
import CtaBand from "@/components/common/CtaBand";
import JsonLd from "@/components/common/JsonLd";
import PageHeader from "@/components/common/PageHeader";

const slug = PAGE_SLUGS.ABOUT_US;

export const generateMetadata = () =>
  generateSeoMetadata(slug, undefined, {
    title: "About Borewell",
    description: "A local Kerala team that inspects the land before anyone quotes, then compares quotes from verified borewell companies near you.",
  });

export default async function AboutPage() {
  const [page, services] = await Promise.all([fetchPageBySlug(slug), getServices()]);

  return (
    <>
      <JsonLd raw={page?.seo_detail?.schema_markup} />
      <PageHeader
        crumb="About us"
        title="A local team making borewell work simpler"
        lead="We help families and farmers across Kerala get the right borewell, by looking at the land before anyone quotes."
      />
      <OurStory />
      <OurValues />
      {services && <ServicesChecklist services={services} />}
      <CtaBand
        title="Ready to start your borewell project?"
        text="Send an enquiry and our team will call you to arrange the inspection."
        primary={{ label: "Send enquiry", href: "/enquiry" }}
        secondary={{ label: "View services", href: "/services" }}
      />
    </>
  );
}
