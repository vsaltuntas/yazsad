# YAZSAD — Cloudflare Pages Deploy Rehberi

Bu paket, YAZSAD'ı Cloudflare Pages üzerinde **ücretsiz** bir şekilde yayına almak için hazır. Sunucu veya build adımı gerekmez — statik dosyalar ve opsiyonel Pages Functions yeter.

---

## 🚀 Hızlı Deploy (5 dakika)

### Seçenek A — Direct Upload (önerilir, build yok)

1. [dash.cloudflare.com](https://dash.cloudflare.com) → hesabına gir.
2. Sol menüde **Workers & Pages** → **Create application** → **Pages** → **Upload assets**.
3. Proje adı: `yazsad` (veya istediğin)
4. **Bu projenin tamamını zip'le** ve yükle. (veya "Select from computer" ile klasör seç)
5. **Deploy** → 30 saniye içinde `yazsad.pages.dev` adresinde canlı.

### Seçenek B — Git Bağlantısı

1. Bu projeyi bir GitHub repo'suna push'la.
2. Cloudflare Pages → **Connect to Git** → repo'yu seç.
3. Build ayarları:
   - **Framework preset:** None
   - **Build command:** (boş bırak)
   - **Build output directory:** `/`
4. **Save and Deploy**.

---

## 🌐 Özel alan adı

Pages projesi açıldıktan sonra:
1. **Custom domains** sekmesi → **Set up a custom domain**
2. `yazsad.org` veya `www.yazsad.org` ekle.
3. Cloudflare DNS'de A/CNAME kaydı otomatik oluşur.
4. SSL sertifikası otomatik — Let's Encrypt.

---

## 📁 Dosya Yapısı

```
.
├── index.html              ← tek sayfa uygulaması
├── src/                    ← tüm JSX modülleri (babel ile runtime transpile)
├── functions/
│   └── api/
│       └── feedback.js     ← POST /api/feedback (Cloudflare Function)
├── _redirects              ← SPA fallback
├── _headers                ← güvenlik + caching
├── robots.txt
└── DEPLOY.md               ← bu dosya
```

### Her dosya ne yapar

| Dosya | Görev |
|---|---|
| `_redirects` | Tüm yolları `index.html`'e yönlendirir (SPA client-side routing için) |
| `_headers` | X-Frame, CSP, cache kuralları |
| `functions/api/feedback.js` | Geri bildirim formunun arka ucu — otomatik çalışır |
| `robots.txt` | Arama motorlarına site haritası |

---

## 📬 Geri Bildirim Sistemi

Site içindeki "💬 Geri bildirim" butonu şu anda **localStorage**'a yazıyor (demo modu). Canlıya geçtiğinde `POST /api/feedback`'e iletmesi için:

### 1. Cloudflare Functions'ı aç
Deploy ekranında Functions otomatik açılır. `functions/api/feedback.js` zaten hazır.

### 2. (Opsiyonel) Slack/Discord webhook bağla
Cloudflare Dashboard → Pages projesi → **Settings** → **Environment variables** → **Add variable**:
- Name: `FEEDBACK_WEBHOOK`
- Value: Slack incoming webhook URL'in (örn. `https://hooks.slack.com/services/...`)

Her geri bildirim anında Slack kanalına düşer.

### 3. (Opsiyonel) KV ile kalıcı saklama
Cloudflare Dashboard → **Workers & Pages** → **KV** → yeni namespace oluştur (örn. `yazsad-feedback`).
Pages projesi → **Settings** → **Functions** → **KV namespace bindings** → `FEEDBACK_KV` adıyla bağla.

### 4. Client kodunu güncelle (opsiyonel)
Şu an localStorage'a yazıyor. Canlıda gerçek endpoint'e göndersin istersen `src/feedback.jsx` içindeki `submit()` fonksiyonuna şunu ekle:

```js
await fetch('/api/feedback', {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ rating, category, message, email }),
});
```

---

## ⚙️ Performans

Cloudflare Pages tüm dosyaları küresel CDN'den servis eder. Free tier limitleri:
- 500 build/ay (Direct Upload sınırsız)
- 100.000 istek/gün Pages Functions
- 20.000 KV okuma/gün (bağladıysan)

Typical YAZSAD sayfası ~150KB transfer, ilk yüklemede. Tekrar ziyaretlerde `_headers` cache'i sayesinde <10KB.

---

## 🔒 Güvenlik Notları

- Kimlik doğrulama şu an **mock** (sadece UI). Gerçek auth için Supabase / Cloudflare Access entegrasyonu gerekli.
- Ödeme akışı mock. iyzico / Stripe entegrasyonu ayrı Pages Function'da eklenmeli.
- Dosya yükleme mock. R2 (Cloudflare Object Storage) veya Bunny CDN ile bağlanmalı.

---

## 📝 İleri Adımlar (backend entegrasyonu)

| Özellik | Çözüm önerisi |
|---|---|
| Kullanıcı hesabı | Supabase Auth veya Clerk |
| Parça/albüm DB | Supabase Postgres veya D1 (Cloudflare) |
| Ses dosyası storage | R2 + signed URL |
| Ödeme | iyzico (TR) + Stripe (global) |
| Arama | Algolia veya Meilisearch Cloud |
| E-posta | Resend veya Postmark |

Her biri ayrı Cloudflare Pages Function olarak eklenebilir.

---

## 🆘 Sorun giderme

**Sayfa yenileyince 404 geliyor**
→ `_redirects` dosyasının proje kökünde olduğundan emin ol.

**Functions çalışmıyor**
→ Pages projesinde Functions otomatik açılır ama build log'da aktif göründüğünü kontrol et.

**Feedback form tepki vermiyor**
→ Tarayıcı DevTools → Network sekmesinde `/api/feedback` POST isteğini kontrol et. 500 dönüyorsa Cloudflare Function log'larını Dashboard'dan oku.

---

İyi yayınlar 🎵
