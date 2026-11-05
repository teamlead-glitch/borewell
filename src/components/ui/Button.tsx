import Link from "next/link";
import { cn } from "@/utils/cn";

type Variant = "primary" | "dark" | "outline" | "light" | "ghost-light";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-aquifer text-white hover:bg-aquifer-dark",
  dark: "bg-deep text-white hover:bg-deep-2",
  outline: "border-[1.5px] border-basalt/80 text-basalt hover:bg-deep hover:text-white",
  light: "bg-white text-basalt hover:bg-mist",
  "ghost-light": "border-[1.5px] border-white/50 text-white hover:bg-white/10",
};

type Props = {
  href?: string;
  variant?: Variant;
  className?: string;
  // Plain callback so it works for both the link and the button form
  onClick?: () => void;
  children: React.ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "onClick">;

/** Pill button. With `href` it renders a link: <Link> inside the site, <a> for http/tel/mailto. */
export default function Button({ href, variant = "primary", className, onClick, children, ...rest }: Props) {
  const cls = cn(
    "inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full px-5 text-[15px] font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60",
    VARIANTS[variant],
    className
  );

  if (href) {
    const external = /^(https?:|tel:|mailto:)/.test(href);
    if (external) {
      const newTab = href.startsWith("http");
      return (
        <a href={href} onClick={onClick} className={cls} target={newTab ? "_blank" : undefined} rel={newTab ? "noreferrer" : undefined}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} onClick={onClick} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cls} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}
