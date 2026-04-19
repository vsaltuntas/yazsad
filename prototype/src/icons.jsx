// Icons — minimal set drawn as inline SVG components

const Icon = ({ d, size = 18, stroke = false, fill = 'currentColor', strokeW = 1.8 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={stroke ? 'none' : fill} stroke={stroke ? 'currentColor' : 'none'} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round">
    {typeof d === 'string' ? <path d={d} /> : d}
  </svg>
);

const IHome = (p) => <Icon {...p} stroke d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1h-5v-7h-6v7H4a1 1 0 01-1-1V10.5z" />;
const ICompass = (p) => <Icon {...p} stroke d={<><circle cx="12" cy="12" r="9"/><path d="M15.5 8.5L13 13l-4.5 2.5L11 11z"/></>} />;
const INews = (p) => <Icon {...p} stroke d={<><path d="M4 5h12v14H4z"/><path d="M16 9h4v10a2 2 0 01-2 2H5"/><path d="M7 9h6M7 12h6M7 15h4"/></>} />;
const IForum = (p) => <Icon {...p} stroke d="M21 12a8 8 0 01-8 8H5l2-3a8 8 0 1114-5z" />;
const ISettings = (p) => <Icon {...p} stroke d={<><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5v.2a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3h0a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8v0a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z"/></>} />;
const IAdmin = (p) => <Icon {...p} stroke d={<><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></>} />;
const ILibrary = (p) => <Icon {...p} stroke d={<><rect x="3" y="3" width="7" height="18"/><rect x="10" y="6" width="4" height="15"/><path d="M16 8l3-1 2 14-3 1z"/></>} />;
const IUpload = (p) => <Icon {...p} stroke d={<><path d="M12 3v14M6 9l6-6 6 6"/><path d="M3 21h18"/></>} />;
const IHeart = (p) => <Icon {...p} stroke d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />;
const IVideo = (p) => <Icon {...p} stroke d={<><rect x="2" y="6" width="14" height="12" rx="2"/><path d="M22 8l-6 4 6 4z"/></>} />;
const ICart = (p) => <Icon {...p} stroke d={<><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></>} />;
const IBell = (p) => <Icon {...p} stroke d={<><path d="M18 8a6 6 0 00-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></>} />;
const ISearch = (p) => <Icon {...p} stroke d={<><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/></>} />;
const IPlay = (p) => <Icon {...p} d="M8 5v14l11-7z" />;
const IPause = (p) => <Icon {...p} d={<><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></>} />;
const ISkipF = (p) => <Icon {...p} d={<><path d="M5 4l10 8-10 8z"/><rect x="16" y="4" width="3" height="16"/></>} />;
const ISkipB = (p) => <Icon {...p} d={<><path d="M19 4L9 12l10 8z"/><rect x="5" y="4" width="3" height="16"/></>} />;
const IShuffle = (p) => <Icon {...p} stroke d={<><path d="M16 3h5v5"/><path d="M4 20L21 3"/><path d="M21 16v5h-5"/><path d="M15 15l6 6"/><path d="M4 4l5 5"/></>} />;
const IRepeat = (p) => <Icon {...p} stroke d={<><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 014-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 01-4 4H3"/></>} />;
const IVolume = (p) => <Icon {...p} stroke d={<><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 010 7.07"/><path d="M19.07 4.93a10 10 0 010 14.14"/></>} />;
const IX = (p) => <Icon {...p} stroke d="M18 6L6 18M6 6l12 12" />;
const IDown = (p) => <Icon {...p} stroke d="M6 9l6 6 6-6" />;
const IExpand = (p) => <Icon {...p} stroke d={<><path d="M15 3h6v6"/><path d="M9 21H3v-6"/><path d="M21 3l-7 7"/><path d="M3 21l7-7"/></>} />;
const IPin = (p) => <Icon {...p} stroke d="M12 17v5M5 3h14l-2 8H7zM8 11l-4 6h16l-4-6" />;
const IFire = (p) => <Icon {...p} d="M12 2C10 6 5 7 5 13a7 7 0 0014 0c0-4-3-5-5-9-1 3-2 4-4 5 0-3 1-5 2-7z" />;
const IPlus = (p) => <Icon {...p} stroke d="M12 5v14M5 12h14" strokeW={2} />;
const ICheck = (p) => <Icon {...p} stroke d="M20 6L9 17l-5-5" strokeW={2.4} />;
const ISliders = (p) => <Icon {...p} stroke d={<><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></>} />;
const IMore = (p) => <Icon {...p} d={<><circle cx="5" cy="12" r="1.8"/><circle cx="12" cy="12" r="1.8"/><circle cx="19" cy="12" r="1.8"/></>} />;
const IUsers = (p) => <Icon {...p} stroke d={<><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></>} />;
const IMusic = (p) => <Icon {...p} stroke d={<><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></>} />;
const IMenu = (p) => <Icon {...p} stroke d="M3 6h18M3 12h18M3 18h18" strokeW={2} />;
const IEdit = (p) => <Icon {...p} stroke d="M12 20h9M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4 12.5-12.5z" />;
const IArrow = (p) => <Icon {...p} stroke d="M5 12h14M12 5l7 7-7 7" />;
const IEye = (p) => <Icon {...p} stroke d={<><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></>} />;
const IMsg = (p) => <Icon {...p} stroke d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />;
const IList = (p) => <Icon {...p} stroke d={<><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></>} />;

// Generic generative placeholder art — gradients + pseudo-visual depth
const GenArt = ({ g1, g2, g3, seed = 1, children }) => {
  // Some abstract overlay shapes for variety
  const r1 = (seed * 13) % 100;
  const r2 = (seed * 31) % 100;
  const r3 = (seed * 47) % 100;
  return (
    <div className="track-art-gen" style={{
      background: `
        radial-gradient(circle at ${r1}% ${r2}%, ${g1} 0%, transparent 55%),
        radial-gradient(circle at ${100 - r1}% ${100 - r3}%, ${g2} 0%, transparent 60%),
        ${g3}
      `,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Subtle grain + shape */}
      <svg style={{position:'absolute', inset:0, width:'100%', height:'100%', mixBlendMode:'overlay', opacity:0.35}} viewBox="0 0 100 100" preserveAspectRatio="none">
        <circle cx={r1} cy={r3} r={15 + (seed % 10)} fill="white" fillOpacity="0.15" />
        <path d={`M0 ${50 + (seed*3)%30} Q 25 ${20 + (seed*7)%40}, 50 ${40 + (seed*5)%30} T 100 ${50 + (seed*11)%30}`} stroke="white" strokeOpacity="0.2" strokeWidth="0.5" fill="none" />
      </svg>
      {children}
    </div>
  );
};

Object.assign(window, {
  Icon,
  IHome, ICompass, INews, IForum, ISettings, IAdmin, ILibrary, IUpload, IHeart, IVideo, ICart, IBell, ISearch,
  IPlay, IPause, ISkipF, ISkipB, IShuffle, IRepeat, IVolume, IX, IDown, IExpand, IPin, IFire, IPlus, ICheck, ISliders, IMore, IUsers, IMusic, IMenu, IEdit, IArrow, IEye, IMsg, IList,
  GenArt,
});
