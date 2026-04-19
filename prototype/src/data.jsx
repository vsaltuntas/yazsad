// Sample data for YAZSAD

const TRACKS = [
  { id: 't1', title: 'Boğaz Sisinde', artist: 'Anatolian Lab', duration: '3:42', genre: 'Ambient', mood: 'Melankoli', plays: '14.2K', ai: true, g1: '#e94e1b', g2: '#7c3aed', g3: '#1a1a2e' },
  { id: 't2', title: 'Kapalıçarşı / 03:00', artist: 'SES/0', duration: '4:18', genre: 'Elektronik', mood: 'Hipnotik', plays: '8.7K', ai: true, g1: '#06b6d4', g2: '#ec4899', g3: '#0f0f1e' },
  { id: 't3', title: 'Ege Rüzgarı', artist: 'Deniz Eldem', duration: '2:56', genre: 'Folk', mood: 'Huzur', plays: '23.1K', ai: true, g1: '#4ade80', g2: '#fbbf24', g3: '#1a2e1a' },
  { id: 't4', title: 'Kara Orman Geçidi', artist: 'Kara Orman', duration: '5:12', genre: 'Post-rock', mood: 'Dramatik', plays: '6.3K', ai: true, g1: '#8b2635', g2: '#2d4a3e', g3: '#1a1410' },
  { id: 't5', title: 'Neon Minare', artist: 'Anatolian Lab', duration: '3:28', genre: 'Synthwave', mood: 'Nostaljik', plays: '31.5K', ai: true, g1: '#ec4899', g2: '#7c3aed', g3: '#0a0a1e' },
  { id: 't6', title: 'Divân', artist: 'Hece Makinesi', duration: '6:04', genre: 'Deneysel', mood: 'Meditatif', plays: '4.1K', ai: true, g1: '#d4a574', g2: '#8b2635', g3: '#1a1410' },
  { id: 't7', title: 'Taksim 1453 bpm', artist: 'SES/0', duration: '3:11', genre: 'Teknoloji', mood: 'Enerjik', plays: '19.8K', ai: true, g1: '#00ff88', g2: '#06b6d4', g3: '#000' },
  { id: 't8', title: 'Ada Vapuru', artist: 'Deniz Eldem', duration: '4:02', genre: 'Jazz', mood: 'Rahat', plays: '11.6K', ai: true, g1: '#fbbf24', g2: '#c23b22', g3: '#1a1410' },
  { id: 't9', title: 'Asfalt Şiiri', artist: 'Beton Kuşları', duration: '3:47', genre: 'Hip-hop', mood: 'Sert', plays: '27.4K', ai: true, g1: '#555', g2: '#e94e1b', g3: '#0a0a0a' },
  { id: 't10', title: 'Lodos', artist: 'Anatolian Lab', duration: '4:55', genre: 'Ambient', mood: 'Fırtınalı', plays: '9.2K', ai: true, g1: '#06b6d4', g2: '#fff', g3: '#1a1a2e' },
  { id: 't11', title: 'Bizans Algoritması', artist: 'Hece Makinesi', duration: '5:38', genre: 'Klasik/AI', mood: 'Görkemli', plays: '5.8K', ai: true, g1: '#fbbf24', g2: '#8b2635', g3: '#1a1410' },
  { id: 't12', title: 'Pamukkale / Travertine', artist: 'Kara Orman', duration: '4:24', genre: 'Ambient', mood: 'Huzur', plays: '13.3K', ai: true, g1: '#f5f1e8', g2: '#d4a574', g3: '#1a1410' },
];

const GENRES = ['Tümü', 'Elektronik', 'Ambient', 'Folk', 'Post-rock', 'Synthwave', 'Deneysel', 'Jazz', 'Hip-hop', 'Klasik/AI'];
const MOODS = ['Hepsi', 'Melankoli', 'Hipnotik', 'Huzur', 'Dramatik', 'Nostaljik', 'Meditatif', 'Enerjik', 'Rahat', 'Sert', 'Fırtınalı', 'Görkemli'];

