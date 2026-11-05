import { notFound, permanentRedirect } from "next/navigation";
import { PAGE_SLUGS } from "@/constants/pageSlugs";
import { fetchPageResult } from "@/lib/page-api";
import { getPreviewToken, withPreviewToken } from "@/lib/preview";
import { generateSeoMetadata } from "@/lib/seo";
import JsonLd from "@/components/common/JsonLd";
import PageHeader from "@/components/common/PageHeader";
import Container from "@/components/ui/Container";

/* CMS content pages (admin "Content pages": privacy policy, terms ...) */

type Props = { params: Promise<{ slug: string }> };

export const generateMetadata = async ({ params }: Props) => {
  const { slug } = await params;
  if (!slug || slug === PAGE_SLUGS.HOME) return {};
  return generateSeoMetadata(slug, await getPreviewToken());
};

export default async function CmsPage({ params }: Props) {
  const { slug } = await params;
  const token = await getPreviewToken();
  const { page, redirectTo } = await fetchPageResult(slug, token); // CMS down -> error.tsx (5xx)

  if (redirectTo && slug !== PAGE_SLUGS.HOME) permanentRedirect(withPreviewToken(`/${redirectTo}`, token));
  if (!page || slug === PAGE_SLUGS.HOME) notFound();

  return (
    <>
      <JsonLd raw={page.seo_detail?.schema_markup} />
      <PageHeader crumb={page.title} title={page.title} lead={page.short_description ?? undefined} />
      <section className="py-14 sm:py-20">
        <Container className="max-w-[820px]">
          {/* Admin rich-text editor output, written by the client's own staff */}
          <div className="cms-content" dangerouslySetInnerHTML={{ __html: page.content ?? "" }} />
        </Container>
      </section>
    </>
  );
}

// Built on first visit, then served from the page cache
export async function generateStaticParams() {
  return [];
}
