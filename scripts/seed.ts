import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "../lib/db/schema";
import { id } from "../lib/db/ids";
import { MODULE_SEED, FORUM_CATEGORIES_SEED } from "../lib/db/seed-data";

async function main() {
  const url = process.env.DATABASE_URL_DIRECT ?? process.env.DATABASE_URL;
  if (!url) {
    console.error("DATABASE_URL_DIRECT (veya DATABASE_URL) set edilmeli.");
    process.exit(1);
  }

  const client = postgres(url, { max: 1, prepare: false });
  const db = drizzle(client, { schema });

  try {
    // ---- modules ----
    console.log(`→ ${MODULE_SEED.length} modül yükleniyor…`);
    await db
      .insert(schema.modules)
      .values(
        MODULE_SEED.map((m) => ({
          id: m.id,
          label: m.label,
          category: m.category,
          status: m.status,
          locked: Boolean(m.locked),
          description: m.description ?? null,
          updatedAt: new Date(),
        })),
      )
      .onConflictDoUpdate({
        target: schema.modules.id,
        set: {
          label: schema.modules.label,
          category: schema.modules.category,
          status: schema.modules.status,
          locked: schema.modules.locked,
          description: schema.modules.description,
          updatedAt: new Date(),
        },
      });

    // ---- forum categories ----
    console.log(`→ ${FORUM_CATEGORIES_SEED.length} forum kategorisi yükleniyor…`);
    await db
      .insert(schema.forumCategories)
      .values(
        FORUM_CATEGORIES_SEED.map((c) => ({
          id: `cat_${c.slug}`,
          slug: c.slug,
          title: c.title,
          description: c.description,
          position: c.position,
        })),
      )
      .onConflictDoNothing();

    // ---- demo admin ----
    console.log("→ Demo kullanıcılar oluşturuluyor…");
    const adminId = "usr_demo_admin";
    const artistUserId = "usr_demo_artist";
    const listenerUserId = "usr_demo_listener";
    const artistId = "art_demo";

    const demoUsers = [
      { id: adminId, email: "admin@yazsad.org", username: "yonetim", displayName: "YAZSAD Yönetim", role: "admin" as const },
      { id: artistUserId, email: "anatolab@yazsad.org", username: "anatolab", displayName: "Anatolian Lab", role: "artist" as const },
      { id: listenerUserId, email: "deniz@example.com", username: "deniz", displayName: "Deniz Kara", role: "listener" as const },
    ];

    await db
      .insert(schema.users)
      .values(
        demoUsers.map((u) => ({
          ...u,
          kvkkAcceptedAt: new Date(),
          kvkkVersion: process.env.KVKK_VERSION ?? "2026-04-01",
        })),
      )
      .onConflictDoNothing();

    // ---- demo artist ----
    await db
      .insert(schema.artists)
      .values({
        id: artistId,
        userId: artistUserId,
        slug: "anatolian-lab",
        stageName: "Anatolian Lab",
        genres: ["Ambient", "Folktronica", "Türkü-tronik"],
        toolsUsed: ["Suno v4.5", "Stable Audio 2.0"],
        verified: true,
        featured: true,
      })
      .onConflictDoNothing();

    // ---- demo album ----
    const albumId = "alb_bogaz";
    await db
      .insert(schema.albums)
      .values({
        id: albumId,
        artistId,
        title: "Boğaz",
        slug: "bogaz",
        description: "Marmara'nın iki yakası arasında salınan bir akustik günlük.",
        releaseDate: "2026-03-15",
        price: 4900,
        status: "approved",
        trackCount: 3,
        totalDuration: 678,
      })
      .onConflictDoNothing();

    // ---- demo tracks ----
    const tracksDemo = [
      {
        id: "trk_bogaz_sisinde",
        title: "Boğaz Sisinde",
        slug: "bogaz-sisinde",
        duration: 222,
        bpm: 92,
        musicalKey: "Am",
        genres: ["Ambient", "Folktronica"],
        moods: ["Hüzünlü", "Mistik"],
        aiModel: "Suno v4.5",
        aiPrompt: "Ambient turkish folk, dreamy ney + analog pads, Bosphorus fog at dawn, 90 bpm, A minor",
        price: 7900,
        playCount: 2458,
        likeCount: 341,
      },
      {
        id: "trk_kasimpasa_gece",
        title: "Kasımpaşa Gecesi",
        slug: "kasimpasa-gecesi",
        duration: 198,
        bpm: 78,
        musicalKey: "Cm",
        genres: ["Türkü-tronik"],
        moods: ["Karanlık", "Nostaljik"],
        aiModel: "Stable Audio 2.0",
        aiPrompt: "Lo-fi anatolian dub, baglama loops, vinyl crackle, dark alley jazz, 78 bpm, C minor",
        price: 4900,
        playCount: 1820,
        likeCount: 219,
      },
      {
        id: "trk_kapali_carsi",
        title: "Kapalıçarşı 04:12",
        slug: "kapali-carsi-04-12",
        duration: 258,
        bpm: 110,
        musicalKey: "Dm",
        genres: ["Cinematic", "Folktronica"],
        moods: ["Coşkulu", "Hipnotik"],
        aiModel: "Suno v4",
        aiPrompt: "Cinematic anatolian electronica, kanun + 808s, golden hour, 110 bpm, D minor",
        price: 9900,
        playCount: 4019,
        likeCount: 588,
      },
    ];

    await db
      .insert(schema.tracks)
      .values(
        tracksDemo.map((t) => ({
          ...t,
          artistId,
          albumId,
          audioUrl: `https://media.yazsad.org/demo/${t.slug}.mp3`,
          audioFormat: "mp3",
          audioSize: 8_421_634,
          availableLicenses: ["personal", "commercial"],
          status: "approved" as const,
          publishedAt: new Date(),
        })),
      )
      .onConflictDoNothing();

    // ---- demo haber ----
    await db
      .insert(schema.newsArticles)
      .values({
        id: id.news(),
        slug: "aclis-duyurusu",
        title: "YAZSAD açıldı: AI müziğinde şeffaf bir adres",
        excerpt: "Türkiye'de AI destekli müzik üreten sanatçılar için bir dernek + platform.",
        body: "## Açılıyoruz\n\nYAZSAD bugün herkese açık. Hak savunuculuğu, etik ilkeler ve şeffaf gelir için bir aradayız.\n\n*Hoş geldiniz.*",
        category: "Duyuru",
        authorId: adminId,
        publishedAt: new Date(),
      })
      .onConflictDoNothing();

    console.log("✓ Seed tamam.");
  } finally {
    await client.end({ timeout: 5 });
  }
}

main().catch((err) => {
  console.error("Seed başarısız:", err);
  process.exit(1);
});
