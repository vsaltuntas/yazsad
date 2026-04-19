import { AboutSection } from "@/components/home/about-section";
import { FeaturedArtist } from "@/components/home/featured-artist";
import { Hero } from "@/components/home/hero";
import { NewsPreview } from "@/components/home/news-preview";
import { TrackGrid } from "@/components/home/track-grid";
import { SAMPLE_NEWS, SAMPLE_TRACKS } from "@/lib/sample-data";

// prototype/src/page_home.jsx HomePage'in birebir kompozisyonu.
// RSC — veriler sabit; PR-A merge olunca DB'ye bağlanır.

export default function HomePage() {
  const hero = SAMPLE_TRACKS[4]!; // Neon Minare
  const featured = SAMPLE_TRACKS.slice(0, 6);
  const recent = SAMPLE_TRACKS.slice(6, 12);
  const anatolian = SAMPLE_TRACKS.filter((t) => t.artist === "Anatolian Lab");

  return (
    <div className="page">
      <Hero track={hero} />

      <AboutSection />

      <div className="section">
        <div className="section-head">
          <h2 className="section-title">Haftanın Öne Çıkanları</h2>
          <a className="section-more" href="/kesfet">
            Tümünü gör →
          </a>
        </div>
        <TrackGrid tracks={featured} />
      </div>

      <div className="two-col">
        <div className="section">
          <div className="section-head">
            <h2 className="section-title">Yeni Eklenenler</h2>
            <a className="section-more" href="/kesfet">
              Keşfet →
            </a>
          </div>
          <TrackGrid tracks={recent} />
        </div>

        <NewsPreview items={SAMPLE_NEWS.slice(0, 3)} />
      </div>

      <FeaturedArtist tracks={anatolian} />
    </div>
  );
}
