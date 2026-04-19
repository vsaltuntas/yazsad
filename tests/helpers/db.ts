import { drizzle } from "drizzle-orm/postgres-js";
import postgres, { type Sql } from "postgres";
import * as schema from "@/lib/db/schema";

export type TestDb = ReturnType<typeof drizzle<typeof schema>>;

export function testDbUrl(): string | null {
  return process.env.DATABASE_URL_TEST ?? null;
}

export function connect(url: string): { sql: Sql; db: TestDb } {
  const sql = postgres(url, { prepare: false, max: 1 });
  const db = drizzle(sql, { schema });
  return { sql, db };
}

/**
 * Bir JWT claim setiyle scoped sorgular çalıştırır.
 * İşlem sonunda transaction'ı rollback eder — test verileri kalıcı olmaz.
 */
export async function withClaims<T>(
  sql: Sql,
  claims: Record<string, unknown>,
  fn: (db: TestDb) => Promise<T>,
): Promise<T> {
  return sql.begin(async (tx) => {
    await tx.unsafe(`select set_config('request.jwt.claims', $1, true)`, [
      JSON.stringify(claims),
    ]);
    const db = drizzle(tx as unknown as Sql, { schema });
    const result = await fn(db);
    // Test izolasyonu için her zaman rollback
    throw new RollbackMarker(result);
  }) as never;
}

class RollbackMarker<T> extends Error {
  constructor(public readonly value: T) {
    super("__rollback__");
  }
}

export async function inRollback<T>(
  sql: Sql,
  claims: Record<string, unknown>,
  fn: (db: TestDb) => Promise<T>,
): Promise<T> {
  try {
    await withClaims(sql, claims, fn);
    throw new Error("Beklenen rollback olmadı");
  } catch (err) {
    if (err instanceof RollbackMarker) return err.value as T;
    throw err;
  }
}

/**
 * Admin (service_role) olarak sorgu çalıştırır — RLS bypass eder.
 * Test setup'ında veri kurmak için.
 */
export async function asAdmin<T>(sql: Sql, fn: (db: TestDb) => Promise<T>): Promise<T> {
  return inRollback(sql, { role: "service_role" }, fn);
}
