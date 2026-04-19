// Discover page — Spotify DNA: horizontal shelves, personalized rails

const DiscoverPage = ({ onPlay, currentTrack, q }) => {
  const [filter, setFilter] = React.useState('Hepsi');

  // Rails
  const greetingHour = new Date().getHours();
  const greeting = greetingHour < 12 ? 'Günaydın' : greetingHour < 18 ? 'İyi günler' : 'İyi akşamlar';
  const userName = window.__yazsadAuth?.name?.split(' ')[0] || 'Dinleyici';

  const madeForYou = TRACKS.slice(0, 6);
  const newReleases = [...TRACKS].reverse().slice(0, 8);
  const recent = TRACKS.slice(3, 9);
  const weeklyMix = TRACKS.slice(2, 8);
  const byMood = {
    'Melankolik': TRACKS.filter(t => t.mood === 'Melankolik'),
    'Enerjik': TRACKS.filter(t => t.mood === 'Enerjik'),
    'Huzurlu': TRACKS.filter(t => t.mood === 'Huzurlu'),
  };

  // Quick pick tiles (top row)
  const quickPicks = TRACKS.slice(0, 8);

  return (
    <div className="page" style={{ maxWidth: 1400 }}>
      {/* Greeting header */}
      <div style={{ marginBottom: 32 }}>
        <div className="mono" style={{ fontSize: 10, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 8 }}>
          {new Date().toLocaleDateString('tr-TR', { weekday: 'long', day: 'numeric', month: 'long' })}
        </div>
        <h1 className="display" style={{ fontSize: 48, fontWeight: 500, lineHeight: 1.05, letterSpacing: '-0.025em', margin: 0 }}>
          {greeting}, {userName}
        </h1>
      </div>

      {/* Quick pick tiles: 4x2 grid of playable chips */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 40 }}>
        {quickPicks.map(t => {
          const seed = parseInt(t.id.replace('t', ''));
          return (
            <div
              key={t.id}
              onClick={() => onPlay(t)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                background: 'var(--bg-elev)', border: '1px solid var(--border)',
                borderRadius: 6, cursor: 'pointer', overflow: 'hidden',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--bg-elev)'}
            >
              <div style={{ width: 56, height: 56, flexShrink: 0 }}><GenArt {...t} seed={seed} /></div>
              <div style={{ flex: 1, minWidth: 0, padding: '0 10px' }}>
                <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.title}</div>
                <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.artist}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mini-chip filters */}
      <div className="chip-row" style={{ marginBottom: 32 }}>
        {['Hepsi', 'Müzik', 'Podcast', 'Folk', 'Elektronik', 'Hip-Hop', 'Ambient'].map(c => (
          <button key={c} className={`chip ${filter === c ? 'active' : ''}`} onClick={() => setFilter(c)}>{c}</button>
        ))}
      </div>

      {/* Rail: Made for you */}
      <Shelf title="Bugün senin için" subtitle="Dinleme geçmişine göre hazırlandı">
        {madeForYou.map(t => <ShelfCard key={t.id} track={t} onPlay={onPlay} active={currentTrack?.id === t.id} />)}
      </Shelf>

      {/* Rail: Weekly mix (playlist-style) */}
      <Shelf title="Haftanın karışımı" subtitle="Her Pazartesi yenilenir">
        <MixCard
          title="Haftanın Karışımı"
          subtitle={`${weeklyMix.length} parça · güncellendi`}
          tracks={weeklyMix}
          gradient="linear-gradient(135deg, #e94e1b, #7c3aed)"
          onPlay={() => onPlay(weeklyMix[0])}
        />
        <MixCard
          title="Türkiye AI Radyo"
          subtitle="7/24 yayın"
          tracks={TRACKS.slice(0, 12)}
          gradient="linear-gradient(135deg, #06b6d4, #ec4899)"
          onPlay={() => window.__yazsadGo && window.__yazsadGo('radio')}
        />
        <MixCard
          title="Gece 3 Sakinliği"
          subtitle="Uyumadan önce"
          tracks={byMood['Melankolik'] || []}
          gradient="linear-gradient(135deg, #1a1a2e, #4ade80)"
          onPlay={() => onPlay((byMood['Melankolik'] || TRACKS)[0])}
        />
        <MixCard
          title="Ege Kıyısı"
          subtitle="Folk + dinlendirici"
          tracks={byMood['Huzurlu'] || []}
          gradient="linear-gradient(135deg, #4ade80, #fbbf24)"
          onPlay={() => onPlay((byMood['Huzurlu'] || TRACKS)[0])}
        />
        <MixCard
          title="Kafası İyi"
          subtitle="Çalışırken / kod yazarken"
          tracks={TRACKS.slice(0, 10)}
          gradient="linear-gradient(135deg, #d4a574, #8b2635)"
          onPlay={() => onPlay(TRACKS[0])}
        />
      </Shelf>

      {/* Rail: Yeni çıkanlar */}
      <Shelf title="Yeni çıkanlar" subtitle="Bu hafta derneğe düştü">
        {newReleases.map(t => <ShelfCard key={t.id} track={t} onPlay={onPlay} active={currentTrack?.id === t.id} />)}
      </Shelf>

      {/* Rail: Featured artists */}
      <Shelf title="Tanış: Türkiye'nin AI sanatçıları" subtitle="Derneğe kayıtlı, doğrulanmış">
        {Object.values(ARTISTS).map(a => (
          <ArtistRailCard key={a.id} artist={a} />
        ))}
      </Shelf>

      {/* Rail: Recently played */}
      <Shelf title="Son dinlenenler" subtitle="Kaldığın yerden devam">
        {recent.map(t => <ShelfCard key={t.id} track={t} onPlay={onPlay} active={currentTrack?.id === t.id} />)}
      </Shelf>

      {/* Mood rows */}
      {Object.entries(byMood).map(([mood, ts]) => ts.length > 0 && (
        <Shelf key={mood} title={mood} subtitle={`${ts.length} parça`}>
          {ts.map(t => <ShelfCard key={t.id} track={t} onPlay={onPlay} active={currentTrack?.id === t.id} />)}
        </Shelf>
      ))}

      {/* Jump to albums */}
      <Shelf title="Albümler" subtitle="Tam dinle, sıralı ver">
        {ALBUMS.map(a => <AlbumRailCard key={a.id} album={a} />)}
      </Shelf>
    </div>
  );
};

