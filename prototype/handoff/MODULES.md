# MODULES.md — YAZSAD Modül Sistemi

Platform **modüler** inşa edilir. Her özellik bir modüldür ve yönetici panelinden aktif/pasif/beta/bakım yapılabilir.

## Modül Durumları

| Durum | Davranış |
|---|---|
| `active` | Normal çalışır, herkese görünür |
| `passive` | Kullanıcıya görünmez — nav'dan kalkar, route 404 |
| `beta` | Çalışır ama üstte "Beta — Geri bildirim verin" şeridi |
| `maintenance` | 503 sayfası: "Kısa süre içinde geri" |

`locked: true` olan modüller pasifleştirilemez (çekirdek işlev).

## MVP Kapsamı

Aşağıdaki tablo MVP için hangilerinin **V1** kapsamında olduğunu, hangilerinin **Faz 2** veya **Faz 3**'te geldiğini gösterir.

## Modül Listesi

### Çekirdek (locked — her zaman açık)

| ID | Ad | Faz | Notlar |
|---|---|---|---|
| `home` | Ana Sayfa | V1 | Editoryal karışım |
| `discover` | Keşfet | V1 | Spotify DNA — raflar, tür filtresi |
| `search` | Arama | V1 | Global arama, ⌘K |
| `auth` | Giriş/Kayıt | V1 | Clerk |
| `account` | Hesap/Ayarlar | V1 | Profil, KVKK, güvenlik |
| `membership` | Üyelik | V1 | Başvuru + aidat |
| `admin` | Yönetici Paneli | V1 | Moderasyon, modüller, istatistik |

### Müzik — Dinleme

| ID | Ad | Faz | Notlar |
|---|---|---|---|
| `trackDetail` | Parça Detayı | V1 | Waveform, yorumlar |
| `albumDetail` | Albüm Sayfası | V1 | Bandcamp DNA |
| `artistProfile` | Sanatçı v2 | V1 | Destekle + merch rafı |
| `player` | Oynatıcı | V1 | Mini + tam, kuyruk, shuffle/repeat |
| `playlists` | Çalma Listeleri | V1 | Kişisel + public |
| `library` | Kitaplık | V1 | Satın alınan + beğenilen |
| `queue` | Kuyruk | V1 | localStorage yerine server sync |
| `radio` | Radyo | Faz 2 | Otomatik akış, tür bazlı |

### Müzik — Üretim

| ID | Ad | Faz | Notlar |
|---|---|---|---|
| `upload` | Yükleme | V1 | Tekil + albüm akışı |
| `moderation` | Moderasyon Kuyruğu | V1 | Admin |
| `stems` | Stem Dağıtımı | Faz 2 | Opsiyonel zip |
| `lineage` | Soy Ağacı | Faz 2 | Remix/cover/sample ilişkisi |
| `styleDNA` | Stil DNA | Faz 3 | Analiz + parmak izi |
| `aiclips` | AI Klipleri | Faz 2 | Video +müzik içerik |

### Ticaret

| ID | Ad | Faz | Notlar |
|---|---|---|---|
| `marketplace` | Marketplace | V1 | Bandcamp DNA |
| `cart` | Sepet | V1 | |
| `checkout` | Ödeme | V1 | iyzico |
| `licensing` | Lisans Yönetimi | V1 | PDF üretimi |
| `payouts` | Sanatçı Ödemeleri | V1 | Aylık manuel → aylık otomatik |
| `promotions` | Promosyon Kodları | Faz 2 | |
| `b2b` | B2B Portalı | Faz 2 | Kurumsal lisans, toplu satın alma |
| `merch` | Merchandise | Faz 3 | Tişört, plak, NFT yok |

### Dernek

| ID | Ad | Faz | Notlar |
|---|---|---|---|
| `association` | Dernek Ana | V1 | Biz kimiz, etik ilkeler, tüzük |
| `transparency` | Mali Şeffaflık | V1 | Aylık rapor |
| `donation` | Bağış | V1 | Tek seferlik |
| `elections` | Seçimler | Faz 3 | Yönetim kurulu oylaması |
| `compliance` | Uyum / Etik | V1 | İhlal bildirimi |
| `ombudsman` | Şikayet Merkezi | Faz 2 | |

### Topluluk

| ID | Ad | Faz | Notlar |
|---|---|---|---|
| `forum` | Forum | V1 | Kategoriler, konular, yorumlar |
| `news` | Haberler | V1 | Blog / duyurular |
| `contest` | Yarışmalar | V1 | Temalı, jüri + halk oyu |
| `calendar` | Takvim | V1 | Etkinlikler |
| `chat` | Anlık Mesajlaşma | Faz 3 | 1-1 ve grup |
| `liveSessions` | Canlı Oturumlar | Faz 2 | Video yayın (Mux/LiveKit) |
| `following` | Takip Sistemi | V1 | Sanatçı takibi |

