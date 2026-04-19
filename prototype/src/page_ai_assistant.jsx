// AI Assistant (Claude-backed) + B2B Portal + Onboarding wizard

// ==============================================================
// AI ASSISTANT — floating bubble + full page
// ==============================================================

const AI_SUGGESTIONS = [
  { icon: '🎵', text: 'Bugün için folk-trap tarzı bir parça öner' },
  { icon: '💡', text: 'Suno v4.5 ile zeybek nasıl daha iyi yapılır?' },
  { icon: '🎛️', text: 'Yüklediğim parça için etiket öner' },
  { icon: '📜', text: 'AI müzik telifi Türkiye\'de nasıl işliyor?' },
  { icon: '🎤', text: 'Remix için stem ayrıştırma nasıl çalışır?' },
  { icon: '💰', text: 'Gelir paylaşım hesabını açıkla' },
];

const AIAssistantPanel = ({ onClose, fullPage }) => {
  const [messages, setMessages] = React.useState([
    { role: 'assistant', text: 'Selam! YAZSAD AI asistanınım. Platform, AI müzik üretimi, etik çerçeve, gelir paylaşımı — ne soracağın varsa buradayım.' },
  ]);
  const [input, setInput] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const endRef = React.useRef();

  React.useEffect(() => {
    endRef.current?.scrollTo({ top: 99999, behavior: 'smooth' });
  }, [messages, loading]);

  const send = async (text) => {
    const q = (text || input).trim();
    if (!q || loading) return;
    setInput('');
    const newMsgs = [...messages, { role: 'user', text: q }];
    setMessages(newMsgs);
    setLoading(true);
    try {
      const systemPrompt = 'Sen YAZSAD (Yapay Zekâ Sanatçıları Derneği) asistanısın. Türkçe yanıt ver, kısa ve net ol (2-4 cümle). Türkiye\'deki AI müzik ekosistemi, etik çerçeve (10 madde), marketplace (%85 sanatçı / %10 platform / %5 dernek), Suno/Udio/Stable Audio modelleri, ve dernek üyeliği (₺640/yıl) hakkında bilgilisin.';
      const conversation = newMsgs.map(m => ({ role: m.role, content: m.text }));
      const reply = await window.claude.complete({
        messages: [{ role: 'user', content: systemPrompt + '\n\n--- Konuşma ---\n' + conversation.map(m => `${m.role}: ${m.content}`).join('\n') + '\n\nassistant:' }],
      });
      setMessages(m => [...m, { role: 'assistant', text: reply }]);
    } catch (err) {
      setMessages(m => [...m, { role: 'assistant', text: 'Şu an bağlanamadım. Demo modda olduğumuzu biliyor olabilir misin? Birazdan tekrar dene.' }]);
    }
    setLoading(false);
  };

  const containerStyle = fullPage ? {
    position: 'relative', width: '100%', maxWidth: 780, margin: '0 auto',
    background: 'var(--bg-elev)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)',
    overflow: 'hidden', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 260px)', minHeight: 500,
  } : {
    position: 'fixed', right: 20, bottom: 'calc(var(--player-h) + 20px)', width: 380, height: 540,
    background: 'var(--bg-elev)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)',
    boxShadow: '0 20px 60px rgba(0,0,0,0.4)', zIndex: 90, display: 'flex', flexDirection: 'column', overflow: 'hidden',
  };

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'linear-gradient(135deg, var(--accent-soft), var(--bg-elev))' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--accent)', color: 'var(--accent-fg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>Y/</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>YAZSAD Asistan</div>
            <div className="mono" style={{ fontSize: 9, color: 'var(--success)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>● Çevrimiçi · Claude Haiku 4.5</div>
          </div>
        </div>
        {onClose && <button className="btn-icon" onClick={onClose}><IX size={14} /></button>}
      </div>

      {/* Messages */}
      <div ref={endRef} style={{ flex: 1, overflow: 'auto', padding: '16px 20px' }}>
        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom: 14, display: 'flex', gap: 10, alignItems: 'flex-start', flexDirection: m.role === 'user' ? 'row-reverse' : 'row' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', flexShrink: 0, background: m.role === 'assistant' ? 'var(--accent)' : 'var(--bg-elev-2)', color: m.role === 'assistant' ? 'var(--accent-fg)' : 'var(--fg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
              {m.role === 'assistant' ? 'Y/' : 'Sen'}
            </div>
            <div style={{
              maxWidth: '78%',
              padding: '10px 14px',
              borderRadius: 14,
              background: m.role === 'assistant' ? 'var(--bg-elev-2)' : 'var(--accent)',
              color: m.role === 'assistant' ? 'var(--fg)' : 'var(--accent-fg)',
              fontSize: 13, lineHeight: 1.55, textWrap: 'pretty',
            }}>{m.text}</div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--accent)', color: 'var(--accent-fg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>Y/</div>
            <div style={{ padding: '10px 14px', background: 'var(--bg-elev-2)', borderRadius: 14, display: 'flex', gap: 4 }}>
              {[0,1,2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--fg-muted)', animation: `ai-dot 1.4s ${i*0.2}s infinite ease-in-out` }} />)}
            </div>
          </div>
        )}
        {messages.length === 1 && !loading && (
          <div style={{ marginTop: 16 }}>
            <div className="mono" style={{ fontSize: 9, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Öneriler</div>
            <div style={{ display: 'grid', gap: 6 }}>
              {AI_SUGGESTIONS.map(s => (
                <button key={s.text} onClick={() => send(s.text)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 10, fontSize: 12, color: 'var(--fg)', textAlign: 'left', cursor: 'pointer', transition: 'border-color 0.15s' }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent)'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border)'}>
                  <span>{s.icon}</span>
                  <span>{s.text}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div style={{ padding: 12, borderTop: '1px solid var(--border)', background: 'var(--bg)' }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', background: 'var(--bg-elev-2)', borderRadius: 12, padding: 4 }}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
            placeholder="Bir şey sor..."
            rows={1}
            style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: 13, padding: '8px 10px', color: 'var(--fg)', resize: 'none', fontFamily: 'inherit', maxHeight: 100 }}
          />
          <button onClick={() => send()} disabled={!input.trim() || loading} style={{ width: 34, height: 34, borderRadius: 8, background: input.trim() ? 'var(--accent)' : 'var(--bg-elev)', color: input.trim() ? 'var(--accent-fg)' : 'var(--fg-muted)', border: 'none', cursor: input.trim() ? 'pointer' : 'default', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 600, flexShrink: 0 }}>↑</button>
        </div>
        <div className="mono" style={{ fontSize: 9, color: 'var(--fg-dim)', textAlign: 'center', marginTop: 6, letterSpacing: '0.06em' }}>
          AI yanıtları hata yapabilir · hukuki tavsiye değildir
        </div>
      </div>

      <style>{`@keyframes ai-dot { 0%, 60%, 100% { transform: scale(0.7); opacity: 0.4 } 30% { transform: scale(1); opacity: 1 } }`}</style>
    </div>
  );
};

const AIAssistantPage = () => (
  <div className="page">
    <div className="page-header">
      <div>
        <div className="page-eyebrow">Beta · Claude destekli</div>
        <h1 className="page-title">AI Asistan</h1>
        <p className="page-subtitle">Platform, AI müzik üretimi, etik çerçeve, gelir paylaşımı — sor, öğren.</p>
      </div>
    </div>
    <AIAssistantPanel fullPage />
  </div>
);

// Floating bubble
const AIBubble = () => {
  const [open, setOpen] = React.useState(false);
  if (open) return <AIAssistantPanel onClose={() => setOpen(false)} />;
  return (
    <button
      onClick={() => setOpen(true)}
      title="YAZSAD AI Asistan"
      style={{
        position: 'fixed', right: 20, bottom: 'calc(var(--player-h) + 20px)',
        width: 54, height: 54, borderRadius: '50%',
        background: 'var(--accent)', color: 'var(--accent-fg)',
        border: 'none', boxShadow: '0 8px 24px rgba(233,78,27,0.4)',
        cursor: 'pointer', zIndex: 85,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 20, transition: 'transform 0.2s',
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="M2 17l10 5 10-5"/>
        <path d="M2 12l10 5 10-5"/>
      </svg>
    </button>
  );
};

// ==============================================================
// B2B PORTAL
// ==============================================================
const B2BPage = ({ setRoute }) => {
  const [tab, setTab] = React.useState('overview');
  return (
    <div className="page" style={{ maxWidth: 1100 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24, marginBottom: 32, padding: 32, background: 'linear-gradient(135deg, var(--bg-elev), var(--accent-soft))', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
        <div style={{ flex: 1 }}>
          <div className="mono" style={{ fontSize: 10, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8 }}>B2B Portal · Kurumsal</div>
          <h1 className="display" style={{ fontSize: 40, fontWeight: 500, lineHeight: 1.1, letterSpacing: '-0.025em', margin: 0, marginBottom: 12 }}>
            Plak şirketleri, ajanslar, yayıncılar için<br/>toplu lisans & keşif
          </h1>
          <p style={{ fontSize: 14, color: 'var(--fg-muted)', maxWidth: 600, margin: 0, lineHeight: 1.6 }}>
            10,000+ AI üretimi Türk parçaya doğrudan kurumsal erişim. Sync, jingle, reklam müziği, dizi skoru için filtreli keşif + toplu lisans sözleşmesi.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8, flexDirection: 'column' }}>
          <button className="btn btn-primary">İletişime Geç</button>
          <button className="btn btn-ghost" style={{ fontSize: 12 }}>Teknik broşür (.pdf)</button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ borderBottom: '1px solid var(--border)', marginBottom: 32, display: 'flex', gap: 4 }}>
        {[['overview', 'Genel Bakış'], ['search', 'Toplu Arama'], ['licenses', 'Lisans Modelleri'], ['clients', 'Müşteriler'], ['api', 'API & Entegrasyon']].map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)} style={{ padding: '12px 16px', background: 'none', border: 'none', borderBottom: tab === k ? '2px solid var(--accent)' : '2px solid transparent', color: tab === k ? 'var(--fg)' : 'var(--fg-muted)', fontSize: 13, fontWeight: tab === k ? 600 : 500, cursor: 'pointer', marginBottom: -1 }}>{l}</button>
        ))}
      </div>

      {tab === 'overview' && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginBottom: 32 }}>
            {[
              { n: '01', t: 'Filtreli keşif', d: 'BPM, mood, tür, süre, enstrüman, lisans tipi — 14 filtre ile arama' },
              { n: '02', t: 'Toplu lisans', d: 'Tek sözleşmeyle 100+ parça, yıllık paket fiyat, sınırsız kullanım' },
              { n: '03', t: 'Özel talep', d: 'Kampanyanıza özel prompt brief\'i → 48 saatte seçilmiş havuz' },
              { n: '04', t: 'White-label', d: 'Kendi platformunuza YAZSAD kataloğunu API ile entegre edin' },
            ].map(c => (
              <div key={c.n} style={{ padding: 20, background: 'var(--bg-elev)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
                <div className="mono" style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 600, marginBottom: 8 }}>{c.n}</div>
                <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>{c.t}</div>
                <div style={{ fontSize: 12, color: 'var(--fg-muted)', lineHeight: 1.6 }}>{c.d}</div>
              </div>
            ))}
          </div>

          <div className="panel" style={{ padding: 28 }}>
            <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 16 }}>Kullanım Senaryoları</div>
            <div style={{ display: 'grid', gap: 14 }}>
              {[
                { k: 'Reklam Ajansı', q: '"30 saniyelik enerjik, folk esintili, kadın vokal — 14 gün sonra teslim"', price: '₺4,500 - ₺12,000' },
                { k: 'Yayın Platformu', q: '"Dizi skoru için 60 parça, cinematic, orchestral + elektronik füzyon"', price: '₺45,000 - ₺120,000' },
                { k: 'Oyun Stüdyosu', q: '"Oyun-içi loop müzik · 20 parça, adaptif, 2-3 dk, seamless loop"', price: '₺18,000 - ₺35,000' },
                { k: 'Podcast Yapımcısı', q: '"Podcast intro + outro + 5 bumper, aynı DNA, farklı enerji seviyeleri"', price: '₺1,200 - ₺2,800' },
              ].map((s, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '160px 1fr 140px', gap: 20, padding: '12px 0', borderBottom: i < 3 ? '1px solid var(--border)' : 'none', alignItems: 'center' }}>
                  <div className="mono" style={{ fontSize: 11, color: 'var(--fg)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.k}</div>
                  <div style={{ fontSize: 12, color: 'var(--fg-muted)', fontStyle: 'italic' }}>{s.q}</div>
                  <div className="mono" style={{ fontSize: 11, color: 'var(--accent)', textAlign: 'right', fontWeight: 600 }}>{s.price}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {tab === 'search' && <B2BSearch />}
      {tab === 'licenses' && <B2BLicenses />}
      {tab === 'clients' && <B2BClients />}
      {tab === 'api' && <B2BAPI />}
    </div>
  );
};

const B2BSearch = () => {
  const [bpmRange, setBpmRange] = React.useState([80, 140]);
  const [duration, setDuration] = React.useState([15, 240]);

  return (
    <div>
      <div className="panel" style={{ padding: 24, marginBottom: 20 }}>
        <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 20 }}>Gelişmiş filtreler</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
          <div>
            <label style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--fg-muted)', display: 'block', marginBottom: 8 }}>Mood</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {['Enerjik', 'Melankolik', 'Gerilim', 'Sakin', 'Neşeli', 'Epik', 'Romantik', 'Distopik', 'Nostaljik'].map(m => (
                <button key={m} style={{ padding: '5px 11px', background: 'var(--bg-elev-2)', border: '1px solid var(--border)', borderRadius: 14, fontSize: 11, color: 'var(--fg)', cursor: 'pointer' }}>{m}</button>
              ))}
            </div>
          </div>
          <div>
            <label style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--fg-muted)', display: 'block', marginBottom: 8 }}>Enstrüman</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {['Bağlama', 'Ud', 'Ney', 'Piyano', 'Yaylılar', 'Synth', 'Davul', 'Bas', 'Gitar', 'Vokal'].map(m => (
                <button key={m} style={{ padding: '5px 11px', background: 'var(--bg-elev-2)', border: '1px solid var(--border)', borderRadius: 14, fontSize: 11, color: 'var(--fg)', cursor: 'pointer' }}>{m}</button>
              ))}
            </div>
          </div>
          <div>
            <label style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--fg-muted)', display: 'block', marginBottom: 8 }}>BPM · {bpmRange[0]}-{bpmRange[1]}</label>
            <input type="range" min="40" max="200" value={bpmRange[0]} onChange={(e) => setBpmRange([parseInt(e.target.value), bpmRange[1]])} style={{ width: '100%', accentColor: 'var(--accent)' }} />
            <input type="range" min="40" max="200" value={bpmRange[1]} onChange={(e) => setBpmRange([bpmRange[0], parseInt(e.target.value)])} style={{ width: '100%', accentColor: 'var(--accent)' }} />
          </div>
          <div>
            <label style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--fg-muted)', display: 'block', marginBottom: 8 }}>Süre · {duration[0]}s - {Math.floor(duration[1]/60)}:{(duration[1]%60).toString().padStart(2,'0')}</label>
            <input type="range" min="5" max="600" value={duration[1]} onChange={(e) => setDuration([duration[0], parseInt(e.target.value)])} style={{ width: '100%', accentColor: 'var(--accent)' }} />
          </div>
        </div>

        <div style={{ marginTop: 20, padding: 16, background: 'var(--bg-elev-2)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="mono" style={{ fontSize: 12 }}>
            <span style={{ color: 'var(--fg-muted)' }}>Eşleşme:</span> <span style={{ color: 'var(--accent)', fontWeight: 600 }}>347 parça</span> · tahmini toplam lisans: <span style={{ color: 'var(--fg)', fontWeight: 600 }}>₺142,000</span>
          </div>
          <button className="btn btn-primary">Sonuçları Önizle</button>
        </div>
      </div>

      <div style={{ padding: 16, background: 'var(--accent-soft)', border: '1px solid var(--accent)', borderRadius: 'var(--radius-md)', fontSize: 13, color: 'var(--fg)', lineHeight: 1.5 }}>
        <strong style={{ color: 'var(--accent)' }}>B2B Hesap Gerekli:</strong> Toplu dışa aktarım, fiyat teklifi, sözleşme imzalama için kurumsal doğrulama yapılır. İşlem ~24 saatte tamamlanır.
      </div>
    </div>
  );
};

