// Sidebar nav + topbar

const Sidebar = ({ route, setRoute, mobileOpen, setMobileOpen }) => {
  const modules = (window.__yazsadGetModules && window.__yazsadGetModules()) || (typeof loadModules === 'function' ? loadModules() : {});
  const isOn = (id) => {
    const m = modules[id];
    return !m || m.locked || moduleAccessible(m, 'user');
  };
  const navSections = [
    {
      label: 'Keşif',
      items: [
        { id: 'home', label: 'Ana Sayfa', icon: IHome },
        { id: 'discover', label: 'Keşfet', icon: ICompass },
        { id: 'marketplace', label: 'Marketplace', icon: ICart },
        { id: 'promptmarket', label: 'Prompt Pazarı', icon: IEdit, badge: 'YENİ' },
        { id: 'remix', label: 'Remix Studio', icon: IMusic },
        { id: 'clips', label: 'Klipler', icon: IVideo },
        { id: 'radio', label: 'Radyo', icon: IMusic },
        { id: 'playlist', label: 'Playlist', icon: ILibrary },
        { id: 'livesessions', label: 'Canlı Oturum', icon: IVideo, badge: '●' },
        { id: 'chat', label: 'Sohbet', icon: IMsg },
        { id: 'contest', label: 'Yarışma', icon: IFire, badge: 'YENİ' },
        { id: 'news', label: 'Haberler', icon: INews, badge: 3 },
        { id: 'forum', label: 'Forum', icon: IForum, badge: '12' },
      ],
    },
    {
      label: 'Kütüphanem',
      items: [
        { id: 'library', label: 'Kütüphane', icon: ILibrary },
        { id: 'profile', label: 'Profil', icon: IUsers },
        { id: 'upload', label: 'Parça Yükle', icon: IUpload },
        { id: 'compliance', label: 'Uyumluluk Taraması', icon: ICheck },
        { id: 'models', label: 'Model Keşfi', icon: ICompass },
        { id: 'lineage', label: 'Soy Ağacı', icon: ILibrary },
        { id: 'styledna', label: 'Stil DNA', icon: IFire },
        { id: 'aiassist', label: 'AI Asistan', icon: IMsg, badge: 'β' },
        { id: 'notifications', label: 'Bildirimler', icon: IBell, badge: '3' },
      ],
    },
    {
      label: 'Hesap',
      items: [
        { id: 'association', label: 'Dernek', icon: ICheck },
        { id: 'b2b', label: 'B2B Portal', icon: ICart },
        { id: 'settings', label: 'Ayarlar', icon: ISettings },
        { id: 'admin', label: 'Yönetim', icon: IAdmin },
      ],
    },
  ];

  return (
    <>
      {mobileOpen && <div className="sidebar-scrim" onClick={() => setMobileOpen && setMobileOpen(false)} />}
      <aside className={`sidebar ${mobileOpen ? 'is-open' : ''}`}>
      <div className="logo">
        <div className="logo-mark">Y/</div>
        <div>
          <div className="logo-name">YAZSAD</div>
          <div className="logo-sub">AI Sanatçıları</div>
        </div>
      </div>

      {navSections.map((sec, si) => {
        const items = sec.items.filter(it => isOn(it.module || it.id));
        if (items.length === 0) return null;
        return (
        <div key={si}>
          <div className="nav-label">{sec.label}</div>
          <div className="nav-section">
            {items.map((item) => {
              const Icn = item.icon;
              const active = route === item.id;
              return (
                <div key={item.id} className={`nav-item ${active ? 'active' : ''}`} onClick={() => setRoute(item.id)}>
                  <Icn size={18} />
                  <span className="nav-item-label">{item.label}</span>
                  {item.badge && <span className="nav-badge">{item.badge}</span>}
                </div>
              );
            })}
          </div>
        </div>
        );
      })}

      <div style={{ marginTop: 'auto', padding: 'var(--dens-4)' }}>
        <div style={{
          padding: 'var(--dens-4)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)',
          fontSize: 11,
          color: 'var(--fg-muted)',
          lineHeight: 1.5,
        }}>
          <div style={{ color: 'var(--fg)', fontWeight: 600, fontSize: 12, marginBottom: 4, fontFamily: 'var(--font-mono)' }}>
            Üye ol
          </div>
          Derneğe katıl, haklarını koru. 2026 aidat: ₺640
          <button className="btn btn-primary" onClick={() => setRoute('membership')} style={{ width: '100%', marginTop: 10, fontSize: 11, padding: '6px 12px' }}>
            Başvuru
          </button>
        </div>
      </div>
    </aside>
    </>
  );
};

