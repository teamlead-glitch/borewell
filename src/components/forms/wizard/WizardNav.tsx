import { ArrowLeft, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

/* Back + Next row; Next is a submit button so required fields are checked first */
export default function WizardNav({ steps, step, onBack }: { steps: string[]; step: number; onBack: () => void }) {
  return (
    <div className="flex items-center justify-between gap-4">
      {step > 0 ? (
        <Button type="button" variant="outline" onClick={onBack}>
          <ArrowLeft size={16} aria-hidden="true" /> Back
        </Button>
      ) : (
        <span />
      )}
      {step < steps.length - 1 && (
        <Button type="submit" variant="dark">
          Next: {steps[step + 1]} <ArrowRight size={16} aria-hidden="true" />
        </Button>
      )}
    </div>
  );
}
