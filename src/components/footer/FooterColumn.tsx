import Link from "next/link";

export default function FooterColumn({ title, links }: { title: string; links: readonly { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="mb-4 text-[15px] font-semibold text-white">{title}</h2>
      <ul className="space-y-2 text-[15px]">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="hover:text-white">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
