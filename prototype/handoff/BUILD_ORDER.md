# BUILD_ORDER.md — YAZSAD Uygulama Sırası

Claude Code bu dosyayı sırayla takip eder. Her görev bağımsız bir PR. Bitirince kutuyu doldur.

## Kural

- Her görev kendi branch + PR
- Her PR: tipcheck + lint + test geçmeli
- Her görev sonrası preview deploy → ürün sahibi onayı
- **Atla, birleştir, yeniden sırala → önce sor**

---

## Sprint 0 — Temel Altyapı (1 hafta)

### T0.1 — Repo kurulumu
- [ ] Next.js 15 App Router projesi (TypeScript, strict mode, ESLint, Prettier)
- [ ] Tailwind CSS 4 + `prototype/src/tokens.css`'teki CSS vars'ı theme'e taşı
- [ ] pnpm + Husky pre-commit (lint + tipcheck)
- [ ] GitHub Actions: PR'da lint + tipcheck + test + build
- [ ] `.env.example` ile tüm gerekli env değişkenleri
- [ ] `README.md`: kurulum adımları

### T0.2 — Veritabanı
- [ ] Supabase projesi oluştur (eu-central-1)
- [ ] Drizzle ORM kur
- [ ] `lib/db/schema.ts` — `DATA_MODEL.md`'deki tüm tablolar
- [ ] İlk migration çalıştır
- [ ] RLS policy'leri yaz (Supabase SQL)
- [ ] Seed script: modüller, forum kategorileri, demo admin

### T0.3 — Auth
- [ ] Clerk hesap + application oluştur (EU)
- [ ] `<ClerkProvider>` + middleware
- [ ] `/giris`, `/kayit` sayfaları (Türkçe localization)
- [ ] Webhook `/api/auth/sync` — users tablosu senkronizasyonu
- [ ] KVKK onay kutuları sign-up'a ekle
- [ ] `lib/auth/permissions.ts` — helpers
- [ ] Role guard middleware

### T0.4 — Dosya deposu
- [ ] Cloudflare R2 bucket oluştur
- [ ] `lib/storage/r2.ts` — client + pre-signed URL helper
- [ ] `POST /api/upload/presign` endpoint'i
- [ ] CORS config

### T0.5 — Modül sistemi
- [ ] `lib/modules/guard.ts` — route guard
- [ ] Modül state cache (revalidate 60s)
- [ ] `useModules()` hook (client)
- [ ] `GET /api/modules` (public read)
- [ ] `PATCH /api/admin/modules/:id`

---

## Sprint 1 — Keşfet & Dinle (1.5 hafta)

### T1.1 — Ana sayfa
- [ ] `app/(public)/page.tsx`
- [ ] Editoryal raflar: "Öne çıkanlar", "Yeni eklenenler", "Haftalık yükselişler"
- [ ] Mock data değil, gerçek DB sorguları
- [ ] `prototype/src/page_home.jsx`'den tasarım referans

### T1.2 — Keşfet sayfası
- [ ] `/kesfet` → tür filtreleri, BPM slider, mood chips
- [ ] `GET /api/tracks` endpoint
- [ ] Pagination + infinite scroll
- [ ] Sort: yeni, popüler, beğenilen

### T1.3 — Parça detay
- [ ] `/parcalar/[id]` + slug yönlendirmesi
- [ ] Waveform player (wavesurfer.js veya custom canvas)
- [ ] AI prompt + model bilgisi vurgulu göster
- [ ] Yorumlar (embed component)
- [ ] Beğen butonu + sayaç

### T1.4 — Albüm sayfası
- [ ] `/albumler/[id]`
- [ ] Parça listesi + tam albüm dinle
- [ ] Satın al butonu → cart'a ekle

