# DATA_MODEL.md — YAZSAD Veri Şeması

Postgres + Drizzle ORM. Tüm ID'ler `text` tipinde **CUID2** (nanoid alternatifi — sıralı, kısa, güvenli).

## Enum'lar

```ts
export const userRoleEnum = pgEnum('user_role', ['listener', 'artist', 'admin']);
export const membershipTierEnum = pgEnum('membership_tier', ['free', 'artist', 'patron', 'business']);
export const membershipStatusEnum = pgEnum('membership_status', ['pending', 'active', 'suspended', 'cancelled']);
export const trackStatusEnum = pgEnum('track_status', ['draft', 'pending', 'approved', 'rejected', 'archived']);
export const orderStatusEnum = pgEnum('order_status', ['pending', 'paid', 'failed', 'refunded']);
export const licenseTypeEnum = pgEnum('license_type', ['personal', 'commercial', 'broadcast', 'exclusive']);
export const contestStatusEnum = pgEnum('contest_status', ['draft', 'open', 'voting', 'ended', 'archived']);
export const moduleStatusEnum = pgEnum('module_status', ['active', 'passive', 'beta', 'maintenance']);
export const notificationKindEnum = pgEnum('notification_kind', ['system', 'like', 'comment', 'follow', 'sale', 'contest', 'payout']);
```

## Ana Tablolar

### users

```ts
export const users = pgTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  phone: text('phone').unique(),
  username: text('username').notNull().unique(),    // @kullanıcı
  displayName: text('display_name').notNull(),
  role: userRoleEnum('role').notNull().default('listener'),
  avatarUrl: text('avatar_url'),
  bio: text('bio'),
  city: text('city'),
  website: text('website'),
  socialLinks: jsonb('social_links').$type<Record<string, string>>(),  // instagram, youtube, spotify, ...
  clerkId: text('clerk_id').unique(),                // Clerk auth ID
  kvkkAcceptedAt: timestamp('kvkk_accepted_at'),
  kvkkVersion: text('kvkk_version'),
  emailVerifiedAt: timestamp('email_verified_at'),
  suspendedAt: timestamp('suspended_at'),
  suspendedReason: text('suspended_reason'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),               // soft delete (KVKK)
});
```

### memberships (dernek üyeliği)

```ts
export const memberships = pgTable('memberships', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  tier: membershipTierEnum('tier').notNull(),
  status: membershipStatusEnum('status').notNull().default('pending'),
  applicationData: jsonb('application_data'),        // başvuru formu içeriği
  approvedBy: text('approved_by').references(() => users.id),
  approvedAt: timestamp('approved_at'),
  rejectedReason: text('rejected_reason'),
  currentPeriodStart: timestamp('current_period_start'),
  currentPeriodEnd: timestamp('current_period_end'),
  duesPaid: integer('dues_paid').notNull().default(0),  // kuruş
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
```

### artists (sanatçı profili — users'ı genişletir)

```ts
export const artists = pgTable('artists', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().unique().references(() => users.id, { onDelete: 'cascade' }),
  slug: text('slug').notNull().unique(),               // URL'de kullanılacak
  stageName: text('stage_name').notNull(),             // sahne adı
  genres: text('genres').array(),                      // ['Ambient', 'Synthwave']
  toolsUsed: text('tools_used').array(),              // ['Suno v4.5', 'Udio', 'Stable Audio']
  verified: boolean('verified').notNull().default(false),
  featured: boolean('featured').notNull().default(false),
  monthlyListeners: integer('monthly_listeners').notNull().default(0),
  totalPlays: bigint('total_plays', { mode: 'number' }).notNull().default(0),
  totalSales: integer('total_sales').notNull().default(0),
  payoutEmail: text('payout_email'),
  payoutIban: text('payout_iban'),                    // ödeme bilgisi
  commissionRate: numeric('commission_rate', { precision: 4, scale: 2 }).notNull().default('15.00'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
```

### albums

```ts
export const albums = pgTable('albums', {
  id: text('id').primaryKey(),
  artistId: text('artist_id').notNull().references(() => artists.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  slug: text('slug').notNull(),
  description: text('description'),
  coverUrl: text('cover_url'),
  releaseDate: date('release_date'),
  price: integer('price').notNull().default(0),       // kuruş, 0 = ücretsiz
  status: trackStatusEnum('status').notNull().default('draft'),
  trackCount: integer('track_count').notNull().default(0),
  totalDuration: integer('total_duration').notNull().default(0),  // saniye
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (t) => ({
  artistSlugIdx: uniqueIndex('album_artist_slug_idx').on(t.artistId, t.slug),
}));
```

