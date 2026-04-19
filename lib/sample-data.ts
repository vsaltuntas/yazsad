// Tasarımdaki örnek veriler — DB hazır olana kadar sayfaları besler.
// Production'da bu modül `import.meta.env.NEXT_PUBLIC_USE_SAMPLE` ile by-pass edilebilir.

export type SampleTrack = {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  duration: string;
  durationSec: number;
  genre: string;
  mood: string;
  plays: string;
  ai: boolean;
  aiModel: string;
  aiPrompt: string;
  bpm: number;
  musicalKey: string;
  priceTRY: number;
  g1: string;
  g2: string;
  g3: string;
};

export const SAMPLE_TRACKS: SampleTrack[] = [
  {
    id: "t1",
    title: "Boğaz Sisinde",
    artist: "Anatolian Lab",
    artistId: "anatolianlab",
    duration: "3:42",
    durationSec: 222,
    genre: "Ambient",
    mood: "Melankoli",
    plays: "14.2K",
    ai: true,
    aiModel: "Suno v4.5",
    aiPrompt: "ambient turkish folk, ney + analog pads, Bosphorus fog at dawn, 92 bpm, A minor",
    bpm: 92,
    musicalKey: "Am",
    priceTRY: 79,
    g1: "#e94e1b",
    g2: "#7c3aed",
    g3: "#1a1a2e",
  },
  {
    id: "t2",
    title: "Kapalıçarşı / 03:00",
    artist: "SES/0",
    artistId: "ses_sifir",
    duration: "4:18",
    durationSec: 258,
    genre: "Elektronik",
    mood: "Hipnotik",
    plays: "8.7K",
    ai: true,
    aiModel: "Stable Audio 2.0",
    aiPrompt: "lo-fi anatolian dub, baglama loops, vinyl crackle, dark alley jazz, 78 bpm, C minor",
    bpm: 78,
    musicalKey: "Cm",
    priceTRY: 49,
    g1: "#06b6d4",
    g2: "#ec4899",
    g3: "#0f0f1e",
  },
  {
    id: "t3",
    title: "Ege Rüzgarı",
    artist: "Deniz Eldem",
    artistId: "denizeldem",
    duration: "2:56",
    durationSec: 176,
    genre: "Folk",
    mood: "Huzur",
    plays: "23.1K",
    ai: true,
    aiModel: "Suno v4.5",
    aiPrompt: "aegean zeybek folk, solo baglama, tenor male vocal, 9/8 aksak, coastal breeze",
    bpm: 124,
    musicalKey: "Dm",
    priceTRY: 99,
    g1: "#4ade80",
    g2: "#fbbf24",
    g3: "#1a2e1a",
  },
  {
    id: "t4",
    title: "Kara Orman Geçidi",
    artist: "Kara Orman",
    artistId: "karaorman",
    duration: "5:12",
    durationSec: 312,
    genre: "Post-rock",
    mood: "Dramatik",
    plays: "6.3K",
    ai: true,
    aiModel: "Udio 130",
    aiPrompt: "cinematic post-rock, distorted guitars, mountain pass, 90 bpm, F# minor",
    bpm: 90,
    musicalKey: "F#m",
    priceTRY: 59,
    g1: "#8b2635",
    g2: "#2d4a3e",
    g3: "#1a1410",
  },
  {
    id: "t5",
    title: "Neon Minare",
    artist: "Anatolian Lab",
    artistId: "anatolianlab",
    duration: "3:28",
    durationSec: 208,
    genre: "Synthwave",
    mood: "Nostaljik",
    plays: "31.5K",
    ai: true,
    aiModel: "Suno v4.5",
    aiPrompt: "synthwave istanbul skyline at dusk, retro 80s pads, baglama lead, 110 bpm",
    bpm: 110,
    musicalKey: "Am",
    priceTRY: 129,
    g1: "#ec4899",
    g2: "#7c3aed",
    g3: "#0a0a1e",
  },
  {
    id: "t6",
    title: "Divân",
    artist: "Hece Makinesi",
    artistId: "hecemakinesi",
    duration: "6:04",
    durationSec: 364,
    genre: "Deneysel",
    mood: "Meditatif",
    plays: "4.1K",
    ai: true,
    aiModel: "MusicGen Large",
    aiPrompt: "ottoman classical x glitch, ney + granular synthesis, slow burn",
    bpm: 60,
    musicalKey: "Em",
    priceTRY: 89,
    g1: "#d4a574",
    g2: "#8b2635",
    g3: "#1a1410",
  },
  {
    id: "t7",
    title: "Taksim 1453 bpm",
    artist: "SES/0",
    artistId: "ses_sifir",
    duration: "3:11",
    durationSec: 191,
    genre: "Teknoloji",
    mood: "Enerjik",
    plays: "19.8K",
    ai: true,
    aiModel: "Suno v4.5",
    aiPrompt: "high-bpm techno, taksim square crowd, 145 bpm, hard kicks",
    bpm: 145,
    musicalKey: "Gm",
    priceTRY: 79,
    g1: "#00ff88",
    g2: "#06b6d4",
    g3: "#000000",
  },
  {
    id: "t8",
    title: "Ada Vapuru",
    artist: "Deniz Eldem",
    artistId: "denizeldem",
    duration: "4:02",
    durationSec: 242,
    genre: "Jazz",
    mood: "Rahat",
    plays: "11.6K",
    ai: true,
    aiModel: "Udio 130",
    aiPrompt: "soft jazz on a ferry, brushed drums, rhodes, sea breeze, 88 bpm",
    bpm: 88,
    musicalKey: "Bb",
    priceTRY: 69,
    g1: "#fbbf24",
    g2: "#c23b22",
    g3: "#1a1410",
  },
  {
    id: "t9",
    title: "Asfalt Şiiri",
    artist: "Beton Kuşları",
    artistId: "betonkuslari",
    duration: "3:47",
    durationSec: 227,
    genre: "Hip-hop",
    mood: "Sert",
    plays: "27.4K",
    ai: true,
    aiModel: "Suno v4",
    aiPrompt: "turkish trap, gritty 808s, urban poetry, 140 bpm",
    bpm: 140,
    musicalKey: "C#m",
    priceTRY: 99,
    g1: "#555555",
    g2: "#e94e1b",
    g3: "#0a0a0a",
  },
  {
    id: "t10",
    title: "Lodos",
    artist: "Anatolian Lab",
    artistId: "anatolianlab",
    duration: "4:55",
    durationSec: 295,
    genre: "Ambient",
    mood: "Fırtınalı",
    plays: "9.2K",
    ai: true,
    aiModel: "Stable Audio 2.0",
    aiPrompt: "ambient storm, wind textures, distant kanun, 70 bpm",
    bpm: 70,
    musicalKey: "Am",
    priceTRY: 49,
    g1: "#06b6d4",
    g2: "#ffffff",
    g3: "#1a1a2e",
  },
  {
    id: "t11",
    title: "Bizans Algoritması",
    artist: "Hece Makinesi",
    artistId: "hecemakinesi",
    duration: "5:38",
    durationSec: 338,
    genre: "Klasik/AI",
    mood: "Görkemli",
    plays: "5.8K",
    ai: true,
    aiModel: "AIVA Symphonic",
    aiPrompt: "byzantine choir + algorithmic counterpoint, choir + strings",
    bpm: 95,
    musicalKey: "Dm",
    priceTRY: 119,
    g1: "#fbbf24",
    g2: "#8b2635",
    g3: "#1a1410",
  },
  {
    id: "t12",
    title: "Pamukkale / Travertine",
    artist: "Kara Orman",
    artistId: "karaorman",
    duration: "4:24",
    durationSec: 264,
    genre: "Ambient",
    mood: "Huzur",
    plays: "13.3K",
    ai: true,
    aiModel: "Suno v4.5",
    aiPrompt: "calcium pools, slow strings, water bell percussion, 65 bpm",
    bpm: 65,
    musicalKey: "G",
    priceTRY: 79,
    g1: "#f5f1e8",
    g2: "#d4a574",
    g3: "#1a1410",
  },
];

