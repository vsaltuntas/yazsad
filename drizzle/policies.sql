-- yazsad RLS policies + Türkçe tsvector tetikleyicileri.
-- Idempotent: tüm DROP IF EXISTS ... + CREATE ... / CREATE OR REPLACE ... kullanır.
-- `pnpm db:migrate` ikinci kez çalıştırılsa bile hata vermemeli.
--
-- Kimlik modeli: Clerk JWT'si `set_config('request.jwt.claims', ...)` ile
-- connection GUC'a yazılır. Policy'ler `current_setting('request.jwt.claims', true)::jsonb`
-- üzerinden `sub` (clerkId) ve `role` (yazılmışsa `service_role`) okur.

-- ============================================================================
-- Helper fonksiyonlar
-- ============================================================================

CREATE OR REPLACE FUNCTION public.jwt_claims() RETURNS jsonb
LANGUAGE sql STABLE AS $$
  SELECT coalesce(
    nullif(current_setting('request.jwt.claims', true), '')::jsonb,
    '{}'::jsonb
  );
$$;

CREATE OR REPLACE FUNCTION public.auth_clerk_id() RETURNS text
LANGUAGE sql STABLE AS $$
  SELECT public.jwt_claims() ->> 'sub';
$$;

CREATE OR REPLACE FUNCTION public.auth_user_id() RETURNS text
LANGUAGE sql STABLE AS $$
  SELECT u.id FROM public.users u WHERE u.clerk_id = public.auth_clerk_id() LIMIT 1;
$$;

CREATE OR REPLACE FUNCTION public.auth_is_admin() RETURNS boolean
LANGUAGE sql STABLE AS $$
  SELECT
    (public.jwt_claims() ->> 'role') = 'service_role'
    OR EXISTS (
      SELECT 1 FROM public.users u
      WHERE u.clerk_id = public.auth_clerk_id() AND u.role = 'admin'
    );
$$;

CREATE OR REPLACE FUNCTION public.auth_artist_id() RETURNS text
LANGUAGE sql STABLE AS $$
  SELECT a.id FROM public.artists a
  JOIN public.users u ON u.id = a.user_id
  WHERE u.clerk_id = public.auth_clerk_id()
  LIMIT 1;
$$;

-- ============================================================================
-- RLS aktivasyonu
-- ============================================================================

ALTER TABLE public.users              ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.memberships        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artists            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.albums             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tracks             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.licenses           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.playlists          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.playlist_tracks    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.likes              ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.follows            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_categories   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_topics       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_posts        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contests           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contest_entries    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contest_votes      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_articles      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prompts            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.modules            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.play_events        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_log          ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- users
--   - SELECT: herkes (public profil) — ama deletedAt NULL
--   - INSERT/UPDATE: kendi + admin
-- ============================================================================

DROP POLICY IF EXISTS users_select_public ON public.users;
CREATE POLICY users_select_public ON public.users
  FOR SELECT USING (deleted_at IS NULL OR auth_is_admin());

DROP POLICY IF EXISTS users_update_self ON public.users;
CREATE POLICY users_update_self ON public.users
  FOR UPDATE USING (clerk_id = auth_clerk_id() OR auth_is_admin())
  WITH CHECK (clerk_id = auth_clerk_id() OR auth_is_admin());

DROP POLICY IF EXISTS users_insert_admin ON public.users;
CREATE POLICY users_insert_admin ON public.users
  FOR INSERT WITH CHECK (auth_is_admin());

DROP POLICY IF EXISTS users_delete_admin ON public.users;
CREATE POLICY users_delete_admin ON public.users
  FOR DELETE USING (auth_is_admin());

-- ============================================================================
-- memberships — sahip + admin
-- ============================================================================

DROP POLICY IF EXISTS memberships_select_own ON public.memberships;
CREATE POLICY memberships_select_own ON public.memberships
  FOR SELECT USING (user_id = auth_user_id() OR auth_is_admin());

DROP POLICY IF EXISTS memberships_insert_own ON public.memberships;
CREATE POLICY memberships_insert_own ON public.memberships
  FOR INSERT WITH CHECK (user_id = auth_user_id());

DROP POLICY IF EXISTS memberships_update_admin ON public.memberships;
CREATE POLICY memberships_update_admin ON public.memberships
  FOR UPDATE USING (auth_is_admin())
  WITH CHECK (auth_is_admin());

