import type { Config } from "tailwindcss";

// TASARIM FIDELITY KURALLARI:
// - Tüm renkler prototype/src/tokens.css'teki CSS değişkenleridir — var(--token)
// - Hex ya da hsl() burada sabitlenmez; 4 tema (cinematic / anadolu / editorial / terminal)
//   data-theme ile çalıştığı için hardcode TASARIMI KIRAR
// - Spacing: prototype'taki --dens-N değişkenleri kullanılır
// - Radius: prototype'taki --radius-* değişkenleri kullanılır
// - class adları .hero, .track-card, .nav-item, .ai-tag, .section-title vs. app.css'ten
//   Tailwind SADECE layout yardımcısı olarak (flex/grid/spacing) — renk Tailwind'de yok

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        elev: "var(--bg-elev)",
        elev2: "var(--bg-elev-2)",
        hover: "var(--bg-hover)",
        fg: "var(--fg)",
        muted: "var(--fg-muted)",
        dim: "var(--fg-dim)",
        line: "var(--border)",
        lineStrong: "var(--border-strong)",
        accent: "var(--accent)",
        "accent-fg": "var(--accent-fg)",
        "accent-soft": "var(--accent-soft)",
        ok: "var(--success)",
        err: "var(--danger)",
        warn: "var(--warning)",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      borderRadius: {
        xs: "var(--radius-xs)",
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        full: "var(--radius-full)",
      },
      spacing: {
        "d-1": "var(--dens-1)",
        "d-2": "var(--dens-2)",
        "d-3": "var(--dens-3)",
        "d-4": "var(--dens-4)",
        "d-5": "var(--dens-5)",
        "d-6": "var(--dens-6)",
        "d-7": "var(--dens-7)",
        "d-8": "var(--dens-8)",
      },
    },
  },
  plugins: [],
};

export default config;
