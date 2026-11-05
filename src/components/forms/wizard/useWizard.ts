"use client";

import { useEffect, useRef, useState } from "react";

/* Multi-step form state. Only the current step is rendered, so the browser's native
   validation on submit covers just that step. */
export function useWizard() {
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const panel = useRef<HTMLDivElement>(null);
  const moved = useRef(false);

  // Bring the new step into view and move focus to it (skip the first render)
  useEffect(() => {
    if (!moved.current) {
      moved.current = true;
      return;
    }
    panel.current?.focus({ preventScroll: true });
    panel.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);

  function go(i: number) {
    setError("");
    setStep(i);
  }

  return { step, go, error, setError, panel };
}
