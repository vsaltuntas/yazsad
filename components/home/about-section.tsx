import { GenArt } from "@/components/ui/gen-art";

// prototype/src/page_home.jsx "YAZSAD Nedir" editöryal blok — port.
export function AboutSection() {
  return (
    <div
      className="section"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "var(--dens-6)",
        alignItems: "center",
        padding: "var(--dens-6)",
        background: "var(--bg-elev)",
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--border)",
      }}
    >
      <div>
        <div
          className="mono"
          style={{
            fontSize: 11,
            color: "var(--accent)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: 12,
          }}
        >
          YAZSAD Nedir
        </div>
        <h2
          className="display"
          style={{
            fontSize: 36,
            fontWeight: 500,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            margin: "0 0 16px",
          }}
        >
          Türkiye'nin ilk AI destekli müzik sanatçıları derneği.
        </h2>
        <p style={{ color: "var(--fg-muted)", fontSize: 14, lineHeight: 1.6, margin: 0 }}>
          Üretici ve dinleyicileri bir araya getiriyoruz. Hakları koruyor, etik çerçeveyi şekillendiriyor,
          topluluk yarışmaları ve canlı etkinlikler düzenliyoruz. 2024'ten beri, 3.8K+ üye.
        </p>
        <div style={{ display: "flex", gap: 32, marginTop: 28 }}>
          <Stat label="Aktif üye" value="3,847" />
          <Stat label="Parça" value="12.6K" />
          <Stat label="Bahar Festivali" value="2026" />
        </div>
      </div>
      <div
        style={{
          aspectRatio: "1",
          borderRadius: "var(--radius-md)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <GenArt g1="#e94e1b" g2="#d4a574" g3="#1a1410" seed={99} />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="display" style={{ fontSize: 28, fontWeight: 500 }}>
        {value}
      </div>
      <div
        className="mono"
        style={{
          fontSize: 10,
          color: "var(--fg-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
        }}
      >
        {label}
      </div>
    </div>
  );
}
