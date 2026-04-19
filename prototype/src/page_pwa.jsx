// PWA + mobile touches: install prompt, offline banner, keyboard shortcuts

const PWABanner = () => {
  const [shown, setShown] = React.useState(() => {
    try { return !localStorage.getItem('yazsad_pwa_dismissed'); } catch { return true; }
  });
  const [offline, setOffline] = React.useState(!navigator.onLine);

  React.useEffect(() => {
    const onOn = () => setOffline(false);
    const onOff = () => setOffline(true);
    window.addEventListener('online', onOn);
    window.addEventListener('offline', onOff);
    return () => {
      window.removeEventListener('online', onOn);
      window.removeEventListener('offline', onOff);
    };
  }, []);

  const dismiss = () => {
    try { localStorage.setItem('yazsad_pwa_dismissed', '1'); } catch {}
    setShown(false);
  };

  return (
    <>
      {offline && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          padding: '8px 16px', background: 'var(--warn, #f59e0b)', color: '#000',
          fontSize: 12, fontWeight: 600, textAlign: 'center',
          zIndex: 1200, letterSpacing: '0.02em',
        }}>
          ⚡ Çevrimdışısın — önbellekteki parçalar ve sayfalar kullanılabilir
        </div>
      )}
      {shown && !offline && (
        <div style={{
          position: 'fixed', bottom: 140, right: 24,
          width: 300, padding: 16,
          background: 'var(--bg-elev)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)', boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
          zIndex: 55,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--accent)', color: 'var(--accent-fg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>Y/</div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Uygulamayı yükle</div>
          </div>
          <p style={{ fontSize: 12, color: 'var(--fg-muted)', margin: 0, marginBottom: 12, lineHeight: 1.5 }}>
            YAZSAD'ı telefonuna ekle — offline dinleme, push bildirimleri, daha hızlı açılış.
          </p>
          <div style={{ display: 'flex', gap: 6 }}>
            <button onClick={dismiss} className="btn btn-ghost" style={{ fontSize: 11, padding: '6px 12px' }}>Sonra</button>
            <button onClick={() => { window.__yazsadToast && window.__yazsadToast('Yükleme başlatıldı (demo)'); dismiss(); }} className="btn btn-primary" style={{ fontSize: 11, padding: '6px 12px', flex: 1 }}>Yükle</button>
          </div>
        </div>
      )}
    </>
  );
};

Object.assign(window, { PWABanner });
