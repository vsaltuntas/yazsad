import { sql } from "drizzle-orm";
import {
  index,
  integer,
  primaryKey,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

// SQLite (Cloudflare D1) adaptasyonu — Postgres orijinalinden çevrildi.
// - enum'lar text + uygulama-katı kontrolüyle
// - dizi/jsonb alanlar text(json mode) ile saklanır
// - timestamp'lar unix-ms integer

export const USER_ROLES = ["listener", "artist", "admin"] as const;
export type UserRole = (typeof USER_ROLES)[number];

export const MEMBERSHIP_TIERS = ["free", "artist", "patron", "business"] as const;
export type MembershipTier = (typeof MEMBERSHIP_TIERS)[number];

export const MEMBERSHIP_STATUSES = ["pending", "active", "suspended", "cancelled"] as const;
export type MembershipStatus = (typeof MEMBERSHIP_STATUSES)[number];

export const TRACK_STATUSES = ["draft", "pending", "approved", "rejected", "archived"] as const;
export type TrackStatus = (typeof TRACK_STATUSES)[number];

export const ORDER_STATUSES = ["pending", "paid", "failed", "refunded"] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

export const LICENSE_TYPES = ["personal", "commercial", "broadcast", "exclusive"] as const;
export type LicenseType = (typeof LICENSE_TYPES)[number];

export const CONTEST_STATUSES = ["draft", "open", "voting", "ended", "archived"] as const;
export type ContestStatus = (typeof CONTEST_STATUSES)[number];

export const MODULE_STATUSES = ["active", "passive", "beta", "maintenance"] as const;
export type ModuleStatus = (typeof MODULE_STATUSES)[number];

export const NOTIFICATION_KINDS = [
  "system",
  "like",
  "comment",
  "follow",
  "sale",
  "contest",
  "payout",
] as const;
export type NotificationKind = (typeof NOTIFICATION_KINDS)[number];

const ts = (name: string) =>
  integer(name, { mode: "timestamp_ms" }).notNull().default(sql`(unixepoch() * 1000)`);
const tsOpt = (name: string) => integer(name, { mode: "timestamp_ms" });
const bool = (name: string) => integer(name, { mode: "boolean" });

// ---- users ----
export const users = sqliteTable(
  "users",
  {
    id: text("id").primaryKey(),
    email: text("email").notNull(),
    phone: text("phone"),
    username: text("username").notNull(),
    displayName: text("display_name").notNull(),
    role: text("role", { enum: USER_ROLES }).notNull().default("listener"),
    avatarUrl: text("avatar_url"),
    bio: text("bio"),
    city: text("city"),
    website: text("website"),
    socialLinks: text("social_links", { mode: "json" }).$type<Record<string, string>>(),
    clerkId: text("clerk_id"),
    kvkkAcceptedAt: tsOpt("kvkk_accepted_at"),
    kvkkVersion: text("kvkk_version"),
    emailVerifiedAt: tsOpt("email_verified_at"),
    suspendedAt: tsOpt("suspended_at"),
    suspendedReason: text("suspended_reason"),
    createdAt: ts("created_at"),
    updatedAt: ts("updated_at"),
    deletedAt: tsOpt("deleted_at"),
  },
  (t) => ({
    emailIdx: uniqueIndex("users_email_idx").on(t.email),
    usernameIdx: uniqueIndex("users_username_idx").on(t.username),
    clerkIdx: uniqueIndex("users_clerk_idx").on(t.clerkId),
    roleIdx: index("users_role_idx").on(t.role),
  }),
);

// ---- memberships ----
export const memberships = sqliteTable("memberships", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  tier: text("tier", { enum: MEMBERSHIP_TIERS }).notNull(),
  status: text("status", { enum: MEMBERSHIP_STATUSES }).notNull().default("pending"),
  applicationData: text("application_data", { mode: "json" }).$type<Record<string, unknown>>(),
  approvedBy: text("approved_by").references(() => users.id),
  approvedAt: tsOpt("approved_at"),
  rejectedReason: text("rejected_reason"),
  currentPeriodStart: tsOpt("current_period_start"),
  currentPeriodEnd: tsOpt("current_period_end"),
  duesPaid: integer("dues_paid").notNull().default(0), // kuruş
  createdAt: ts("created_at"),
});

