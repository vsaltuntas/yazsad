# HANDOFF.md — YAZSAD Proje Özeti

## 1. Ne Yapıyoruz?

**YAZSAD — Yapay Zekâ Destekli Müzik Sanatçıları Derneği**

Türkiye'de AI destekli müzik üreten sanatçılar için:

1. **Dernek** — hak savunuculuğu, etik ilkeler, üyelik, şeffaf mali yönetim
2. **Platform** — keşfet, dinle, yorum yap, toplulukta var ol
3. **Marketplace** — parça/albüm satışı, lisanslama, sanatçıya doğrudan gelir
4. **Eğitim** — prompt pazarı, canlı oturumlar, AI asistan, kılavuzlar
5. **Yarışmalar** — haftalık temalı, jüri + halk oyu, ödüllü

Kullanıcı tipleri:
- **Dinleyici** — ücretsiz, keşfet + satın al + yorum
- **Sanatçı** — derneğe üye, parça yükle, satış yap, yarışmaya katıl
- **Yönetici** — admin paneli, moderasyon, modül kontrolü

## 2. Teknoloji Yığını (Öneri)

### 2A. Monorepo Ana Seçim — **Next.js 15 (App Router) + Supabase**

| Katman | Seçim | Neden |
|---|---|---|
| Framework | Next.js 15 | App Router, RSC, Türkçe ecosystem olgun |
| UI | React 19 + Tailwind CSS | Prototipteki CSS değişkenleri Tailwind theme'e taşınır |
| Veritabanı | Postgres (Supabase) | Row-Level Security, auth entegrasyonu, ücretsiz tier |
| ORM | Drizzle ORM | TypeScript-first, migrations güvenli |
| Auth | Clerk | Türkiye telefon + e-posta + Google, KVKK uyumlu |
| Dosya deposu | Cloudflare R2 | Türkiye'den hızlı, Supabase Storage'a göre ucuz |
| Ödeme | iyzico | Türkçe, tüm bankalar, abonelik destekli |
| E-posta | Resend | Domain doğrulama kolay, Türkçe template desteği |
| Arama | Postgres tsvector | MVP için yeterli; sonra Meilisearch'e geçilebilir |
| Deploy (FE) | Cloudflare Pages | Türkiye erişim hızı en iyi |
| Deploy (API) | Cloudflare Workers **veya** Vercel Edge | Aynı repo, ayrı runtime |
| Analytics | Plausible (self-host) veya Umami | KVKK uyumlu, çerez yok |
| Hata takibi | Sentry | Ücretsiz tier yeterli |
| CI/CD | GitHub Actions | Otomatik test + deploy |

### 2B. Alternatif — Cloudflare All-in

