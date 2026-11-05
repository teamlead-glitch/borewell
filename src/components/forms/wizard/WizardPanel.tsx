/* Focus target for screen readers on step change; inline style beats the global :focus-visible ring */
export default function WizardPanel({ panelRef, children }: { panelRef: React.RefObject<HTMLDivElement | null>; children: React.ReactNode }) {
  return (
    <div ref={panelRef} tabIndex={-1} className="scroll-mt-28" style={{ outline: "none" }}>
      {children}
    </div>
  );
}
