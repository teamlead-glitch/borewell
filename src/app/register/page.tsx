import { PAGE_SLUGS } from "@/constants/pageSlugs";
import { getDistricts, getServices } from "@/lib/catalog";
import { generateSeoMetadata } from "@/lib/seo";
import { getSiteContact } from "@/lib/site-settings";
import PageHeader from "@/components/common/PageHeader";
import Container from "@/components/ui/Container";
import RegisterForm from "@/components/register/RegisterForm";

export const generateMetadata = () =>
  generateSeoMetadata(PAGE_SLUGS.REGISTER, undefined, {
    title: "Register your drilling company | Borewell",
    description: "Borewell companies in Kerala: register once and get calls for inspected jobs close to your yard. No app or login needed.",
  });

export default async function RegisterPage() {
  const [services, districts, contact] = await Promise.all([getServices(), getDistricts(), getSiteContact()]);

  return (
    <>
      <PageHeader crumb="For providers" title="Grow your borewell business with us" lead="Register once. We call you when an inspected site is close to your yard." />
      <section className="py-12 sm:py-16">
        <Container>
          <RegisterForm initialServices={services} initialDistricts={districts} contact={contact} />
        </Container>
      </section>
    </>
  );
}
