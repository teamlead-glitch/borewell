export default function WizardError({ message }: { message: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="rounded-[var(--radius-card)] border border-laterite/40 bg-laterite/5 px-4 py-3 text-[15px] font-medium text-laterite">
      {message}
    </p>
  );
}
