"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { IBell, ICart, ISearch, IX } from "@/components/ui/icons";

// prototype/src/nav.jsx Topbar'ı. Breadcrumb + ⌘K arama + bildirim/sepet/kullanıcı.

type RouteLabel = { eyebrow: string; title: string };

const ROUTE_LABELS: Record<string, RouteLabel> = {
  "/": { eyebrow: "Giriş", title: "Ana Sayfa" },
  "/kesfet": { eyebrow: "Katalog", title: "Keşfet" },
  "/arama": { eyebrow: "Arama", title: "Arama" },
  "/pazar": { eyebrow: "Ticaret", title: "Marketplace" },
  "/sepet": { eyebrow: "Ticaret", title: "Sepet & Ödeme" },
  "/klipler": { eyebrow: "Video", title: "AI Klipler" },
  "/yarisma": { eyebrow: "Topluluk", title: "Yarışma" },
  "/haberler": { eyebrow: "Yayın", title: "Haberler" },
  "/forum": { eyebrow: "Topluluk", title: "Forum" },
  "/kitaplik": { eyebrow: "Hesap", title: "Kütüphane" },
  "/profil": { eyebrow: "Sanatçı", title: "Profil" },
  "/yukle": { eyebrow: "Sanatçı", title: "Parça Yükle" },
  "/bildirimler": { eyebrow: "Hesap", title: "Bildirimler" },
  "/ayarlar": { eyebrow: "Hesap", title: "Ayarlar" },
  "/admin": { eyebrow: "Panel", title: "Yönetim" },
  "/dernek": { eyebrow: "Kurum", title: "Dernek" },
  "/uyelik": { eyebrow: "Başvuru", title: "Üyelik" },
};

export function Topbar({ onOpenSidebar }: { onOpenSidebar: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [query, setQuery] = React.useState("");
  const [focused, setFocused] = React.useState(false);

  const crumb = React.useMemo<RouteLabel>(() => {
    const matched = Object.keys(ROUTE_LABELS).find((k) =>
      k === "/" ? pathname === "/" : pathname.startsWith(k),
    );
    return matched ? ROUTE_LABELS[matched]! : { eyebrow: "", title: "" };
  }, [pathname]);

  // ⌘K / Ctrl+K shortcut
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }
      if (e.key === "Escape" && document.activeElement === inputRef.current) {
        inputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isMac = typeof navigator !== "undefined" && /Mac/.test(navigator.platform);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/arama?q=${encodeURIComponent(query)}`);
  };

  return (
    <header className="topbar">
      <button
        className="sidebar-toggle btn-icon"
        onClick={onOpenSidebar}
        aria-label="Menüyü aç"
        style={{ display: "none" }}
      >
        <span
          style={{
            width: 14,
            height: 10,
            display: "inline-flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <span style={{ width: "100%", height: 1.5, background: "currentColor" }} />
          <span style={{ width: "100%", height: 1.5, background: "currentColor" }} />
          <span style={{ width: "100%", height: 1.5, background: "currentColor" }} />
        </span>
      </button>

      <div
        className="topbar-crumb"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          flexShrink: 0,
          whiteSpace: "nowrap",
        }}
      >
        <span
          className="mono"
          style={{
            fontSize: 10,
            color: "var(--fg-dim)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          {crumb.eyebrow} /
        </span>
        <span style={{ fontSize: 13, fontWeight: 600 }}>{crumb.title}</span>
      </div>

      <form onSubmit={submit} className="search" style={{ position: "relative" }}>
        <ISearch size={16} className="search-icon" />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          placeholder="Parça, sanatçı, haber ara…"
        />
        {!focused && !query && (
          <kbd
            style={{
              position: "absolute",
              right: 10,
              top: "50%",
              transform: "translateY(-50%)",
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              color: "var(--fg-dim)",
              background: "var(--bg-elev-2)",
              border: "1px solid var(--border)",
              borderRadius: 4,
              padding: "2px 6px",
              pointerEvents: "none",
            }}
          >
            {isMac ? "⌘" : "Ctrl"} K
          </kbd>
        )}
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="btn-icon"
            style={{
              position: "absolute",
              right: 6,
              top: "50%",
              transform: "translateY(-50%)",
              width: 24,
              height: 24,
            }}
            aria-label="Temizle"
          >
            <IX size={12} />
          </button>
        )}
      </form>

      <div className="topbar-user" style={{ marginLeft: "auto", position: "relative" }}>
        <Link href="/bildirimler" className="btn-icon" aria-label="Bildirimler">
          <IBell size={16} />
        </Link>
        <Link href="/sepet" className="btn-icon" aria-label="Sepet">
          <ICart size={16} />
        </Link>
        <div
          style={{
            width: 1,
            height: 20,
            background: "var(--border)",
            margin: "0 6px",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Link
            href="/giris"
            className="btn btn-ghost"
            style={{ fontSize: 12, padding: "6px 12px" }}
          >
            Giriş
          </Link>
          <Link
            href="/kayit"
            className="btn btn-primary"
            style={{ fontSize: 12, padding: "6px 14px" }}
          >
            Kayıt Ol
          </Link>
        </div>
      </div>
    </header>
  );
}
