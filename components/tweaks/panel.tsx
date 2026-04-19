"use client";

import { IX } from "@/components/ui/icons";
import {
  useTweaks,
  type Accent,
  type CardStyle,
  type Density,
  type Layout,
  type Theme,
} from "@/lib/store/tweaks";

// prototype/src/tweaks.jsx panelinin port'u.
// 4 tema + 3 yoğunluk + 2 layout + 3 kart stili + 7 accent.
// Değişiklikler localStorage'a yazılır (persist middleware) + dataset'e yansır.

const THEMES: { id: Theme; label: string }[] = [
  { id: "cinematic", label: "Sinematik" },
  { id: "anadolu", label: "Anadolu" },
  { id: "editorial", label: "Editoryal" },
  { id: "terminal", label: "Terminal" },
];

const DENSITIES: { id: Density; label: string }[] = [
  { id: "tight", label: "Sıkı" },
  { id: "normal", label: "Normal" },
  { id: "airy", label: "Ferah" },
];

const LAYOUTS: { id: Layout; label: string }[] = [
  { id: "standard", label: "Standart" },
  { id: "compact", label: "Kompakt" },
];

const CARD_STYLES: { id: CardStyle; label: string }[] = [
  { id: "grid", label: "Izgara" },
  { id: "list", label: "Liste" },
  { id: "magazine", label: "Dergi" },
];

const ACCENTS: { id: Accent; label: string; color?: string }[] = [
  { id: "default", label: "Tema" },
  { id: "orange", label: "Turuncu", color: "#e94e1b" },
  { id: "red", label: "Kırmızı", color: "#e30a17" },
  { id: "gold", label: "Altın", color: "#d4a574" },
  { id: "green", label: "Yeşil", color: "#00ff88" },
  { id: "purple", label: "Mor", color: "#7c3aed" },
  { id: "cyan", label: "Cyan", color: "#06b6d4" },
];

export function TweaksPanel({ onClose }: { onClose: () => void }) {
  const tweaks = useTweaks();

  return (
    <div className="tweaks-panel">
      <div className="tweaks-head">
        <div className="tweaks-title">Tema & Görünüm</div>
        <button className="btn-icon" onClick={onClose} aria-label="Kapat">
          <IX size={14} />
        </button>
      </div>
      <div className="tweaks-body">
        <Group label="Tema">
          <div className="tweak-opts">
            {THEMES.map((t) => (
              <button
                key={t.id}
                className={`tweak-opt ${tweaks.theme === t.id ? "active" : ""}`}
                onClick={() => tweaks.set({ theme: t.id })}
              >
                {t.label}
              </button>
            ))}
          </div>
        </Group>

        <Group label="Yoğunluk">
          <div className="tweak-opts">
            {DENSITIES.map((d) => (
              <button
                key={d.id}
                className={`tweak-opt ${tweaks.density === d.id ? "active" : ""}`}
                onClick={() => tweaks.set({ density: d.id })}
              >
                {d.label}
              </button>
            ))}
          </div>
        </Group>

        <Group label="Yerleşim">
          <div className="tweak-opts">
            {LAYOUTS.map((l) => (
              <button
                key={l.id}
                className={`tweak-opt ${tweaks.layout === l.id ? "active" : ""}`}
                onClick={() => tweaks.set({ layout: l.id })}
              >
                {l.label}
              </button>
            ))}
          </div>
        </Group>

        <Group label="Kart Stili">
          <div className="tweak-opts">
            {CARD_STYLES.map((c) => (
              <button
                key={c.id}
                className={`tweak-opt ${tweaks.cardStyle === c.id ? "active" : ""}`}
                onClick={() => tweaks.set({ cardStyle: c.id })}
              >
                {c.label}
              </button>
            ))}
          </div>
        </Group>

        <Group label="Vurgu Rengi">
          <div
            className="tweak-opts"
            style={{ gridTemplateColumns: "repeat(4, 1fr)", gap: 6 }}
          >
            {ACCENTS.map((a) => (
              <button
                key={a.id}
                className={`tweak-opt ${tweaks.accent === a.id ? "active" : ""}`}
                onClick={() => tweaks.set({ accent: a.id })}
                style={a.color ? { borderLeftColor: a.color, borderLeftWidth: 3 } : undefined}
              >
                {a.label}
              </button>
            ))}
          </div>
        </Group>
      </div>
    </div>
  );
}

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="tweak-group-label">{label}</div>
      {children}
    </div>
  );
}