### tracks

```ts
export const tracks = pgTable('tracks', {
  id: text('id').primaryKey(),
  artistId: text('artist_id').notNull().references(() => artists.id, { onDelete: 'cascade' }),
  albumId: text('album_id').references(() => albums.id, { onDelete: 'set null' }),
  title: text('title').notNull(),
  slug: text('slug').notNull(),

  // Dosyalar (R2'de)
  audioUrl: text('audio_url').notNull(),
  audioFormat: text('audio_format').notNull(),         // mp3, wav, flac
  audioSize: bigint('audio_size', { mode: 'number' }).notNull(),
  stemsUrl: text('stems_url'),                         // opsiyonel, zip
  coverUrl: text('cover_url'),
  waveformData: jsonb('waveform_data'),                // önceden hesaplanmış peaks

  // Müzik bilgisi
  duration: integer('duration').notNull(),             // saniye
  bpm: integer('bpm'),
  musicalKey: text('musical_key'),                     // "Am", "C#"
  genres: text('genres').array().notNull().default(sql`ARRAY[]::text[]`),
  moods: text('moods').array().notNull().default(sql`ARRAY[]::text[]`),

  // AI şeffaflık — ZORUNLU
  aiModel: text('ai_model').notNull(),                 // "Suno v4.5", "Udio 130"
  aiPrompt: text('ai_prompt').notNull(),
  aiSeed: text('ai_seed'),
  humanEditing: text('human_editing'),                 // "Masterlama, stem düzenleme"
  sourceDeclaration: text('source_declaration'),       // etik beyan

  // Lisanslama
  price: integer('price').notNull().default(0),        // kuruş, 0 = ücretsiz dinle, satılmaz
  availableLicenses: text('available_licenses').array().notNull(),  // ['personal', 'commercial']

  // Durum
  status: trackStatusEnum('status').notNull().default('pending'),
  rejectedReason: text('rejected_reason'),
  moderatedBy: text('moderated_by').references(() => users.id),
  moderatedAt: timestamp('moderated_at'),

  // İstatistik
  playCount: bigint('play_count', { mode: 'number' }).notNull().default(0),
  likeCount: integer('like_count').notNull().default(0),
  commentCount: integer('comment_count').notNull().default(0),

  // Remix / soy ağacı (opsiyonel — Faz 2'de aktif)
  parentTrackId: text('parent_track_id').references((): any => tracks.id),
  remixType: text('remix_type'),                       // "remix", "cover", "sample"

  publishedAt: timestamp('published_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
}, (t) => ({
  artistSlugIdx: uniqueIndex('track_artist_slug_idx').on(t.artistId, t.slug),
  statusIdx: index('track_status_idx').on(t.status),
  publishedIdx: index('track_published_idx').on(t.publishedAt),
  searchIdx: index('track_search_idx').using('gin',
    sql`to_tsvector('turkish', ${t.title} || ' ' || coalesce(${t.aiPrompt}, ''))`
  ),
}));
```

### licenses (satış sonrası oluşur)

```ts
export const licenses = pgTable('licenses', {
  id: text('id').primaryKey(),
  buyerId: text('buyer_id').notNull().references(() => users.id),
  trackId: text('track_id').references(() => tracks.id),
  albumId: text('album_id').references(() => albums.id),
  orderId: text('order_id').notNull().references(() => orders.id),
  type: licenseTypeEnum('type').notNull(),
  pricePaid: integer('price_paid').notNull(),
  artistShare: integer('artist_share').notNull(),     // %85
  platformShare: integer('platform_share').notNull(), // %15
  pdfUrl: text('pdf_url'),                             // lisans belgesi R2'de
  expiresAt: timestamp('expires_at'),                  // null = süresiz
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
```

### orders

```ts
export const orders = pgTable('orders', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  status: orderStatusEnum('status').notNull().default('pending'),
  subtotal: integer('subtotal').notNull(),
  tax: integer('tax').notNull().default(0),
  total: integer('total').notNull(),
  currency: text('currency').notNull().default('TRY'),
  iyzicoToken: text('iyzico_token'),
  iyzicoPaymentId: text('iyzico_payment_id'),
  invoiceUrl: text('invoice_url'),
  billingName: text('billing_name'),
  billingTaxId: text('billing_tax_id'),              // TC kimlik veya vergi no
  createdAt: timestamp('created_at').notNull().defaultNow(),
  paidAt: timestamp('paid_at'),
});

export const orderItems = pgTable('order_items', {
  id: text('id').primaryKey(),
  orderId: text('order_id').notNull().references(() => orders.id, { onDelete: 'cascade' }),
  trackId: text('track_id').references(() => tracks.id),
  albumId: text('album_id').references(() => albums.id),
  licenseType: licenseTypeEnum('license_type').notNull(),
  price: integer('price').notNull(),
  quantity: integer('quantity').notNull().default(1),
});
```

