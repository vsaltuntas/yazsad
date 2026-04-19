import type { Config } from "tailwindcss";

const config: Config = {
  // Tasarım kendi tokens.css'inde 4 temayı [data-theme] ile yönetiyor.
  // Tailwind sadece utility yardımcıları için var; renkleri var(--token) köprüsüyle dönüyoruz.
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  corePlugins: {
    preflight: true,
  },
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
    },
  },
  plugins: [],
};

export default config;