// ---- artists ----
export const artists = sqliteTable(
  "artists",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    slug: text("slug").notNull(),
    stageName: text("stage_name").notNull(),
    genres: text("genres", { mode: "json" }).$type<string[]>().notNull().default([]),
    toolsUsed: text("tools_used", { mode: "json" }).$type<string[]>().notNull().default([]),
    verified: bool("verified").notNull().default(false),
    featured: bool("featured").notNull().default(false),
    monthlyListeners: integer("monthly_listeners").notNull().default(0),
    totalPlays: integer("total_plays").notNull().default(0),
    totalSales: integer("total_sales").notNull().default(0),
    payoutEmail: text("payout_email"),
    payoutIban: text("payout_iban"),
    commissionRate: text("commission_rate").notNull().default("15.00"),
    createdAt: ts("created_at"),
  },
  (t) => ({
    userIdx: uniqueIndex("artists_user_idx").on(t.userId),
    slugIdx: uniqueIndex("artists_slug_idx").on(t.slug),
  }),
);

// ---- albums ----
export const albums = sqliteTable(
  "albums",
  {
    id: text("id").primaryKey(),
    artistId: text("artist_id")
      .notNull()
      .references(() => artists.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    slug: text("slug").notNull(),
    description: text("description"),
    coverUrl: text("cover_url"),
    releaseDate: text("release_date"), // ISO yyyy-mm-dd
    price: integer("price").notNull().default(0), // kuruş
    status: text("status", { enum: TRACK_STATUSES }).notNull().default("draft"),
    trackCount: integer("track_count").notNull().default(0),
    totalDuration: integer("total_duration").notNull().default(0),
    createdAt: ts("created_at"),
  },
  (t) => ({
    artistSlugIdx: uniqueIndex("albums_artist_slug_idx").on(t.artistId, t.slug),
  }),
);

// ---- tracks ----
export const tracks = sqliteTable(
  "tracks",
  {
    id: text("id").primaryKey(),
    artistId: text("artist_id")
      .notNull()
      .references(() => artists.id, { onDelete: "cascade" }),
    albumId: text("album_id").references(() => albums.id, { onDelete: "set null" }),
    title: text("title").notNull(),
    slug: text("slug").notNull(),

    audioUrl: text("audio_url").notNull(),
    audioFormat: text("audio_format").notNull(),
    audioSize: integer("audio_size").notNull(),
    stemsUrl: text("stems_url"),
    coverUrl: text("cover_url"),
    waveformData: text("waveform_data", { mode: "json" }).$type<number[]>(),

    duration: integer("duration").notNull(), // sn
    bpm: integer("bpm"),
    musicalKey: text("musical_key"),
    genres: text("genres", { mode: "json" }).$type<string[]>().notNull().default([]),
    moods: text("moods", { mode: "json" }).$type<string[]>().notNull().default([]),

    aiModel: text("ai_model").notNull(),
    aiPrompt: text("ai_prompt").notNull(),
    aiSeed: text("ai_seed"),
    humanEditing: text("human_editing"),
    sourceDeclaration: text("source_declaration"),

    price: integer("price").notNull().default(0),
    availableLicenses: text("available_licenses", { mode: "json" })
      .$type<LicenseType[]>()
      .notNull()
      .default([]),

    status: text("status", { enum: TRACK_STATUSES }).notNull().default("pending"),
    rejectedReason: text("rejected_reason"),
    moderatedBy: text("moderated_by").references(() => users.id),
    moderatedAt: tsOpt("moderated_at"),

    playCount: integer("play_count").notNull().default(0),
    likeCount: integer("like_count").notNull().default(0),
    commentCount: integer("comment_count").notNull().default(0),

    parentTrackId: text("parent_track_id"),
    remixType: text("remix_type"),

    publishedAt: tsOpt("published_at"),
    createdAt: ts("created_at"),
    updatedAt: ts("updated_at"),
  },
  (t) => ({
    artistSlugIdx: uniqueIndex("tracks_artist_slug_idx").on(t.artistId, t.slug),
    statusIdx: index("tracks_status_idx").on(t.status),
    publishedIdx: index("tracks_published_idx").on(t.publishedAt),
  }),
);

// ---- orders + items ----
export const orders = sqliteTable("orders", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  status: text("status", { enum: ORDER_STATUSES }).notNull().default("pending"),
  subtotal: integer("subtotal").notNull(),
  tax: integer("tax").notNull().default(0),
  total: integer("total").notNull(),
  currency: text("currency").notNull().default("TRY"),
  iyzicoToken: text("iyzico_token"),
  iyzicoPaymentId: text("iyzico_payment_id"),
  invoiceUrl: text("invoice_url"),
  billingName: text("billing_name"),
  billingTaxId: text("billing_tax_id"),
  createdAt: ts("created_at"),
  paidAt: tsOpt("paid_at"),
});

