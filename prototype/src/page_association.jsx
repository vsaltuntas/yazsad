// YAZSAD dernek ana sayfası + etik çerçeve + üye dizini + aidat

const AssociationPage = ({ setRoute }) => {
  const [tab, setTab] = React.useState('home'); // home | ethics | directory | finance | governance

  return (
    <div className="page" style={{ maxWidth: 1100 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 32, marginBottom: 32 }}>
        <div style={{ width: 80, height: 80, borderRadius: 'var(--radius-lg)', background: 'var(--accent)', color: 'var(--accent-fg)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 28, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
          Y/
        </div>
        <div style={{ flex: 1 }}>
          <div className="mono" style={{ fontSize: 10, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 6 }}>Resmî Dernek · Kuruluş 2025</div>
          <h1 className="display" style={{ fontSize: 48, fontWeight: 500, lineHeight: 1.05, letterSpacing: '-0.02em', margin: 0, marginBottom: 8 }}>
            Yapay Zekâ Sanatçıları<br/>Derneği
          </h1>
          <p style={{ fontSize: 15, color: 'var(--fg-muted)', lineHeight: 1.6, maxWidth: 620, margin: 0 }}>
            Türkiye'de yapay zekâ ile müzik üreten sanatçıların haklarını koruyan, etik çerçeveyi belirleyen ve ekosistemi büyüten bağımsız sivil toplum örgütü.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8, flexDirection: 'column' }}>
          <button className="btn btn-primary" onClick={() => setRoute('membership')}>Üye Ol · ₺640/yıl</button>
          <button className="btn btn-ghost" style={{ fontSize: 12 }}>Tüzük (PDF)</button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ borderBottom: '1px solid var(--border)', marginBottom: 32, display: 'flex', gap: 4 }}>
        {[
          ['home', 'Biz Kimiz'],
          ['ethics', 'Etik Çerçeve'],
          ['directory', 'Üye Dizini'],
          ['finance', 'Şeffaflık'],
          ['governance', 'Yönetim'],
        ].map(([k, l]) => (
          <button
            key={k}
            onClick={() => setTab(k)}
            style={{
              padding: '12px 16px', background: 'none', border: 'none',
              borderBottom: tab === k ? '2px solid var(--accent)' : '2px solid transparent',
              color: tab === k ? 'var(--fg)' : 'var(--fg-muted)',
              fontSize: 13, fontWeight: tab === k ? 600 : 500, cursor: 'pointer',
              marginBottom: -1,
            }}
          >{l}</button>
        ))}
      </div>

      {tab === 'home' && <AssocHome setRoute={setRoute} setTab={setTab} />}
      {tab === 'ethics' && <AssocEthics />}
      {tab === 'directory' && <AssocDirectory />}
      {tab === 'finance' && <AssocFinance />}
      {tab === 'governance' && <AssocGovernance />}
    </div>
  );
};