// Horizontally-scrolling shelf
const Shelf = ({ title, subtitle, children }) => {
  const scrollerRef = React.useRef(null);
  const scroll = (dir) => {
    if (!scrollerRef.current) return;
    scrollerRef.current.scrollBy({ left: dir * 600, behavior: 'smooth' });
  };
  return (
    <div style={{ marginBottom: 40 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div>
          <h2 className="display" style={{ fontSize: 24, fontWeight: 500, letterSpacing: '-0.015em', margin: 0 }}>{title}</h2>
          {subtitle && <div className="mono" style={{ fontSize: 11, color: 'var(--fg-muted)', marginTop: 2, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{subtitle}</div>}
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button onClick={() => scroll(-1)} className="btn-icon" style={{ width: 32, height: 32 }}>‹</button>
          <button onClick={() => scroll(1)} className="btn-icon" style={{ width: 32, height: 32 }}>›</button>
        </div>
      </div>
      <div
        ref={scrollerRef}
        style={{
          display: 'flex', gap: 14, overflowX: 'auto', scrollBehavior: 'smooth',
          scrollbarWidth: 'none', msOverflowStyle: 'none', paddingBottom: 4,
        }}
        className="shelf-scroller"
      >
        {children}
      </div>
      <style>{`.shelf-scroller::-webkit-scrollbar{display:none}`}</style>
    </div>
  );
};

// Square card for tracks
const ShelfCard = ({ track, onPlay, active }) => {
  const seed = parseInt(track.id.replace('t', ''));
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onClick={() => onPlay(track)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: 180, flexShrink: 0, padding: 10, borderRadius: 8,
        background: hover || active ? 'var(--bg-elev)' : 'transparent',
        cursor: 'pointer', transition: 'background 0.2s',
      }}
    >
      <div style={{ position: 'relative', aspectRatio: '1', borderRadius: 4, overflow: 'hidden', marginBottom: 10 }}>
        <GenArt {...track} seed={seed} />
        {hover && (
          <div style={{
            position: 'absolute', bottom: 8, right: 8,
            width: 40, height: 40, borderRadius: '50%', background: 'var(--accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 8px 20px rgba(0,0,0,0.4)',
          }}>
            <IPlay size={14} />
          </div>
        )}
      </div>
      <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{track.title}</div>
      <div className="mono" style={{ fontSize: 11, color: 'var(--fg-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{track.artist}</div>
    </div>
  );
};

// Big gradient mix card
const MixCard = ({ title, subtitle, tracks, gradient, onPlay }) => {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onClick={onPlay}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: 220, flexShrink: 0, padding: 10, borderRadius: 8,
        background: hover ? 'var(--bg-elev)' : 'transparent', cursor: 'pointer',
      }}
    >
      <div style={{
        aspectRatio: '1', borderRadius: 4, overflow: 'hidden', marginBottom: 10,
        background: gradient, padding: 20, display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between', color: 'white', position: 'relative',
      }}>
        <div className="display" style={{ fontSize: 22, fontWeight: 600, lineHeight: 1.1, textShadow: '0 2px 12px rgba(0,0,0,0.3)' }}>{title}</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
          {tracks.slice(0, 6).map(t => (
            <div key={t.id} style={{ aspectRatio: '1', borderRadius: 2, overflow: 'hidden' }}>
              <GenArt {...t} seed={parseInt(t.id.replace('t',''))} />
            </div>
          ))}
        </div>
        {hover && (
          <div style={{
            position: 'absolute', bottom: 12, right: 12,
            width: 44, height: 44, borderRadius: '50%', background: 'var(--accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <IPlay size={16} />
          </div>
        )}
      </div>
      <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{title}</div>
      <div className="mono" style={{ fontSize: 11, color: 'var(--fg-muted)' }}>{subtitle}</div>
    </div>
  );
};

// Circular artist card
const ArtistRailCard = ({ artist }) => {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onClick={() => window.__yazsadGo && window.__yazsadGo(`artist:${artist.id}`)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: 180, flexShrink: 0, padding: 10, borderRadius: 8,
        background: hover ? 'var(--bg-elev)' : 'transparent', cursor: 'pointer',
        textAlign: 'center',
      }}
    >
      <div style={{
        width: 160, height: 160, borderRadius: '50%', overflow: 'hidden',
        margin: '0 auto 10px', background: `linear-gradient(135deg, ${artist.g1}, ${artist.g2})`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 48, fontWeight: 700, color: 'white',
      }}>
        {artist.name.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase()}
      </div>
      <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{artist.name}</div>
      <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Sanatçı</div>
    </div>
  );
};

// Album rail card
const AlbumRailCard = ({ album }) => {
  const [hover, setHover] = React.useState(false);
  const seed = parseInt(album.id.replace('a','')) * 7;
  return (
    <div
      onClick={() => window.__yazsadGo && window.__yazsadGo(`album:${album.id}`)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: 180, flexShrink: 0, padding: 10, borderRadius: 8,
        background: hover ? 'var(--bg-elev)' : 'transparent', cursor: 'pointer',
      }}
    >
      <div style={{ aspectRatio: '1', borderRadius: 4, overflow: 'hidden', marginBottom: 10 }}>
        <GenArt {...album} seed={seed} />
      </div>
      <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{album.title}</div>
      <div className="mono" style={{ fontSize: 11, color: 'var(--fg-muted)' }}>{album.artist} · {album.year}</div>
    </div>
  );
};

Object.assign(window, { DiscoverPage, Shelf, ShelfCard, MixCard, ArtistRailCard, AlbumRailCard });
