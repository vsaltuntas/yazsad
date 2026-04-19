"use client";

import { GenArt } from "@/components/ui/gen-art";
import { IPlay } from "@/components/ui/icons";
import { usePlayer } from "@/lib/store/player";
import type { SampleTrack } from "@/lib/sample-data";

// prototype/src/page_home.jsx Hero'su birebir.
export function Hero({ track }: { track: SampleTrack }) {
  const play = usePlayer((s) => s.play);
  return (
    <div
      className="hero"
      onClick={() =>
        play({
          id: track.id,
          title: track.title,
          artist: track.artist,
          artistId: track.artistId,
          duration: track.duration,
          g1: track.g1,
          g2: track.g2,
          g3: track.g3,
        })
      }
    >
      <div className="hero-art">
        <GenArt g1={track.g1} g2={track.g2} g3={track.g3} seed={5} />
      </div>
      <div className="hero-overlay" />
      <div className="hero-content">
        <div className="hero-eyebrow">Haftanın Seçkisi · Bu Hafta</div>
        <h1 className="hero-title">{track.title}</h1>
        <p className="hero-desc">
          Anatolian Lab'in 2026 EP'sinden çıkan bu parça, şehir manzarasını synthwave dokularla
          yeniden kuruyor. {track.plays} dinlenmeye ulaşan hafta birincisi.
        </p>
        <div className="hero-cta">
          <button
            className="btn btn-primary"
            onClick={(e) => {
              e.stopPropagation();
              play({
                id: track.id,
                title: track.title,
                artist: track.artist,
                artistId: track.artistId,
                duration: track.duration,
                g1: track.g1,
                g2: track.g2,
                g3: track.g3,
              });
            }}
          >
            <IPlay size={14} />
            Şimdi Dinle
          </button>
          <button className="btn btn-ghost" onClick={(e) => e.stopPropagation()}>
            Detaylar
          </button>
        </div>
      </div>
    </div>
  );
}
