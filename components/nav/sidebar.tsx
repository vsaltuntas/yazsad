"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  IHome,
  ICompass,
  INews,
  IForum,
  ISettings,
  IAdmin,
  ILibrary,
  IUpload,
  IVideo,
  ICart,
  IBell,
  IFire,
  ICheck,
  IUsers,
  IMusic,
  IEdit,
  IMsg,
} from "@/components/ui/icons";
import { buildModuleMap, moduleAccessible, type ModuleSnapshot } from "@/lib/modules";

// prototype/src/nav.jsx Sidebar'ının birebir portu.
// 3 grup × ~25 nav item. Modül durumu 'passive' ise item gizlenir (locked olanlar daima görünür).

type NavItem = {
  id: string;
  href: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  badge?: string | number;
  module?: string;
};

const SECTIONS: { label: string; items: NavItem[] }[] = [
  {
    label: "Keşif",
    items: [
      { id: "home", href: "/", label: "Ana Sayfa", icon: IHome },
      { id: "discover", href: "/kesfet", label: "Keşfet", icon: ICompass },
      { id: "marketplace", href: "/pazar", label: "Marketplace", icon: ICart },
      { id: "promptmarket", href: "/prompt-pazari", label: "Prompt Pazarı", icon: IEdit, badge: "YENİ" },
      { id: "remix", href: "/remix", label: "Remix Studio", icon: IMusic },
      { id: "clips", href: "/klipler", label: "Klipler", icon: IVideo },
      { id: "radio", href: "/radyo", label: "Radyo", icon: IMusic },
      { id: "playlist", href: "/listeler", label: "Playlist", icon: ILibrary },
      { id: "livesessions", href: "/canli-oturum", label: "Canlı Oturum", icon: IVideo, badge: "●" },
      { id: "chat", href: "/sohbet", label: "Sohbet", icon: IMsg },
      { id: "contest", href: "/yarisma", label: "Yarışma", icon: IFire, badge: "YENİ" },
      { id: "news", href: "/haberler", label: "Haberler", icon: INews, badge: 3 },
      { id: "forum", href: "/forum", label: "Forum", icon: IForum, badge: "12" },
    ],
  },
  {
    label: "Kütüphanem",
    items: [
      { id: "library", href: "/kitaplik", label: "Kütüphane", icon: ILibrary },
      { id: "profile", href: "/profil", label: "Profil", icon: IUsers },
      { id: "upload", href: "/yukle", label: "Parça Yükle", icon: IUpload },
      { id: "compliance", href: "/uyum", label: "Uyumluluk Taraması", icon: ICheck },
      { id: "models", href: "/modeller", label: "Model Keşfi", icon: ICompass },
      { id: "lineage", href: "/soy-agaci", label: "Soy Ağacı", icon: ILibrary },
      { id: "styleDNA", href: "/stil-dna", label: "Stil DNA", icon: IFire },
      { id: "aiassist", href: "/ai-asistan", label: "AI Asistan", icon: IMsg, badge: "β" },
      { id: "notifications", href: "/bildirimler", label: "Bildirimler", icon: IBell, badge: "3" },
    ],
  },
  {
    label: "Hesap",
    items: [
      { id: "association", href: "/dernek", label: "Dernek", icon: ICheck },
      { id: "b2b", href: "/b2b", label: "B2B Portal", icon: ICart },
      { id: "settings", href: "/ayarlar", label: "Ayarlar", icon: ISettings },
      { id: "admin", href: "/admin", label: "Yönetim", icon: IAdmin },
    ],
  },
];

export function Sidebar({
  modules,
  mobileOpen,
  setMobileOpen,
}: {
  modules: ModuleSnapshot[];
  mobileOpen: boolean;
  setMobileOpen: (b: boolean) => void;
}) {
  const pathname = usePathname();
  const moduleMap = buildModuleMap(modules);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const isVisible = (item: NavItem) => {
    const id = item.module ?? item.id;
    const m = moduleMap[id];
    return moduleAccessible(m ?? null);
  };

  return (
    <>
      {mobileOpen && (
        <div
          className="sidebar-scrim"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}
      <aside className={`sidebar ${mobileOpen ? "is-open" : ""}`}>
        <div className="logo">
          <div className="logo-mark">Y/</div>
          <div>
            <div className="logo-name">YAZSAD</div>
            <div className="logo-sub">AI Sanatçıları</div>
          </div>
        </div>

        {SECTIONS.map((sec) => {
          const items = sec.items.filter(isVisible);
          if (items.length === 0) return null;
          return (
            <div key={sec.label}>
              <div className="nav-label">{sec.label}</div>
              <div className="nav-section">
                {items.map((item) => {
                  const Icn = item.icon;
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className={`nav-item ${active ? "active" : ""}`}
                      onClick={() => setMobileOpen(false)}
                    >
                      <Icn size={18} />
                      <span className="nav-item-label">{item.label}</span>
                      {item.badge !== undefined && (
                        <span className="nav-badge">{item.badge}</span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}

        <div style={{ marginTop: "auto", padding: "var(--dens-4)" }}>
          <div
            style={{
              padding: "var(--dens-4)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-md)",
              fontSize: 11,
              color: "var(--fg-muted)",
              lineHeight: 1.5,
            }}
          >
            <div
              style={{
                color: "var(--fg)",
                fontWeight: 600,
                fontSize: 12,
                marginBottom: 4,
                fontFamily: "var(--font-mono)",
              }}
            >
              Üye ol
            </div>
            Derneğe katıl, haklarını koru. 2026 aidat: ₺640
            <Link
              href="/uyelik"
              className="btn btn-primary"
              style={{
                width: "100%",
                marginTop: 10,
                fontSize: 11,
                padding: "6px 12px",
                justifyContent: "center",
              }}
            >
              Başvuru
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
