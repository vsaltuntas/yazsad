import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

async function main() {
  const url = process.env.DATABASE_URL_DIRECT ?? process.env.DATABASE_URL;
  if (!url) {
    console.error("DATABASE_URL_DIRECT (veya DATABASE_URL) set edilmeli.");
    process.exit(1);
  }

  console.log("→ Drizzle migrations uygulanıyor…");
  const migrationClient = postgres(url, { max: 1, prepare: false });
  const db = drizzle(migrationClient);
  await migrate(db, { migrationsFolder: "./drizzle/migrations" });
  console.log("✓ Schema migrations tamam.");

  const policiesPath = join(process.cwd(), "drizzle", "policies.sql");
  if (existsSync(policiesPath)) {
    console.log("→ RLS policies uygulanıyor (idempotent)…");
    const sqlText = readFileSync(policiesPath, "utf8");
    await migrationClient.unsafe(sqlText);
    console.log("✓ RLS policies + tsvector tetikleyicileri uygulandı.");
  } else {
    console.warn("UYARI: drizzle/policies.sql bulunamadı — RLS uygulanmadı.");
  }

  await migrationClient.end({ timeout: 5 });
  console.log("✓ Tamam.");
}

main().catch((err) => {
  console.error("Migration başarısız:", err);
  process.exit(1);
});
