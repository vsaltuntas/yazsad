// Player queue logic + queue drawer

const usePlayerQueue = (initialTrack) => {
  const [queue, setQueue] = React.useState([initialTrack]);
  const [index, setIndex] = React.useState(0);
  const [shuffle, setShuffle] = React.useState(false);
  const [repeat, setRepeat] = React.useState('off'); // off | all | one
  const [history, setHistory] = React.useState([]);

  const current = queue[index] || initialTrack;

  const playTrack = (t) => {
    // Replace queue with just this track + push old to history
    setHistory(h => [...h, current].slice(-20));
    setQueue([t]);
    setIndex(0);
  };

  const playNext = () => {
    if (repeat === 'one') return; // stay on same
    if (shuffle && queue.length > 1) {
      let next = Math.floor(Math.random() * queue.length);
      while (next === index && queue.length > 1) next = Math.floor(Math.random() * queue.length);
      setIndex(next);
      return;
    }
    if (index < queue.length - 1) setIndex(index + 1);
    else if (repeat === 'all') setIndex(0);
  };

  const playPrev = () => {
    if (index > 0) setIndex(index - 1);
    else if (repeat === 'all') setIndex(queue.length - 1);
  };

  const addToQueue = (t) => {
    if (queue.find(x => x.id === t.id)) return;
    setQueue(q => [...q, t]);
  };

  const playNextUp = (t) => {
    setQueue(q => {
      const filtered = q.filter(x => x.id !== t.id);
      const newQ = [...filtered.slice(0, index + 1), t, ...filtered.slice(index + 1)];
      return newQ;
    });
  };

  const removeFromQueue = (id) => {
    setQueue(q => {
      const newQ = q.filter(x => x.id !== id);
      if (newQ.length === 0) return q; // don't empty
      return newQ;
    });
  };

  const reorderQueue = (from, to) => {
    setQueue(q => {
      const arr = [...q];
      const [item] = arr.splice(from, 1);
      arr.splice(to, 0, item);
      return arr;
    });
    if (index === from) setIndex(to);
    else if (from < index && to >= index) setIndex(index - 1);
    else if (from > index && to <= index) setIndex(index + 1);
  };

  const toggleShuffle = () => setShuffle(s => !s);
  const cycleRepeat = () => setRepeat(r => r === 'off' ? 'all' : r === 'all' ? 'one' : 'off');

  return {
    current, queue, index, history, shuffle, repeat,
    playTrack, playNext, playPrev,
    addToQueue, playNextUp, removeFromQueue, reorderQueue,
    toggleShuffle, cycleRepeat, setIndex,
  };
};