const Topbar = ({ route, searchQuery, setSearchQuery, onSearchSubmit, auth, userMenuOpen, setUserMenuOpen, onOpenAuth, onLogout, setRoute, onOpenSidebar }) => {
  const routeLabels = {
    home: { eyebrow: 'Giriş', title: 'Ana Sayfa' },
    discover: { eyebrow: 'Katalog', title: 'Keşfet' },
    search: { eyebrow: 'Arama', title: searchQuery ? `"${searchQuery}"` : 'Arama' },
    marketplace: { eyebrow: 'Ticaret', title: 'Marketplace' },
    cart: { eyebrow: 'Ticaret', title: 'Sepet & Ödeme' },
    clips: { eyebrow: 'Video', title: 'AI Klipler' },
    contest: { eyebrow: 'Topluluk', title: 'Yarışma' },
    news: { eyebrow: 'Yayın', title: 'Haberler' },
    forum: { eyebrow: 'Topluluk', title: 'Forum' },
    library: { eyebrow: 'Hesap', title: 'Kütüphane' },
    profile: { eyebrow: 'Sanatçı', title: 'Profil' },
    upload: { eyebrow: 'Sanatçı', title: 'Parça Yükle' },
    notifications: { eyebrow: 'Hesap', title: 'Bildirimler' },
    settings: { eyebrow: 'Hesap', title: 'Ayarlar' },
    admin: { eyebrow: 'Panel', title: 'Yönetim' },
  };
  const r = routeLabels[route] || { eyebrow: '', title: '' };
  const [focused, setFocused] = React.useState(false);
  const inputRef = React.useRef(null);

  // Cmd/Ctrl+K keyboard shortcut
  React.useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }
      if (e.key === 'Escape' && document.activeElement === inputRef.current) {
        inputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value && route !== 'search') onSearchSubmit();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchSubmit();
  };

  const isMac = typeof navigator !== 'undefined' && /Mac/.test(navigator.platform);

  return (
    <header className="topbar">
      <button className="sidebar-toggle btn-icon" onClick={onOpenSidebar} aria-label="Menüyü aç" style={{ display: 'none' }}>
        <span style={{ width: 14, height: 10, display: 'inline-flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <span style={{ width: '100%', height: 1.5, background: 'currentColor' }} />
          <span style={{ width: '100%', height: 1.5, background: 'currentColor' }} />
          <span style={{ width: '100%', height: 1.5, background: 'currentColor' }} />
        </span>
      </button>
      <div className="topbar-crumb" style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0, whiteSpace: 'nowrap' }}>
        <span className="mono" style={{ fontSize: 10, color: 'var(--fg-dim)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          {r.eyebrow} /
        </span>
        <span style={{ fontSize: 13, fontWeight: 600 }}>{r.title}</span>
      </div>

      <form onSubmit={handleSubmit} className="search" style={{ position: 'relative' }}>
        <ISearch size={16} />
        <input
          ref={inputRef}
          value={searchQuery}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          placeholder="Parça, sanatçı, haber ara…"
        />
        {!focused && !searchQuery && (
          <kbd style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-dim)', background: 'var(--bg-elev-2)', border: '1px solid var(--border)', borderRadius: 4, padding: '2px 6px', pointerEvents: 'none' }}>
            {isMac ? '⌘' : 'Ctrl'} K
          </kbd>
        )}
        {searchQuery && (
          <button type="button" onClick={() => setSearchQuery('')} className="btn-icon" style={{ position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)', width: 24, height: 24 }}>
            <IX size={12} />
          </button>
        )}
        <style dangerouslySetInnerHTML={{ __html: '.search > svg { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--fg-dim); pointer-events: none; z-index: 1; }' }} />
      </form>

      <div className="topbar-user" style={{ marginLeft: 'auto', position: 'relative' }}>
        <button className="btn-icon" onClick={() => window.__yazsadGo && window.__yazsadGo('notifications')}><IBell size={16} /></button>
        <button className="btn-icon" onClick={() => window.__yazsadGo && window.__yazsadGo('cart')}><ICart size={16} /></button>
        <div style={{ width: 1, height: 20, background: 'var(--border)', margin: '0 6px' }} />

        {auth && auth.state === 'user' ? (
          <>
            <div
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', padding: '2px 6px', borderRadius: 'var(--radius-xs)' }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <div className="avatar" style={{ background: 'linear-gradient(135deg, var(--accent), #7c3aed)', flexShrink: 0 }}>
                {(auth.name || '?').split(' ').map(w => w[0]).slice(0,2).join('').toUpperCase()}
              </div>
              <div className="topbar-user-label">
                <div style={{ fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap' }}>{auth.name}</div>
                <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', whiteSpace: 'nowrap' }}>
                  {auth.role === 'member' ? 'Üye' : auth.role === 'artist' ? 'Sanatçı' : 'Dinleyici'}
                </div>
              </div>
            </div>
            {userMenuOpen && <>
              <div onClick={() => setUserMenuOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 99 }} />
              <UserMenu auth={auth} setRoute={setRoute} onLogout={onLogout} onOpenAuth={onOpenAuth} onClose={() => setUserMenuOpen(false)} />
            </>}
          </>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button className="btn btn-ghost" style={{ fontSize: 12, padding: '6px 12px' }} onClick={() => onOpenAuth('login')}>Giriş</button>
            <button className="btn btn-primary" style={{ fontSize: 12, padding: '6px 14px' }} onClick={() => onOpenAuth('signup')}>Kayıt Ol</button>
          </div>
        )}
      </div>
    </header>
  );
};

Object.assign(window, { Sidebar, Topbar });
