/* Final step: consent checkbox (required) and the submit button on a dark panel */
export default function SubmitBar({
  consent,
  onConsent,
  text,
  cta,
  submitting,
}: {
  consent: boolean;
  onConsent: (v: boolean) => void;
  text: string;
  cta: string;
  submitting?: boolean;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-5 rounded-[var(--radius-panel)] bg-deep p-6 text-white sm:px-8">
      <label className="flex max-w-[52ch] cursor-pointer items-start gap-3 text-[15px] text-white/80">
        <input type="checkbox" required checked={consent} onChange={(e) => onConsent(e.target.checked)} className="mt-1 size-[18px] shrink-0 accent-spring" />
        {text}
      </label>
      <button
        type="submit"
        disabled={submitting}
        aria-busy={submitting}
        className="inline-flex h-12 items-center rounded-full bg-spring px-6 text-[15px] font-bold text-basalt transition-colors hover:bg-white disabled:cursor-wait disabled:opacity-70"
      >
        {submitting ? "Sending…" : cta}
      </button>
    </div>
  );
}
