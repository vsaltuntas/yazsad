// Reusable EmptyState component

const EmptyState = ({
  icon: Icon = null,
  title,
  desc,
  action,
  onAction,
  secondary,
  onSecondary,
  suggestions = null,  // optional array of track/item suggestions
  art = null,          // optional custom JSX for top decoration
  size = 'md',         // sm | md | lg
  tone = 'default',    // default | accent
}) => {
  const padding = size === 'lg' ? '80px 40px' : size === 'sm' ? '40px 20px' : '60px 32px';
  const iconSize = size === 'lg' ? 32 : size === 'sm' ? 20 : 26;
  const titleSize = size === 'lg' ? 32 : size === 'sm' ? 18 : 24;
  const circleSize = size === 'lg' ? 72 : size === 'sm' ? 48 : 60;

  return (
    <div style={{
      padding,
      textAlign: 'center',
      maxWidth: 520,
      margin: '0 auto',
    }}>
      {art}
      {Icon && !art && (
        <div style={{
          width: circleSize, height: circleSize, borderRadius: '50%',
          background: tone === 'accent' ? 'var(--accent-soft)' : 'var(--bg-elev-2)',
          color: tone === 'accent' ? 'var(--accent)' : 'var(--fg-muted)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 20,
          border: '1px solid var(--border)',
        }}>
          <Icon size={iconSize} />
        </div>
      )}
      <div className="display" style={{ fontSize: titleSize, fontWeight: 500, marginBottom: 8, lineHeight: 1.2 }}>{title}</div>
      {desc && (
        <div style={{ color: 'var(--fg-muted)', fontSize: 13, lineHeight: 1.6, marginBottom: 24, textWrap: 'pretty' }}>{desc}</div>
      )}
      {(action || secondary) && (
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
          {secondary && (
            <button className="btn btn-ghost" onClick={onSecondary} style={{ fontSize: 12 }}>{secondary}</button>
          )}
          {action && (
            <button className="btn btn-primary" onClick={onAction} style={{ fontSize: 12 }}>{action}</button>
          )}
        </div>
      )}
      {suggestions && suggestions.length > 0 && (
        <div style={{ marginTop: 40 }}>
          <div className="mono" style={{ fontSize: 10, color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>Belki beğenirsin</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12, textAlign: 'left' }}>
            {suggestions}
          </div>
        </div>
      )}
    </div>
  );
};

// Empty queue art — audio wave flatline
const EmptyQueueArt = () => (
  <svg width="140" height="48" viewBox="0 0 140 48" style={{ margin: '0 auto 20px', display: 'block', opacity: 0.4 }}>
    <line x1="0" y1="24" x2="140" y2="24" stroke="var(--fg-muted)" strokeWidth="1" strokeDasharray="2 4" />
    {[...Array(12)].map((_, i) => (
      <circle key={i} cx={10 + i * 11} cy={24} r="1.5" fill="var(--fg-muted)" />
    ))}
  </svg>
);

// Empty library art — record stack
const EmptyLibraryArt = () => (
  <svg width="96" height="96" viewBox="0 0 96 96" style={{ margin: '0 auto 24px', display: 'block', opacity: 0.5 }}>
    <circle cx="48" cy="48" r="36" fill="none" stroke="var(--border)" strokeWidth="1.5" />
    <circle cx="48" cy="48" r="24" fill="none" stroke="var(--border)" strokeWidth="1" strokeDasharray="3 3" />
    <circle cx="48" cy="48" r="12" fill="var(--bg-elev-2)" stroke="var(--border)" strokeWidth="1" />
    <circle cx="48" cy="48" r="3" fill="var(--accent)" />
    <line x1="48" y1="24" x2="48" y2="12" stroke="var(--border)" strokeWidth="1.2" />
  </svg>
);

// Empty cart art
const EmptyCartArt = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" style={{ margin: '0 auto 20px', display: 'block', opacity: 0.5 }}>
    <circle cx="40" cy="40" r="36" fill="var(--bg-elev-2)" stroke="var(--border)" strokeWidth="1" />
    <path d="M25 30 L30 30 L33 50 L55 50 L58 35 L33 35" fill="none" stroke="var(--fg-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="37" cy="58" r="2.5" fill="var(--fg-muted)" />
    <circle cx="52" cy="58" r="2.5" fill="var(--fg-muted)" />
  </svg>
);

// Empty bell art
const EmptyBellArt = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" style={{ margin: '0 auto 20px', display: 'block', opacity: 0.5 }}>
    <circle cx="40" cy="40" r="36" fill="var(--bg-elev-2)" stroke="var(--border)" strokeWidth="1" />
    <path d="M30 45 Q30 28, 40 28 Q50 28, 50 45 L52 50 L28 50 Z" fill="none" stroke="var(--fg-muted)" strokeWidth="1.5" strokeLinejoin="round" />
    <circle cx="40" cy="54" r="3" fill="none" stroke="var(--fg-muted)" strokeWidth="1.5" />
    <line x1="54" y1="26" x2="58" y2="22" stroke="var(--success)" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="58" cy="22" r="2" fill="var(--success)" />
  </svg>
);

Object.assign(window, { EmptyState, EmptyQueueArt, EmptyLibraryArt, EmptyCartArt, EmptyBellArt });