-- ============================================================================
-- artists — profile SELECT herkese, UPDATE sahibi/admin
-- ============================================================================

DROP POLICY IF EXISTS artists_select_public ON public.artists;
CREATE POLICY artists_select_public ON public.artists
  FOR SELECT USING (true);

DROP POLICY IF EXISTS artists_insert_admin ON public.artists;
CREATE POLICY artists_insert_admin ON public.artists
  FOR INSERT WITH CHECK (auth_is_admin());

DROP POLICY IF EXISTS artists_update_own ON public.artists;
CREATE POLICY artists_update_own ON public.artists
  FOR UPDATE USING (user_id = auth_user_id() OR auth_is_admin())
  WITH CHECK (user_id = auth_user_id() OR auth_is_admin());

-- ============================================================================
-- albums — SELECT approved OR owner OR admin
-- ============================================================================

DROP POLICY IF EXISTS albums_select ON public.albums;
CREATE POLICY albums_select ON public.albums
  FOR SELECT USING (
    status = 'approved'
    OR artist_id = auth_artist_id()
    OR auth_is_admin()
  );

DROP POLICY IF EXISTS albums_insert_own ON public.albums;
CREATE POLICY albums_insert_own ON public.albums
  FOR INSERT WITH CHECK (artist_id = auth_artist_id() OR auth_is_admin());

DROP POLICY IF EXISTS albums_update_own ON public.albums;
CREATE POLICY albums_update_own ON public.albums
  FOR UPDATE USING (artist_id = auth_artist_id() OR auth_is_admin())
  WITH CHECK (artist_id = auth_artist_id() OR auth_is_admin());

DROP POLICY IF EXISTS albums_delete_own ON public.albums;
CREATE POLICY albums_delete_own ON public.albums
  FOR DELETE USING (artist_id = auth_artist_id() OR auth_is_admin());

-- ============================================================================
-- tracks — SELECT approved OR owner OR admin (kritik)
-- ============================================================================

DROP POLICY IF EXISTS tracks_select ON public.tracks;
CREATE POLICY tracks_select ON public.tracks
  FOR SELECT USING (
    status = 'approved'
    OR artist_id = auth_artist_id()
    OR auth_is_admin()
  );

DROP POLICY IF EXISTS tracks_insert_own ON public.tracks;
CREATE POLICY tracks_insert_own ON public.tracks
  FOR INSERT WITH CHECK (artist_id = auth_artist_id() OR auth_is_admin());

DROP POLICY IF EXISTS tracks_update_own ON public.tracks;
CREATE POLICY tracks_update_own ON public.tracks
  FOR UPDATE USING (artist_id = auth_artist_id() OR auth_is_admin())
  WITH CHECK (artist_id = auth_artist_id() OR auth_is_admin());

DROP POLICY IF EXISTS tracks_delete_own ON public.tracks;
CREATE POLICY tracks_delete_own ON public.tracks
  FOR DELETE USING (artist_id = auth_artist_id() OR auth_is_admin());

-- ============================================================================
-- orders & order_items & licenses — sadece alıcı + admin
-- ============================================================================

DROP POLICY IF EXISTS orders_select_own ON public.orders;
CREATE POLICY orders_select_own ON public.orders
  FOR SELECT USING (user_id = auth_user_id() OR auth_is_admin());

DROP POLICY IF EXISTS orders_insert_own ON public.orders;
CREATE POLICY orders_insert_own ON public.orders
  FOR INSERT WITH CHECK (user_id = auth_user_id());

DROP POLICY IF EXISTS orders_update_admin ON public.orders;
CREATE POLICY orders_update_admin ON public.orders
  FOR UPDATE USING (auth_is_admin())
  WITH CHECK (auth_is_admin());

DROP POLICY IF EXISTS order_items_select_own ON public.order_items;
CREATE POLICY order_items_select_own ON public.order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.orders o
      WHERE o.id = order_items.order_id
        AND (o.user_id = auth_user_id() OR auth_is_admin())
    )
  );

DROP POLICY IF EXISTS order_items_insert_own ON public.order_items;
CREATE POLICY order_items_insert_own ON public.order_items
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.orders o
      WHERE o.id = order_items.order_id
        AND (o.user_id = auth_user_id() OR auth_is_admin())
    )
  );

