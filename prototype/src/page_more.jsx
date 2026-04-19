// Upload flow, contest, AI clips, profile, notifications

const UploadPage = ({ setRoute }) => {
  const auth = window.__yazsadAuth || { state: 'guest' };
  const [releaseType, setReleaseType] = React.useState(null);

  if (auth.state !== 'user') {
    return (
      <div className="page" style={{ maxWidth: 560, paddingTop: 80, textAlign: 'center' }}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--accent-soft)', color: 'var(--accent)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
          <IUpload size={24} />
        </div>
        <div className="display" style={{ fontSize: 32, marginBottom: 10 }}>Yayın yapmak için giriş yap</div>
        <div style={{ color: 'var(--fg-muted)', fontSize: 14, marginBottom: 24, lineHeight: 1.6 }}>
          Üretimini yayınlamak, lisanslamak ve dinleyiciye ulaştırmak için YAZSAD hesabına ihtiyacın var. Ücretsiz.
        </div>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
          <button className="btn btn-ghost" onClick={() => window.__yazsadOpenAuth && window.__yazsadOpenAuth('login')}>Giriş Yap</button>
          <button className="btn btn-primary" onClick={() => window.__yazsadOpenAuth && window.__yazsadOpenAuth('signup')}>Hesap Oluştur</button>
        </div>
      </div>
    );
  }

  if (releaseType === null) return <ReleaseTypeChooser onPick={setReleaseType} setRoute={setRoute} />;
  if (releaseType === 'album') return <AlbumUploadFlow setRoute={setRoute} onBack={() => setReleaseType(null)} />;
  return <SingleUploadFlow setRoute={setRoute} onBack={() => setReleaseType(null)} />;
};

