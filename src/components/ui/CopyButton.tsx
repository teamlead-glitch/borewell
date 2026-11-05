"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/utils/cn";

export default function CopyButton({ value, label, className }: { value: string; label: string; className?: string }) {
  const [done, setDone] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // clipboard blocked (http, old browser): the value is on screen to copy by hand
      return;
    }
    setDone(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setDone(false), 1800);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-[13px] font-semibold hover:border-basalt",
        className
      )}
      aria-live="polite"
    >
      {done ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
      {done ? "Copied" : label}
    </button>
  );
}