DROP POLICY IF EXISTS licenses_select_own ON public.licenses;
CREATE POLICY licenses_select_own ON public.licenses
  FOR SELECT USING (buyer_id = auth_user_id() OR auth_is_admin());

DROP POLICY IF EXISTS licenses_insert_admin ON public.licenses;
CREATE POLICY licenses_insert_admin ON public.licenses
  FOR INSERT WITH CHECK (auth_is_admin());

-- ============================================================================
-- cart_items — sahip only
-- ============================================================================

DROP POLICY IF EXISTS cart_select_own ON public.cart_items;
CREATE POLICY cart_select_own ON public.cart_items
  FOR SELECT USING (user_id = auth_user_id());

DROP POLICY IF EXISTS cart_insert_own ON public.cart_items;
CREATE POLICY cart_insert_own ON public.cart_items
  FOR INSERT WITH CHECK (user_id = auth_user_id());

DROP POLICY IF EXISTS cart_update_own ON public.cart_items;
CREATE POLICY cart_update_own ON public.cart_items
  FOR UPDATE USING (user_id = auth_user_id())
  WITH CHECK (user_id = auth_user_id());

DROP POLICY IF EXISTS cart_delete_own ON public.cart_items;
CREATE POLICY cart_delete_own ON public.cart_items
  FOR DELETE USING (user_id = auth_user_id());

-- ============================================================================
-- playlists — SELECT public ise herkes, değilse sahibi; mutasyon sahip
-- ============================================================================

DROP POLICY IF EXISTS playlists_select ON public.playlists;
CREATE POLICY playlists_select ON public.playlists
  FOR SELECT USING (is_public OR user_id = auth_user_id() OR auth_is_admin());

DROP POLICY IF EXISTS playlists_mutate_own ON public.playlists;
CREATE POLICY playlists_mutate_own ON public.playlists
  FOR ALL USING (user_id = auth_user_id() OR auth_is_admin())
  WITH CHECK (user_id = auth_user_id() OR auth_is_admin());

DROP POLICY IF EXISTS playlist_tracks_select ON public.playlist_tracks;
CREATE POLICY playlist_tracks_select ON public.playlist_tracks
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.playlists p
      WHERE p.id = playlist_tracks.playlist_id
        AND (p.is_public OR p.user_id = auth_user_id() OR auth_is_admin())
    )
  );

DROP POLICY IF EXISTS playlist_tracks_mutate_own ON public.playlist_tracks;
CREATE POLICY playlist_tracks_mutate_own ON public.playlist_tracks
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.playlists p
      WHERE p.id = playlist_tracks.playlist_id
        AND (p.user_id = auth_user_id() OR auth_is_admin())
    )
  );

-- ============================================================================
-- likes / follows — sahibi
-- ============================================================================

DROP POLICY IF EXISTS likes_select ON public.likes;
CREATE POLICY likes_select ON public.likes FOR SELECT USING (true);

DROP POLICY IF EXISTS likes_mutate_own ON public.likes;
CREATE POLICY likes_mutate_own ON public.likes
  FOR ALL USING (user_id = auth_user_id()) WITH CHECK (user_id = auth_user_id());

DROP POLICY IF EXISTS follows_select ON public.follows;
CREATE POLICY follows_select ON public.follows FOR SELECT USING (true);

DROP POLICY IF EXISTS follows_mutate_own ON public.follows;
CREATE POLICY follows_mutate_own ON public.follows
  FOR ALL USING (follower_id = auth_user_id())
  WITH CHECK (follower_id = auth_user_id());

-- ============================================================================
-- comments — SELECT public (silinmemiş), INSERT kendi, UPDATE/DELETE kendi+admin
-- ============================================================================

DROP POLICY IF EXISTS comments_select ON public.comments;
CREATE POLICY comments_select ON public.comments
  FOR SELECT USING (deleted_at IS NULL OR auth_is_admin());

DROP POLICY IF EXISTS comments_insert_own ON public.comments;
CREATE POLICY comments_insert_own ON public.comments
  FOR INSERT WITH CHECK (user_id = auth_user_id());

DROP POLICY IF EXISTS comments_update_own ON public.comments;
CREATE POLICY comments_update_own ON public.comments
  FOR UPDATE USING (user_id = auth_user_id() OR auth_is_admin())
  WITH CHECK (user_id = auth_user_id() OR auth_is_admin());

