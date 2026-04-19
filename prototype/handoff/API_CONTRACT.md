# API_CONTRACT.md — YAZSAD API

Next.js Route Handlers. Her endpoint:
- JSON in/out
- `zod` schema validation
- Hata formatı: `{ error: { code, message, fields? } }`
- Auth: Clerk session (header: `Authorization: Bearer <token>` — Clerk kendisi halleder)
- Rate limit: IP başına 60/dakika default (Upstash Redis)

## Genel Format

**Başarılı yanıt:**
```json
{ "data": { ... }, "meta": { "page": 1, "pageSize": 20, "total": 157 } }
```

**Hata:**
```json
{ "error": { "code": "VALIDATION_ERROR", "message": "...", "fields": { "email": "Gerekli" } } }
```

**Hata kodları:**
- `VALIDATION_ERROR` (400)
- `UNAUTHORIZED` (401)
- `FORBIDDEN` (403)
- `NOT_FOUND` (404)
- `CONFLICT` (409)
- `RATE_LIMITED` (429)
- `SERVER_ERROR` (500)
- `MODULE_DISABLED` (503) — modül pasif/bakım

## Auth (Clerk tarafından yönetilir)

Clerk uçları:
- `POST /api/auth/signup` — Clerk SDK
- `POST /api/auth/login`
- `POST /api/auth/otp/send` (telefon)
- `POST /api/auth/otp/verify`

Bizim tarafımızda sadece **profile sync**:

### `POST /api/auth/sync`
Clerk webhook'undan gelir, `users` tablosunu günceller.

---

## Kullanıcı

### `GET /api/me`
Oturumdaki kullanıcıyı döner.

**Yanıt:**
```json
{
  "data": {
    "id": "usr_abc",
    "email": "deniz@example.com",
    "username": "deniz",
    "displayName": "Deniz Kara",
    "role": "artist",
    "avatarUrl": "https://r2.../...",
    "membership": {
      "tier": "artist",
      "status": "active",
      "currentPeriodEnd": "2027-01-01"
    }
  }
}
```

### `PATCH /api/me`
Profil günceller. `{ displayName?, bio?, city?, website?, socialLinks?, avatarUrl? }`

### `DELETE /api/me`
Hesap silme talebi. 30 gün soft delete. KVKK gereği.

### `GET /api/users/:username`
Public profil.

---

## Parçalar

### `GET /api/tracks`
**Query:** `?genre=&mood=&bpmMin=&bpmMax=&q=&sort=new|popular|liked&page=&pageSize=`

**Yanıt:**
```json
{
  "data": [
    {
      "id": "trk_boazsisinde",
      "title": "Boğaz Sisinde",
      "slug": "bogaz-sisinde",
      "artist": { "id": "art_anat", "stageName": "Anatolian Lab", "slug": "anatolian-lab" },
      "album": { "id": "alb_bogaz", "title": "Boğaz", "coverUrl": "..." },
      "duration": 222,
      "bpm": 92,
      "musicalKey": "Am",
      "genres": ["Ambient", "Folktronica"],
      "aiModel": "Suno v4.5",
      "playCount": 2458,
      "likeCount": 341,
      "price": 7900,
      "coverUrl": "...",
      "audioPreviewUrl": "..."
    }
  ],
  "meta": { "page": 1, "pageSize": 20, "total": 127 }
}
```

### `GET /api/tracks/:idOrSlug`
Tek parça detayı. Yorumlar embed edilmez — ayrı endpoint.

### `POST /api/tracks`
Auth: artist.

**İstek:**
```json
{
  "title": "...",
  "albumId": "...",
  "audioKey": "uploads/tmp/...",     // R2'deki geçici dosya
  "coverKey": "uploads/tmp/...",
  "duration": 222,
  "bpm": 92,
  "musicalKey": "Am",
  "genres": ["Ambient"],
  "moods": ["Hüzünlü"],
  "aiModel": "Suno v4.5",
  "aiPrompt": "...",
  "humanEditing": "...",
  "availableLicenses": ["personal", "commercial"],
  "price": 7900
}
```

**Yanıt:** 201 + track objesi. `status: 'pending'` olur, moderasyon kuyruğuna eklenir.

### `PATCH /api/tracks/:id`
Auth: sahip sanatçı veya admin.

### `DELETE /api/tracks/:id`
Auth: sahip veya admin. Soft delete.

### `POST /api/tracks/:id/play`
Dinleme olayını kaydet. `{ listenedMs, completed }`. Rate limited.

### `POST /api/tracks/:id/like` / `DELETE /api/tracks/:id/like`

### `GET /api/tracks/:id/stream`
Auth: isteğe bağlı. Pre-signed R2 URL döner, geçerlilik 1 saat.

