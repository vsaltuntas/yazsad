# YAZSAD Handoff Paketi — Claude Code İçin

Bu paket, YAZSAD (Yapay Zekâ Destekli Müzik Sanatçıları Derneği) web platformunun hi-fi HTML prototipini **gerçek, üretime hazır bir web uygulamasına** dönüştürmek için gerekli her şeyi içerir.

## Paket İçeriği

```
handoff/
├── README.md             ← bu dosya
├── CLAUDE.md             ← Claude Code için davranış + stil kuralları (otomatik okunur)
├── HANDOFF.md            ← proje özeti, teknoloji seçimleri, deploy hedefi
├── DATA_MODEL.md         ← tüm tablolar, ilişkiler, enum'lar (Postgres/Supabase)
├── API_CONTRACT.md       ← endpoint'ler + istek/yanıt örnekleri
├── MODULES.md            ← 40+ modülün listesi, MVP/faz ayrımı
├── AUTH_ROLES.md         ← 3 rol, izinler, KVKK notları
└── BUILD_ORDER.md        ← sıralı task listesi (Claude Code buradan başlar)

prototype/                ← hi-fi HTML referans (olduğu gibi korunacak)
├── index.html
├── src/*.jsx
└── src/app.css
```

## Claude Code için Başlama Talimatı

Paketi açtıktan sonra Claude Code'a şunu söyle:

> Bu repoyu aç. Önce `handoff/CLAUDE.md` ve `handoff/README.md` oku. Sonra `handoff/BUILD_ORDER.md`'yi oku ve sıradaki ilk görevi benimle doğrulayarak başla. `prototype/` klasörü sadece **referans tasarım** — olduğu gibi koru, kopyalama. Yeni kodu `app/` (veya önerdiğin yere) yaz.

## Ana Kararlar (Değiştirilmemesi Gereken)

Bu kararlar ürün sahibi tarafından alındı — Claude Code bunları yeniden tartışmamalı:

1. **Dil:** Tüm kullanıcı yüzü Türkçe. Kod Türkçe yorum + İngilizce değişken olabilir.
2. **Hedef deploy:** Cloudflare Pages (frontend) + Cloudflare Workers/D1/R2 (backend) **veya** Vercel + Supabase. Claude Code son kararı verebilir ama Türkiye erişim hızı öncelikli.
3. **Auth:** Clerk veya NextAuth — telefon + e-posta + sosyal. 3 rol (dinleyici / sanatçı / yönetici).
4. **Modül sistemi:** Yönetici panelinden her özellik aktif/pasif/beta yapılabilmeli — bu **MVP'nin parçası**, ertelenemez.
5. **AI şeffaflık:** Her parçada model + prompt alanı zorunlu. Bu kültürel bir karar, vazgeçilemez.
6. **KVKK uyumlu:** Türkiye'de barındırma mümkünse tercih edilir, değilse AB bölgesi.
7. **Para birimi:** TRY (₺). Ödeme: iyzico veya PayTR (Türkiye'ye odaklı).

## Ne yapma

- ❌ Prototipin tasarımını yeniden yorumlama. Görseller, renkler, yerleşim **aynen** korunacak.
- ❌ Şu an eksik olan modülleri MVP'ye ekleme — `MODULES.md`'deki MVP listesi dışına çıkma.
- ❌ İngilizce UI metni yazma.
- ❌ Formspree, localStorage, postMessage gibi prototip çözümlerini üretime taşıma.

## Ne yap

- ✅ `prototype/src/*.jsx` dosyalarındaki layout, copy ve veri şekillerini **referans** al.
- ✅ `DATA_MODEL.md`'deki şemaya sadık kal.
- ✅ Her PR/commit'te hangi MVP görevini kapattığını `BUILD_ORDER.md`'den belirt.
- ✅ Belirsizlik varsa ürün sahibine sor, tahmin etme.

---

**İletişim:** Ürün sahibi bu paketi Claude ile birlikte hazırladı. Sorular için ürün sahibi üzerinden Claude masaüstüne (claude.ai) dönülebilir.

**Prototip URL:** https://yazsad.pages.dev
**Tarih:** Nisan 2026