const QueueDrawer = ({ onClose, q }) => {
  const upNext = q.queue.slice(q.index + 1);
  const playedPast = q.history.slice(-5);
  return (
    <div style={{
      position: 'fixed', top: 'var(--topbar-h)', right: 0, bottom: 'var(--player-h)',
      width: 380, background: 'var(--bg-elev)', borderLeft: '1px solid var(--border)',
      zIndex: 50, display: 'flex', flexDirection: 'column',
      boxShadow: '-12px 0 40px rgba(0,0,0,0.3)',
    }}>
      <div style={{ padding: '18px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2 }}>Kuyruk</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Şimdi Çalıyor · {q.queue.length} parça</div>
        </div>
        <button className="btn-icon" onClick={onClose}><IX size={14} /></button>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '16px 0' }}>
        {/* Now playing */}
        <div style={{ padding: '0 20px 12px' }}>
          <div className="mono" style={{ fontSize: 10, color: 'var(--fg-dim)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Şimdi</div>
          <QueueRow t={q.current} playing highlight />
        </div>

        {/* Up next */}
        {upNext.length > 0 && (
          <div style={{ padding: '16px 20px 12px', borderTop: '1px solid var(--border)' }}>
            <div className="mono" style={{ fontSize: 10, color: 'var(--fg-dim)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Sıradaki · {upNext.length}</div>
            {upNext.map((t, i) => (
              <QueueRow key={t.id + i} t={t} onPlay={() => q.setIndex(q.index + 1 + i)} onRemove={() => q.removeFromQueue(t.id)} />
            ))}
          </div>
        )}

        {upNext.length === 0 && (
          <div style={{ padding: '28px 20px 20px', borderTop: '1px solid var(--border)' }}>
            <EmptyQueueArt />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Sıra boş</div>
              <div style={{ fontSize: 11, color: 'var(--fg-muted)', lineHeight: 1.5, marginBottom: 12 }}>
                Bir parça bitince kuyruk durur. Kartların "…" menüsünden ekle.
              </div>
              <button className="btn btn-ghost" style={{ fontSize: 11 }} onClick={() => { onClose(); window.__yazsadGo && window.__yazsadGo('discover'); }}>
                Keşfet'e Git →
              </button>
            </div>
          </div>
        )}

        {playedPast.length > 0 && (
          <div style={{ padding: '16px 20px 12px', borderTop: '1px solid var(--border)' }}>
            <div className="mono" style={{ fontSize: 10, color: 'var(--fg-dim)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Son Dinlenenler</div>
            {playedPast.reverse().map((t, i) => (
              <QueueRow key={t.id + '-h-' + i} t={t} muted />
            ))}
          </div>
        )}
      </div>

      <div style={{ padding: '12px 20px', borderTop: '1px solid var(--border)', display: 'flex', gap: 8 }}>
        <button className="btn btn-ghost" style={{ flex: 1, fontSize: 11 }} onClick={q.toggleShuffle}>
          {q.shuffle ? '✓ ' : ''}Karıştır
        </button>
        <button className="btn btn-ghost" style={{ flex: 1, fontSize: 11 }} onClick={q.cycleRepeat}>
          Döngü: {q.repeat === 'off' ? 'Kapalı' : q.repeat === 'all' ? 'Hepsi' : 'Tek'}
        </button>
      </div>
    </div>
  );
};

const QueueRow = ({ t, playing, highlight, muted, onPlay, onRemove }) => {
  if (!t) return null;
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '36px 1fr auto', gap: 10, alignItems: 'center',
      padding: '8px', marginBottom: 2, borderRadius: 'var(--radius-sm)',
      background: highlight ? 'var(--accent-soft)' : 'transparent',
      opacity: muted ? 0.55 : 1,
      cursor: onPlay ? 'pointer' : 'default',
    }} onClick={onPlay}>
      <div style={{ width: 36, height: 36, borderRadius: 'var(--radius-sm)', overflow: 'hidden', position: 'relative' }}>
        <GenArt {...t} seed={parseInt(t.id.replace('t',''))} />
        {playing && (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ display: 'flex', gap: 2, alignItems: 'flex-end', height: 14 }}>
              {[0,1,2].map(i => (
                <div key={i} style={{ width: 2, background: 'white', animation: `vu ${0.6+i*0.2}s ease-in-out infinite alternate`, height: '100%' }} />
              ))}
            </div>
          </div>
        )}
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: highlight ? 600 : 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.title}</div>
        <div style={{ fontSize: 11, color: 'var(--fg-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.artist}</div>
      </div>
      {onRemove && (
        <button className="btn-icon" onClick={(e) => { e.stopPropagation(); onRemove(); }} style={{ width: 26, height: 26 }}>
          <IX size={12} />
        </button>
      )}
      {!onRemove && !muted && !highlight && <span className="mono" style={{ fontSize: 10, color: 'var(--fg-dim)' }}>{t.duration}</span>}
      {muted && <span className="mono" style={{ fontSize: 10, color: 'var(--fg-dim)' }}>{t.duration}</span>}
    </div>
  );
};

// Animation keyframes for VU meter
if (typeof document !== 'undefined' && !document.getElementById('yazsad-vu-anim')) {
  const s = document.createElement('style');
  s.id = 'yazsad-vu-anim';
  s.textContent = '@keyframes vu { from { height: 20%; } to { height: 100%; } }';
  document.head.appendChild(s);
}

Object.assign(window, { usePlayerQueue, QueueDrawer, QueueRow });
