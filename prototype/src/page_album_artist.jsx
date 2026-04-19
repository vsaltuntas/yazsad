// Album page (Bandcamp-style) + Artist v2 page (Spotify-style profile)

// ============================================================================
// ALBUM PAGE — Bandcamp DNA
// ============================================================================
const AlbumPage = ({ albumId, onPlay, currentTrack, q, setRoute, cart, setCart }) => {
  const album = ALBUMS.find(a => a.id === albumId) || ALBUMS[0];
  const tracks = album.tracks.map(tid => TRACKS.find(t => t.id === tid)).filter(Boolean);
  const artist = Object.values(ARTISTS).find(a => a.name === album.artist);
  const seed = parseInt(album.id.replace('a','')) * 7;
  const [supportAmount, setSupportAmount] = React.useState(album.price);
  const totalDuration = tracks.reduce((s, t) => {
    const [m, sec] = t.duration.split(':').map(Number);
    return s + m * 60 + sec;
  }, 0);
  const totalMin = Math.floor(totalDuration / 60);
  const inCart = cart?.find(c => c.id === `album-${album.id}`);

  const addAlbumToCart = () => {
    if (!window.__yazsadGuardAction || !window.__yazsadGuardAction('Sepete eklemek')) return;
    if (inCart) setCart(cart.filter(c => c.id !== `album-${album.id}`));
    else setCart([...cart, {
      id: `album-${album.id}`, title: album.title, artist: album.artist,
      price: supportAmount, license: album.license,
      g1: album.g1, g2: album.g2, g3: album.g3,
      isAlbum: true, tracks: album.tracks.length,
    }]);
  };

  return (
    <div className="page" style={{ maxWidth: 1040 }}>
      {/* Bandcamp-style layout: two columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '420px 1fr', gap: 40, marginBottom: 40 }}>
        {/* LEFT: cover + supporters */}
        <div>
          <div style={{ aspectRatio: '1', borderRadius: 4, overflow: 'hidden', marginBottom: 16, boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>
            <GenArt {...album} seed={seed} />
          </div>

          {/* Tracklist hint player */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: 'var(--bg-elev)', border: '1px solid var(--border)', borderRadius: 4, marginBottom: 16 }}>
            <button onClick={() => onPlay(tracks[0])} style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--accent)', color: 'var(--accent-fg)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
              <IPlay size={12} />
            </button>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {tracks[0]?.title}
              </div>
              <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)' }}>Önizleme · {album.kind.toLowerCase()}'in ilk parçası</div>
            </div>
          </div>

          {/* Supporters list */}
          <div className="panel" style={{ padding: 16 }}>
            <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>
              {album.supporters} destekçi
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 4 }}>
              {Array.from({ length: 18 }).map((_, i) => (
                <div key={i} className="avatar" style={{
                  width: '100%', aspectRatio: '1', height: 'auto',
                  fontSize: 9, background: `linear-gradient(135deg, hsl(${i*37},50%,55%), hsl(${i*37+60},50%,35%))`,
                  borderRadius: 3,
                }}>{String.fromCharCode(65 + (i % 26))}{String.fromCharCode(65 + ((i*3) % 26))}</div>
              ))}
            </div>
            <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', marginTop: 10 }}>
              ...ve {album.supporters - 18} kişi daha
            </div>
          </div>
        </div>

        {/* RIGHT: title + tracklist + buy */}
        <div>
          <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 6 }}>
            {album.kind} · {album.released}
          </div>
          <h1 className="display" style={{ fontSize: 52, fontWeight: 500, lineHeight: 1.02, letterSpacing: '-0.03em', margin: '0 0 10px', textWrap: 'balance' }}>
            {album.title}
          </h1>
          <div
            onClick={() => artist && setRoute && setRoute(`artist:${artist.id}`)}
            style={{ fontSize: 17, color: 'var(--fg-muted)', marginBottom: 20, cursor: artist ? 'pointer' : 'default' }}
          >
            <span style={{ color: 'var(--fg-muted)' }}>by</span>{' '}
            <span style={{ color: 'var(--accent)', fontWeight: 500 }}>{album.artist}</span>
          </div>

          {/* Buy / Support panel */}
          <div style={{ padding: 20, background: 'var(--bg-elev)', border: '1px solid var(--border)', borderRadius: 4, marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
              <div className="mono" style={{ fontSize: 11, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Dijital {album.kind}</div>
              <div style={{ fontSize: 13 }}>
                <span style={{ color: 'var(--fg-muted)' }}>minimum</span>{' '}
                <span className="mono" style={{ fontWeight: 600 }}>₺{album.price}</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <span className="mono" style={{ fontSize: 14 }}>₺</span>
              <input
                type="number"
                min={album.price}
                value={supportAmount}
                onChange={e => setSupportAmount(Math.max(album.price, parseInt(e.target.value) || album.price))}
                className="input"
                style={{ flex: 1, fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 600 }}
              />
              <span className="mono" style={{ fontSize: 11, color: 'var(--fg-muted)' }}>TRY</span>
            </div>
            {supportAmount > album.price && (
              <div style={{ fontSize: 11, color: 'var(--success)', marginBottom: 12 }}>
                💚 Sanatçıyı ₺{supportAmount - album.price} fazla destekliyorsun — teşekkürler
              </div>
            )}
            <button className="btn btn-primary" onClick={addAlbumToCart} style={{ width: '100%', padding: 12, fontSize: 14 }}>
              {inCart ? '✓ Sepette' : 'Satın Al · Destekle'}
            </button>
            <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textAlign: 'center', marginTop: 10, letterSpacing: '0.06em' }}>
              WAV + MP3 + lisans · {album.license}
            </div>
          </div>

          {/* Blurb */}
          <p style={{ fontSize: 14, color: 'var(--fg)', lineHeight: 1.7, margin: '0 0 24px', textWrap: 'pretty' }}>
            {album.blurb}
          </p>

          {/* Tracklist */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
              <div className="mono" style={{ fontSize: 11, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {tracks.length} parça · {totalMin} dk
              </div>
              <button
                onClick={() => { tracks.forEach(t => q?.addToQueue(t)); window.__yazsadToast && window.__yazsadToast('Albüm kuyruğa eklendi'); }}
                className="btn btn-ghost" style={{ fontSize: 11 }}
              >+ Kuyruğa Ekle</button>
            </div>
            <div>
              {tracks.map((t, i) => {
                const isActive = currentTrack?.id === t.id;
                return (
                  <div
                    key={t.id}
                    onClick={() => onPlay(t)}
                    style={{
                      display: 'grid', gridTemplateColumns: '24px 1fr auto auto', gap: 14, alignItems: 'center',
                      padding: '10px 12px', borderBottom: '1px solid var(--border)',
                      background: isActive ? 'var(--accent-soft)' : 'transparent',
                      cursor: 'pointer', borderRadius: 4,
                    }}
                    onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'var(--bg-hover)' }}
                    onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent' }}
                  >
                    <span className="mono" style={{ fontSize: 11, color: 'var(--fg-muted)', textAlign: 'center' }}>
                      {isActive ? '▸' : String(i+1).padStart(2, '0')}
                    </span>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 500 }}>{t.title}</div>
                      <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        {t.plays} dinlenme · {t.mood.toLowerCase()}
                      </div>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); setRoute && setRoute(`track:${t.id}`); }}
                      style={{ background: 'none', border: 'none', color: 'var(--fg-muted)', fontSize: 10, cursor: 'pointer', padding: '4px 8px' }}
                    >detay →</button>
                    <span className="mono" style={{ fontSize: 11, color: 'var(--fg-muted)' }}>{t.duration}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Credits */}
          <div style={{ paddingTop: 20, borderTop: '1px solid var(--border)' }}>
            <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>
              Credits
            </div>
            <div style={{ display: 'grid', gap: 6 }}>
              {album.credits.map((c, i) => (
                <div key={i} style={{ fontSize: 12, color: 'var(--fg-muted)' }}>{c}</div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid var(--border)', display: 'flex', gap: 14, fontSize: 11, color: 'var(--fg-muted)' }}>
            <span><strong style={{ color: 'var(--fg)' }}>{album.plays}</strong> toplam dinlenme</span>
            <span>·</span>
            <span><strong style={{ color: 'var(--fg)' }}>{album.supporters}</strong> destekçi</span>
            <span>·</span>
            <span>tüm haklar {album.artist}'e aittir</span>
          </div>
        </div>
      </div>

      {/* More from this artist */}
      {artist && ARTISTS[artist.id] && (
        <div style={{ marginTop: 56, paddingTop: 40, borderTop: '1px solid var(--border)' }}>
          <div className="section-head">
            <h2 className="section-title">{album.artist}'den diğer albümler</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 20 }}>
            {ALBUMS.filter(a => a.artist === album.artist).map(a => (
              <AlbumCard key={a.id} album={a} onClick={() => setRoute && setRoute(`album:${a.id}`)} />
            ))}
            {ALBUMS.filter(a => a.artist === album.artist).length === 1 && (
              <div style={{ padding: 24, border: '1px dashed var(--border)', borderRadius: 4, fontSize: 12, color: 'var(--fg-muted)', textAlign: 'center' }}>
                Bu sanatçının şu an sadece 1 yayını var. Takip ederek yenilerinden haberdar ol.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const AlbumCard = ({ album, onClick }) => {
  const seed = parseInt(album.id.replace('a','')) * 7;
  return (
    <div onClick={onClick} style={{ cursor: 'pointer' }}>
      <div style={{ aspectRatio: '1', borderRadius: 4, overflow: 'hidden', marginBottom: 10, transition: 'transform 0.2s' }}>
        <GenArt {...album} seed={seed} />
      </div>
      <div className="mono" style={{ fontSize: 9, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 3 }}>{album.kind} · {album.year}</div>
      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{album.title}</div>
      <div className="mono" style={{ fontSize: 11, color: 'var(--fg-muted)' }}>{album.artist}</div>
      <div className="mono" style={{ fontSize: 12, fontWeight: 600, color: 'var(--accent)', marginTop: 4 }}>₺{album.price}+</div>
    </div>
  );
};

// ============================================================================
// ARTIST PAGE v2 — Spotify-style profile
// ============================================================================
const ArtistPage = ({ artistId, onPlay, currentTrack, q, setRoute }) => {
  const artist = ARTISTS[artistId] || Object.values(ARTISTS)[0];
  const albums = ALBUMS.filter(a => a.artist === artist.name);
  const topTracks = artist.topTrackIds.map(tid => TRACKS.find(t => t.id === tid)).filter(Boolean);
  const [following, setFollowing] = React.useState(false);
  const [tab, setTab] = React.useState('overview');

  return (
    <div style={{ marginTop: -40 /* escape page padding */ }}>
      {/* Banner */}
      <div style={{ position: 'relative', height: 320, overflow: 'hidden', margin: '0 -40px' }}>
        <GenArt g1={artist.bannerG1} g2={artist.bannerG2} g3={artist.bannerG3} seed={77} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, var(--bg) 100%)' }} />
      </div>

      <div style={{ margin: '0 -40px', padding: '0 40px', background: 'var(--bg)' }}>
        {/* Artist header */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 28, marginTop: -100, marginBottom: 32, position: 'relative', zIndex: 1 }}>
          <div className="avatar" style={{
            width: 180, height: 180, fontSize: 48, borderRadius: '50%',
            background: `linear-gradient(135deg, ${artist.g1}, ${artist.g2})`,
            border: '6px solid var(--bg)', boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
            flexShrink: 0,
          }}>
            {artist.name.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase()}
          </div>
          <div style={{ flex: 1, paddingBottom: 10 }}>
            <div className="mono" style={{ fontSize: 10, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 8 }}>
              🎵 {artist.badges[0] || 'Sanatçı'}
            </div>
            <h1 className="display" style={{ fontSize: 72, fontWeight: 500, lineHeight: 1, letterSpacing: '-0.03em', margin: '0 0 12px' }}>
              {artist.name}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 24, fontSize: 13, color: 'var(--fg-muted)' }}>
              <span><strong style={{ color: 'var(--fg)' }}>{artist.stats.monthlyListeners}</strong> aylık dinleyici</span>
              <span>·</span>
              <span><strong style={{ color: 'var(--fg)' }}>{artist.followers}</strong> takipçi</span>
              <span>·</span>
              <span>{artist.city}</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, paddingBottom: 10 }}>
            <button onClick={() => onPlay(topTracks[0])} className="btn btn-primary" style={{ padding: '12px 24px' }}>
              <IPlay size={14} /> Çal
            </button>
            <button onClick={() => setFollowing(!following)} className={following ? 'btn btn-ghost' : 'btn btn-ghost'} style={{ border: following ? '1px solid var(--accent)' : '1px solid var(--border)', color: following ? 'var(--accent)' : 'var(--fg)' }}>
              {following ? '✓ Takipte' : 'Takip Et'}
            </button>
            <button className="btn-icon" style={{ width: 40, height: 40 }}><IMore size={16} /></button>
          </div>
        </div>

        {/* Badges */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
          {artist.badges.map(b => (
            <span key={b} className="mono" style={{ fontSize: 10, padding: '4px 10px', background: 'var(--bg-elev)', border: '1px solid var(--border)', borderRadius: 12, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {b}
            </span>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ borderBottom: '1px solid var(--border)', marginBottom: 32, display: 'flex', gap: 4 }}>
          {[['overview', 'Genel'], ['albums', `Albümler · ${albums.length}`], ['events', `Etkinlikler · ${artist.upcoming.length}`], ['about', 'Hakkında']].map(([k, l]) => (
            <button key={k} onClick={() => setTab(k)} style={{ padding: '12px 16px', background: 'none', border: 'none', borderBottom: tab === k ? '2px solid var(--accent)' : '2px solid transparent', color: tab === k ? 'var(--fg)' : 'var(--fg-muted)', fontSize: 13, fontWeight: tab === k ? 600 : 500, cursor: 'pointer', marginBottom: -1 }}>{l}</button>
          ))}
        </div>

        {tab === 'overview' && (
          <>
            {/* Popular tracks */}
            <div className="section-head"><h2 className="section-title">Popüler</h2></div>
            <div style={{ marginBottom: 40 }}>
              {topTracks.map((t, i) => (
                <div
                  key={t.id}
                  onClick={() => onPlay(t)}
                  style={{
                    display: 'grid', gridTemplateColumns: '24px 48px 1fr auto auto', gap: 14, alignItems: 'center',
                    padding: '8px 10px', borderRadius: 6, cursor: 'pointer',
                    background: currentTrack?.id === t.id ? 'var(--accent-soft)' : 'transparent',
                  }}
                  onMouseEnter={e => { if (currentTrack?.id !== t.id) e.currentTarget.style.background = 'var(--bg-hover)' }}
                  onMouseLeave={e => { if (currentTrack?.id !== t.id) e.currentTarget.style.background = 'transparent' }}
                >
                  <span className="mono" style={{ fontSize: 13, color: 'var(--fg-muted)', textAlign: 'center' }}>{i+1}</span>
                  <div style={{ width: 48, height: 48, borderRadius: 4, overflow: 'hidden' }}><GenArt {...t} seed={parseInt(t.id.replace('t',''))} /></div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 500 }}>{t.title}</div>
                    <div className="mono" style={{ fontSize: 11, color: 'var(--fg-muted)' }}>{t.plays} dinlenme</div>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); setRoute && setRoute(`track:${t.id}`); }} style={{ background: 'none', border: 'none', color: 'var(--fg-muted)', fontSize: 11, cursor: 'pointer' }}>detay →</button>
                  <span className="mono" style={{ fontSize: 12, color: 'var(--fg-muted)' }}>{t.duration}</span>
                </div>
              ))}
            </div>

            {/* Discography */}
            {albums.length > 0 && (
              <>
                <div className="section-head"><h2 className="section-title">Diskografi</h2></div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 20, marginBottom: 40 }}>
                  {albums.map(a => <AlbumCard key={a.id} album={a} onClick={() => setRoute && setRoute(`album:${a.id}`)} />)}
                </div>
              </>
            )}

            {/* Events + About side by side */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 40 }}>
              <div>
                <div className="section-head"><h2 className="section-title" style={{ fontSize: 18 }}>Yaklaşan Etkinlikler</h2></div>
                {artist.upcoming.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {artist.upcoming.map((e, i) => (
                      <div key={i} style={{ padding: 16, background: 'var(--bg-elev)', border: '1px solid var(--border)', borderRadius: 6 }}>
                        <div className="mono" style={{ fontSize: 10, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>{e.date}</div>
                        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{e.event}</div>
                        <div className="mono" style={{ fontSize: 11, color: 'var(--fg-muted)' }}>{e.venue}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ padding: 20, border: '1px dashed var(--border)', borderRadius: 6, fontSize: 12, color: 'var(--fg-muted)', textAlign: 'center' }}>
                    Duyurulmuş etkinlik yok.
                  </div>
                )}
              </div>
              <div>
                <div className="section-head"><h2 className="section-title" style={{ fontSize: 18 }}>Hakkında</h2></div>
                <p style={{ fontSize: 13, color: 'var(--fg-muted)', lineHeight: 1.7, margin: 0, textWrap: 'pretty' }}>{artist.bio}</p>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 14 }}>
                  {artist.links.map(l => (
                    <span key={l.label} className="mono" style={{ fontSize: 10, padding: '4px 10px', border: '1px solid var(--border)', borderRadius: 12, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      {l.label} · {l.url}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {tab === 'albums' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 24 }}>
            {albums.map(a => <AlbumCard key={a.id} album={a} onClick={() => setRoute && setRoute(`album:${a.id}`)} />)}
          </div>
        )}

        {tab === 'events' && (
          <div style={{ display: 'grid', gap: 12, maxWidth: 700 }}>
            {artist.upcoming.map((e, i) => (
              <div key={i} style={{ display: 'flex', gap: 16, padding: 20, background: 'var(--bg-elev)', border: '1px solid var(--border)', borderRadius: 6 }}>
                <div style={{ width: 80, textAlign: 'center', padding: 12, background: 'var(--accent)', color: 'var(--accent-fg)', borderRadius: 4 }}>
                  <div className="display" style={{ fontSize: 28, fontWeight: 500, lineHeight: 1 }}>{e.date.split(' ')[0]}</div>
                  <div className="mono" style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 2 }}>{e.date.split(' ').slice(1).join(' ')}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{e.event}</div>
                  <div className="mono" style={{ fontSize: 12, color: 'var(--fg-muted)', marginBottom: 10 }}>{e.venue}</div>
                  <button className="btn btn-ghost" style={{ fontSize: 11 }}>Bilet Al</button>
                </div>
              </div>
            ))}
            {artist.upcoming.length === 0 && (
              <div style={{ padding: 40, textAlign: 'center', border: '1px dashed var(--border)', borderRadius: 6, color: 'var(--fg-muted)' }}>
                Duyurulmuş etkinlik yok. Takip et, haber olsun.
              </div>
            )}
          </div>
        )}

        {tab === 'about' && (
          <div style={{ maxWidth: 720 }}>
            <p style={{ fontSize: 16, color: 'var(--fg)', lineHeight: 1.7, margin: '0 0 24px', textWrap: 'pretty' }}>{artist.bio}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, padding: 20, background: 'var(--bg-elev)', border: '1px solid var(--border)', borderRadius: 6, marginBottom: 20 }}>
              <Stat label="Parça" v={artist.stats.tracks} />
              <Stat label="Albüm" v={artist.stats.albums} />
              <Stat label="Toplam dinlenme" v={artist.stats.totalPlays} />
              <Stat label="Katıldığı tarih" v={artist.joined} />
            </div>
            <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Bağlantılar</div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {artist.links.map(l => (
                <span key={l.label} className="mono" style={{ fontSize: 11, padding: '6px 14px', border: '1px solid var(--border)', borderRadius: 14, color: 'var(--fg)' }}>
                  {l.label} · {l.url}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

Object.assign(window, { AlbumPage, AlbumCard, ArtistPage });
