import "./globals.css";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { SEO_CONFIG } from "@/constants/config";
import { getSiteContact } from "@/lib/site-settings";
import { getSiteUrl } from "@/lib/site-url";
import GoogleTagManager from "@/components/common/GoogleTagManager";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(await getSiteUrl()),
    title: { default: SEO_CONFIG.DEFAULT_TITLE, template: `%s · ${SEO_CONFIG.SITE_NAME}` },
    description: SEO_CONFIG.DEFAULT_DESCRIPTION,
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  // CMS settings loaded once here and passed down (no per-component browser requests)
  const contact = await getSiteContact();

  return (
    <html lang="en" className={`${jakarta.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <GoogleTagManager />
        <Header contact={contact} />
        <main id="main" tabIndex={-1} className="flex-1">
          {children}
        </main>
        <Footer contact={contact} />
        {contact.whatsappHref && <WhatsAppButton href={contact.whatsappHref} />}
      </body>
    </html>
  );
}
