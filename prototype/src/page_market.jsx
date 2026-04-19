// Marketplace (Bandcamp DNA) + cart/checkout + Library

const MARKET_TRACKS = TRACKS.map((t, i) => ({
  ...t,
  price: [49, 79, 29, 99, 59, 129, 39, 69, 49, 89, 119, 59][i],
  license: i % 3 === 0 ? 'Kişisel + Ticari' : i % 3 === 1 ? 'Kişisel' : 'Tam Hak',
  bpm: 60 + (i * 11) % 90,
  key: ['A min', 'C maj', 'D min', 'F# min', 'E maj', 'B min', 'G min', 'D maj', 'A maj', 'C# min', 'F maj', 'E min'][i],
  stems: 4 + (i % 4),
}));

// ============================================================================
// MARKETPLACE — Bandcamp DNA: editorial, artist-centric, album-first, support-driven
// ============================================================================
const MarketplacePage = ({ onPlay, setRoute, cart, setCart }) => {
  const [filter, setFilter] = React.useState('featured');

  // "Now on YAZSAD" — editorial picks
  const editorial = ALBUMS[0]; // big feature
  const editorialArtist = Object.values(ARTISTS).find(a => a.name === editorial.artist);

  // Weekly supported
  const weeklyBest = [...ALBUMS].sort((a, b) => b.supporters - a.supporters).slice(0, 4);

  // New & Notable — recently released
  const newNotable = [...ALBUMS].sort((a, b) => b.year - a.year).slice(0, 6);

  // All artists
  const allArtists = Object.values(ARTISTS);

  // Filter logic for bottom browse
  const filtered = (() => {
    if (filter === 'albums') return ALBUMS;
    if (filter === 'singles') return ALBUMS.filter(a => a.kind === 'Single');
    if (filter === 'eps') return ALBUMS.filter(a => a.kind === 'EP');
    if (filter === 'full') return ALBUMS.filter(a => a.kind === 'Album');
    return ALBUMS;
  })();

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 4px' }}>
      {/* Editorial header */}
      <div style={{ borderBottom: '2px solid var(--fg)', paddingBottom: 14, marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div>
          <h1 className="display" style={{ fontSize: 36, fontWeight: 600, letterSpacing: '-0.02em', margin: '0 0 4px' }}>
            YAZSAD Marketplace
          </h1>
          <div className="mono" style={{ fontSize: 11, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Sanatçılar yayınlar · dinleyiciler destekler · %85 doğrudan sanatçıya
          </div>
        </div>
        <button className="btn btn-ghost" onClick={() => setRoute('cart')}>
          <ICart size={14} />Sepet ({cart.length})
        </button>
      </div>

      {/* EDITORIAL FEATURE — big hero */}
      <div style={{ marginBottom: 56 }}>
        <div className="mono" style={{ fontSize: 10, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.16em', marginBottom: 12 }}>
          ⭐ Bu Haftanın Öne Çıkanı · Editoryal Seçki
        </div>
        <div
          onClick={() => setRoute(`album:${editorial.id}`)}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 40, cursor: 'pointer', alignItems: 'center' }}
        >
          <div style={{ aspectRatio: '1', borderRadius: 2, overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
            <GenArt {...editorial} seed={parseInt(editorial.id.replace('a',''))*7} />
          </div>
          <div>
            <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 10 }}>
              {editorial.kind} · {editorial.released}
            </div>
            <h2 className="display" style={{ fontSize: 64, fontWeight: 500, lineHeight: 1, letterSpacing: '-0.03em', margin: '0 0 14px', textWrap: 'balance' }}>
              {editorial.title}
            </h2>
            <div style={{ fontSize: 20, color: 'var(--fg-muted)', marginBottom: 20 }}>
              <span style={{ color: 'var(--fg-muted)' }}>by</span>{' '}
              <span style={{ color: 'var(--accent)', fontWeight: 500 }}>{editorial.artist}</span>
            </div>
            <p style={{ fontSize: 15, color: 'var(--fg)', lineHeight: 1.65, margin: '0 0 22px', textWrap: 'pretty', maxWidth: 520 }}>
              {editorial.blurb}
            </p>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <button className="btn btn-primary" style={{ padding: '12px 22px' }}>
                Destekle · ₺{editorial.price}+
              </button>
              <span className="mono" style={{ fontSize: 11, color: 'var(--fg-muted)' }}>
                {editorial.tracks.length} parça · {editorial.supporters} destekçi · {editorial.plays} dinlenme
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* WEEKLY BEST — "Haftanın en çok desteklenenleri" */}
      <section style={{ marginBottom: 56 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 20 }}>
          <h2 className="display" style={{ fontSize: 28, fontWeight: 500, letterSpacing: '-0.015em', margin: 0 }}>
            Haftanın en çok desteklenenleri
          </h2>
          <span className="mono" style={{ fontSize: 11, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Her Pazartesi yenilenir
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
          {weeklyBest.map((a, i) => (
            <EditorialAlbumCard key={a.id} album={a} rank={i + 1} setRoute={setRoute} />
          ))}
        </div>
      </section>

      {/* BY ARTIST — meet the artists, with their albums listed */}
      <section style={{ marginBottom: 56, paddingTop: 40, borderTop: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 20 }}>
          <div>
            <h2 className="display" style={{ fontSize: 28, fontWeight: 500, letterSpacing: '-0.015em', margin: '0 0 4px' }}>
              Sanatçıyla tanış
            </h2>
            <div className="mono" style={{ fontSize: 11, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {allArtists.length} sanatçı · Türkiye genelinden
            </div>
          </div>
        </div>
        <div style={{ display: 'grid', gap: 20 }}>
          {allArtists.map(artist => {
            const artistAlbums = ALBUMS.filter(al => al.artistId === artist.id);
            return <ArtistBlockCard key={artist.id} artist={artist} albums={artistAlbums} setRoute={setRoute} onPlay={onPlay} />;
          })}
        </div>
      </section>

      {/* BROWSE ALL — filterable */}
      <section style={{ paddingTop: 40, borderTop: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 20 }}>
          <h2 className="display" style={{ fontSize: 28, fontWeight: 500, letterSpacing: '-0.015em', margin: 0 }}>
            Tüm yayınlar
          </h2>
          <div className="chip-row" style={{ margin: 0 }}>
            {[
              ['featured', 'Öne Çıkan'],
              ['albums', 'Hepsi'],
              ['singles', 'Single'],
              ['eps', 'EP'],
              ['full', 'LP'],
            ].map(([k, l]) => (
              <button key={k} className={`chip ${filter === k ? 'active' : ''}`} onClick={() => setFilter(k)}>{l}</button>
            ))}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 20 }}>
          {filtered.map(a => <EditorialAlbumCard key={a.id} album={a} setRoute={setRoute} />)}
        </div>
      </section>

      {/* Footer — mission */}
      <div style={{ marginTop: 64, padding: '40px 0', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
        <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 10 }}>
          💚 Dayanışma ekonomisi
        </div>
        <p style={{ fontSize: 13, color: 'var(--fg-muted)', maxWidth: 560, margin: '0 auto', lineHeight: 1.7 }}>
          Bandcamp modelini Türkiye'nin AI müzik ekosistemine uyarlıyoruz. Her satın alma, YAZSAD'a kayıtlı sanatçıya doğrudan <strong style={{ color: 'var(--fg)' }}>%85 gelir</strong> olarak dönüyor. Dernek, kalan %15'i altyapı, hukuki destek ve etik denetim için kullanıyor.
        </p>
      </div>
    </div>
  );
};

// Album card — Bandcamp style (cover + title + artist + price "from")
const EditorialAlbumCard = ({ album, rank, setRoute }) => {
  const [hover, setHover] = React.useState(false);
  const seed = parseInt(album.id.replace('a','')) * 7;
  return (
    <div
      onClick={() => setRoute(`album:${album.id}`)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ cursor: 'pointer' }}
    >
      <div style={{ position: 'relative', aspectRatio: '1', borderRadius: 2, overflow: 'hidden', marginBottom: 10, transition: 'transform 0.2s', transform: hover ? 'translateY(-2px)' : 'none', boxShadow: hover ? '0 12px 28px rgba(0,0,0,0.3)' : '0 4px 12px rgba(0,0,0,0.1)' }}>
        <GenArt {...album} seed={seed} />
        {rank && (
          <div style={{
            position: 'absolute', top: 8, left: 8,
            background: 'var(--bg)', color: 'var(--fg)',
            padding: '4px 8px', borderRadius: 2,
            fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700,
          }}>
            #{rank}
          </div>
        )}
      </div>
      <div className="mono" style={{ fontSize: 9, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 3 }}>
        {album.kind} · {album.year}
      </div>
      <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 2, lineHeight: 1.25 }}>{album.title}</div>
      <div className="mono" style={{ fontSize: 11, color: 'var(--fg-muted)', marginBottom: 6 }}>{album.artist}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
        <span className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)' }}>from</span>
        <span className="mono" style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent)' }}>₺{album.price}</span>
        <span className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', marginLeft: 'auto' }}>{album.supporters} destekçi</span>
      </div>
    </div>
  );
};

