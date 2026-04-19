// Prompt Marketplace + Remix Studio + AI Compliance Scanner + Model Explorer

// ==============================================================
// PROMPT MARKETPLACE
// ==============================================================
const PROMPT_ITEMS = [
  { id: 'p1', title: 'Anadolu synthwave · bağlama + Moog', author: 'Anatolian Lab', model: 'Suno v4.5', price: 45, uses: 182, rating: 4.8, tags: ['synthwave', 'folk', 'bağlama'], difficulty: 'Orta', length: '2:40-3:20', cover: { g1: '#e94e1b', g2: '#7c3aed', g3: '#0a0a1e' } },
  { id: 'p2', title: 'Lo-fi çalışma · yağmur sesli beat', author: 'Mert Canlar', model: 'Udio v2', price: 25, uses: 847, rating: 4.9, tags: ['lo-fi', 'ambient'], difficulty: 'Kolay', length: '3:00', cover: { g1: '#06b6d4', g2: '#ec4899', g3: '#0a0a1e' } },
  { id: 'p3', title: 'Türkü-trap hybrid · 808 + saz', author: 'Tuna Kavur', model: 'Suno v4.5', price: 60, uses: 94, rating: 4.6, tags: ['trap', 'türkü'], difficulty: 'İleri', length: '2:30', cover: { g1: '#c23b22', g2: '#1a1a1a', g3: '#fbbf24' } },
  { id: 'p4', title: 'Cinematic trailer · distopik', author: 'Nil Tekbaş', model: 'Stable Audio', price: 80, uses: 56, rating: 4.9, tags: ['orchestral', 'cinematic'], difficulty: 'İleri', length: '1:30', cover: { g1: '#4ade80', g2: '#fbbf24', g3: '#0a0a1e' } },
  { id: 'p5', title: 'Dream pop · retro yaz', author: 'Zehra Demir', model: 'Udio v2', price: 35, uses: 312, rating: 4.7, tags: ['dream-pop', 'retro'], difficulty: 'Orta', length: '3:30', cover: { g1: '#ec4899', g2: '#a78bfa', g3: '#0a0a1e' } },
  { id: 'p6', title: 'Hard techno · endüstriyel kick', author: 'Deniz Eldem', model: 'Suno v4.5', price: 50, uses: 421, rating: 4.8, tags: ['techno', 'industrial'], difficulty: 'Orta', length: '4:00', cover: { g1: '#8b2635', g2: '#d4a574', g3: '#0a0a1e' } },
  { id: 'p7', title: 'Klasik oda orkestrası · Debussy etkisi', author: 'Selen Atik', model: 'Riffusion', price: 95, uses: 28, rating: 5.0, tags: ['classical', 'impressionist'], difficulty: 'İleri', length: '4:30', cover: { g1: '#fbbf24', g2: '#e94e1b', g3: '#1a1a1a' } },
  { id: 'p8', title: 'Post-rock build-up · uzun crescendo', author: 'Berk Söyleyen', model: 'Suno v4.5', price: 40, uses: 156, rating: 4.6, tags: ['post-rock', 'instrumental'], difficulty: 'Orta', length: '5:00', cover: { g1: '#0066cc', g2: '#e94e1b', g3: '#0a0a1e' } },
];

