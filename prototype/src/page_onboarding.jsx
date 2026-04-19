// Onboarding wizard (4 steps) — shown on first visit

const OnboardingWizard = ({ onComplete }) => {
  const [step, setStep] = React.useState(0);
  const [role, setRole] = React.useState(null);
  const [interests, setInterests] = React.useState([]);
  const [name, setName] = React.useState('');
  const [avatar, setAvatar] = React.useState(0);

  const next = () => setStep(s => s + 1);
  const back = () => setStep(s => s - 1);
  const finish = () => {
    try { localStorage.setItem('yazsad_onboarded', '1'); } catch {}
    onComplete({ role, interests, name, avatar });
  };

  const canNext = [role !== null, interests.length > 0, true, true][step];

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(10,10,10,0.85)', backdropFilter: 'blur(8px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ width: '100%', maxWidth: 680, background: 'var(--bg-elev)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: '0 20px 80px rgba(0,0,0,0.5)' }}>
        {/* Progress bar */}
        <div style={{ height: 3, background: 'var(--bg-elev-2)', position: 'relative' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', background: 'var(--accent)', width: `${(step+1)/4 * 100}%`, transition: 'width 0.3s' }} />
        </div>

        <div style={{ padding: '36px 44px' }}>
          <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 12 }}>
            Adım {step+1} / 4
          </div>

          {step === 0 && (
            <>
              <h2 className="display" style={{ fontSize: 30, fontWeight: 500, lineHeight: 1.2, letterSpacing: '-0.025em', margin: 0, marginBottom: 8 }}>Hoş geldin!</h2>
              <p style={{ fontSize: 14, color: 'var(--fg-muted)', margin: 0, marginBottom: 28, lineHeight: 1.6 }}>Sana uygun deneyimi hazırlayabilmemiz için birkaç şey öğrenelim. Önce — nasıl başlamak istersin?</p>
              <div style={{ display: 'grid', gap: 10 }}>
                {[
                  { k: 'listener', t: 'Dinleyici olarak', d: 'Keşfet, playlist yap, sanatçıları destekle', i: '🎧' },
                  { k: 'producer', t: 'Sanatçı / üretici olarak', d: 'Parça yükle, model dene, gelir kazan', i: '🎹' },
                  { k: 'b2b', t: 'Kurumsal (B2B)', d: 'Reklam, yayın, oyun için toplu lisans', i: '💼' },
                ].map(r => (
                  <button key={r.k} onClick={() => setRole(r.k)} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 18, background: role === r.k ? 'var(--accent-soft)' : 'var(--bg-elev-2)', border: `2px solid ${role === r.k ? 'var(--accent)' : 'transparent'}`, borderRadius: 'var(--radius-md)', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s' }}>
                    <div style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--bg-elev)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>{r.i}</div>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 2 }}>{r.t}</div>
                      <div style={{ fontSize: 12, color: 'var(--fg-muted)' }}>{r.d}</div>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <h2 className="display" style={{ fontSize: 30, fontWeight: 500, lineHeight: 1.2, letterSpacing: '-0.025em', margin: 0, marginBottom: 8 }}>Ne seversin?</h2>
              <p style={{ fontSize: 14, color: 'var(--fg-muted)', margin: 0, marginBottom: 28, lineHeight: 1.6 }}>En az 3 seçim yap — keşif akışını buna göre kuracağız.</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {['Folk Fusion', 'Trap & Türkü', 'Lo-fi', 'Cinematic', 'Elektronik', 'Klasik', 'Anadolu Rock', 'Hip-hop', 'Ambient', 'Deneysel', 'Arabesk', 'Pop', 'Jazz', 'Zeybek', 'Psikedelik'].map(t => {
                  const active = interests.includes(t);
                  return (
                    <button key={t} onClick={() => setInterests(active ? interests.filter(x => x !== t) : [...interests, t])} style={{ padding: '10px 16px', background: active ? 'var(--accent)' : 'var(--bg-elev-2)', color: active ? 'var(--accent-fg)' : 'var(--fg)', border: `1px solid ${active ? 'var(--accent)' : 'var(--border)'}`, borderRadius: 20, fontSize: 13, fontWeight: active ? 600 : 500, cursor: 'pointer', transition: 'all 0.1s' }}>
                      {active && '✓ '}{t}
                    </button>
                  );
                })}
              </div>
              <div className="mono" style={{ fontSize: 11, color: 'var(--fg-muted)', marginTop: 16 }}>
                {interests.length} / 15 seçili {interests.length >= 3 ? '✓' : `· ${3-interests.length} daha seç`}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="display" style={{ fontSize: 30, fontWeight: 500, lineHeight: 1.2, letterSpacing: '-0.025em', margin: 0, marginBottom: 8 }}>Adın ve avatarın</h2>
              <p style={{ fontSize: 14, color: 'var(--fg-muted)', margin: 0, marginBottom: 28, lineHeight: 1.6 }}>Topluluk sayfalarında görüneceksin — sonra da değiştirebilirsin.</p>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Kullanıcı adı (örn: deniz_k)" style={{ width: '100%', padding: '14px 16px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', fontSize: 15, color: 'var(--fg)', marginBottom: 20, fontFamily: 'inherit' }} />
              <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Avatar seç</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 10 }}>
                {['🎹', '🎤', '🎧', '🎸', '🥁', '🎺', '🎻', '🪕', '🎷', '🪗', '🎚️', '🎛️'].map((emoji, i) => (
                  <button key={i} onClick={() => setAvatar(i)} style={{ aspectRatio: '1', background: avatar === i ? 'var(--accent-soft)' : 'var(--bg-elev-2)', border: `2px solid ${avatar === i ? 'var(--accent)' : 'transparent'}`, borderRadius: '50%', fontSize: 22, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {emoji}
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="display" style={{ fontSize: 30, fontWeight: 500, lineHeight: 1.2, letterSpacing: '-0.025em', margin: 0, marginBottom: 8 }}>Etik çerçeveyi onayla</h2>
              <p style={{ fontSize: 14, color: 'var(--fg-muted)', margin: 0, marginBottom: 24, lineHeight: 1.6 }}>YAZSAD platformunda 3 temel kural vardır — tüm kullanıcılar için.</p>
              <div style={{ display: 'grid', gap: 10, marginBottom: 24 }}>
                {[
                  '🤖  Her AI parçası şeffaf etiketlenir · kullanılan model gizlenmez',
                  '🎼  Mevcut sanatçı sesi / tarzı klonlanamaz · izin şarttır',
                  '💰  Gelir paylaşımı adildir · %85 sanatçı, %10 platform, %5 dernek',
                ].map((t, i) => (
                  <div key={i} style={{ padding: 14, background: 'var(--bg-elev-2)', borderRadius: 'var(--radius-sm)', fontSize: 13, lineHeight: 1.5 }}>{t}</div>
                ))}
              </div>
              <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, cursor: 'pointer', padding: 14, background: 'var(--accent-soft)', border: '1px solid var(--accent)', borderRadius: 'var(--radius-sm)' }}>
                <input type="checkbox" defaultChecked style={{ accentColor: 'var(--accent)', width: 16, height: 16 }} />
                <span><strong>Etik çerçeveyi okudum ve kabul ediyorum</strong></span>
              </label>
            </>
          )}

          {/* Actions */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32, gap: 10 }}>
            <button onClick={step === 0 ? finish : back} className="btn btn-ghost" style={{ fontSize: 12 }}>
              {step === 0 ? 'Şimdilik geç →' : '← Geri'}
            </button>
            {step < 3 ? (
              <button onClick={next} disabled={!canNext} className="btn btn-primary" style={{ opacity: canNext ? 1 : 0.4, cursor: canNext ? 'pointer' : 'not-allowed' }}>
                Devam →
              </button>
            ) : (
              <button onClick={finish} className="btn btn-primary">Başla 🚀</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Theme presets (modern / retro mIRC / Anadolu folk)
const THEME_PRESETS = {
  modern: {
    name: 'Modern',
    vars: {}, // default
  },
  retro: {
    name: 'Retro Terminal',
    vars: {
      '--bg': '#0a0a0a',
      '--bg-elev': '#141414',
      '--bg-elev-2': '#1e1e1e',
      '--fg': '#e8e8e8',
      '--fg-muted': '#a0a0a0',
      '--border': '#2a2a2a',
      '--accent': '#00ff88',
      '--accent-fg': '#000',
      '--accent-soft': 'rgba(0,255,136,0.1)',
    },
  },
  folk: {
    name: 'Anadolu Folk',
    vars: {
      '--bg': '#fdf6ec',
      '--bg-elev': '#faefdd',
      '--bg-elev-2': '#f5e4c8',
      '--fg': '#2d1810',
      '--fg-muted': '#6b4c3a',
      '--border': '#d9c2a0',
      '--accent': '#c1440e',
      '--accent-fg': '#fff',
      '--accent-soft': 'rgba(193,68,14,0.12)',
    },
  },
};

const applyTheme = (key) => {
  const preset = THEME_PRESETS[key];
  if (!preset) return;
  const root = document.documentElement;
  // Reset first
  Object.keys(THEME_PRESETS.retro.vars).forEach(v => root.style.removeProperty(v));
  Object.keys(THEME_PRESETS.folk.vars).forEach(v => root.style.removeProperty(v));
  // Apply
  Object.entries(preset.vars).forEach(([k, v]) => root.style.setProperty(k, v));
  try { localStorage.setItem('yazsad_theme', key); } catch {}
};

// Tweaks panel
const TweaksPanel = ({ onClose }) => {
  const [theme, setTheme] = React.useState(() => {
    try { return localStorage.getItem('yazsad_theme') || 'modern'; } catch { return 'modern'; }
  });
  const [density, setDensity] = React.useState('comfortable');
  const [showAvatars, setShowAvatars] = React.useState(true);

  const set = (k, v) => {
    if (k === 'theme') { setTheme(v); applyTheme(v); }
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [k]: v } }, '*');
  };

  return (
    <div style={{ position: 'fixed', right: 20, top: 80, width: 320, background: 'var(--bg-elev)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', boxShadow: '0 12px 40px rgba(0,0,0,0.3)', zIndex: 95, overflow: 'hidden' }}>
      <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg-elev-2)' }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600 }}>Tweaks</div>
          <div className="mono" style={{ fontSize: 9, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Canlı tema + tercihler</div>
        </div>
        <button onClick={onClose} className="btn-icon"><IX size={14} /></button>
      </div>
      <div style={{ padding: 18, display: 'grid', gap: 18 }}>
        <div>
          <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Tema</div>
          <div style={{ display: 'grid', gap: 6 }}>
            {Object.entries(THEME_PRESETS).map(([k, p]) => (
              <button key={k} onClick={() => set('theme', k)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: theme === k ? 'var(--accent-soft)' : 'var(--bg-elev-2)', border: `1px solid ${theme === k ? 'var(--accent)' : 'var(--border)'}`, borderRadius: 'var(--radius-sm)', fontSize: 13, color: 'var(--fg)', textAlign: 'left', cursor: 'pointer' }}>
                <div style={{ display: 'flex', gap: 3 }}>
                  {['--bg', '--fg', '--accent'].map(v => {
                    const val = p.vars[v] || getComputedStyle(document.documentElement).getPropertyValue(v);
                    return <div key={v} style={{ width: 14, height: 14, borderRadius: 3, background: val, border: '1px solid rgba(0,0,0,0.15)' }} />;
                  })}
                </div>
                <span style={{ fontWeight: theme === k ? 600 : 500 }}>{p.name}</span>
                {theme === k && <span style={{ marginLeft: 'auto', color: 'var(--accent)' }}>✓</span>}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Yoğunluk</div>
          <div style={{ display: 'flex', gap: 6 }}>
            {[['compact', 'Sıkışık'], ['comfortable', 'Normal'], ['spacious', 'Ferah']].map(([k, l]) => (
              <button key={k} onClick={() => setDensity(k)} style={{ flex: 1, padding: '8px 10px', background: density === k ? 'var(--accent)' : 'var(--bg-elev-2)', color: density === k ? 'var(--accent-fg)' : 'var(--fg)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12, cursor: 'pointer' }}>{l}</button>
            ))}
          </div>
        </div>
        <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: 'var(--bg-elev-2)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontSize: 13 }}>
          <span>Sanatçı avatarları</span>
          <input type="checkbox" checked={showAvatars} onChange={() => setShowAvatars(!showAvatars)} style={{ accentColor: 'var(--accent)' }} />
        </label>
      </div>
    </div>
  );
};

Object.assign(window, { OnboardingWizard, TweaksPanel, applyTheme, THEME_PRESETS });