---

## Albümler

### `GET /api/albums` / `GET /api/albums/:id` / `POST` / `PATCH` / `DELETE`
Benzer şema.

**Album yükleme akışı:**
1. `POST /api/albums` — metadata + cover
2. Her parça için `POST /api/tracks` — `albumId` ile
3. `POST /api/albums/:id/publish` — hepsi ready ise publish

---

## Sanatçılar

### `GET /api/artists/:slug`
Profil + son yayınlar + istatistik.

### `GET /api/artists/:slug/tracks?page=&pageSize=`
### `GET /api/artists/:slug/albums`

---

## Dosya Yükleme

### `POST /api/upload/presign`
Auth: artist.

**İstek:**
```json
{
  "filename": "boaz.mp3",
  "contentType": "audio/mpeg",
  "size": 8421634,
  "purpose": "track-audio"    // track-audio | track-cover | avatar | album-cover
}
```

**Yanıt:**
```json
{
  "data": {
    "uploadUrl": "https://...r2.cloudflarestorage.com/...?...signed",
    "key": "uploads/tmp/xyz.mp3",
    "expiresIn": 300
  }
}
```

FE doğrudan R2'ye PUT eder. `key`'i sonra `POST /api/tracks`'ta kullanır.

**Doğrulama:** max 50MB audio, 5MB image. Virus scan yok (MVP).

---

## Marketplace & Ödeme

### `GET /api/market/items?q=&sort=&genre=`
Satılan parça/albüm listesi.

### `POST /api/cart/add` / `POST /api/cart/remove` / `GET /api/cart`
Auth: kullanıcı.

**Cart item:**
```json
{ "trackId": "trk_...", "licenseType": "commercial" }
```

### `POST /api/checkout`
Auth: kullanıcı.

**İstek:**
```json
{
  "items": [{ "trackId": "...", "licenseType": "commercial" }],
  "billingName": "Deniz Kara",
  "billingTaxId": "12345678901",
  "kvkkAccepted": true
}
```

**Yanıt:**
```json
{
  "data": {
    "orderId": "ord_abc",
    "iyzicoToken": "...",
    "checkoutUrl": "https://sandbox-iyzico.com/..."
  }
}
```

### `POST /api/webhook/iyzico`
iyzico callback. Secret-signed. `order.status` güncellenir, `license` oluşturulur, bildirim + e-posta gönderilir.

### `GET /api/orders` / `GET /api/orders/:id`
Auth: kullanıcı kendi siparişleri.

### `GET /api/library`
Satın alınan + bedava indirilen.

---

## Üyelik

### `POST /api/membership/apply`
**İstek:**
```json
{
  "tier": "artist",
  "applicationData": {
    "stageName": "Neon Minare",
    "genres": ["Synthwave"],
    "toolsUsed": ["Suno", "Udio"],
    "portfolio": "https://...",
    "motivation": "..."
  },
  "kvkkAccepted": true
}
```

### `GET /api/membership/me`
Kullanıcının üyelik durumu.

### `POST /api/membership/dues`
Aidat ödemesi → checkout akışı.

---

## Forum

### `GET /api/forum/categories`
### `GET /api/forum/topics?categoryId=&page=&pageSize=`
### `GET /api/forum/topics/:id`
Topic + ilk N post.
### `POST /api/forum/topics` — `{ categoryId, title, body }`
### `POST /api/forum/topics/:id/posts` — `{ body }`
### `DELETE /api/forum/posts/:id` — soft delete (kendi veya mod)
### `POST /api/forum/topics/:id/pin` — mod only
### `POST /api/forum/topics/:id/lock` — mod only

---

## Yarışmalar

### `GET /api/contests?status=open|voting|ended`
### `GET /api/contests/:slug`
### `POST /api/contests/:id/submit`
**İstek:** `{ trackId }` — kendi yüklediği onaylı parça.
### `POST /api/contests/:id/vote`
**İstek:** `{ entryId }`. Kullanıcı başına 1 oy.
### `GET /api/contests/:id/results`
Sadece `status=ended` ise.

---

## Haberler

### `GET /api/news?page=&category=`
### `GET /api/news/:slug`
### `POST /api/news` — admin only

---

## Playlists

### `GET /api/playlists/me`
### `POST /api/playlists` — `{ title, description?, isPublic? }`
### `POST /api/playlists/:id/tracks` — `{ trackId, position? }`
### `DELETE /api/playlists/:id/tracks/:trackId`
### `GET /api/playlists/:id` — public ise herkes, değilse sahip

---

## Bildirimler