const NEWS = [
  {
    id: 'n1',
    category: 'Duyuru',
    title: 'YAZSAD 2026 Bahar Festivali 12 Mayıs\'ta İstanbul Modern\'de',
    excerpt: 'Dernek üyelerinin AI destekli ürettiği 24 parçalık seçki, canlı performanslarla buluşacak. Kayıtlar Nisan sonuna kadar açık.',
    author: 'YAZSAD Kurulu',
    date: '18 Nisan 2026',
    reading: '4 dk',
    featured: true,
    g1: '#e94e1b', g2: '#7c3aed', g3: '#1a1a2e',
  },
  {
    id: 'n2',
    category: 'Röportaj',
    title: 'Anatolian Lab: "AI bir ajan değil, bir enstrüman — ben notayı koyarım"',
    excerpt: 'Üyemiz Anatolian Lab ile üretim sürecinde kullandığı modeller ve telif yaklaşımı üzerine uzun söyleşi.',
    author: 'Ayşe Kıraç',
    date: '14 Nisan 2026',
    reading: '11 dk',
    g1: '#4ade80', g2: '#fbbf24', g3: '#1a2e1a',
  },
  {
    id: 'n3',
    category: 'Politika',
    title: 'AI müzikte etik çerçeve: YAZSAD önerisi kamuoyunda',
    excerpt: 'Derneğimizin hazırladığı 14 maddelik etik çerçeve, Kültür Bakanlığı ile ön görüşmelerde paylaşıldı.',
    author: 'Yönetim Kurulu',
    date: '9 Nisan 2026',
    reading: '7 dk',
    g1: '#c23b22', g2: '#1a1a1a', g3: '#2e1a1a',
  },
  {
    id: 'n4',
    category: 'İnceleme',
    title: 'SES/0\'ın yeni EP\'si: İstanbul\'un saat 3\'teki sesi',
    excerpt: '"Kapalıçarşı / 03:00" parçası başta olmak üzere, üyemizin son çalışması üzerine eleştirel bir bakış.',
    author: 'Mert Demir',
    date: '6 Nisan 2026',
    reading: '6 dk',
    g1: '#06b6d4', g2: '#ec4899', g3: '#0f0f1e',
  },
  {
    id: 'n5',
    category: 'Teknik',
    title: 'Suno v4.5 ile çoklu dil prompt tekniği: Türkçe örnekler',
    excerpt: 'Topluluk üyelerinden gelen sorular üzerine hazırlanan teknik rehber. Prompt kalıpları ve örnek çıktılar.',
    author: 'Kerem Yılmaz',
    date: '3 Nisan 2026',
    reading: '9 dk',
    g1: '#00ff88', g2: '#fff', g3: '#000',
  },
  {
    id: 'n6',
    category: 'Topluluk',
    title: 'Nisan yarışması sonuçlandı — "Şehir" teması 142 eserle kapandı',
    excerpt: 'Jüri ve topluluk oylarıyla belirlenen ilk üç eser, festivalimizde canlı olarak icra edilecek.',
    author: 'Etkinlik Komitesi',
    date: '31 Mart 2026',
    reading: '3 dk',
    g1: '#fbbf24', g2: '#c23b22', g3: '#1a1410',
  },
];

const FORUM_TOPICS = [
  { id: 'f1', pinned: true, tag: 'duyuru', title: 'YAZSAD Forum Kuralları ve Davranış Kodu', author: 'YAZSAD', role: 'Yönetim', replies: 42, views: '12.3K', last: '2 saat önce', lastUser: 'Mert D.' },
  { id: 'f2', pinned: true, tag: 'sabit', title: 'AI müzik prompting: Türkçe kaynak havuzu [güncel]', author: 'Kerem Y.', role: 'Mod', replies: 187, views: '8.7K', last: '14 dk önce', lastUser: 'Deniz E.' },
  { id: 'f3', tag: 'Teknik', title: 'Suno v4.5 ile Ege folk tonları çıkaramıyorum — prompt yardım', author: 'Selin B.', role: null, replies: 23, views: '412', last: '27 dk önce', lastUser: 'Kerem Y.', hot: true },
  { id: 'f4', tag: 'Tartışma', title: 'Telif: eğitim verisinde kullanılan eserlerin durumu', author: 'Ekin T.', role: 'Üye', replies: 89, views: '2.1K', last: '1 saat önce', lastUser: 'Yön. Kurulu', hot: true },
  { id: 'f5', tag: 'Yardım', title: 'Dernek üyeliği başvurusu nasıl değerlendiriliyor?', author: 'Can Y.', role: null, replies: 14, views: '267', last: '3 saat önce', lastUser: 'YAZSAD' },
  { id: 'f6', tag: 'Gösterim', title: 'Yeni parçam "Lodos" — feedback açığım', author: 'Anatolian Lab', role: 'Sanatçı', replies: 51, views: '1.4K', last: '4 saat önce', lastUser: 'Beton K.' },
  { id: 'f7', tag: 'Etkinlik', title: 'Mayıs festivali sahne sıralaması önerileri', author: 'Hece M.', role: 'Sanatçı', replies: 34, views: '892', last: '6 saat önce', lastUser: 'Deniz E.' },
  { id: 'f8', tag: 'Teknik', title: 'ElevenLabs + Ableton Live pipeline\'ı paylaşımı', author: 'Zeynep K.', role: null, replies: 17, views: '523', last: '9 saat önce', lastUser: 'SES/0' },
  { id: 'f9', tag: 'Tartışma', title: '"AI ile üretilmiş" etiketi zorunlu olmalı mı?', author: 'Mert D.', role: 'Mod', replies: 128, views: '3.6K', last: '11 saat önce', lastUser: 'Ayşe K.' },
  { id: 'f10', tag: 'Yardım', title: 'Parça yüklerken hak beyanı formu takıldı', author: 'Umut S.', role: null, replies: 6, views: '94', last: '1 gün önce', lastUser: 'Yön. Kurulu' },
];

