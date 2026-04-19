# Drizzle migrations

Bu klasör `pnpm db:generate` komutuyla **otomatik üretilir**. Elle düzenlemeyin.

## İlk kurulum

```bash
pnpm install
pnpm db:generate     # 0000_xxx.sql dosyasını üretir (lib/db/schema.ts'ten)
pnpm db:migrate      # schema + ../policies.sql uygulanır
pnpm db:seed
```

## Yeni migration ekleme

Schema değiştiğinde:

```bash
pnpm db:generate     # yeni 0001_xxx.sql üretilir
git add drizzle/migrations/
```

Migrations sıralı, **numaralı dosyalar silinmez** (silmek = DB drift).

## RLS

`../policies.sql` her `pnpm db:migrate` sonunda tekrar uygulanır (idempotent).
Policy değişiklikleri oraya yazılır, migration klasörüne değil.

## Yeni proje için

`.env.local`'de `DATABASE_URL_DIRECT` set edildikten sonra:
```bash
pnpm db:migrate && pnpm db:migrate
```
İkinci çağrı hata vermemeli (idempotent doğrulaması).