### T1.5 — Sanatçı profili
- [ ] `/sanatcilar/[username]`
- [ ] Popüler parçalar, albüm listesi, hakkında, istatistik
- [ ] Takip et butonu
- [ ] "Destekle" link (Faz 2'de bağış akışı)

### T1.6 — Player
- [ ] Mini player (alt sabit)
- [ ] Tam player modu
- [ ] Kuyruk yönetimi (server state + localStorage fallback)
- [ ] Shuffle + repeat
- [ ] `POST /api/tracks/:id/play` olayı (listenedMs, completed)
- [ ] Mobile: full-screen player

### T1.7 — Arama
- [ ] Global arama bar (⌘K)
- [ ] `GET /api/search` — tsvector + ILIKE fallback
- [ ] Sonuçlar: parça, sanatçı, albüm, konu ayrık

---

## Sprint 2 — Yükleme & Moderasyon (1 hafta)

### T2.1 — Yükleme akışı
- [ ] `/yukle` — çok adımlı form (audio → meta → AI şeffaflık → lisans)
- [ ] Dosya yükleme: `/api/upload/presign` → R2
- [ ] Waveform önceden hesapla (server-side `audiowaveform` binary)
- [ ] Kapak opsiyonel
- [ ] `POST /api/tracks`

### T2.2 — Albüm yükleme
- [ ] `/yukle/albüm` — önce albüm, sonra parça parça ekle
- [ ] Sıralama (drag-drop)
- [ ] `POST /api/albums` + her parça

### T2.3 — Moderasyon paneli
- [ ] `/admin/moderasyon` — kuyruk: onay bekleyen parçalar
- [ ] Dinle, AI promptu oku, onayla / reddet
- [ ] Reddetme nedeni zorunlu
- [ ] E-posta bildirimi → sanatçı
- [ ] `auditLog` kaydı

---

## Sprint 3 — Ticaret (1 hafta)

### T3.1 — Sepet
- [ ] `/sepet`
- [ ] `POST /api/cart/add`, `/remove`, `GET /api/cart`
- [ ] Lisans seçimi (kişisel/ticari) her item için

### T3.2 — Ödeme (iyzico)
- [ ] iyzico merchant hesabı
- [ ] `lib/payments/iyzico.ts` — client
- [ ] `POST /api/checkout` — token oluştur
- [ ] `/odeme/[orderId]` — iyzico checkout form (iframe)
- [ ] `POST /api/webhook/iyzico` — callback + imza doğrulama
- [ ] Başarılı ödeme → `licenses` oluştur, bildirim + e-posta

### T3.3 — Kitaplık
- [ ] `/kitaplik` — satın alınan + beğenilen
- [ ] Lisans PDF indirme
- [ ] High-quality audio (FLAC varsa) indirme linki

### T3.4 — Sanatçı mali paneli
- [ ] `/panel/gelir` — bu ay satışlar, bekleyen ödeme
- [ ] Payout bilgisi (IBAN) girme
- [ ] Ay sonu rapor CSV

### T3.5 — Lisans belgesi
- [ ] PDF üretimi (React PDF veya Puppeteer)
- [ ] Şablon: alıcı bilgisi, parça, lisans türü, tarih, QR doğrulama
- [ ] R2'ye yükle, `licenses.pdfUrl` set

---

## Sprint 4 — Topluluk (1 hafta)

### T4.1 — Forum
- [ ] `/forum` — kategori listesi
- [ ] `/forum/[category]` — topic listesi
- [ ] `/forum/konu/[id]` — post'lar + cevap formu
- [ ] Markdown destek + `rehype-sanitize`
- [ ] Pin, lock (mod)
- [ ] İç içe yorum (1 seviye)

### T4.2 — Haberler
- [ ] `/haberler` + `/haberler/[slug]`
- [ ] Admin tarafında MDX editör (tiptap veya plain MD)
- [ ] Kategori filtresi

### T4.3 — Yarışmalar
- [ ] `/yarisma` liste
- [ ] `/yarisma/[slug]` detay → katılım formu (parça seç)
- [ ] Oylama sayfası (1 kullanıcı 1 oy)
- [ ] Admin: jüri puanı + finalize
- [ ] Sonuçlar sayfası

### T4.4 — Bildirimler
- [ ] Header'da zil ikonu + sayaç
- [ ] `/bildirimler` sayfası
- [ ] E-posta da gönder (Resend) — kullanıcı ayarlarından kapatılabilir
- [ ] WebSocket **yok**, polling 30s yeterli

### T4.5 — Takip sistemi
- [ ] Sanatçı sayfasında takip butonu
- [ ] Takip edilen sanatçı yayınladığında bildirim
- [ ] `/ana-sayfa` (giriş sonrası) — takip edilenlerin feed'i

---

## Sprint 5 — Dernek & Hesap (0.5 hafta)

### T5.1 — Dernek sayfaları
- [ ] `/dernek/biz-kimiz`
- [ ] `/dernek/etik-ilkeler`
- [ ] `/dernek/tuzuk`
- [ ] `/dernek/mali-seffaflik` — aylık rapor listesi
- [ ] `/dernek/iletisim` — KEP, adres, form

### T5.2 — Üyelik başvurusu
- [ ] `/uyelik-basvurusu`
- [ ] Admin inceleme paneli
- [ ] Aidat ödeme → checkout akışı (reuse)

### T5.3 — Ayarlar
- [ ] `/ayarlar/profil`
- [ ] `/ayarlar/guvenlik` (Clerk embed)
- [ ] `/ayarlar/bildirimler` (e-posta tercihleri)
- [ ] `/ayarlar/kvkk` — aydınlatma metni, onayların tarihi
- [ ] `/ayarlar/verilerimi-indir`
- [ ] `/ayarlar/hesap-sil`

### T5.4 — Playlist
- [ ] `/kitaplik/listeler`
- [ ] Oluştur, parça ekle/çıkar, kapak yükle, public/private

### T5.5 — Geri bildirim widget
- [ ] Sağ altta sabit buton
- [ ] Form: kategori + rating + mesaj
- [ ] `POST /api/feedback`
- [ ] Admin panelinde liste + çözüldü işaretleme

---

## Sprint 6 — Admin & Sertleştirme (0.5-1 hafta)

### T6.1 — Admin dashboard
- [ ] `/admin` — özet istatistikler
- [ ] Kullanıcı yönetimi
- [ ] Moderasyon kuyruğu
- [ ] Modül kontrol paneli
- [ ] Mali rapor
- [ ] Denetim izi
- [ ] KVKK talepleri

### T6.2 — E-posta şablonları
- [ ] Hoşgeldin
- [ ] Başvuru alındı / onaylandı / reddedildi
- [ ] Parça onaylandı / reddedildi
- [ ] Satın alma başarılı + lisans ekli
- [ ] Yarışma kazandın
- [ ] Aylık payout raporu
- [ ] Hesap silme talebi alındı / tamamlandı

### T6.3 — Test kapsamı
- [ ] Unit: `lib/*` — %70+ kapsam
- [ ] E2E Playwright:
  - [ ] Kayıt → giriş
  - [ ] Parça yükle → moderasyon → yayın
  - [ ] Satın al (iyzico sandbox)
  - [ ] Yarışmaya katıl → oy ver
  - [ ] Admin modül toggle

### T6.4 — Performance
- [ ] Lighthouse mobil: 90+ performans, 100 a11y, 100 best-practices
- [ ] Image optimization: tüm kapaklar Next.js `<Image>`
- [ ] Font subset (Türkçe karakterler)
- [ ] Audio stream: range request destekli (R2 default verir)

### T6.5 — Güvenlik kontrol
- [ ] CSRF test
- [ ] Rate limit test
- [ ] SQL injection denemesi (Drizzle yeterli)
- [ ] `next-safe` CSP header'ları
- [ ] Webhook imza testi

### T6.6 — Staging deploy
- [ ] `staging.yazsad.org` → `develop` branch
- [ ] Sahte veri ile bir hafta ürün sahibi testi
- [ ] Geri bildirimle düzeltmeler

### T6.7 — Production deploy
- [ ] Domain DNS
- [ ] SSL
- [ ] iyzico production anahtarları
- [ ] Clerk production instance
- [ ] Supabase production tier
- [ ] Sentry
- [ ] Plausible analytics
- [ ] `/sitemap.xml`, `/robots.txt`

---

## Kabul Testi — MVP Kapanış

Sonrasında ürün sahibi aşağıdakileri kendi test edecek:

- [ ] 3 rolle de giriş yapabildim
- [ ] Sanatçı olarak parça yükledim → onaylandı → yayında
- [ ] Dinleyici olarak iyzico sandbox ile satın aldım
- [ ] Lisans PDF'i indirdim
- [ ] Admin paneli modül pasife aldım → site navda kayboldu
- [ ] Forum'da topic + post açtım
- [ ] Yarışmaya katıldım ve oy verdim
- [ ] Hesap silme talebi oluşturdum, e-posta aldım
- [ ] Mobilde temiz çalıştı (iPhone SE)
- [ ] Sıfır İngilizce UI metni
- [ ] Lighthouse skorları geçti

## Faz 2 Başlangıç Hazırlığı

MVP canlıya çıktıktan 2 hafta sonra Faz 2 planlama:
- AI Asistan (Claude Haiku)
- Soy Ağacı (lineage)
- PWA + Offline
- Canlı Oturumlar
- Prompt Market

Her biri kendi BUILD_ORDER dosyası olarak eklenecek: `BUILD_ORDER_FAZ2.md`.

---

## Genel Hatırlatmalar

- **Her PR küçük kalsın** — 800 satırın üstünü böl
- **Ürün sahibine preview link at**, GIF/video yerine
- **Commit mesajı Conventional Commits**: `feat(auth): ...`, `fix(player): ...`
- **Her commit açıklamada hangi T-numarası olduğunu yaz**: `feat(upload): presigned r2 upload (T2.1)`
- **Tipcheck patlıyorsa merge etme**
- **Türkçe UI metinlerini değiştirmek gerekirse ürün sahibine sor**
