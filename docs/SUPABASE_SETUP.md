# Supabase kurulumu — YAZSAD

Bu doküman, Supabase Postgres'i (eu-central-1 Frankfurt) YAZSAD için yapılandırma adımlarını özetler.

## 1. Proje oluştur

1. [supabase.com](https://supabase.com/dashboard) → **New project**
2. **Region: Central EU (Frankfurt) — eu-central-1** (KVKK için zorunlu)
3. **DB password**'u `.env.local`'e not al
4. Proje hazır olana kadar ~2 dk bekle

## 2. Bağlantı URL'lerini al

**Dashboard → Project Settings → Database → Connection string**

- **Transaction pooler** (runtime için) — port **6543**:
  ```
  postgres://postgres.<ref>:PASSWORD@aws-0-eu-central-1.pooler.supabase.com:6543/postgres
  ```
  → `.env.local` `DATABASE_URL` bu olacak.

- **Session pooler** ya da direkt (migrations için) — port **5432**:
  ```
  postgres://postgres.<ref>:PASSWORD@aws-0-eu-central-1.pooler.supabase.com:5432/postgres
  ```
  → `.env.local` `DATABASE_URL_DIRECT` bu olacak.

**Settings → API**'den:
- `SUPABASE_URL` (Project URL)
- `SUPABASE_ANON_KEY` (anon public)
- `SUPABASE_SERVICE_ROLE_KEY` (service_role — asla istemciye gönderme)
- `SUPABASE_JWT_SECRET` (Settings → API → **JWT Settings** → JWT Secret)

## 3. Migrations + RLS

```bash
pnpm install
cp .env.example .env.local
# .env.local dosyasını doldur

pnpm db:generate          # drizzle SQL üretir (lib/db/schema.ts'ten)
pnpm db:migrate           # schema + drizzle/policies.sql uygulanır
pnpm db:migrate           # ikinci kez — idempotent, hata vermemeli
pnpm db:seed              # modüller, forum kategorileri, demo kullanıcılar
```

## 4. Clerk ↔ Supabase RLS köprüsü

RLS policy'leri Clerk JWT'sini okuyabilsin diye Clerk'te özel bir JWT template gerekli.

1. Clerk dashboard → **JWT Templates** → **+ New template**
2. **Name:** `supabase`
3. **Signing algorithm:** `HS256`
4. **Signing key:** Supabase'in `SUPABASE_JWT_SECRET` değeri
5. **Claims:**
   ```json
   {
     "aud": "authenticated",
     "role": "authenticated",
     "sub": "{{user.id}}",
     "email": "{{user.primary_email_address}}"
   }
   ```
6. Kaydet

Next.js tarafında her server query öncesi şu pattern kullanılır:

```ts
import { auth } from "@clerk/nextjs/server";
import { withUser } from "@/lib/db";

const { getToken } = await auth();
const token = await getToken({ template: "supabase" });
const claims = token ? jwtDecode(token) : null;

const tracks = await withUser(claims ?? {}, (db) =>
  db.select().from(schema.tracks).where(eq(tracks.artistId, myArtistId)),
);
```

## 5. RLS smoke testi

```bash
# Test DB'si için ayrı bir throwaway Supabase projesi aç (ya da local Postgres):
export DATABASE_URL_TEST=postgres://postgres:postgres@localhost:5432/yazsad_test

pnpm test tests/db/rls.test.ts
```

Test geçmezse policy'lerde hata var → asla prod'a atma.

## 6. Cloudflare Pages (runtime)

Secrets `wrangler secret put` ile:

```bash
wrangler secret put DATABASE_URL
wrangler secret put DATABASE_URL_DIRECT
wrangler secret put SUPABASE_JWT_SECRET
wrangler secret put SUPABASE_SERVICE_ROLE_KEY
wrangler secret put CLERK_SECRET_KEY
wrangler secret put CLERK_WEBHOOK_SECRET
```

Bunlar `.env.local`'e yazdıklarınla aynı değerler olmalı (production için).

## 7. Realtime (opsiyonel — Faz 2)

Moderasyon kuyruğu ve bildirimler için:
- Supabase dashboard → **Database → Replication** → `notifications`, `tracks` (status değişimi) tablolarını etkinleştir.
- Client'ta `@supabase/supabase-js` ile `realtime.channel(...)` aboneliği açılır.

## 8. Backup

Supabase Pro tier otomatik günlük backup verir; manuel için:
```bash
pg_dump $DATABASE_URL_DIRECT > backup-$(date +%F).sql
```

---

## Sorun giderme

**"Connection pooling: transaction mode requires prepare: false"**
→ `lib/db/index.ts`'te `postgres(url, { prepare: false })` zaten kullanılıyor.

**"permission denied for schema public"**
→ RLS policy yanlış ya da JWT claim'leri connection'a set edilmemiş. `withUser(claims, ...)` çağrısını kontrol et.

**"role 'authenticated' does not exist"**
→ Supabase anon key `authenticated` rolü kullanır; policy `auth_is_admin()` + `auth_user_id()` helper'ları üzerinden çalışır. `policies.sql`'in uygulandığını doğrula.