// Artist block — big row with artist info + their albums inline
const ArtistBlockCard = ({ artist, albums, setRoute, onPlay }) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 24, padding: 20, background: 'var(--bg-elev)', border: '1px solid var(--border)', borderRadius: 4 }}>
      {/* Artist side */}
      <div
        onClick={() => setRoute(`artist:${artist.id}`)}
        style={{ cursor: 'pointer' }}
      >
        <div style={{
          width: '100%', aspectRatio: '1', borderRadius: 2, overflow: 'hidden', marginBottom: 14,
          background: `linear-gradient(135deg, ${artist.g1}, ${artist.g2})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 64, fontWeight: 700, color: 'white', letterSpacing: '-0.03em',
        }}>
          {artist.name.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase()}
        </div>
        <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>{artist.name}</div>
        <div className="mono" style={{ fontSize: 11, color: 'var(--fg-muted)', marginBottom: 10 }}>
          {artist.city} · {artist.stats.monthlyListeners} aylık dinleyici
        </div>
        <p style={{ fontSize: 12, color: 'var(--fg-muted)', lineHeight: 1.5, margin: '0 0 12px', textWrap: 'pretty' }}>
          {artist.bio.split('.').slice(0, 2).join('.')}.
        </p>
        <button className="btn btn-ghost" style={{ fontSize: 11, width: '100%' }}>
          Profile Git →
        </button>
      </div>

      {/* Albums side */}
      <div>
        <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>
          Yayınlar · {albums.length}
        </div>
        {albums.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 14 }}>
            {albums.map(a => {
              const seed = parseInt(a.id.replace('a','')) * 7;
              return (
                <div key={a.id} onClick={() => setRoute(`album:${a.id}`)} style={{ cursor: 'pointer' }}>
                  <div style={{ aspectRatio: '1', borderRadius: 2, overflow: 'hidden', marginBottom: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
                    <GenArt {...a} seed={seed} />
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 2, lineHeight: 1.3 }}>{a.title}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <div className="mono" style={{ fontSize: 9, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{a.kind}</div>
                    <div className="mono" style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)' }}>₺{a.price}+</div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ padding: 20, border: '1px dashed var(--border)', borderRadius: 4, fontSize: 12, color: 'var(--fg-muted)', textAlign: 'center' }}>
            Bu sanatçının henüz yayını yok.
          </div>
        )}

        {/* Top tracks mini-list */}
        <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid var(--border)' }}>
          <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>
            Popüler parçalar
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {artist.topTrackIds.slice(0, 3).map(tid => {
              const t = TRACKS.find(x => x.id === tid);
              if (!t) return null;
              return (
                <div
                  key={tid}
                  onClick={(e) => { e.stopPropagation(); onPlay && onPlay(t); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '6px 8px', borderRadius: 3, cursor: 'pointer',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <span className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', minWidth: 14 }}>▸</span>
                  <span style={{ fontSize: 12, flex: 1 }}>{t.title}</span>
                  <span className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)' }}>{t.duration}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// CART — unchanged logic, supports album line items too
// ============================================================================
const CartPage = ({ cart, setCart, setRoute }) => {
  const [step, setStep] = React.useState('cart');

  const subtotal = cart.reduce((s, c) => s + c.price, 0);
  const kdv = Math.round(subtotal * 0.20);
  const total = subtotal + kdv;

  if (step === 'done') {
    return (
      <div className="page" style={{ maxWidth: 600, textAlign: 'center', paddingTop: 80 }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--accent)', color: 'var(--accent-fg)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <ICheck size={32} />
        </div>
        <div className="page-eyebrow">Ödeme tamamlandı · #YZD-2026-04847</div>
        <h1 className="page-title" style={{ marginBottom: 16 }}>Teşekkürler!</h1>
        <p className="page-subtitle" style={{ margin: '0 auto 32px' }}>
          {cart.length} yayın kütüphanene eklendi. İndirme linkleri e-postana gönderildi.
        </p>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
          <button className="btn btn-primary" onClick={() => { setCart([]); setRoute('library'); setStep('cart'); }}>Kütüphaneye Git</button>
          <button className="btn btn-ghost" onClick={() => { setCart([]); setRoute('marketplace'); setStep('cart'); }}>Alışverişe Devam</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page" style={{ maxWidth: 1100 }}>
      <div className="page-header">
        <div>
          <div className="page-eyebrow">{step === 'cart' ? `${cart.length} yayın` : 'Adım 2/2'}</div>
          <h1 className="page-title">{step === 'cart' ? 'Sepetim' : 'Ödeme'}</h1>
        </div>
      </div>

      {step === 'cart' && cart.length === 0 && (
        <div style={{ paddingTop: 20 }}>
          <EmptyState
            art={<EmptyCartArt />}
            title="Sepetin şimdilik boş"
            desc="Marketplace'ten beğendiğin albümleri ve parçaları ekle, tek seferde destekle."
            action="Marketplace'e Git"
            onAction={() => setRoute('marketplace')}
            secondary="Keşfet'e Git"
            onSecondary={() => setRoute('discover')}
          />
        </div>
      )}

      {cart.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 'var(--dens-6)' }}>
          <div>
            {step === 'cart' && (
              <div className="panel">
                {cart.map(t => {
                  const isAlbum = t.isAlbum;
                  const seed = isAlbum
                    ? parseInt(t.id.replace('album-a','')) * 7
                    : parseInt(String(t.id).replace('t',''));
                  return (
                    <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 16, borderBottom: '1px solid var(--border)' }}>
                      <div style={{ width: 56, height: 56, borderRadius: 'var(--radius-sm)', overflow: 'hidden', flexShrink: 0 }}>
                        <GenArt {...t} seed={seed} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 600 }}>
                          {t.title}
                          {isAlbum && <span className="mono" style={{ fontSize: 9, marginLeft: 8, padding: '2px 6px', background: 'var(--accent-soft)', color: 'var(--accent)', borderRadius: 3, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Albüm · {t.tracks} parça</span>}
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--fg-muted)' }}>{t.artist} · {t.license}</div>
                      </div>
                      <div className="mono" style={{ fontSize: 14, fontWeight: 600 }}>₺{t.price}</div>
                      <button className="btn-icon" onClick={() => setCart(cart.filter(c => c.id !== t.id))}><IX size={14} /></button>
                    </div>
                  );
                })}
              </div>
            )}

            {step === 'checkout' && (
              <div className="panel">
                <div className="panel-head"><div className="panel-title">Ödeme Yöntemi</div></div>
                <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ padding: 14, border: '2px solid var(--accent)', borderRadius: 'var(--radius-md)', background: 'var(--accent-soft)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: 600, marginBottom: 4 }}>Kayıtlı Kart</div>
                        <div className="mono" style={{ fontSize: 12, color: 'var(--fg-muted)' }}>•••• 4782 · 11/28 · Mastercard</div>
                      </div>
                      <ICheck size={18} />
                    </div>
                  </div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 14, border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}>
                    <input type="radio" name="pay" /> Yeni kart ekle
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 14, border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}>
                    <input type="radio" name="pay" /> Banka havalesi / EFT
                  </label>
                </div>
              </div>
            )}
          </div>

          <div>
            <div className="panel" style={{ position: 'sticky', top: 20 }}>
              <div className="panel-head"><div className="panel-title">Özet</div></div>
              <div style={{ padding: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 10 }}>
                  <span style={{ color: 'var(--fg-muted)' }}>Ara toplam</span>
                  <span className="mono">₺{subtotal}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 10 }}>
                  <span style={{ color: 'var(--fg-muted)' }}>KDV (%20)</span>
                  <span className="mono">₺{kdv}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 16 }}>
                  <span style={{ color: 'var(--fg-muted)' }}>Sanatçı payı (%85)</span>
                  <span className="mono" style={{ color: 'var(--success)' }}>₺{Math.round(subtotal * 0.85)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 16, borderTop: '1px solid var(--border)', marginBottom: 20 }}>
                  <span style={{ fontWeight: 700 }}>Toplam</span>
                  <span className="display" style={{ fontSize: 24, fontWeight: 600 }}>₺{total}</span>
                </div>
                {step === 'cart' ? (
                  <button className="btn btn-primary" style={{ width: '100%', padding: 14 }} onClick={() => setStep('checkout')}>Ödemeye Geç →</button>
                ) : (
                  <>
                    <button className="btn btn-primary" style={{ width: '100%', padding: 14 }} onClick={() => setStep('done')}>₺{total} Öde</button>
                    <button className="btn btn-ghost" style={{ width: '100%', marginTop: 8 }} onClick={() => setStep('cart')}>← Sepete Dön</button>
                  </>
                )}
                <div className="mono" style={{ fontSize: 10, color: 'var(--fg-dim)', textAlign: 'center', marginTop: 12, letterSpacing: '0.06em' }}>
                  🔒 iyzico güvenli ödeme · %85 doğrudan sanatçıya
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// LIBRARY — unchanged
// ============================================================================
const LibraryPage = ({ onPlay, currentTrack, q }) => {
  const auth = window.__yazsadAuth || { state: 'guest' };
  const [tab, setTab] = React.useState('owned');
  const hasPurchases = auth.state === 'user' && localStorage.getItem('yazsad-has-purchases') === '1';
  const hasLikes = auth.state === 'user' && localStorage.getItem('yazsad-has-likes') === '1';

  const owned = hasPurchases ? MARKET_TRACKS.slice(0, 5) : [];
  const liked = hasLikes ? TRACKS.slice(2, 5) : [];

  if (auth.state !== 'user') {
    return (
      <div className="page" style={{ paddingTop: 40 }}>
        <EmptyState
          art={<EmptyLibraryArt />}
          title="Kütüphane senin için hazır"
          desc="Giriş yaptığında satın aldığın parçalar, favorilerin ve çalma listelerin burada toplanır. Misafir olarak dinlemeye devam edebilirsin."
          action="Hesap Oluştur"
          onAction={() => window.__yazsadOpenAuth && window.__yazsadOpenAuth('signup')}
          secondary="Giriş Yap"
          onSecondary={() => window.__yazsadOpenAuth && window.__yazsadOpenAuth('login')}
          size="lg"
        />
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '40px 0', borderTop: '1px solid var(--border)' }}>
          <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 16, textAlign: 'center' }}>
            Bu arada keşfet
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16 }}>
            {TRACKS.slice(0, 4).map(t => <TrackCard key={t.id} track={t} onPlay={onPlay} q={q} active={currentTrack?.id === t.id} />)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="page-eyebrow">{owned.length} parça · {liked.length} favori</div>
          <h1 className="page-title">Kütüphanem</h1>
          <p className="page-subtitle">Satın aldığın, beğendiğin ve oluşturduğun her şey burada.</p>
        </div>
      </div>

      <div className="chip-row" style={{ marginBottom: 24 }}>
        <button className={`chip ${tab === 'owned' ? 'active' : ''}`} onClick={() => setTab('owned')}>
          Satın Alınanlar · {owned.length}
        </button>
        <button className={`chip ${tab === 'liked' ? 'active' : ''}`} onClick={() => setTab('liked')}>
          Beğeniler · {liked.length}
        </button>
        <button className={`chip ${tab === 'playlists' ? 'active' : ''}`} onClick={() => setTab('playlists')}>
          Listelerim · 0
        </button>
      </div>

      {tab === 'owned' && (owned.length > 0 ? (
        <div className="panel">
          <div className="panel-head">
            <div className="panel-title">Satın alınanlar</div>
            <button className="btn btn-ghost" style={{ fontSize: 12 }}>Hepsini İndir (.zip)</button>
          </div>
          <div>
            {owned.map(t => (
              <div key={t.id} style={{ display: 'grid', gridTemplateColumns: '40px 1fr auto auto auto auto', gap: 16, alignItems: 'center', padding: '14px 24px', borderBottom: '1px solid var(--border)' }}>
                <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
                  <GenArt {...t} seed={parseInt(t.id.replace('t',''))} />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{t.title}</div>
                  <div className="mono" style={{ fontSize: 11, color: 'var(--fg-muted)' }}>{t.artist} · {t.license}</div>
                </div>
                <span className="mono" style={{ fontSize: 11, color: 'var(--fg-muted)' }}>14 Nis 2026</span>
                <button className="btn btn-ghost" style={{ fontSize: 11 }}>WAV</button>
                <button className="btn btn-ghost" style={{ fontSize: 11 }}>Stems</button>
                <button className="btn-icon" onClick={() => onPlay(t)}><IPlay size={14} /></button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <EmptyState
          icon={ICart}
          title="Henüz hiçbir parça satın almadın"
          desc="Marketplace'te lisansladığın parçalar — WAV, stems ve lisans sertifikasıyla — burada toplanır."
          action="Marketplace'e Git"
          onAction={() => window.__yazsadGo && window.__yazsadGo('marketplace')}
        />
      ))}

      {tab === 'liked' && (liked.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
          {liked.map(t => <TrackCard key={t.id} track={t} onPlay={onPlay} q={q} active={currentTrack?.id === t.id} />)}
        </div>
      ) : (
        <EmptyState
          icon={IHeart}
          title="Kalp tut, buraya düşsün"
          desc="Beğendiğin parçaları kalp ikonuyla kaydet — istediğin zaman dönüp dinle."
          action="Keşfet'e Git"
          onAction={() => window.__yazsadGo && window.__yazsadGo('discover')}
        />
      ))}

      {tab === 'playlists' && (
        <EmptyState
          icon={IList}
          title="İlk çalma listeni oluştur"
          desc="Konsere giderken yol müziği, çalışırken fon, partide enerji — her mood için ayrı bir liste."
          action="+ Yeni Liste"
          onAction={() => window.__yazsadToast && window.__yazsadToast('Playlist yakında')}
        />
      )}
    </div>
  );
};

Object.assign(window, { MarketplacePage, CartPage, LibraryPage, MARKET_TRACKS, EditorialAlbumCard, ArtistBlockCard });
