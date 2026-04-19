// Settings page

const SettingsPage = () => {
  const [tab, setTab] = React.useState('profile');
  const [notifs, setNotifs] = React.useState({ forum: true, news: true, marketing: false, weekly: true });
  const [privacy, setPrivacy] = React.useState({ public: true, showEmail: false, discoverable: true });

  const tabs = [
    { id: 'profile', label: 'Profil' },
    { id: 'account', label: 'Hesap' },
    { id: 'notifs', label: 'Bildirimler' },
    { id: 'privacy', label: 'Gizlilik' },
    { id: 'playback', label: 'Oynatma' },
    { id: 'membership', label: 'Üyelik' },
    { id: 'language', label: 'Dil & Bölge' },
  ];

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="page-eyebrow">anatolianlab@yazsad.org</div>
          <h1 className="page-title">Ayarlar</h1>
        </div>
      </div>

      <div className="settings-layout">
        <div className="settings-nav">
          {tabs.map(t => (
            <button key={t.id} className={tab === t.id ? 'active' : ''} onClick={() => setTab(t.id)}>{t.label}</button>
          ))}
          <div style={{ borderTop: '1px solid var(--border)', margin: '8px 0' }}></div>
          <button style={{ color: 'var(--danger)' }}>Hesabı sil</button>
        </div>

        <div className="settings-panel">
          {tab === 'profile' && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, paddingBottom: 24, borderBottom: '1px solid var(--border)', marginBottom: 8 }}>
                <div className="avatar avatar-xl" style={{ background: 'linear-gradient(135deg, #e94e1b, #7c3aed)' }}>AL</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 18, fontWeight: 600 }}>Anatolian Lab</div>
                  <div className="mono" style={{ fontSize: 11, color: 'var(--fg-muted)' }}>@anatolianlab · Sanatçı · Üye</div>
                  <button className="btn btn-ghost" style={{ marginTop: 10, fontSize: 11 }}>Fotoğrafı değiştir</button>
                </div>
              </div>

              <div className="setting-row">
                <div>
                  <div className="setting-label">Görünen ad</div>
                  <div className="setting-desc">Forum ve parça sayfalarında gözükür</div>
                </div>
                <input className="input" style={{ width: 280 }} defaultValue="Anatolian Lab" />
              </div>
              <div className="setting-row">
                <div>
                  <div className="setting-label">Kullanıcı adı</div>
                  <div className="setting-desc">yazsad.org/<strong>anatolianlab</strong></div>
                </div>
                <input className="input" style={{ width: 280 }} defaultValue="anatolianlab" />
              </div>
              <div className="setting-row">
                <div>
                  <div className="setting-label">Biyografi</div>
                  <div className="setting-desc">Profilde 280 karaktere kadar gözükür</div>
                </div>
                <textarea className="input" rows="3" style={{ width: 280, resize: 'vertical' }} defaultValue="İstanbul'dan AI müzik üretimi. Synthwave, ambient, şehir manzaraları." />
              </div>
              <div className="setting-row">
                <div>
                  <div className="setting-label">Şehir</div>
                </div>
                <select className="select"><option>İstanbul</option><option>Ankara</option><option>İzmir</option><option>Diğer</option></select>
              </div>
            </div>
          )}

          {tab === 'notifs' && (
            <div>
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>Bildirim tercihleri</div>
              <p style={{ color: 'var(--fg-muted)', fontSize: 13, marginBottom: 16 }}>Hangi durumlarda e-posta ve uygulama içi bildirim alacağını seç.</p>

              {[
                { k: 'forum', l: 'Forum yanıtları', d: 'Konularınıza yanıt geldiğinde' },
                { k: 'news', l: 'Dernek haberleri', d: 'Yayın Kurulu her yeni haber çıktığında' },
                { k: 'weekly', l: 'Haftalık özet', d: 'Pazartesi sabahı haftanın öne çıkanları' },
                { k: 'marketing', l: 'Etkinlik duyuruları', d: 'Festival, yarışma, atölye çağrıları' },
              ].map(r => (
                <div key={r.k} className="setting-row">
                  <div>
                    <div className="setting-label">{r.l}</div>
                    <div className="setting-desc">{r.d}</div>
                  </div>
                  <div onClick={() => setNotifs({ ...notifs, [r.k]: !notifs[r.k] })} className={`toggle ${notifs[r.k] ? 'on' : ''}`} />
                </div>
              ))}
            </div>
          )}

          {tab === 'privacy' && (
            <div>
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Gizlilik</div>
              {[
                { k: 'public', l: 'Profilim herkese açık', d: 'Dinleyiciler profilini görebilir ve takip edebilir' },
                { k: 'showEmail', l: 'E-posta adresimi göster', d: 'Profilde e-posta görünür; kapalıysa iletişim formu' },
                { k: 'discoverable', l: 'Keşif algoritmasında göster', d: 'Ana sayfa önerilerinde yer alsın' },
              ].map(r => (
                <div key={r.k} className="setting-row">
                  <div>
                    <div className="setting-label">{r.l}</div>
                    <div className="setting-desc">{r.d}</div>
                  </div>
                  <div onClick={() => setPrivacy({ ...privacy, [r.k]: !privacy[r.k] })} className={`toggle ${privacy[r.k] ? 'on' : ''}`} />
                </div>
              ))}
            </div>
          )}

          {tab === 'playback' && (
            <div>
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Oynatma</div>
              <div className="setting-row">
                <div>
                  <div className="setting-label">Ses kalitesi</div>
                  <div className="setting-desc">Yüksek kalite mobil veri tüketimini arttırır</div>
                </div>
                <select className="select"><option>Yüksek (320 kbps)</option><option>Orta (192 kbps)</option><option>Düşük (96 kbps)</option></select>
              </div>
              <div className="setting-row">
                <div>
                  <div className="setting-label">Crossfade</div>
                  <div className="setting-desc">Parçalar arası geçiş süresi (saniye)</div>
                </div>
                <input type="range" min="0" max="10" defaultValue="3" style={{ width: 200, accentColor: 'var(--accent)' }} />
              </div>
              <div className="setting-row">
                <div>
                  <div className="setting-label">Otomatik sıra</div>
                  <div className="setting-desc">Çalma listesi bittiğinde benzer parçalarla devam</div>
                </div>
                <div className="toggle on" />
              </div>
            </div>
          )}

          {tab === 'membership' && (
            <div>
              <div style={{ padding: 20, background: 'var(--accent-soft)', border: '1px solid var(--accent)', borderRadius: 'var(--radius-md)', marginBottom: 24 }}>
                <div className="mono" style={{ fontSize: 10, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>Aktif üyelik</div>
                <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>YAZSAD 2026 · Sanatçı Üye</div>
                <div style={{ color: 'var(--fg-muted)', fontSize: 13 }}>Yenileme: 12 Şubat 2027 · ₺640/yıl</div>
              </div>
              <div className="setting-row">
                <div>
                  <div className="setting-label">Üyelik türü</div>
                  <div className="setting-desc">Dinleyici (ücretsiz) / Sanatçı (₺640/yıl) / Onur Üyesi</div>
                </div>
                <button className="btn btn-ghost" style={{ fontSize: 12 }}>Değiştir</button>
              </div>
              <div className="setting-row">
                <div>
                  <div className="setting-label">Ödeme yöntemi</div>
                  <div className="setting-desc">•••• 4782 · 11/28</div>
                </div>
                <button className="btn btn-ghost" style={{ fontSize: 12 }}>Güncelle</button>
              </div>
              <div className="setting-row">
                <div>
                  <div className="setting-label">Fatura geçmişi</div>
                  <div className="setting-desc">Tüm yıllık ödeme kayıtların</div>
                </div>
                <button className="btn btn-ghost" style={{ fontSize: 12 }}>Görüntüle</button>
              </div>
            </div>
          )}

          {tab === 'account' && (
            <div>
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Hesap</div>
              <div className="setting-row">
                <div>
                  <div className="setting-label">E-posta</div>
                  <div className="setting-desc">Doğrulandı · 14 Kas 2024</div>
                </div>
                <input className="input" style={{ width: 280 }} defaultValue="anatolianlab@yazsad.org" />
              </div>
              <div className="setting-row">
                <div>
                  <div className="setting-label">Şifre</div>
                  <div className="setting-desc">Son değişiklik: 62 gün önce</div>
                </div>
                <button className="btn btn-ghost" style={{ fontSize: 12 }}>Şifreyi değiştir</button>
              </div>
              <div className="setting-row">
                <div>
                  <div className="setting-label">İki aşamalı doğrulama</div>
                  <div className="setting-desc">Authenticator uygulaması ile</div>
                </div>
                <div className="toggle on" />
              </div>
              <div className="setting-row">
                <div>
                  <div className="setting-label">Oturumlar</div>
                  <div className="setting-desc">3 cihazda aktif — diğerlerini sonlandır</div>
                </div>
                <button className="btn btn-ghost" style={{ fontSize: 12 }}>Yönet</button>
              </div>
            </div>
          )}

          {tab === 'language' && (
            <div>
              <div className="setting-row">
                <div>
                  <div className="setting-label">Arayüz dili</div>
                </div>
                <select className="select"><option>Türkçe</option><option>English</option></select>
              </div>
              <div className="setting-row">
                <div>
                  <div className="setting-label">Saat dilimi</div>
                </div>
                <select className="select"><option>İstanbul (GMT+3)</option><option>Berlin (GMT+2)</option></select>
              </div>
              <div className="setting-row">
                <div>
                  <div className="setting-label">Para birimi</div>
                </div>
                <select className="select"><option>₺ Türk Lirası</option><option>€ Euro</option><option>$ ABD Doları</option></select>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { SettingsPage });
