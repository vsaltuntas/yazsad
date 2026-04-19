// Track single page + Album page + Artist v2 page

// ============================================================================
// SINGLE (TRACK DETAIL) PAGE
// ============================================================================
const SinglePage = ({ trackId, onPlay, currentTrack, q, setRoute }) => {
  const track = TRACKS.find(t => t.id === trackId) || TRACKS[0];
  const album = albumForTrack(track.id);
  const artist = Object.values(ARTISTS).find(a => a.name === track.artist);
  const comments = commentsForTrack(track.id);
  const related = TRACKS.filter(t => t.id !== track.id && (t.genre === track.genre || t.artist === track.artist)).slice(0, 6);
  const seed = parseInt(track.id.replace('t', ''));
  const [liked, setLiked] = React.useState(false);
  const [newComment, setNewComment] = React.useState('');
  const [localComments, setLocalComments] = React.useState([]);

  const isPlaying = currentTrack?.id === track.id;

  return (
    <div className="page" style={{ maxWidth: 1100 }}>
      {/* Hero: big art + title */}
      <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: 32, marginBottom: 40 }}>
        <div style={{ aspectRatio: '1', borderRadius: 'var(--radius-lg)', overflow: 'hidden', position: 'relative', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
          <GenArt {...track} seed={seed} />
          <button onClick={() => onPlay(track)} style={{
            position: 'absolute', bottom: 16, right: 16,
            width: 64, height: 64, borderRadius: '50%', background: 'var(--accent)', color: 'var(--accent-fg)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer',
            boxShadow: '0 12px 32px rgba(0,0,0,0.4)',
          }}>
            {isPlaying ? <IPause size={24} /> : <IPlay size={24} />}
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className="mono" style={{ fontSize: 10, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 10 }}>
            {track.ai ? 'AI ÜRETİMİ · PARÇA' : 'PARÇA'}
          </div>
          <h1 className="display" style={{ fontSize: 64, fontWeight: 500, lineHeight: 1.02, letterSpacing: '-0.03em', margin: '0 0 16px', textWrap: 'balance' }}>
            {track.title}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <div
              onClick={() => artist && setRoute && setRoute(`artist:${artist.id}`)}
              style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: artist ? 'pointer' : 'default' }}
            >
              <div className="avatar" style={{ width: 36, height: 36, background: `linear-gradient(135deg, ${track.g1}, ${track.g2})`, fontSize: 12 }}>
                {track.artist.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 600 }}>{track.artist}</div>
                <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {album ? `${album.title} · ${album.year}` : track.genre}
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, marginBottom: 28 }}>
            <button className="btn btn-primary" onClick={() => onPlay(track)} style={{ padding: '10px 22px' }}>
              <IPlay size={14} />{isPlaying ? 'Çalıyor' : 'Çal'}
            </button>
            <button className="btn btn-ghost" onClick={() => q?.addToQueue(track)}>
              <IList size={14} />Kuyruğa
            </button>
            <button className="btn-icon" onClick={() => setLiked(!liked)} style={{ width: 40, height: 40 }}>
              <IHeart size={16} style={{ fill: liked ? 'var(--accent)' : 'none', color: liked ? 'var(--accent)' : 'var(--fg)' }} />
            </button>
            <button className="btn-icon" style={{ width: 40, height: 40 }}>
              <IMore size={16} />
            </button>
          </div>

          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            <Stat label="Dinlenme" v={track.plays} />
            <Stat label="Beğeni" v="1.2K" />
            <Stat label="Paylaşım" v="347" />
            <Stat label="Eklendi" v="12 Nis 2026" />
          </div>
        </div>
      </div>

      {/* Waveform */}
      <div style={{ padding: 20, background: 'var(--bg-elev)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', marginBottom: 32, display: 'flex', alignItems: 'center', gap: 16 }}>
        <span className="mono" style={{ fontSize: 11, color: 'var(--fg-muted)', minWidth: 36 }}>0:00</span>
        <div style={{ flex: 1 }}><Waveform progress={0} seed={seed} bars={120} /></div>
        <span className="mono" style={{ fontSize: 11, color: 'var(--fg-muted)', minWidth: 36, textAlign: 'right' }}>{track.duration}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 32 }}>
        {/* LEFT: description + comments */}
        <div>
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--fg-muted)' }}>Üretim Notu</h3>
          <p style={{ fontSize: 14, color: 'var(--fg)', lineHeight: 1.7, marginBottom: 32, textWrap: 'pretty' }}>
            {track.mood} mood, {track.genre.toLowerCase()} türünde {track.duration} uzunluğunda bir parça.
            Suno v4.5 ile üretilip Ableton Live üzerinde mixlenmiştir. Prompt kaynağı ve AI parmak izi dernek arşivinde kayıtlıdır.
            {album && ` "${album.title}" ${album.kind.toLowerCase()}'sinin ${album.tracks.indexOf(track.id)+1}. parçasıdır.`}
          </p>

          {/* Comments */}
          <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 16, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--fg-muted)' }}>
            Yorumlar · {comments.length + localComments.length}
          </h3>
          <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
            <input
              className="input"
              placeholder="Bir yorum yaz..."
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              style={{ flex: 1 }}
            />
            <button
              className="btn btn-primary"
              onClick={() => {
                if (!newComment.trim()) return;
                if (window.__yazsadGuardAction && !window.__yazsadGuardAction('Yorum yazmak')) return;
                setLocalComments([{ user: window.__yazsadAuth?.name || 'Sen', role: null, time: 'az önce', text: newComment }, ...localComments]);
                setNewComment('');
              }}
            >Yolla</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[...localComments, ...comments].map((c, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, padding: '14px 0', borderBottom: i < comments.length + localComments.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <div className="avatar" style={{ width: 32, height: 32, fontSize: 11, background: `linear-gradient(135deg, hsl(${i*60},60%,50%), hsl(${i*60+80},60%,40%))` }}>
                  {c.user.slice(0,2).toUpperCase()}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{c.user}</span>
                    {c.role && <span className="mono" style={{ fontSize: 9, color: 'var(--accent)', padding: '2px 6px', background: 'var(--accent-soft)', borderRadius: 3, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{c.role}</span>}
                    <span className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)' }}>{c.time}</span>
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--fg)', lineHeight: 1.55 }}>{c.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: details sidebar */}
        <div>
          <div className="panel" style={{ marginBottom: 16 }}>
            <div className="panel-head"><div className="panel-title">Detaylar</div></div>
            <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Detail k="Tür" v={track.genre} />
              <Detail k="Ruh hâli" v={track.mood} />
              <Detail k="Süre" v={track.duration} />
              <Detail k="Eklendi" v="12 Nis 2026" />
              {album && <Detail k="Albüm" v={album.title} linkTo={() => setRoute && setRoute(`album:${album.id}`)} />}
              <Detail k="Lisans" v="Dinleme serbest" />
            </div>
          </div>

          {album && (
            <div className="panel" style={{ marginBottom: 16, cursor: 'pointer' }} onClick={() => setRoute && setRoute(`album:${album.id}`)}>
              <div style={{ display: 'flex', gap: 12, padding: 16 }}>
                <div style={{ width: 64, height: 64, borderRadius: 'var(--radius-sm)', overflow: 'hidden', flexShrink: 0 }}>
                  <GenArt {...album} seed={parseInt(album.id.replace('a',''))*7} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="mono" style={{ fontSize: 9, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>{album.kind} · {album.year}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2 }}>{album.title}</div>
                  <div className="mono" style={{ fontSize: 11, color: 'var(--fg-muted)' }}>{album.tracks.length} parça</div>
                </div>
              </div>
            </div>
          )}

          {artist && (
            <div className="panel" onClick={() => setRoute && setRoute(`artist:${artist.id}`)} style={{ cursor: 'pointer' }}>
              <div style={{ aspectRatio: '2', position: 'relative', overflow: 'hidden' }}>
                <GenArt g1={artist.bannerG1} g2={artist.bannerG2} g3={artist.bannerG3} seed={99} />
              </div>
              <div style={{ padding: 16 }}>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{artist.name}</div>
                <div className="mono" style={{ fontSize: 11, color: 'var(--fg-muted)', marginBottom: 10 }}>{artist.stats.monthlyListeners} aylık dinleyici</div>
                <button className="btn btn-ghost" style={{ width: '100%', fontSize: 12 }}>Profili Aç →</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div style={{ marginTop: 48 }}>
          <div className="section-head">
            <h2 className="section-title">Benzer parçalar</h2>
          </div>
          <TrackGrid tracks={related} onPlay={onPlay} currentTrack={currentTrack} q={q} />
        </div>
      )}
    </div>
  );
};

const Stat = ({ label, v }) => (
  <div>
    <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2 }}>{label}</div>
    <div className="display" style={{ fontSize: 18, fontWeight: 500 }}>{v}</div>
  </div>
);

const Detail = ({ k, v, linkTo }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <span className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{k}</span>
    {linkTo ? (
      <span onClick={(e) => { e.stopPropagation(); linkTo(); }} style={{ fontSize: 12, fontWeight: 500, color: 'var(--accent)', cursor: 'pointer' }}>{v} →</span>
    ) : (
      <span style={{ fontSize: 12, fontWeight: 500 }}>{v}</span>
    )}
  </div>
);

Object.assign(window, { SinglePage });
