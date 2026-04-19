import { GenArt } from "@/components/ui/gen-art";
import type { SampleNews } from "@/lib/sample-data";

// prototype/src/page_home.jsx "Dernek Günlüğü" bloğu — port.
export function NewsPreview({ items }: { items: SampleNews[] }) {
  return (
    <div className="section">
      <div className="section-head">
        <h2 className="section-title">Dernek Günlüğü</h2>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {items.map((n) => (
          <div
            key={n.id}
            className="news-card"
            style={{ flexDirection: "row", gap: 12, alignItems: "flex-start" }}
          >
            <div
              style={{
                width: 80,
                aspectRatio: "1",
                flexShrink: 0,
                borderRadius: "var(--radius-sm)",
                overflow: "hidden",
              }}
            >
              <GenArt
                g1={n.g1}
                g2={n.g2}
                g3={n.g3}
                seed={parseInt(n.id.replace("n", ""), 10) * 4}
              />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="news-meta" style={{ fontSize: 10 }}>
                <span className="news-meta-cat">{n.category}</span>
                <span>·</span>
                <span>{n.date}</span>
              </div>
              <h3 className="news-title" style={{ fontSize: 14, marginTop: 6 }}>
                {n.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