export const GENRES = [
  "Tümü",
  "Elektronik",
  "Ambient",
  "Folk",
  "Post-rock",
  "Synthwave",
  "Deneysel",
  "Jazz",
  "Hip-hop",
  "Klasik/AI",
];
export const MOODS = [
  "Hepsi",
  "Melankoli",
  "Hipnotik",
  "Huzur",
  "Dramatik",
  "Nostaljik",
  "Meditatif",
  "Enerjik",
  "Rahat",
  "Sert",
  "Fırtınalı",
  "Görkemli",
];

export type SampleNews = {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  reading: string;
  featured?: boolean;
  g1: string;
  g2: string;
  g3: string;
};

export const SAMPLE_NEWS: SampleNews[] = [
  {
    id: "n1",
    category: "Duyuru",
    title: "YAZSAD 2026 Bahar Festivali 12 Mayıs'ta İstanbul Modern'de",
    excerpt:
      "Dernek üyelerinin AI destekli ürettiği 24 parçalık seçki, canlı performanslarla buluşacak. Kayıtlar Nisan sonuna kadar açık.",
    author: "YAZSAD Kurulu",
    date: "18 Nisan 2026",
    reading: "4 dk",
    featured: true,
    g1: "#e94e1b",
    g2: "#7c3aed",
    g3: "#1a1a2e",
  },
  {
    id: "n2",
    category: "Röportaj",
    title: "Anatolian Lab: \"AI bir ajan değil, bir enstrüman — ben notayı koyarım\"",
    excerpt:
      "Üyemiz Anatolian Lab ile üretim sürecinde kullandığı modeller ve telif yaklaşımı üzerine uzun söyleşi.",
    author: "Ayşe Kıraç",
    date: "14 Nisan 2026",
    reading: "11 dk",
    g1: "#4ade80",
    g2: "#fbbf24",
    g3: "#1a2e1a",
  },
  {
    id: "n3",
    category: "Politika",
    title: "AI müzikte etik çerçeve: YAZSAD önerisi kamuoyunda",
    excerpt:
      "Derneğimizin hazırladığı 14 maddelik etik çerçeve, Kültür Bakanlığı ile ön görüşmelerde paylaşıldı.",
    author: "Yönetim Kurulu",
    date: "9 Nisan 2026",
    reading: "7 dk",
    g1: "#c23b22",
    g2: "#1a1a1a",
    g3: "#2e1a1a",
  },
  {
    id: "n4",
    category: "İnceleme",
    title: "SES/0'ın yeni EP'si: İstanbul'un saat 3'teki sesi",
    excerpt:
      "\"Kapalıçarşı / 03:00\" parçası başta olmak üzere, üyemizin son çalışması üzerine eleştirel bir bakış.",
    author: "Mert Demir",
    date: "6 Nisan 2026",
    reading: "6 dk",
    g1: "#06b6d4",
    g2: "#ec4899",
    g3: "#0f0f1e",
  },
  {
    id: "n5",
    category: "Teknik",
    title: "Suno v4.5 ile çoklu dil prompt tekniği: Türkçe örnekler",
    excerpt:
      "Topluluk üyelerinden gelen sorular üzerine hazırlanan teknik rehber. Prompt kalıpları ve örnek çıktılar.",
    author: "Kerem Yılmaz",
    date: "3 Nisan 2026",
    reading: "9 dk",
    g1: "#00ff88",
    g2: "#ffffff",
    g3: "#000000",
  },
  {
    id: "n6",
    category: "Topluluk",
    title: "Nisan yarışması sonuçlandı — \"Şehir\" teması 142 eserle kapandı",
    excerpt:
      "Jüri ve topluluk oylarıyla belirlenen ilk üç eser, festivalimizde canlı olarak icra edilecek.",
    author: "Etkinlik Komitesi",
    date: "31 Mart 2026",
    reading: "3 dk",
    g1: "#fbbf24",
    g2: "#c23b22",
    g3: "#1a1410",
  },
];