### playlists

```ts
export const playlists = pgTable('playlists', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  description: text('description'),
  coverUrl: text('cover_url'),
  isPublic: boolean('is_public').notNull().default(false),
  trackCount: integer('track_count').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const playlistTracks = pgTable('playlist_tracks', {
  playlistId: text('playlist_id').notNull().references(() => playlists.id, { onDelete: 'cascade' }),
  trackId: text('track_id').notNull().references(() => tracks.id, { onDelete: 'cascade' }),
  position: integer('position').notNull(),
  addedAt: timestamp('added_at').notNull().defaultNow(),
}, (t) => ({
  pk: primaryKey({ columns: [t.playlistId, t.trackId] }),
}));
```

### likes / follows

```ts
export const likes = pgTable('likes', {
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  trackId: text('track_id').notNull().references(() => tracks.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (t) => ({
  pk: primaryKey({ columns: [t.userId, t.trackId] }),
}));

export const follows = pgTable('follows', {
  followerId: text('follower_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  followingId: text('following_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (t) => ({
  pk: primaryKey({ columns: [t.followerId, t.followingId] }),
}));
```

### comments

```ts
export const comments = pgTable('comments', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  trackId: text('track_id').references(() => tracks.id, { onDelete: 'cascade' }),
  parentId: text('parent_id').references((): any => comments.id),  // iç içe yorum
  body: text('body').notNull(),
  timestampMs: integer('timestamp_ms'),              // parçanın hangi sn'sinde — opsiyonel
  likeCount: integer('like_count').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
});
```

## Forum

### forumCategories / forumTopics / forumPosts

```ts
export const forumCategories = pgTable('forum_categories', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  description: text('description'),
  position: integer('position').notNull().default(0),
});

export const forumTopics = pgTable('forum_topics', {
  id: text('id').primaryKey(),
  categoryId: text('category_id').notNull().references(() => forumCategories.id),
  userId: text('user_id').notNull().references(() => users.id),
  title: text('title').notNull(),
  slug: text('slug').notNull(),
  pinned: boolean('pinned').notNull().default(false),
  locked: boolean('locked').notNull().default(false),
  postCount: integer('post_count').notNull().default(1),
  viewCount: integer('view_count').notNull().default(0),
  lastPostAt: timestamp('last_post_at').notNull().defaultNow(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const forumPosts = pgTable('forum_posts', {
  id: text('id').primaryKey(),
  topicId: text('topic_id').notNull().references(() => forumTopics.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull().references(() => users.id),
  body: text('body').notNull(),                         // markdown
  editedAt: timestamp('edited_at'),
  deletedAt: timestamp('deleted_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
```

## Yarışmalar

```ts
export const contests = pgTable('contests', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  theme: text('theme').notNull(),
  description: text('description'),
  coverUrl: text('cover_url'),
  status: contestStatusEnum('status').notNull().default('draft'),
  submissionStart: timestamp('submission_start').notNull(),
  submissionEnd: timestamp('submission_end').notNull(),
  votingEnd: timestamp('voting_end').notNull(),
  prizeAmount: integer('prize_amount'),                // kuruş
  prizeDescription: text('prize_description'),
  rules: text('rules'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const contestEntries = pgTable('contest_entries', {
  id: text('id').primaryKey(),
  contestId: text('contest_id').notNull().references(() => contests.id),
  userId: text('user_id').notNull().references(() => users.id),
  trackId: text('track_id').notNull().references(() => tracks.id),
  voteCount: integer('vote_count').notNull().default(0),
  juryScore: numeric('jury_score', { precision: 4, scale: 2 }),
  finalRank: integer('final_rank'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (t) => ({
  uniq: uniqueIndex('contest_user_uniq').on(t.contestId, t.userId),
}));

export const contestVotes = pgTable('contest_votes', {
  entryId: text('entry_id').notNull().references(() => contestEntries.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (t) => ({
  pk: primaryKey({ columns: [t.entryId, t.userId] }),
}));
```

## Haberler / Blog

```ts
export const newsArticles = pgTable('news_articles', {
  id: text('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  excerpt: text('excerpt'),
  body: text('body').notNull(),                        // markdown
  coverUrl: text('cover_url'),
  category: text('category'),
  authorId: text('author_id').notNull().references(() => users.id),
  publishedAt: timestamp('published_at'),
  viewCount: integer('view_count').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
```

