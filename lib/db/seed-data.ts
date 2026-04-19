// Sabit seed verisi — `pnpm db:seed` çalıştırıldığında yüklenir.
import type { ModuleStatus } from "./schema";

export type ModuleSeed = {
  id: string;
  label: string;
  category: string;
  status: ModuleStatus;
  locked?: boolean;
  description?: string;
};

export const MODULE_SEED: ModuleSeed[] = [
  // Çekirdek
  { id: "home", label: "Ana Sayfa", category: "Çekirdek", status: "active", locked: true },
  { id: "discover", label: "Keşfet", category: "Çekirdek", status: "active", locked: true },
  { id: "search", label: "Arama", category: "Çekirdek", status: "active", locked: true },
  { id: "auth", label: "Giriş/Kayıt", category: "Çekirdek", status: "active", locked: true },
  { id: "account", label: "Hesap/Ayarlar", category: "Çekirdek", status: "active", locked: true },
  { id: "membership", label: "Üyelik", category: "Çekirdek", status: "active", locked: true },
  { id: "admin", label: "Yönetici Paneli", category: "Çekirdek", status: "active", locked: true },

  // Müzik — Dinleme
  { id: "trackDetail", label: "Parça Detayı", category: "Müzik", status: "active" },
  { id: "albumDetail", label: "Albüm Sayfası", category: "Müzik", status: "active" },
  { id: "artistProfile", label: "Sanatçı Profili", category: "Müzik", status: "active" },
  { id: "player", label: "Oynatıcı", category: "Müzik", status: "active" },
  { id: "playlists", label: "Çalma Listeleri", category: "Müzik", status: "active" },
  { id: "library", label: "Kitaplık", category: "Müzik", status: "active" },
  { id: "queue", label: "Kuyruk", category: "Müzik", status: "active" },
  { id: "radio", label: "Radyo", category: "Müzik", status: "passive" },

  // Müzik — Üretim
  { id: "upload", label: "Yükleme", category: "Üretim", status: "active" },
  { id: "moderation", label: "Moderasyon Kuyruğu", category: "Üretim", status: "active" },
  { id: "stems", label: "Stem Dağıtımı", category: "Üretim", status: "passive" },
  { id: "lineage", label: "Soy Ağacı", category: "Üretim", status: "passive" },
  { id: "styleDNA", label: "Stil DNA", category: "Üretim", status: "passive" },
  { id: "aiclips", label: "AI Klipleri", category: "Üretim", status: "passive" },

  // Ticaret
  { id: "marketplace", label: "Marketplace", category: "Ticaret", status: "active" },
  { id: "cart", label: "Sepet", category: "Ticaret", status: "active" },
  { id: "checkout", label: "Ödeme", category: "Ticaret", status: "active" },
  { id: "licensing", label: "Lisans Yönetimi", category: "Ticaret", status: "active" },
  { id: "payouts", label: "Sanatçı Ödemeleri", category: "Ticaret", status: "active" },
  { id: "promotions", label: "Promosyon Kodları", category: "Ticaret", status: "passive" },
  { id: "b2b", label: "B2B Portalı", category: "Ticaret", status: "passive" },
  { id: "merch", label: "Merchandise", category: "Ticaret", status: "passive" },

  // Dernek
  { id: "association", label: "Dernek Ana", category: "Dernek", status: "active" },
  { id: "transparency", label: "Mali Şeffaflık", category: "Dernek", status: "active" },
  { id: "donation", label: "Bağış", category: "Dernek", status: "active" },
  { id: "elections", label: "Seçimler", category: "Dernek", status: "passive" },
  { id: "compliance", label: "Uyum / Etik", category: "Dernek", status: "active" },
  { id: "ombudsman", label: "Şikayet Merkezi", category: "Dernek", status: "passive" },

  // Topluluk
  { id: "forum", label: "Forum", category: "Topluluk", status: "active" },
  { id: "news", label: "Haberler", category: "Topluluk", status: "active" },
  { id: "contest", label: "Yarışmalar", category: "Topluluk", status: "active" },
  { id: "calendar", label: "Takvim", category: "Topluluk", status: "active" },
  { id: "chat", label: "Anlık Mesajlaşma", category: "Topluluk", status: "passive" },
  { id: "liveSessions", label: "Canlı Oturumlar", category: "Topluluk", status: "passive" },
  { id: "following", label: "Takip Sistemi", category: "Topluluk", status: "active" },

  // AI
  { id: "promptmarket", label: "Prompt Market", category: "AI", status: "passive" },
  { id: "models", label: "Model Rehberi", category: "AI", status: "passive" },
  { id: "aiassist", label: "AI Asistan", category: "AI", status: "passive" },
  { id: "remix", label: "Remix Studio", category: "AI", status: "passive" },

  // Platform
  { id: "pwa", label: "PWA + Offline", category: "Platform", status: "passive" },
  { id: "notifications", label: "Bildirimler", category: "Platform", status: "active" },
  { id: "feedback", label: "Geri Bildirim", category: "Platform", status: "active" },
  { id: "onboarding", label: "Onboarding", category: "Platform", status: "passive" },
  { id: "profileEducation", label: "Eğitim İçerik", category: "Platform", status: "passive" },
];

export const FORUM_CATEGORIES_SEED = [
  { slug: "duyurular", title: "Duyurular", description: "Yönetimden topluluk duyuruları", position: 0 },
  { slug: "uretim", title: "Üretim", description: "Suno, Udio, Stable Audio teknikleri", position: 1 },
  { slug: "etik", title: "Etik", description: "AI müziğinde şeffaflık ve haklar", position: 2 },
  { slug: "isbirligi", title: "İşbirliği", description: "Ortak proje arayışı, remix daveti", position: 3 },
  { slug: "geri-bildirim", title: "Geri Bildirim", description: "Yeni parçanı topluluğa dinlet", position: 4 },
  { slug: "soru-cevap", title: "Soru & Cevap", description: "Yardım iste, paylaş", position: 5 },
];

export const DEMO_GENRES = [
  "Ambient",
  "Synthwave",
  "Folktronica",
  "Lo-fi",
  "Cinematic",
  "Türkü-tronik",
  "Drone",
  "IDM",
  "Anadolu Pop",
  "Berlin School",
];

export const DEMO_MOODS = [
  "Hüzünlü",
  "Coşkulu",
  "Sakin",
  "Karanlık",
  "Nostaljik",
  "Hipnotik",
  "Umutlu",
  "Mistik",
];

export const AI_MODELS = [
  "Suno v4.5",
  "Suno v4",
  "Udio 130",
  "Udio 32",
  "Stable Audio 2.0",
  "AIVA Symphonic",
  "MusicGen Large",
];
