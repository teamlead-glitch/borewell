import type { Metadata } from "next";
import { getSiteContact } from "@/lib/site-settings";
import Container from "@/components/ui/Container";
import RegisterThankYou from "@/components/register/RegisterThankYou";

// Only reached after a submit; kept out of search results (also via X-Robots-Tag in next.config)
export const metadata: Metadata = { title: "Registration received", robots: { index: false, follow: false } };

export default async function RegisterThankYouPage() {
  const contact = await getSiteContact();
  return (
    <section className="bg-mist pb-14 pt-28 sm:pb-20 sm:pt-32">
      <Container>
        <RegisterThankYou contact={contact} />
      </Container>
    </section>
  );
}
