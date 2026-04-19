// Modül snapshot'u — PR-A merge olunca DB'den doldurulacak.
// Şimdilik BUILD_ORDER.md + MODULES.md'ye dayalı statik liste.

export type ModuleStatus = "active" | "passive" | "beta" | "maintenance";

export type ModuleSnapshot = {
  id: string;
  label: string;
  category: string;
  status: ModuleStatus;
  locked: boolean;
};

export const DEFAULT_MODULES: ModuleSnapshot[] = [
  // Çekirdek — locked
  { id: "home", label: "Ana Sayfa", category: "Çekirdek", status: "active", locked: true },
  { id: "discover", label: "Keşfet", category: "Çekirdek", status: "active", locked: true },
  { id: "search", label: "Arama", category: "Çekirdek", status: "active", locked: true },
  { id: "auth", label: "Giriş/Kayıt", category: "Çekirdek", status: "active", locked: true },
  { id: "account", label: "Hesap/Ayarlar", category: "Çekirdek", status: "active", locked: true },
  { id: "membership", label: "Üyelik", category: "Çekirdek", status: "active", locked: true },
  { id: "admin", label: "Yönetici Paneli", category: "Çekirdek", status: "active", locked: true },
  // Müzik
  { id: "trackDetail", label: "Parça Detayı", category: "Müzik", status: "active", locked: false },
  { id: "albumDetail", label: "Albüm Sayfası", category: "Müzik", status: "active", locked: false },
  { id: "artistProfile", label: "Sanatçı Profili", category: "Müzik", status: "active", locked: false },
  { id: "player", label: "Oynatıcı", category: "Müzik", status: "active", locked: false },
  { id: "playlists", label: "Çalma Listeleri", category: "Müzik", status: "active", locked: false },
  { id: "library", label: "Kitaplık", category: "Müzik", status: "active", locked: false },
  { id: "queue", label: "Kuyruk", category: "Müzik", status: "active", locked: false },
  { id: "radio", label: "Radyo", category: "Müzik", status: "passive", locked: false },
  // Üretim
  { id: "upload", label: "Yükleme", category: "Üretim", status: "active", locked: false },
  { id: "moderation", label: "Moderasyon", category: "Üretim", status: "active", locked: false },
  { id: "stems", label: "Stem Dağıtımı", category: "Üretim", status: "passive", locked: false },
  { id: "lineage", label: "Soy Ağacı", category: "Üretim", status: "passive", locked: false },
  { id: "styleDNA", label: "Stil DNA", category: "Üretim", status: "passive", locked: false },
  { id: "aiclips", label: "AI Klipleri", category: "Üretim", status: "passive", locked: false },
  { id: "clips", label: "Klipler", category: "Üretim", status: "passive", locked: false },
  // Ticaret
  { id: "marketplace", label: "Marketplace", category: "Ticaret", status: "active", locked: false },
  { id: "cart", label: "Sepet", category: "Ticaret", status: "active", locked: false },
  { id: "checkout", label: "Ödeme", category: "Ticaret", status: "active", locked: false },
  { id: "b2b", label: "B2B Portalı", category: "Ticaret", status: "passive", locked: false },
  // Dernek
  { id: "association", label: "Dernek", category: "Dernek", status: "active", locked: false },
  { id: "transparency", label: "Mali Şeffaflık", category: "Dernek", status: "active", locked: false },
  { id: "compliance", label: "Uyum / Etik", category: "Dernek", status: "active", locked: false },
  // Topluluk
  { id: "forum", label: "Forum", category: "Topluluk", status: "active", locked: false },
  { id: "news", label: "Haberler", category: "Topluluk", status: "active", locked: false },
  { id: "contest", label: "Yarışmalar", category: "Topluluk", status: "active", locked: false },
  { id: "chat", label: "Sohbet", category: "Topluluk", status: "passive", locked: false },
  { id: "livesessions", label: "Canlı Oturumlar", category: "Topluluk", status: "passive", locked: false },
  { id: "following", label: "Takip", category: "Topluluk", status: "active", locked: false },
  // AI
  { id: "promptmarket", label: "Prompt Pazarı", category: "AI", status: "passive", locked: false },
  { id: "models", label: "Model Rehberi", category: "AI", status: "passive", locked: false },
  { id: "aiassist", label: "AI Asistan", category: "AI", status: "passive", locked: false },
  { id: "remix", label: "Remix Studio", category: "AI", status: "passive", locked: false },
  // Platform
  { id: "notifications", label: "Bildirimler", category: "Platform", status: "active", locked: false },
  { id: "feedback", label: "Geri Bildirim", category: "Platform", status: "active", locked: false },
  // Sanatçı/kullanıcı sayfaları (nav item ama modül değil)
  { id: "profile", label: "Profil", category: "Hesap", status: "active", locked: false },
  { id: "settings", label: "Ayarlar", category: "Hesap", status: "active", locked: false },
  { id: "playlist", label: "Playlist", category: "Müzik", status: "active", locked: false },
];

export function moduleAccessible(m: ModuleSnapshot | null | undefined): boolean {
  if (!m) return true;
  if (m.locked) return true;
  return m.status !== "passive";
}

// PR-A sonrası: bu fonksiyon DB'den okuyacak.
export async function getAllModules(): Promise<ModuleSnapshot[]> {
  return DEFAULT_MODULES;
}

export async function getModule(id: string): Promise<ModuleSnapshot | null> {
  return DEFAULT_MODULES.find((m) => m.id === id) ?? null;
}

export function buildModuleMap(list: ModuleSnapshot[]): Record<string, ModuleSnapshot> {
  const out: Record<string, ModuleSnapshot> = {};
  for (const m of list) out[m.id] = m;
  return out;
}