### `GET /api/notifications?unread=true&page=`
### `POST /api/notifications/:id/read`
### `POST /api/notifications/read-all`

---

## Arama

### `GET /api/search?q=&kind=tracks|artists|albums|topics|news|all`
Postgres full-text + ILIKE fallback. Türkçe tsvector.

---

## Geri Bildirim

### `POST /api/feedback`
Auth: isteğe bağlı (misafir de gönderebilir).

**İstek:**
```json
{
  "category": "bug",
  "rating": 4,
  "message": "...",
  "routeAtSubmit": "/pazar/trk_xyz"
}
```

---

## Admin API

Tümü `role = admin` gerektirir. Hepsi `auditLog` yazar.

### Moderasyon
- `GET /api/admin/moderation/queue?type=track|post|topic&status=pending`
- `POST /api/admin/moderation/:type/:id/approve`
- `POST /api/admin/moderation/:type/:id/reject` — `{ reason }`

### Modül Kontrolü
- `GET /api/admin/modules`
- `PATCH /api/admin/modules/:id` — `{ status: 'active'|'passive'|'beta'|'maintenance' }`

### Kullanıcı Yönetimi
- `GET /api/admin/users?q=&role=&suspended=`
- `POST /api/admin/users/:id/suspend` — `{ reason }`
- `POST /api/admin/users/:id/unsuspend`
- `PATCH /api/admin/users/:id/role` — `{ role }`

### İstatistik
- `GET /api/admin/stats/overview` — toplam kullanıcı, parça, satış, aidat
- `GET /api/admin/stats/revenue?from=&to=&granularity=day|week|month`
- `GET /api/admin/stats/plays?from=&to=&trackId?`

### Mali
- `GET /api/admin/payouts/pending` — sanatçıya ödenecek tutarlar
- `POST /api/admin/payouts/:artistId/process` — manuel işaret
- `GET /api/admin/orders?status=&from=`

### Yarışma Yönetimi
- `POST /api/admin/contests` — yeni yarışma
- `POST /api/admin/contests/:id/score` — `{ entryId, score }` — jüri skoru
- `POST /api/admin/contests/:id/finalize`

### Haberler
- `POST /api/admin/news` / `PATCH` / `DELETE`

### KVKK İşlemleri
- `GET /api/admin/kvkk/export/:userId` — kullanıcı verisini JSON olarak indir
- `POST /api/admin/kvkk/purge/:userId` — hard delete (30 gün sonra)

### Denetim İzi
- `GET /api/admin/audit?actorId=&action=&from=`

---

## Modül Durumu Kontrol

Her istek, ilgili modül pasif/bakımda ise `503 MODULE_DISABLED` döner. Kontrol middleware'de:

```ts
// lib/modules/guard.ts
export async function requireModule(id: string) {
  const m = await getModule(id);
  if (!m || m.status === 'passive') throw moduleDisabled();
  if (m.status === 'maintenance') throw maintenanceMode();
  // beta → pass but header: X-Module-Beta: true
}
```

Modül eşlemesi (endpoint → modülID):

| Prefix | Modül |
|---|---|
| `/api/market/*`, `/api/cart/*`, `/api/checkout` | `marketplace` |
| `/api/contests/*` | `contest` |
| `/api/forum/*` | `forum` |
| `/api/news` | `news` |
| `/api/upload/*`, `/api/tracks POST` | `upload` |
| `/api/playlists/*` | `playlists` |
| `/api/membership/*` | — (çekirdek, kilitli) |

---

## Rate Limit (örnek)

| Endpoint | Limit |
|---|---|
| `POST /api/feedback` | 5/saat/IP |
| `POST /api/auth/otp/send` | 3/saat/tel |
| `POST /api/tracks/:id/play` | 1/sn/kullanıcı |
| `POST /api/checkout` | 10/gün/kullanıcı |
| Default | 60/dk/IP |

---

## Örnek Zod Schema

```ts
// lib/validation/track.ts
export const createTrackSchema = z.object({
  title: z.string().min(1).max(120),
  albumId: z.string().optional(),
  audioKey: z.string().regex(/^uploads\/tmp\//),
  coverKey: z.string().optional(),
  duration: z.number().int().positive().max(3600),
  bpm: z.number().int().min(30).max(300).optional(),
  musicalKey: z.string().max(5).optional(),
  genres: z.array(z.string()).min(1).max(5),
  moods: z.array(z.string()).max(5).optional(),
  aiModel: z.string().min(1),
  aiPrompt: z.string().min(1).max(2000),
  humanEditing: z.string().max(1000).optional(),
  availableLicenses: z.array(z.enum(['personal','commercial','broadcast','exclusive'])),
  price: z.number().int().min(0),
});
```
