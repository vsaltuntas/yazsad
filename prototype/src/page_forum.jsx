// Forum — list + thread detail

const ForumPage = () => {
  const [selected, setSelected] = React.useState(null);
  const [filter, setFilter] = React.useState('Tümü');

  if (selected) return <ThreadDetail topic={selected} onBack={() => setSelected(null)} />;

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Topluluk · 48.2K mesaj · 3,847 üye</div>
          <h1 className="page-title">Forum</h1>
          <p className="page-subtitle">
            Teknik sorular, tartışmalar, gösterim. Dernek üyesi olmadan da okuyabilirsin; yazmak için üye ol.
          </p>
        </div>
        <button className="btn btn-primary"><IPlus size={14} />Yeni Konu</button>
      </div>

      <div className="chip-row" style={{ marginBottom: 20 }}>
        {['Tümü', 'Teknik', 'Tartışma', 'Yardım', 'Gösterim', 'Etkinlik', 'Duyuru'].map(f => (
          <button key={f} className={`chip ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>{f}</button>
        ))}
      </div>

      <div className="forum-list">
        <div className="forum-row header">
          <span></span>
          <span>Konu</span>
          <span>Yanıt</span>
          <span>Görüntüleme</span>
          <span>Son</span>
        </div>
        {FORUM_TOPICS.map(t => (
          <div key={t.id} className={`forum-row ${t.pinned ? 'pinned' : ''}`} onClick={() => setSelected(t)}>
            <div className="forum-icon">
              {t.pinned ? <IPin size={14} /> : t.hot ? <IFire size={14} /> : <IForum size={14} />}
            </div>
            <div className="forum-title-col">
              <div className="forum-topic">
                {t.pinned && <span className="forum-tag pin">SABIT</span>}
                {!t.pinned && <span className="forum-tag">{t.tag}</span>}
                {t.hot && <span className="forum-tag sıcak">SICAK</span>}
                {t.title}
              </div>
              <div className="forum-sub">
                <span>{t.author}</span>
                {t.role && <span style={{ color: 'var(--accent)' }}>· {t.role}</span>}
                <span>· Son yanıt {t.lastUser}</span>
              </div>
            </div>
            <div className="forum-meta"><strong>{t.replies}</strong>yanıt</div>
            <div className="forum-meta"><strong>{t.views}</strong>görüntü</div>
            <div className="forum-meta" style={{ minWidth: 84 }}>{t.last}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 32, gap: 4 }}>
        {[1,2,3,'…',24].map((p, i) => (
          <button key={i} className={`btn btn-ghost`} style={p === 1 ? { background: 'var(--bg-elev-2)', borderColor: 'var(--border-strong)' } : {}}>
            {p}
          </button>
        ))}
      </div>
    </div>
  );
};

const ThreadDetail = ({ topic, onBack }) => {
  const [reply, setReply] = React.useState('');
  return (
    <div className="page" style={{ maxWidth: 900 }}>
      <button className="btn btn-ghost" onClick={onBack} style={{ marginBottom: 20 }}>← Forum</button>

      <div style={{ marginBottom: 24 }}>
        <div className="forum-sub" style={{ marginBottom: 10 }}>
          <span className="forum-tag">{topic.tag}</span>
          <span>· {topic.views} görüntüleme</span>
          <span>· {topic.replies} yanıt</span>
        </div>
        <h1 className="display" style={{ fontSize: 36, fontWeight: 500, lineHeight: 1.15, letterSpacing: '-0.02em', margin: 0, textWrap: 'pretty' }}>
          {topic.title}
        </h1>
      </div>

      {THREAD_POSTS.map((p, idx) => (
        <div key={p.id} className={`thread-post ${p.op ? 'op' : ''}`}>
          <div className="avatar" style={{ background: ['linear-gradient(135deg,#e94e1b,#7c3aed)','linear-gradient(135deg,#06b6d4,#fbbf24)','linear-gradient(135deg,#4ade80,#c23b22)'][idx % 3] }}>
            {p.author.split(' ').map(w => w[0]).slice(0,2).join('')}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
              <div className="post-author">
                {p.author}
                {p.role && <span className="role">{p.role}</span>}
                {p.op && <span className="role" style={{ color: 'var(--fg-muted)', background: 'var(--bg-elev-2)' }}>KONU SAHİBİ</span>}
              </div>
              <div className="post-time">{p.time}</div>
            </div>
            <div className="post-body">
              {p.body.map((para, i) => <p key={i}>{para}</p>)}
            </div>
            <div className="post-actions">
              <button><IHeart size={12} style={{ marginRight: 4, verticalAlign: 'middle' }} />Beğen · 12</button>
              <button>Yanıtla</button>
              <button>Alıntıla</button>
              <button style={{ marginLeft: 'auto' }}><IMore size={14} /></button>
            </div>
          </div>
        </div>
      ))}

      {/* Reply box */}
      <div style={{ marginTop: 24, padding: 20, border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', background: 'var(--bg-elev)' }}>
        <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>Yanıt yaz</div>
        <textarea
          className="input"
          rows="4"
          value={reply}
          onChange={e => setReply(e.target.value)}
          placeholder="Katkını ekle — konu başlığına uygun, saygılı ve yardımsever bir ton kullan."
          style={{ resize: 'vertical', fontFamily: 'inherit' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
          <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)' }}>
            Markdown destekli · {reply.length} / 5000
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-ghost">Taslak Kaydet</button>
            <button className="btn btn-primary">Gönder</button>
          </div>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { ForumPage, ThreadDetail });
