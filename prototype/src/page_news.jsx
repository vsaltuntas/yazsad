// News — list + detail

const NewsPage = () => {
  const [selected, setSelected] = React.useState(null);

  if (selected) return <NewsDetail article={selected} onBack={() => setSelected(null)} />;

  const featured = NEWS[0];
  const rest = NEWS.slice(1);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Derneğin sesi · Nisan 2026</div>
          <h1 className="page-title">Haberler</h1>
          <p className="page-subtitle">
            Duyurular, röportajlar, politika belgeleri ve topluluk etkinlikleri.
          </p>
        </div>
        <div className="chip-row">
          <button className="chip active">Tümü</button>
          <button className="chip">Duyuru</button>
          <button className="chip">Röportaj</button>
          <button className="chip">Politika</button>
          <button className="chip">İnceleme</button>
          <button className="chip">Teknik</button>
        </div>
      </div>

      <div className="news-grid">
        {/* Featured */}
        <div className="news-featured" onClick={() => setSelected(featured)}>
          <div className="news-thumb">
            <GenArt g1={featured.g1} g2={featured.g2} g3={featured.g3} seed={1} />
          </div>
          <div>
            <div className="news-meta">
              <span className="news-meta-cat">{featured.category}</span>
              <span>·</span>
              <span>{featured.date}</span>
              <span>·</span>
              <span>{featured.reading}</span>
            </div>
            <h2 className="news-title" style={{ fontSize: 32, marginTop: 12 }}>{featured.title}</h2>
            <p className="news-excerpt" style={{ marginTop: 12 }}>{featured.excerpt}</p>
            <div style={{ marginTop: 16, fontSize: 12, color: 'var(--fg-muted)' }}>Yazan: <span style={{ color: 'var(--fg)' }}>{featured.author}</span></div>
          </div>
        </div>

        {rest.map(n => (
          <div key={n.id} className="news-card" onClick={() => setSelected(n)}>
            <div className="news-thumb">
              <GenArt g1={n.g1} g2={n.g2} g3={n.g3} seed={parseInt(n.id.replace('n',''))*3} />
            </div>
            <div className="news-meta">
              <span className="news-meta-cat">{n.category}</span>
              <span>·</span>
              <span>{n.date}</span>
              <span>·</span>
              <span>{n.reading}</span>
            </div>
            <h3 className="news-title">{n.title}</h3>
            <p className="news-excerpt">{n.excerpt}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const NewsDetail = ({ article, onBack }) => {
  return (
    <div className="page" style={{ maxWidth: 780 }}>
      <button className="btn btn-ghost" onClick={onBack} style={{ marginBottom: 24 }}>← Haberlere dön</button>

      <div className="news-meta" style={{ marginBottom: 16 }}>
        <span className="news-meta-cat">{article.category}</span>
        <span>·</span>
        <span>{article.date}</span>
        <span>·</span>
        <span>{article.reading} okuma</span>
      </div>

      <h1 className="display" style={{ fontSize: 56, fontWeight: 500, lineHeight: 1.05, letterSpacing: '-0.025em', margin: '0 0 20px', textWrap: 'pretty' }}>
        {article.title}
      </h1>
      <p style={{ fontSize: 18, color: 'var(--fg-muted)', lineHeight: 1.5, marginBottom: 32, textWrap: 'pretty' }}>
        {article.excerpt}
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 24, borderBottom: '1px solid var(--border)', marginBottom: 32 }}>
        <div className="avatar">{article.author.split(' ').map(w => w[0]).slice(0,2).join('')}</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600 }}>{article.author}</div>
          <div className="mono" style={{ fontSize: 11, color: 'var(--fg-muted)' }}>YAZSAD · Yayın Kurulu</div>
        </div>
        <button className="btn btn-ghost" style={{ marginLeft: 'auto', fontSize: 12 }}>Takip et</button>
      </div>

      <div style={{ aspectRatio: '16/9', borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: 32, position: 'relative' }}>
        <GenArt g1={article.g1} g2={article.g2} g3={article.g3} seed={42} />
      </div>

      <div style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--fg)', fontFamily: 'var(--font-display)', fontWeight: 400 }}>
        <p style={{ fontSize: 22, fontStyle: 'italic', borderLeft: '2px solid var(--accent)', paddingLeft: 20, margin: '0 0 32px', color: 'var(--fg-muted)' }}>
          "Bu festival sadece bir etkinlik değil; Türkiye'nin AI müzik sahnesinin ne kadar hızlı olgunlaştığının ilanı."
        </p>
        <p>12 Mayıs 2026 akşamı, İstanbul Modern'in terasında YAZSAD üyelerinin bir yıllık emeği sahneye çıkacak. Dernek bünyesinde üretilen 240'tan fazla eser içinden jüri ve topluluk oylarıyla seçilen 24 parça, canlı performanslarla dinleyiciyle buluşacak.</p>
        <p>Etkinlik; <strong>Anatolian Lab</strong>, <strong>SES/0</strong>, <strong>Deniz Eldem</strong>, <strong>Hece Makinesi</strong> ve <strong>Kara Orman</strong> gibi üyelerimizin canlı performanslarıyla açılacak. Ayrıca 8 yeni sanatçı ilk kez dernek bünyesinde sahne alacak.</p>
        <h2 className="display" style={{ fontSize: 28, fontWeight: 500, margin: '40px 0 16px', letterSpacing: '-0.01em' }}>Kayıtlar ve biletler</h2>
        <p>Dernek üyeleri için ücretsiz katılım hakkı, Nisan sonuna kadar başvuru sistemi üzerinden alınabilir. Dinleyici biletleri 1 Mayıs'ta satışa sunulacak; erken kayıt dernek üyelerine ₺180, diğer katılımcılara ₺320.</p>
        <p>Etkinliğin ardından Haziran'da yayınlanacak festival albümü, tüm katılımcı sanatçıları bir araya getirecek. Albüm geliri derneğin eğitim bursu fonuna aktarılacak.</p>
      </div>

      <div style={{ marginTop: 48, padding: 24, background: 'var(--bg-elev)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
        <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>İlgili içerik</div>
        {NEWS.slice(1, 4).map(n => (
          <div key={n.id} style={{ padding: '10px 0', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 12 }}>
            <span className="mono" style={{ fontSize: 11, color: 'var(--accent)', textTransform: 'uppercase', minWidth: 80 }}>{n.category}</span>
            <span style={{ fontSize: 13, fontWeight: 500, flex: 1 }}>{n.title}</span>
            <span className="mono" style={{ fontSize: 11, color: 'var(--fg-muted)' }}>{n.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

Object.assign(window, { NewsPage, NewsDetail });
