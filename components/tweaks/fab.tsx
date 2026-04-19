"use client";

import { ISliders } from "@/components/ui/icons";

export function TweaksFab({ onClick }: { onClick: () => void }) {
  return (
    <button className="tweaks-fab" onClick={onClick} title="Tema & Görünüm" aria-label="Tema ve görünüm ayarları">
      <ISliders size={18} />
    </button>
  );
}
