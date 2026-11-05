/* Logo: a well seen from above, with the bore dropping through it */
export default function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <span className="inline-flex items-center gap-2" style={{ color: tone === "dark" ? "var(--color-basalt)" : "#fff" }}>
      <svg width="30" height="30" viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <path d="M16 3v20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M16 23c-2.6 3-2.6 6 0 6s2.6-3 0-6z" fill="var(--color-spring)" />
      </svg>
      <span className="text-[23px] font-extrabold leading-none tracking-[-0.04em]">borewell</span>
    </span>
  );
}
