export default function Ornament({
  className = "",
  color = "#F3DFA2",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <span className="w-10 h-px" style={{ backgroundColor: `${color}80` }} />
      <span className="w-1.5 h-1.5 rotate-45" style={{ backgroundColor: color }} />
      <span className="w-10 h-px" style={{ backgroundColor: `${color}80` }} />
    </div>
  );
}