export type SampleForumTopic = {
  id: string;
  pinned?: boolean;
  hot?: boolean;
  tag: string;
  title: string;
  author: string;
  role: string | null;
  replies: number;
  views: string;
  last: string;
  lastUser: string;
};

export const SAMPLE_FORUM_TOPICS: SampleForumTopic[] = [
  { id: "f1", pinned: true, tag: "duyuru", title: "YAZSAD Forum Kuralları ve Davranış Kodu", author: "YAZSAD", role: "Yönetim", replies: 42, views: "12.3K", last: "2 saat önce", lastUser: "Mert D." },
  { id: "f2", pinned: true, tag: "sabit", title: "AI müzik prompting: Türkçe kaynak havuzu [güncel]", author: "Kerem Y.", role: "Mod", replies: 187, views: "8.7K", last: "14 dk önce", lastUser: "Deniz E." },
  { id: "f3", tag: "Teknik", hot: true, title: "Suno v4.5 ile Ege folk tonları çıkaramıyorum — prompt yardım", author: "Selin B.", role: null, replies: 23, views: "412", last: "27 dk önce", lastUser: "Kerem Y." },
  { id: "f4", tag: "Tartışma", hot: true, title: "Telif: eğitim verisinde kullanılan eserlerin durumu", author: "Ekin T.", role: "Üye", replies: 89, views: "2.1K", last: "1 saat önce", lastUser: "Yön. Kurulu" },
  { id: "f5", tag: "Yardım", title: "Dernek üyeliği başvurusu nasıl değerlendiriliyor?", author: "Can Y.", role: null, replies: 14, views: "267", last: "3 saat önce", lastUser: "YAZSAD" },
  { id: "f6", tag: "Gösterim", title: "Yeni parçam \"Lodos\" — feedback açığım", author: "Anatolian Lab", role: "Sanatçı", replies: 51, views: "1.4K", last: "4 saat önce", lastUser: "Beton K." },
  { id: "f7", tag: "Etkinlik", title: "Mayıs festivali sahne sıralaması önerileri", author: "Hece M.", role: "Sanatçı", replies: 34, views: "892", last: "6 saat önce", lastUser: "Deniz E." },
  { id: "f8", tag: "Teknik", title: "ElevenLabs + Ableton Live pipeline'ı paylaşımı", author: "Zeynep K.", role: null, replies: 17, views: "523", last: "9 saat önce", lastUser: "SES/0" },
  { id: "f9", tag: "Tartışma", title: "\"AI ile üretilmiş\" etiketi zorunlu olmalı mı?", author: "Mert D.", role: "Mod", replies: 128, views: "3.6K", last: "11 saat önce", lastUser: "Ayşe K." },
  { id: "f10", tag: "Yardım", title: "Parça yüklerken hak beyanı formu takıldı", author: "Umut S.", role: null, replies: 6, views: "94", last: "1 gün önce", lastUser: "Yön. Kurulu" },
];

