import { sql } from "drizzle-orm";
import {
  bigint,
  boolean,
  date,
  index,
  integer,
  jsonb,
  numeric,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

// Enums — handoff/DATA_MODEL.md'den birebir.
export const userRoleEnum = pgEnum("user_role", ["listener", "artist", "admin"]);
export const membershipTierEnum = pgEnum("membership_tier", [
  "free",
  "artist",
  "patron",
  "business",
]);
export const membershipStatusEnum = pgEnum("membership_status", [
  "pending",
  "active",
  "suspended",
  "cancelled",
]);
export const trackStatusEnum = pgEnum("track_status", [
  "draft",
  "pending",
  "approved",
  "rejected",
  "archived",
]);
export const orderStatusEnum = pgEnum("order_status", [
  "pending",
  "paid",
  "failed",
  "refunded",
]);
export const licenseTypeEnum = pgEnum("license_type", [
  "personal",
  "commercial",
  "broadcast",
  "exclusive",
]);
export const contestStatusEnum = pgEnum("contest_status", [
  "draft",
  "open",
  "voting",
  "ended",
  "archived",
]);
export const moduleStatusEnum = pgEnum("module_status", [
  "active",
  "passive",
  "beta",
  "maintenance",
]);
export const notificationKindEnum = pgEnum("notification_kind", [
  "system",
  "like",
  "comment",
  "follow",
  "sale",
  "contest",
  "payout",
]);

export const USER_ROLES = userRoleEnum.enumValues;
export type UserRole = (typeof USER_ROLES)[number];
export const MODULE_STATUSES = moduleStatusEnum.enumValues;
export type ModuleStatus = (typeof MODULE_STATUSES)[number];
export const TRACK_STATUSES = trackStatusEnum.enumValues;
export type TrackStatus = (typeof TRACK_STATUSES)[number];
export const LICENSE_TYPES = licenseTypeEnum.enumValues;
export type LicenseType = (typeof LICENSE_TYPES)[number];

const ts = (name: string) =>
  timestamp(name, { withTimezone: true, mode: "date" }).notNull().defaultNow();
const tsOpt = (name: string) => timestamp(name, { withTimezone: true, mode: "date" });

// ---------- users ----------
export const users = pgTable(
  "users",
  {
    id: text("id").primaryKey(),
    email: text("email").notNull(),
    phone: text("phone"),
    username: text("username").notNull(),
    displayName: text("display_name").notNull(),
    role: userRoleEnum("role").notNull().default("listener"),
    avatarUrl: text("avatar_url"),
    bio: text("bio"),
    city: text("city"),
    website: text("website"),
    socialLinks: jsonb("social_links").$type<Record<string, string>>(),
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

// ---------- memberships ----------
export const memberships = pgTable("memberships", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  tier: membershipTierEnum("tier").notNull(),
  status: membershipStatusEnum("status").notNull().default("pending"),
  applicationData: jsonb("application_data").$type<Record<string, unknown>>(),
  approvedBy: text("approved_by").references(() => users.id),
  approvedAt: tsOpt("approved_at"),
  rejectedReason: text("rejected_reason"),
  currentPeriodStart: tsOpt("current_period_start"),
  currentPeriodEnd: tsOpt("current_period_end"),
  duesPaid: integer("dues_paid").notNull().default(0), // kuruş
  createdAt: ts("created_at"),
});

// ---------- artists ----------
export const artists = pgTable(
  "artists",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    slug: text("slug").notNull(),
    stageName: text("stage_name").notNull(),
    genres: text("genres").array().notNull().default(sql`ARRAY[]::text[]`),
    toolsUsed: text("tools_used").array().notNull().default(sql`ARRAY[]::text[]`),
    verified: boolean("verified").notNull().default(false),
    featured: boolean("featured").notNull().default(false),
    monthlyListeners: integer("monthly_listeners").notNull().default(0),
    totalPlays: bigint("total_plays", { mode: "number" }).notNull().default(0),
    totalSales: integer("total_sales").notNull().default(0),
    payoutEmail: text("payout_email"),
    payoutIban: text("payout_iban"),
    commissionRate: numeric("commission_rate", { precision: 5, scale: 2 })
      .notNull()
      .default("15.00"),
    createdAt: ts("created_at"),
  },
  (t) => ({
    userIdx: uniqueIndex("artists_user_idx").on(t.userId),
    slugIdx: uniqueIndex("artists_slug_idx").on(t.slug),
  }),
);

// ---------- albums ----------
export const albums = pgTable(
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
    releaseDate: date("release_date"),
    price: integer("price").notNull().default(0),
    status: trackStatusEnum("status").notNull().default("draft"),
    trackCount: integer("track_count").notNull().default(0),
    totalDuration: integer("total_duration").notNull().default(0),
    createdAt: ts("created_at"),
  },
  (t) => ({
    artistSlugIdx: uniqueIndex("album_artist_slug_idx").on(t.artistId, t.slug),
  }),
);