// ============================================================================
// RELEASE TYPE CHOOSER — user picks single or album
// ============================================================================
const ReleaseTypeChooser = ({ onPick, setRoute }) => (
  <div className="page" style={{ maxWidth: 900 }}>
    <div className="page-header">
      <div>
        <div className="page-eyebrow">Sanatçı · Yeni Yayın</div>
        <h1 className="page-title">Ne yayınlıyorsun?</h1>
        <p className="page-subtitle">
          YAZSAD üzerinde tek parça da yayınlayabilirsin, çoklu parçalı bir albüm / EP de. İkisinin de aynı lisans + AI beyan süreçleri var.
        </p>
      </div>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      <div
        onClick={() => onPick('single')}
        style={{
          padding: 32, background: 'var(--bg-elev)', border: '2px solid var(--border)', borderRadius: 'var(--radius-lg)',
          cursor: 'pointer', transition: 'border-color 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
        onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
      >
        <div style={{ display: 'flex', gap: 2, marginBottom: 20 }}>
          <div style={{ width: 80, height: 80, borderRadius: 4, overflow: 'hidden' }}>
            <GenArt g1="#e94e1b" g2="#7c3aed" g3="#1a1a2e" seed={5} />
          </div>
        </div>
        <div className="mono" style={{ fontSize: 10, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 8 }}>Tekil Parça</div>
        <h3 className="display" style={{ fontSize: 26, fontWeight: 500, margin: '0 0 10px', letterSpacing: '-0.015em' }}>
          Single yayınla
        </h3>
        <p style={{ fontSize: 13, color: 'var(--fg-muted)', lineHeight: 1.6, margin: '0 0 16px', textWrap: 'pretty' }}>
          Tek parça — kapak, metadata, lisans, AI beyanı. 5 adımda yayına hazır. Ortalama <strong style={{ color: 'var(--fg)' }}>3 dakika</strong>.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12, color: 'var(--fg-muted)' }}>
          <div>✓ 1 ses dosyası (WAV / MP3)</div>
          <div>✓ Kapak görseli (veya otomatik üret)</div>
          <div>✓ Anında lisanslama</div>
        </div>
        <button className="btn btn-primary" style={{ width: '100%', marginTop: 24 }}>
          Tekil Parça Yükle →
        </button>
      </div>

      <div
        onClick={() => onPick('album')}
        style={{
          padding: 32, background: 'var(--bg-elev)', border: '2px solid var(--border)', borderRadius: 'var(--radius-lg)',
          cursor: 'pointer', transition: 'border-color 0.2s', position: 'relative',
        }}
        onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
        onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
      >
        <span className="mono" style={{
          position: 'absolute', top: 16, right: 16, fontSize: 9, padding: '3px 8px',
          background: 'var(--accent)', color: 'var(--accent-fg)', borderRadius: 10,
          textTransform: 'uppercase', letterSpacing: '0.1em',
        }}>
          Yeni
        </span>
        <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
          {[['#06b6d4', '#ec4899', 1], ['#4ade80', '#fbbf24', 2], ['#e94e1b', '#7c3aed', 3]].map(([g1, g2, s], i) => (
            <div key={i} style={{ width: 52, height: 80, borderRadius: 4, overflow: 'hidden', transform: `translateY(${i*3}px)` }}>
              <GenArt g1={g1} g2={g2} g3="#1a1a2e" seed={s*7} />
            </div>
          ))}
        </div>
        <div className="mono" style={{ fontSize: 10, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 8 }}>EP · Album · LP</div>
        <h3 className="display" style={{ fontSize: 26, fontWeight: 500, margin: '0 0 10px', letterSpacing: '-0.015em' }}>
          Albüm yayınla
        </h3>
        <p style={{ fontSize: 13, color: 'var(--fg-muted)', lineHeight: 1.6, margin: '0 0 16px', textWrap: 'pretty' }}>
          2 ila 20 parça — ortak kapak, blurb, tracklist, "destekle" fiyatlandırması. Ortalama <strong style={{ color: 'var(--fg)' }}>8 dakika</strong>.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12, color: 'var(--fg-muted)' }}>
          <div>✓ Çoklu ses dosyası, sıralanabilir</div>
          <div>✓ Albüm blurb'u + credits</div>
          <div>✓ "Minimum fiyat + fazla destek" modeli</div>
        </div>
        <button className="btn btn-primary" style={{ width: '100%', marginTop: 24 }}>
          Albüm Yükle →
        </button>
      </div>
    </div>

    <div style={{ marginTop: 32, padding: 16, background: 'var(--bg-elev)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', fontSize: 12, color: 'var(--fg-muted)', lineHeight: 1.6, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
      <span style={{ fontSize: 16 }}>ℹ</span>
      <span>
        Her iki akış da aynı <strong style={{ color: 'var(--fg)' }}>AI üretim beyanı</strong> ve <strong style={{ color: 'var(--fg)' }}>dernek onay süreci</strong>nden geçer. Onay süresi ortalama 24 saat. Geliri %85'ini doğrudan alırsın, %15'i derneğe kalır (altyapı + hukuk + etik denetim).
      </span>
    </div>
  </div>
);

// Extracted single upload flow
const SingleUploadFlow = ({ setRoute, onBack }) => {
  const [step, setStep] = React.useState(1);
  const [data, setData] = React.useState({ title: '', genre: 'Elektronik', mood: 'Melankoli', price: 49, license: 'Kişisel + Ticari', aiModel: 'Suno v4.5', prompt: '', declare: false });
  const steps = ['Dosya', 'Metadata', 'AI Beyanı', 'Lisans', 'Yayın'];

  return (
    <div className="page" style={{ maxWidth: 900 }}>
      <button className="btn btn-ghost" onClick={onBack} style={{ marginBottom: 16, fontSize: 12 }}>← Yayın tipini değiştir</button>
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Sanatçı · Tekil Parça · {step}/5</div>
          <h1 className="page-title">Parça Yükle</h1>
        </div>
      </div>

      {/* Stepper */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
        {steps.map((s, i) => (
          <div key={s} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: i + 1 <= step ? 'var(--accent)' : 'var(--bg-elev-2)', color: i + 1 <= step ? 'var(--accent-fg)' : 'var(--fg-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
              {i + 1 < step ? <ICheck size={14} /> : i + 1}
            </div>
            <div style={{ fontSize: 12, fontWeight: i + 1 === step ? 600 : 400, color: i + 1 === step ? 'var(--fg)' : 'var(--fg-muted)' }}>{s}</div>
            {i < steps.length - 1 && <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />}
          </div>
        ))}
      </div>

      <div className="panel" style={{ padding: 32 }}>
        {step === 1 && (
          <div>
            <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Ses dosyasını yükle</div>
            <p style={{ color: 'var(--fg-muted)', fontSize: 13, marginBottom: 20 }}>WAV tercih edilir (48kHz/24bit). Maksimum 80MB.</p>
            <div style={{ padding: 48, border: '2px dashed var(--border)', borderRadius: 'var(--radius-lg)', textAlign: 'center', background: 'var(--bg)' }}>
              <IUpload size={40} style={{ color: 'var(--fg-muted)', marginBottom: 16 }} />
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>Dosyayı sürükle bırak</div>
              <div style={{ fontSize: 12, color: 'var(--fg-muted)', marginBottom: 16 }}>veya</div>
              <button className="btn btn-primary">Dosya Seç</button>
            </div>
            <div style={{ marginTop: 20, padding: 16, background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
              <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Yüklenen</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <IMusic size={20} style={{ color: 'var(--accent)' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>lodos_master_v3.wav</div>
                  <div style={{ fontSize: 11, color: 'var(--fg-muted)' }}>48.2 MB · 4:55 · 48kHz/24bit</div>
                </div>
                <div style={{ width: 120, height: 3, background: 'var(--border)', borderRadius: 2 }}>
                  <div style={{ width: '100%', height: '100%', background: 'var(--success)', borderRadius: 2 }} />
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Başlık</div>
              <input className="input" value={data.title} onChange={e => setData({ ...data, title: e.target.value })} placeholder="Lodos" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Tür</div>
                <select className="select" value={data.genre} onChange={e => setData({ ...data, genre: e.target.value })} style={{ width: '100%' }}>
                  {GENRES.slice(1).map(g => <option key={g}>{g}</option>)}
                </select>
              </div>
              <div>
                <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Ruh Hâli</div>
                <select className="select" value={data.mood} onChange={e => setData({ ...data, mood: e.target.value })} style={{ width: '100%' }}>
                  {MOODS.slice(1).map(m => <option key={m}>{m}</option>)}
                </select>
              </div>
            </div>
            <div>
              <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Açıklama</div>
              <textarea className="input" rows="3" placeholder="Parça hakkında kısa not…" style={{ resize: 'vertical' }} />
            </div>
            <div>
              <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Kapak Görseli</div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{ width: 80, height: 80, borderRadius: 'var(--radius-md)', overflow: 'hidden', background: 'var(--bg-elev-2)' }}>
                  <GenArt g1="#06b6d4" g2="#fff" g3="#1a1a2e" seed={10} />
                </div>
                <div>
                  <button className="btn btn-ghost">Yükle</button>
                  <div style={{ fontSize: 11, color: 'var(--fg-muted)', marginTop: 6 }}>Yoksa otomatik üretelim</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>AI üretim beyanı</div>
            <p style={{ color: 'var(--fg-muted)', fontSize: 13, marginBottom: 20 }}>Dernek etik çerçevesi gereği, üretim sürecini belgeliyoruz.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Kullanılan model</div>
                <select className="select" style={{ width: '100%' }}>
                  <option>Suno v4.5</option><option>Udio v2</option><option>ElevenLabs Music</option><option>Stable Audio</option><option>Hibrit / Diğer</option>
                </select>
              </div>
              <div>
                <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Prompt</div>
                <textarea className="input" rows="3" defaultValue="ambient seascape, lodos wind, stormy mood, baglama drone, 4/4, reverb heavy" style={{ resize: 'vertical' }} />
              </div>
              <div>
                <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Post-processing</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {['Ableton Live', 'Izotope Ozone', 'Waves', 'Manuel mixing', 'El ile mastering'].map(p => (
                    <button key={p} className="chip active" style={{ fontSize: 11 }}>✓ {p}</button>
                  ))}
                </div>
              </div>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: 16, background: 'var(--accent-soft)', border: '1px solid var(--accent)', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}>
                <input type="checkbox" checked={data.declare} onChange={e => setData({ ...data, declare: e.target.checked })} style={{ marginTop: 2 }} />
                <div style={{ fontSize: 13, lineHeight: 1.5 }}>
                  Bu parçanın AI destekli üretildiğini, üçüncü taraf telifi içermediğini ve dernek etik kurallarına uyduğunu beyan ederim.
                </div>
              </label>
            </div>
          </div>
        )}

        {step === 4 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>Lisans & Fiyat</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
              {[
                { id: 'Kişisel', p: 29, d: 'Yalnızca kişisel projelerde' },
                { id: 'Kişisel + Ticari', p: 79, d: 'YouTube, Spotify, podcast' },
                { id: 'Tam Hak', p: 299, d: 'Sınırsız · Tekrar satış hakkı' },
              ].map(o => (
                <button key={o.id} className="tweak-opt" style={{ padding: 20, textAlign: 'left', borderColor: data.license === o.id ? 'var(--accent)' : 'var(--border)', background: data.license === o.id ? 'var(--accent-soft)' : 'var(--bg)', color: 'var(--fg)' }} onClick={() => setData({ ...data, license: o.id })}>
                  <div style={{ fontWeight: 700, marginBottom: 4 }}>{o.id}</div>
                  <div className="display" style={{ fontSize: 24, fontWeight: 600, marginBottom: 4 }}>₺{o.p}</div>
                  <div style={{ fontSize: 11, color: 'var(--fg-muted)' }}>{o.d}</div>
                </button>
              ))}
            </div>
            <div style={{ padding: 16, background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', fontSize: 12, color: 'var(--fg-muted)', lineHeight: 1.6 }}>
              Dernek komisyonu: <strong style={{ color: 'var(--fg)' }}>%15</strong>. Sen satıştan ~₺{Math.round(79 * 0.85)} alırsın (Kişisel+Ticari için). Ödeme 30 gün içinde banka hesabına aktarılır.
            </div>
          </div>
        )}

        {step === 5 && (
          <div>
            <div style={{ padding: 24, background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', display: 'flex', gap: 20, marginBottom: 20 }}>
              <div style={{ width: 120, height: 120, borderRadius: 'var(--radius-md)', overflow: 'hidden', flexShrink: 0 }}>
                <GenArt g1="#06b6d4" g2="#fff" g3="#1a1a2e" seed={10} />
              </div>
              <div style={{ flex: 1 }}>
                <span className="ai-tag">AI ile üretilmiş</span>
                <div className="display" style={{ fontSize: 28, fontWeight: 500, lineHeight: 1.1, marginTop: 10 }}>Lodos</div>
                <div style={{ fontSize: 14, color: 'var(--fg-muted)', marginBottom: 10 }}>Anatolian Lab · Ambient · Fırtınalı · 4:55</div>
                <div style={{ display: 'flex', gap: 16, fontSize: 12, color: 'var(--fg-muted)' }}>
                  <span>₺79 · Kişisel + Ticari</span>
                  <span>Suno v4.5</span>
                  <span>Onaya gönderildi</span>
                </div>
              </div>
            </div>
            <div style={{ padding: 16, background: 'var(--accent-soft)', border: '1px solid var(--accent)', borderRadius: 'var(--radius-md)', fontSize: 13, lineHeight: 1.5 }}>
              Parçan inceleme kuyruğuna eklendi. Onay süresi ortalama <strong>24 saat</strong>. Süreç sonunda bildirim alacaksın.
            </div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
          <button className="btn btn-ghost" disabled={step === 1} onClick={() => setStep(Math.max(1, step - 1))}>← Geri</button>
          {step < 5 ? (
            <button className="btn btn-primary" onClick={() => setStep(step + 1)}>İlerle →</button>
          ) : (
            <button className="btn btn-primary" onClick={() => setRoute('home')}>Onaya Gönder ✓</button>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// ALBUM UPLOAD FLOW
// ============================================================================
const AlbumUploadFlow = ({ setRoute, onBack }) => {
  const [step, setStep] = React.useState(1);
  const steps = ['Parçalar', 'Albüm Bilgisi', 'AI Beyanı', 'Fiyat', 'Önizle'];
  const [album, setAlbum] = React.useState({
    title: '', kind: 'EP', blurb: '', minPrice: 79, license: 'Kişisel + Ticari',
    aiModel: 'Suno v4.5', declare: false, credits: '',
  });
  const [tracks, setTracks] = React.useState([
    { id: 1, title: 'Parça 1', duration: '3:42', size: '38 MB', uploaded: true },
    { id: 2, title: 'Parça 2', duration: '4:18', size: '44 MB', uploaded: true },
    { id: 3, title: 'Parça 3', duration: '3:07', size: '32 MB', uploaded: true },
  ]);

  const updateTrack = (id, field, val) => setTracks(tracks.map(t => t.id === id ? { ...t, [field]: val } : t));
  const removeTrack = (id) => setTracks(tracks.filter(t => t.id !== id));
  const moveTrack = (id, dir) => {
    const idx = tracks.findIndex(t => t.id === id);
    if (idx === -1) return;
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= tracks.length) return;
    const next = [...tracks];
    [next[idx], next[newIdx]] = [next[newIdx], next[idx]];
    setTracks(next);
  };
  const addTrack = () => {
    const nextId = Math.max(0, ...tracks.map(t => t.id)) + 1;
    setTracks([...tracks, { id: nextId, title: `Parça ${nextId}`, duration: '0:00', size: '0 MB', uploaded: false }]);
  };

  const totalDuration = tracks.reduce((s, t) => {
    const [m, sec] = (t.duration || '0:00').split(':').map(Number);
    return s + (m || 0) * 60 + (sec || 0);
  }, 0);

  return (
    <div className="page" style={{ maxWidth: 900 }}>
      <button className="btn btn-ghost" onClick={onBack} style={{ marginBottom: 16, fontSize: 12 }}>← Yayın tipini değiştir</button>
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Sanatçı · {album.kind} · {step}/5</div>
          <h1 className="page-title">Albüm Yükle</h1>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
        {steps.map((s, i) => (
          <div key={s} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: i + 1 <= step ? 'var(--accent)' : 'var(--bg-elev-2)', color: i + 1 <= step ? 'var(--accent-fg)' : 'var(--fg-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
              {i + 1 < step ? <ICheck size={14} /> : i + 1}
            </div>
            <div style={{ fontSize: 12, fontWeight: i + 1 === step ? 600 : 400, color: i + 1 === step ? 'var(--fg)' : 'var(--fg-muted)' }}>{s}</div>
            {i < steps.length - 1 && <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />}
          </div>
        ))}
      </div>

      <div className="panel" style={{ padding: 32 }}>

        {/* STEP 1: TRACK LIST */}
        {step === 1 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>Parçaları yükle ve sırala</div>
                <p style={{ color: 'var(--fg-muted)', fontSize: 13, margin: 0 }}>Her parça WAV / MP3 olabilir. Sürükleyerek veya ok tuşlarıyla sırala.</p>
              </div>
              <div className="mono" style={{ fontSize: 11, color: 'var(--fg-muted)' }}>
                {tracks.length} parça · {Math.floor(totalDuration / 60)}:{String(totalDuration % 60).padStart(2,'0')}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
              {tracks.map((t, i) => (
                <div key={t.id} style={{ display: 'grid', gridTemplateColumns: '32px 1fr 90px 80px auto auto', gap: 12, alignItems: 'center', padding: 14, background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
                  <span className="mono" style={{ fontSize: 13, color: 'var(--fg-muted)', textAlign: 'center' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <input
                    className="input"
                    value={t.title}
                    onChange={e => updateTrack(t.id, 'title', e.target.value)}
                    style={{ fontSize: 14, fontWeight: 500, padding: '8px 10px' }}
                  />
                  <span className="mono" style={{ fontSize: 11, color: 'var(--fg-muted)', textAlign: 'right' }}>{t.duration}</span>
                  <span className="mono" style={{ fontSize: 10, color: t.uploaded ? 'var(--success)' : 'var(--fg-muted)' }}>
                    {t.uploaded ? '✓ ' + t.size : 'Bekliyor'}
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <button onClick={() => moveTrack(t.id, -1)} disabled={i === 0} className="btn-icon" style={{ width: 22, height: 18, fontSize: 9 }}>▲</button>
                    <button onClick={() => moveTrack(t.id, 1)} disabled={i === tracks.length - 1} className="btn-icon" style={{ width: 22, height: 18, fontSize: 9 }}>▼</button>
                  </div>
                  <button onClick={() => removeTrack(t.id)} className="btn-icon" style={{ width: 28, height: 28 }}><IX size={12} /></button>
                </div>
              ))}
            </div>

            <button
              onClick={addTrack}
              style={{
                width: '100%', padding: 20, border: '2px dashed var(--border)', borderRadius: 'var(--radius-md)',
                background: 'transparent', color: 'var(--fg-muted)', fontSize: 13, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              }}
            >
              <IUpload size={16} /> Parça Ekle (sürükle-bırak veya tıkla)
            </button>

            <div style={{ marginTop: 20, padding: 14, background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', fontSize: 12, color: 'var(--fg-muted)', lineHeight: 1.6 }}>
              💡 <strong style={{ color: 'var(--fg)' }}>Albüm tipi otomatik belirlenir:</strong> 1 parça → Single · 2-6 parça → EP · 7+ parça → Album
            </div>
          </div>
        )}

        {/* STEP 2: ALBUM METADATA */}
        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Albüm Başlığı</div>
              <input
                className="input"
                value={album.title}
                onChange={e => setAlbum({ ...album, title: e.target.value })}
                placeholder="örn. Boğaz"
                style={{ fontSize: 18, fontWeight: 500, padding: 14 }}
              />
            </div>

            <div>
              <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Tip</div>
              <div style={{ display: 'flex', gap: 8 }}>
                {['Single', 'EP', 'Album'].map(k => (
                  <button
                    key={k}
                    className={`chip ${album.kind === k ? 'active' : ''}`}
                    onClick={() => setAlbum({ ...album, kind: k })}
                    style={{ fontSize: 12 }}
                  >{k}</button>
                ))}
              </div>
            </div>

            <div>
              <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Albüm Blurb'u</div>
              <textarea
                className="input"
                value={album.blurb}
                onChange={e => setAlbum({ ...album, blurb: e.target.value })}
                rows="4"
                placeholder="Albümün hikâyesini 2-3 cümlede anlat. Dinleyici bunu albüm sayfasında görecek."
                style={{ resize: 'vertical', lineHeight: 1.6 }}
              />
            </div>

            <div>
              <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Albüm Kapak Görseli</div>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                <div style={{ width: 100, height: 100, borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                  <GenArt g1="#e94e1b" g2="#7c3aed" g3="#1a1a2e" seed={12} />
                </div>
                <div>
                  <button className="btn btn-ghost">Yükle</button>
                  <div style={{ fontSize: 11, color: 'var(--fg-muted)', marginTop: 6 }}>
                    PNG/JPG · 1400×1400+ önerilir. Yoksa otomatik üretelim.
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Credits (opsiyonel)</div>
              <textarea
                className="input"
                value={album.credits}
                onChange={e => setAlbum({ ...album, credits: e.target.value })}
                rows="3"
                placeholder="Üretim, mastering, kapak, AI modelleri — her satıra bir credit."
                style={{ resize: 'vertical', fontFamily: 'var(--font-mono)', fontSize: 12 }}
              />
            </div>
          </div>
        )}

        {/* STEP 3: AI declaration (same as single) */}
        {step === 3 && (
          <div>
            <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>AI üretim beyanı</div>
            <p style={{ color: 'var(--fg-muted)', fontSize: 13, marginBottom: 20 }}>Albümdeki tüm parçalar için geçerlidir.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Ana model</div>
                <select className="select" value={album.aiModel} onChange={e => setAlbum({ ...album, aiModel: e.target.value })} style={{ width: '100%' }}>
                  <option>Suno v4.5</option><option>Udio v2</option><option>ElevenLabs Music</option><option>Stable Audio</option><option>Hibrit / Parçadan parçaya değişir</option>
                </select>
              </div>
              <div>
                <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Genel Prompt / yaklaşım</div>
                <textarea className="input" rows="3" placeholder="Albümün genel prompt yaklaşımını özetle. Parça bazlı prompt'lar profil sayfanda detaylı görünecek." style={{ resize: 'vertical' }} />
              </div>
              <div>
                <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Post-processing</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {['Ableton Live', 'Izotope Ozone', 'Manuel mixing', 'El ile mastering'].map(p => (
                    <button key={p} className="chip active" style={{ fontSize: 11 }}>✓ {p}</button>
                  ))}
                </div>
              </div>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: 16, background: 'var(--accent-soft)', border: '1px solid var(--accent)', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}>
                <input type="checkbox" checked={album.declare} onChange={e => setAlbum({ ...album, declare: e.target.checked })} style={{ marginTop: 2 }} />
                <div style={{ fontSize: 13, lineHeight: 1.5 }}>
                  Bu albümdeki tüm parçaların AI destekli üretildiğini, üçüncü taraf telifi içermediğini ve dernek etik kurallarına uyduğunu beyan ederim.
                </div>
              </label>
            </div>
          </div>
        )}

        {/* STEP 4: pricing — support model */}
        {step === 4 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>Destekle modeli</div>
              <p style={{ color: 'var(--fg-muted)', fontSize: 13, margin: 0 }}>
                Dinleyici minimum fiyatı öder, ama <strong style={{ color: 'var(--fg)' }}>fazla da ödeyebilir</strong>. Bandcamp tarzı dayanışma modeli.
              </p>
            </div>

            <div>
              <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Minimum Albüm Fiyatı</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span className="mono" style={{ fontSize: 18 }}>₺</span>
                <input
                  type="number"
                  className="input"
                  value={album.minPrice}
                  onChange={e => setAlbum({ ...album, minPrice: parseInt(e.target.value) || 0 })}
                  style={{ fontFamily: 'var(--font-mono)', fontSize: 24, fontWeight: 600, padding: 12 }}
                />
                <span className="mono" style={{ fontSize: 12, color: 'var(--fg-muted)' }}>TRY</span>
              </div>
              <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
                {[49, 79, 99, 149, 'Ücretsiz'].map(p => (
                  <button
                    key={p}
                    className="chip"
                    style={{ fontSize: 11 }}
                    onClick={() => setAlbum({ ...album, minPrice: p === 'Ücretsiz' ? 0 : p })}
                  >{p === 'Ücretsiz' ? 'İsteğe bağlı' : `₺${p}`}</button>
                ))}
              </div>
            </div>

            <div>
              <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Lisans</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
                {['Kişisel', 'Kişisel + Ticari', 'Tam Hak'].map(l => (
                  <button
                    key={l}
                    onClick={() => setAlbum({ ...album, license: l })}
                    className="tweak-opt"
                    style={{
                      padding: 14, textAlign: 'center',
                      borderColor: album.license === l ? 'var(--accent)' : 'var(--border)',
                      background: album.license === l ? 'var(--accent-soft)' : 'var(--bg)',
                      color: 'var(--fg)',
                    }}
                  >
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{l}</div>
                  </button>
                ))}
              </div>
            </div>

            <div style={{ padding: 16, background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', fontSize: 13, lineHeight: 1.7 }}>
              <div style={{ color: 'var(--fg-muted)', marginBottom: 8 }}>Hesap özeti</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span>Minimum albüm fiyatı</span>
                <span className="mono" style={{ fontWeight: 600 }}>₺{album.minPrice}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span>Dernek payı (%15)</span>
                <span className="mono">−₺{Math.round(album.minPrice * 0.15)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 8, borderTop: '1px solid var(--border)', fontWeight: 700 }}>
                <span>Sana kalan (minimum satıştan)</span>
                <span className="mono" style={{ color: 'var(--success)' }}>₺{Math.round(album.minPrice * 0.85)}</span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Preview */}
        {step === 5 && (
          <div>
            <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 }}>
              Önizleme · Albüm sayfası böyle görünecek
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 24, padding: 24, background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ aspectRatio: '1', borderRadius: 2, overflow: 'hidden' }}>
                <GenArt g1="#e94e1b" g2="#7c3aed" g3="#1a1a2e" seed={12} />
              </div>
              <div>
                <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 6 }}>
                  {album.kind} · {tracks.length} parça
                </div>
                <div className="display" style={{ fontSize: 32, fontWeight: 500, lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: 6 }}>
                  {album.title || '(başlık yok)'}
                </div>
                <div style={{ fontSize: 14, color: 'var(--fg-muted)', marginBottom: 16 }}>
                  by <span style={{ color: 'var(--accent)' }}>{window.__yazsadAuth?.name || 'Sen'}</span>
                </div>
                <p style={{ fontSize: 13, color: 'var(--fg)', lineHeight: 1.6, margin: '0 0 16px' }}>
                  {album.blurb || '(blurb eklenmedi)'}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <button className="btn btn-primary">Destekle · ₺{album.minPrice}+</button>
                  <span className="mono" style={{ fontSize: 11, color: 'var(--fg-muted)' }}>{album.license}</span>
                </div>
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: 12 }}>
                  {tracks.map((t, i) => (
                    <div key={t.id} style={{ display: 'grid', gridTemplateColumns: '24px 1fr auto', gap: 10, padding: '6px 0', fontSize: 12 }}>
                      <span className="mono" style={{ color: 'var(--fg-muted)' }}>{String(i+1).padStart(2,'0')}</span>
                      <span>{t.title}</span>
                      <span className="mono" style={{ color: 'var(--fg-muted)' }}>{t.duration}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ marginTop: 20, padding: 16, background: 'var(--accent-soft)', border: '1px solid var(--accent)', borderRadius: 'var(--radius-md)', fontSize: 13, lineHeight: 1.55 }}>
              Albümün inceleme kuyruğuna eklendi. Onay süresi ortalama <strong>24 saat</strong>. Süreç sonunda bildirim alacaksın ve dinleyiciler destekleyebilir olacak.
            </div>
          </div>
        )}

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
          <button className="btn btn-ghost" disabled={step === 1} onClick={() => setStep(Math.max(1, step - 1))}>← Geri</button>
          {step < 5 ? (
            <button className="btn btn-primary" onClick={() => setStep(step + 1)}>İlerle →</button>
          ) : (
            <button className="btn btn-primary" onClick={() => { window.__yazsadToast && window.__yazsadToast('Albüm onaya gönderildi 🎵'); setRoute('profile'); }}>Onaya Gönder ✓</button>
          )}
        </div>
      </div>
    </div>
  );
};

const ContestPage = ({ onPlay }) => {
  const entries = TRACKS.slice(0, 9).map((t, i) => ({ ...t, votes: [847, 723, 612, 589, 512, 467, 423, 389, 312][i], rank: i + 1 }));
  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Nisan Yarışması · 142 eser</div>
          <h1 className="page-title">Topluluk Yarışması</h1>
          <p className="page-subtitle">Bu ayın teması: <strong style={{ color: 'var(--fg)' }}>"Şehir"</strong>. Oylama 28 Nisan'a kadar açık. İlk üç eser festivalde canlı icra edilecek.</p>
        </div>
        <button className="btn btn-primary"><IPlus size={14} />Eser Gönder</button>
      </div>

      {/* Timer */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 40, padding: 20, background: 'var(--bg-elev)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' }}>
        {[['09', 'GÜN'], ['14', 'SAAT'], ['32', 'DAKİKA'], ['47', 'SANİYE']].map(([v, l]) => (
          <div key={l} style={{ textAlign: 'center' }}>
            <div className="display" style={{ fontSize: 48, fontWeight: 500, lineHeight: 1, letterSpacing: '-0.03em' }}>{v}</div>
            <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 6 }}>{l}</div>
          </div>
        ))}
      </div>

      <h2 className="section-title" style={{ marginBottom: 16 }}>Sıralama</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {entries.map(e => (
          <div key={e.id} style={{ display: 'grid', gridTemplateColumns: '40px 48px 1fr auto auto', gap: 16, alignItems: 'center', padding: 14, background: e.rank <= 3 ? 'var(--accent-soft)' : 'var(--bg-elev)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
            <div className="display" style={{ fontSize: 24, fontWeight: 600, textAlign: 'center', color: e.rank <= 3 ? 'var(--accent)' : 'var(--fg-muted)' }}>{e.rank}</div>
            <div style={{ width: 48, height: 48, borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
              <GenArt {...e} seed={parseInt(e.id.replace('t',''))} />
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{e.title}</div>
              <div style={{ fontSize: 12, color: 'var(--fg-muted)' }}>{e.artist}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="mono" style={{ fontSize: 15, fontWeight: 700 }}>{e.votes}</div>
              <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>oy</div>
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              <button className="btn-icon" onClick={() => onPlay(e)}><IPlay size={14} /></button>
              <button className="btn btn-ghost" style={{ fontSize: 12 }}><IHeart size={12} />Oyla</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ClipsPage = ({ onPlay }) => {
  const [filter, setFilter] = React.useState('Tümü');
  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="page-eyebrow">AI Klipler · 324 video</div>
          <h1 className="page-title">Klipler</h1>
          <p className="page-subtitle">Parçalarımıza bağlı AI ile üretilmiş video içerikleri.</p>
        </div>
        <div className="chip-row">
          {['Tümü', 'Runway', 'Sora', 'Kling', 'Pika'].map(f => (
            <button key={f} className={`chip ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>{f}</button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
        {TRACKS.slice(0, 9).map((t, i) => (
          <div key={t.id} style={{ cursor: 'pointer' }} onClick={() => onPlay(t)}>
            <div style={{ aspectRatio: '9/16', borderRadius: 'var(--radius-md)', overflow: 'hidden', position: 'relative', marginBottom: 10 }}>
              <GenArt {...t} seed={parseInt(t.id.replace('t',''))*7} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.8))' }} />
              <div style={{ position: 'absolute', top: 12, left: 12 }}><span className="ai-tag">AI VIDEO</span></div>
              <div style={{ position: 'absolute', bottom: 12, left: 12, right: 12, color: 'white' }}>
                <div style={{ fontSize: 16, fontWeight: 600, textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>{t.title}</div>
                <div style={{ fontSize: 12, opacity: 0.85 }}>{t.artist} · {['Runway Gen-3', 'Sora', 'Kling 2.0', 'Pika 1.5'][i % 4]}</div>
              </div>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 60, height: 60, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(20px)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                <IPlay size={22} />
              </div>
            </div>
            <div style={{ fontSize: 12, color: 'var(--fg-muted)', display: 'flex', gap: 12 }}>
              <span>{[12400, 8200, 23100, 6300, 31500, 4100, 19800, 11600, 27400][i]} görüntüleme</span>
              <span>· {i * 2 + 1} gün önce</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProfilePage = ({ onPlay, currentTrack, q }) => {
  const auth = window.__yazsadAuth || { state: 'guest' };
  if (auth.state !== 'user') {
    return (
      <div className="page" style={{ paddingTop: 40 }}>
        <EmptyState
          icon={IUsers}
          title="Profil senin sahnen"
          desc="Hesap aç, sanatçı sayfanı oluştur — takipçilerinin seni bulacağı yer. Üretimini, geçmişini, lisanslarını sergileyebileceğin tek alan."
          action="Hesap Oluştur"
          onAction={() => window.__yazsadOpenAuth && window.__yazsadOpenAuth('signup')}
          secondary="Giriş Yap"
          onSecondary={() => window.__yazsadOpenAuth && window.__yazsadOpenAuth('login')}
          size="lg"
          tone="accent"
        />
      </div>
    );
  }

  const isNew = localStorage.getItem('yazsad-profile-setup') !== '1';
  const tracks = TRACKS.filter(t => t.artist === 'Anatolian Lab');
  return (
    <div className="page">
      <div style={{ aspectRatio: '4/1', borderRadius: 'var(--radius-lg)', overflow: 'hidden', position: 'relative', marginBottom: -60 }}>
        <GenArt g1="#e94e1b" g2="#7c3aed" g3="#0a0a1e" seed={88} />
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24, padding: '0 32px', marginBottom: 32, position: 'relative', zIndex: 1 }}>
        <div style={{ width: 140, height: 140, borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '4px solid var(--bg)', background: 'linear-gradient(135deg, #e94e1b, #7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'white' }}>{(auth.name || 'AL').split(' ').map(w=>w[0]).slice(0,2).join('')}</div>
        <div style={{ flex: 1, paddingBottom: 10 }}>
          <div className="mono" style={{ fontSize: 11, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>
            {auth.role === 'member' ? 'Sanatçı · Dernek Üyesi' : auth.role === 'artist' ? 'Sanatçı' : 'Dinleyici'}
          </div>
          <h1 className="display" style={{ fontSize: 56, fontWeight: 500, lineHeight: 1, letterSpacing: '-0.025em', margin: 0 }}>{auth.name || 'Anatolian Lab'}</h1>
          <div style={{ fontSize: 14, color: 'var(--fg-muted)', marginTop: 8 }}>İstanbul · Synthwave, Ambient · Şubat 2025'ten beri</div>
        </div>
        <div style={{ display: 'flex', gap: 8, paddingBottom: 10 }}>
          <button className="btn btn-ghost">Profili Düzenle</button>
          <button className="btn btn-primary" onClick={() => window.__yazsadGo && window.__yazsadGo('upload')}>+ Yeni Parça</button>
        </div>
      </div>

      {isNew && tracks.length === 0 && (
        <div style={{ margin: '0 32px 32px', padding: 24, background: 'var(--accent-soft)', border: '1px solid var(--accent)', borderRadius: 'var(--radius-lg)' }}>
          <div className="mono" style={{ fontSize: 10, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8 }}>Profil kurulumu · 1/4 tamam</div>
          <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Profilini tamamla</h2>
          <p style={{ fontSize: 13, color: 'var(--fg-muted)', marginBottom: 16, maxWidth: 640 }}>
            Dinleyiciler ve potansiyel lisans alıcıları için kendini tanıt. Her adım ayrı ayrı yapılabilir.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10 }}>
            {[
              { label: 'Hakkında yaz', done: false, icon: IEdit },
              { label: 'Kapak fotoğrafı', done: false, icon: IMusic },
              { label: 'İlk parçanı yükle', done: false, icon: IUpload, cta: () => window.__yazsadGo && window.__yazsadGo('upload') },
              { label: 'Sosyal linkler', done: false, icon: IArrow },
            ].map((step, i) => {
              const Ic = step.icon;
              return (
                <button key={i} onClick={step.cta} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', cursor: 'pointer', textAlign: 'left' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: step.done ? 'var(--success)' : 'var(--bg-elev-2)', color: step.done ? 'white' : 'var(--fg-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {step.done ? <ICheck size={14} /> : <Ic size={13} />}
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 500, flex: 1 }}>{step.label}</div>
                  <IArrow size={12} style={{ color: 'var(--fg-muted)' }} />
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, padding: '0 32px', marginBottom: 40 }}>
        {[['Parça', tracks.length || '0'], ['Takipçi', tracks.length ? '14.2K' : '0'], ['Dinlenme', tracks.length ? '487K' : '0'], ['Satış', tracks.length ? '₺12,847' : '₺0']].map(([l, v]) => (
          <div key={l} style={{ padding: 16, background: 'var(--bg-elev)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
            <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{l}</div>
            <div className="display" style={{ fontSize: 28, fontWeight: 500 }}>{v}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: '0 32px' }}>
        <div className="section-head">
          <h2 className="section-title">Parçaları</h2>
        </div>
        {tracks.length > 0 ? (
          <TrackGrid tracks={tracks} onPlay={onPlay} currentTrack={currentTrack} q={q} />
        ) : (
          <EmptyState
            icon={IUpload}
            title="İlk parçanı yükle"
            desc="Yüklenen ilk parça otomatik olarak katalog ve keşfet akışına düşer. Lisans, AI beyanı ve fiyat tek ekrandan."
            action="Parça Yükle"
            onAction={() => window.__yazsadGo && window.__yazsadGo('upload')}
          />
        )}
      </div>

      <div style={{ padding: '48px 32px 0' }}>
        <div className="section-head">
          <h2 className="section-title">Hakkında</h2>
        </div>
        <p style={{ color: 'var(--fg)', fontSize: 16, lineHeight: 1.7, maxWidth: 720, fontFamily: 'var(--font-display)' }}>
          {tracks.length > 0
            ? '"AI bir ajan değil, bir enstrüman — ben notayı koyarım." İstanbul\'dan synthwave ve ambient üretimi. 2025\'ten beri YAZSAD kurucu üyesi. Üç EP, iki single, sayısız remix.'
            : 'Hakkında bölümü henüz boş. Profilini düzenle butonundan tanıtım yazını ekleyebilirsin.'}
        </p>
      </div>
    </div>
  );
};

const NotificationsPage = () => {
  const auth = window.__yazsadAuth || { state: 'guest' };
  const [filter, setFilter] = React.useState('all');

  if (auth.state !== 'user') {
    return (
      <div className="page" style={{ paddingTop: 40 }}>
        <EmptyState
          art={<EmptyBellArt />}
          title="Bildirimler üye girişiyle gelir"
          desc="Beğeniler, satışlar, forum yanıtları ve dernek duyuruları — hepsini tek yerde gör."
          action="Hesap Oluştur"
          onAction={() => window.__yazsadOpenAuth && window.__yazsadOpenAuth('signup')}
          secondary="Giriş Yap"
          onSecondary={() => window.__yazsadOpenAuth && window.__yazsadOpenAuth('login')}
          size="lg"
        />
      </div>
    );
  }

  const allNotifs = [
    { type: 'beğeni', icon: IHeart, msg: '"Lodos" parçan 120 beğeni aldı', time: '14 dk', new: true, cat: 'social' },
    { type: 'yanıt', icon: IMsg, msg: 'Kerem Y. forum konuna yanıt verdi: "Suno v4.5 ile Ege folk..."', time: '1 sa', new: true, cat: 'social' },
    { type: 'satış', icon: ICart, msg: '"Neon Minare" satıldı — ₺67 (komisyon sonrası) hesabına geçti', time: '3 sa', new: true, cat: 'sales' },
    { type: 'onay', icon: ICheck, msg: 'Yeni parçan "Gece Otobüsü" yayında ✓', time: '5 sa', new: false, cat: 'system' },
    { type: 'takip', icon: IUsers, msg: 'Deniz Eldem seni takip etmeye başladı', time: '8 sa', new: false, cat: 'social' },
    { type: 'haber', icon: INews, msg: 'Yeni haber: "YAZSAD 2026 Bahar Festivali duyuruldu"', time: '1 g', new: false, cat: 'system' },
    { type: 'yarışma', icon: IFire, msg: 'Nisan yarışmasında eserin 3. sırada', time: '2 g', new: false, cat: 'social' },
    { type: 'dernek', icon: IBell, msg: 'Aidat ödemeniz başarıyla alındı — 2026 üyeliğiniz aktif', time: '5 g', new: false, cat: 'system' },
  ];

  const notifs = filter === 'all' ? allNotifs : filter === 'unread' ? allNotifs.filter(n => n.new) : allNotifs.filter(n => n.cat === filter);
  const unreadCount = allNotifs.filter(n => n.new).length;

  return (
    <div className="page" style={{ maxWidth: 780 }}>
      <div className="page-header">
        <div>
          <div className="page-eyebrow">{unreadCount} okunmamış</div>
          <h1 className="page-title">Bildirimler</h1>
        </div>
        <button className="btn btn-ghost" style={{ fontSize: 12 }}>Hepsini okundu işaretle</button>
      </div>

      <div className="chip-row" style={{ marginBottom: 16 }}>
        <button className={`chip ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>Hepsi · {allNotifs.length}</button>
        <button className={`chip ${filter === 'unread' ? 'active' : ''}`} onClick={() => setFilter('unread')}>Okunmamış · {unreadCount}</button>
        <button className={`chip ${filter === 'sales' ? 'active' : ''}`} onClick={() => setFilter('sales')}>Satışlar</button>
        <button className={`chip ${filter === 'social' ? 'active' : ''}`} onClick={() => setFilter('social')}>Sosyal</button>
        <button className={`chip ${filter === 'system' ? 'active' : ''}`} onClick={() => setFilter('system')}>Sistem</button>
      </div>

      {notifs.length === 0 ? (
        <EmptyState
          icon={IBell}
          title={filter === 'unread' ? 'Her şey okundu!' : 'Bu kategoride bildirim yok'}
          desc={filter === 'unread' ? 'Tebrikler, gelen kutun temiz.' : 'Buraya bu türde bir bildirim düştüğünde görürsün.'}
        />
      ) : (
        <div className="panel">
          {notifs.map((n, i) => {
            const Ic = n.icon;
            return (
              <div key={i} style={{ display: 'flex', gap: 14, padding: 16, borderBottom: '1px solid var(--border)', background: n.new ? 'var(--accent-soft)' : 'transparent', alignItems: 'flex-start' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--bg-elev-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)', flexShrink: 0 }}>
                  <Ic size={16} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: n.new ? 600 : 400, lineHeight: 1.5, textWrap: 'pretty' }}>{n.msg}</div>
                  <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 4 }}>{n.time} · {n.type}</div>
                </div>
                {n.new && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', marginTop: 14 }} />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

Object.assign(window, { UploadPage, ReleaseTypeChooser, SingleUploadFlow, AlbumUploadFlow, ContestPage, ClipsPage, ProfilePage, NotificationsPage });
