# CLAUDE.md — YAZSAD

Bu dosya Claude Code tarafından **otomatik olarak okunur**. Tüm oturumlar bu kurallarla başlar.

## Proje Özeti

YAZSAD (Yapay Zekâ Destekli Müzik Sanatçıları Derneği), Türkiye'de AI destekli müzik üreten sanatçılar için **dernek + müzik platformu + marketplace**. Hem topluluk aracı, hem gelir kaynağı, hem politika sesi.

**Prototip:** `prototype/` klasöründe tam çalışan HTML+JSX uygulaması var. **Bu senin tasarım referansın.** Sayfa yerleşimi, component yapısı, copy ve veri şekilleri oradan gelir.

**Hedef:** Prototipi üretime hazır bir web uygulamasına dönüştür.

## Başlamadan Önce

1. `handoff/README.md` — paket haritası
2. `handoff/HANDOFF.md` — teknoloji seçimleri
3. `handoff/BUILD_ORDER.md` — sıralı görev listesi. **Buradan ilerle.**
4. `handoff/DATA_MODEL.md` — veri şeması
5. `handoff/API_CONTRACT.md` — endpoint'ler
6. `handoff/MODULES.md` — modül sistemi
7. `handoff/AUTH_ROLES.md` — auth + roller

## Dil Kuralları

- **UI metni: Türkçe.** İngilizce yazma. Placeholder bile olsa. ("Yükle" de, "Upload" deme.)
- **Değişken adları: İngilizce.** `user`, `trackId`, `uploadFlow` — Türkçe değişken yazma.
- **Yorumlar: Türkçe olabilir.** Özellikle iş mantığı yorumları.
- **Commit mesajları: İngilizce.** Conventional Commits: `feat:`, `fix:`, `refactor:`.

## Kod Stili

- TypeScript **zorunlu**. `any` kullanma — gerekirse `unknown` + type guard.
- React Server Components varsayılan; yalnızca interaktif parçalar `'use client'`.
- CSS Modules veya Tailwind — Next.js seçimine göre `HANDOFF.md`'de belirtilen.
- Dosya başına 400 satırdan fazla yazma — böl.
- Her API route `zod` (veya valibot) ile schema validasyonu yapmalı.

## Tasarım Korunması

Prototip tasarımını **yeniden yorumlama**. Aynı şu şekilde:

- Renkler: `prototype/src/tokens.css` ve `prototype/src/app.css` — kopyala, yeniden yazma
- İkonlar: `prototype/src/icons.jsx` — aynı SVG path'leri kullan
- Layout: her sayfanın grid/flex yapısı prototipte ne ise, aynısı
- Copy: Türkçe metinler birebir taşınacak; değiştirmek gerekirse ürün sahibine sor
- Tema sistemi: 4 tema (Sinema / Minimal / Terminal / Klasik) — hepsi korunacak

## Mimari Kararlar

- Önce **frontend + backend aynı repo (Next.js App Router)**. Monorepo gereksiz karmaşıklık.
- Veritabanı: **Postgres** (Supabase ya da Neon). Prisma veya Drizzle ORM.
- Dosya depolama: **Cloudflare R2** veya **Supabase Storage**. Parça dosyaları için pre-signed upload URL'leri.
- Auth: **Clerk** (Türkiye telefon + Google + e-posta) veya **NextAuth v5**.
- Ödeme: **iyzico** (iyzilink). Yedek: **PayTR**. Stripe değil — Türkiye için zayıf.
- E-posta: **Resend** veya **Postmark**. Turkish locale templates.

## Modül Sistemi (Kritik)

Her özellik (marketplace, yarışma, AI asistan, soy ağacı, ...) **modül** olarak kodlanacak. Yönetici panelinden `status: active | passive | beta | maintenance` olarak değiştirilebilmeli.

- **Aktif:** normal çalışır
- **Pasif:** kullanıcıya görünmez, route bile açılmaz
- **Beta:** üst şerit: "Beta — geri bildirim verin"
- **Bakım:** "Kısa süre içinde geri" mesajı

Nav link'leri modül durumuna göre filtrelenmeli. Detay: `MODULES.md`.

## AI Şeffaflık — Vazgeçilemez

Her müzik parçasında **AI model + prompt** alanı zorunlu. Kullanıcılar bunu görebilmeli. Soy ağacı (lineage) özelliği: parçanın hangi parçadan remix/türemiş olduğu. Bu dernek politikasının temeli.

## Test + Kalite

- Unit test: Vitest
- E2E: Playwright (en az: giriş, yükleme, satın alma, yarışma gönderimi)
- Lighthouse: mobil 90+ performans, 100 accessibility
- Her PR önce tipcheck + lint + test geçmeli

## Yapılacaklar Listesi Disiplini

`BUILD_ORDER.md`'deki MVP görevlerini sırayla kapat. Atla, birleştir, yeniden sırala — ama önce ürün sahibine sor.

Her commit sonunda `BUILD_ORDER.md`'yi güncelleyip kapatılan görevi işaretle.

## İletişim

Belirsizlik varsa **tahmin etme**. Sor. Örnekler:

- "Lisans modelinde 'ticari kullanım' için kaç alt seviye olmalı?"
- "iyzico yerine PayTR'ye geçsem bir engel var mı?"
- "Soy ağacı MVP'de mi yoksa Faz 2'de mi? `MODULES.md`'ye bakayım mı?"

## Yasak Şeyler

- ❌ Prototipte olmayan yeni sayfa/özellik ekleme (sormadan)
- ❌ Renk, font, spacing değiştirme
- ❌ İngilizce UI metni
- ❌ `any` tipi
- ❌ Migration'sız schema değişikliği
- ❌ Secrets'ı repoya koymak (kod gözden geçirmede anında fail)
- ❌ Test yazmadan PR açmak