export const orderItems = sqliteTable("order_items", {
  id: text("id").primaryKey(),
  orderId: text("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  trackId: text("track_id").references(() => tracks.id),
  albumId: text("album_id").references(() => albums.id),
  licenseType: text("license_type", { enum: LICENSE_TYPES }).notNull(),
  price: integer("price").notNull(),
  quantity: integer("quantity").notNull().default(1),
});

// ---- licenses ----
export const licenses = sqliteTable("licenses", {
  id: text("id").primaryKey(),
  buyerId: text("buyer_id")
    .notNull()
    .references(() => users.id),
  trackId: text("track_id").references(() => tracks.id),
  albumId: text("album_id").references(() => albums.id),
  orderId: text("order_id")
    .notNull()
    .references(() => orders.id),
  type: text("type", { enum: LICENSE_TYPES }).notNull(),
  pricePaid: integer("price_paid").notNull(),
  artistShare: integer("artist_share").notNull(),
  platformShare: integer("platform_share").notNull(),
  pdfUrl: text("pdf_url"),
  expiresAt: tsOpt("expires_at"),
  createdAt: ts("created_at"),
});

// ---- playlists ----
export const playlists = sqliteTable("playlists", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description"),
  coverUrl: text("cover_url"),
  isPublic: bool("is_public").notNull().default(false),
  trackCount: integer("track_count").notNull().default(0),
  createdAt: ts("created_at"),
});

export const playlistTracks = sqliteTable(
  "playlist_tracks",
  {
    playlistId: text("playlist_id")
      .notNull()
      .references(() => playlists.id, { onDelete: "cascade" }),
    trackId: text("track_id")
      .notNull()
      .references(() => tracks.id, { onDelete: "cascade" }),
    position: integer("position").notNull(),
    addedAt: ts("added_at"),
  },
  (t) => ({ pk: primaryKey({ columns: [t.playlistId, t.trackId] }) }),
);

// ---- likes / follows ----
export const likes = sqliteTable(
  "likes",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    trackId: text("track_id")
      .notNull()
      .references(() => tracks.id, { onDelete: "cascade" }),
    createdAt: ts("created_at"),
  },
  (t) => ({ pk: primaryKey({ columns: [t.userId, t.trackId] }) }),
);

export const follows = sqliteTable(
  "follows",
  {
    followerId: text("follower_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    followingId: text("following_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    createdAt: ts("created_at"),
  },
  (t) => ({ pk: primaryKey({ columns: [t.followerId, t.followingId] }) }),
);

// ---- comments ----
export const comments = sqliteTable("comments", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  trackId: text("track_id").references(() => tracks.id, { onDelete: "cascade" }),
  parentId: text("parent_id"),
  body: text("body").notNull(),
  timestampMs: integer("timestamp_ms"),
  likeCount: integer("like_count").notNull().default(0),
  createdAt: ts("created_at"),
  deletedAt: tsOpt("deleted_at"),
});

// ---- forum ----
export const forumCategories = sqliteTable("forum_categories", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description"),
  position: integer("position").notNull().default(0),
});

export const forumTopics = sqliteTable("forum_topics", {
  id: text("id").primaryKey(),
  categoryId: text("category_id")
    .notNull()
    .references(() => forumCategories.id),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  title: text("title").notNull(),
  slug: text("slug").notNull(),
  pinned: bool("pinned").notNull().default(false),
  locked: bool("locked").notNull().default(false),
  postCount: integer("post_count").notNull().default(1),
  viewCount: integer("view_count").notNull().default(0),
  lastPostAt: ts("last_post_at"),
  createdAt: ts("created_at"),
});

export const forumPosts = sqliteTable("forum_posts", {
  id: text("id").primaryKey(),
  topicId: text("topic_id")
    .notNull()
    .references(() => forumTopics.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  body: text("body").notNull(),
  editedAt: tsOpt("edited_at"),
  deletedAt: tsOpt("deleted_at"),
  createdAt: ts("created_at"),
});

// ---- contests ----
export const contests = sqliteTable("contests", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  theme: text("theme").notNull(),
  description: text("description"),
  coverUrl: text("cover_url"),
  status: text("status", { enum: CONTEST_STATUSES }).notNull().default("draft"),
  submissionStart: integer("submission_start", { mode: "timestamp_ms" }).notNull(),
  submissionEnd: integer("submission_end", { mode: "timestamp_ms" }).notNull(),
  votingEnd: integer("voting_end", { mode: "timestamp_ms" }).notNull(),
  prizeAmount: integer("prize_amount"),
  prizeDescription: text("prize_description"),
  rules: text("rules"),
  createdAt: ts("created_at"),
});

