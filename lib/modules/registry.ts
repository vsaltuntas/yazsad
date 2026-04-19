import type { ModuleStatus } from "@/lib/db/schema";
import { MODULE_SEED } from "@/lib/db/seed-data";

export type ModuleSnapshot = {
  id: string;
  label: string;
  category: string;
  status: ModuleStatus;
  locked: boolean;
};

// Build-time fallback — DB henüz hazır değilse / prerender sırasında.
const FALLBACK = new Map<string, ModuleSnapshot>(
  MODULE_SEED.map((m) => [
    m.id,
    {
      id: m.id,
      label: m.label,
      category: m.category,
      status: m.status,
      locked: Boolean(m.locked),
    },
  ]),
);

export function fallbackModule(id: string): ModuleSnapshot | null {
  return FALLBACK.get(id) ?? null;
}

export function fallbackAllModules(): ModuleSnapshot[] {
  return [...FALLBACK.values()];
}

export function moduleAccessible(m: ModuleSnapshot | null | undefined): boolean {
  if (!m) return true;
  if (m.locked) return true;
  return m.status !== "passive";
}
