import "server-only";
import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";

import { getDb, schema } from "@/lib/db";
import { fallbackAllModules, fallbackModule, moduleAccessible, type ModuleSnapshot } from "./registry";

async function loadAll(): Promise<ModuleSnapshot[]> {
  try {
    const db = getDb();
    const rows = await db.select().from(schema.modules).all();
    if (rows.length === 0) return fallbackAllModules();
    return rows.map((r) => ({
      id: r.id,
      label: r.label,
      category: r.category,
      status: r.status,
      locked: r.locked,
    }));
  } catch {
    return fallbackAllModules();
  }
}

export const getAllModules = unstable_cache(loadAll, ["yazsad-modules"], {
  revalidate: 60,
  tags: ["modules"],
});

export async function getModule(id: string): Promise<ModuleSnapshot | null> {
  const all = await getAllModules();
  return all.find((m) => m.id === id) ?? fallbackModule(id);
}

export async function requireModule(id: string): Promise<ModuleSnapshot> {
  const m = await getModule(id);
  if (!m) notFound();
  if (!moduleAccessible(m)) notFound();
  return m;
}

export async function isModuleEnabled(id: string): Promise<boolean> {
  const m = await getModule(id);
  return moduleAccessible(m);
}
