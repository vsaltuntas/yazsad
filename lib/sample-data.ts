// Sample data — prototype/src/data.jsx'ten port.
// DB hazır olana kadar sayfaları besler.

export type SampleTrack = {
  id: string;
  title: string;
  artist: string;
  artistId: string;
  duration: string;
  genre: string;
  mood: string;
  plays: string;
  ai: boolean;
  g1: string;
  g2: string;
  g3: string;
};

export const SAMPLE_TRACKS: SampleTrack[] = [
  { id: "t1", title: "Boğaz Sisinde", artist: "Anatolian Lab", artistId: "anatolianlab", duration: "3:42", genre: "Ambient", mood: "Melankoli", plays: "14.2K", ai: true, g1: "#e94e1b", g2: "#7c3aed", g3: "#1a1a2e" },
  { id: "t2", title: "Kapalıçarşı / 03:00", artist: "SES/0", artistId: "ses_sifir", duration: "4:18", genre: "Elektronik", mood: "Hipnotik", plays: "8.7K", ai: true, g1: "#06b6d4", g2: "#ec4899", g3: "#0f0f1e" },
  { id: "t3", title: "Ege Rüzgarı", artist: "Deniz Eldem", artistId: "denizeldem", duration: "2:56", genre: "Folk", mood: "Huzur", plays: "23.1K", ai: true, g1: "#4ade80", g2: "#fbbf24", g3: "#1a2e1a" },
  { id: "t4", title: "Kara Orman Geçidi", artist: "Kara Orman", artistId: "karaorman", duration: "5:12", genre: "Post-rock", mood: "Dramatik", plays: "6.3K", ai: true, g1: "#8b2635", g2: "#2d4a3e", g3: "#1a1410" },
  { id: "t5", title: "Neon Minare", artist: "Anatolian Lab", artistId: "anatolianlab", duration: "3:28", genre: "Synthwave", mood: "Nostaljik", plays: "31.5K", ai: true, g1: "#ec4899", g2: "#7c3aed", g3: "#0a0a1e" },
  { id: "t6", title: "Divân", artist: "Hece Makinesi", artistId: "hecemakinesi", duration: "6:04", genre: "Deneysel", mood: "Meditatif", plays: "4.1K", ai: true, g1: "#d4a574", g2: "#8b2635", g3: "#1a1410" },
  { id: "t7", title: "Taksim 1453 bpm", artist: "SES/0", artistId: "ses_sifir", duration: "3:11", genre: "Teknoloji", mood: "Enerjik", plays: "19.8K", ai: true, g1: "#00ff88", g2: "#06b6d4", g3: "#000000" },
  { id: "t8", title: "Ada Vapuru", artist: "Deniz Eldem", artistId: "denizeldem", duration: "4:02", genre: "Jazz", mood: "Rahat", plays: "11.6K", ai: true, g1: "#fbbf24", g2: "#c23b22", g3: "#1a1410" },
  { id: "t9", title: "Asfalt Şiiri", artist: "Beton Kuşları", artistId: "betonkuslari", duration: "3:47", genre: "Hip-hop", mood: "Sert", plays: "27.4K", ai: true, g1: "#555555", g2: "#e94e1b", g3: "#0a0a0a" },
  { id: "t10", title: "Lodos", artist: "Anatolian Lab", artistId: "anatolianlab", duration: "4:55", genre: "Ambient", mood: "Fırtınalı", plays: "9.2K", ai: true, g1: "#06b6d4", g2: "#ffffff", g3: "#1a1a2e" },
  { id: "t11", title: "Bizans Algoritması", artist: "Hece Makinesi", artistId: "hecemakinesi", duration: "5:38", genre: "Klasik/AI", mood: "Görkemli", plays: "5.8K", ai: true, g1: "#fbbf24", g2: "#8b2635", g3: "#1a1410" },
  { id: "t12", title: "Pamukkale / Travertine", artist: "Kara Orman", artistId: "karaorman", duration: "4:24", genre: "Ambient", mood: "Huzur", plays: "13.3K", ai: true, g1: "#f5f1e8", g2: "#d4a574", g3: "#1a1410" },
];

export const GENRES = ["Tümü", "Elektronik", "Ambient", "Folk", "Post-rock", "Synthwave", "Deneysel", "Jazz", "Hip-hop", "Klasik/AI"];
export const MOODS = ["Hepsi", "Melankoli", "Hipnotik", "Huzur", "Dramatik", "Nostaljik", "Meditatif", "Enerjik", "Rahat", "Sert", "Fırtınalı", "Görkemli"];

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
  { id: "n1", category: "Duyuru", title: "YAZSAD 2026 Bahar Festivali 12 Mayıs'ta İstanbul Modern'de", excerpt: "Dernek üyelerinin AI destekli ürettiği 24 parçalık seçki, canlı performanslarla buluşacak. Kayıtlar Nisan sonuna kadar açık.", author: "YAZSAD Kurulu", date: "18 Nisan 2026", reading: "4 dk", featured: true, g1: "#e94e1b", g2: "#7c3aed", g3: "#1a1a2e" },
  { id: "n2", category: "Röportaj", title: "Anatolian Lab: \"AI bir ajan değil, bir enstrüman — ben notayı koyarım\"", excerpt: "Üyemiz Anatolian Lab ile üretim sürecinde kullandığı modeller ve telif yaklaşımı üzerine uzun söyleşi.", author: "Ayşe Kıraç", date: "14 Nisan 2026", reading: "11 dk", g1: "#4ade80", g2: "#fbbf24", g3: "#1a2e1a" },
  { id: "n3", category: "Politika", title: "AI müzikte etik çerçeve: YAZSAD önerisi kamuoyunda", excerpt: "Derneğimizin hazırladığı 14 maddelik etik çerçeve, Kültür Bakanlığı ile ön görüşmelerde paylaşıldı.", author: "Yönetim Kurulu", date: "9 Nisan 2026", reading: "7 dk", g1: "#c23b22", g2: "#1a1a1a", g3: "#2e1a1a" },
  { id: "n4", category: "İnceleme", title: "SES/0'ın yeni EP'si: İstanbul'un saat 3'teki sesi", excerpt: "\"Kapalıçarşı / 03:00\" parçası başta olmak üzere, üyemizin son çalışması üzerine eleştirel bir bakış.", author: "Mert Demir", date: "6 Nisan 2026", reading: "6 dk", g1: "#06b6d4", g2: "#ec4899", g3: "#0f0f1e" },
  { id: "n5", category: "Teknik", title: "Suno v4.5 ile çoklu dil prompt tekniği: Türkçe örnekler", excerpt: "Topluluk üyelerinden gelen sorular üzerine hazırlanan teknik rehber. Prompt kalıpları ve örnek çıktılar.", author: "Kerem Yılmaz", date: "3 Nisan 2026", reading: "9 dk", g1: "#00ff88", g2: "#ffffff", g3: "#000000" },
  { id: "n6", category: "Topluluk", title: "Nisan yarışması sonuçlandı — \"Şehir\" teması 142 eserle kapandı", excerpt: "Jüri ve topluluk oylarıyla belirlenen ilk üç eser, festivalimizde canlı olarak icra edilecek.", author: "Etkinlik Komitesi", date: "31 Mart 2026", reading: "3 dk", g1: "#fbbf24", g2: "#c23b22", g3: "#1a1410" },
];
