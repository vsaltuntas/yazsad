import type { Metadata } from "next";
import "../styles/globals.css";

import { ClientRoot } from "@/components/layout/client-root";
import { getAllModules } from "@/lib/modules";

export const metadata: Metadata = {
  title: "YAZSAD — Yapay Zekâ Destekli Müzik Sanatçıları Derneği",
  description:
    "Türkiye'nin AI destekli müzik sanatçıları derneği + platform + marketplace. Şeffaf prompt, etik üretim, toplulukla var.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  openGraph: {
    title: "YAZSAD",
    description:
      "AI destekli müzik sanatçıları derneği. Keşfet, dinle, satın al, toplulukta var.",
    type: "website",
    locale: "tr_TR",
  },
};

// Inline script: hidrasyon öncesi __YAZSAD_DEFAULTS + localStorage'ı okuyup
// <html data-*> attribute'larını set eder. FOUC (flash of unstyled content) önler.
// prototype/index.html'deki mekanizma ile birebir.
const INIT_SCRIPT = `
(function() {
  var DEFAULTS = {
    theme: "editorial",
    density: "normal",
    layout: "standard",
    cardStyle: "grid",
    accent: "default"
  };
  window.__YAZSAD_DEFAULTS = DEFAULTS;
  try {
    var stored = localStorage.getItem("yazsad-tweaks");
    var s = stored ? JSON.parse(stored).state || {} : {};
    var h = document.documentElement;
    h.dataset.theme = s.theme || DEFAULTS.theme;
    h.dataset.density = s.density || DEFAULTS.density;
    h.dataset.layout = s.layout || DEFAULTS.layout;
    h.dataset.cards = s.cardStyle || DEFAULTS.cardStyle;
    var accent = s.accent || DEFAULTS.accent;
    var COLORS = { orange:"#e94e1b", red:"#e30a17", gold:"#d4a574", green:"#00ff88", purple:"#7c3aed", cyan:"#06b6d4" };
    if (accent !== "default" && COLORS[accent]) {
      h.style.setProperty("--accent", COLORS[accent]);
      h.style.setProperty("--accent-soft", COLORS[accent] + "22");
    }
  } catch (e) {}
})();
`.trim();

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const modules = await getAllModules();

  return (
    <html lang="tr" data-theme="editorial" data-density="normal" data-layout="standard" data-cards="grid">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700;9..144,900&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Cormorant+Garamond:wght@400;500;600;700&family=Be+Vietnam+Pro:wght@400;500;600;700&family=Instrument+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        {/* eslint-disable-next-line @next/next/no-head-element */}
        <script dangerouslySetInnerHTML={{ __html: INIT_SCRIPT }} />
      </head>
      <body>
        <ClientRoot modules={modules}>{children}</ClientRoot>
      </body>
    </html>
  );
}
