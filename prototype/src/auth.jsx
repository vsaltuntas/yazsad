// Auth — login, signup, guest mode, membership application

const AUTH_ROLES = [
  { id: 'listener', label: 'Dinleyici', desc: 'Parça dinle, kütüphane oluştur, topluluk takip et', badge: 'Ücretsiz' },
  { id: 'artist',   label: 'Sanatçı',   desc: 'Parça yükle, sat, portföy oluştur, yorumla', badge: 'Ücretsiz + Komisyon %15' },
  { id: 'member',   label: 'Dernek Üyesi', desc: 'Sanatçı + oylama hakkı + dernek karar süreci + etik koruma', badge: 'Aidat ₺640/yıl' },
];

const loadAuth = () => {
  try {
    const s = JSON.parse(localStorage.getItem('yazsad-auth') || 'null');
    return s || { state: 'guest', name: null, handle: null, role: null, avatar: null };
  } catch { return { state: 'guest' }; }
};

const saveAuth = (a) => localStorage.setItem('yazsad-auth', JSON.stringify(a));

const AuthModal = ({ open, mode, setMode, onClose, onAuth }) => {
  const [step, setStep] = React.useState(1);
  const [email, setEmail] = React.useState('');
  const [pw, setPw] = React.useState('');
  const [name, setName] = React.useState('');
  const [handle, setHandle] = React.useState('');
  const [role, setRole] = React.useState('listener');
  const [agree, setAgree] = React.useState(false);

  React.useEffect(() => { if (open) setStep(1); }, [open, mode]);

  if (!open) return null;

  const canContinue = mode === 'login'
    ? email.includes('@') && pw.length >= 4
    : step === 1 ? email.includes('@') && pw.length >= 4 && agree
      : step === 2 ? name.trim().length >= 2 && handle.trim().length >= 3
      : true;

  const handleSubmit = () => {
    if (mode === 'login') {
      onAuth({ state: 'user', name: email.split('@')[0], handle: '@' + email.split('@')[0].toLowerCase(), role: 'listener', email });
      onClose();
      return;
    }
    if (step < 3) { setStep(step + 1); return; }
    // Finish
    onAuth({ state: 'user', name, handle: handle.startsWith('@') ? handle : '@' + handle, role, email });
    onClose();
  };

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
        zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20, backdropFilter: 'blur(6px)',
      }}>
      <div style={{
        width: '100%', maxWidth: 460, background: 'var(--bg-elev)',
        border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)',
        padding: 32, position: 'relative', maxHeight: '90vh', overflow: 'auto',
      }}>
        <button onClick={onClose} className="btn-icon" style={{ position: 'absolute', top: 14, right: 14 }}>
          <IX size={16} />
        </button>

        {/* Header / Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-sm)', background: 'var(--accent)', color: 'var(--accent-fg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 16 }}>Y/</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.02em' }}>YAZSAD</div>
            <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Yapay Zeka Sanatçıları Derneği</div>
          </div>
        </div>

        {/* Tab switch */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 28, padding: 3, background: 'var(--bg-elev-2)', borderRadius: 'var(--radius-sm)' }}>
          <button
            onClick={() => { setMode('login'); setStep(1); }}
            style={{
              flex: 1, padding: '8px 12px', fontSize: 12, fontWeight: 600,
              background: mode === 'login' ? 'var(--bg-elev)' : 'transparent',
              color: mode === 'login' ? 'var(--fg)' : 'var(--fg-muted)',
              border: 'none', borderRadius: 'var(--radius-xs)', cursor: 'pointer',
              boxShadow: mode === 'login' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
            }}>Giriş Yap</button>
          <button
            onClick={() => { setMode('signup'); setStep(1); }}
            style={{
              flex: 1, padding: '8px 12px', fontSize: 12, fontWeight: 600,
              background: mode === 'signup' ? 'var(--bg-elev)' : 'transparent',
              color: mode === 'signup' ? 'var(--fg)' : 'var(--fg-muted)',
              border: 'none', borderRadius: 'var(--radius-xs)', cursor: 'pointer',
              boxShadow: mode === 'signup' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
            }}>Kayıt Ol</button>
        </div>

        {/* Progress for signup */}
        {mode === 'signup' && (
          <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
            {[1,2,3].map(n => (
              <div key={n} style={{ flex: 1, height: 3, borderRadius: 2, background: n <= step ? 'var(--accent)' : 'var(--border)' }} />
            ))}
          </div>
        )}

        <h2 className="display" style={{ fontSize: 24, fontWeight: 500, marginBottom: 6 }}>
          {mode === 'login' ? 'Tekrar hoş geldin' : step === 1 ? 'Hesap oluştur' : step === 2 ? 'Kendini tanıt' : 'Ne yapacaksın?'}
        </h2>
        <p style={{ fontSize: 13, color: 'var(--fg-muted)', marginBottom: 24, lineHeight: 1.5 }}>
          {mode === 'login' ? 'Kütüphanen, üyelik durumun ve kuyruğun senin için hazır.' :
            step === 1 ? 'E-posta ile hızlıca başla. Sosyal girişler yakında.' :
            step === 2 ? 'Profil bilgilerini sonradan düzenleyebilirsin.' :
            'Rolünü şimdi seç — istediğin zaman değiştirebilirsin.'}
        </p>

        {/* Step 1 / Login */}
        {(mode === 'login' || step === 1) && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>E-posta</label>
              <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="sen@ornek.com" type="email" style={{ width: '100%' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Şifre</label>
              <input className="input" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="••••••••" type="password" style={{ width: '100%' }} />
            </div>
            {mode === 'signup' && (
              <label style={{ display: 'flex', gap: 10, fontSize: 12, color: 'var(--fg-muted)', lineHeight: 1.5, cursor: 'pointer', userSelect: 'none', marginTop: 4 }}>
                <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} style={{ marginTop: 2 }} />
                <span><a style={{ color: 'var(--accent)' }}>Kullanım koşullarını</a> ve <a style={{ color: 'var(--accent)' }}>gizlilik politikasını</a> kabul ediyorum. YAZSAD etik çerçevesini okudum.</span>
              </label>
            )}

            {/* Socials */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '8px 0' }}>
              <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
              <span className="mono" style={{ fontSize: 10, color: 'var(--fg-dim)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>veya</span>
              <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <button className="btn btn-ghost" style={{ fontSize: 12, gap: 8, justifyContent: 'center' }}>
                <svg width="14" height="14" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                Google
              </button>
              <button className="btn btn-ghost" style={{ fontSize: 12, gap: 8, justifyContent: 'center' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
                Apple
              </button>
            </div>
          </div>
        )}

        {/* Step 2 — profile */}
        {mode === 'signup' && step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, padding: '16px 0' }}>
              <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent), #7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 700, color: 'white' }}>
                {(name || email[0] || '?').slice(0,2).toUpperCase()}
              </div>
              <button className="chip" style={{ fontSize: 11 }}>Fotoğraf yükle</button>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Görünen ad</label>
              <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Örn: Deniz Eldem" style={{ width: '100%' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Kullanıcı adı</label>
              <input className="input" value={handle} onChange={(e) => setHandle(e.target.value.replace(/[^a-z0-9_]/gi, '').toLowerCase())} placeholder="@denizeldem" style={{ width: '100%', fontFamily: 'var(--font-mono)' }} />
              <div style={{ fontSize: 11, color: 'var(--fg-muted)', marginTop: 6 }}>yazsad.org.tr/<span className="mono">{handle || 'kullaniciadi'}</span></div>
            </div>
          </div>
        )}

        {/* Step 3 — role */}
        {mode === 'signup' && step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {AUTH_ROLES.map(r => (
              <div
                key={r.id}
                onClick={() => setRole(r.id)}
                style={{
                  padding: 16, cursor: 'pointer',
                  border: role === r.id ? '2px solid var(--accent)' : '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  background: role === r.id ? 'var(--accent-soft)' : 'var(--bg-elev-2)',
                  display: 'flex', alignItems: 'flex-start', gap: 14,
                }}>
                <div style={{
                  width: 20, height: 20, borderRadius: '50%',
                  border: '2px solid ' + (role === r.id ? 'var(--accent)' : 'var(--border)'),
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginTop: 2, flexShrink: 0,
                }}>
                  {role === r.id && <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--accent)' }} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{r.label}</div>
                    <span className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{r.badge}</span>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--fg-muted)', lineHeight: 1.5 }}>{r.desc}</div>
                </div>
              </div>
            ))}
            {role === 'member' && (
              <div style={{ padding: 12, fontSize: 11, color: 'var(--fg-muted)', background: 'var(--bg-elev-2)', borderRadius: 'var(--radius-sm)', lineHeight: 1.5 }}>
                <strong style={{ color: 'var(--fg)' }}>Not:</strong> Dernek üyeliği yönetim onayına tabidir. Kayıttan sonra hesabın "sanatçı" olarak açılır, başvurunu gönderdikten sonra üyelik kararı 7 iş günü içinde bildirilir.
              </div>
            )}
          </div>
        )}

        <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
          {mode === 'signup' && step > 1 && (
            <button className="btn btn-ghost" style={{ fontSize: 12 }} onClick={() => setStep(step - 1)}>← Geri</button>
          )}
          <button
            className="btn btn-primary"
            disabled={!canContinue}
            onClick={handleSubmit}
            style={{ flex: 1, fontSize: 13, fontWeight: 600, opacity: canContinue ? 1 : 0.5 }}>
            {mode === 'login' ? 'Giriş Yap' : step === 3 ? 'Tamamla' : 'Devam Et →'}
          </button>
        </div>

        {mode === 'login' && (
          <div style={{ textAlign: 'center', marginTop: 16, fontSize: 12, color: 'var(--fg-muted)' }}>
            <a style={{ color: 'var(--accent)' }}>Şifremi unuttum</a>
          </div>
        )}
      </div>
    </div>
  );
};

