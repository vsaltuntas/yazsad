// Global search page + topbar search integration

const SEARCH_SCOPE = ['Hepsi', 'Parça', 'Sanatçı', 'Haber', 'Forum', 'Playlist'];

const SearchPage = ({ query, setRoute, onPlay, q }) => {
  const [scope, setScope] = React.useState('Hepsi');
  const [localQ, setLocalQ] = React.useState(query || '');
  const inputRef = React.useRef(null);

  React.useEffect(() => { setLocalQ(query || ''); }, [query]);
  React.useEffect(() => { inputRef.current?.focus(); }, []);

  const s = localQ.trim().toLowerCase();
  const hasQ = s.length > 0;

  const trackHits = hasQ ? TRACKS.filter(t =>
    t.title.toLowerCase().includes(s) || t.artist.toLowerCase().includes(s) ||
    t.genre.toLowerCase().includes(s) || t.mood.toLowerCase().includes(s)
  ) : [];
  const artistHits = hasQ ? USERS.filter(u =>
    u.name.toLowerCase().includes(s) || u.handle.toLowerCase().includes(s)
  ) : [];
  const newsHits = hasQ ? NEWS.filter(n =>
    n.title.toLowerCase().includes(s) || n.excerpt.toLowerCase().includes(s) || n.author.toLowerCase().includes(s)
  ) : [];
  const forumHits = hasQ ? FORUM_TOPICS.filter(f =>
    f.title.toLowerCase().includes(s) || (f.tag || '').toLowerCase().includes(s)
  ) : [];

  const totalHits = trackHits.length + artistHits.length + newsHits.length + forumHits.length;

  const showSection = (name) => scope === 'Hepsi' || scope === name;

  // Trending & recent
  const trendingTerms = ['Zeybek', 'Suno v4.5', 'Ambient', 'Anadolu', 'Kapalıçarşı', 'Telif', 'Ege folk'];
  const recentSearches = JSON.parse(localStorage.getItem('yazsad-recent-search') || '[]');

  const saveSearch = (term) => {
    if (!term || !term.trim()) return;
    const cleaned = term.trim();
    const next = [cleaned, ...recentSearches.filter(x => x !== cleaned)].slice(0, 6);
    localStorage.setItem('yazsad-recent-search', JSON.stringify(next));
  };

  return (
    <div className="page" style={{ maxWidth: 960 }}>
      {/* Search input */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)', color: 'var(--fg-muted)', pointerEvents: 'none' }}>
            <ISearch size={18} />
          </div>
          <input
            ref={inputRef}
            value={localQ}
            onChange={(e) => setLocalQ(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') saveSearch(localQ); if (e.key === 'Escape') setLocalQ(''); }}
            placeholder="Parça, sanatçı, haber, forum konusu ara..."
            style={{
              width: '100%', padding: '18px 48px 18px 52px',
              background: 'var(--bg-elev)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)', color: 'var(--fg)',
              fontSize: 16, fontFamily: 'var(--font-sans)', outline: 'none',
            }}
          />
          {localQ && (
            <button onClick={() => setLocalQ('')} className="btn-icon" style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)' }}>
              <IX size={14} />
            </button>
          )}
        </div>

        {/* Scope chips */}
        <div className="chip-row" style={{ marginTop: 16, gap: 6 }}>
          {SEARCH_SCOPE.map(sc => (
            <button key={sc} className={`chip ${scope === sc ? 'active' : ''}`} onClick={() => setScope(sc)} style={{ fontSize: 12 }}>
              {sc}
              {hasQ && sc !== 'Hepsi' && (
                <span style={{ marginLeft: 6, opacity: 0.65, fontSize: 10 }}>
                  {sc === 'Parça' ? trackHits.length : sc === 'Sanatçı' ? artistHits.length : sc === 'Haber' ? newsHits.length : sc === 'Forum' ? forumHits.length : 0}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Empty state — trending + recent */}
      {!hasQ && (
        <>
          {recentSearches.length > 0 && (
            <div style={{ marginBottom: 32 }}>
              <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Son Aramaların</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {recentSearches.map(t => (
                  <button key={t} onClick={() => setLocalQ(t)} className="chip" style={{ fontSize: 12 }}>
                    ↻ {t}
                  </button>
                ))}
                <button onClick={() => { localStorage.removeItem('yazsad-recent-search'); setLocalQ(localQ); }} className="chip" style={{ fontSize: 11, color: 'var(--fg-muted)' }}>Temizle</button>
              </div>
            </div>
          )}

          <div style={{ marginBottom: 32 }}>
            <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Bu Hafta Trend</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {trendingTerms.map(t => (
                <button key={t} onClick={() => setLocalQ(t)} className="chip" style={{ fontSize: 12 }}>
                  <IFire size={11} /> {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Sıcak Konular</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12 }}>
              {FORUM_TOPICS.slice(2, 5).map(f => (
                <div key={f.id} onClick={() => setRoute('forum')} style={{ padding: 16, background: 'var(--bg-elev)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}>
                  <div className="mono" style={{ fontSize: 9, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>#{f.tag}</div>
                  <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 4, lineHeight: 1.4 }}>{f.title}</div>
                  <div style={{ fontSize: 11, color: 'var(--fg-muted)' }}>{f.replies} yanıt · {f.last}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Results */}
      {hasQ && (
        <>
          <div style={{ marginBottom: 24, fontSize: 13, color: 'var(--fg-muted)' }}>
            <strong style={{ color: 'var(--fg)' }}>{totalHits}</strong> sonuç · <span className="mono">"{localQ}"</span>
          </div>

          {totalHits === 0 && (
            <div style={{ padding: 72, textAlign: 'center' }}>
              <div className="display" style={{ fontSize: 28, marginBottom: 8 }}>Sonuç bulunamadı</div>
              <div style={{ color: 'var(--fg-muted)', fontSize: 13, marginBottom: 24 }}>
                "{localQ}" için bir şey bulamadık. Farklı bir arama dene.
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
                {trendingTerms.slice(0, 4).map(t => (
                  <button key={t} onClick={() => setLocalQ(t)} className="chip" style={{ fontSize: 12 }}>{t}</button>
                ))}
              </div>
            </div>
          )}

          {/* Parçalar */}
          {showSection('Parça') && trackHits.length > 0 && (
            <div style={{ marginBottom: 32 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
                <h2 style={{ fontSize: 18, fontWeight: 600 }}>Parçalar <span style={{ color: 'var(--fg-muted)', fontSize: 13, fontWeight: 400 }}>· {trackHits.length}</span></h2>
                {scope === 'Hepsi' && trackHits.length > 4 && (
                  <button onClick={() => setScope('Parça')} style={{ background: 'none', border: 'none', color: 'var(--accent)', fontSize: 12, cursor: 'pointer' }}>Tümünü gör →</button>
                )}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: scope === 'Parça' ? 'repeat(auto-fill, minmax(180px, 1fr))' : 'repeat(4, 1fr)', gap: 16 }}>
                {(scope === 'Parça' ? trackHits : trackHits.slice(0, 4)).map(t => (
                  <TrackCard key={t.id} track={t} onPlay={(x) => { onPlay(x); saveSearch(localQ); }} q={q} />
                ))}
              </div>
            </div>
          )}

          {/* Sanatçılar */}
          {showSection('Sanatçı') && artistHits.length > 0 && (
            <div style={{ marginBottom: 32 }}>
              <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>Sanatçılar <span style={{ color: 'var(--fg-muted)', fontSize: 13, fontWeight: 400 }}>· {artistHits.length}</span></h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
                {artistHits.map((u, i) => (
                  <div key={u.handle} onClick={() => { setRoute('profile'); saveSearch(localQ); }} style={{ padding: 16, background: 'var(--bg-elev)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div className="avatar" style={{ width: 44, height: 44, background: ['linear-gradient(135deg,#e94e1b,#7c3aed)','linear-gradient(135deg,#06b6d4,#ec4899)','linear-gradient(135deg,#4ade80,#fbbf24)','linear-gradient(135deg,#8b2635,#d4a574)','linear-gradient(135deg,#c23b22,#1a1a1a)','linear-gradient(135deg,#333,#e94e1b)'][i % 6] }}>
                      {u.name.split(' ').map(w => w[0]).slice(0,2).join('')}
                    </div>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{u.name}</div>
                      <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)' }}>{u.handle} · {u.followers}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Haberler */}
          {showSection('Haber') && newsHits.length > 0 && (
            <div style={{ marginBottom: 32 }}>
              <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>Haberler <span style={{ color: 'var(--fg-muted)', fontSize: 13, fontWeight: 400 }}>· {newsHits.length}</span></h2>
              <div style={{ display: 'grid', gap: 12 }}>
                {newsHits.map(n => (
                  <div key={n.id} onClick={() => { setRoute('news'); saveSearch(localQ); }} style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 16, padding: 12, background: 'var(--bg-elev)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}>
                    <div style={{ width: 120, height: 80, borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
                      <GenArt g1={n.g1} g2={n.g2} g3={n.g3} seed={parseInt(n.id.replace('n',''))} />
                    </div>
                    <div>
                      <div className="mono" style={{ fontSize: 9, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>{n.category} · {n.date}</div>
                      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, lineHeight: 1.3 }}>{n.title}</div>
                      <div style={{ fontSize: 12, color: 'var(--fg-muted)', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{n.excerpt}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Forum */}
          {showSection('Forum') && forumHits.length > 0 && (
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12 }}>Forum <span style={{ color: 'var(--fg-muted)', fontSize: 13, fontWeight: 400 }}>· {forumHits.length}</span></h2>
              <div style={{ background: 'var(--bg-elev)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                {forumHits.map(f => (
                  <div key={f.id} onClick={() => { setRoute('forum'); saveSearch(localQ); }} style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div className="mono" style={{ fontSize: 9, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', minWidth: 70 }}>#{f.tag}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 500 }}>{f.title}</div>
                      <div style={{ fontSize: 11, color: 'var(--fg-muted)' }}>{f.author} · {f.replies} yanıt · {f.last}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

Object.assign(window, { SearchPage });
