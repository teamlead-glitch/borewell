import { Drill, Eye, Lock, ShieldCheck, type LucideIcon } from "lucide-react";

// Named icons used by content blocks (constants/content.ts refers to them by name)
const ICONS: Record<string, LucideIcon> = {
  shield: ShieldCheck,
  eye: Eye,
  lock: Lock,
  drill: Drill,
};

export default function Icon({ name, size = 20, className }: { name: string; size?: number; className?: string }) {
  const Component = ICONS[name] ?? Drill;
  return <Component size={size} strokeWidth={1.8} className={className} aria-hidden="true" />;
}
