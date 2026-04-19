"use client";

import { usePlayer } from "@/lib/store/player";
import { GenArt } from "@/components/ui/gen-art";
import { IDown, IHeart, IPause, IPlay, IRepeat, IShuffle, ISkipB, ISkipF } from "@/components/ui/icons";

// prototype/src/player.jsx FullPlayer'ı port.
export function FullPlayer() {
  const { current, playing, toggle, next, prev, closeFull, progress, shuffle, repeat, setShuffle, cycleRepeat } = usePlayer();
  if (!current) return null;
  const seed = parseInt(current.id.replace(/\D/g, "") || "1", 10);

  return (
    <div className="full-player">
      <div className="full-player-bg">
        <GenArt g1={current.g1} g2={current.g2} g3={current.g3} seed={seed} />
      </div>
      <button className="full-player-close" onClick={closeFull} aria-label="Tam ekranı kapat">
        <IDown size={20} />
      </button>
      <div className="full-player-content">
        <div className="full-player-art">
          <GenArt g1={current.g1} g2={current.g2} g3={current.g3} seed={seed} />
        </div>
        <div className="play-info">
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
            Şimdi Çalıyor
          </div>
          <h1>{current.title}</h1>
          <span className="artist-link">{current.artist}</span>
          <div style={{ height: 4, background: "var(--border)", borderRadius: 2, marginTop: 32 }}>
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                background: "var(--accent)",
                borderRadius: 2,
              }}
            />
          </div>
          <div className="icon-row" style={{ marginTop: 24, justifyContent: "center" }}>
            <button
              className="btn-icon"
              onClick={() => setShuffle(!shuffle)}
              style={{ color: shuffle ? "var(--accent)" : undefined }}
              aria-label="Karıştır"
            >
              <IShuffle size={18} />
            </button>
            <button className="btn-icon" onClick={prev} aria-label="Önceki">
              <ISkipB size={18} />
            </button>
            <button
              onClick={toggle}
              aria-label={playing ? "Duraklat" : "Oynat"}
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "var(--fg)",
                color: "var(--bg)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "none",
              }}
            >
              {playing ? <IPause size={22} /> : <IPlay size={22} />}
            </button>
            <button className="btn-icon" onClick={next} aria-label="Sonraki">
              <ISkipF size={18} />
            </button>
            <button
              className="btn-icon"
              onClick={cycleRepeat}
              style={{ color: repeat !== "off" ? "var(--accent)" : undefined }}
              aria-label="Tekrar"
            >
              <IRepeat size={18} />
            </button>
          </div>
          <div
            style={{
              display: "flex",
              gap: 16,
              marginTop: 32,
              justifyContent: "center",
            }}
          >
            <button className="btn btn-ghost">
              <IHeart size={14} />
              Beğen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
