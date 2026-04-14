export default function Logo({
  size = 60,
  className = "",
  style,
}: {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <img
      src="/spiral-logo.png"
      alt="Логотип Айя Велес"
      width={size}
      height={size}
      className={className}
      style={{
        display: "block",
        flexShrink: 0,
        objectFit: "cover",
        clipPath: "circle(48%)",
        ...style,
      }}
    />
  );
}
