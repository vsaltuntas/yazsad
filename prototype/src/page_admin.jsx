// Admin / CMS dashboard

const AdminPage = () => {
  const [section, setSection] = React.useState('overview');
  const [queueTab, setQueueTab] = React.useState('pending');
  const [modules, setModules] = React.useState(() => (window.__yazsadGetModules ? window.__yazsadGetModules() : loadModules()));

  const updateModule = (id, status) => {
    const next = { ...modules, [id]: { ...modules[id], status } };
    setModules(next);
    saveModules(next);
    if (window.__yazsadSetModules) window.__yazsadSetModules(next);
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="page-eyebrow">YAZSAD CMS · Yönetim Kurulu erişimi</div>
          <h1 className="page-title">Yönetim Paneli</h1>
          <p className="page-subtitle">
            İçerik onayı, üye yönetimi, forum moderasyonu. Sadece yetkili roller tarafından görüntülenir.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-ghost"><IEye size={14} />Okuma günlüğü</button>
          <button className="btn btn-primary"><IPlus size={14} />Yeni Duyuru</button>
        </div>
      </div>

      {/* Section tabs */}
      <div className="chip-row" style={{ marginBottom: 32 }}>
        {[
          ['overview', 'Özet'],
          ['modules', 'Modüller'],
          ['content', 'İçerik Kuyruğu'],
          ['members', 'Üyeler'],
          ['forum', 'Moderasyon'],
          ['news', 'Haberler CMS'],
          ['prompts', 'Prompt Market'],
          ['ethics', 'Etik İtiraz'],
          ['settings', 'Dernek Ayarları'],
        ].map(([id, l]) => (
          <button key={id} className={`chip ${section === id ? 'active' : ''}`} onClick={() => setSection(id)}>{l}</button>
        ))}
      </div>

      {section === 'modules' && (() => {
        const cats = {};
        Object.entries(modules).forEach(([id, m]) => {
          if (!cats[m.cat]) cats[m.cat] = [];
          cats[m.cat].push({ id, ...m });
        });
        const statsByStatus = { active: 0, passive: 0, beta: 0, maintenance: 0 };
        Object.values(modules).forEach(m => { statsByStatus[m.status] = (statsByStatus[m.status] || 0) + 1; });
        return (
          <>
            <div className="admin-layout" style={{ marginBottom: 24 }}>
              {[['active','Aktif'],['passive','Pasif'],['beta','Beta'],['maintenance','Bakım']].map(([k, l]) => (
                <div key={k} className="stat-card">
                  <div className="stat-label">{l} modül</div>
                  <div className="stat-value">{statsByStatus[k] || 0}</div>
                  <div className="stat-delta" style={{ color: STATUS_META[k].color }}>● {STATUS_META[k].label}</div>
                </div>
              ))}
            </div>

            {Object.entries(cats).map(([catName, items]) => (
              <div key={catName} className="panel" style={{ marginBottom: 16 }}>
                <div className="panel-head">
                  <div>
                    <div className="panel-title">{catName}</div>
                    <div className="panel-sub">{items.length} MODÜL</div>
                  </div>
                </div>
                <div>
                  {items.map(mod => {
                    const meta = STATUS_META[mod.status];
                    return (
                      <div key={mod.id} style={{ display: 'grid', gridTemplateColumns: '180px 1fr auto auto', gap: 20, alignItems: 'center', padding: '16px 24px', borderBottom: '1px solid var(--border)' }}>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 600 }}>{mod.label}</div>
                          <div className="mono" style={{ fontSize: 10, color: 'var(--fg-dim)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 2 }}>{mod.id}{mod.locked ? ' · kilitli' : ''}</div>
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--fg-muted)', lineHeight: 1.5 }}>{mod.desc}</div>
                        <span className="pill" style={{ background: meta.bg, color: meta.color, fontSize: 10 }}>● {meta.label}</span>
                        <div style={{ display: 'flex', gap: 4 }}>
                          {['active', 'passive', 'beta', 'maintenance'].map(st => (
                            <button
                              key={st}
                              disabled={mod.locked && st !== 'active'}
                              onClick={() => updateModule(mod.id, st)}
                              className={`chip ${mod.status === st ? 'active' : ''}`}
                              style={{ fontSize: 10, padding: '4px 10px', opacity: (mod.locked && st !== 'active') ? 0.35 : 1, cursor: (mod.locked && st !== 'active') ? 'not-allowed' : 'pointer' }}
                              title={STATUS_META[st].label}
                            >
                              {STATUS_META[st].label}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            <div style={{ marginTop: 16, padding: 14, background: 'var(--accent-soft)', border: '1px solid var(--accent)', borderRadius: 'var(--radius-md)', fontSize: 12, color: 'var(--fg)', lineHeight: 1.6 }}>
              <strong>İpucu:</strong> Pasif modüller menüden gizlenir ama URL ile erişildiğinde "Yakında" ekranı gösterir. Beta modüller sadece admin için açıktır. Değişiklikler localStorage'da saklanır ve tüm sayfalara anında yansır.
            </div>
          </>
        );
      })()}

      {section === 'prompts' && (
        <div className="panel">
          <div className="panel-head">
            <div>
              <div className="panel-title">Prompt Market Yönetimi</div>
              <div className="panel-sub">SADECE ADMİN · V1: ADMİN EKLER · V2: ÜYE BAŞVURUSU + ONAY</div>
            </div>
            <button className="btn btn-primary" style={{ fontSize: 12 }}><IPlus size={12} />Yeni Prompt</button>
          </div>
          <div style={{ padding: 48, textAlign: 'center', color: 'var(--fg-muted)' }}>
            <div className="display" style={{ fontSize: 24, marginBottom: 8, color: 'var(--fg)' }}>Prompt havuzu</div>
            <div style={{ fontSize: 13 }}>Prompt Market modülü aktif olunca buradan yönetilecek. Faz 3'te detaylandırılacak.</div>
          </div>
        </div>
      )}

      {section === 'ethics' && (
        <div className="panel">
          <div className="panel-head">
            <div>
              <div className="panel-title">Etik İtiraz Vakaları</div>
              <div className="panel-sub">0 AÇIK · 0 İNCELEMEDE</div>
            </div>
          </div>
          <div style={{ padding: 48, textAlign: 'center', color: 'var(--fg-muted)' }}>
            <div className="display" style={{ fontSize: 24, marginBottom: 8, color: 'var(--fg)' }}>Vaka takibi</div>
            <div style={{ fontSize: 13 }}>Etik İtiraz modülü üzerinden gelen vakalar burada görünecek. Faz 2'de detaylandırılacak.</div>
          </div>
        </div>
      )}

      {section === 'overview' && (
        <>
          {/* Stats */}
          <div className="admin-layout">
            {ADMIN_STATS.map((s, i) => (
              <div key={i} className="stat-card">
                <div className="stat-label">{s.label}</div>
                <div className="stat-value">{s.value}</div>
                <div className={`stat-delta ${s.up ? '' : 'down'}`}>{s.up ? '▲' : '▼'} {s.delta}</div>
              </div>
            ))}
          </div>

          <div className="admin-grid">
            {/* Chart panel */}
            <div className="panel">
              <div className="panel-head">
                <div>
                  <div className="panel-title">Haftalık dinleme</div>
                  <div className="panel-sub">SON 14 GÜN · TÜM PARÇALAR</div>
                </div>
                <select className="select" style={{ fontSize: 12 }}>
                  <option>Son 14 gün</option>
                  <option>Son 30 gün</option>
                  <option>Son 3 ay</option>
                </select>
              </div>
              <div className="chart">
                {[32, 45, 38, 52, 48, 62, 58, 71, 65, 78, 82, 74, 88, 92].map((h, i) => (
                  <div key={i} className={`chart-bar ${i === 13 ? 'active' : ''}`} style={{ height: `${h}%` }} />
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 24px 20px', fontSize: 10, color: 'var(--fg-muted)', fontFamily: 'var(--font-mono)' }}>
                <span>6 Nis</span><span>9 Nis</span><span>12 Nis</span><span>15 Nis</span><span>18 Nis (bugün)</span>
              </div>
            </div>

            {/* Activity */}
            <div className="panel">
              <div className="panel-head">
                <div className="panel-title">Son Etkinlik</div>
                <button className="btn-icon"><IMore size={14} /></button>
              </div>
              <div style={{ padding: '4px 0' }}>
                {[
                  { t: 'Anatolian Lab parça yükledi', s: '"Lodos" · onay bekliyor', time: '14 dk', dot: 'var(--warning)' },
                  { t: 'Yeni üye başvurusu', s: 'Ece Kaynak', time: '38 dk', dot: 'var(--accent)' },
                  { t: 'Haber yayınlandı', s: '"Festival lokasyon güncellemesi"', time: '1 sa', dot: 'var(--success)' },
                  { t: 'Forum yanıtı raporlandı', s: '3 kez · konu #f9', time: '2 sa', dot: 'var(--danger)' },
                  { t: 'Aidat ödemesi tamamlandı', s: 'Kerem Yılmaz · ₺640', time: '3 sa', dot: 'var(--success)' },
                  { t: 'Yeni parça onaylandı', s: 'SES/0 · "Gece Otobüsü"', time: '5 sa', dot: 'var(--success)' },
                ].map((e, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 20px', alignItems: 'flex-start' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: e.dot, marginTop: 6, flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 500 }}>{e.t}</div>
                      <div style={{ fontSize: 12, color: 'var(--fg-muted)' }}>{e.s}</div>
                    </div>
                    <div className="mono" style={{ fontSize: 10, color: 'var(--fg-dim)' }}>{e.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Approval queue */}
          <div className="panel" style={{ marginTop: 24 }}>
            <div className="panel-head">
              <div>
                <div className="panel-title">Onay Kuyruğu</div>
                <div className="panel-sub">23 BEKLEYEN · 4 BUGÜN ONAYLANDI</div>
              </div>
              <div style={{ display: 'flex', gap: 4 }}>
                {['pending','approved','rejected'].map(t => (
                  <button key={t} className={`chip ${queueTab === t ? 'active' : ''}`} onClick={() => setQueueTab(t)} style={{ fontSize: 11 }}>
                    {t === 'pending' ? 'Bekleyen' : t === 'approved' ? 'Onaylı' : 'Reddedilen'}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="table-row header">
                <span></span>
                <span>Başlık / Açıklama</span>
                <span>Tür</span>
                <span>Durum</span>
                <span>İşlem</span>
              </div>
              {ADMIN_QUEUE.map((q, i) => (
                <div key={i} className="table-row">
                  <div style={{ width: 36, height: 36, borderRadius: 'var(--radius-sm)', background: 'var(--bg-elev-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, color: 'var(--fg-muted)', textTransform: 'uppercase' }}>
                    {q.type.slice(0,2)}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{q.title}</div>
                    <div style={{ fontSize: 11, color: 'var(--fg-muted)' }}>{q.author} · {q.time}</div>
                  </div>
                  <span className="mono" style={{ fontSize: 11, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{q.type}</span>
                  <span className={`pill pill-${q.status}`}>{q.status === 'pending' ? 'Bekliyor' : q.status === 'approved' ? 'Onaylı' : 'Reddedildi'}</span>
                  <div style={{ display: 'flex', gap: 4 }}>
                    {q.status === 'pending' ? (
                      <>
                        <button className="btn-icon" style={{ color: 'var(--success)' }}><ICheck size={14} /></button>
                        <button className="btn-icon" style={{ color: 'var(--danger)' }}><IX size={14} /></button>
                        <button className="btn-icon"><IEye size={14} /></button>
                      </>
                    ) : (
                      <button className="btn-icon"><IMore size={14} /></button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {section === 'members' && (
        <div className="panel">
          <div className="panel-head">
            <div>
              <div className="panel-title">Üye Listesi</div>
              <div className="panel-sub">3,847 AKTİF · 23 BAŞVURU · 4 ASKIDA</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <input className="input" placeholder="Üye ara..." style={{ width: 240 }} />
              <button className="btn btn-primary" style={{ fontSize: 12 }}>CSV İndir</button>
            </div>
          </div>
          <div>
            <div className="table-row header" style={{ gridTemplateColumns: '36px 1fr auto auto auto auto' }}>
              <span></span>
              <span>Üye</span>
              <span>Rol</span>
              <span>Katılım</span>
              <span>Parça/Takip</span>
              <span></span>
            </div>
            {USERS.map((u, i) => (
              <div key={i} className="table-row" style={{ gridTemplateColumns: '36px 1fr auto auto auto auto' }}>
                <div className="avatar" style={{ width: 32, height: 32, background: ['linear-gradient(135deg,#e94e1b,#7c3aed)','linear-gradient(135deg,#06b6d4,#ec4899)','linear-gradient(135deg,#4ade80,#fbbf24)','linear-gradient(135deg,#8b2635,#d4a574)','linear-gradient(135deg,#c23b22,#1a1a1a)','linear-gradient(135deg,#333,#e94e1b)'][i] }}>
                  {u.name.split(' ').map(w => w[0]).slice(0,2).join('')}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{u.name}</div>
                  <div className="mono" style={{ fontSize: 11, color: 'var(--fg-muted)' }}>{u.handle}</div>
                </div>
                <span className="pill pill-live">{u.role}</span>
                <span className="mono" style={{ fontSize: 11, color: 'var(--fg-muted)' }}>{u.joined}</span>
                <span className="mono" style={{ fontSize: 11, color: 'var(--fg-muted)' }}>{u.tracks} / {u.followers}</span>
                <button className="btn-icon"><IMore size={14} /></button>
              </div>
            ))}
          </div>
        </div>
      )}

      {section === 'content' && (
        <div className="panel">
          <div className="panel-head">
            <div className="panel-title">İçerik Kuyruğu</div>
            <div className="panel-sub">PARÇA · YORUM · HABER</div>
          </div>
          <div style={{ padding: 48, textAlign: 'center', color: 'var(--fg-muted)' }}>
            <div className="display" style={{ fontSize: 24, marginBottom: 8, color: 'var(--fg)' }}>Detaylı kuyruk ekranı</div>
            <div style={{ fontSize: 13 }}>Parça inceleme, spektral analiz, telif kontrolü — sonraki iterasyonda</div>
          </div>
        </div>
      )}

      {section === 'forum' && (
        <div className="panel">
          <div className="panel-head">
            <div className="panel-title">Forum Moderasyonu</div>
            <div className="panel-sub">5 RAPOR · 2 ASKIDA KULLANICI</div>
          </div>
          <div>
            {[
              { r: 3, c: '"bu prompt çok iyi değil, burada mı öğreniyorsunuz"', u: 'Anonim · 2 saat önce', t: '#f3' },
              { r: 2, c: '"reklam spam linki tespit edildi"', u: 'Sistem · 4 saat önce', t: '#f8' },
              { r: 4, c: '"kişisel saldırı içeriyor"', u: 'Kerem Y. (Mod) · 6 saat önce', t: '#f9' },
            ].map((r, i) => (
              <div key={i} style={{ padding: '14px 24px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 16 }}>
                <div className="pill" style={{ background: 'rgba(239,68,68,0.15)', color: 'var(--danger)' }}>{r.r} RAPOR</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{r.c}</div>
                  <div style={{ fontSize: 11, color: 'var(--fg-muted)' }}>{r.u} · {r.t}</div>
                </div>
                <button className="btn btn-ghost" style={{ fontSize: 11 }}>İncele</button>
                <button className="btn btn-ghost" style={{ fontSize: 11, color: 'var(--danger)' }}>Kaldır</button>
                <button className="btn btn-ghost" style={{ fontSize: 11 }}>Reddet</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {section === 'news' && (
        <div className="panel">
          <div className="panel-head">
            <div className="panel-title">Haber Yönetimi</div>
            <button className="btn btn-primary" style={{ fontSize: 12 }}><IPlus size={12} />Yeni Haber</button>
          </div>
          <div>
            {NEWS.map(n => (
              <div key={n.id} className="table-row" style={{ gridTemplateColumns: '48px 1fr auto auto auto' }}>
                <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
                  <GenArt g1={n.g1} g2={n.g2} g3={n.g3} seed={parseInt(n.id.replace('n',''))} />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{n.title}</div>
                  <div className="mono" style={{ fontSize: 11, color: 'var(--fg-muted)' }}>{n.author} · {n.category}</div>
                </div>
                <span className="pill pill-live">Yayında</span>
                <span className="mono" style={{ fontSize: 11, color: 'var(--fg-muted)' }}>{n.date}</span>
                <div style={{ display: 'flex', gap: 4 }}>
                  <button className="btn-icon"><IEdit size={14} /></button>
                  <button className="btn-icon"><IMore size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {section === 'settings' && (
        <div className="settings-panel" style={{ maxWidth: 720 }}>
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Dernek Ayarları</div>
          <div className="setting-row">
            <div>
              <div className="setting-label">Dernek adı</div>
              <div className="setting-desc">Resmi kayıt adı — belgelerinde görünür</div>
            </div>
            <input className="input" style={{ width: 320 }} defaultValue="Yapay Zeka Sanatçıları Derneği" />
          </div>
          <div className="setting-row">
            <div>
              <div className="setting-label">Yıllık aidat</div>
              <div className="setting-desc">Sanatçı üyeler için</div>
            </div>
            <input className="input" style={{ width: 120 }} defaultValue="₺640" />
          </div>
          <div className="setting-row">
            <div>
              <div className="setting-label">Başvuru formu açık</div>
              <div className="setting-desc">Kapalıysa yeni üye başvurusu alınmaz</div>
            </div>
            <div className="toggle on" />
          </div>
          <div className="setting-row">
            <div>
              <div className="setting-label">Otomatik parça onayı</div>
              <div className="setting-desc">Onaylı sanatçılardan gelen parçalar otomatik yayına çıksın</div>
            </div>
            <div className="toggle" />
          </div>
        </div>
      )}
    </div>
  );
};

Object.assign(window, { AdminPage });