const THREAD_POSTS = [
  {
    id: 'p1',
    op: true,
    author: 'Selin B.',
    role: null,
    time: '3 saat önce',
    body: [
      'Merhaba arkadaşlar. Suno v4.5\'te uzun süredir Ege folk tonu yakalamaya çalışıyorum ama sürekli İskandinav folk çıkarıyor — bağlama yerine mandolin, 7/8 yerine 4/4 oturtuyor.',
      'Denediğim prompt: "aegean turkish folk, baglama, male vocal, 7/8 aksak rhythm, coastal". Sizde de benzer durum var mı, yoksa prompt\'ta eksik olan bir şey mi?',
      'Ek olarak: Türkçe etiketlemenin sonucu daha iyi yaptığını söyleyenler var — deneyim var mı?'
    ],
  },
  {
    id: 'p2',
    author: 'Kerem Y.',
    role: 'Mod',
    time: '2 saat önce',
    body: [
      'Selin merhaba, bu klasik bir problem — v4.5 Türk halk müziğini "folk" genel kümesinde İskandinav/İrlanda ağırlıklı öğrendiği için default olarak oraya kayıyor.',
      'Denemeni öneririm: prompt\'a "zeybek", "karsilama", ya da "9/8 aksak" gibi spesifik terimler ekle. Enstrüman için "saz" yerine "baglama (long-necked lute, fretted)" gibi tanımlayıcı açıklama işe yarıyor.',
      'Türkçe etiketleme işe yarıyor ama dozunda — 2-3 Türkçe anahtar kelime + kalan prompt İngilizce en iyi sonucu veriyor gözlemime göre.'
    ],
  },
  {
    id: 'p3',
    author: 'Deniz Eldem',
    role: 'Sanatçı',
    time: '1 saat önce',
    body: [
      '+1 Kerem\'e. Benim "Ege Rüzgarı" parçasında kullandığım prompt şablonunu paylaşayım (v4.5 için):',
      '"aegean zeybek folk, solo baglama intro 8 bars, tenor male vocal, 9/8 aksak, reverb light, coastal breeze ambience". Bu bana 10 üretimden ~6\'sında tutarlı sonuç verdi.',
      'Ayrıca: tone control\'ü kullanıyor musun? v4.5\'te "Turkish traditional" preset\'i eklediler, onu kombinle çok iyi oluyor.'
    ],
  },
];

const USERS = [
  { name: 'Anatolian Lab', handle: '@anatolianlab', role: 'Sanatçı', joined: 'Şub 2025', tracks: 24, followers: '14.2K' },
  { name: 'SES/0', handle: '@ses_sifir', role: 'Sanatçı', joined: 'Oca 2025', tracks: 18, followers: '8.7K' },
  { name: 'Deniz Eldem', handle: '@denizeldem', role: 'Sanatçı · Üye', joined: 'Mar 2025', tracks: 12, followers: '23.1K' },
  { name: 'Kerem Yılmaz', handle: '@keremy', role: 'Moderatör', joined: 'Kas 2024', tracks: 4, followers: '3.2K' },
  { name: 'Ayşe Kıraç', handle: '@aysekrc', role: 'Yayın Kurulu', joined: 'Ara 2024', tracks: 2, followers: '1.8K' },
  { name: 'Mert Demir', handle: '@mertdm', role: 'Moderatör', joined: 'Eki 2024', tracks: 0, followers: '967' },
];

const ADMIN_STATS = [
  { label: 'Aktif üye', value: '3,847', delta: '+142 bu hafta', up: true },
  { label: 'Yayınlanan parça', value: '12,604', delta: '+89 bugün', up: true },
  { label: 'Forum yanıtı', value: '48.2K', delta: '+2.1K bu hafta', up: true },
  { label: 'Onay bekleyen', value: '23', delta: '-4 dün', up: false },
];

const ADMIN_QUEUE = [
  { type: 'Parça', title: 'Sisli Sabah', author: 'Yeni Üye · Ece K.', time: '14 dk önce', status: 'pending' },
  { type: 'Üye', title: 'Başvuru: Burak Aslan', author: 'burakaslan@...', time: '38 dk önce', status: 'pending' },
  { type: 'Haber', title: 'Festival lokasyon güncellemesi', author: 'Kurul', time: '1 saat önce', status: 'pending' },
  { type: 'Parça', title: 'Gece Otobüsü', author: 'SES/0', time: '2 saat önce', status: 'approved' },
  { type: 'Yorum', title: '"bu prompt çok iyi değil..."', author: 'Raporlandı · 3x', time: '3 saat önce', status: 'pending' },
  { type: 'Parça', title: 'Kayıp Frekans', author: 'Hece Makinesi', time: '5 saat önce', status: 'approved' },
];

Object.assign(window, { TRACKS, GENRES, MOODS, NEWS, FORUM_TOPICS, THREAD_POSTS, USERS, ADMIN_STATS, ADMIN_QUEUE });
