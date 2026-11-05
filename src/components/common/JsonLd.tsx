/** Structured data in the server HTML. `raw` = schema_markup string from the CMS;
 *  `data` = schema generated here (escaped so "</script>" in a value can't break out). */
export default function JsonLd({ raw, data }: { raw?: string | null; data?: object }) {
  const html = raw ?? (data ? JSON.stringify(data).replace(/</g, "\\u003c") : null);
  if (!html) return null;
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: html }} />;
}
