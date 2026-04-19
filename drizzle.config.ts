import type { Config } from "drizzle-kit";

// Migrations direkt bağlantı üzerinden çalışır (:5432), runtime pooler (:6543).
const url = process.env.DATABASE_URL_DIRECT;

export default {
  schema: "./lib/db/schema.ts",
  out: "./drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: { url: url ?? "" },
  verbose: true,
  strict: true,
} satisfies Config;
