# AUTH_ROLES.md — Kimlik, Roller, KVKK

## Auth Sağlayıcı: Clerk

### Neden Clerk?
- Türkiye telefon numarası + OTP desteği (Twilio üzerinden)
- E-posta magic link + şifre
- Google, Apple, Microsoft sosyal giriş
- Çok oturum yönetimi
- KVKK uyumlu: veri AB'de tutulabilir (EU residency add-on)
- Webhook ile bizim `users` tablomuzu senkronize tutarız

Alternatif: **NextAuth v5 + Resend + Twilio**. Biraz daha iş ama daha ucuz. İlk sürümde Clerk, ölçeklenince değerlendir.

### Oturum Akışı

1. Kullanıcı `/giris` veya `/kayit` sayfasına gelir → Clerk `<SignIn>` / `<SignUp>` component'i
2. Clerk auth tamamlandığında webhook `POST /api/auth/sync` tetiklenir
3. Webhook, `users` tablosuna upsert yapar (id = clerkId)
4. Her istekte `auth()` helper'ı oturumu döner
5. Server component: `const { userId } = await auth()`
6. Route handler: aynı

### KVKK Onay Flow

Clerk sign-up formuna custom field ekle:
- ☑ "Kullanım Şartlarını okudum, kabul ediyorum"
- ☑ "Gizlilik Politikasını ve Aydınlatma Metnini okudum"

Her ikisi de zorunlu. Zamanları + metinlerin versiyonu `users.kvkkAcceptedAt` + `kvkkVersion`'a kaydedilir.

---

## Roller

### 1. `listener` (Dinleyici) — default

Ücretsiz kayıt. Hiçbir başvuru gerektirmez.

**Yapabilir:**
- Parça dinle
- Albüm/parça satın al
- Playlist oluştur (kendi)
- Beğen, yorum yap (parçada + forum)
- Sanatçı takip et
- Yarışmada halk oyu kullan
- Bildirim al

**Yapamaz:**
- Parça/albüm yükle
- Yarışmaya katıl
- Sanatçı sayfası (profil sayfası var ama `artists` kaydı yok)
- Forum'da sanatçı rozetli post
- Moderasyon

### 2. `artist` (Sanatçı — Dernek Üyesi)

`listener` + başvuru + onay gerekir.

**Başvuru formu alanları:**
- Sahne adı
- Kullandığı AI araçları (çoklu)
- Portfolio URL'leri (Spotify, YouTube, SoundCloud vs.)
- Motivasyon metni (min 200 karakter)
- Etik ilkeleri kabul ✓
- Sanatçı sözleşmesi ✓
- Aidat tutarını (varsayılan yıllık ₺500) kabul ✓

**Admin onay süreci:**
- `memberships.status: pending` → admin inceler
- Onaylanırsa `artists` kaydı oluşur, `users.role: artist`
- Reddedilirse `memberships.status: rejected`, nedeni e-posta ile iletilir

