import "server-only";
import { drizzle, type DrizzleD1Database } from "drizzle-orm/d1";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import * as schema from "./schema";

export type DB = DrizzleD1Database<typeof schema>;

let cached: DB | null = null;

export function getDb(): DB {
  if (cached) return cached;
  const { env } = getCloudflareContext();
  // env.DB binding'i wrangler.toml'dan gelir
  const d1 = (env as unknown as { DB: D1Database }).DB;
  if (!d1) {
    throw new Error(
      "D1 binding 'DB' bulunamadı. Yerel için `wrangler d1 migrations apply yazsad --local` çalıştır.",
    );
  }
  cached = drizzle(d1, { schema });
  return cached;
}

export { schema };