## Prompt Market (Faz 2)

```ts
export const prompts = pgTable('prompts', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  title: text('title').notNull(),
  description: text('description'),
  promptText: text('prompt_text').notNull(),
  aiModel: text('ai_model').notNull(),
  difficulty: text('difficulty'),                      // beginner/intermediate/advanced
  price: integer('price').notNull().default(0),
  verifiedAt: timestamp('verified_at'),
  downloadCount: integer('download_count').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
```

## Modül Sistemi

```ts
export const modules = pgTable('modules', {
  id: text('id').primaryKey(),                          // "marketplace", "contest", "lineage", ...
  label: text('label').notNull(),                       // "Marketplace"
  category: text('category').notNull(),                 // "Çekirdek", "Dernek", "AI", ...
  status: moduleStatusEnum('status').notNull().default('active'),
  locked: boolean('locked').notNull().default(false),   // çekirdek modüller kilitli
  description: text('description'),
  updatedBy: text('updated_by').references(() => users.id),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
```

Modül listesi tam olarak `MODULES.md`'deki gibi seed edilir.

## Bildirimler

```ts
export const notifications = pgTable('notifications', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  kind: notificationKindEnum('kind').notNull(),
  title: text('title').notNull(),
  body: text('body'),
  actionUrl: text('action_url'),
  readAt: timestamp('read_at'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (t) => ({
  userIdx: index('notif_user_idx').on(t.userId, t.readAt),
}));
```

## Geri bildirim

```ts
export const feedback = pgTable('feedback', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id),     // null = misafir
  category: text('category').notNull(),                    // bug, feature, general, praise
  rating: integer('rating'),                               // 1-5
  message: text('message').notNull(),
  routeAtSubmit: text('route_at_submit'),
  userAgent: text('user_agent'),
  resolvedAt: timestamp('resolved_at'),
  resolvedBy: text('resolved_by').references(() => users.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
```

## Oturum / Analitik (hafif)

```ts
export const playEvents = pgTable('play_events', {
  id: text('id').primaryKey(),
  trackId: text('track_id').notNull().references(() => tracks.id),
  userId: text('user_id').references(() => users.id),     // null = anonim
  sessionId: text('session_id'),
  listenedMs: integer('listened_ms').notNull(),
  completed: boolean('completed').notNull().default(false),
  country: text('country'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
}, (t) => ({
  trackDayIdx: index('play_track_day_idx').on(t.trackId, t.createdAt),
}));
```

## Denetim İzi (admin aksiyonları)

```ts
export const auditLog = pgTable('audit_log', {
  id: text('id').primaryKey(),
  actorId: text('actor_id').notNull().references(() => users.id),
  action: text('action').notNull(),                        // "track.approve", "module.toggle", ...
  targetType: text('target_type').notNull(),               // "track", "user", "module"
  targetId: text('target_id').notNull(),
  meta: jsonb('meta'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
```

## Row-Level Security (Supabase)

Kritik RLS kuralları:

- `tracks` — `SELECT`: herkese açık ama `status='approved'`. Sanatçı kendi taslaklarını görür.
- `orders`, `licenses` — sadece alıcı kendisi + admin
- `memberships` — sahip + admin
- `auditLog` — sadece admin
- `modules` — `SELECT` herkese (frontend filtrelemesi için), `UPDATE` sadece admin

Detaylı policy'ler migration dosyasında.

## Indexler

Performans için kritik:

- `tracks(status, publishedAt DESC)` — ana sayfa feed
- `tracks(artistId, publishedAt DESC)` — sanatçı sayfası
- `playEvents(trackId, createdAt)` — günlük istatistik
- `notifications(userId, readAt)` — okunmamış sayısı
- Full-text search `tracks.title + aiPrompt` — Türkçe tsvector

## İlişki Özeti

```
users 1-1 artists
users 1-* memberships
artists 1-* albums
artists 1-* tracks
albums 1-* tracks
tracks *-* users (likes, licenses via orders)
tracks 1-* comments
users 1-* orders 1-* orderItems
orders 1-* licenses
contests 1-* contestEntries *-* users
forumCategories 1-* forumTopics 1-* forumPosts
tracks 1-1 parentTrack (self, lineage)
```

## Migration Stratejisi

1. İlk migration: yukarıdaki tüm tablolar + enum'lar + RLS
2. Seed script: modüller (`MODULES.md`'den), forum kategorileri, demo admin kullanıcı
3. Her PR kendi migration'ını getirir — asla mevcut migration'ı düzenleme