**Yapabilir (listener'a ek):**
- Parça/albüm yükle (moderasyon sonrası yayına)
- Sanatçı profili düzenle
- Yarışmaya katıl
- Kendi parçalarının istatistiğini gör
- Ödeme bilgilerini (IBAN) gir
- Ay sonu payout raporu al

### 3. `admin` (Yönetici)

Sadece platform sahibi tarafından manuel atanır — self-service yok.

**Yapabilir (her şey + özel):**
- Tüm kullanıcıları listele, askıya al, rol değiştir
- Parça/yorum moderasyon kuyruğu
- Modül durumlarını değiştir
- Mali raporları gör, payout işle
- Yarışma oluştur, jüri puanı gir
- Haber yayınla
- Denetim izini oku
- KVKK veri talepleri (export, purge)

---

## İzin Matrisi (Özet)

| Aksiyon | listener | artist | admin |
|---|:-:|:-:|:-:|
| Parça dinle | ✅ | ✅ | ✅ |
| Satın al | ✅ | ✅ | ✅ |
| Parça yükle | ❌ | ✅ | ✅ |
| Kendi parçasını düzenle | — | ✅ | ✅ |
| Başka parçayı düzenle | ❌ | ❌ | ✅ |
| Parça sil (kendi) | — | ✅ (soft) | ✅ |
| Yoruma cevap | ✅ | ✅ | ✅ |
| Yorum sil (kendi) | ✅ | ✅ | ✅ |
| Yorum sil (başkasının) | ❌ | ❌ | ✅ |
| Yarışmaya katıl | ❌ | ✅ | ❌* |
| Halk oyu | ✅ | ✅ | ❌* |
| Forum post | ✅ | ✅ | ✅ |
| Pin/Lock | ❌ | ❌ | ✅ |
| Modül toggle | ❌ | ❌ | ✅ |
| Kullanıcı askıya al | ❌ | ❌ | ✅ |

`*` Admin'ler kendi yarışmalarına katılamaz/oylayamaz (çıkar çatışması).

---

## İzin Kontrolü — Kod Seviyesi

### Server-side helper

```ts
// lib/auth/permissions.ts
import { auth } from '@clerk/nextjs/server';
import { db } from '@/lib/db';

export async function requireAuth() {
  const { userId } = await auth();
  if (!userId) throw unauthorized();
  const user = await db.query.users.findFirst({ where: eq(users.clerkId, userId) });
  if (!user) throw unauthorized();
  return user;
}

export async function requireRole(role: UserRole) {
  const user = await requireAuth();
  if (user.role !== role && user.role !== 'admin') throw forbidden();
  return user;
}

export async function requireArtist() {
  return requireRole('artist');
}

export async function requireAdmin() {
  const user = await requireAuth();
  if (user.role !== 'admin') throw forbidden();
  return user;
}

export async function requireOwnership<T extends { artistId: string }>(
  resource: T,
  user: { id: string; role: UserRole; artistId?: string }
) {
  if (user.role === 'admin') return;
  if (resource.artistId !== user.artistId) throw forbidden();
}
```

### Route örneği

```ts
// app/api/tracks/[id]/route.ts
export async function PATCH(req: Request, { params }) {
  const user = await requireAuth();
  const track = await db.query.tracks.findFirst({ where: eq(tracks.id, params.id) });
  if (!track) return notFound();
  await requireOwnership(track, user);
  // ... güncelle
}
```

### Client tarafı

```tsx
const { user, isAdmin, isArtist } = useUser();

{isArtist && <Button>Yeni Parça Yükle</Button>}
```

Ama kritik: **istemci kontrolü sadece UX içindir**. Yetki kararı **her zaman** server'da.

---

## Askıya Alma & Silme

### Askıya Alma (suspend)
- Admin → `users.suspendedAt` + `suspendedReason` set edilir
- Kullanıcı login olabilir ama her route `/askida` sayfasına yönlendirilir
- İçeriği görünmez olur (parçalar gizlenir, yorumlar soft hide)
- Admin kaldırabilir

### Hesap Silme (KVKK)
- Kullanıcı `/ayarlar/hesap-sil` → onay → `deletedAt` set edilir
- 30 gün "soft delete" süresi — kullanıcı dönerse geri alınabilir
- 30 gün sonra cron job:
  - `email` ve `phone` → hash
  - `displayName` → "Silinmiş Üye"
  - `bio`, `avatarUrl`, `socialLinks` → null
  - Yüklediği parçalar: sanatçı kendi seçer — ya arşiv, ya silinir
  - Yorumları: "Silinmiş üye" olarak görünür ama kalır (forum bütünlüğü)
  - Satın alımları: korunur (mali kayıt zorunlu — VUK 5 yıl)
- Admin manuel purge: `POST /api/admin/kvkk/purge/:userId` (denetim izi yazılır)

### Veri Dışa Aktarma (KVKK 11)
- Kullanıcı `/ayarlar/verilerimi-indir` → e-posta ile JSON gönderilir
- İçerik: profile + tracks + comments + orders + licenses + playlists + forum posts
- Zip formatı, e-postayla link
- Talep başına 1 ay/kullanıcı limit

---

## KVKK Özel Notlar

### Aydınlatma Metni
Her form + footer'da link. İçerik (ürün sahibi hukuk danışmanı ile hazırlayacak):
- Veri sorumlusu: YAZSAD (adres, KEP)
- Hangi veriler işleniyor
- Hangi amaçla
- Kiminle paylaşıyor (iyzico, Clerk, Resend, R2)
- Saklama süresi
- Kullanıcı hakları (11. madde)

### Çerez Yönetimi
Çerez banner:
- "Zorunlu" (oturum, güvenlik) — on, kapatılamaz
- "Tercih" (tema, dil) — on-off
- "Analitik" (Plausible) — opt-in, default off
- Pazarlama çerezi **yok**.

Çözüm: `cookieconsent` kütüphanesi veya custom component.

### Veri İşleyen Sözleşmeleri
Her dış servisle Data Processing Agreement (DPA):
- Clerk: mevcut, imzalanacak
- Supabase: mevcut
- Cloudflare: mevcut
- iyzico: yurtiçi (KVKK kapsamında kolay)
- Resend: mevcut

### Veri Lokasyonu
- Database: Supabase `eu-central-1` (Frankfurt)
- Dosyalar: Cloudflare R2 → EU bölgesi
- Auth: Clerk EU residency
- Kullanıcının Türkiye'de kalmasını tercih ederiz ama güvenli üçüncü ülke koruması yeterli

---

## Güvenlik

- **HTTPS zorunlu** (Cloudflare otomatik)
- **CSRF:** Next.js App Router default SameSite + Origin check
- **SQL injection:** Drizzle ORM parametreli sorgular
- **XSS:** React escape + DOMPurify (markdown için `rehype-sanitize`)
- **Rate limit:** Upstash Redis (IP ve user ID bazlı)
- **Parola:** Clerk yönetir (bizde hash yok)
- **OTP:** Clerk + Twilio (TR numaraları için)
- **Secrets:** `.env` — repoya ASLA. GitHub Secrets + Vercel/CF envs
- **Webhooks:** `iyzico` + `clerk` imza doğrulaması zorunlu

## Oturum Süresi

- Default: 7 gün "remember me"
- Hassas işlem (IBAN değiştirme, hesap silme) → son 5 dakikada yeniden doğrulama (Clerk step-up)

## 2FA

- Default: off
- Clerk üzerinden SMS veya TOTP açılabilir
- Admin rolü için **zorunlu** — atanırken tetiklenir
