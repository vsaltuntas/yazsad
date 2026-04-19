import { cn } from "@/lib/utils";

// Sunucuda hesaplanmış peak verisi yoksa, parça id'sinden deterministik üretiriz.
function pseudoBars(seed: string, count: number): number[] {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const arr: number[] = [];
  for (let i = 0; i < count; i++) {
    h = (h * 1664525 + 1013904223) >>> 0;
    arr.push(0.25 + ((h % 1000) / 1000) * 0.75);
  }
  return arr;
}

export function Waveform({
  seed,
  bars = 64,
  progress = 0,
  className,
  height = 48,
}: {
  seed: string;
  bars?: number;
  progress?: number;
  className?: string;
  height?: number;
}) {
  const data = pseudoBars(seed, bars);
  const cut = Math.floor(progress * bars);
  return (
    <div
      className={cn("flex items-end gap-[2px] text-accent", className)}
      style={{ height }}
      role="img"
      aria-label="Parça dalga şekli"
    >
      {data.map((v, i) => (
        <span
          key={i}
          className={cn(
            "w-[3px] rounded-sm transition-opacity",
            i < cut ? "opacity-100" : "opacity-40",
          )}
          style={{ height: `${v * 100}%`, background: "currentColor" }}
        />
      ))}
    </div>
  );
}
