// Main app — routing, state, tweaks integration

const ACCENT_COLORS = {
  default: null,
  orange: '#e94e1b',
  red: '#e30a17',
  gold: '#d4a574',
  green: '#00ff88',
  purple: '#7c3aed',
  cyan: '#06b6d4',
};

function App() {
  const defaults = window.__YAZSAD_DEFAULTS || {};
  const [route, setRoute] = React.useState(() => localStorage.getItem('yazsad-route') || 'home');
  const [playing, setPlaying] = React.useState(false);
  const [fullPlayer, setFullPlayer] = React.useState(false);
  const [progress, setProgress] = React.useState(32);
  const [queueOpen, setQueueOpen] = React.useState(false);

  // Player queue
  const q = usePlayerQueue(TRACKS[0]);
  const currentTrack = q.current;

  const [tweaks, setTweaks] = React.useState({
    theme: defaults.theme || 'cinematic',
    density: defaults.density || 'normal',
    cardStyle: defaults.cardStyle || 'grid',
    layout: defaults.layout || 'standard',
    accent: defaults.accent || 'default',
  });
  const [tweaksOpen, setTweaksOpen] = React.useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const [onboardingOpen, setOnboardingOpen] = React.useState(false); // disabled — re-enable after polish
  const [cart, setCart] = React.useState([]);
  const [modules, setModules] = React.useState(() => loadModules());
  const [searchQuery, setSearchQuery] = React.useState('');
  const [auth, setAuth] = React.useState(() => loadAuth());
  const [authModal, setAuthModal] = React.useState({ open: false, mode: 'login' });
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);
  const [toast, setToast] = React.useState(null);

  React.useEffect(() => {
    setMobileSidebarOpen(false);
  }, [route]);

  React.useEffect(() => {
    window.__yazsadGo = setRoute;
    window.__yazsadGetModules = () => modules;
    window.__yazsadSetModules = (m) => setModules(m);
    window.__yazsadAuth = auth;
    window.__yazsadOpenAuth = (mode = 'login') => setAuthModal({ open: true, mode });
    window.__yazsadToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2600); };
    window.__yazsadGuardAction = (action = 'bu işlem') => {
      if (auth.state !== 'user') {
        window.__yazsadToast(`${action} için giriş yapılmalı`);
        setAuthModal({ open: true, mode: 'login' });
        return false;
      }
      return true;
    };
  }, [modules, auth]);

  // Persist auth
  React.useEffect(() => { saveAuth(auth); }, [auth]);

  // Apply tweaks to <html>
  React.useEffect(() => {
    const h = document.documentElement;
    h.dataset.theme = tweaks.theme;
    h.dataset.density = tweaks.density;
    h.dataset.cards = tweaks.cardStyle;
    h.dataset.layout = tweaks.layout;
    // custom accent override
    if (tweaks.accent !== 'default' && ACCENT_COLORS[tweaks.accent]) {
      h.style.setProperty('--accent', ACCENT_COLORS[tweaks.accent]);
      h.style.setProperty('--accent-soft', ACCENT_COLORS[tweaks.accent] + '22');
    } else {
      h.style.removeProperty('--accent');
      h.style.removeProperty('--accent-soft');
    }
  }, [tweaks]);

  // Persist route
  React.useEffect(() => { localStorage.setItem('yazsad-route', route); }, [route]);

  // Edit mode listener (must register BEFORE announcing)
  React.useEffect(() => {
    const onMsg = (e) => {
      if (e.data?.type === '__activate_edit_mode') { setEditMode(true); setTweaksOpen(true); }
      else if (e.data?.type === '__deactivate_edit_mode') { setEditMode(false); setTweaksOpen(false); }
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const setTweak = (k, v) => {
    const next = { ...tweaks, [k]: v };
    setTweaks(next);
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [k]: v } }, '*');
  };

  const handlePlay = (t) => {
    q.playTrack(t);
    setPlaying(true);
    setProgress(0);
  };

  // Fake progress tick + auto-advance on end
  React.useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setProgress(p => {
        if (p >= 99.5) {
          // Auto-advance
          setTimeout(() => {
            if (q.repeat === 'one') { setProgress(0); return; }
            q.playNext();
            setProgress(0);
          }, 0);
          return 0;
        }
        return p + 0.4;
      });
    }, 500);
    return () => clearInterval(id);
  }, [playing, q.index, q.queue.length, q.repeat]);

  // Map routes to module IDs (for gating)
  const routeModule = {
    home: 'home', discover: 'discover', news: 'news', forum: 'forum',
    marketplace: 'marketplace', cart: 'cart', library: 'library',
    upload: 'upload', contest: 'contest', clips: 'clips',
    profile: 'profile', notifications: 'notifications',
    settings: 'settings', admin: 'admin',
    // Faz 2+ routes:
    search: null, login: null, signup: null, membership: null, association: 'association', compliance: 'compliance', models: 'models', // always or module-gated
    promptmarket: 'promptmarket', livesessions: 'livesessions', remix: 'remix',
    chat: 'chat', playlist: 'playlist', radio: 'radio',
    split: 'split', lineage: 'lineage', styledna: 'styledna', earnings: 'earnings',
    ethics: 'ethics', guide: 'guide', assembly: 'assembly', donation: 'donation',
    aiassist: 'aiassist', b2b: 'b2b',
  };

  // Parse dynamic routes (track:t1, album:a1, artist:anatolianlab)
  const [routeKind, routeId] = route.includes(':') ? route.split(':') : [route, null];
  const modId = routeModule[routeKind];
  const mod = modId ? modules[modId] : null;
  const blocked = mod && !moduleAccessible(mod, 'user') && !mod.locked;

  let page;
  if (blocked) {
    page = <ComingSoon mod={mod} />;
  } else if (routeKind === 'track') {
    page = <SinglePage trackId={routeId} onPlay={handlePlay} currentTrack={currentTrack} q={q} setRoute={setRoute} />;
  } else if (routeKind === 'album') {
    page = <AlbumPage albumId={routeId} onPlay={handlePlay} currentTrack={currentTrack} q={q} setRoute={setRoute} cart={cart} setCart={setCart} />;
  } else if (routeKind === 'artist') {
    page = <ArtistPage artistId={routeId} onPlay={handlePlay} currentTrack={currentTrack} q={q} setRoute={setRoute} />;
  } else switch (route) {
    case 'home': page = <HomePage onPlay={handlePlay} currentTrack={currentTrack} q={q} />; break;
    case 'discover': page = <DiscoverPage onPlay={handlePlay} currentTrack={currentTrack} q={q} />; break;
    case 'news': page = <NewsPage />; break;
    case 'forum': page = <ForumPage />; break;
    case 'settings': page = <SettingsPage />; break;
    case 'admin': page = <AdminPage />; break;
    case 'marketplace': page = <MarketplacePage onPlay={handlePlay} setRoute={setRoute} cart={cart} setCart={setCart} />; break;
    case 'cart': page = <CartPage cart={cart} setCart={setCart} setRoute={setRoute} />; break;
    case 'library': page = <LibraryPage onPlay={handlePlay} currentTrack={currentTrack} q={q} />; break;
    case 'upload': page = <UploadPage setRoute={setRoute} />; break;
    case 'contest': page = <ContestPage onPlay={handlePlay} />; break;
    case 'clips': page = <ClipsPage onPlay={handlePlay} />; break;
    case 'profile': page = <ProfilePage onPlay={handlePlay} currentTrack={currentTrack} q={q} />; break;
    case 'notifications': page = <NotificationsPage />; break;
    case 'association': page = <AssociationPage setRoute={setRoute} />; break;
    case 'promptmarket': page = <PromptMarketPage setRoute={setRoute} />; break;
    case 'remix': page = <RemixPage onPlay={handlePlay} />; break;
    case 'compliance': page = <ComplianceScanPage />; break;
    case 'models': page = <ModelExplorerPage setRoute={setRoute} />; break;
    case 'livesessions': page = <LiveSessionsPage />; break;
    case 'playlist': page = <PlaylistPage onPlay={handlePlay} currentTrack={currentTrack} q={q} />; break;
    case 'radio': page = <RadioPage onPlay={handlePlay} currentTrack={currentTrack} q={q} />; break;
    case 'chat': page = <ChatPage />; break;
    case 'lineage': page = <LineagePage onPlay={handlePlay} />; break;
    case 'styledna': page = <StyleDNAPage />; break;
    case 'aiassist': page = <AIAssistantPage />; break;
    case 'b2b': page = <B2BPage setRoute={setRoute} />; break;
    case 'search': page = <SearchPage query={searchQuery} setRoute={setRoute} onPlay={handlePlay} q={q} />; break;
    case 'membership': page = <MembershipPage auth={auth} setRoute={setRoute} />; break;
    default: page = <HomePage onPlay={handlePlay} currentTrack={currentTrack} />;
  }

  return (
    <div className="app" data-screen-label={`YAZSAD · ${route}`}>
      <Sidebar route={route} setRoute={setRoute} mobileOpen={mobileSidebarOpen} setMobileOpen={setMobileSidebarOpen} />
      <Topbar
        route={route}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchSubmit={() => setRoute('search')}
        auth={auth}
        userMenuOpen={userMenuOpen}
        setUserMenuOpen={setUserMenuOpen}
        onOpenAuth={(mode) => setAuthModal({ open: true, mode })}
        onLogout={() => { setAuth({ state: 'guest', name: null, handle: null, role: null }); window.__yazsadToast && window.__yazsadToast('Çıkış yapıldı'); setRoute('home'); }}
        setRoute={setRoute}
        onOpenSidebar={() => setMobileSidebarOpen(true)}
      />
      <main className="main" data-screen-label={route}>{page}</main>
      <div className="player-bar">
        <PlayerBar
          track={currentTrack}
          playing={playing}
          onTogglePlay={() => setPlaying(!playing)}
          onExpand={() => setFullPlayer(true)}
          progress={progress}
          onProgress={setProgress}
          q={q}
          onToggleQueue={() => setQueueOpen(o => !o)}
          queueOpen={queueOpen}
        />
      </div>

      {queueOpen && <QueueDrawer onClose={() => setQueueOpen(false)} q={q} />}

      {fullPlayer && (
        <FullPlayer
          track={currentTrack}
          playing={playing}
          onTogglePlay={() => setPlaying(!playing)}
          onClose={() => setFullPlayer(false)}
          progress={progress}
          onProgress={setProgress}
          q={q}
        />
      )}

      {/* Tweaks FAB (always available; toolbar toggle opens panel) */}
      {!tweaksOpen && (
        <button className="tweaks-fab" onClick={() => setTweaksOpen(true)} title="Tweaks">
          <ISliders size={18} />
        </button>
      )}
      {tweaksOpen && <TweaksPanel tweaks={tweaks} setTweak={setTweak} onClose={() => setTweaksOpen(false)} />}

      <AuthModal
        open={authModal.open}
        mode={authModal.mode}
        setMode={(m) => setAuthModal(a => ({ ...a, mode: m }))}
        onClose={() => setAuthModal({ open: false, mode: 'login' })}
        onAuth={(a) => { setAuth(a); window.__yazsadToast && window.__yazsadToast(`Hoş geldin, ${a.name}`); }}
      />

      {/* Floating AI bubble (always available, hidden on AI page) */}
      {route !== 'aiassist' && auth.state === 'user' && <AIBubble />}

      {/* PWA banner — disabled during beta; re-enable after polish */}
      {/* <PWABanner /> */}

      {onboardingOpen && (
        <OnboardingWizard onComplete={(data) => {
          setOnboardingOpen(false);
          window.__yazsadToast && window.__yazsadToast(`Hoş geldin${data.name ? ', ' + data.name : ''}! Keşif senin için hazırlandı.`);
        }} />
      )}

      <FeedbackWidget />

      {toast && (
        <div className="yz-toast" style={{
          position: 'fixed', bottom: 110, left: '50%', transform: 'translateX(-50%)',
          padding: '10px 18px', background: 'var(--bg-elev)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)', fontSize: 13, fontWeight: 500,
          boxShadow: '0 8px 24px rgba(0,0,0,0.4)', zIndex: 1100,
          animation: 'fadeInUp 0.2s ease',
        }}>{toast}</div>
      )}

      {/* Misafir banner — disabled; user can log in from topbar */}
      {false && auth.state === 'guest' && (
        <div style={{
          position: 'fixed', bottom: 84, left: 24, right: 24,
          maxWidth: 560, margin: '0 auto', padding: '10px 14px',
          background: 'var(--bg-elev)', border: '1px solid var(--accent)',
          borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: 12,
          fontSize: 12, zIndex: 50, boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
        }}>
          <div className="mono" style={{ fontSize: 9, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.12em', padding: '2px 6px', background: 'var(--accent-soft)', borderRadius: 4 }}>MISAFIR</div>
          <span style={{ flex: 1 }}>Tam deneyim için hesap oluştur.</span>
          <button onClick={() => setAuthModal({ open: true, mode: 'login' })} style={{ background: 'transparent', border: 'none', color: 'var(--fg-muted)', fontSize: 12, cursor: 'pointer' }}>Giriş</button>
          <button onClick={() => setAuthModal({ open: true, mode: 'signup' })} className="btn btn-primary" style={{ fontSize: 11, padding: '6px 12px' }}>Kayıt Ol</button>
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