const UserMenu = ({ auth, setRoute, onLogout, onOpenAuth, onClose }) => {
  const isGuest = auth.state !== 'user';
  const items = isGuest ? [
    { id: 'login', label: 'Giriş Yap', icon: IArrow, onClick: () => { onOpenAuth('login'); onClose(); } },
    { id: 'signup', label: 'Hesap Oluştur', icon: IPlus, onClick: () => { onOpenAuth('signup'); onClose(); }, primary: true },
  ] : [
    { id: 'profile', label: 'Profil', icon: IUsers, onClick: () => { setRoute('profile'); onClose(); } },
    { id: 'library', label: 'Kütüphane', icon: ILibrary, onClick: () => { setRoute('library'); onClose(); } },
    { id: 'settings', label: 'Ayarlar', icon: ISettings, onClick: () => { setRoute('settings'); onClose(); } },
    { divider: true },
    { id: 'membership', label: 'Üyelik Başvurusu', icon: ICheck, onClick: () => { setRoute('membership'); onClose(); } },
    { divider: true },
    { id: 'logout', label: 'Çıkış Yap', icon: IX, onClick: () => { onLogout(); onClose(); }, danger: true },
  ];

  return (
    <div style={{
      position: 'absolute', top: 'calc(100% + 8px)', right: 0,
      minWidth: 240, background: 'var(--bg-elev)',
      border: '1px solid var(--border)', borderRadius: 'var(--radius-md)',
      padding: 6, zIndex: 100, boxShadow: '0 12px 32px rgba(0,0,0,0.4)',
    }}>
      {!isGuest && (
        <div style={{ padding: '10px 12px 12px', borderBottom: '1px solid var(--border)', marginBottom: 4 }}>
          <div style={{ fontSize: 13, fontWeight: 600 }}>{auth.name}</div>
          <div className="mono" style={{ fontSize: 11, color: 'var(--fg-muted)' }}>{auth.handle}</div>
          <div className="mono" style={{ fontSize: 9, color: 'var(--fg-dim)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 4 }}>
            {AUTH_ROLES.find(r => r.id === auth.role)?.label || 'Dinleyici'}
          </div>
        </div>
      )}
      {isGuest && (
        <div style={{ padding: '10px 12px 12px', borderBottom: '1px solid var(--border)', marginBottom: 4 }}>
          <div style={{ fontSize: 13, fontWeight: 600 }}>Misafir</div>
          <div style={{ fontSize: 11, color: 'var(--fg-muted)', marginTop: 2, lineHeight: 1.4 }}>Parça dinle ve oku. Yükleme, sepete ekleme ve yorum için giriş yap.</div>
        </div>
      )}
      {items.map((it, i) => it.divider ? (
        <div key={'d'+i} style={{ height: 1, background: 'var(--border)', margin: '4px 0' }} />
      ) : (
        <button
          key={it.id}
          onClick={it.onClick}
          style={{
            display: 'flex', alignItems: 'center', gap: 10, width: '100%',
            padding: '9px 12px', border: 'none', borderRadius: 'var(--radius-sm)',
            background: it.primary ? 'var(--accent)' : 'transparent',
            color: it.primary ? 'var(--accent-fg)' : it.danger ? 'var(--danger)' : 'var(--fg)',
            fontSize: 12, fontWeight: it.primary ? 600 : 500,
            cursor: 'pointer', textAlign: 'left',
          }}
          onMouseEnter={(e) => { if (!it.primary) e.currentTarget.style.background = 'var(--bg-hover)'; }}
          onMouseLeave={(e) => { if (!it.primary) e.currentTarget.style.background = 'transparent'; }}
        >
          <it.icon size={13} />
          {it.label}
        </button>
      ))}
    </div>
  );
};

Object.assign(window, { AUTH_ROLES, loadAuth, saveAuth, AuthModal, UserMenu });