### AI Özellikleri

| ID | Ad | Faz | Notlar |
|---|---|---|---|
| `promptmarket` | Prompt Market | Faz 2 | Doğrulanmış promptlar |
| `models` | Model Rehberi | Faz 2 | Suno/Udio/Stable Audio kılavuz |
| `aiassist` | AI Asistan | Faz 2 | Claude Haiku entegrasyon |
| `remix` | Remix Studio | Faz 3 | Browser içi DAW benzeri |

### Platform / Dış Özellikler

| ID | Ad | Faz | Notlar |
|---|---|---|---|
| `pwa` | PWA + Offline | Faz 2 | Service Worker |
| `notifications` | Bildirimler | V1 | In-app + e-posta |
| `feedback` | Geri Bildirim | V1 | Floating widget |
| `onboarding` | Onboarding | Faz 2 | İlk giriş sihirbazı |
| `profileEducation` | Eğitim İçerik | Faz 3 | Kurslar, sertifika |

---

## MVP Toplam

**V1 (MVP — 6-8 hafta):** 26 modül
**Faz 2 (MVP sonrası ilk büyütme):** 12 modül
**Faz 3 (olgunluk sonrası):** 7 modül

## Seed Verisi

Tüm modüller ilk migration'dan sonra seed edilir. Varsayılan durumlar:

- **V1 modülleri** → `active`
- **Faz 2 modülleri** → `passive` (kodları yazılmaz, sadece placeholder sayfası varsa beta)
- **Faz 3 modülleri** → `passive`, placeholder yok

```ts
// lib/db/seed/modules.ts
export const MODULE_SEED: ModuleSeed[] = [
  { id: 'home', label: 'Ana Sayfa', category: 'Çekirdek', status: 'active', locked: true },
  { id: 'marketplace', label: 'Marketplace', category: 'Ticaret', status: 'active' },
  { id: 'lineage', label: 'Soy Ağacı', category: 'AI', status: 'passive' },
  // ... tam liste
];
```

Tam liste: `prototype/src/modules.jsx` içindeki `MODULES_DEFAULT` → Claude Code bunu TypeScript'e çevirecek. Statu'ler yukarıdaki tabloya göre güncellenmeli.

## Modül Kontrol Akışı

### Server tarafı (route guard)

```ts
// app/(public)/pazar/layout.tsx
import { requireModule } from '@/lib/modules/guard';

export default async function Layout({ children }) {
  await requireModule('marketplace');  // 404 veya 503 atar
  return children;
}
```

### Client tarafı (nav filtreleme)

```tsx
// components/nav/Sidebar.tsx
const { modules } = useModules();
const navItems = ALL_NAV_ITEMS.filter(item => {
  const mod = modules[item.moduleId];
  return mod && mod.status !== 'passive';
});
```

### Admin UI

`/admin/modules` sayfası:
- Kategoriye göre gruplu liste
- Her modülde: durum seçici (dropdown), güncelleme zamanı, güncelleyen, açıklama
- Değişiklik anında global state'i günceller (WebSocket yok — revalidate yeterli)
- Son değişiklikler feed'i
- Audit log entegrasyonu: her toggle `module.toggle` aksiyonu olarak kaydedilir

## Beta Modu

`status: 'beta'` modüller normal çalışır ama:
- Sayfanın üstünde sarı şerit: "Beta — Bir sorunla karşılaşırsan Geri Bildir"
- API yanıtlarında `X-Module-Beta: true` header
- Feedback widget'ta modül preset'i otomatik set

## Bakım Modu

`maintenance` durumda:
- Rota hâlâ açık ama içerik yerine sabit mesaj
- Custom mesaj: admin panelden yazılabilir
- ETA: opsiyonel ("2 saat içinde geri dönüyoruz")
- Admin kendi görebiliyor (preview header)

## MVP Sonrası Sıralama

Faz 2'de öncelik sırası (ilk sürüm sonrası ~3 ay):

1. **AI Asistan** (Claude Haiku) — kullanıcı sıkışmışlık için en çok değer
2. **Lineage (Soy Ağacı)** — dernek politikası vurgusu, PR etkisi
3. **PWA + Offline** — mobil dinleme kalitesini yükseltir
4. **Canlı Oturumlar** — topluluk büyütme
5. **Prompt Market** — sanatçılara ek gelir kanalı
6. **AI Klipler** — video içerik
7. **Onboarding Sihirbazı** — retention metriği

Faz 3'e erişim şartı: V1 + Faz 2 stabil + 500+ aktif sanatçı.
