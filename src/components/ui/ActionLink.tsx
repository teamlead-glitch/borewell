/** Small outlined pill for secondary actions on cards ("Open WhatsApp", "Get directions") */
export default function ActionLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-[13px] font-semibold hover:border-basalt"
    >
      {children}
    </a>
  );
}
