// Membership application page

const MembershipPage = ({ auth, setRoute }) => {
  const [step, setStep] = React.useState(1);
  const [data, setData] = React.useState({
    fullName: auth.name || '',
    tcNo: '',
    email: '',
    phone: '',
    city: '',
    aboutMe: '',
    portfolioLinks: '',
    contribution: '',
    tracksCount: '',
    referrer: '',
    agreeEthics: false,
    agreeFees: false,
    agreeTransparency: false,
  });

  const update = (k, v) => setData(d => ({ ...d, [k]: v }));

  if (auth.state !== 'user') {
    return (
      <div className="page" style={{ maxWidth: 600, textAlign: 'center', paddingTop: 80 }}>
        <div className="display" style={{ fontSize: 32, marginBottom: 12 }}>Önce giriş yap</div>
        <div style={{ color: 'var(--fg-muted)', marginBottom: 24 }}>Üyelik başvurusu için YAZSAD hesabın gerekir.</div>
        <button className="btn btn-primary" onClick={() => window.__yazsadOpenAuth && window.__yazsadOpenAuth('signup')}>Hesap Oluştur</button>
      </div>
    );
  }

  // Submitted state
  if (step === 4) {
    return (
      <div className="page" style={{ maxWidth: 640, paddingTop: 60 }}>
        <div style={{ textAlign: 'center', padding: 40, border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', background: 'var(--bg-elev)' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--accent-soft)', color: 'var(--accent)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
            <ICheck size={28} />
          </div>
          <div className="display" style={{ fontSize: 28, marginBottom: 8 }}>Başvurun alındı</div>
          <div style={{ color: 'var(--fg-muted)', marginBottom: 20, lineHeight: 1.6 }}>
            Yönetim kurulu <strong style={{ color: 'var(--fg)' }}>7 iş günü</strong> içinde değerlendirir. Sonuç e-posta ile bildirilecek; bu sırada sanatçı olarak tüm özellikleri kullanabilirsin.
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, margin: '24px 0', textAlign: 'left' }}>
            {[
              { n: '01', t: 'Değerlendirme', d: 'Portfolyo + etik kontrol' },
              { n: '02', t: 'Oylama', d: 'Yönetim + aktif üye oylaması' },
              { n: '03', t: 'Karar', d: 'E-posta ile sonuç' },
            ].map(s => (
              <div key={s.n} style={{ padding: 14, background: 'var(--bg-elev-2)', borderRadius: 'var(--radius-sm)' }}>
                <div className="mono" style={{ fontSize: 10, color: 'var(--accent)', marginBottom: 6 }}>{s.n}</div>
                <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 4 }}>{s.t}</div>
                <div style={{ fontSize: 11, color: 'var(--fg-muted)' }}>{s.d}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
            <button className="btn btn-ghost" onClick={() => setRoute('home')}>Ana sayfaya dön</button>
            <button className="btn btn-primary" onClick={() => setRoute('upload')}>İlk parçamı yükle →</button>
          </div>
        </div>
      </div>
    );
  }

  const canContinue = step === 1
    ? data.fullName.trim().length >= 3 && data.tcNo.length >= 10 && data.email.includes('@') && data.city.trim()
    : step === 2
    ? data.aboutMe.trim().length >= 30
    : data.agreeEthics && data.agreeFees && data.agreeTransparency;

  return (
    <div className="page" style={{ maxWidth: 760 }}>
      <div style={{ marginBottom: 28 }}>
        <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8 }}>Hesap / Üyelik</div>
        <h1 className="display" style={{ fontSize: 40, fontWeight: 500, marginBottom: 8 }}>Dernek üyeliği başvurusu</h1>
        <p style={{ fontSize: 14, color: 'var(--fg-muted)', lineHeight: 1.6, maxWidth: 540 }}>
          Oylama hakkı, etik koruma ve resmi temsil. 2026 yıllık aidat <strong style={{ color: 'var(--fg)' }}>₺640</strong>.
        </p>
      </div>

      {/* Steps */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, marginBottom: 32, border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
        {[
          { n: 1, t: 'Kimlik', d: 'Kişisel bilgiler' },
          { n: 2, t: 'Portföy', d: 'Sanatsal üretim' },
          { n: 3, t: 'Onaylar', d: 'Etik ve aidat' },
        ].map(s => (
          <div key={s.n} style={{
            padding: 16, borderRight: s.n < 3 ? '1px solid var(--border)' : 'none',
            background: step === s.n ? 'var(--bg-elev)' : 'var(--bg-elev-2)',
            opacity: step < s.n ? 0.5 : 1,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: step > s.n ? 'var(--success)' : step === s.n ? 'var(--accent)' : 'var(--border)', color: step >= s.n ? 'white' : 'var(--fg-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                {step > s.n ? <ICheck size={11} /> : s.n}
              </div>
              <div style={{ fontSize: 12, fontWeight: 600 }}>{s.t}</div>
            </div>
            <div style={{ fontSize: 11, color: 'var(--fg-muted)', paddingLeft: 30 }}>{s.d}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 32, alignItems: 'flex-start' }}>
        <div style={{ padding: 28, background: 'var(--bg-elev)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' }}>
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>Kişisel bilgiler</h3>
              <p style={{ fontSize: 12, color: 'var(--fg-muted)', marginBottom: 8 }}>KVKK uyumlu; sadece yönetim kurulu görür.</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <Field label="Ad soyad" v={data.fullName} onChange={v => update('fullName', v)} />
                <Field label="TC kimlik no" v={data.tcNo} onChange={v => update('tcNo', v.replace(/\D/g,'').slice(0,11))} mono />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <Field label="E-posta" v={data.email} onChange={v => update('email', v)} type="email" />
                <Field label="Telefon" v={data.phone} onChange={v => update('phone', v)} placeholder="+90 5XX XXX XX XX" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <Field label="Şehir" v={data.city} onChange={v => update('city', v)} placeholder="İstanbul" />
                <Field label="Referans üye (opsiyonel)" v={data.referrer} onChange={v => update('referrer', v)} placeholder="@kullaniciadi" mono />
              </div>
            </div>
          )}

          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>Sanatsal üretim</h3>
              <p style={{ fontSize: 12, color: 'var(--fg-muted)', marginBottom: 8 }}>Üretimini ve ekosisteme katkını kısaca anlat.</p>
              <div>
                <label style={labelStyle}>Kendini ve üretimini tanıt *</label>
                <textarea className="input" rows={5} value={data.aboutMe} onChange={(e) => update('aboutMe', e.target.value)} placeholder="Hangi türlerde üretiyorsun? Hangi modelleri kullanıyorsun? İlgi alanların..." style={{ width: '100%', fontFamily: 'var(--font-sans)', resize: 'vertical' }} />
                <div style={{ fontSize: 10, color: 'var(--fg-dim)', marginTop: 4, textAlign: 'right' }}>{data.aboutMe.length} / 30 min</div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12 }}>
                <Field label="Portföy bağlantıları (virgülle ayır)" v={data.portfolioLinks} onChange={v => update('portfolioLinks', v)} placeholder="soundcloud.com/…, yazsad.org/profile/…" />
                <Field label="Toplam parça" v={data.tracksCount} onChange={v => update('tracksCount', v.replace(/\D/g,''))} placeholder="12" mono />
              </div>
              <div>
                <label style={labelStyle}>Dernek için planladığın katkı</label>
                <textarea className="input" rows={3} value={data.contribution} onChange={(e) => update('contribution', e.target.value)} placeholder="Örn: aylık workshop, mentorluk, yerel fest organizasyonu..." style={{ width: '100%', fontFamily: 'var(--font-sans)', resize: 'vertical' }} />
              </div>
            </div>
          )}

          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>Onaylar</h3>
              <p style={{ fontSize: 12, color: 'var(--fg-muted)', marginBottom: 8 }}>Son adım. Üç maddeyi onayladıktan sonra başvuru yönetime gider.</p>
              {[
                { k: 'agreeEthics',       t: 'Etik çerçeveyi kabul ediyorum', d: 'AI kullanımında şeffaflık, telifli materyal kullanmama, stems beyanı, insan haklarına saygı.' },
                { k: 'agreeFees',         t: 'Yıllık aidatı (₺640 / 2026) ödemeyi kabul ediyorum', d: 'Onaylanan başvurularda 30 gün içinde ödeme yapılır. Öğrenci / emekli indirimleri mevcut.' },
                { k: 'agreeTransparency', t: 'Bilgilerimin yönetim kurulu + aktif üyeler tarafından görüneceğini onaylıyorum', d: 'Oylama sürecinde aktif üyeler başvurunu değerlendirir. TC kimlik gibi kritik veriler gizli kalır.' },
              ].map(c => (
                <label key={c.k} style={{
                  display: 'flex', gap: 12, padding: 14,
                  border: '1px solid ' + (data[c.k] ? 'var(--accent)' : 'var(--border)'),
                  background: data[c.k] ? 'var(--accent-soft)' : 'var(--bg-elev-2)',
                  borderRadius: 'var(--radius-sm)', cursor: 'pointer',
                }}>
                  <input type="checkbox" checked={data[c.k]} onChange={(e) => update(c.k, e.target.checked)} style={{ marginTop: 2, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{c.t}</div>
                    <div style={{ fontSize: 11, color: 'var(--fg-muted)', lineHeight: 1.5 }}>{c.d}</div>
                  </div>
                </label>
              ))}
            </div>
          )}

          <div style={{ display: 'flex', gap: 10, marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
            {step > 1 && <button className="btn btn-ghost" onClick={() => setStep(step - 1)}>← Geri</button>}
            <button
              className="btn btn-primary"
              disabled={!canContinue}
              onClick={() => setStep(step + 1)}
              style={{ marginLeft: 'auto', opacity: canContinue ? 1 : 0.5 }}>
              {step === 3 ? 'Başvuruyu Gönder' : 'Devam Et →'}
            </button>
          </div>
        </div>

        {/* Sidebar — benefits */}
        <div style={{ position: 'sticky', top: 80, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ padding: 20, background: 'var(--bg-elev)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
            <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 10 }}>Üye ayrıcalıkları</div>
            {[
              'Oylama hakkı — karar süreçlerinde',
              'Etik koruma — telif / deepfake savunması',
              'Resmi temsil — festivaller, medya, mevzuat',
              'Komisyon %10 (üyelere özel)',
              'Öncelikli destek + workshop erişimi',
            ].map((b, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, padding: '8px 0', fontSize: 12, color: 'var(--fg)', borderBottom: i < 4 ? '1px solid var(--border)' : 'none' }}>
                <ICheck size={13} stroke="var(--accent)" />
                <span>{b}</span>
              </div>
            ))}
          </div>

          <div style={{ padding: 16, background: 'var(--bg-elev-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', fontSize: 11, color: 'var(--fg-muted)', lineHeight: 1.5 }}>
            <div style={{ color: 'var(--fg)', fontWeight: 600, marginBottom: 6 }}>Öğrenci / emekli?</div>
            İndirimli aidat için <a style={{ color: 'var(--accent)' }}>indirim başvurusu</a> yap. Belge yüklemesi gerekir.
          </div>
        </div>
      </div>
    </div>
  );
};

const labelStyle = { display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 };

const Field = ({ label, v, onChange, type = 'text', placeholder = '', mono = false }) => (
  <div>
    <label style={labelStyle}>{label}</label>
    <input className="input" type={type} value={v} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} style={{ width: '100%', fontFamily: mono ? 'var(--font-mono)' : 'var(--font-sans)' }} />
  </div>
);

Object.assign(window, { MembershipPage });