// ---------- tracks ----------
export const tracks = pgTable(
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
    audioSize: bigint("audio_size", { mode: "number" }).notNull(),
    stemsUrl: text("stems_url"),
    coverUrl: text("cover_url"),
    waveformData: jsonb("waveform_data").$type<number[]>(),

    duration: integer("duration").notNull(),
    bpm: integer("bpm"),
    musicalKey: text("musical_key"),
    genres: text("genres").array().notNull().default(sql`ARRAY[]::text[]`),
    moods: text("moods").array().notNull().default(sql`ARRAY[]::text[]`),

    // AI şeffaflık — zorunlu
    aiModel: text("ai_model").notNull(),
    aiPrompt: text("ai_prompt").notNull(),
    aiSeed: text("ai_seed"),
    humanEditing: text("human_editing"),
    sourceDeclaration: text("source_declaration"),

    price: integer("price").notNull().default(0),
    availableLicenses: text("available_licenses")
      .array()
      .notNull()
      .default(sql`ARRAY[]::text[]`),

    status: trackStatusEnum("status").notNull().default("pending"),
    rejectedReason: text("rejected_reason"),
    moderatedBy: text("moderated_by").references(() => users.id),
    moderatedAt: tsOpt("moderated_at"),

    playCount: bigint("play_count", { mode: "number" }).notNull().default(0),
    likeCount: integer("like_count").notNull().default(0),
    commentCount: integer("comment_count").notNull().default(0),

    // Soy ağacı (Faz 2)
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
    // Türkçe tsvector — index trigger ile doldurulur (policies.sql)
    searchIdx: index("tracks_search_idx").using(
      "gin",
      sql`to_tsvector('turkish', coalesce(${t.title}, '') || ' ' || coalesce(${t.aiPrompt}, ''))`,
    ),
  }),
);

// ---------- orders + items ----------
export const orders = pgTable("orders", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  status: orderStatusEnum("status").notNull().default("pending"),
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

export const orderItems = pgTable("order_items", {
  id: text("id").primaryKey(),
  orderId: text("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  trackId: text("track_id").references(() => tracks.id),
  albumId: text("album_id").references(() => albums.id),
  licenseType: licenseTypeEnum("license_type").notNull(),
  price: integer("price").notNull(),
  quantity: integer("quantity").notNull().default(1),
});

// ---------- licenses ----------
export const licenses = pgTable("licenses", {
  id: text("id").primaryKey(),
  buyerId: text("buyer_id")
    .notNull()
    .references(() => users.id),
  trackId: text("track_id").references(() => tracks.id),
  albumId: text("album_id").references(() => albums.id),
  orderId: text("order_id")
    .notNull()
    .references(() => orders.id),
  type: licenseTypeEnum("type").notNull(),
  pricePaid: integer("price_paid").notNull(),
  artistShare: integer("artist_share").notNull(),
  platformShare: integer("platform_share").notNull(),
  pdfUrl: text("pdf_url"),
  expiresAt: tsOpt("expires_at"),
  createdAt: ts("created_at"),
});

// ---------- cart ----------
export const cartItems = pgTable(
  "cart_items",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    trackId: text("track_id").references(() => tracks.id, { onDelete: "cascade" }),
    albumId: text("album_id").references(() => albums.id, { onDelete: "cascade" }),
    licenseType: licenseTypeEnum("license_type").notNull(),
    price: integer("price").notNull(),
    addedAt: ts("added_at"),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.trackId, t.licenseType] }),
  }),
);

// ---------- playlists ----------
export const playlists = pgTable("playlists", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description"),
  coverUrl: text("cover_url"),
  isPublic: boolean("is_public").notNull().default(false),
  trackCount: integer("track_count").notNull().default(0),
  createdAt: ts("created_at"),
});