const PromptMarketPage = ({ setRoute }) => {
  const [model, setModel] = React.useState('Hepsi');
  const [difficulty, setDifficulty] = React.useState('Hepsi');
  const [sort, setSort] = React.useState('popular');
  const [selected, setSelected] = React.useState(null);

  const models = ['Hepsi', 'Suno v4.5', 'Udio v2', 'Stable Audio', 'Riffusion'];
  const diffs = ['Hepsi', 'Kolay', 'Orta', 'İleri'];

  let items = [...PROMPT_ITEMS];
  if (model !== 'Hepsi') items = items.filter(x => x.model === model);
  if (difficulty !== 'Hepsi') items = items.filter(x => x.difficulty === difficulty);
  if (sort === 'popular') items.sort((a, b) => b.uses - a.uses);
  else if (sort === 'rating') items.sort((a, b) => b.rating - a.rating);
  else if (sort === 'price-low') items.sort((a, b) => a.price - b.price);
  else if (sort === 'price-high') items.sort((a, b) => b.price - a.price);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Modül · Prompt Pazarı</div>
          <h1 className="page-title">Prompt Market</h1>
          <p className="page-subtitle">
            Doğrulanmış prompt & preset paketleri. Her paket orijinal sanatçıyla gelir paylaşımlı; AI modeli ve çıktı örnekleriyle birlikte satılır.
          </p>
        </div>
        <button className="btn btn-primary">+ Prompt Sat</button>
      </div>

      {/* Info banner */}
      <div style={{ padding: 16, background: 'var(--accent-soft)', border: '1px solid var(--accent)', borderRadius: 'var(--radius-md)', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--accent)', color: 'var(--accent-fg)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <ICheck size={16} />
        </div>
        <div style={{ fontSize: 13, color: 'var(--fg)', lineHeight: 1.5 }}>
          <strong>Doğrulanmış promptlar:</strong> Satılan her prompt, YAZSAD etik ekibi tarafından beyan, model imzası ve örnek çıktı testinden geçer. Hak sahipliği satın alan + orijinal yazarla paylaşılır.
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap', alignItems: 'center' }}>
        <div className="chip-row">
          <span className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', padding: '0 6px', alignSelf: 'center' }}>MODEL</span>
          {models.map(m => (
            <button key={m} className={`chip ${model === m ? 'active' : ''}`} onClick={() => setModel(m)}>{m}</button>
          ))}
        </div>
        <div className="chip-row" style={{ marginLeft: 8 }}>
          <span className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', padding: '0 6px', alignSelf: 'center' }}>ZORLUK</span>
          {diffs.map(d => (
            <button key={d} className={`chip ${difficulty === d ? 'active' : ''}`} onClick={() => setDifficulty(d)}>{d}</button>
          ))}
        </div>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="input" style={{ width: 180, marginLeft: 'auto' }}>
          <option value="popular">En popüler</option>
          <option value="rating">En yüksek puan</option>
          <option value="price-low">Fiyat ↑</option>
          <option value="price-high">Fiyat ↓</option>
        </select>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
        {items.map(p => (
          <div key={p.id} onClick={() => setSelected(p)} style={{ background: 'var(--bg-elev)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.15s, border-color 0.15s' }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <div style={{ aspectRatio: '16/9', position: 'relative' }}>
              <GenArt {...p.cover} seed={parseInt(p.id.replace('p','')) * 17} />
              <div style={{ position: 'absolute', top: 10, left: 10, padding: '3px 8px', background: 'rgba(0,0,0,0.6)', borderRadius: 10, fontSize: 10, color: 'white', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', backdropFilter: 'blur(6px)' }}>{p.model}</div>
              <div style={{ position: 'absolute', bottom: 10, right: 10, padding: '4px 10px', background: 'rgba(0,0,0,0.75)', borderRadius: 10, fontSize: 11, color: 'white', fontFamily: 'var(--font-mono)', backdropFilter: 'blur(6px)' }}>▶ Örnek dinle</div>
            </div>
            <div style={{ padding: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, textWrap: 'pretty', lineHeight: 1.3 }}>{p.title}</div>
              <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', marginBottom: 10 }}>{p.author} · {p.uses} kullanım · ⭐ {p.rating}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 12 }}>
                {p.tags.map(t => <span key={t} style={{ fontSize: 10, padding: '2px 7px', background: 'var(--bg-elev-2)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--fg-muted)' }}>#{t}</span>)}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div className="display" style={{ fontSize: 20, fontWeight: 600 }}>₺{p.price}</div>
                <div style={{ fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{p.difficulty}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selected && <PromptDetailModal p={selected} onClose={() => setSelected(null)} />}
    </div>
  );
};

const PromptDetailModal = ({ p, onClose }) => (
  <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: 20 }}>
    <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: 720, maxHeight: '85vh', background: 'var(--bg)', borderRadius: 'var(--radius-lg)', overflow: 'auto', border: '1px solid var(--border)' }}>
      <div style={{ aspectRatio: '16/7', position: 'relative' }}>
        <GenArt {...p.cover} seed={parseInt(p.id.replace('p','')) * 17} />
        <button onClick={onClose} style={{ position: 'absolute', top: 14, right: 14, width: 32, height: 32, borderRadius: '50%', background: 'rgba(0,0,0,0.6)', color: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(6px)' }}>
          <IX size={14} />
        </button>
      </div>
      <div style={{ padding: 28 }}>
        <div className="mono" style={{ fontSize: 10, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 6 }}>{p.model} · {p.difficulty}</div>
        <h2 className="display" style={{ fontSize: 28, fontWeight: 500, marginBottom: 8, letterSpacing: '-0.02em' }}>{p.title}</h2>
        <div style={{ fontSize: 13, color: 'var(--fg-muted)', marginBottom: 20 }}>{p.author} · {p.uses} kullanım · ⭐ {p.rating} ({Math.floor(p.uses / 4)} değerlendirme)</div>

        <div style={{ padding: 16, background: 'var(--bg-elev)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', marginBottom: 20, fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 1.7, color: 'var(--fg)' }}>
          <div className="mono" style={{ fontSize: 9, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8 }}>Prompt önizleme · kilitli</div>
          <div style={{ filter: 'blur(3px)', userSelect: 'none' }}>
            [Style: {p.tags.join(', ')}]<br/>
            Tempo: 92 BPM, Key: A minor<br/>
            Instruments: bağlama, electric bass, analog synth lead, slow tempo kick, reverb vocals<br/>
            Mood: nostalgic, expansive, cinematic...
          </div>
          <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border)', fontSize: 11, color: 'var(--accent)' }}>
            Satın al → tam prompt + 3 varyasyon + kullanım kılavuzu
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 20 }}>
          {[
            ['Çıktı süresi', p.length],
            ['Kullanım', p.uses],
            ['Zorluk', p.difficulty],
            ['Puan', `⭐ ${p.rating}`],
          ].map(([l, v]) => (
            <div key={l} style={{ padding: 10, background: 'var(--bg-elev)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
              <div className="mono" style={{ fontSize: 9, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{l}</div>
              <div style={{ fontSize: 13, fontWeight: 600, marginTop: 4 }}>{v}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', paddingTop: 16, borderTop: '1px solid var(--border)' }}>
          <div>
            <div className="display" style={{ fontSize: 28, fontWeight: 600 }}>₺{p.price}</div>
            <div style={{ fontSize: 11, color: 'var(--fg-muted)', fontFamily: 'var(--font-mono)' }}>Üye: ₺{Math.round(p.price * 0.85)} (%15 indirim)</div>
          </div>
          <div style={{ flex: 1 }} />
          <button className="btn btn-ghost">Örnek Dinle</button>
          <button className="btn btn-primary">Satın Al & İndir</button>
        </div>
      </div>
    </div>
  </div>
);

// ==============================================================
// REMIX / STEM STUDIO
// ==============================================================
const RemixPage = ({ onPlay }) => {
  const [selectedTrack, setSelectedTrack] = React.useState(TRACKS[0]);
  const [stems, setStems] = React.useState({
    vocals: { vol: 85, muted: false, solo: false },
    drums: { vol: 90, muted: false, solo: false },
    bass: { vol: 75, muted: false, solo: false },
    melody: { vol: 80, muted: false, solo: false },
    fx: { vol: 60, muted: false, solo: false },
  });
  const [remixPrompt, setRemixPrompt] = React.useState('');

  const stemList = [
    { id: 'vocals', label: 'Vokal', color: '#e94e1b', icon: '🎤' },
    { id: 'drums', label: 'Davul', color: '#06b6d4', icon: '🥁' },
    { id: 'bass', label: 'Bas', color: '#7c3aed', icon: '🎸' },
    { id: 'melody', label: 'Melodi', color: '#4ade80', icon: '🎹' },
    { id: 'fx', label: 'Efekt', color: '#fbbf24', icon: '✨' },
  ];

  const updateStem = (id, changes) => setStems(s => ({ ...s, [id]: { ...s[id], ...changes } }));

  return (
    <div className="page" style={{ maxWidth: 1200 }}>
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Modül · Stem Ayrıştırma + Remix</div>
          <h1 className="page-title">Remix Studio</h1>
          <p className="page-subtitle">
            Lisanslı parçaları AI ile ayrıştır; stem'leri karıştır, yeni remix oluştur. Orijinal sanatçı otomatik olarak kredilendirilir, gelir paylaşımı (%60 remix / %40 orijinal).
          </p>
        </div>
      </div>

      {/* Track picker */}
      <div className="panel" style={{ padding: 20, marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 80, height: 80, borderRadius: 'var(--radius-md)', overflow: 'hidden', flexShrink: 0 }}>
            <GenArt {...selectedTrack} seed={parseInt(selectedTrack.id.replace('t',''))} />
          </div>
          <div style={{ flex: 1 }}>
            <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Şu anki kaynak parça</div>
            <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 2 }}>{selectedTrack.title}</div>
            <div style={{ fontSize: 13, color: 'var(--fg-muted)' }}>{selectedTrack.artist} · {selectedTrack.genre} · {selectedTrack.bpm || 120} BPM · {selectedTrack.key || 'A min'}</div>
          </div>
          <div className="pill success" style={{ fontSize: 11 }}>✓ Remix için lisanslı</div>
          <button className="btn btn-ghost" onClick={() => {
            const next = TRACKS[(TRACKS.indexOf(selectedTrack) + 1) % TRACKS.length];
            setSelectedTrack(next);
          }}>Parça Değiştir →</button>
        </div>
      </div>

      {/* Stem mixer */}
      <div className="panel" style={{ padding: 24, marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div>
            <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Stem Ayrıştırma</div>
            <div style={{ fontSize: 16, fontWeight: 600 }}>5 kanal · AI ile otomatik ayrıştırıldı</div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-ghost" style={{ fontSize: 12 }}>
              <IPlay size={12} style={{ marginRight: 6 }} /> Önizleme
            </button>
            <button className="btn btn-ghost" style={{ fontSize: 12 }}>Sıfırla</button>
          </div>
        </div>

        <div style={{ display: 'grid', gap: 12 }}>
          {stemList.map(s => {
            const state = stems[s.id];
            return (
              <div key={s.id} style={{ display: 'grid', gridTemplateColumns: '160px 1fr auto auto', gap: 16, alignItems: 'center', padding: '10px 12px', background: 'var(--bg-elev-2)', borderRadius: 'var(--radius-md)', opacity: state.muted ? 0.4 : 1, border: state.solo ? `1px solid ${s.color}` : '1px solid transparent' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>{s.icon}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{s.label}</div>
                    <div className="mono" style={{ fontSize: 9, color: 'var(--fg-muted)', textTransform: 'uppercase' }}>{state.vol}%</div>
                  </div>
                </div>
                {/* Waveform */}
                <div style={{ height: 28, display: 'flex', alignItems: 'center', gap: 2 }}>
                  {Array.from({length: 60}).map((_, i) => {
                    const h = 10 + Math.abs(Math.sin(i * 0.3 + parseInt(s.id.charCodeAt(0)))) * 18 * (state.vol / 100);
                    return <div key={i} style={{ width: 3, height: h, background: s.color, opacity: state.muted ? 0.2 : 0.7, borderRadius: 1 }} />;
                  })}
                </div>
                <input
                  type="range" min="0" max="100" value={state.vol}
                  onChange={(e) => updateStem(s.id, { vol: parseInt(e.target.value) })}
                  style={{ width: 120, accentColor: s.color }}
                />
                <div style={{ display: 'flex', gap: 4 }}>
                  <button
                    onClick={() => updateStem(s.id, { muted: !state.muted })}
                    style={{ width: 28, height: 28, borderRadius: 6, border: '1px solid var(--border)', background: state.muted ? 'var(--danger)' : 'var(--bg)', color: state.muted ? 'white' : 'var(--fg-muted)', fontSize: 10, fontWeight: 600, cursor: 'pointer' }}
                  >M</button>
                  <button
                    onClick={() => updateStem(s.id, { solo: !state.solo })}
                    style={{ width: 28, height: 28, borderRadius: 6, border: '1px solid var(--border)', background: state.solo ? s.color : 'var(--bg)', color: state.solo ? 'white' : 'var(--fg-muted)', fontSize: 10, fontWeight: 600, cursor: 'pointer' }}
                  >S</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Remix prompt */}
      <div className="panel" style={{ padding: 24, marginBottom: 20, background: 'linear-gradient(135deg, var(--bg-elev), var(--accent-soft))' }}>
        <div className="mono" style={{ fontSize: 10, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8 }}>AI Remix · Beta</div>
        <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Yön ver, AI yeniden yorumlasın</h3>
        <p style={{ fontSize: 13, color: 'var(--fg-muted)', marginBottom: 16, maxWidth: 620, lineHeight: 1.6 }}>
          Stem'leri alıp yeni bir yönde remikslesin: tempo, tür, enstrüman değişikliği. Orijinal sanatçı gelir paylaşımında. Çıktı 30-60 saniye içinde hazır.
        </p>
        <textarea
          value={remixPrompt}
          onChange={(e) => setRemixPrompt(e.target.value)}
          placeholder="Örn: Vokali tut, davulu half-time yap, bas kısmına 808 ekle, melodi yerine oud kullan..."
          className="input"
          style={{ width: '100%', minHeight: 80, fontFamily: 'var(--font-mono)', fontSize: 13, marginBottom: 12 }}
        />
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
          {['Tempoyu yarıla', 'Folk enstrümanları ekle', 'Orchestral versiyon', 'Trap beat ekle', 'Ambient yap'].map(p => (
            <button key={p} onClick={() => setRemixPrompt(remixPrompt ? `${remixPrompt}, ${p.toLowerCase()}` : p)} style={{ padding: '6px 12px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 14, fontSize: 11, cursor: 'pointer', color: 'var(--fg-muted)' }}>+ {p}</button>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button className="btn btn-primary" disabled={!remixPrompt} style={{ padding: '10px 20px' }}>
            🎛️ Remix Oluştur (ücretsiz · 3/gün)
          </button>
          <div style={{ fontSize: 11, color: 'var(--fg-muted)' }}>Beğendiğin çıktıyı yayınlamak ücretsiz. Satışta gelir paylaşımı otomatik.</div>
        </div>
      </div>

      {/* License split */}
      <div className="panel" style={{ padding: 20 }}>
        <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Gelir Paylaşım Önizleme</div>
        <div style={{ display: 'flex', gap: 4, height: 32, borderRadius: 'var(--radius-sm)', overflow: 'hidden', marginBottom: 12 }}>
          <div style={{ flex: 60, background: 'var(--accent)', color: 'var(--accent-fg)', display: 'flex', alignItems: 'center', padding: '0 12px', fontSize: 11, fontWeight: 600 }}>Sen (remixer) · 60%</div>
          <div style={{ flex: 40, background: '#06b6d4', color: 'white', display: 'flex', alignItems: 'center', padding: '0 12px', fontSize: 11, fontWeight: 600 }}>{selectedTrack.artist} (orijinal) · 40%</div>
        </div>
        <div style={{ fontSize: 12, color: 'var(--fg-muted)', lineHeight: 1.5 }}>
          Her ₺100 satışta sen ₺51, orijinal sanatçı ₺34 alır. %10 platform, %5 dernek. Otomatik ödeme her pazartesi.
        </div>
      </div>
    </div>
  );
};

// ==============================================================
// AI COMPLIANCE SCANNER
// ==============================================================
const ComplianceScanPage = () => {
  const [step, setStep] = React.useState('idle'); // idle | scanning | done
  const [progress, setProgress] = React.useState(0);

  const startScan = () => {
    setStep('scanning');
    setProgress(0);
    const i = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(i); setStep('done'); return 100; }
        return p + 2;
      });
    }, 40);
  };

  return (
    <div className="page" style={{ maxWidth: 900 }}>
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Modül · AI Uyumluluk</div>
          <h1 className="page-title">AI Compliance Scanner</h1>
          <p className="page-subtitle">
            Yüklediğin her parça yayına çıkmadan önce 4 kontrol: intihal tespiti, model imzası doğrulama, eğitim verisi taraması, etik beyan eşleştirme.
          </p>
        </div>
      </div>

      {step === 'idle' && (
        <div>
          <div className="panel" style={{ padding: 48, textAlign: 'center', borderStyle: 'dashed', marginBottom: 24 }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--accent-soft)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
              <IUpload size={32} style={{ color: 'var(--accent)' }} />
            </div>
            <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Kontrol için parça yükle</div>
            <div style={{ fontSize: 13, color: 'var(--fg-muted)', marginBottom: 20, maxWidth: 440, margin: '0 auto 20px' }}>
              MP3 / WAV / FLAC · Max 50MB · Yayın öncesi zorunlu olarak çalışır; her sanatçı sınırsız tarama yapabilir.
            </div>
            <button className="btn btn-primary" onClick={startScan}>Demo Tara Başlat</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {[
              { t: 'İntihal', d: 'Katalog + Suno/Udio public archive ile karşılaştırma', time: '8-12 sn' },
              { t: 'Model İmzası', d: 'AI çıktı parmak izini tespit, modeli tanımla', time: '3-5 sn' },
              { t: 'Eğitim Verisi', d: 'Telifli eserlerden türetilme olasılığı analizi', time: '15-20 sn' },
              { t: 'Etik Beyan', d: 'Beyan edilen içerikle eser tutarlılığı', time: '2 sn' },
            ].map(c => (
              <div key={c.t} style={{ padding: 16, background: 'var(--bg-elev)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{c.t}</div>
                <div style={{ fontSize: 11, color: 'var(--fg-muted)', lineHeight: 1.5, marginBottom: 8, textWrap: 'pretty' }}>{c.d}</div>
                <div className="mono" style={{ fontSize: 10, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>⏱ {c.time}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {step === 'scanning' && (
        <div className="panel" style={{ padding: 40 }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{ display: 'inline-flex', width: 120, height: 120, borderRadius: '50%', background: 'var(--accent-soft)', alignItems: 'center', justifyContent: 'center', marginBottom: 20, position: 'relative' }}>
              <svg width="120" height="120" style={{ position: 'absolute' }}>
                <circle cx="60" cy="60" r="52" fill="none" stroke="var(--border)" strokeWidth="4" />
                <circle cx="60" cy="60" r="52" fill="none" stroke="var(--accent)" strokeWidth="4" strokeLinecap="round" strokeDasharray={`${(progress / 100) * 326.7} 326.7`} transform="rotate(-90 60 60)" />
              </svg>
              <div className="display" style={{ fontSize: 28, fontWeight: 600, color: 'var(--accent)' }}>{progress}%</div>
            </div>
            <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>Taranıyor...</div>
            <div style={{ fontSize: 12, color: 'var(--fg-muted)' }}>4 kontrol eşzamanlı yapılıyor</div>
          </div>

          <div style={{ display: 'grid', gap: 10 }}>
            {[
              { t: 'İntihal tespiti', status: progress > 30 ? 'done' : 'active', score: '0.04' },
              { t: 'Model imzası', status: progress > 50 ? 'done' : progress > 20 ? 'active' : 'wait', score: 'Suno v4.5 · %98' },
              { t: 'Eğitim verisi analizi', status: progress > 85 ? 'done' : progress > 40 ? 'active' : 'wait', score: 'Düşük risk' },
              { t: 'Etik beyan kontrolü', status: progress >= 100 ? 'done' : progress > 90 ? 'active' : 'wait', score: 'Tutarlı' },
            ].map((c, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '24px 1fr auto', gap: 14, alignItems: 'center', padding: '12px 16px', background: c.status === 'done' ? 'var(--success-soft, rgba(34,197,94,0.08))' : c.status === 'active' ? 'var(--accent-soft)' : 'var(--bg-elev)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: c.status === 'done' ? 'var(--success)' : c.status === 'active' ? 'var(--accent)' : 'var(--bg-elev-2)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>
                  {c.status === 'done' ? '✓' : c.status === 'active' ? '●' : '·'}
                </div>
                <div style={{ fontSize: 13, fontWeight: c.status === 'active' ? 600 : 500 }}>{c.t}</div>
                <div className="mono" style={{ fontSize: 11, color: c.status === 'done' ? 'var(--success)' : 'var(--fg-muted)' }}>{c.status === 'done' ? c.score : c.status === 'active' ? 'çalışıyor...' : 'bekliyor'}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {step === 'done' && (
        <div>
          <div style={{ padding: 32, background: 'linear-gradient(135deg, rgba(34,197,94,0.15), var(--bg-elev))', border: '1px solid var(--success)', borderRadius: 'var(--radius-lg)', marginBottom: 20, textAlign: 'center' }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--success)', color: 'white', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16, fontSize: 32 }}>✓</div>
            <h2 className="display" style={{ fontSize: 28, fontWeight: 500, marginBottom: 6, letterSpacing: '-0.02em' }}>Uyumluluk Onayı</h2>
            <p style={{ fontSize: 13, color: 'var(--fg-muted)', maxWidth: 480, margin: '0 auto' }}>
              4 kontrol başarıyla geçildi. Parça yayına hazır. Sertifika numarası ile her zaman doğrulanabilir.
            </p>
            <div className="mono" style={{ fontSize: 11, color: 'var(--accent)', marginTop: 12, padding: '6px 12px', background: 'var(--bg)', borderRadius: 10, display: 'inline-block' }}>
              CERT: YZS-2026-A4B7-9F21-C3E8
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
            {[
              { t: 'İntihal', score: '0.04', max: '≤ 0.85', status: 'ok', detail: 'Hiçbir parça ile anlamlı benzerlik bulunamadı' },
              { t: 'Model İmzası', score: 'Suno v4.5', max: '%98 güven', status: 'ok', detail: 'Tespit edilen model, beyan edilen modelle eşleşti' },
              { t: 'Eğitim Verisi', score: 'Düşük risk', max: 'telifli eser yok', status: 'ok', detail: 'Bilinen telifli kayıtlardan türetilme olasılığı düşük' },
              { t: 'Etik Beyan', score: 'Tutarlı', max: '%100', status: 'ok', detail: 'Beyan edilen prompt ve insan katkısı eserle tutarlı' },
            ].map((r, i) => (
              <div key={i} style={{ padding: 18, background: 'var(--bg-elev)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{r.t}</div>
                  <div style={{ color: 'var(--success)' }}>✓</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 6 }}>
                  <div className="display" style={{ fontSize: 22, fontWeight: 600 }}>{r.score}</div>
                  <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)' }}>{r.max}</div>
                </div>
                <div style={{ fontSize: 11, color: 'var(--fg-muted)', lineHeight: 1.5, textWrap: 'pretty' }}>{r.detail}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-primary" style={{ flex: 1 }}>Parçayı Yayına Al</button>
            <button className="btn btn-ghost" onClick={() => { setStep('idle'); setProgress(0); }}>Yeni Tarama</button>
            <button className="btn btn-ghost">Rapor İndir (PDF)</button>
          </div>
        </div>
      )}
    </div>
  );
};

// ==============================================================
// MODEL EXPLORER
// ==============================================================
const ModelExplorerPage = ({ setRoute }) => {
  const models = [
    { name: 'Suno v4.5', tracks: 4821, share: 48, strength: 'Şarkı yapısı + vokal', weakness: 'Uzun kompozisyonlarda tutarlılık', price: '$10/ay', lang: 'TR + 40+', color: '#e94e1b' },
    { name: 'Udio v2', tracks: 2340, share: 23, strength: 'Enstrümantal + tekstür', weakness: 'TR vokal kalitesi', price: '$10/ay', lang: '30+', color: '#06b6d4' },
    { name: 'Stable Audio', tracks: 1120, share: 11, strength: 'Open-source + fine-tune', weakness: 'Ham çıktı, mastering gerekir', price: 'Ücretsiz', lang: 'Sınırlı', color: '#7c3aed' },
    { name: 'Riffusion', tracks: 945, share: 9, strength: 'Spektrogram kontrolü', weakness: 'Kısa parça (max 30 sn)', price: 'Ücretsiz', lang: 'Sınırlı', color: '#4ade80' },
    { name: 'Mubert', tracks: 580, share: 6, strength: 'API + jeneratif stream', weakness: 'Yaratıcı kontrol az', price: '$14/ay', lang: 'Sınırlı', color: '#fbbf24' },
    { name: 'Diğer', tracks: 340, share: 3, strength: '—', weakness: '—', price: '—', lang: '—', color: '#94a3b8' },
  ];

  return (
    <div className="page" style={{ maxWidth: 1100 }}>
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Model Karşılaştırma · YAZSAD Kataloğu</div>
          <h1 className="page-title">AI Modeli Keşfi</h1>
          <p className="page-subtitle">
            Katalogdaki 10,146 parça, hangi modelle üretildi? Güçlü-zayıf yanları, fiyatı, TR desteği. Her parça kartında model rozeti görünür.
          </p>
        </div>
      </div>

      {/* Share chart */}
      <div className="panel" style={{ padding: 24, marginBottom: 24 }}>
        <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>Platform payı · 10,146 parça</div>
        <div style={{ display: 'flex', height: 40, borderRadius: 'var(--radius-sm)', overflow: 'hidden', marginBottom: 16 }}>
          {models.map(m => (
            <div key={m.name} title={`${m.name} · ${m.share}%`} style={{ flex: m.share, background: m.color, display: 'flex', alignItems: 'center', padding: '0 10px', fontSize: 11, fontWeight: 600, color: m.share > 8 ? 'white' : 'transparent', minWidth: m.share > 3 ? 'auto' : 20 }}>
              {m.name.split(' ')[0]} · {m.share}%
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', fontSize: 11 }}>
          {models.map(m => (
            <span key={m.name} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: m.color }} />
              {m.name} · <span className="mono" style={{ color: 'var(--fg-muted)' }}>{m.tracks.toLocaleString()}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Comparison table */}
      <div className="panel" style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: 'var(--bg-elev-2)', borderBottom: '1px solid var(--border)' }}>
              {['Model', 'Katalogdaki parça', 'Güçlü yanı', 'Zayıf yanı', 'Fiyat', 'TR desteği', ''].map(h => (
                <th key={h} className="mono" style={{ padding: '14px 16px', textAlign: 'left', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--fg-muted)', fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {models.filter(m => m.name !== 'Diğer').map(m => (
              <tr key={m.name} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: m.color }} />
                    <div style={{ fontWeight: 600 }}>{m.name}</div>
                  </div>
                </td>
                <td style={{ padding: '16px' }}>
                  <div className="mono" style={{ fontWeight: 600 }}>{m.tracks.toLocaleString()}</div>
                  <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)' }}>%{m.share}</div>
                </td>
                <td style={{ padding: '16px', color: 'var(--fg-muted)', maxWidth: 200 }}>{m.strength}</td>
                <td style={{ padding: '16px', color: 'var(--fg-muted)', maxWidth: 200 }}>{m.weakness}</td>
                <td style={{ padding: '16px' }} className="mono">{m.price}</td>
                <td style={{ padding: '16px', color: m.lang.includes('TR') ? 'var(--accent)' : 'var(--fg-muted)' }}>{m.lang}</td>
                <td style={{ padding: '16px', textAlign: 'right' }}>
                  <button className="btn btn-ghost" style={{ fontSize: 11 }}>Parçalar →</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Note */}
      <div style={{ marginTop: 24, padding: 16, background: 'var(--bg-elev)', border: '1px dashed var(--border)', borderRadius: 'var(--radius-md)', fontSize: 12, color: 'var(--fg-muted)', lineHeight: 1.6 }}>
        <strong style={{ color: 'var(--fg)' }}>Notlar:</strong> Model bilgisi üye beyanı + AI Compliance Scanner model imzası ile doğrulanır. Eşleşmezse uyarı gösterilir ve düzeltme istenir.
      </div>
    </div>
  );
};

Object.assign(window, { PromptMarketPage, RemixPage, ComplianceScanPage, ModelExplorerPage });
