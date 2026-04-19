"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

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
  set: (patch: Partial<Omit<State, "set" | "apply">>) => void;
  apply: () => void;
};

export const useTweaks = create<State>()(
  persist(
    (set, get) => ({
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

export function ThemeBootstrap() {
  if (typeof window === "undefined") return null;
  // useTweaks ilk render'dan sonra apply çalıştırır; SSR sırasında hidrasyon hatasına engel.
  Promise.resolve().then(() => useTweaks.getState().apply());
  return null;
}
