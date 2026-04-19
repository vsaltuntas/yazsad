"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// prototype/src/app.jsx'teki __YAZSAD_DEFAULTS + tweaks state aynasıdır.
// 4 tema + density + layout + kart stili + accent.

export type Theme = "cinematic" | "anadolu" | "editorial" | "terminal";
export type Density = "tight" | "normal" | "airy";
export type Layout = "standard" | "compact";
export type CardStyle = "grid" | "list" | "magazine";
export type Accent = "default" | "orange" | "red" | "gold" | "green" | "purple" | "cyan";

const ACCENT_COLORS: Record<Exclude<Accent, "default">, string> = {
  orange: "#e94e1b",
  red: "#e30a17",
  gold: "#d4a574",
  green: "#00ff88",
  purple: "#7c3aed",
  cyan: "#06b6d4",
};

type State = {
  theme: Theme;
  density: Density;
  layout: Layout;
  cardStyle: CardStyle;
  accent: Accent;
  set: (patch: Partial<Pick<State, "theme" | "density" | "layout" | "cardStyle" | "accent">>) => void;
  apply: () => void;
};

export const useTweaks = create<State>()(
  persist(
    (set, get) => ({
      // index.html'deki defaults ile aynı — editorial açık tema, turuncu accent
      theme: "editorial",
      density: "normal",
      layout: "standard",
      cardStyle: "grid",
      accent: "default",
      set: (patch) => {
        set(patch);
        get().apply();
      },
      apply: () => {
        if (typeof document === "undefined") return;
        const { theme, density, layout, cardStyle, accent } = get();
        const h = document.documentElement;
        h.dataset.theme = theme;
        h.dataset.density = density;
        h.dataset.layout = layout;
        h.dataset.cards = cardStyle;
        if (accent !== "default") {
          const color = ACCENT_COLORS[accent];
          h.style.setProperty("--accent", color);
          h.style.setProperty("--accent-soft", `${color}22`);
        } else {
          h.style.removeProperty("--accent");
          h.style.removeProperty("--accent-soft");
        }
      },
    }),
    { name: "yazsad-tweaks" },
  ),
);
