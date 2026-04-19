"use client";

import { usePlayer } from "@/lib/store/player";
import { GenArt } from "@/components/ui/gen-art";
import { IX } from "@/components/ui/icons";

// prototype/src/queue.jsx drawer'ı port.
export function QueueDrawer() {
  const { queue, current, index, toggleDrawer, play } = usePlayer();

  return (
    <>
      <div
        onClick={toggleDrawer}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.4)",
          zIndex: 40,
          animation: "fadeIn 0.2s ease",
        }}
        aria-hidden="true"
      />
      <aside
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 96,
          width: 360,
          maxWidth: "90vw",
          background: "var(--bg-elev)",
          borderLeft: "1px solid var(--border)",
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <header
          style={{
            padding: "var(--dens-4) var(--dens-5)",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              className="mono"
              style={{
                fontSize: 10,
                color: "var(--fg-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Kuyruk
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, marginTop: 2 }}>{queue.length} parça</div>
          </div>
          <button className="btn-icon" onClick={toggleDrawer} aria-label="Kapat">
            <IX size={16} />
          </button>
        </header>

        <div style={{ flex: 1, overflowY: "auto", padding: "var(--dens-3)" }}>
          {queue.length === 0 && (
            <div
              style={{
                padding: "var(--dens-6)",
                textAlign: "center",
                color: "var(--fg-muted)",
                fontSize: 13,
              }}
            >
              Kuyruk boş — parça kartındaki <strong>…</strong> menüsünden ekleyebilirsin.
            </div>
          )}
          {queue.map((t, i) => (
            <button
              key={`${t.id}-${i}`}
              onClick={() => play(t)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                width: "100%",
                padding: 10,
                background:
                  current?.id === t.id && index === i ? "var(--accent-soft)" : "transparent",
                border: "none",
                borderRadius: "var(--radius-md)",
                cursor: "pointer",
                textAlign: "left",
                color: "inherit",
                marginBottom: 2,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "var(--radius-sm)",
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                <GenArt
                  g1={t.g1}
                  g2={t.g2}
                  g3={t.g3}
                  seed={parseInt(t.id.replace(/\D/g, "") || "1", 10)}
                />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {t.title}
                </div>
                <div
                  className="mono"
                  style={{ fontSize: 10, color: "var(--fg-muted)" }}
                >
                  {t.artist}
                </div>
              </div>
              <span className="mono" style={{ fontSize: 11, color: "var(--fg-muted)" }}>
                {t.duration}
              </span>
            </button>
          ))}
        </div>
      </aside>
    </>
  );
}
