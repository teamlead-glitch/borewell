/*
  Static stand-in for Google Maps (approved design): a quiet street grid with a river, so
  the layout reads like a map without loading any API. Replaced when Google Maps is added.
*/
export function MapArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
      <rect width="800" height="500" fill="#e6ece8" />
      <path d="M-20 380 C 160 330, 260 420, 420 360 S 700 300, 820 330 L820 380 C 700 350, 560 420, 420 410 S 160 380, -20 430Z" fill="#c6dfe6" />
      <g fill="#d6e4d0">
        <rect x="40" y="40" width="140" height="90" rx="10" />
        <rect x="560" y="60" width="180" height="120" rx="10" />
        <rect x="300" y="200" width="110" height="70" rx="10" />
      </g>
      <g stroke="#fff" strokeLinecap="round" fill="none">
        <path d="M0 170 H800" strokeWidth="14" />
        <path d="M230 0 V500" strokeWidth="14" />
        <path d="M520 0 C 500 160, 560 260, 520 500" strokeWidth="18" />
        <path d="M0 290 C 200 270, 400 300, 800 250" strokeWidth="9" />
        <path d="M120 170 V500 M360 0 V170 M650 170 V320" strokeWidth="6" />
      </g>
      <path d="M520 0 C 500 160, 560 260, 520 500" stroke="#f3d9a4" strokeWidth="6" fill="none" />
    </svg>
  );
}

export function MapPin({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg width="34" height="44" viewBox="0 0 34 44" className={className} style={style} aria-hidden="true">
      <path d="M17 43s15-14.2 15-25.5C32 8.4 25.3 2 17 2S2 8.4 2 17.5C2 28.8 17 43 17 43z" fill="#0f6e8c" stroke="#fff" strokeWidth="2.5" />
      <circle cx="17" cy="17" r="6" fill="#fff" />
    </svg>
  );
}
