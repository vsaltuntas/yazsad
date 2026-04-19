// Tweaks panel — theme, density, font, cards, layout

const TweaksPanel = ({ tweaks, setTweak, onClose }) => {
  const themes = [
    { id: 'cinematic', label: 'Sinematik', bg: '#0a0a0c', ac: '#e94e1b' },
    { id: 'anadolu', label: 'Anadolu', bg: '#1a1410', ac: '#d4a574' },
    { id: 'editorial', label: 'Editoryal', bg: '#faf7f0', ac: '#c23b22' },
    { id: 'terminal', label: 'Terminal', bg: '#000', ac: '#00ff88' },
  ];

  return (
    <div className="tweaks-panel">
      <div className="tweaks-head">
        <div className="tweaks-title">Tweaks · Tema & Düzen</div>
        <button className="btn-icon" onClick={onClose}><IX size={14} /></button>
      </div>
      <div className="tweaks-body">

        {/* Theme */}
        <div>
          <div className="tweak-group-label">Tema</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
            {themes.map(t => (
              <div key={t.id} className={`theme-swatch ${tweaks.theme === t.id ? 'active' : ''}`} onClick={() => setTweak('theme', t.id)} style={{ background: t.bg }}>
                <div style={{ position: 'absolute', inset: '20% 30%', background: t.ac, opacity: 0.8 }} />
                <div className="theme-swatch-label">{t.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Density */}
        <div>
          <div className="tweak-group-label">Yoğunluk</div>
          <div className="tweak-opts" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {[['tight','Sık'],['normal','Normal'],['airy','Ferah']].map(([id, l]) => (
              <button key={id} className={`tweak-opt ${tweaks.density === id ? 'active' : ''}`} onClick={() => setTweak('density', id)}>{l}</button>
            ))}
          </div>
        </div>

        {/* Card style */}
        <div>
          <div className="tweak-group-label">Kart Stili</div>
          <div className="tweak-opts" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {[['grid','Grid'],['list','Liste'],['magazine','Magazin']].map(([id, l]) => (
              <button key={id} className={`tweak-opt ${tweaks.cardStyle === id ? 'active' : ''}`} onClick={() => setTweak('cardStyle', id)}>{l}</button>
            ))}
          </div>
        </div>

        {/* Layout */}
        <div>
          <div className="tweak-group-label">Kenar Çubuğu</div>
          <div className="tweak-opts" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            {[['standard','Geniş'],['compact','Kompakt']].map(([id, l]) => (
              <button key={id} className={`tweak-opt ${tweaks.layout === id ? 'active' : ''}`} onClick={() => setTweak('layout', id)}>{l}</button>
            ))}
          </div>
        </div>

        {/* Accent */}
        <div>
          <div className="tweak-group-label">Vurgu Rengi</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {[
              { id: 'default', col: '' },
              { id: 'orange', col: '#e94e1b' },
              { id: 'red', col: '#e30a17' },
              { id: 'gold', col: '#d4a574' },
              { id: 'green', col: '#00ff88' },
              { id: 'purple', col: '#7c3aed' },
              { id: 'cyan', col: '#06b6d4' },
            ].map(c => (
              <button key={c.id} onClick={() => setTweak('accent', c.id)} style={{
                width: 28, height: 28, borderRadius: '50%',
                background: c.col || 'linear-gradient(135deg, var(--fg-dim), transparent)',
                border: tweaks.accent === c.id ? '2px solid var(--fg)' : '2px solid transparent',
                cursor: 'pointer',
                padding: 0,
              }} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

Object.assign(window, { TweaksPanel });
