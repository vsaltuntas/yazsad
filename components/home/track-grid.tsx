import type { SampleTrack } from "@/lib/sample-data";
import { TrackCard } from "./track-card";

export function TrackGrid({ tracks }: { tracks: SampleTrack[] }) {
  return (
    <div className="track-grid">
      {tracks.map((t) => (
        <TrackCard key={t.id} track={t} />
      ))}
    </div>
  );
}
