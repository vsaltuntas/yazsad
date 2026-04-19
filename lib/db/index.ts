import "server-only";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres, { type Sql } from "postgres";
import * as schema from "./schema";

export { schema };
export type DB = ReturnType<typeof drizzle<typeof schema>>;

type ClientKind = "anon" | "admin";

// Workers'da her istek kendi connection'ını alır (Supavisor transaction mode).
// Prepared statement'lar kullanılmaz (Supavisor transaction mode ile uyumsuz).
function createSql(url: string): Sql {
  return postgres(url, {
    prepare: false,
    max: 1,
    idle_timeout: 20,
    connect_timeout: 10,
  });
}

const clients = new Map<ClientKind, { sql: Sql; db: DB }>();

function getOrCreate(kind: ClientKind): DB {
  const cached = clients.get(kind);
  if (cached) return cached.db;
  const url =
    kind === "admin"
      ? process.env.DATABASE_URL_ADMIN ?? process.env.DATABASE_URL_DIRECT
      : process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      `DATABASE_URL ${kind === "admin" ? "(admin/direct)" : ""} set edilmemiş. .env.local'i kontrol et.`,
    );
  }
  const sql = createSql(url);
  const db = drizzle(sql, { schema });
  clients.set(kind, { sql, db });
  return db;
}

/**
 * Anonim client — RLS anon rolüyle çalışır. Sunucu tarafı public veriler için.
 */
export function getDb(): DB {
  return getOrCreate("anon");
}

/**
 * Kullanıcı client'ı — Clerk JWT'siyle RLS policy'lerini tetikler.
 * Her çağrı transaction içinde `request.jwt.claims` GUC'unu set eder.
 */
export async function withUser<T>(
  clerkJwtClaims: Record<string, unknown>,
  fn: (db: DB) => Promise<T>,
): Promise<T> {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL set edilmemiş.");
  const sql = createSql(url);
  try {
    const result = (await sql.begin(async (tx) => {
      await tx.unsafe(`select set_config('request.jwt.claims', $1, true)`, [
        JSON.stringify(clerkJwtClaims),
      ]);
      const scopedDb = drizzle(tx as unknown as Sql, { schema });
      return fn(scopedDb);
    })) as T;
    return result;
  } finally {
    await sql.end({ timeout: 5 });
  }
}

/**
 * Admin client — service_role bağlantısı, RLS bypass eder.
 * SADECE admin rotalarında ve webhook handler'larında kullan.
 */
export function getAdminDb(): DB {
  return getOrCreate("admin");
}
