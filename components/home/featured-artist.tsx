"use client";

import { GenArt } from "@/components/ui/gen-art";
import { usePlayer } from "@/lib/store/player";
import type { SampleTrack } from "@/lib/sample-data";

// prototype/src/page_home.jsx "Ayın Sanatçısı" bloğu.
export function FeaturedArtist({ tracks }: { tracks: SampleTrack[] }) {
  const current = usePlayer((s) => s.current);
  const play = usePlayer((s) => s.play);

  return (
    <div className="section">
      <div className="section-head">
        <h2 className="section-title">Ayın Sanatçısı · Anatolian Lab</h2>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr",
          gap: "var(--dens-6)",
          padding: "var(--dens-6)",
          background: "var(--bg-elev)",
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--border)",
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
            <div
              className="avatar avatar-xl"
              style={{ background: "linear-gradient(135deg, #e94e1b, #7c3aed)" }}
            >
              AL
            </div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>Anatolian Lab</div>
              <div
                className="mono"
                style={{
                  fontSize: 11,
                  color: "var(--fg-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                İstanbul · 24 parça · 14.2K takipçi
              </div>
            </div>
          </div>
          <p style={{ color: "var(--fg-muted)", fontSize: 14, lineHeight: 1.6, margin: 0 }}>
            "AI bir ajan değil, bir enstrüman — ben notayı koyarım" diyen Anatolian Lab, 2026
            Bahar'da üçüncü EP'si "Boğaz"ı yayınladı. Synthwave'den ambient'e, İstanbul manzarasını
            elektronik dokularla yeniden yazan sanatçı, derneğimizin kurucu üyelerinden.
          </p>
          <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
            <button className="btn btn-primary">Profili Gör</button>
            <button className="btn btn-ghost">Takip Et</button>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {tracks.map((t) => {
            const seed = parseInt(t.id.replace(/\D/g, "") || "1", 10);
            return (
              <div
                key={t.id}
                onClick={() =>
                  play({
                    id: t.id,
                    title: t.title,
                    artist: t.artist,
                    artistId: t.artistId,
                    duration: t.duration,
                    g1: t.g1,
                    g2: t.g2,
                    g3: t.g3,
                  })
                }
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: 10,
                  background: current?.id === t.id ? "var(--accent-soft)" : "transparent",
                  borderRadius: "var(--radius-md)",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "var(--radius-sm)",
                    overflow: "hidden",
                  }}
                >
                  <GenArt g1={t.g1} g2={t.g2} g3={t.g3} seed={seed} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{t.title}</div>
                  <div className="mono" style={{ fontSize: 10, color: "var(--fg-muted)" }}>
                    {t.plays} dinlenme
                  </div>
                </div>
                <span className="mono" style={{ fontSize: 11, color: "var(--fg-muted)" }}>
                  {t.duration}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