DROP POLICY IF EXISTS comments_delete_own ON public.comments;
CREATE POLICY comments_delete_own ON public.comments
  FOR DELETE USING (user_id = auth_user_id() OR auth_is_admin());

-- ============================================================================
-- forum — kategoriler public SELECT, topic/post CRUD Clerk kullanıcısı
-- ============================================================================

DROP POLICY IF EXISTS forum_cats_select ON public.forum_categories;
CREATE POLICY forum_cats_select ON public.forum_categories FOR SELECT USING (true);

DROP POLICY IF EXISTS forum_cats_admin ON public.forum_categories;
CREATE POLICY forum_cats_admin ON public.forum_categories
  FOR ALL USING (auth_is_admin()) WITH CHECK (auth_is_admin());

DROP POLICY IF EXISTS forum_topics_select ON public.forum_topics;
CREATE POLICY forum_topics_select ON public.forum_topics FOR SELECT USING (true);

DROP POLICY IF EXISTS forum_topics_insert_own ON public.forum_topics;
CREATE POLICY forum_topics_insert_own ON public.forum_topics
  FOR INSERT WITH CHECK (user_id = auth_user_id());

DROP POLICY IF EXISTS forum_topics_update_own ON public.forum_topics;
CREATE POLICY forum_topics_update_own ON public.forum_topics
  FOR UPDATE USING (user_id = auth_user_id() OR auth_is_admin())
  WITH CHECK (user_id = auth_user_id() OR auth_is_admin());

DROP POLICY IF EXISTS forum_posts_select ON public.forum_posts;
CREATE POLICY forum_posts_select ON public.forum_posts
  FOR SELECT USING (deleted_at IS NULL OR auth_is_admin());

DROP POLICY IF EXISTS forum_posts_insert_own ON public.forum_posts;
CREATE POLICY forum_posts_insert_own ON public.forum_posts
  FOR INSERT WITH CHECK (user_id = auth_user_id());

DROP POLICY IF EXISTS forum_posts_update_own ON public.forum_posts;
CREATE POLICY forum_posts_update_own ON public.forum_posts
  FOR UPDATE USING (user_id = auth_user_id() OR auth_is_admin())
  WITH CHECK (user_id = auth_user_id() OR auth_is_admin());

-- ============================================================================
-- contests — SELECT public, CRUD admin; entries sahibi
-- ============================================================================

DROP POLICY IF EXISTS contests_select ON public.contests;
CREATE POLICY contests_select ON public.contests FOR SELECT USING (true);

DROP POLICY IF EXISTS contests_admin ON public.contests;
CREATE POLICY contests_admin ON public.contests
  FOR ALL USING (auth_is_admin()) WITH CHECK (auth_is_admin());

DROP POLICY IF EXISTS contest_entries_select ON public.contest_entries;
CREATE POLICY contest_entries_select ON public.contest_entries FOR SELECT USING (true);

DROP POLICY IF EXISTS contest_entries_insert_own ON public.contest_entries;
CREATE POLICY contest_entries_insert_own ON public.contest_entries
  FOR INSERT WITH CHECK (user_id = auth_user_id());

DROP POLICY IF EXISTS contest_entries_update_admin ON public.contest_entries;
CREATE POLICY contest_entries_update_admin ON public.contest_entries
  FOR UPDATE USING (auth_is_admin()) WITH CHECK (auth_is_admin());

DROP POLICY IF EXISTS contest_votes_select ON public.contest_votes;
CREATE POLICY contest_votes_select ON public.contest_votes FOR SELECT USING (true);

DROP POLICY IF EXISTS contest_votes_own ON public.contest_votes;
CREATE POLICY contest_votes_own ON public.contest_votes
  FOR ALL USING (user_id = auth_user_id()) WITH CHECK (user_id = auth_user_id());

-- ============================================================================
-- news — SELECT yayınlanmış, CRUD admin
-- ============================================================================

DROP POLICY IF EXISTS news_select ON public.news_articles;
CREATE POLICY news_select ON public.news_articles
  FOR SELECT USING (published_at IS NOT NULL OR auth_is_admin());

DROP POLICY IF EXISTS news_admin ON public.news_articles;
CREATE POLICY news_admin ON public.news_articles
  FOR ALL USING (auth_is_admin()) WITH CHECK (auth_is_admin());