const B2BLicenses = () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
    {[
      { name: 'Sync Lisans', price: '₺450/parça', desc: 'Tek bir yapımda (reklam, film, dizi) kullanım', features: ['Tek kullanım', '2 yıl geçerli', 'Atıf zorunlu', 'Sosyal medya dahil'] },
      { name: 'Kurumsal Abonelik', price: '₺12,000/ay', desc: 'Aylık sınırsız indirme + yayın hakkı', features: ['Sınırsız indirme', 'Tüm kanallarda kullanım', 'Öncelikli destek', 'Özel talep 5/ay'], featured: true },
      { name: 'Buyout', price: '₺8,000-₺45,000', desc: 'Eser sahipliği + tüm haklar devri', features: ['Tam sahiplik', 'Süresiz', 'Global', 'Sanatçı + dernek onayı şart'] },
      { name: 'White-label', price: 'Özel fiyat', desc: 'Kendi platformunuza API entegrasyonu', features: ['API erişimi', 'Kendi markanız', 'Dernek onayı şart', 'Minimum 12 ay'] },
    ].map(l => (
      <div key={l.name} style={{ padding: 24, background: l.featured ? 'linear-gradient(135deg, var(--accent-soft), var(--bg-elev))' : 'var(--bg-elev)', border: l.featured ? '2px solid var(--accent)' : '1px solid var(--border)', borderRadius: 'var(--radius-lg)', position: 'relative' }}>
        {l.featured && <div style={{ position: 'absolute', top: -10, left: 20, padding: '3px 10px', background: 'var(--accent)', color: 'var(--accent-fg)', borderRadius: 10, fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>POPÜLER</div>}
        <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>{l.name}</div>
        <div className="display" style={{ fontSize: 26, fontWeight: 500, color: 'var(--accent)', marginBottom: 8 }}>{l.price}</div>
        <div style={{ fontSize: 12, color: 'var(--fg-muted)', marginBottom: 16, lineHeight: 1.5 }}>{l.desc}</div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {l.features.map(f => (
            <li key={f} style={{ fontSize: 12, padding: '4px 0', display: 'flex', alignItems: 'center', gap: 8, color: 'var(--fg)' }}>
              <span style={{ color: 'var(--success)' }}>✓</span> {f}
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

const B2BClients = () => {
  const clients = [
    { name: 'Doğuş Yayıncılık', type: 'Yayın Kuruluşu', since: '2025', usage: '340 parça · 4 dizi skoru' },
    { name: 'BKM Reklam Ajansı', type: 'Reklam', since: '2025', usage: '82 parça · 12 kampanya' },
    { name: 'Karınca Film', type: 'Yapım', since: '2026', usage: '28 parça · 2 belgesel' },
    { name: 'Oyun Stüdyosu X', type: 'Oyun', since: '2026', usage: '15 parça · 1 oyun' },
    { name: 'Podcast Network', type: 'Ses İçerik', since: '2025', usage: '48 parça · 8 dizi' },
    { name: 'Ulusal Marka', type: 'Marka (NDA)', since: '2026', usage: '—' },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12 }}>
      {clients.map(c => (
        <div key={c.name} style={{ padding: 20, background: 'var(--bg-elev)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{c.name}</div>
          <div className="mono" style={{ fontSize: 10, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>{c.type} · {c.since}</div>
          <div style={{ fontSize: 12, color: 'var(--fg-muted)' }}>{c.usage}</div>
        </div>
      ))}
    </div>
  );
};

const B2BAPI = () => (
  <div>
    <div className="panel" style={{ padding: 24, marginBottom: 20 }}>
      <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>Örnek istek</div>
      <pre style={{ background: '#0a0a0a', color: '#d4d4d4', padding: 20, borderRadius: 'var(--radius-md)', fontSize: 12, fontFamily: 'var(--font-mono)', overflow: 'auto', lineHeight: 1.7, margin: 0 }}>
{`POST https://api.yazsad.org/v1/search
Authorization: Bearer sk_b2b_*****

{
  "mood": ["enerjik", "nostaljik"],
  "bpm": [90, 130],
  "duration_sec": [30, 120],
  "instruments": ["bağlama", "synth"],
  "license": "sync",
  "limit": 50
}

→ 200 OK
{
  "matches": 47,
  "results": [
    {
      "id": "trk_a4b7",
      "title": "Lodos",
      "artist": "Anatolian Lab",
      "preview_url": "...",
      "license_price_try": 450
    }
  ]
}`}
      </pre>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
      {[
        { e: 'POST /v1/search', d: 'Filtreli arama' },
        { e: 'GET /v1/track/:id', d: 'Parça detayı' },
        { e: 'POST /v1/license', d: 'Lisans başlat' },
        { e: 'POST /v1/webhook', d: 'Bildirim kaydı' },
        { e: 'GET /v1/usage', d: 'Kullanım raporu' },
        { e: 'POST /v1/brief', d: 'Özel talep gönder' },
      ].map(e => (
        <div key={e.e} style={{ padding: 12, background: 'var(--bg-elev)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}>
          <div className="mono" style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 600 }}>{e.e}</div>
          <div style={{ fontSize: 11, color: 'var(--fg-muted)', marginTop: 2 }}>{e.d}</div>
        </div>
      ))}
    </div>
  </div>
);

Object.assign(window, { AIAssistantPage, AIBubble, AIAssistantPanel, B2BPage });