export const playlistTracks = pgTable(
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

// ---------- likes / follows ----------
export const likes = pgTable(
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

export const follows = pgTable(
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

// ---------- comments ----------
export const comments = pgTable("comments", {
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

// ---------- forum ----------
export const forumCategories = pgTable("forum_categories", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description"),
  position: integer("position").notNull().default(0),
});

export const forumTopics = pgTable("forum_topics", {
  id: text("id").primaryKey(),
  categoryId: text("category_id")
    .notNull()
    .references(() => forumCategories.id),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  title: text("title").notNull(),
  slug: text("slug").notNull(),
  pinned: boolean("pinned").notNull().default(false),
  locked: boolean("locked").notNull().default(false),
  postCount: integer("post_count").notNull().default(1),
  viewCount: integer("view_count").notNull().default(0),
  lastPostAt: ts("last_post_at"),
  createdAt: ts("created_at"),
});

export const forumPosts = pgTable("forum_posts", {
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

// ---------- contests ----------
export const contests = pgTable("contests", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  theme: text("theme").notNull(),
  description: text("description"),
  coverUrl: text("cover_url"),
  status: contestStatusEnum("status").notNull().default("draft"),
  submissionStart: timestamp("submission_start", { withTimezone: true }).notNull(),
  submissionEnd: timestamp("submission_end", { withTimezone: true }).notNull(),
  votingEnd: timestamp("voting_end", { withTimezone: true }).notNull(),
  prizeAmount: integer("prize_amount"),
  prizeDescription: text("prize_description"),
  rules: text("rules"),
  createdAt: ts("created_at"),
});

export const contestEntries = pgTable(
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
    juryScore: numeric("jury_score", { precision: 5, scale: 2 }),
    finalRank: integer("final_rank"),
    createdAt: ts("created_at"),
  },
  (t) => ({ uniq: uniqueIndex("contest_user_uniq").on(t.contestId, t.userId) }),
);

export const contestVotes = pgTable(
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

// ---------- news ----------
export const newsArticles = pgTable("news_articles", {
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

// ---------- prompts (Faz 2) ----------
export const prompts = pgTable("prompts", {
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

// ---------- modules ----------
export const modules = pgTable("modules", {
  id: text("id").primaryKey(),
  label: text("label").notNull(),
  category: text("category").notNull(),
  status: moduleStatusEnum("status").notNull().default("active"),
  locked: boolean("locked").notNull().default(false),
  description: text("description"),
  updatedBy: text("updated_by").references(() => users.id),
  updatedAt: ts("updated_at"),
});

// ---------- notifications ----------
export const notifications = pgTable(
  "notifications",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    kind: notificationKindEnum("kind").notNull(),
    title: text("title").notNull(),
    body: text("body"),
    actionUrl: text("action_url"),
    readAt: tsOpt("read_at"),
    createdAt: ts("created_at"),
  },
  (t) => ({ userIdx: index("notif_user_idx").on(t.userId, t.readAt) }),
);

// ---------- feedback ----------
export const feedback = pgTable("feedback", {
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

// ---------- play events ----------
export const playEvents = pgTable(
  "play_events",
  {
    id: text("id").primaryKey(),
    trackId: text("track_id")
      .notNull()
      .references(() => tracks.id),
    userId: text("user_id").references(() => users.id),
    sessionId: text("session_id"),
    listenedMs: integer("listened_ms").notNull(),
    completed: boolean("completed").notNull().default(false),
    country: text("country"),
    createdAt: ts("created_at"),
  },
  (t) => ({ trackDayIdx: index("play_track_day_idx").on(t.trackId, t.createdAt) }),
);

// ---------- audit log ----------
export const auditLog = pgTable("audit_log", {
  id: text("id").primaryKey(),
  actorId: text("actor_id")
    .notNull()
    .references(() => users.id),
  action: text("action").notNull(),
  targetType: text("target_type").notNull(),
  targetId: text("target_id").notNull(),
  meta: jsonb("meta").$type<Record<string, unknown>>(),
  createdAt: ts("created_at"),
});

// Infer types
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Track = typeof tracks.$inferSelect;
export type Album = typeof albums.$inferSelect;
export type Artist = typeof artists.$inferSelect;
export type Module = typeof modules.$inferSelect;
export type Order = typeof orders.$inferSelect;
export type License = typeof licenses.$inferSelect;
export type Notification = typeof notifications.$inferSelect;
