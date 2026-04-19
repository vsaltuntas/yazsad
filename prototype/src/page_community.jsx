// Live Sessions + Playlist + Radio + mIRC Chat + Lineage + Style DNA

// ==============================================================
// LIVE SESSIONS (workshops, atölyeler)
// ==============================================================
const LiveSessionsPage = () => {
  const [filter, setFilter] = React.useState('all');
  const now = new Date('2026-04-19');
  const sessions = [
    { id: 's1', title: 'Suno v4.5 ile zeybek füzyonu · canlı prompt lab', host: 'Tuna Kavur', date: '22 Nis', time: '20:00', dur: '90 dk', status: 'live', attendees: 47, cap: 80, price: 'Ücretsiz', level: 'Orta', cover: { g1: '#e94e1b', g2: '#7c3aed', g3: '#0a0a1e' } },
    { id: 's2', title: 'Udio ile vokal klonlama etiği · panel', host: 'Nil Tekbaş + konuklar', date: '24 Nis', time: '19:00', dur: '60 dk', status: 'upcoming', attendees: 28, cap: 120, price: 'Ücretsiz', level: 'Herkes', cover: { g1: '#06b6d4', g2: '#ec4899', g3: '#0a0a1e' } },
    { id: 's3', title: 'Stem ayrıştırma workshop · hands-on', host: 'Anatolian Lab', date: '27 Nis', time: '14:00', dur: '120 dk', status: 'upcoming', attendees: 14, cap: 20, price: '₺45 üye / ₺75', level: 'İleri', cover: { g1: '#4ade80', g2: '#fbbf24', g3: '#0a0a1e' } },
    { id: 's4', title: 'Hukuki güncel: AI eser sahipliği 2026', host: 'Av. Nil Tekbaş', date: '2 May', time: '20:00', dur: '75 dk', status: 'upcoming', attendees: 62, cap: 200, price: 'Ücretsiz', level: 'Herkes', cover: { g1: '#8b2635', g2: '#d4a574', g3: '#0a0a1e' } },
    { id: 's5', title: 'Mixing master class: AI çıktı → radyo kalitesi', host: 'Selen Atik', date: '8 May', time: '19:30', dur: '150 dk', status: 'upcoming', attendees: 8, cap: 15, price: '₺120 üye / ₺180', level: 'İleri', cover: { g1: '#fbbf24', g2: '#e94e1b', g3: '#1a1a1a' } },
    { id: 's6', title: 'Open mic — AI remix çarşamba', host: 'Topluluk', date: 'Her çarşamba', time: '21:00', dur: '120 dk', status: 'recurring', attendees: 34, cap: 50, price: 'Ücretsiz', level: 'Herkes', cover: { g1: '#ec4899', g2: '#a78bfa', g3: '#0a0a1e' } },
    { id: 's7', title: 'Geçmiş: Prompt mühendisliği 101', host: 'Deniz Eldem', date: '5 Nis', time: '-', dur: '60 dk', status: 'past', attendees: 142, cap: 150, price: 'Kayıt', level: 'Başlangıç', cover: { g1: '#c23b22', g2: '#1a1a1a', g3: '#fbbf24' } },
  ];

  const filtered = filter === 'all' ? sessions : sessions.filter(s => s.status === filter);
  const live = sessions.find(s => s.status === 'live');

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Modül · Canlı Oturum</div>
          <h1 className="page-title">Atölyeler & Canlı Oturumlar</h1>
          <p className="page-subtitle">
            Haftalık workshop, panel, open mic. Üyeler için çoğu ücretsiz; uygulamalı atölyelerde %40 indirim.
          </p>
        </div>
        <button className="btn btn-primary">+ Oturum Öner</button>
      </div>

      {/* Live now banner */}
      {live && (
        <div style={{ padding: 24, background: 'linear-gradient(135deg, rgba(239,68,68,0.15), var(--bg-elev))', border: '1px solid #ef4444', borderRadius: 'var(--radius-lg)', marginBottom: 24, display: 'grid', gridTemplateColumns: '200px 1fr auto', gap: 20, alignItems: 'center' }}>
          <div style={{ aspectRatio: '16/9', borderRadius: 'var(--radius-md)', overflow: 'hidden', position: 'relative' }}>
            <GenArt {...live.cover} seed={1} />
            <div style={{ position: 'absolute', top: 10, left: 10, padding: '4px 10px', background: '#ef4444', borderRadius: 12, fontSize: 10, fontWeight: 700, color: 'white', letterSpacing: '0.08em', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'white', animation: 'pulse-dot 1.5s infinite' }} />
              CANLI
            </div>
          </div>
          <div>
            <div className="mono" style={{ fontSize: 10, color: '#ef4444', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 6 }}>Şu anda yayında · {live.attendees} izleyici</div>
            <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 6, lineHeight: 1.3 }}>{live.title}</h3>
            <div style={{ fontSize: 13, color: 'var(--fg-muted)' }}>{live.host} · {live.dur} planlandı · {live.level}</div>
          </div>
          <button className="btn btn-primary" style={{ background: '#ef4444', color: 'white', border: 'none', padding: '14px 24px', fontSize: 13 }}>
            ▶ Canlı Yayına Katıl
          </button>
        </div>
      )}

      {/* Filters */}
      <div className="chip-row" style={{ marginBottom: 20 }}>
        <button className={`chip ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>Tümü · {sessions.length}</button>
        <button className={`chip ${filter === 'live' ? 'active' : ''}`} onClick={() => setFilter('live')}>Canlı · 1</button>
        <button className={`chip ${filter === 'upcoming' ? 'active' : ''}`} onClick={() => setFilter('upcoming')}>Yaklaşan · {sessions.filter(s => s.status === 'upcoming').length}</button>
        <button className={`chip ${filter === 'recurring' ? 'active' : ''}`} onClick={() => setFilter('recurring')}>Düzenli</button>
        <button className={`chip ${filter === 'past' ? 'active' : ''}`} onClick={() => setFilter('past')}>Geçmiş kayıtlar</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
        {filtered.filter(s => s.status !== 'live').map(s => (
          <div key={s.id} style={{ background: 'var(--bg-elev)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.15s' }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            <div style={{ aspectRatio: '16/9', position: 'relative' }}>
              <GenArt {...s.cover} seed={parseInt(s.id.replace('s',''))*13} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.8))', display: 'flex', alignItems: 'flex-end', padding: 12 }}>
                <div style={{ color: 'white', fontFamily: 'var(--font-mono)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {s.date} · {s.time}
                </div>
              </div>
              {s.status === 'past' && <div style={{ position: 'absolute', top: 10, left: 10, padding: '3px 8px', background: 'rgba(0,0,0,0.7)', color: 'white', fontSize: 9, fontWeight: 600, letterSpacing: '0.1em', borderRadius: 10, textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Kayıt</div>}
            </div>
            <div style={{ padding: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6, lineHeight: 1.3, textWrap: 'pretty' }}>{s.title}</div>
              <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', marginBottom: 12 }}>{s.host} · {s.dur} · {s.level}</div>

              {/* Progress bar */}
              {s.status !== 'past' && (
                <div style={{ marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, marginBottom: 4, color: 'var(--fg-muted)', fontFamily: 'var(--font-mono)' }}>
                    <span>{s.attendees}/{s.cap} kayıtlı</span>
                    <span>{Math.round((s.attendees/s.cap)*100)}% dolu</span>
                  </div>
                  <div style={{ height: 4, background: 'var(--bg-elev-2)', borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{ width: `${(s.attendees/s.cap)*100}%`, height: '100%', background: 'var(--accent)', borderRadius: 2 }} />
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="mono" style={{ fontSize: 11, fontWeight: 600, color: s.price === 'Ücretsiz' ? 'var(--success)' : 'var(--accent)' }}>{s.price}</div>
                <button className="btn btn-ghost" style={{ fontSize: 11, padding: '4px 10px' }}>{s.status === 'past' ? 'İzle' : 'Kayıt Ol'}</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`@keyframes pulse-dot { 0%, 100% { opacity: 1 } 50% { opacity: 0.3 } }`}</style>
    </div>
  );
};

// ==============================================================
// PLAYLIST PAGE
// ==============================================================
const PlaylistPage = ({ onPlay, currentTrack, q }) => {
  const [view, setView] = React.useState('editor'); // editor | my | all
  const editorial = [
    { id: 'e1', title: 'YAZSAD Editör Seçkisi · Nisan 2026', author: 'Editör Ekibi', tracks: 32, dur: '1 sa 47 dk', plays: '12.4K', cover: { g1: '#e94e1b', g2: '#7c3aed', g3: '#0a0a1e' } },
    { id: 'e2', title: 'Derin Konsantrasyon', author: 'Editör Ekibi', tracks: 42, dur: '2 sa 18 dk', plays: '87K', cover: { g1: '#06b6d4', g2: '#ec4899', g3: '#0a0a1e' } },
    { id: 'e3', title: 'Yeni Çıkanlar · AI Türk Sahnesi', author: 'Editör Ekibi', tracks: 24, dur: '1 sa 12 dk', plays: '5.8K', cover: { g1: '#4ade80', g2: '#fbbf24', g3: '#0a0a1e' } },
    { id: 'e4', title: 'Geç Saat Vibe', author: 'Editör Ekibi', tracks: 28, dur: '1 sa 32 dk', plays: '23K', cover: { g1: '#c23b22', g2: '#1a1a1a', g3: '#fbbf24' } },
    { id: 'e5', title: 'Trap & Türkü Karışımları', author: 'Editör Ekibi', tracks: 18, dur: '52 dk', plays: '9.1K', cover: { g1: '#ec4899', g2: '#a78bfa', g3: '#0a0a1e' } },
    { id: 'e6', title: 'Cinematic Türk Sesi', author: 'Editör Ekibi', tracks: 14, dur: '1 sa 4 dk', plays: '4.2K', cover: { g1: '#fbbf24', g2: '#e94e1b', g3: '#1a1a1a' } },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Modül · Playlist</div>
          <h1 className="page-title">Playlistler</h1>
          <p className="page-subtitle">Editör seçkileri, topluluk çalma listeleri, kendi koleksiyonun.</p>
        </div>
        <button className="btn btn-primary">+ Liste Oluştur</button>
      </div>

      <div className="chip-row" style={{ marginBottom: 24 }}>
        <button className={`chip ${view === 'editor' ? 'active' : ''}`} onClick={() => setView('editor')}>Editör Seçkileri</button>
        <button className={`chip ${view === 'my' ? 'active' : ''}`} onClick={() => setView('my')}>Benim Listelerim</button>
        <button className={`chip ${view === 'all' ? 'active' : ''}`} onClick={() => setView('all')}>Topluluk</button>
      </div>

      {view === 'editor' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
          {editorial.map(pl => (
            <div key={pl.id} style={{ background: 'var(--bg-elev)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', cursor: 'pointer' }}>
              <div style={{ aspectRatio: '1', position: 'relative' }}>
                <GenArt {...pl.cover} seed={parseInt(pl.id.replace('e',''))*31} />
                <div style={{ position: 'absolute', bottom: 12, left: 12, right: 12, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                  <div className="mono" style={{ fontSize: 10, color: 'white', textTransform: 'uppercase', letterSpacing: '0.08em', textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>{pl.tracks} parça · {pl.dur}</div>
                  <button className="btn btn-primary" style={{ width: 44, height: 44, borderRadius: '50%', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <IPlay size={14} />
                  </button>
                </div>
              </div>
              <div style={{ padding: 14 }}>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, textWrap: 'pretty', lineHeight: 1.3 }}>{pl.title}</div>
                <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)' }}>{pl.author} · ▶ {pl.plays}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {view === 'my' && (
        <EmptyState
          icon={IMusic}
          title="Henüz kendi listen yok"
          desc="Beğendiğin parçalardan listeler oluştur, paylaş, takip edilsin."
          action="İlk Listemi Oluştur"
          onAction={() => {}}
          size="lg"
        />
      )}

      {view === 'all' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
          {editorial.concat(editorial).slice(0, 9).map((pl, i) => (
            <div key={i} style={{ background: 'var(--bg-elev)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', cursor: 'pointer' }}>
              <div style={{ aspectRatio: '1', position: 'relative' }}>
                <GenArt {...pl.cover} seed={i*7 + 3} />
                <div style={{ position: 'absolute', top: 10, left: 10, padding: '3px 8px', background: 'rgba(0,0,0,0.6)', borderRadius: 10, fontSize: 10, color: 'white', fontFamily: 'var(--font-mono)', backdropFilter: 'blur(6px)' }}>
                  @user{i+1}
                </div>
              </div>
              <div style={{ padding: 14 }}>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Topluluk Listesi #{i+1}</div>
                <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)' }}>{(i+1)*8} parça · ▶ {((i+1)*1.2).toFixed(1)}K</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ==============================================================
// RADIO PAGE
// ==============================================================
const RadioPage = ({ onPlay, currentTrack, q }) => {
  const stations = [
    { id: 'r1', name: 'YAZSAD Main', desc: 'Katalogdan algoritmik akış · 7/24', listeners: 342, color: '#e94e1b', nowPlaying: 'Lodos — Anatolian Lab' },
    { id: 'r2', name: 'Folk Fusion FM', desc: 'Türkü + AI · bağlama dolu', listeners: 128, color: '#c23b22', nowPlaying: 'Ege Rüzgarı — Kerem Y.' },
    { id: 'r3', name: 'Lo-fi Study', desc: 'Çalışma ve odaklanma', listeners: 487, color: '#06b6d4', nowPlaying: 'Rain on Beşiktaş — Mert Canlar' },
    { id: 'r4', name: 'Cinematic AI', desc: 'Dizi/film müziği jeneratif', listeners: 92, color: '#7c3aed', nowPlaying: 'Istanbul Noir — Nil Tekbaş' },
    { id: 'r5', name: 'Gece Kuşu', desc: '00:00-06:00 deep electronic', listeners: 203, color: '#1e40af', nowPlaying: 'Dark Room — Deniz Eldem' },
    { id: 'r6', name: 'Klasik AI', desc: 'Oda orkestrası + modern yorum', listeners: 47, color: '#fbbf24', nowPlaying: 'Suite 4 — Selen Atik' },
  ];
  const [active, setActive] = React.useState(null);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Modül · Radyo</div>
          <h1 className="page-title">Radyo İstasyonları</h1>
          <p className="page-subtitle">Algoritmik akışlar. Her istasyon, YAZSAD kataloğundan tür ve mood'a göre sürekli yeni parça çalar.</p>
        </div>
      </div>

      {active && (
        <div style={{ padding: 24, background: 'linear-gradient(135deg, var(--accent-soft), var(--bg-elev))', border: '1px solid var(--accent)', borderRadius: 'var(--radius-lg)', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 80, height: 80, borderRadius: 'var(--radius-md)', background: active.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 32, flexShrink: 0 }}>📻</div>
          <div style={{ flex: 1 }}>
            <div className="mono" style={{ fontSize: 10, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', animation: 'pulse-dot 1.5s infinite' }} />
              Yayında · {active.listeners} dinleyici
            </div>
            <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 4 }}>{active.name}</div>
            <div style={{ fontSize: 13, color: 'var(--fg-muted)' }}>🎵 Şimdi çalıyor: {active.nowPlaying}</div>
          </div>
          <button className="btn btn-ghost" onClick={() => setActive(null)}>Durdur</button>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
        {stations.map(s => (
          <div key={s.id} onClick={() => setActive(s)} style={{ padding: 20, background: active?.id === s.id ? 'var(--accent-soft)' : 'var(--bg-elev)', border: active?.id === s.id ? '1px solid var(--accent)' : '1px solid var(--border)', borderRadius: 'var(--radius-lg)', cursor: 'pointer', transition: 'all 0.15s' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div style={{ width: 48, height: 48, borderRadius: 'var(--radius-md)', background: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 20 }}>📻</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{s.name}</div>
                <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  <span style={{ color: 'var(--success)' }}>●</span> {s.listeners} dinleyici
                </div>
              </div>
            </div>
            <div style={{ fontSize: 12, color: 'var(--fg-muted)', marginBottom: 12, lineHeight: 1.5 }}>{s.desc}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 12px', background: 'var(--bg)', borderRadius: 'var(--radius-sm)', fontSize: 11 }}>
              {/* Mini equalizer */}
              <div style={{ display: 'flex', gap: 2, alignItems: 'flex-end', height: 14 }}>
                {[0,1,2,3].map(i => (
                  <div key={i} style={{ width: 2, background: s.color, animation: `vu ${0.4+i*0.15}s ease-in-out infinite alternate`, height: '100%' }} />
                ))}
              </div>
              <span style={{ color: 'var(--fg-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.nowPlaying}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==============================================================
// CHAT (mIRC-style retro)
// ==============================================================
const ChatPage = () => {
  const channels = [
    { id: 'general', label: '#genel', users: 87, topic: 'Ana sohbet kanalı · küfür/taciz yasak' },
    { id: 'prompts', label: '#prompt-lab', users: 42, topic: 'Prompt paylaşımı ve tartışma' },
    { id: 'feedback', label: '#parça-eleştiri', users: 23, topic: 'Geri bildirim isteyen parçalar' },
    { id: 'collabs', label: '#işbirliği', users: 31, topic: 'Remix & collab teklifleri' },
    { id: 'dernek', label: '#dernek-duyurular', users: 198, topic: 'Resmî duyurular · sadece moderatör yazar' },
    { id: 'yardim', label: '#yardım', users: 14, topic: 'Platform yardım · bildirim açık' },
    { id: 'off', label: '#off-topic', users: 56, topic: 'Müzik dışı · kahve, film, kitap' },
  ];
  const [active, setActive] = React.useState('general');
  const [msg, setMsg] = React.useState('');

  const activeChan = channels.find(c => c.id === active);

  const messages = [
    { user: '@keremy', color: '#e94e1b', time: '14:23', text: 'Yeni Suno update vokal kalitesini inanılmaz arttırmış, test ediyorum' },
    { user: '@denizeldem', color: '#06b6d4', time: '14:25', text: 'link paylaşır mısın?', op: true },
    { user: '@keremy', color: '#e94e1b', time: '14:26', text: 'gönderiyorum DM den' },
    { user: '* anatolianlab', color: 'var(--fg-muted)', time: '14:28', text: 'kanala katıldı', action: true },
    { user: '@anatolianlab', color: '#7c3aed', time: '14:28', text: 'selam ya arkadaşlar, bugün nasıldı?' },
    { user: '@selenatik', color: '#4ade80', time: '14:30', text: 'dün yüklediğim parçaya bakmak isteyen var mı? klasik deneysel' },
    { user: '@tunak', color: '#c23b22', time: '14:32', text: '#parça-eleştiri de linkini at, oradan daha fazla dönüş alırsın' },
    { user: '@zehrademir', color: '#fbbf24', time: '14:34', text: 'aynen valla feedback kanalı daha aktif' },
    { user: '* mertcanlar', color: 'var(--fg-muted)', time: '14:36', text: "'kahve alıyor' — away", action: true },
    { user: '@nilt', color: '#ec4899', time: '14:40', text: 'hukuki güncelleme paneline kayıt yaptıracak arkadaşlar, bu akşam son gün' },
    { user: '@anatolianlab', color: '#7c3aed', time: '14:41', text: 'kaydolduk, saygılar' },
    { user: '@keremy', color: '#e94e1b', time: '14:43', text: 'update çıktı, vokaller çok iyi, örnek: https://yazsad.org/t/new-suno-test' },
  ];

  return (
    <div className="page" style={{ maxWidth: 1200 }}>
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Modül · Sohbet</div>
          <h1 className="page-title">Canlı Sohbet</h1>
          <p className="page-subtitle">7 kanal · eski mIRC estetiği, modern altyapı. Üye davranış kuralları geçerli.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 16, height: 'calc(100vh - 280px)', minHeight: 500 }}>
        {/* Channel list */}
        <div style={{ background: '#0a0a0a', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', overflow: 'auto', fontFamily: 'var(--font-mono)', padding: '12px 0' }}>
          <div style={{ padding: '4px 14px 10px', fontSize: 9, color: '#4ade80', textTransform: 'uppercase', letterSpacing: '0.15em', borderBottom: '1px solid #1a1a1a', marginBottom: 8 }}>KANALLAR</div>
          {channels.map(c => (
            <div key={c.id} onClick={() => setActive(c.id)} style={{
              padding: '6px 14px',
              cursor: 'pointer',
              color: active === c.id ? '#fff' : '#6b7280',
              background: active === c.id ? '#1e3a8a' : 'transparent',
              fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              borderLeft: active === c.id ? '3px solid #4ade80' : '3px solid transparent',
            }}>
              <span>{c.label}</span>
              <span style={{ fontSize: 10, color: active === c.id ? '#4ade80' : '#4b5563' }}>{c.users}</span>
            </div>
          ))}
          <div style={{ padding: '16px 14px', fontSize: 9, color: '#4ade80', textTransform: 'uppercase', letterSpacing: '0.15em', borderTop: '1px solid #1a1a1a', marginTop: 12 }}>ÖZELE YANITLAR</div>
          {['@keremy', '@selenatik'].map(u => (
            <div key={u} style={{ padding: '6px 14px', color: '#9ca3af', fontSize: 12, cursor: 'pointer' }}>{u}</div>
          ))}
        </div>

        {/* Main chat */}
        <div style={{ background: '#0a0a0a', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Topic bar */}
          <div style={{ padding: '10px 16px', background: '#111', borderBottom: '1px solid #1f2937', fontFamily: 'var(--font-mono)', fontSize: 11, color: '#9ca3af' }}>
            <span style={{ color: '#4ade80' }}>{activeChan.label}</span> · {activeChan.topic} · <span style={{ color: '#60a5fa' }}>{activeChan.users} kullanıcı</span>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflow: 'auto', padding: '12px 16px', fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 1.7, color: '#d4d4d4' }}>
            {messages.map((m, i) => (
              <div key={i} style={{ marginBottom: 2, wordBreak: 'break-word' }}>
                <span style={{ color: '#6b7280' }}>[{m.time}]</span>
                {' '}
                {m.action ? (
                  <span style={{ fontStyle: 'italic', color: '#6b7280' }}>{m.user} {m.text}</span>
                ) : (
                  <>
                    <span style={{ color: m.color, fontWeight: 600 }}>{m.op ? '@' : ''}{m.user}:</span>
                    {' '}
                    <span>{m.text}</span>
                  </>
                )}
              </div>
            ))}
            <div style={{ marginTop: 12, fontSize: 10, color: '#6b7280', fontStyle: 'italic' }}>— son 12 mesaj — daha eski mesajlar için kaydır —</div>
          </div>

          {/* Input */}
          <div style={{ padding: 10, borderTop: '1px solid #1f2937', background: '#111', display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#4ade80' }}>@ben &gt;</span>
            <input
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && msg.trim()) { setMsg(''); window.__yazsadToast && window.__yazsadToast('Mesaj gönderildi (demo)'); } }}
              placeholder={`${activeChan.label} kanalında yaz... (/help komutlar için)`}
              style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontFamily: 'var(--font-mono)', fontSize: 12, color: '#d4d4d4' }}
            />
            <span className="mono" style={{ fontSize: 9, color: '#4b5563' }}>⏎ gönder · / komut</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==============================================================
// LINEAGE / SOY AĞACI
// ==============================================================
const LineagePage = ({ onPlay }) => {
  const root = { id: 'original', title: 'Lodos (Orijinal)', artist: 'Anatolian Lab', year: '2025', plays: '47K' };
  const level1 = [
    { id: 'r1', title: 'Lodos · Tuna Remix (Trap)', artist: 'Tuna Kavur', year: '2025', plays: '12K', kind: 'Remix' },
    { id: 'r2', title: 'Lodos · Deep Cut', artist: 'Deniz Eldem', year: '2026', plays: '8.4K', kind: 'Remix' },
    { id: 'r3', title: 'Lodos · Acoustic Stem', artist: 'Selen Atik', year: '2025', plays: '5.2K', kind: 'Cover' },
  ];
  const level2 = [
    { id: 'r4', title: 'Lodos Trap · Feat. Zehra', artist: 'Tuna Kavur ft. Zehra', year: '2026', plays: '3.1K', parent: 'r1', kind: 'Collab' },
    { id: 'r5', title: 'Lodos Deep · Extended', artist: 'Deniz Eldem', year: '2026', plays: '2.4K', parent: 'r2', kind: 'Remix' },
  ];

  return (
    <div className="page" style={{ maxWidth: 1000 }}>
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Modül · Soy Ağacı</div>
          <h1 className="page-title">Remix Soy Ağacı</h1>
          <p className="page-subtitle">
            Bir parça nerelere gitti. Remix zincirlerini, cover'ları, collab'ları tek grafikte gör. Her zincir kendi gelir paylaşımı imzasını taşır.
          </p>
        </div>
      </div>

      <div style={{ padding: 16, background: 'var(--accent-soft)', border: '1px solid var(--accent)', borderRadius: 'var(--radius-md)', marginBottom: 32, fontSize: 13, color: 'var(--fg)', lineHeight: 1.5 }}>
        <strong style={{ color: 'var(--accent)' }}>Örnek parça:</strong> "Lodos — Anatolian Lab" · 3 doğrudan türev, 2 ikincil türev, toplam <span className="mono" style={{ fontWeight: 600 }}>78.1K</span> dinlenme zincir boyunca.
      </div>

      {/* Root */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 40, position: 'relative' }}>
        <LineageNode item={root} color="#e94e1b" root />
      </div>

      {/* Connector lines via svg overlay is complex; use vertical stacks with visible borders */}
      <div style={{ position: 'relative', paddingTop: 0 }}>
        {/* Level 1 */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 40, position: 'relative', justifyContent: 'center' }}>
          {/* Connector from root */}
          <div style={{ position: 'absolute', top: -40, left: '50%', width: 1, height: 40, background: 'var(--border)' }} />
          <div style={{ position: 'absolute', top: 0, left: '16.66%', right: '16.66%', height: 1, background: 'var(--border)' }} />
          {level1.map((item, i) => (
            <div key={item.id} style={{ flex: 1, maxWidth: 280, position: 'relative' }}>
              <div style={{ position: 'absolute', top: -40, left: '50%', width: 1, height: 40, background: 'var(--border)' }} />
              <LineageNode item={item} color="#7c3aed" />
            </div>
          ))}
        </div>

        {/* Level 2 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          <div>
            <div style={{ height: 24, width: 1, background: 'var(--border)', margin: '0 auto' }} />
            <LineageNode item={level2[0]} color="#06b6d4" small />
          </div>
          <div>
            <div style={{ height: 24, width: 1, background: 'var(--border)', margin: '0 auto' }} />
            <LineageNode item={level2[1]} color="#06b6d4" small />
          </div>
          <div></div>
        </div>
      </div>

      {/* Revenue split breakdown */}
      <div style={{ marginTop: 48, padding: 24, background: 'var(--bg-elev)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' }}>
        <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>En derin zincir · Lodos Trap feat. Zehra</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
          <span style={{ padding: '6px 12px', background: 'var(--accent)', color: 'white', borderRadius: 16, fontSize: 12, fontWeight: 600 }}>Anatolian Lab · %35</span>
          <span style={{ color: 'var(--fg-muted)' }}>→</span>
          <span style={{ padding: '6px 12px', background: '#7c3aed', color: 'white', borderRadius: 16, fontSize: 12, fontWeight: 600 }}>Tuna Kavur · %30</span>
          <span style={{ color: 'var(--fg-muted)' }}>→</span>
          <span style={{ padding: '6px 12px', background: '#06b6d4', color: 'white', borderRadius: 16, fontSize: 12, fontWeight: 600 }}>Zehra Demir · %20</span>
          <span style={{ color: 'var(--fg-muted)' }}>+</span>
          <span style={{ padding: '6px 12px', background: 'var(--bg-elev-2)', border: '1px solid var(--border)', borderRadius: 16, fontSize: 12, color: 'var(--fg-muted)' }}>Platform + Dernek · %15</span>
        </div>
        <div style={{ fontSize: 12, color: 'var(--fg-muted)', lineHeight: 1.6 }}>
          Her ₺100 satışta otomatik bölüşüm. Zincir derinleştikçe orijinal sanatçı her seviyede pay alır. Herhangi bir halkadaki sanatçı zinciri reddedebilir → o türev yayından kalkar.
        </div>
      </div>
    </div>
  );
};

const LineageNode = ({ item, color, root, small }) => (
  <div style={{ padding: small ? 10 : 14, background: 'var(--bg-elev)', border: `1px solid ${root ? color : 'var(--border)'}`, borderRadius: 'var(--radius-md)', borderLeft: `3px solid ${color}`, minWidth: root ? 280 : 'auto' }}>
    {root && <div className="mono" style={{ fontSize: 9, color: color, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 6 }}>Orijinal parça</div>}
    {item.kind && !root && <div className="mono" style={{ fontSize: 9, color: color, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>{item.kind}</div>}
    <div style={{ fontSize: small ? 12 : 14, fontWeight: 600, marginBottom: 4, lineHeight: 1.3 }}>{item.title}</div>
    <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)' }}>{item.artist} · {item.year} · ▶ {item.plays}</div>
  </div>
);

// ==============================================================
// STYLE DNA (radar chart)
// ==============================================================
const StyleDNAPage = () => {
  const dna = [
    { axis: 'Tempo', value: 72, label: 'Orta-hızlı · ort 108 BPM' },
    { axis: 'Enerji', value: 58, label: 'Dengeli, ender patlamalı' },
    { axis: 'Akustiklik', value: 45, label: 'Elektronik ağırlık' },
    { axis: 'Vokal', value: 82, label: 'Güçlü vokal ön planda' },
    { axis: 'Duygu', value: 38, label: 'Melankolik eğilim' },
    { axis: 'Deneysellik', value: 67, label: 'Orta deneysel' },
    { axis: 'Yerel Renk', value: 75, label: 'Anadolu enstrümanları belirgin' },
    { axis: 'Uzunluk', value: 62, label: 'Standart (~3:20)' },
  ];

  const size = 360;
  const cx = size / 2, cy = size / 2;
  const radius = size / 2 - 40;
  const axes = dna.length;

  const points = dna.map((d, i) => {
    const angle = (Math.PI * 2 * i) / axes - Math.PI / 2;
    const r = (d.value / 100) * radius;
    return { x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r, angle, d };
  });
  const labelPts = dna.map((d, i) => {
    const angle = (Math.PI * 2 * i) / axes - Math.PI / 2;
    return { x: cx + Math.cos(angle) * (radius + 22), y: cy + Math.sin(angle) * (radius + 22), d, angle };
  });
  const poly = points.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <div className="page" style={{ maxWidth: 1100 }}>
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Modül · Stil DNA</div>
          <h1 className="page-title">Stil İmzan</h1>
          <p className="page-subtitle">
            24 parçanın otomatik analiziyle üslup profilin. Dinleyiciler bu DNA ile seni keşfeder; benzer sanatçılarla eşleşirsin.
          </p>
        </div>
        <button className="btn btn-ghost" style={{ fontSize: 12 }}>DNA'yı yenile</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Radar chart */}
        <div className="panel" style={{ padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width={size} height={size}>
            {/* Grid circles */}
            {[0.25, 0.5, 0.75, 1].map((f, i) => (
              <circle key={i} cx={cx} cy={cy} r={radius * f} fill="none" stroke="var(--border)" strokeDasharray={i === 3 ? 'none' : '3 3'} strokeWidth="1" />
            ))}
            {/* Axes */}
            {dna.map((d, i) => {
              const angle = (Math.PI * 2 * i) / axes - Math.PI / 2;
              return (
                <line key={i} x1={cx} y1={cy} x2={cx + Math.cos(angle) * radius} y2={cy + Math.sin(angle) * radius} stroke="var(--border)" strokeWidth="1" />
              );
            })}
            {/* DNA polygon */}
            <polygon points={poly} fill="var(--accent)" fillOpacity="0.25" stroke="var(--accent)" strokeWidth="2" strokeLinejoin="round" />
            {points.map((p, i) => (
              <circle key={i} cx={p.x} cy={p.y} r="4" fill="var(--accent)" stroke="var(--bg)" strokeWidth="2" />
            ))}
            {/* Labels */}
            {labelPts.map((l, i) => (
              <text key={i} x={l.x} y={l.y} textAnchor={l.x < cx - 5 ? 'end' : l.x > cx + 5 ? 'start' : 'middle'} dominantBaseline="middle" fill="var(--fg)" style={{ fontSize: 11, fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{l.d.axis}</text>
            ))}
          </svg>
        </div>

        {/* Breakdown */}
        <div>
          <div className="panel" style={{ padding: 20, marginBottom: 16 }}>
            <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 16 }}>8 Boyut</div>
            {dna.map(d => (
              <div key={d.axis} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
                  <span style={{ fontWeight: 600 }}>{d.axis}</span>
                  <span className="mono" style={{ color: 'var(--fg-muted)' }}>{d.value}/100</span>
                </div>
                <div style={{ height: 4, background: 'var(--bg-elev-2)', borderRadius: 2, overflow: 'hidden', marginBottom: 4 }}>
                  <div style={{ width: `${d.value}%`, height: '100%', background: 'var(--accent)', borderRadius: 2 }} />
                </div>
                <div style={{ fontSize: 11, color: 'var(--fg-muted)' }}>{d.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Similar artists */}
      <div style={{ marginTop: 24 }}>
        <div className="section-head">
          <h2 className="section-title">Benzer Stil DNA'sı</h2>
          <span className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)' }}>8 boyutta &gt;%80 eşleşme</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
          {[
            { name: 'Kerem Y.', match: 92, genre: 'Folk Fusion', city: 'İzmir' },
            { name: 'Zehra Demir', match: 87, genre: 'Dream Pop', city: 'Eskişehir' },
            { name: 'Berk Söyleyen', match: 84, genre: 'Post-rock', city: 'İzmir' },
            { name: 'Selen Atik', match: 81, genre: 'Classical', city: 'İstanbul' },
          ].map(s => (
            <div key={s.name} style={{ padding: 16, background: 'var(--bg-elev)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div className="avatar" style={{ width: 40, height: 40, background: 'linear-gradient(135deg,#e94e1b,#7c3aed)' }}>
                  {s.name.split(' ').map(w=>w[0]).slice(0,2).join('')}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{s.name}</div>
                  <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)' }}>{s.genre} · {s.city}</div>
                </div>
              </div>
              <div style={{ height: 4, background: 'var(--bg-elev-2)', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ width: `${s.match}%`, height: '100%', background: 'var(--accent)' }} />
              </div>
              <div className="mono" style={{ fontSize: 10, color: 'var(--accent)', marginTop: 4 }}>%{s.match} eşleşme</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { LiveSessionsPage, PlaylistPage, RadioPage, ChatPage, LineagePage, StyleDNAPage });
