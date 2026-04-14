// Vector SVG spiral logo — traced from spiral-logo.jpg
// Colors preserved from original: dark purple spiral #2E0A5A on transparent background

function generateSpiralPath(
  cx: number,
  cy: number,
  rOuter: number,
  rInner: number,
  turns: number,
  steps: number
): string {
  const parts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const phi = t * turns * 2 * Math.PI;
    const r = rOuter - (rOuter - rInner) * t;
    // CW from left: x = cx - r*cos(φ), y = cy + r*sin(φ)
    const x = cx - r * Math.cos(phi);
    const y = cy + r * Math.sin(phi);
    parts.push(`${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  return "M " + parts.join(" L ");
}

export default function SpiralLogo({
  size = 120,
  spiralColor = "#2E0A5A",
  className = "",
}: {
  size?: number;
  spiralColor?: string;
  className?: string;
}) {
  const spiralPath = generateSpiralPath(50, 50, 44, 11, 3.5, 200);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Айя Велес — логотип"
    >
      {/* Spiral path — 3.5 turns clockwise from left */}
      <path
        d={spiralPath}
        stroke={spiralColor}
        strokeWidth="4.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Heart symbol at center — two bumps + rounded bottom */}
      <path
        d="M 50 57.5
           C 46 54.5, 42 51.5, 42 48
           C 42 43.5, 45.5 42, 48 43.5
           C 49 44.2, 50 45.5, 50 45.5
           C 50 45.5, 51 44.2, 52 43.5
           C 54.5 42, 58 43.5, 58 48
           C 58 51.5, 54 54.5, 50 57.5
           Z"
        fill={spiralColor}
      />

      {/* Small smile arc below heart */}
      <path
        d="M 46.5 56.5 Q 50 59.5 53.5 56.5"
        stroke={spiralColor}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
