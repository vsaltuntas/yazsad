/* eslint-disable no-console */
import { execSync } from "node:child_process";
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

import {
  MODULE_SEED,
  FORUM_CATEGORIES_SEED,
  DEMO_GENRES,
  DEMO_MOODS,
  AI_MODELS,
} from "../lib/db/seed-data";

// Bu betik wrangler üzerinden D1'e SQL gönderir.
// Yerel: `pnpm db:seed`  → wrangler d1 execute yazsad --local --file ...
// Uzak:  `pnpm db:seed -- --remote`

function sqlEscape(v: string | number | boolean | null): string {
  if (v === null) return "NULL";
  if (typeof v === "number") return String(v);
  if (typeof v === "boolean") return v ? "1" : "0";
  return `'${v.replace(/'/g, "''")}'`;
}

function buildSql(): string {
  const lines: string[] = [];
  const now = Date.now();

  lines.push("-- yazsad seed");
  lines.push("BEGIN TRANSACTION;");

  // modules
  lines.push("DELETE FROM modules;");
  for (const m of MODULE_SEED) {
    lines.push(
      `INSERT INTO modules (id, label, category, status, locked, description, updated_at) VALUES (${[
        sqlEscape(m.id),
        sqlEscape(m.label),
        sqlEscape(m.category),
        sqlEscape(m.status),
        sqlEscape(Boolean(m.locked)),
        sqlEscape(m.description ?? null),
        now,
      ].join(", ")});`,
    );
  }

  // forum kategorileri
  lines.push("DELETE FROM forum_categories;");
  for (const c of FORUM_CATEGORIES_SEED) {
    lines.push(
      `INSERT INTO forum_categories (id, slug, title, description, position) VALUES (${[
        sqlEscape(`cat_${c.slug}`),
        sqlEscape(c.slug),
        sqlEscape(c.title),
        sqlEscape(c.description),
        c.position,
      ].join(", ")});`,
    );
  }

  // demo admin + sanatçı + dinleyici
  const adminId = "usr_demo_admin";
  const artistUserId = "usr_demo_artist";
  const listenerUserId = "usr_demo_listener";
  const artistId = "art_demo";

  lines.push("DELETE FROM users WHERE id IN ('usr_demo_admin','usr_demo_artist','usr_demo_listener');");
  for (const u of [
    { id: adminId, email: "admin@yazsad.org", username: "yonetim", display: "YAZSAD Yönetim", role: "admin" },
    { id: artistUserId, email: "anatolab@yazsad.org", username: "anatolab", display: "Anatolian Lab", role: "artist" },
    { id: listenerUserId, email: "deniz@example.com", username: "deniz", display: "Deniz Kara", role: "listener" },
  ]) {
    lines.push(
      `INSERT INTO users (id, email, username, display_name, role, kvkk_accepted_at, kvkk_version, created_at, updated_at) VALUES (${[
        sqlEscape(u.id),
        sqlEscape(u.email),
        sqlEscape(u.username),
        sqlEscape(u.display),
        sqlEscape(u.role),
        now,
        sqlEscape("2026-04-01"),
        now,
        now,
      ].join(", ")});`,
    );
  }

  // sanatçı profili
  lines.push(`DELETE FROM artists WHERE id = '${artistId}';`);
  lines.push(
    `INSERT INTO artists (id, user_id, slug, stage_name, genres, tools_used, verified, featured, created_at) VALUES (${[
      sqlEscape(artistId),
      sqlEscape(artistUserId),
      sqlEscape("anatolian-lab"),
      sqlEscape("Anatolian Lab"),
      sqlEscape(JSON.stringify(["Ambient", "Folktronica", "Türkü-tronik"])),
      sqlEscape(JSON.stringify(["Suno v4.5", "Stable Audio 2.0"])),
      sqlEscape(true),
      sqlEscape(true),
      now,
    ].join(", ")});`,
  );

  // demo albüm
  const albumId = "alb_bogaz";
  lines.push(`DELETE FROM albums WHERE id = '${albumId}';`);
  lines.push(
    `INSERT INTO albums (id, artist_id, title, slug, description, release_date, price, status, track_count, total_duration, created_at) VALUES (${[
      sqlEscape(albumId),
      sqlEscape(artistId),
      sqlEscape("Boğaz"),
      sqlEscape("bogaz"),
      sqlEscape("Marmara'nın iki yakası arasında salınan bir akustik günlük."),
      sqlEscape("2026-03-15"),
      4900,
      sqlEscape("approved"),
      3,
      678,
      now,
    ].join(", ")});`,
  );

  // demo parçalar
  const tracksDemo = [
    {
      id: "trk_bogaz_sisinde",
      title: "Boğaz Sisinde",
      slug: "bogaz-sisinde",
      duration: 222,
      bpm: 92,
      key: "Am",
      genres: ["Ambient", "Folktronica"],
      moods: ["Hüzünlü", "Mistik"],
      model: "Suno v4.5",
      prompt:
        "Ambient turkish folk, dreamy ney + analog pads, Bosphorus fog at dawn, 90 bpm, A minor",
      price: 7900,
      plays: 2458,
      likes: 341,
    },
    {
      id: "trk_kasimpasa_gece",
      title: "Kasımpaşa Gecesi",
      slug: "kasimpasa-gecesi",
      duration: 198,
      bpm: 78,
      key: "Cm",
      genres: ["Türkü-tronik"],
      moods: ["Karanlık", "Nostaljik"],
      model: "Stable Audio 2.0",
      prompt:
        "Lo-fi anatolian dub, baglama loops, vinyl crackle, dark alley jazz, 78 bpm, C minor",
      price: 4900,
      plays: 1820,
      likes: 219,
    },
    {
      id: "trk_kapali_carsi",
      title: "Kapalıçarşı 04:12",
      slug: "kapali-carsi-04-12",
      duration: 258,
      bpm: 110,
      key: "Dm",
      genres: ["Cinematic", "Folktronica"],
      moods: ["Coşkulu", "Hipnotik"],
      model: "Suno v4",
      prompt:
        "Cinematic anatolian electronica, kanun + 808s, golden hour, 110 bpm, D minor",
      price: 9900,
      plays: 4019,
      likes: 588,
    },
  ];

  lines.push(`DELETE FROM tracks WHERE artist_id = '${artistId}';`);
  for (const t of tracksDemo) {
    lines.push(
      `INSERT INTO tracks (id, artist_id, album_id, title, slug, audio_url, audio_format, audio_size, duration, bpm, musical_key, genres, moods, ai_model, ai_prompt, available_licenses, price, status, play_count, like_count, published_at, created_at, updated_at) VALUES (${[
        sqlEscape(t.id),
        sqlEscape(artistId),
        sqlEscape(albumId),
        sqlEscape(t.title),
        sqlEscape(t.slug),
        sqlEscape(`https://media.yazsad.org/demo/${t.slug}.mp3`),
        sqlEscape("mp3"),
        8421634,
        t.duration,
        t.bpm,
        sqlEscape(t.key),
        sqlEscape(JSON.stringify(t.genres)),
        sqlEscape(JSON.stringify(t.moods)),
        sqlEscape(t.model),
        sqlEscape(t.prompt),
        sqlEscape(JSON.stringify(["personal", "commercial"])),
        t.price,
        sqlEscape("approved"),
        t.plays,
        t.likes,
        now,
        now,
        now,
      ].join(", ")});`,
    );
  }

  // demo haber
  lines.push("DELETE FROM news_articles WHERE slug = 'aclis-duyurusu';");
  lines.push(
    `INSERT INTO news_articles (id, slug, title, excerpt, body, category, author_id, published_at, created_at) VALUES (${[
      sqlEscape("nws_acilis"),
      sqlEscape("aclis-duyurusu"),
      sqlEscape("YAZSAD açıldı: AI müziğinde şeffaf bir adres"),
      sqlEscape("Türkiye'de AI destekli müzik üreten sanatçılar için bir dernek + platform."),
      sqlEscape(
        "## Açılıyoruz\n\nYAZSAD bugün herkese açık. Hak savunuculuğu, etik ilkeler ve şeffaf gelir için bir aradayız.\n\n*Hoş geldiniz.*",
      ),
      sqlEscape("Duyuru"),
      sqlEscape(adminId),
      now,
      now,
    ].join(", ")});`,
  );

  // referans demo verisi (genres/moods/aiModels seçenek listesi olarak app içinde kullanılır)
  void DEMO_GENRES;
  void DEMO_MOODS;
  void AI_MODELS;

  lines.push("COMMIT;");
  return lines.join("\n");
}

function main() {
  const sql = buildSql();
  const dir = join(process.cwd(), "drizzle");
  mkdirSync(dir, { recursive: true });
  const file = join(dir, "seed.sql");
  writeFileSync(file, sql, "utf8");
  console.log(`Seed SQL yazıldı: ${file}`);

  const remote = process.argv.includes("--remote");
  const cmd = `wrangler d1 execute yazsad ${remote ? "--remote" : "--local"} --file=${file}`;
  console.log(`Çalıştırılıyor: ${cmd}`);
  try {
    execSync(cmd, { stdio: "inherit" });
  } catch {
    console.error("wrangler komutu başarısız. Yerel D1 init için: pnpm db:migrate");
    process.exit(1);
  }
}

main();
