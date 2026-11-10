/** Composição abstrata gerada a partir da paleta do destino — evita fotos clichê de viagem. */
export function DestinationArt({ palette, seed, className = "h-28" }: { palette: [string, string, string]; seed: string; className?: string }) {
  const n = Array.from(seed).reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const [a, b, c] = palette;
  const x1 = 20 + (n % 50);
  const x2 = 160 + (n % 70);
  const y = 30 + (n % 40);
  return (
    <svg viewBox="0 0 320 120" preserveAspectRatio="xMidYMid slice" className={`w-full ${className}`} aria-hidden>
      <rect width="320" height="120" fill={c} />
      <circle cx={x2} cy={y} r={48} fill={b} opacity={0.85} />
      <rect x={x1} y={60} width={120} height={80} rx={40} fill={a} opacity={0.9} />
      <path d={`M0 ${100 - (n % 20)} C 80 ${60 + (n % 30)}, 200 130, 320 ${70 + (n % 25)}`} stroke={a} strokeWidth="3" fill="none" strokeDasharray="5 7" opacity={0.6} />
      <circle cx={x2 + 40} cy={y + 40} r={6} fill={a} />
    </svg>
  );
}
