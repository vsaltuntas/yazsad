"use client";

import { usePlayer } from "@/lib/store/player";
import { GenArt } from "@/components/ui/gen-art";
import { IExpand, IHeart, IList, IPause, IPlay, IRepeat, IShuffle, ISkipB, ISkipF, IVolume } from "@/components/ui/icons";

// prototype/src/player.jsx PlayerBar'ı birebir port.
// 320px / 1fr / 320px grid: track info | transport + waveform | volume + queue

function bars(seed: string, count = 48): number[] {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const arr: number[] = [];
  for (let i = 0; i < count; i++) {
    h = (h * 1664525 + 1013904223) >>> 0;
    arr.push(0.25 + ((h % 1000) / 1000) * 0.75);
  }
  return arr;
}

export function PlayerBar() {
  const { current, playing, toggle, next, prev, progress, setProgress, shuffle, setShuffle, repeat, cycleRepeat, openFull, toggleDrawer } =
    usePlayer();

  if (!current) {
    return (
      <div className="player-bar-grid" style={{ height: 72, padding: "0 var(--dens-5)", alignItems: "center" }}>
        <div className="mono" style={{ color: "var(--fg-dim)", fontSize: 11 }}>
          Dinlemeye başlamak için bir parça seç
        </div>
        <div />
        <div />
      </div>
    );
  }

  const seed = current.id;
  const waveform = bars(seed);
  const playedIdx = Math.floor((progress / 100) * waveform.length);

  return (
    <div
      className="player-bar-grid"
      style={{
        gridTemplateColumns: "320px 1fr 320px",
        padding: "0 var(--dens-4)",
        alignItems: "center",
        height: 72,
      }}
    >
      {/* SOL: Parça bilgisi */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: "var(--radius-sm)",
            overflow: "hidden",
            flexShrink: 0,
          }}
        >
          <GenArt g1={current.g1} g2={current.g2} g3={current.g3} seed={parseInt(current.id.replace(/\D/g, "") || "1", 10)} />
        </div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {current.title}
          </div>
          <div
            className="mono"
            style={{
              fontSize: 11,
              color: "var(--fg-muted)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {current.artist}
          </div>
        </div>
        <button className="btn-icon" aria-label="Beğen">
          <IHeart size={16} />
        </button>
      </div>

      {/* ORTA: Transport + waveform */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "0 var(--dens-4)" }}>
        <div className="icon-row">
          <button
            className="btn-icon"
            onClick={() => setShuffle(!shuffle)}
            style={{ color: shuffle ? "var(--accent)" : undefined }}
            aria-label="Karıştır"
          >
            <IShuffle size={16} />
          </button>
          <button className="btn-icon" onClick={prev} aria-label="Önceki">
            <ISkipB size={16} />
          </button>
          <button
            onClick={toggle}
            aria-label={playing ? "Duraklat" : "Oynat"}
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "var(--fg)",
              color: "var(--bg)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "none",
            }}
          >
            {playing ? <IPause size={16} /> : <IPlay size={16} />}
          </button>
          <button className="btn-icon" onClick={next} aria-label="Sonraki">
            <ISkipF size={16} />
          </button>
          <button
            className="btn-icon"
            onClick={cycleRepeat}
            style={{ color: repeat !== "off" ? "var(--accent)" : undefined }}
            aria-label="Tekrar"
          >
            <IRepeat size={16} />
          </button>
        </div>
        <div
          style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", maxWidth: 560 }}
          onClick={(e) => {
            const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
            const pct = ((e.clientX - rect.left) / rect.width) * 100;
            setProgress(pct);
          }}
        >
          <span className="mono" style={{ fontSize: 10, color: "var(--fg-dim)", minWidth: 32 }}>
            {formatProgress(progress, current.duration)}
          </span>
          <div className="waveform" style={{ cursor: "pointer" }}>
            {waveform.map((v, i) => (
              <div
                key={i}
                className={`waveform-bar ${i < playedIdx ? "played" : ""}`}
                style={{ height: `${v * 100}%` }}
              />
            ))}
          </div>
          <span className="mono" style={{ fontSize: 10, color: "var(--fg-dim)", minWidth: 32 }}>
            {current.duration}
          </span>
        </div>
      </div>

      {/* SAĞ: Volume + queue + expand */}
      <div style={{ display: "flex", alignItems: "center", gap: 4, justifyContent: "flex-end" }}>
        <button className="btn-icon" onClick={toggleDrawer} aria-label="Kuyruğu aç">
          <IList size={16} />
        </button>
        <button className="btn-icon" aria-label="Ses seviyesi">
          <IVolume size={16} />
        </button>
        <button className="btn-icon" onClick={openFull} aria-label="Tam ekran">
          <IExpand size={16} />
        </button>
      </div>
    </div>
  );
}

function formatProgress(progressPct: number, duration: string): string {
  // "3:42" → 222 sn → progress% * 222
  const [m, s] = duration.split(":").map(Number);
  const total = (m ?? 0) * 60 + (s ?? 0);
  const cur = Math.floor((progressPct / 100) * total);
  const mm = Math.floor(cur / 60);
  const ss = (cur % 60).toString().padStart(2, "0");
  return `${mm}:${ss}`;
}