export const ADMIN_STATS = [
  { label: "Aktif üye", value: "3,847", delta: "+142 bu hafta", up: true },
  { label: "Yayınlanan parça", value: "12,604", delta: "+89 bugün", up: true },
  { label: "Forum yanıtı", value: "48.2K", delta: "+2.1K bu hafta", up: true },
  { label: "Onay bekleyen", value: "23", delta: "-4 dün", up: false },
] as const;

export const ADMIN_QUEUE = [
  { type: "Parça", title: "Sisli Sabah", author: "Yeni Üye · Ece K.", time: "14 dk önce", status: "pending" },
  { type: "Üye", title: "Başvuru: Burak Aslan", author: "burakaslan@...", time: "38 dk önce", status: "pending" },
  { type: "Haber", title: "Festival lokasyon güncellemesi", author: "Kurul", time: "1 saat önce", status: "pending" },
  { type: "Parça", title: "Gece Otobüsü", author: "SES/0", time: "2 saat önce", status: "approved" },
  { type: "Yorum", title: "\"bu prompt çok iyi değil...\"", author: "Raporlandı · 3x", time: "3 saat önce", status: "pending" },
  { type: "Parça", title: "Kayıp Frekans", author: "Hece Makinesi", time: "5 saat önce", status: "approved" },
] as const;

export type SampleArtist = {
  id: string;
  name: string;
  handle: string;
  role: string;
  joined: string;
  tracks: number;
  followers: string;
};

export const SAMPLE_USERS: SampleArtist[] = [
  { id: "anatolianlab", name: "Anatolian Lab", handle: "@anatolianlab", role: "Sanatçı", joined: "Şub 2025", tracks: 24, followers: "14.2K" },
  { id: "ses_sifir", name: "SES/0", handle: "@ses_sifir", role: "Sanatçı", joined: "Oca 2025", tracks: 18, followers: "8.7K" },
  { id: "denizeldem", name: "Deniz Eldem", handle: "@denizeldem", role: "Sanatçı · Üye", joined: "Mar 2025", tracks: 12, followers: "23.1K" },
  { id: "keremy", name: "Kerem Yılmaz", handle: "@keremy", role: "Moderatör", joined: "Kas 2024", tracks: 4, followers: "3.2K" },
  { id: "aysekrc", name: "Ayşe Kıraç", handle: "@aysekrc", role: "Yayın Kurulu", joined: "Ara 2024", tracks: 2, followers: "1.8K" },
  { id: "mertdm", name: "Mert Demir", handle: "@mertdm", role: "Moderatör", joined: "Eki 2024", tracks: 0, followers: "967" },
];
