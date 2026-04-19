// "Module not available" fallback page

const ComingSoon = ({ mod }) => {
  const labels = {
    passive: ['Yakında', 'Bu modül henüz aktif değil. Yönetim paneli üzerinden açılabilir.'],
    maintenance: ['Bakımda', 'Bu bölüm kısa süreliğine bakımda. Daha sonra tekrar dene.'],
    beta: ['Beta erişimi gerekli', 'Bu modül şu an sadece admin rolündeki kullanıcılar için açık.'],
  };
  const status = mod?.status || 'passive';
  const [title, desc] = labels[status] || labels.passive;
  return (
    <div className="page" style={{ maxWidth: 640, textAlign: 'center', padding: '120px 48px' }}>
      <div style={{
        width: 88, height: 88, margin: '0 auto 24px',
        borderRadius: '50%', border: '1px dashed var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--bg-elev)',
      }}>
        <span className="display" style={{ fontSize: 32, fontWeight: 500, color: 'var(--fg-muted)' }}>—</span>
      </div>
      <div className="page-eyebrow">{mod?.cat || 'Modül'} · {STATUS_META[status]?.label}</div>
      <h1 className="page-title" style={{ marginBottom: 12 }}>{mod?.label || title}</h1>
      <p className="page-subtitle" style={{ margin: '0 auto', maxWidth: 420, marginBottom: 32 }}>
        {desc} {mod?.desc && <><br/><span style={{ color: 'var(--fg-dim)', fontSize: 13 }}>({mod.desc})</span></>}
      </p>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
        <button className="btn btn-ghost" onClick={() => window.__yazsadGo && window.__yazsadGo('home')}>← Ana Sayfa</button>
        <button className="btn btn-primary" onClick={() => window.__yazsadGo && window.__yazsadGo('admin')}>Yönetim Paneline Git</button>
      </div>
    </div>
  );
};

Object.assign(window, { ComingSoon });