// --- Home / Biz Kimiz ---
const AssocHome = ({ setRoute, setTab }) => (
  <div>
    {/* Mission + 3 pillars */}
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 48 }}>
      {[
        { n: '01', t: 'Hak Savunuculuğu', d: 'AI ile üretim yapan sanatçının telif, lisans ve eser sahipliği haklarını koruyoruz. Hukuki destek, sözleşme şablonları, danışmanlık.' },
        { n: '02', t: 'Etik Çerçeve', d: 'Şeffaf AI beyanı, eğitim veri kaynağına saygı, intihal tespiti, üye davranış kuralları. 10 madde halinde kamuya açık.' },
        { n: '03', t: 'Ekosistem İnşası', d: 'Türkiye sahnesine platform, pazar yeri, yarışmalar, eğitimler, festivaller. Üyelerimiz gelirin %85\'ini alır.' },
      ].map(p => (
        <div key={p.n} style={{ padding: 24, background: 'var(--bg-elev)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' }}>
          <div className="mono" style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 600, marginBottom: 12 }}>{p.n}</div>
          <div style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>{p.t}</div>
          <div style={{ fontSize: 13, color: 'var(--fg-muted)', lineHeight: 1.6 }}>{p.d}</div>
        </div>
      ))}
    </div>

    {/* Big numbers */}
    <div style={{ padding: '32px 0', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', marginBottom: 48 }}>
      <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 20 }}>Nisan 2026 itibarıyla</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 24 }}>
        {[
          ['487', 'Onaylı üye'],
          ['₺2.1M', 'Sanatçıya ödenen'],
          ['12,847', 'Yayında parça'],
          ['24', 'Etkinlik · 2026'],
          ['7', 'Hukuki kazanım'],
        ].map(([v, l]) => (
          <div key={l}>
            <div className="display" style={{ fontSize: 36, fontWeight: 500, lineHeight: 1, letterSpacing: '-0.02em' }}>{v}</div>
            <div style={{ fontSize: 11, color: 'var(--fg-muted)', marginTop: 6, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{l}</div>
          </div>
        ))}
      </div>
    </div>

    {/* History timeline */}
    <div style={{ marginBottom: 48 }}>
      <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 20 }}>Kronoloji</h2>
      <div style={{ position: 'relative', paddingLeft: 28 }}>
        <div style={{ position: 'absolute', left: 8, top: 8, bottom: 8, width: 1, background: 'var(--border)' }} />
        {[
          ['Şub 2025', 'İstanbul\'da 8 kurucu üyeyle resmi başvuru', 'Kuruluş'],
          ['Nis 2025', 'Dernek resmi tescili, İl Dernekler Müdürlüğü onayı', 'Tescil'],
          ['Tem 2025', 'İlk tüzük güncellemesi, etik 10 madde yayınlandı', 'Etik'],
          ['Kas 2025', 'YAZSAD Marketplace beta ile ilk 50 parça satışı', 'Platform'],
          ['Şub 2026', 'Bin üyeye doğru — 487 aktif üye, ilk genel kurul', 'Büyüme'],
          ['Haz 2026', 'İstanbul\'da ilk YAZSAD Festivali · 3 gün, 40 sanatçı', 'Planlanıyor'],
        ].map(([d, t, tag], i) => (
          <div key={i} style={{ marginBottom: 20, position: 'relative' }}>
            <div style={{ position: 'absolute', left: -28, top: 6, width: 17, height: 17, borderRadius: '50%', background: i < 5 ? 'var(--accent)' : 'var(--bg-elev-2)', border: '3px solid var(--bg)' }} />
            <div className="mono" style={{ fontSize: 10, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>{d} · {tag}</div>
            <div style={{ fontSize: 14, fontWeight: 500 }}>{t}</div>
          </div>
        ))}
      </div>
    </div>

    {/* CTA banner */}
    <div style={{ padding: 32, background: 'var(--accent)', color: 'var(--accent-fg)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6, opacity: 0.85 }}>Üye ol, hakkını koru</div>
        <div style={{ fontSize: 22, fontWeight: 600, lineHeight: 1.3, maxWidth: 600 }}>
          Yıllık ₺640 aidatla hukuki destek, marketplace komisyon indirimi (%15→%10), genel kurul oy hakkı ve etkinliklerde %30 indirim.
        </div>
      </div>
      <button onClick={() => setRoute('membership')} style={{ padding: '14px 24px', background: 'var(--bg)', color: 'var(--fg)', border: 'none', borderRadius: 'var(--radius-md)', fontSize: 13, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0 }}>Başvuruyu Başlat →</button>
    </div>
  </div>
);

// --- Ethics ---
const AssocEthics = () => {
  const principles = [
    { n: '01', t: 'Şeffaflık', d: 'AI ile üretilmiş her parça, hangi modelin, hangi promptun kullanıldığını, hangi örneklerden türetildiğini beyan eder. Gizlemek → üyelikten çıkarılma.', tag: 'Zorunlu' },
    { n: '02', t: 'Rıza & Ses Klonu', d: 'Bir kişinin sesi, yüzü veya üslubu; yazılı rızası olmadan AI ile taklit edilemez. Vefat etmiş sanatçılar için miras sahibi onayı şarttır.', tag: 'Hukuki' },
    { n: '03', t: 'Eğitim Verisi Etiği', d: 'Üyelerimizin yayınladığı eserler, üye izni olmadan AI eğitiminde kullanılamaz. Third-party modeller için data-opt-out talep ederiz.', tag: 'Koruma' },
    { n: '04', t: 'İnsan Katkısı', d: 'AI çıktısı ham hâliyle değil, sanatçının kuratorluğu, miksajı, düzenlemesiyle yayınlanır. "Prompt\'tan-yayına" boru hattı yasaktır.', tag: 'Kalite' },
    { n: '05', t: 'Telif & Lisans', d: 'Eser sahipliği insan sanatçıda kalır. AI bir enstrüman olarak kabul edilir. Lisans modelleri üye tarafından seçilir, platform değiştiremez.', tag: 'Telif' },
    { n: '06', t: 'İntihal Tespiti', d: 'Yüklenen her parça, mevcut katalog + açık kaynak veritabanlarıyla otomatik kontrol edilir. %85+ benzerlikte yayın reddedilir.', tag: 'Sistem' },
    { n: '07', t: 'Kültürel Saygı', d: 'Yerel müzik türleri (zeybek, halay, türkü, ilahi vb.) ticari amaçla kullanılırken kaynak kültüre ve icracı geleneğine saygı gösterilir.', tag: 'Kültür' },
    { n: '08', t: 'Reklam & Ticari Kullanım', d: 'Politik kampanyalar, silah, tütün, kumar reklamları için AI müzik üretimi yasaktır. Marketplace filtreleri ile uygulanır.', tag: 'Sınır' },
    { n: '09', t: 'Gelir Paylaşımı', d: 'Marketplace gelirin %85\'i sanatçıya. %10 platform giderleri, %5 dernek bütçesi (şeffaflık raporunda açıklanır).', tag: 'Finans' },
    { n: '10', t: 'Topluluk Davranışı', d: 'Nefret söylemi, taciz, hedef gösterme, düzenli çapraz-satış spam → moderasyon → uyarı → süreli askı → sürekli uzaklaştırma.', tag: 'Topluluk' },
  ];
  return (
    <div>
      <div style={{ padding: 24, background: 'var(--accent-soft)', border: '1px solid var(--accent)', borderRadius: 'var(--radius-lg)', marginBottom: 32 }}>
        <div className="mono" style={{ fontSize: 10, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 8 }}>Sürüm 1.2 · Yürürlükte · 15 Oca 2026</div>
        <h2 className="display" style={{ fontSize: 28, fontWeight: 500, marginBottom: 8, letterSpacing: '-0.02em' }}>10 Madde Etik Çerçeve</h2>
        <p style={{ fontSize: 13, color: 'var(--fg-muted)', lineHeight: 1.6, maxWidth: 680, margin: 0 }}>
          Her üye, kayıt sırasında bu çerçeveyi kabul eder. Çerçeve genel kurulda salt çoğunlukla güncellenir; son 3 sürüm arşivde saklanır.
        </p>
      </div>

      <div style={{ display: 'grid', gap: 12 }}>
        {principles.map(p => (
          <div key={p.n} style={{ display: 'grid', gridTemplateColumns: '60px 1fr 100px', gap: 20, padding: 20, background: 'var(--bg-elev)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
            <div className="display" style={{ fontSize: 32, color: 'var(--fg-dim)', fontWeight: 500, lineHeight: 1 }}>{p.n}</div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{p.t}</div>
              <div style={{ fontSize: 13, color: 'var(--fg-muted)', lineHeight: 1.6, textWrap: 'pretty' }}>{p.d}</div>
            </div>
            <div className="mono" style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent)', alignSelf: 'start', textAlign: 'right' }}>{p.tag}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 32, padding: 20, background: 'var(--bg-elev)', border: '1px dashed var(--border)', borderRadius: 'var(--radius-md)', fontSize: 13, color: 'var(--fg-muted)', lineHeight: 1.6 }}>
        <strong style={{ color: 'var(--fg)' }}>İhlal Bildirimi:</strong> Çerçevenin ihlal edildiğini düşündüğün bir durumu <span className="mono" style={{ color: 'var(--accent)' }}>etik@yazsad.org</span> adresine yazabilirsin. Tüm bildirimler 7 iş günü içinde etik kurul tarafından incelenir.
      </div>
    </div>
  );
};

// --- Member Directory ---
const AssocDirectory = () => {
  const members = [
    { name: 'Anatolian Lab', handle: '@anatolianlab', role: 'Kurucu Üye', city: 'İstanbul', genres: ['Synthwave', 'Ambient'], since: 'Şub 2025', verified: true },
    { name: 'Deniz Eldem', handle: '@deniz', role: 'Üye · Yönetim Kurulu', city: 'Ankara', genres: ['Electronic', 'Techno'], since: 'Nis 2025', verified: true },
    { name: 'Kerem Y.', handle: '@keremy', role: 'Üye', city: 'İzmir', genres: ['Folk Fusion', 'Zeybek'], since: 'May 2025', verified: true },
    { name: 'Selen Atik', handle: '@selenmusic', role: 'Üye · Etik Kurul', city: 'İstanbul', genres: ['Classical', 'Orchestral'], since: 'Haz 2025', verified: true },
    { name: 'Tuna Kavur', handle: '@tunak', role: 'Üye', city: 'Bursa', genres: ['Hip-hop', 'Trap'], since: 'Ağu 2025', verified: true },
    { name: 'Zehra Demir', handle: '@zehrademir', role: 'Üye', city: 'Eskişehir', genres: ['Dream Pop'], since: 'Eyl 2025', verified: true },
    { name: 'Uğur Altuğ', handle: '@ugurmusic', role: 'Üye', city: 'İstanbul', genres: ['Experimental'], since: 'Eki 2025', verified: true },
    { name: 'Nil Tekbaş', handle: '@niltek', role: 'Üye · Hukuk Kurulu', city: 'Ankara', genres: ['Soundtrack'], since: 'Kas 2025', verified: true },
    { name: 'Mert Canlar', handle: '@mertcanlar', role: 'Üye', city: 'Antalya', genres: ['Lo-fi', 'House'], since: 'Kas 2025', verified: true },
    { name: 'Asya Ören', handle: '@asyaoren', role: 'Üye · Hazine', city: 'İstanbul', genres: ['R&B', 'Jazz'], since: 'Ara 2025', verified: true },
    { name: 'Berk Söyleyen', handle: '@berks', role: 'Üye', city: 'İzmir', genres: ['Post-rock'], since: 'Oca 2026', verified: true },
    { name: 'Ece Yılmaz', handle: '@eceyilmaz', role: 'Üye', city: 'İstanbul', genres: ['Turkish Pop'], since: 'Şub 2026', verified: true },
  ];
  const [search, setSearch] = React.useState('');
  const [cityFilter, setCityFilter] = React.useState('Hepsi');
  const cities = ['Hepsi', ...new Set(members.map(m => m.city))];

  const filtered = members.filter(m => {
    const matchSearch = !search || m.name.toLowerCase().includes(search.toLowerCase()) || m.handle.toLowerCase().includes(search.toLowerCase()) || m.genres.some(g => g.toLowerCase().includes(search.toLowerCase()));
    const matchCity = cityFilter === 'Hepsi' || m.city === cityFilter;
    return matchSearch && matchCity;
  });

  return (
    <div>
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, alignItems: 'center', flexWrap: 'wrap' }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input"
          placeholder="İsim, handle veya tür ara..."
          style={{ flex: 1, minWidth: 240 }}
        />
        <div className="chip-row" style={{ gap: 6 }}>
          {cities.map(c => (
            <button key={c} className={`chip ${cityFilter === c ? 'active' : ''}`} onClick={() => setCityFilter(c)} style={{ fontSize: 11 }}>{c}</button>
          ))}
        </div>
        <div className="mono" style={{ fontSize: 11, color: 'var(--fg-muted)', marginLeft: 'auto' }}>{filtered.length} / {members.length}</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
        {filtered.map((m, i) => (
          <div key={m.handle} style={{ padding: 16, background: 'var(--bg-elev)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', cursor: 'pointer', transition: 'transform 0.15s' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div className="avatar" style={{ width: 44, height: 44, background: ['linear-gradient(135deg,#e94e1b,#7c3aed)','linear-gradient(135deg,#06b6d4,#ec4899)','linear-gradient(135deg,#4ade80,#fbbf24)','linear-gradient(135deg,#8b2635,#d4a574)','linear-gradient(135deg,#c23b22,#1a1a1a)','linear-gradient(135deg,#0066cc,#e94e1b)'][i % 6], flexShrink: 0 }}>
                {m.name.split(' ').map(w => w[0]).slice(0,2).join('')}
              </div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{m.name}</div>
                  {m.verified && <div style={{ color: 'var(--accent)' }}><ICheck size={12} /></div>}
                </div>
                <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)' }}>{m.handle} · {m.city}</div>
              </div>
            </div>
            <div className="mono" style={{ fontSize: 9, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>{m.role}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 8 }}>
              {m.genres.map(g => (
                <span key={g} style={{ fontSize: 10, padding: '2px 8px', background: 'var(--bg-elev-2)', border: '1px solid var(--border)', borderRadius: 10, color: 'var(--fg-muted)' }}>{g}</span>
              ))}
            </div>
            <div style={{ fontSize: 10, color: 'var(--fg-dim)', fontFamily: 'var(--font-mono)' }}>Üye · {m.since}</div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ padding: 64, textAlign: 'center', color: 'var(--fg-muted)', fontSize: 13 }}>
          Arama kriterlerine uyan üye bulunamadı.
        </div>
      )}
    </div>
  );
};

// --- Finance / Transparency ---
const AssocFinance = () => {
  const months = [
    { m: 'Oca', income: 48200, expense: 31400 },
    { m: 'Şub', income: 52800, expense: 29800 },
    { m: 'Mar', income: 67400, expense: 42100 },
    { m: 'Nis', income: 71200, expense: 38600 },
  ];
  const maxVal = Math.max(...months.flatMap(m => [m.income, m.expense]));

  const expenseBreakdown = [
    { label: 'Hukuki destek fonu', pct: 28, color: '#e94e1b' },
    { label: 'Platform altyapı', pct: 24, color: '#7c3aed' },
    { label: 'Personel (2 tam zamanlı)', pct: 22, color: '#06b6d4' },
    { label: 'Etkinlik & festival', pct: 14, color: '#4ade80' },
    { label: 'Ofis & idari', pct: 8, color: '#fbbf24' },
    { label: 'Yedek akçe', pct: 4, color: '#94a3b8' },
  ];

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 8 }}>Şeffaflık Raporu · Q1 2026</h2>
        <p style={{ fontSize: 13, color: 'var(--fg-muted)', lineHeight: 1.6, maxWidth: 720 }}>
          Tüm gelir/gider kalemleri kamuya açık. Bağımsız denetim yıllık, genel kurul öncesi yayınlanır. Bu rapor <span className="mono" style={{ color: 'var(--accent)' }}>finans.yazsad.org/2026-q1.pdf</span> adresinde de mevcut.
        </p>
      </div>

      {/* 3 big metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 32 }}>
        {[
          { l: 'Toplam gelir · Q1', v: '₺239,600', sub: '+18% (2025-Q4)', color: 'var(--success)' },
          { l: 'Toplam gider · Q1', v: '₺141,900', sub: '%59 gelir kullanımı', color: 'var(--fg)' },
          { l: 'Net bakiye', v: '₺97,700', sub: 'Yedek akçe: ₺48K', color: 'var(--accent)' },
        ].map(m => (
          <div key={m.l} style={{ padding: 20, background: 'var(--bg-elev)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
            <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>{m.l}</div>
            <div className="display" style={{ fontSize: 32, fontWeight: 500, letterSpacing: '-0.02em', color: m.color }}>{m.v}</div>
            <div className="mono" style={{ fontSize: 11, color: 'var(--fg-muted)', marginTop: 6 }}>{m.sub}</div>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div className="panel" style={{ padding: 24, marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div className="mono" style={{ fontSize: 11, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Aylık Gelir · Gider</div>
          <div style={{ display: 'flex', gap: 16, fontSize: 11 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 10, height: 10, borderRadius: 2, background: 'var(--accent)' }} /> Gelir</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 10, height: 10, borderRadius: 2, background: 'var(--fg-muted)', opacity: 0.5 }} /> Gider</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24, height: 180 }}>
          {months.map(m => (
            <div key={m.m} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', height: 150, width: '100%', justifyContent: 'center' }}>
                <div style={{ width: 20, height: `${(m.income / maxVal) * 100}%`, background: 'var(--accent)', borderRadius: '2px 2px 0 0' }} title={`₺${m.income.toLocaleString()}`} />
                <div style={{ width: 20, height: `${(m.expense / maxVal) * 100}%`, background: 'var(--fg-muted)', opacity: 0.4, borderRadius: '2px 2px 0 0' }} title={`₺${m.expense.toLocaleString()}`} />
              </div>
              <div style={{ fontSize: 11, fontWeight: 500 }}>{m.m}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Expense breakdown + Income sources */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div className="panel" style={{ padding: 24 }}>
          <div className="mono" style={{ fontSize: 11, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>Gider Kalemleri</div>
          {expenseBreakdown.map(e => (
            <div key={e.label} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                <span>{e.label}</span>
                <span className="mono" style={{ fontWeight: 600 }}>{e.pct}%</span>
              </div>
              <div style={{ height: 6, background: 'var(--bg-elev-2)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ width: `${e.pct}%`, height: '100%', background: e.color, borderRadius: 3 }} />
              </div>
            </div>
          ))}
        </div>

        <div className="panel" style={{ padding: 24 }}>
          <div className="mono" style={{ fontSize: 11, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>Gelir Kaynakları</div>
          {[
            { label: 'Üye aidatları', pct: 52 },
            { label: 'Marketplace komisyonu (%5)', pct: 34 },
            { label: 'Etkinlik biletleri', pct: 8 },
            { label: 'Sponsorluk', pct: 4 },
            { label: 'Bağışlar', pct: 2 },
          ].map((e, i) => (
            <div key={e.label} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                <span>{e.label}</span>
                <span className="mono" style={{ fontWeight: 600 }}>{e.pct}%</span>
              </div>
              <div style={{ height: 6, background: 'var(--bg-elev-2)', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ width: `${e.pct}%`, height: '100%', background: 'var(--accent)', opacity: 0.5 + (i * 0.1), borderRadius: 3 }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Download row */}
      <div style={{ marginTop: 32, padding: 20, border: '1px dashed var(--border)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Ayrıntılı belgeler</div>
          <div style={{ fontSize: 12, color: 'var(--fg-muted)' }}>Denetçi raporu, banka hesap özeti, vergi beyannameleri</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-ghost" style={{ fontSize: 12 }}>Q1 2026 (.pdf)</button>
          <button className="btn btn-ghost" style={{ fontSize: 12 }}>2025 Yıllık (.pdf)</button>
          <button className="btn btn-ghost" style={{ fontSize: 12 }}>Denetim (.pdf)</button>
        </div>
      </div>
    </div>
  );
};

// --- Governance ---
const AssocGovernance = () => {
  const board = [
    { name: 'Deniz Eldem', role: 'Başkan', term: '2025-2027', img: 'linear-gradient(135deg,#06b6d4,#ec4899)' },
    { name: 'Selen Atik', role: 'Başkan Yardımcısı', term: '2025-2027', img: 'linear-gradient(135deg,#4ade80,#fbbf24)' },
    { name: 'Asya Ören', role: 'Hazine', term: '2025-2027', img: 'linear-gradient(135deg,#e94e1b,#7c3aed)' },
    { name: 'Nil Tekbaş', role: 'Hukuk Sözcüsü', term: '2025-2027', img: 'linear-gradient(135deg,#8b2635,#d4a574)' },
    { name: 'Anatolian Lab', role: 'Genel Sekreter', term: '2025-2027', img: 'linear-gradient(135deg,#c23b22,#1a1a1a)' },
  ];

  const events = [
    { d: '18 May 2026', t: 'Olağan Genel Kurul', loc: 'İstanbul · Salt Galata · 14:00', tag: 'Yaklaşıyor', status: 'upcoming' },
    { d: '22 Nis 2026', t: 'Etik Kurul Aylık Toplantısı', loc: 'Çevrimiçi', tag: 'Bu hafta', status: 'upcoming' },
    { d: '10 Nis 2026', t: 'Yönetim Kurulu Kararı #26-04', loc: 'Marketplace komisyon %7→%5', tag: 'Tutanak', status: 'past' },
    { d: '28 Mar 2026', t: 'Olağanüstü Toplantı', loc: 'Etik çerçeve 1.2 onayı', tag: 'Tutanak', status: 'past' },
    { d: '12 Mar 2026', t: 'Üye Forumu (açık)', loc: 'Çevrimiçi · Q&A', tag: 'Kayıt', status: 'past' },
  ];

  return (
    <div>
      {/* Board */}
      <div style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 8 }}>Yönetim Kurulu</h2>
        <p style={{ fontSize: 13, color: 'var(--fg-muted)', marginBottom: 20 }}>2025 Ekim genel kurulda 2 yıllık görev için seçildi. Sıradaki seçim Ekim 2027.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
          {board.map(b => (
            <div key={b.name} style={{ padding: 16, background: 'var(--bg-elev)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: b.img, color: 'white', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 700, fontFamily: 'var(--font-mono)', marginBottom: 10 }}>
                {b.name.split(' ').map(w => w[0]).slice(0,2).join('')}
              </div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{b.name}</div>
              <div className="mono" style={{ fontSize: 10, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 4 }}>{b.role}</div>
              <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', marginTop: 2 }}>{b.term}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Events */}
      <div style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 20 }}>Toplantı Takvimi & Tutanaklar</h2>
        <div className="panel">
          {events.map((e, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '110px 1fr auto', gap: 20, padding: '16px 20px', borderBottom: '1px solid var(--border)', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600 }}>{e.d}</div>
                <div className="mono" style={{ fontSize: 9, color: e.status === 'upcoming' ? 'var(--accent)' : 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 2 }}>{e.tag}</div>
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 2 }}>{e.t}</div>
                <div style={{ fontSize: 12, color: 'var(--fg-muted)' }}>{e.loc}</div>
              </div>
              <button className="btn btn-ghost" style={{ fontSize: 11 }}>
                {e.status === 'upcoming' ? 'Katıl' : 'Tutanak →'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Voting / active proposal */}
      <div style={{ padding: 24, background: 'var(--accent-soft)', border: '1px solid var(--accent)', borderRadius: 'var(--radius-lg)' }}>
        <div className="mono" style={{ fontSize: 10, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 10 }}>Aktif Oylama · Üye oyuna açık · 4 gün kaldı</div>
        <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Teklif #26-07: Öğrenci üyelik kategorisi</h3>
        <p style={{ fontSize: 13, color: 'var(--fg-muted)', lineHeight: 1.6, marginBottom: 16, maxWidth: 640 }}>
          18-26 yaş arası öğrenciler için ₺240/yıl indirimli aidat kategorisi. Hukuki destek dahil; marketplace komisyonu standart kalır.
        </p>
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 6 }}>
            <span>248 oy toplandı</span>
            <span className="mono" style={{ color: 'var(--fg-muted)' }}>487 üye · %51 katılım</span>
          </div>
          <div style={{ display: 'flex', gap: 4, height: 28 }}>
            <div style={{ flex: 182, background: 'var(--success)', display: 'flex', alignItems: 'center', paddingLeft: 10, fontSize: 11, fontWeight: 600, color: 'white' }}>Evet · 182</div>
            <div style={{ flex: 42, background: 'var(--danger)', display: 'flex', alignItems: 'center', paddingLeft: 8, fontSize: 11, fontWeight: 600, color: 'white' }}>Hayır · 42</div>
            <div style={{ flex: 24, background: 'var(--fg-muted)', opacity: 0.5, display: 'flex', alignItems: 'center', paddingLeft: 6, fontSize: 11, fontWeight: 600, color: 'white' }}>Çekimser · 24</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-primary">Oyla</button>
          <button className="btn btn-ghost">Tartışmayı Oku (38)</button>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { AssociationPage });