| Katman | Seçim |
|---|---|
| Framework | Next.js 15 (OpenNext ile Cloudflare'e deploy) veya Remix |
| Veritabanı | Cloudflare D1 (SQLite) |
| Dosya | Cloudflare R2 |
| Auth | Clerk (dış servis) |
| Ödeme | iyzico |

**Kompakt ama:** D1'in Postgres'e göre olgunluk farkı var. İlk sürüm için 2A öneririm.

### Claude Code karar verirse:

Ürün sahibine şunu sor:
> "2A (Next.js + Supabase + Cloudflare Pages FE) ile başlayalım mı, yoksa 2B (Cloudflare tam yığın) ile mi? Hız karşılaştırmasında fark var, 2A daha olgun."

Varsayılan: **2A**.

## 3. Repo Yapısı

```
yazsad/
├── app/                          ← Next.js App Router
│   ├── (public)/
│   │   ├── page.tsx              ← ana sayfa (prototype/src/page_home.jsx referans)
│   │   ├── kesfet/page.tsx
│   │   ├── haberler/[slug]/
│   │   ├── forum/
│   │   ├── yarisma/
│   │   ├── pazar/                ← marketplace
│   │   ├── albumler/[id]/
│   │   ├── sanatcilar/[username]/
│   │   ├── parcalar/[id]/
│   │   └── dernek/               ← kurumsal sayfalar
│   ├── (auth)/
│   │   ├── giris/
│   │   ├── kayit/
│   │   └── uyelik-basvurusu/
│   ├── (app)/                    ← giriş sonrası
│   │   ├── kitaplik/
│   │   ├── yukle/
│   │   ├── profil/
│   │   ├── ayarlar/
│   │   └── bildirimler/
│   ├── admin/                    ← yönetici paneli
│   └── api/                      ← Route Handlers
│       ├── tracks/
│       ├── albums/
│       ├── checkout/
│       ├── upload/
│       ├── feedback/
│       ├── moderate/
│       └── webhook/iyzico/
├── components/
│   ├── ui/                       ← primitive'ler (Button, Card, ...)
│   ├── player/                   ← mini + full player, queue
│   ├── track/
│   ├── album/
│   └── admin/
├── lib/
│   ├── db/                       ← Drizzle schema + migrations
│   ├── auth/                     ← Clerk helpers
│   ├── payments/                 ← iyzico client
│   ├── storage/                  ← R2 client, pre-signed URLs
│   ├── modules/                  ← modül sistemi (aktif/pasif kontrol)
│   └── validation/               ← zod schemas
├── styles/
│   ├── globals.css               ← prototype/src/tokens.css'ten gelen CSS vars
│   └── themes/                   ← 4 tema
├── prototype/                    ← OLDUĞU GİBİ KORUNACAK
│   ├── index.html
│   └── src/
├── handoff/                      ← bu paket
│   ├── CLAUDE.md
│   ├── HANDOFF.md
│   └── ...
├── drizzle/                      ← migration dosyaları
├── tests/
│   ├── unit/
│   └── e2e/
├── .env.example
├── package.json
└── README.md
```

## 4. Veri Akışları (Yüksek Seviye)

### 4.1. Parça yükleme
1. Sanatçı `/yukle`'de form doldurur
2. FE, `POST /api/upload/presign` çağırır → backend R2'ye pre-signed URL döner
3. FE doğrudan R2'ye `PUT` eder (backend bant genişliği kullanılmaz)
4. FE, `POST /api/tracks` ile metadata gönderir (AI model, prompt, tür, lisans...)
5. Track `status: pending` olarak kaydolur → moderatör kuyruğuna düşer
6. Moderatör `/admin/moderasyon`'dan onaylar/reddeder
7. Onaylanınca `status: approved`, keşfette görünür

### 4.2. Satın alma
1. Dinleyici `/pazar/[id]`'e gider, "Sepete Ekle"
2. `POST /api/cart/add`
3. `/sepet` → "Ödemeye Geç"
4. `POST /api/checkout` → iyzico token döner
5. iyzico iframe açılır, ödeme yapılır
6. `POST /api/webhook/iyzico` ile doğrulama
7. `license` kaydı oluşturulur, kullanıcıya e-posta gönderilir
8. `GET /api/library` kullanıcının satın aldıklarını listeler

### 4.3. Yarışma katılımı
1. Sanatçı `/yarisma/[id]`'de "Katıl"
2. Parça seçer (yüklediği), form doldurur
3. `POST /api/contests/[id]/submit`
4. Deadline sonrası jüri + halk oyu
5. Kazananlara bildirim + ödül

## 5. KVKK ve Yasal

- **Veri konumu:** Türkiye'de veya AB bölgesinde hosting. Supabase'in `eu-central-1` (Frankfurt) bölgesi uygun.
- **Aydınlatma metni:** Her form sayfasında KVKK onay kutusu + tam metin link
- **Veri silme talebi:** `/ayarlar/hesap-sil` → self-service, 30 gün soft delete
- **Çerez yönetimi:** Gerekli / Tercih / Analitik — gerekli dışı opt-in
- **Sözleşmeler:**
  - Kullanım Şartları
  - Gizlilik Politikası + Aydınlatma Metni
  - Sanatçı Sözleşmesi (komisyon, telif)
  - Marketplace Lisans Sözleşmesi (alıcı tarafı)
- Metinler: ürün sahibi tarafından hukuk danışmanıyla hazırlanacak; Claude Code placeholder `[HUKUKİ METİN]` bırakır.

## 6. Mali Akış

- iyzico komisyonu: ~%3 + ₺0.25 / işlem
- YAZSAD komisyonu: varsayılan **%15** (admin panelden değiştirilebilir)
- Sanatçı net geliri: %85 — aylık olarak banka hesabına yatar
- Şeffaflık: `/dernek/mali-seffaflik` her ay güncellenir (kamuya açık)

## 7. Kabul Kriterleri

MVP kabul için minimum:

- ✅ 3 rol (dinleyici/sanatçı/yönetici) giriş yapabilir
- ✅ Sanatçı parça yükleyebilir → moderasyon → yayına geçer
- ✅ Dinleyici parça dinleyebilir (stream)
- ✅ Marketplace'ten satın alma → gerçek iyzico ödemesi → lisans oluşur
- ✅ Yönetici panelinden modül pasif/aktif yapılabilir
- ✅ Mobilde temiz çalışır (iPhone SE dahil)
- ✅ Türkçe — sıfır İngilizce metin
- ✅ KVKK onay kutuları + aydınlatma + hesap silme

## 8. Öncelik Dışı — Faz 2

`MODULES.md`'de tam liste. Başlıcalar:

- Soy ağacı (lineage)
- Stil DNA analizi
- PWA + offline
- AI asistan (Claude API entegrasyonu)
- Canlı oturumlar (video)
- B2B portal
- Promotoryal araçlar (kampanya yöneticisi)

## 9. Deploy ve Ortamlar

| Ortam | URL | Branch |
|---|---|---|
| Production | yazsad.org | `main` |
| Staging | staging.yazsad.org | `develop` |
| Preview | *.yazsad.pages.dev | her PR |

Secrets: GitHub Secrets + Vercel/CF dashboard. Asla repoya.

## 10. Takip ve İletişim

- Issue tracker: GitHub Issues
- Proje yönetimi: GitHub Projects (Kanban)
- Daily standup: yazılı — PR açıklamasında "bugün ne yaptım / yarın ne yapacağım / blocker"
- Ürün sahibi review: her MVP görevi kapatılınca preview URL + kısa loom

## 11. Tahmini Süre

MVP (yukarıdaki 7 kabul kriteri):

- 1 geliştirici (Claude Code): **6-8 hafta**
- Sürekli ürün sahibi geri bildirimi
- Haftada 1 preview deploy

Detaylı kırılım: `BUILD_ORDER.md`.
