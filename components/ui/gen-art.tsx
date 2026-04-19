import * as React from "react";

// Tasarım paketindeki GenArt: parça/haber kapağı yerine deterministik degrade.
type Props = {
  g1: string;
  g2: string;
  g3: string;
  seed?: number;
  className?: string;
  children?: React.ReactNode;
};

export function GenArt({ g1, g2, g3, seed = 1, className, children }: Props) {
  const r1 = (seed * 13) % 100;
  const r2 = (seed * 31) % 100;
  const r3 = (seed * 47) % 100;
  return (
    <div
      className={`track-art-gen ${className ?? ""}`}
      style={{
        background: `radial-gradient(circle at ${r1}% ${r2}%, ${g1} 0%, transparent 55%), radial-gradient(circle at ${100 - r1}% ${100 - r3}%, ${g2} 0%, transparent 60%), ${g3}`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          mixBlendMode: "overlay",
          opacity: 0.35,
        }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <circle cx={r1} cy={r3} r={15 + (seed % 10)} fill="white" fillOpacity="0.15" />
        <path
          d={`M0 ${50 + ((seed * 3) % 30)} Q 25 ${20 + ((seed * 7) % 40)}, 50 ${40 + ((seed * 5) % 30)} T 100 ${50 + ((seed * 11) % 30)}`}
          stroke="white"
          strokeOpacity="0.2"
          strokeWidth="0.5"
          fill="none"
        />
      </svg>
      {children}
    </div>
  );
}
