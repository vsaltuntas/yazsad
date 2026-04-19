// Floating feedback widget — bottom-right button + modal

const FeedbackWidget = () => {
  const [open, setOpen] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const [rating, setRating] = React.useState(0);
  const [category, setCategory] = React.useState('genel');
  const [message, setMessage] = React.useState('');
  const [email, setEmail] = React.useState('');

  const categories = [
    { id: 'genel', label: 'Genel izlenim', icon: '💬' },
    { id: 'bug', label: 'Hata / Bug', icon: '🐞' },
    { id: 'öneri', label: 'Özellik önerisi', icon: '💡' },
    { id: 'tasarım', label: 'Tasarım / UX', icon: '🎨' },
    { id: 'etik', label: 'AI etik kaygısı', icon: '⚖️' },
  ];

  const reset = () => {
    setSent(false);
    setRating(0);
    setCategory('genel');
    setMessage('');
    setEmail('');
  };

  const submit = async () => {
    const payload = { rating, category, message, email };
    console.log('[YAZSAD Feedback]', { ...payload, ts: new Date().toISOString() });
    try {
      const key = 'yazsad-feedback-log';
      const arr = JSON.parse(localStorage.getItem(key) || '[]');
      arr.push({ ...payload, ts: Date.now() });
      localStorage.setItem(key, JSON.stringify(arr));
    } catch (e) {}
    // Send to Formspree — real email inbox
    try {
      await fetch('https://formspree.io/f/xkokbyel', {
        method: 'POST',
        headers: { 'content-type': 'application/json', 'accept': 'application/json' },
        body: JSON.stringify({
          _subject: `YAZSAD feedback — ${category} — ★${rating}`,
          rating, category, message, email: email || 'anonim',
          url: location.href,
          ua: navigator.userAgent,
        }),
      });
    } catch (e) { /* offline */ }
    setSent(true);
  };

  return (
    <>
      {/* Floating trigger */}
      <button
        className="yz-feedback-btn"
        onClick={() => setOpen(true)}
        aria-label="Geri bildirim"
        style={{
          position: 'fixed', bottom: 110, right: 20, zIndex: 90,
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'var(--fg)', color: 'var(--bg)',
          border: 'none', borderRadius: 999,
          padding: '10px 16px 10px 14px',
          fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 600,
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          transition: 'transform 0.15s, box-shadow 0.15s',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.4)'; }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.3)'; }}
      >
        <span style={{ fontSize: 14 }}>💬</span>
        Geri bildirim
      </button>

      {/* Modal */}
      {open && (
        <div
          onClick={() => { setOpen(false); if (sent) setTimeout(reset, 300); }}
          style={{
            position: 'fixed', inset: 0, zIndex: 1200,
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 20,
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              width: '100%', maxWidth: 520,
              background: 'var(--bg)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
              maxHeight: '85vh', overflow: 'auto',
            }}
          >
            {!sent ? (
              <>
                {/* Header */}
                <div style={{ padding: '20px 24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div className="mono" style={{ fontSize: 10, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 6 }}>
                      Beta · Geri Bildirim
                    </div>
                    <h2 className="display" style={{ fontSize: 24, fontWeight: 500, margin: 0, letterSpacing: '-0.015em' }}>
                      Ne düşünüyorsun?
                    </h2>
                  </div>
                  <button onClick={() => setOpen(false)} className="btn-icon" style={{ width: 32, height: 32 }}>
                    <IX size={14} />
                  </button>
                </div>

                <div style={{ padding: '16px 24px 8px', fontSize: 12, color: 'var(--fg-muted)', lineHeight: 1.6 }}>
                  YAZSAD henüz beta. Fikirlerin, hataların ve önerilerin sistemi gerçekten şekillendiriyor — her geri bildirim ekip tarafından okunur.
                </div>

                <div style={{ padding: '8px 24px 20px', display: 'flex', flexDirection: 'column', gap: 18 }}>
                  {/* Rating */}
                  <div>
                    <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
                      Genel puan
                    </div>
                    <div style={{ display: 'flex', gap: 6 }}>
                      {[1, 2, 3, 4, 5].map(n => (
                        <button
                          key={n}
                          onClick={() => setRating(n)}
                          style={{
                            flex: 1, padding: '14px 8px',
                            background: rating >= n ? 'var(--accent-soft)' : 'var(--bg-elev)',
                            border: `1px solid ${rating >= n ? 'var(--accent)' : 'var(--border)'}`,
                            borderRadius: 'var(--radius-md)',
                            fontSize: 22, cursor: 'pointer',
                            color: rating >= n ? 'var(--accent)' : 'var(--fg-muted)',
                            transition: 'all 0.12s',
                          }}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Category */}
                  <div>
                    <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
                      Kategori
                    </div>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {categories.map(c => (
                        <button
                          key={c.id}
                          onClick={() => setCategory(c.id)}
                          className={`chip ${category === c.id ? 'active' : ''}`}
                          style={{ fontSize: 12 }}
                        >
                          <span style={{ marginRight: 4 }}>{c.icon}</span> {c.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
                      Mesajın
                    </div>
                    <textarea
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      rows="5"
                      placeholder={
                        category === 'bug' ? 'Hata nerede, nasıl tekrar edilir? Hangi tarayıcı?' :
                        category === 'öneri' ? 'Eklenmesini istediğin özellik nedir, neden işine yarar?' :
                        category === 'tasarım' ? 'Hangi ekran, ne rahatsız ediyor ya da ne güzel?' :
                        category === 'etik' ? 'AI kullanımı, şeffaflık veya hak konularında kaygın?' :
                        'Dikkatini çeken her şeyi yaz — sistemi birlikte iyileştirelim.'
                      }
                      className="input"
                      style={{ resize: 'vertical', lineHeight: 1.55, fontSize: 13, minHeight: 110 }}
                    />
                    <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textAlign: 'right', marginTop: 6 }}>
                      {message.length} karakter
                    </div>
                  </div>

                  {/* Email (optional) */}
                  <div>
                    <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
                      E-posta (opsiyonel · dönüş için)
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="sen@örnek.com"
                      className="input"
                      style={{ fontSize: 13 }}
                    />
                  </div>

                  {/* Footer */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTop: '1px solid var(--border)' }}>
                    <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)' }}>
                      🔒 Anonim olarak iletilir
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button className="btn btn-ghost" onClick={() => setOpen(false)}>İptal</button>
                      <button
                        className="btn btn-primary"
                        disabled={!message.trim() || rating === 0}
                        onClick={submit}
                        style={{ opacity: (!message.trim() || rating === 0) ? 0.5 : 1 }}
                      >
                        Gönder →
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* Thank-you */
              <div style={{ padding: 40, textAlign: 'center' }}>
                <div style={{
                  width: 64, height: 64, borderRadius: '50%',
                  background: 'var(--accent)', color: 'var(--accent-fg)',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 20,
                }}>
                  <ICheck size={28} />
                </div>
                <h2 className="display" style={{ fontSize: 28, fontWeight: 500, margin: '0 0 10px', letterSpacing: '-0.02em' }}>
                  Teşekkürler!
                </h2>
                <p style={{ fontSize: 13, color: 'var(--fg-muted)', lineHeight: 1.6, maxWidth: 360, margin: '0 auto 24px' }}>
                  Geri bildirimin iletildi. {email ? 'Ekip değerlendirdikten sonra sana e-posta ile dönecek.' : 'İşini gerçekten görüyoruz — her not okunur.'}
                </p>
                <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                  <button className="btn btn-ghost" onClick={reset}>Yeni Bildirim</button>
                  <button className="btn btn-primary" onClick={() => { setOpen(false); setTimeout(reset, 300); }}>Kapat</button>
                </div>
                <div className="mono" style={{ fontSize: 10, color: 'var(--fg-dim)', marginTop: 20, letterSpacing: '0.06em' }}>
                  Referans: #FB-{Date.now().toString(36).toUpperCase().slice(-6)}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

Object.assign(window, { FeedbackWidget });
