// Global module registry — admin can toggle features on/off
// Each module has: id, label, category, status (active|passive|beta|maintenance), description

const MODULES_DEFAULT = {
  // Çekirdek (locked on)
  home:          { label: 'Ana Sayfa',      cat: 'Çekirdek', status: 'active', locked: true,  desc: 'Ana giriş ekranı' },
  discover:      { label: 'Keşfet',         cat: 'Çekirdek', status: 'active', locked: true,  desc: 'Parça kataloğu' },
  news:          { label: 'Haberler',       cat: 'Çekirdek', status: 'active', locked: true,  desc: 'Yayın ve duyurular' },
  forum:         { label: 'Forum',          cat: 'Çekirdek', status: 'active', locked: true,  desc: 'Topluluk tartışması' },
  // Ticaret
  marketplace:   { label: 'Marketplace',    cat: 'Ticaret',  status: 'active', desc: 'Parça satış platformu' },
  cart:          { label: 'Sepet & Ödeme',  cat: 'Ticaret',  status: 'active', desc: 'iyzico ödeme akışı' },
  promptmarket:  { label: 'Prompt Market',  cat: 'Ticaret',  status: 'active', desc: 'Admin onaylı prompt satışı' },
  library:       { label: 'Kütüphane',      cat: 'Ticaret',  status: 'active', desc: 'Satın alınan parçalar' },
  // Topluluk
  contest:       { label: 'Yarışma',        cat: 'Topluluk', status: 'active', desc: 'Aylık yarışmalar + challenge' },
  clips:         { label: 'AI Klipler',     cat: 'Topluluk', status: 'active', desc: 'Video klip feed' },
  livesessions:  { label: 'Canlı Oturum',   cat: 'Topluluk', status: 'active', desc: 'Workshop + atölyeler' },
  remix:         { label: 'Remix Studio',   cat: 'Topluluk', status: 'active', desc: 'Stem paylaşımlı remix davetleri' },
  chat:          { label: 'Sohbet',         cat: 'Topluluk', status: 'active', desc: 'Kanal bazlı sohbet (mIRC tarzı)' },
  playlist:      { label: 'Playlist',       cat: 'Topluluk', status: 'active', desc: 'Kullanıcı ve editör seçkileri' },
  radio:         { label: 'Radyo',          cat: 'Topluluk', status: 'active', desc: 'Algoritmik kanal akışı' },
  // Sanatçı
  upload:        { label: 'Parça Yükle',    cat: 'Sanatçı',  status: 'active', desc: '5 adımlı yükleme akışı' },
  compliance:    { label: 'AI Uyumluluk',   cat: 'Sanatçı',  status: 'active', desc: 'İntihal + model imzası tarama' },
  models:        { label: 'Model Keşfi',    cat: 'Sanatçı',  status: 'active', desc: 'Suno/Udio/Stable kıyas' },
  split:         { label: 'Split & Collab', cat: 'Sanatçı',  status: 'passive', desc: 'Gelir paylaşımı ve onay' },
  lineage:       { label: 'Soy Ağacı',      cat: 'Sanatçı',  status: 'active', desc: 'Parça köken grafiği' },
  styledna:      { label: 'Stil DNA',       cat: 'Sanatçı',  status: 'active', desc: 'Sanatçı stil imzası' },
  earnings:      { label: 'Gelir Paneli',   cat: 'Sanatçı',  status: 'active', desc: 'Satış + bağış paneli' },
  profile:       { label: 'Profil',         cat: 'Sanatçı',  status: 'active', desc: 'Sanatçı portföyü' },
  // Dernek
  association:   { label: 'Dernek',         cat: 'Dernek',   status: 'active', desc: 'Dernek ana sayfa + etik' },
  membership:    { label: 'Üyelik Kartı',   cat: 'Dernek',   status: 'active', desc: 'Dijital kart + rozet' },
  ethics:        { label: 'Etik İtiraz',    cat: 'Dernek',   status: 'active', desc: 'İtiraz merkezi + vaka takip' },
  guide:         { label: 'Hukuk Rehberi',  cat: 'Dernek',   status: 'active', desc: 'Telif, vergi, etik makaleler' },
  assembly:      { label: 'Genel Kurul',    cat: 'Dernek',   status: 'passive', desc: 'Yıllık oylama ve gündem' },
  donation:      { label: 'Bağış',          cat: 'Dernek',   status: 'active', desc: 'Derneğe bağış ve şeffaflık' },
  // Deneysel
  aiassist:      { label: 'AI Asistan',     cat: 'Deneysel', status: 'active', desc: 'Claude destekli sohbet' },
  b2b:           { label: 'B2B Portal',     cat: 'Deneysel', status: 'active', desc: 'Plak/reklam ajansları' },
  pwa:           { label: 'PWA Mobil',      cat: 'Deneysel', status: 'active', desc: 'Ana ekrana ekle, offline' },
  // Hesap
  notifications: { label: 'Bildirimler',    cat: 'Hesap',    status: 'active', locked: true, desc: 'Bildirim merkezi' },
  settings:      { label: 'Ayarlar',        cat: 'Hesap',    status: 'active', locked: true, desc: 'Kullanıcı ayarları' },
  admin:         { label: 'Yönetim',        cat: 'Hesap',    status: 'active', locked: true, desc: 'Admin paneli' },
};

const STATUS_META = {
  active:      { label: 'Aktif',  color: 'var(--success)', bg: 'rgba(16,185,129,0.15)' },
  passive:     { label: 'Pasif',  color: 'var(--fg-muted)', bg: 'var(--bg-elev-2)' },
  beta:        { label: 'Beta',   color: 'var(--accent)',  bg: 'var(--accent-soft)' },
  maintenance: { label: 'Bakım',  color: 'var(--warning)', bg: 'rgba(245,158,11,0.15)' },
};

const loadModules = () => {
  try {
    const saved = JSON.parse(localStorage.getItem('yazsad-modules') || '{}');
    const merged = {};
    for (const k of Object.keys(MODULES_DEFAULT)) {
      merged[k] = { ...MODULES_DEFAULT[k], ...(saved[k] || {}) };
    }
    return merged;
  } catch { return { ...MODULES_DEFAULT }; }
};

const saveModules = (mods) => {
  const lite = {};
  for (const k of Object.keys(mods)) lite[k] = { status: mods[k].status };
  localStorage.setItem('yazsad-modules', JSON.stringify(lite));
};

// Is a module accessible to current role?
const moduleAccessible = (mod, role = 'user') => {
  if (!mod) return false;
  if (mod.status === 'active') return true;
  if (mod.status === 'beta' && role === 'admin') return true;
  return false;
};

Object.assign(window, { MODULES_DEFAULT, STATUS_META, loadModules, saveModules, moduleAccessible });