export const contestEntries = sqliteTable(
  "contest_entries",
  {
    id: text("id").primaryKey(),
    contestId: text("contest_id")
      .notNull()
      .references(() => contests.id),
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    trackId: text("track_id")
      .notNull()
      .references(() => tracks.id),
    voteCount: integer("vote_count").notNull().default(0),
    juryScore: text("jury_score"),
    finalRank: integer("final_rank"),
    createdAt: ts("created_at"),
  },
  (t) => ({ uniq: uniqueIndex("contest_user_uniq").on(t.contestId, t.userId) }),
);

export const contestVotes = sqliteTable(
  "contest_votes",
  {
    entryId: text("entry_id")
      .notNull()
      .references(() => contestEntries.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    createdAt: ts("created_at"),
  },
  (t) => ({ pk: primaryKey({ columns: [t.entryId, t.userId] }) }),
);

// ---- news ----
export const newsArticles = sqliteTable("news_articles", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt"),
  body: text("body").notNull(),
  coverUrl: text("cover_url"),
  category: text("category"),
  authorId: text("author_id")
    .notNull()
    .references(() => users.id),
  publishedAt: tsOpt("published_at"),
  viewCount: integer("view_count").notNull().default(0),
  createdAt: ts("created_at"),
});

// ---- prompts (Faz 2) ----
export const prompts = sqliteTable("prompts", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  title: text("title").notNull(),
  description: text("description"),
  promptText: text("prompt_text").notNull(),
  aiModel: text("ai_model").notNull(),
  difficulty: text("difficulty"),
  price: integer("price").notNull().default(0),
  verifiedAt: tsOpt("verified_at"),
  downloadCount: integer("download_count").notNull().default(0),
  createdAt: ts("created_at"),
});

// ---- modules ----
export const modules = sqliteTable("modules", {
  id: text("id").primaryKey(),
  label: text("label").notNull(),
  category: text("category").notNull(),
  status: text("status", { enum: MODULE_STATUSES }).notNull().default("active"),
  locked: bool("locked").notNull().default(false),
  description: text("description"),
  updatedBy: text("updated_by").references(() => users.id),
  updatedAt: ts("updated_at"),
});

// ---- notifications ----
export const notifications = sqliteTable(
  "notifications",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    kind: text("kind", { enum: NOTIFICATION_KINDS }).notNull(),
    title: text("title").notNull(),
    body: text("body"),
    actionUrl: text("action_url"),
    readAt: tsOpt("read_at"),
    createdAt: ts("created_at"),
  },
  (t) => ({ userIdx: index("notif_user_idx").on(t.userId, t.readAt) }),
);

// ---- feedback ----
export const feedback = sqliteTable("feedback", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => users.id),
  category: text("category").notNull(),
  rating: integer("rating"),
  message: text("message").notNull(),
  routeAtSubmit: text("route_at_submit"),
  userAgent: text("user_agent"),
  resolvedAt: tsOpt("resolved_at"),
  resolvedBy: text("resolved_by").references(() => users.id),
  createdAt: ts("created_at"),
});

// ---- play events ----
export const playEvents = sqliteTable(
  "play_events",
  {
    id: text("id").primaryKey(),
    trackId: text("track_id")
      .notNull()
      .references(() => tracks.id),
    userId: text("user_id").references(() => users.id),
    sessionId: text("session_id"),
    listenedMs: integer("listened_ms").notNull(),
    completed: bool("completed").notNull().default(false),
    country: text("country"),
    createdAt: ts("created_at"),
  },
  (t) => ({ trackDayIdx: index("play_track_day_idx").on(t.trackId, t.createdAt) }),
);

// ---- audit log ----
export const auditLog = sqliteTable("audit_log", {
  id: text("id").primaryKey(),
  actorId: text("actor_id")
    .notNull()
    .references(() => users.id),
  action: text("action").notNull(),
  targetType: text("target_type").notNull(),
  targetId: text("target_id").notNull(),
  meta: text("meta", { mode: "json" }).$type<Record<string, unknown>>(),
  createdAt: ts("created_at"),
});

// ---- cart (oturum içi kalıcı sepet) ----
export const cartItems = sqliteTable(
  "cart_items",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    trackId: text("track_id").references(() => tracks.id, { onDelete: "cascade" }),
    albumId: text("album_id").references(() => albums.id, { onDelete: "cascade" }),
    licenseType: text("license_type", { enum: LICENSE_TYPES }).notNull(),
    price: integer("price").notNull(),
    addedAt: ts("added_at"),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.trackId, t.licenseType] }),
  }),
);

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Track = typeof tracks.$inferSelect;
export type Album = typeof albums.$inferSelect;
export type Artist = typeof artists.$inferSelect;
export type Module = typeof modules.$inferSelect;
export type Order = typeof orders.$inferSelect;
export type License = typeof licenses.$inferSelect;
export type Notification = typeof notifications.$inferSelect;
