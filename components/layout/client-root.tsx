"use client";

import * as React from "react";

import { Sidebar } from "@/components/nav/sidebar";
import { Topbar } from "@/components/nav/topbar";
import { PlayerBar } from "@/components/player/player-bar";
import { FullPlayer } from "@/components/player/full-player";
import { QueueDrawer } from "@/components/player/queue-drawer";
import { TweaksFab } from "@/components/tweaks/fab";
import { TweaksPanel } from "@/components/tweaks/panel";
import { useTweaks } from "@/lib/store/tweaks";
import { usePlayer } from "@/lib/store/player";
import type { ModuleSnapshot } from "@/lib/modules";

// prototype/src/app.jsx iskeletinin RSC-hidrate versiyonu.
// .app grid'i app.css'te; burada sadece yerleştirme + state wiring.

export function ClientRoot({
  modules,
  children,
}: {
  modules: ModuleSnapshot[];
  children: React.ReactNode;
}) {
  const apply = useTweaks((s) => s.apply);
  const fullPlayerOpen = usePlayer((s) => s.fullPlayer);
  const queueOpen = usePlayer((s) => s.queueDrawer);
  const [mobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);
  const [tweaksOpen, setTweaksOpen] = React.useState(false);

  // Hidrasyon sonrası tweaks'leri uygula (inline script zaten ilk boyada ayarladı)
  React.useEffect(() => {
    apply();
  }, [apply]);

  return (
    <div className="app">
      <Sidebar
        modules={modules}
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
      />
      <Topbar onOpenSidebar={() => setMobileSidebarOpen(true)} />
      <main className="main">{children}</main>
      <div className="player-bar">
        <PlayerBar />
      </div>

      {queueOpen && <QueueDrawer />}
      {fullPlayerOpen && <FullPlayer />}

      {!tweaksOpen && <TweaksFab onClick={() => setTweaksOpen(true)} />}
      {tweaksOpen && <TweaksPanel onClose={() => setTweaksOpen(false)} />}
    </div>
  );
}