-- ============================================================================
-- prompts — SELECT public, INSERT/UPDATE sahibi
-- ============================================================================

DROP POLICY IF EXISTS prompts_select ON public.prompts;
CREATE POLICY prompts_select ON public.prompts FOR SELECT USING (true);

DROP POLICY IF EXISTS prompts_mutate_own ON public.prompts;
CREATE POLICY prompts_mutate_own ON public.prompts
  FOR ALL USING (user_id = auth_user_id() OR auth_is_admin())
  WITH CHECK (user_id = auth_user_id() OR auth_is_admin());

-- ============================================================================
-- modules — SELECT public, UPDATE admin
-- ============================================================================

DROP POLICY IF EXISTS modules_select ON public.modules;
CREATE POLICY modules_select ON public.modules FOR SELECT USING (true);

DROP POLICY IF EXISTS modules_admin ON public.modules;
CREATE POLICY modules_admin ON public.modules
  FOR ALL USING (auth_is_admin()) WITH CHECK (auth_is_admin());

-- ============================================================================
-- notifications — sahibi
-- ============================================================================

DROP POLICY IF EXISTS notif_select_own ON public.notifications;
CREATE POLICY notif_select_own ON public.notifications
  FOR SELECT USING (user_id = auth_user_id() OR auth_is_admin());

DROP POLICY IF EXISTS notif_update_own ON public.notifications;
CREATE POLICY notif_update_own ON public.notifications
  FOR UPDATE USING (user_id = auth_user_id())
  WITH CHECK (user_id = auth_user_id());

DROP POLICY IF EXISTS notif_insert_admin ON public.notifications;
CREATE POLICY notif_insert_admin ON public.notifications
  FOR INSERT WITH CHECK (auth_is_admin());

-- ============================================================================
-- feedback — INSERT herkes (misafir de), SELECT admin
-- ============================================================================

DROP POLICY IF EXISTS feedback_insert_any ON public.feedback;
CREATE POLICY feedback_insert_any ON public.feedback
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS feedback_select_admin ON public.feedback;
CREATE POLICY feedback_select_admin ON public.feedback
  FOR SELECT USING (auth_is_admin() OR user_id = auth_user_id());

DROP POLICY IF EXISTS feedback_update_admin ON public.feedback;
CREATE POLICY feedback_update_admin ON public.feedback
  FOR UPDATE USING (auth_is_admin()) WITH CHECK (auth_is_admin());

-- ============================================================================
-- play_events — INSERT herkes (anonim de olabilir), SELECT admin + sahibi
-- ============================================================================

DROP POLICY IF EXISTS play_events_insert_any ON public.play_events;
CREATE POLICY play_events_insert_any ON public.play_events
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS play_events_select ON public.play_events;
CREATE POLICY play_events_select ON public.play_events
  FOR SELECT USING (auth_is_admin() OR user_id = auth_user_id());

-- ============================================================================
-- audit_log — sadece admin SELECT, INSERT admin/servis
-- ============================================================================

DROP POLICY IF EXISTS audit_select_admin ON public.audit_log;
CREATE POLICY audit_select_admin ON public.audit_log
  FOR SELECT USING (auth_is_admin());

DROP POLICY IF EXISTS audit_insert_admin ON public.audit_log;
CREATE POLICY audit_insert_admin ON public.audit_log
  FOR INSERT WITH CHECK (auth_is_admin() OR actor_id = auth_user_id());

-- ============================================================================
-- Türkçe tsvector tetikleyicileri — tracks.search_tsv
-- ============================================================================
-- Not: Şemanın index'i `to_tsvector('turkish', title || ' ' || ai_prompt)` expression'ı
-- üzerinde GIN. Generated column yerine expression index kullanıyoruz, bu yüzden
-- tetikleyici zorunlu değil — ama play_count/like_count denormalizasyonları için
-- trigger örnek olarak burada. Faz 2'de genişletilebilir.

CREATE OR REPLACE FUNCTION public.touch_updated_at() RETURNS trigger
LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS users_touch_updated_at ON public.users;
CREATE TRIGGER users_touch_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

DROP TRIGGER IF EXISTS tracks_touch_updated_at ON public.tracks;
CREATE TRIGGER tracks_touch_updated_at
  BEFORE UPDATE ON public.tracks
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
