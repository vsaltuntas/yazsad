// Home page — editorial mix

const HomePage = ({ onPlay, currentTrack, q }) => {
  const hero = TRACKS[4]; // Neon Minare
  const featured = TRACKS.slice(0, 6);
  const recent = TRACKS.slice(6, 12);

  return (
    <div className="page">
      {/* Hero */}
      <div className="hero" onClick={() => onPlay(hero)}>
        <div className="hero-art"><GenArt {...hero} seed={5} /></div>
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="hero-eyebrow">Haftanın Seçkisi · Bu Hafta</div>
          <h1 className="hero-title">Neon Minare</h1>
          <p className="hero-desc">Anatolian Lab'in 2026 EP'sinden çıkan bu parça, şehir manzarasını synthwave dokularla yeniden kuruyor. 31.5K dinlenmeye ulaşan hafta birincisi.</p>
          <div className="hero-cta">
            <button className="btn btn-primary"><IPlay size={14} />Şimdi Dinle</button>
            <button className="btn btn-ghost">Detaylar</button>
          </div>
        </div>
      </div>

      {/* Editorial: About the association */}
      <div className="section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--dens-6)', alignItems: 'center', padding: 'var(--dens-6)', background: 'var(--bg-elev)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
        <div>
          <div className="mono" style={{ fontSize: 11, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>YAZSAD Nedir</div>
          <h2 className="display" style={{ fontSize: 36, fontWeight: 500, lineHeight: 1.1, letterSpacing: '-0.02em', margin: '0 0 16px' }}>
            Türkiye'nin ilk AI destekli müzik sanatçıları derneği.
          </h2>
          <p style={{ color: 'var(--fg-muted)', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
            Üretici ve dinleyicileri bir araya getiriyoruz. Hakları koruyor, etik çerçeveyi şekillendiriyor, topluluk yarışmaları ve canlı etkinlikler düzenliyoruz. 2024'ten beri, 3.8K+ üye.
          </p>
          <div style={{ display: 'flex', gap: 32, marginTop: 28 }}>
            <div>
              <div className="display" style={{ fontSize: 28, fontWeight: 500 }}>3,847</div>
              <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Aktif üye</div>
            </div>
            <div>
              <div className="display" style={{ fontSize: 28, fontWeight: 500 }}>12.6K</div>
              <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Parça</div>
            </div>
            <div>
              <div className="display" style={{ fontSize: 28, fontWeight: 500 }}>2026</div>
              <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Bahar Festivali</div>
            </div>
          </div>
        </div>
        <div style={{ aspectRatio: '1', borderRadius: 'var(--radius-md)', overflow: 'hidden', position: 'relative' }}>
          <GenArt g1="#e94e1b" g2="#d4a574" g3="#1a1410" seed={99} />
        </div>
      </div>

      {/* Featured tracks */}
      <div className="section">
        <div className="section-head">
          <h2 className="section-title">Haftanın Öne Çıkanları</h2>
          <a className="section-more">Tümünü gör →</a>
        </div>
        <TrackGrid tracks={featured} onPlay={onPlay} currentTrack={currentTrack} q={q} />
      </div>

      {/* Two-col: recent + news preview */}
      <div className="two-col">
        <div className="section">
          <div className="section-head">
            <h2 className="section-title">Yeni Eklenenler</h2>
            <a className="section-more">Keşfet →</a>
          </div>
          <TrackGrid tracks={recent} onPlay={onPlay} currentTrack={currentTrack} q={q} />
        </div>

        <div className="section">
          <div className="section-head">
            <h2 className="section-title">Dernek Günlüğü</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {NEWS.slice(0, 3).map(n => (
              <div key={n.id} className="news-card" style={{ flexDirection: 'row', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ width: 80, aspectRatio: '1', flexShrink: 0, borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
                  <GenArt g1={n.g1} g2={n.g2} g3={n.g3} seed={parseInt(n.id.replace('n',''))*4} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="news-meta" style={{ fontSize: 10 }}>
                    <span className="news-meta-cat">{n.category}</span>
                    <span>·</span>
                    <span>{n.date}</span>
                  </div>
                  <h3 className="news-title" style={{ fontSize: 14, marginTop: 6 }}>{n.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured artist */}
      <div className="section">
        <div className="section-head">
          <h2 className="section-title">Ayın Sanatçısı · Anatolian Lab</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 'var(--dens-6)', padding: 'var(--dens-6)', background: 'var(--bg-elev)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
              <div className="avatar avatar-xl" style={{ background: 'linear-gradient(135deg, #e94e1b, #7c3aed)' }}>AL</div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>Anatolian Lab</div>
                <div className="mono" style={{ fontSize: 11, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  İstanbul · 24 parça · 14.2K takipçi
                </div>
              </div>
            </div>
            <p style={{ color: 'var(--fg-muted)', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
              "AI bir ajan değil, bir enstrüman — ben notayı koyarım" diyen Anatolian Lab, 2026 Bahar'da üçüncü EP'si "Boğaz"ı yayınladı. Synthwave'den ambient'e, İstanbul manzarasını elektronik dokularla yeniden yazan sanatçı, derneğimizin kurucu üyelerinden.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
              <button className="btn btn-primary">Profili Gör</button>
              <button className="btn btn-ghost">Takip Et</button>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {TRACKS.filter(t => t.artist === 'Anatolian Lab').map(t => (
              <div key={t.id} onClick={() => onPlay(t)} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: 10,
                background: currentTrack?.id === t.id ? 'var(--accent-soft)' : 'transparent',
                borderRadius: 'var(--radius-md)', cursor: 'pointer',
              }}>
                <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
                  <GenArt {...t} seed={parseInt(t.id.replace('t',''))} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{t.title}</div>
                  <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)' }}>{t.plays} dinlenme</div>
                </div>
                <span className="mono" style={{ fontSize: 11, color: 'var(--fg-muted)' }}>{t.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const TrackGrid = ({ tracks, onPlay, currentTrack, q }) => (
  <div className="track-grid">
    {tracks.map(t => <TrackCard key={t.id} track={t} onPlay={onPlay} active={currentTrack?.id === t.id} q={q} />)}
  </div>
);

const TrackCard = ({ track, onPlay, active, q }) => {
  const seed = parseInt(track.id.replace('t', ''));
  const [menu, setMenu] = React.useState(false);
  const [toast, setToast] = React.useState(null);
  const menuRef = React.useRef(null);

  React.useEffect(() => {
    if (!menu) return;
    const h = (e) => { if (!menuRef.current?.contains(e.target)) setMenu(false); };
    setTimeout(() => document.addEventListener('click', h), 0);
    return () => document.removeEventListener('click', h);
  }, [menu]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1800);
  };

  const doQueue = (e) => {
    e.stopPropagation();
    q?.addToQueue(track);
    setMenu(false);
    showToast('Kuyruğa eklendi');
  };
  const doNext = (e) => {
    e.stopPropagation();
    q?.playNextUp(track);
    setMenu(false);
    showToast('Sıradaki olarak çalacak');
  };

  return (
    <div className="track-card" onClick={() => onPlay(track)} style={active ? { background: 'var(--bg-hover)' } : {}}>
      <div className="track-art">
        <GenArt {...track} seed={seed} />
        <button className="track-play"><IPlay size={16} /></button>
        {track.ai && <span className="ai-tag" style={{ position: 'absolute', top: 8, left: 8 }}>AI</span>}
        {q && (
          <button
            className="track-menu-btn"
            onClick={(e) => { e.stopPropagation(); setMenu(m => !m); }}
            style={{
              position: 'absolute', top: 8, right: 8, width: 28, height: 28, borderRadius: '50%',
              background: 'rgba(0,0,0,0.55)', border: 'none', color: 'white', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: menu ? 1 : undefined,
            }}
          >
            <IMore size={14} />
          </button>
        )}
        {menu && (
          <div
            ref={menuRef}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'absolute', top: 40, right: 8, zIndex: 40,
              background: 'var(--bg-elev)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)', minWidth: 200, padding: 4,
              boxShadow: '0 12px 32px rgba(0,0,0,0.35)',
            }}
          >
            <MenuItem icon={<IPlay size={12} />} label="Şimdi Çal" onClick={(e) => { e.stopPropagation(); onPlay(track); setMenu(false); }} />
            <MenuItem icon={<ISkipF size={12} />} label="Sıradaki olarak çal" onClick={doNext} />
            <MenuItem icon={<IList size={12} />} label="Kuyruğa ekle" onClick={doQueue} />
            <div style={{ height: 1, background: 'var(--border)', margin: '4px 0' }} />
            <MenuItem icon={<IMore size={12} />} label="Parça detayı →" onClick={(e) => { e.stopPropagation(); setMenu(false); window.__yazsadGo && window.__yazsadGo(`track:${track.id}`); }} />
            <MenuItem icon={<IHeart size={12} />} label="Beğen" onClick={(e) => { e.stopPropagation(); setMenu(false); showToast('Kitaplığa eklendi'); }} />
          </div>
        )}
        {toast && (
          <div style={{
            position: 'absolute', bottom: 8, left: 8, right: 8,
            background: 'rgba(0,0,0,0.85)', color: 'white',
            fontSize: 10, fontWeight: 600, padding: '6px 8px',
            borderRadius: 'var(--radius-sm)', textAlign: 'center',
            pointerEvents: 'none',
          }}>{toast}</div>
        )}
      </div>
      <div className="track-info">
        <div className="track-title">{track.title}</div>
        <div className="track-artist">{track.artist}</div>
      </div>
    </div>
  );
};

const MenuItem = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    style={{
      display: 'flex', alignItems: 'center', gap: 10, width: '100%',
      padding: '8px 10px', border: 'none', background: 'transparent',
      color: 'var(--fg)', fontSize: 12, cursor: 'pointer', borderRadius: 'var(--radius-sm)',
      textAlign: 'left',
    }}
    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-hover)'}
    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
  >
    <span style={{ color: 'var(--fg-muted)' }}>{icon}</span>
    {label}
  </button>
);

Object.assign(window, { HomePage, TrackGrid, TrackCard, MenuItem });
