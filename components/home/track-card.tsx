"use client";

import { GenArt } from "@/components/ui/gen-art";
import { IPlay } from "@/components/ui/icons";
import { usePlayer } from "@/lib/store/player";
import type { SampleTrack } from "@/lib/sample-data";

// prototype/src/page_home.jsx TrackCard birebir.
export function TrackCard({ track }: { track: SampleTrack }) {
  const current = usePlayer((s) => s.current);
  const play = usePlayer((s) => s.play);
  const seed = parseInt(track.id.replace(/\D/g, "") || "1", 10);
  const active = current?.id === track.id;

  return (
    <div
      className="track-card"
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
      style={active ? { background: "var(--bg-hover)" } : undefined}
    >
      <div className="track-art">
        <GenArt g1={track.g1} g2={track.g2} g3={track.g3} seed={seed} />
        <button className="track-play" aria-label="Oynat">
          <IPlay size={16} />
        </button>
        {track.ai && (
          <span className="ai-tag" style={{ position: "absolute", top: 8, left: 8 }}>
            AI
          </span>
        )}
      </div>
      <div className="track-info">
        <div className="track-title">{track.title}</div>
        <div className="track-artist">{track.artist}</div>
      </div>
    </div>
  );
}
