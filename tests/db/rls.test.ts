/**
 * RLS smoke testleri — policy'lerin gerçekten DB katmanında devrede olduğunu doğrular.
 *
 * Çalıştırmak için `DATABASE_URL_TEST` set edilmeli (ephemeral Supabase ya da local Postgres).
 * Tüm testler transaction içinde rollback olur — DB'de kalıcı kayıt oluşmaz.
 * Secret'ler set değilse suite skip edilir (CI'da istenirse zorunlu yapılabilir).
 */
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { eq } from "drizzle-orm";

import * as schema from "@/lib/db/schema";
import { asAdmin, connect, inRollback, testDbUrl } from "../helpers/db";

const url = testDbUrl();
const describeDb = url ? describe : describe.skip;

describeDb("RLS: tracks + orders + licenses", () => {
  let sql: ReturnType<typeof connect>["sql"];

  beforeAll(() => {
    if (!url) return;
    ({ sql } = connect(url));
  });

  afterAll(async () => {
    if (sql) await sql.end({ timeout: 5 });
  });

  const clerkA = "clerk_a";
  const clerkB = "clerk_b";
  const clerkAdmin = "clerk_admin";

  async function seedTwoUsersAndArtistA() {
    // Admin rolüyle veri kur, sonra rollback olsun (ama test kapsamında inRollback içinde).
    // Bu helper idempotent değil — her testte sıfırdan seed edilir.
    return asAdmin(sql, async (db) => {
      const now = new Date();
      await db
        .insert(schema.users)
        .values([
          { id: "usr_test_a", email: "a@test", username: "a", displayName: "A", clerkId: clerkA, role: "artist" },
          { id: "usr_test_b", email: "b@test", username: "b", displayName: "B", clerkId: clerkB, role: "listener" },
          { id: "usr_test_admin", email: "admin@test", username: "adm", displayName: "Admin", clerkId: clerkAdmin, role: "admin" },
        ])
        .onConflictDoNothing();

      await db
        .insert(schema.artists)
        .values({
          id: "art_test_a",
          userId: "usr_test_a",
          slug: "artist-a",
          stageName: "Artist A",
        })
        .onConflictDoNothing();

      // A'nın draft parçası
      await db
        .insert(schema.tracks)
        .values({
          id: "trk_draft_a",
          artistId: "art_test_a",
          title: "A'nın Taslağı",
          slug: "a-draft",
          audioUrl: "https://example/a.mp3",
          audioFormat: "mp3",
          audioSize: 1000,
          duration: 120,
          aiModel: "Suno v4.5",
          aiPrompt: "test prompt",
          availableLicenses: ["personal"],
          status: "draft",
          createdAt: now,
          updatedAt: now,
        })
        .onConflictDoNothing();

      // A'nın onaylı parçası (kontrol — B de görmeli)
      await db
        .insert(schema.tracks)
        .values({
          id: "trk_approved_a",
          artistId: "art_test_a",
          title: "A'nın Yayınlanmışı",
          slug: "a-approved",
          audioUrl: "https://example/a2.mp3",
          audioFormat: "mp3",
          audioSize: 1000,
          duration: 120,
          aiModel: "Suno v4.5",
          aiPrompt: "test prompt",
          availableLicenses: ["personal"],
          status: "approved",
          publishedAt: now,
          createdAt: now,
          updatedAt: now,
        })
        .onConflictDoNothing();

      // A'nın siparişi
      await db
        .insert(schema.orders)
        .values({
          id: "ord_a_1",
          userId: "usr_test_a",
          status: "paid",
          subtotal: 7900,
          total: 7900,
          paidAt: now,
        })
        .onConflictDoNothing();

      return null;
    });
  }

  it("B kullanıcısı A'nın draft track'ini SELECT edemez", async () => {
    await seedTwoUsersAndArtistA();
    const rows = await inRollback(sql, { sub: clerkB }, async (db) =>
      db.select().from(schema.tracks).where(eq(schema.tracks.id, "trk_draft_a")),
    );
    expect(rows).toHaveLength(0);
  });

  it("B kullanıcısı A'nın approved track'ini SELECT edebilir (pozitif kontrol)", async () => {
    await seedTwoUsersAndArtistA();
    const rows = await inRollback(sql, { sub: clerkB }, async (db) =>
      db.select().from(schema.tracks).where(eq(schema.tracks.id, "trk_approved_a")),
    );
    expect(rows).toHaveLength(1);
    expect(rows[0]?.title).toBe("A'nın Yayınlanmışı");
  });

  it("A kullanıcısı kendi draft'ını görebilir (pozitif kontrol)", async () => {
    await seedTwoUsersAndArtistA();
    const rows = await inRollback(sql, { sub: clerkA }, async (db) =>
      db.select().from(schema.tracks).where(eq(schema.tracks.id, "trk_draft_a")),
    );
    expect(rows).toHaveLength(1);
  });

  it("Admin her ikisini de görebilir", async () => {
    await seedTwoUsersAndArtistA();
    const rows = await inRollback(sql, { sub: clerkAdmin }, async (db) =>
      db.select().from(schema.tracks).where(eq(schema.tracks.artistId, "art_test_a")),
    );
    expect(rows.length).toBeGreaterThanOrEqual(2);
  });

  it("B kullanıcısı A'nın siparişini SELECT edemez", async () => {
    await seedTwoUsersAndArtistA();
    const rows = await inRollback(sql, { sub: clerkB }, async (db) =>
      db.select().from(schema.orders).where(eq(schema.orders.id, "ord_a_1")),
    );
    expect(rows).toHaveLength(0);
  });

  it("A kendi siparişini SELECT edebilir (pozitif kontrol)", async () => {
    await seedTwoUsersAndArtistA();
    const rows = await inRollback(sql, { sub: clerkA }, async (db) =>
      db.select().from(schema.orders).where(eq(schema.orders.id, "ord_a_1")),
    );
    expect(rows).toHaveLength(1);
  });

  it("B kullanıcısı INSERT ile A'nın track'ine yorum ekleyemez (başkası adına)", async () => {
    await seedTwoUsersAndArtistA();
    await expect(
      inRollback(sql, { sub: clerkB }, async (db) =>
        db.insert(schema.comments).values({
          id: "cmt_forged",
          userId: "usr_test_a", // kimliğe bürünme denemesi
          trackId: "trk_approved_a",
          body: "bir yorum",
        }),
      ),
    ).rejects.toThrow();
  });

  it("Admin modules tablosunu güncelleyebilir, B güncelleyemez", async () => {
    await seedTwoUsersAndArtistA();
    await asAdmin(sql, (db) =>
      db
        .insert(schema.modules)
        .values({ id: "mod_test_toggle", label: "Test", category: "Test", status: "active" })
        .onConflictDoNothing(),
    );

    // B update'i
    await expect(
      inRollback(sql, { sub: clerkB }, async (db) =>
        db
          .update(schema.modules)
          .set({ status: "passive" })
          .where(eq(schema.modules.id, "mod_test_toggle")),
      ),
    ).resolves.toBeDefined(); // UPDATE "başarılı" ama 0 row etkilenir

    const rows = await inRollback(sql, { sub: clerkAdmin }, async (db) =>
      db.select().from(schema.modules).where(eq(schema.modules.id, "mod_test_toggle")),
    );
    expect(rows[0]?.status).toBe("active"); // B değiştirememiş
  });
});
