// Bottom player bar + expanded full-screen player

const PlayerBar = ({ track, playing, onTogglePlay, onExpand, progress, onProgress, q, onToggleQueue, queueOpen }) => {
  if (!track) return null;
  const repeatLabel = q?.repeat === 'one' ? '1' : q?.repeat === 'all' ? '∞' : '';
  return (
    <div className="player-bar-grid" style={{ alignItems: 'center', padding: '12px 24px', gap: '24px', height: '80px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
        <div onClick={onExpand} style={{ width: 56, height: 56, borderRadius: 'var(--radius-md)', overflow: 'hidden', flexShrink: 0, cursor: 'pointer', position: 'relative' }}>
          <GenArt {...track} seed={parseInt(track.id.replace('t',''))} />
        </div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <div onClick={onExpand} style={{ fontSize: 13, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', cursor: 'pointer' }}>{track.title}</div>
          <div style={{ fontSize: 11, color: 'var(--fg-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{track.artist}</div>
        </div>
        <button className="btn-icon" style={{ flexShrink: 0 }}><IHeart size={16} /></button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', maxWidth: 640, margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button className="btn-icon" onClick={() => q?.toggleShuffle()} style={{ color: q?.shuffle ? 'var(--accent)' : undefined }}><IShuffle size={14} /></button>
          <button className="btn-icon" onClick={() => q?.playPrev()}><ISkipB size={14} /></button>
          <button onClick={onTogglePlay} style={{
            width: 36, height: 36, borderRadius: '50%', background: 'var(--fg)', color: 'var(--bg)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: 'none',
          }}>
            {playing ? <IPause size={14} /> : <IPlay size={14} />}
          </button>
          <button className="btn-icon" onClick={() => q?.playNext()}><ISkipF size={14} /></button>
          <button className="btn-icon" onClick={() => q?.cycleRepeat()} style={{ color: q?.repeat !== 'off' ? 'var(--accent)' : undefined, position: 'relative' }}>
            <IRepeat size={14} />
            {repeatLabel && <span className="mono" style={{ position: 'absolute', fontSize: 8, fontWeight: 700, bottom: -2, right: -2, background: 'var(--accent)', color: 'var(--accent-fg)', borderRadius: 4, padding: '0 3px', minWidth: 10, textAlign: 'center', lineHeight: 1.3 }}>{repeatLabel}</span>}
          </button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%' }}>
          <span className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', minWidth: 32, textAlign: 'right' }}>
            {formatProgress(progress, track.duration)}
          </span>
          <div
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const pct = ((e.clientX - rect.left) / rect.width) * 100;
              onProgress(Math.max(0, Math.min(100, pct)));
            }}
            style={{ flex: 1, height: 3, background: 'var(--border)', borderRadius: 2, position: 'relative', cursor: 'pointer' }}
          >
            <div style={{ width: `${progress}%`, height: '100%', background: 'var(--accent)', borderRadius: 2 }} />
          </div>
          <span className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', minWidth: 32 }}>{track.duration}</span>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 4 }}>
        <button className="btn-icon" onClick={onToggleQueue} title="Kuyruk" style={{ color: queueOpen ? 'var(--accent)' : undefined, position: 'relative' }}>
          <IList size={14} />
          {q?.queue?.length > 1 && <span style={{ position: 'absolute', top: 4, right: 4, width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }} />}
        </button>
        <button className="btn-icon"><IVolume size={14} /></button>
        <div style={{ width: 80, height: 3, background: 'var(--border)', borderRadius: 2, position: 'relative' }}>
          <div style={{ width: '62%', height: '100%', background: 'var(--fg)', borderRadius: 2 }} />
        </div>
        <button className="btn-icon" onClick={onExpand}><IExpand size={14} /></button>
      </div>
    </div>
  );
};

const formatProgress = (pct, totalStr) => {
  const [mm, ss] = totalStr.split(':').map(Number);
  const total = mm * 60 + ss;
  const cur = Math.floor((pct / 100) * total);
  return `${Math.floor(cur / 60)}:${String(cur % 60).padStart(2, '0')}`;
};

// Waveform bars (pseudo-random for each track)
const Waveform = ({ progress, seed = 1, bars = 80 }) => {
  const heights = React.useMemo(() => {
    const arr = [];
    let s = seed;
    for (let i = 0; i < bars; i++) {
      s = (s * 9301 + 49297) % 233280;
      const h = 15 + (s / 233280) * 75;
      // Make a soft envelope so edges are shorter
      const env = Math.sin((i / bars) * Math.PI);
      arr.push(Math.round(h * (0.4 + 0.6 * env)));
    }
    return arr;
  }, [seed, bars]);
  const playedIdx = Math.floor((progress / 100) * bars);
  return (
    <div className="waveform">
      {heights.map((h, i) => (
        <div key={i} className={`waveform-bar ${i < playedIdx ? 'played' : ''}`} style={{ height: `${h}%` }} />
      ))}
    </div>
  );
};

const FullPlayer = ({ track, playing, onTogglePlay, onClose, progress, onProgress, q }) => {
  if (!track) return null;
  const seed = parseInt(track.id.replace('t', ''));
  const repeatLabel = q?.repeat === 'one' ? '1' : q?.repeat === 'all' ? '∞' : '';
  return (
    <div className="full-player">
      <div className="full-player-bg">
        <GenArt {...track} seed={seed} />
      </div>
      <button className="full-player-close" onClick={onClose}><IDown size={18} /></button>

      <div className="full-player-content">
        <div className="full-player-art">
          <GenArt {...track} seed={seed} />
        </div>

        <div className="play-info">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <span className="ai-tag">AI ile üretilmiş</span>
            <span className="mono" style={{ fontSize: 11, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {track.genre} · {track.mood}
            </span>
          </div>
          <h1>{track.title}</h1>
          <a className="artist-link">{track.artist}</a>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
            <span className="mono" style={{ fontSize: 11, color: 'var(--fg-muted)', minWidth: 36, textAlign: 'right' }}>
              {formatProgress(progress, track.duration)}
            </span>
            <Waveform progress={progress} seed={seed} />
            <span className="mono" style={{ fontSize: 11, color: 'var(--fg-muted)', minWidth: 36 }}>{track.duration}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
            <button className="btn-icon" onClick={() => q?.toggleShuffle()} style={{ color: q?.shuffle ? 'var(--accent)' : undefined }}><IShuffle size={18} /></button>
            <button className="btn-icon" onClick={() => q?.playPrev()}><ISkipB size={20} /></button>
            <button onClick={onTogglePlay} style={{
              width: 64, height: 64, borderRadius: '50%', background: 'var(--accent)', color: 'var(--accent-fg)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: 'none',
            }}>
              {playing ? <IPause size={24} /> : <IPlay size={24} />}
            </button>
            <button className="btn-icon" onClick={() => q?.playNext()}><ISkipF size={20} /></button>
            <button className="btn-icon" onClick={() => q?.cycleRepeat()} style={{ color: q?.repeat !== 'off' ? 'var(--accent)' : undefined, position: 'relative' }}>
              <IRepeat size={18} />
              {repeatLabel && <span className="mono" style={{ position: 'absolute', fontSize: 9, fontWeight: 700, bottom: -3, right: -3, background: 'var(--accent)', color: 'var(--accent-fg)', borderRadius: 4, padding: '0 3px', minWidth: 10, textAlign: 'center', lineHeight: 1.3 }}>{repeatLabel}</span>}
            </button>
          </div>

          <div style={{ display: 'flex', gap: 28, color: 'var(--fg-muted)', fontSize: 13 }}>
            <div>
              <div className="mono" style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Dinlenme</div>
              <div style={{ color: 'var(--fg)', fontSize: 16, fontWeight: 600 }}>{track.plays}</div>
            </div>
            <div>
              <div className="mono" style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Beğeni</div>
              <div style={{ color: 'var(--fg)', fontSize: 16, fontWeight: 600 }}>{Math.round(parseFloat(track.plays) * 0.18 * 10) / 10}K</div>
            </div>
            <div>
              <div className="mono" style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Yayın</div>
              <div style={{ color: 'var(--fg)', fontSize: 16, fontWeight: 600 }}>2026</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { PlayerBar, FullPlayer, Waveform, formatProgress });
