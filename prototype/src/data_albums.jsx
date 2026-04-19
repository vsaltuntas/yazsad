// Albums data + artist extended data

const ALBUMS = [
  {
    id: 'a1', title: 'Boğaz', artist: 'Anatolian Lab', artistId: 'anatolianlab',
    year: 2026, tracks: ['t1', 't5', 't10'], kind: 'EP',
    price: 149, license: 'Kişisel + Ticari',
    g1: '#e94e1b', g2: '#7c3aed', g3: '#1a1a2e',
    blurb: 'İstanbul Boğazı\'nın üç farklı saatinden çekilmiş üç eskiz. Synthwave dokular + ney + fırtına sesleri — Neon Minare, Boğaz Sisinde ve Lodos\'un tek çatı altında toplandığı EP.',
    credits: ['Üretim: Anatolian Lab', 'Mastering: Deniz Eldem (YAZSAD)', 'Kapak: Anatolian Lab', 'AI model: Suno v4.5 + post Ableton'],
    released: '18 Nisan 2026', plays: '54.9K', supporters: 387,
  },
  {
    id: 'a2', title: 'Sıfır Noktası', artist: 'SES/0', artistId: 'ses_sifir',
    year: 2026, tracks: ['t2', 't7'], kind: 'Single',
    price: 79, license: 'Kişisel',
    g1: '#06b6d4', g2: '#ec4899', g3: '#0f0f1e',
    blurb: 'İstanbul\'un gece saat 3\'ündeki sessizliğin elektronik haritası. İki parça — biri şehrin bedeni, diğeri ruhu.',
    credits: ['Üretim: SES/0', 'Mix + Master: SES/0', 'AI model: Udio v2 + Suno v4.5'],
    released: '12 Nisan 2026', plays: '28.5K', supporters: 142,
  },
  {
    id: 'a3', title: 'Ege Rotası', artist: 'Deniz Eldem', artistId: 'denizeldem',
    year: 2025, tracks: ['t3', 't8'], kind: 'EP',
    price: 99, license: 'Kişisel + Ticari',
    g1: '#4ade80', g2: '#fbbf24', g3: '#1a2e1a',
    blurb: 'Foça\'dan Bodrum\'a doğru bir deniz yolculuğu. Bağlama + saksafon + AI eşliğinde üretilmiş, folk-jazz füzyonu.',
    credits: ['Bağlama: Deniz Eldem', 'Saksafon: AI Udio v2', 'Mastering: Anatolian Lab'],
    released: '24 Ekim 2025', plays: '41.1K', supporters: 298,
  },
  {
    id: 'a4', title: 'Orman Geçidi', artist: 'Kara Orman', artistId: 'kara_orman',
    year: 2025, tracks: ['t4', 't12'], kind: 'Album',
    price: 179, license: 'Tam Hak',
    g1: '#8b2635', g2: '#2d4a3e', g3: '#1a1410',
    blurb: 'Post-rock\'ın ambient\'le buluştuğu 8 parçalık bir yolculuk. Uzun, döngüsel, sinema müziği dokusunda.',
    credits: ['Üretim: Kara Orman', 'Orkestra: AI Stable Audio'],
    released: '30 Eylül 2025', plays: '19.6K', supporters: 86,
  },
  {
    id: 'a5', title: 'Divân', artist: 'Hece Makinesi', artistId: 'hece_makinesi',
    year: 2026, tracks: ['t6', 't11'], kind: 'EP',
    price: 119, license: 'Kişisel + Ticari',
    g1: '#d4a574', g2: '#8b2635', g3: '#1a1410',
    blurb: 'Klasik Osmanlı makamları + AI\'ın ürettiği deneysel vokaller. Geleneksel form + algoritmik icra.',
    credits: ['Hece Makinesi', 'Kaftan kapak: Selin Barış'],
    released: '5 Mart 2026', plays: '9.9K', supporters: 62,
  },
  {
    id: 'a6', title: 'Beton', artist: 'Beton Kuşları', artistId: 'beton_kuslari',
    year: 2025, tracks: ['t9'], kind: 'Single',
    price: 49, license: 'Kişisel',
    g1: '#555', g2: '#e94e1b', g3: '#0a0a0a',
    blurb: 'İstanbul\'un asfalt şiirleri. Hip-hop, AI vokal, şehir ambient kaydı.',
    credits: ['Beton Kuşları', 'Saha kaydı: Kadıköy, Beşiktaş'],
    released: '14 Kasım 2025', plays: '27.4K', supporters: 201,
  },
];

const ARTISTS = {
  anatolianlab: {
    id: 'anatolianlab', name: 'Anatolian Lab', handle: '@anatolianlab',
    city: 'İstanbul', country: 'Türkiye', joined: 'Şubat 2025',
    followers: '14,237', following: 48,
    badges: ['Kurucu Üye', 'YAZSAD Doğrulandı', 'Ayın Sanatçısı · Nisan 2026'],
    bio: '"AI bir ajan değil, bir enstrüman — ben notayı koyarım." İstanbul\'da yaşayan elektronik müzik üreticisi. Synthwave, ambient ve şehir ses manzaralarını AI ile harmanlıyor. YAZSAD\'ın kurucu üyelerinden.',
    g1: '#e94e1b', g2: '#7c3aed', g3: '#1a1a2e',
    bannerG1: '#e94e1b', bannerG2: '#7c3aed', bannerG3: '#1a1a2e',
    links: [
      { label: 'Instagram', url: '@anatolianlab' },
      { label: 'Bandcamp', url: 'anatolianlab.bandcamp.com' },
      { label: 'Kişisel Site', url: 'anatolianlab.co' },
    ],
    stats: { tracks: 24, albums: 3, totalPlays: '245K', monthlyListeners: '18.4K' },
    albums: ['a1'],
    topTrackIds: ['t5', 't1', 't10'],
    upcoming: [
      { event: 'YAZSAD Bahar Festivali', date: '12 Mayıs 2026', venue: 'İstanbul Modern' },
      { event: 'Folk x AI Panel', date: '8 Haziran 2026', venue: 'Salt Beyoğlu' },
    ],
  },
  ses_sifir: {
    id: 'ses_sifir', name: 'SES/0', handle: '@ses_sifir',
    city: 'İstanbul', country: 'Türkiye', joined: 'Ocak 2025',
    followers: '8,702', following: 126,
    badges: ['YAZSAD Doğrulandı'],
    bio: 'İstanbul\'un gece saat 3\'ündeki sessizliğini elektronik dokularla yazmaya çalışan ikili proje. Udio + Suno + Ableton.',
    g1: '#06b6d4', g2: '#ec4899', g3: '#0f0f1e',
    bannerG1: '#06b6d4', bannerG2: '#ec4899', bannerG3: '#0f0f1e',
    links: [
      { label: 'SoundCloud', url: '@ses-sifir' },
      { label: 'X', url: '@ses_0' },
    ],
    stats: { tracks: 18, albums: 2, totalPlays: '143K', monthlyListeners: '9.8K' },
    albums: ['a2'],
    topTrackIds: ['t2', 't7'],
    upcoming: [{ event: 'Gece Yarısı Set', date: '3 Mayıs 2026', venue: 'Zorlu PSM Studio' }],
  },
  denizeldem: {
    id: 'denizeldem', name: 'Deniz Eldem', handle: '@denizeldem',
    city: 'İzmir', country: 'Türkiye', joined: 'Mart 2025',
    followers: '23,105', following: 202,
    badges: ['YAZSAD Doğrulandı', 'Üye', 'Jüri · 2025 Yarışma'],
    bio: 'Bağlama sanatçısı + AI müzik üreticisi. Ege folk köklerini elektronik dokularla birleştiren projeler. İzmir doğumlu, İstanbul Folk Yaşıyor kolektifinin kurucu ortağı.',
    g1: '#4ade80', g2: '#fbbf24', g3: '#1a2e1a',
    bannerG1: '#4ade80', bannerG2: '#fbbf24', bannerG3: '#1a2e1a',
    links: [
      { label: 'YouTube', url: '@denizeldem' },
      { label: 'Instagram', url: '@denizeldem' },
    ],
    stats: { tracks: 12, albums: 4, totalPlays: '388K', monthlyListeners: '22.1K' },
    albums: ['a3'],
    topTrackIds: ['t3', 't8'],
    upcoming: [{ event: 'Ege Folk Gecesi', date: '18 Mayıs 2026', venue: 'Ahmet Adnan Saygun, İzmir' }],
  },
  kara_orman: {
    id: 'kara_orman', name: 'Kara Orman', handle: '@karaorman',
    city: 'Ankara', country: 'Türkiye', joined: 'Nisan 2025',
    followers: '6,341', following: 38,
    badges: ['YAZSAD Doğrulandı'],
    bio: 'Post-rock + ambient + AI orkestra. Uzun formlar, yavaş crescendo\'lar, doğa ses kayıtları.',
    g1: '#8b2635', g2: '#2d4a3e', g3: '#1a1410',
    bannerG1: '#8b2635', bannerG2: '#2d4a3e', bannerG3: '#1a1410',
    links: [{ label: 'Bandcamp', url: 'karaorman.bandcamp.com' }],
    stats: { tracks: 15, albums: 3, totalPlays: '87K', monthlyListeners: '5.2K' },
    albums: ['a4'],
    topTrackIds: ['t4', 't12'],
    upcoming: [],
  },
  hece_makinesi: {
    id: 'hece_makinesi', name: 'Hece Makinesi', handle: '@hecemakinesi',
    city: 'Konya', country: 'Türkiye', joined: 'Haziran 2025',
    followers: '4,129', following: 74,
    badges: ['Üye'],
    bio: 'Klasik Osmanlı makamları + AI. Deneysel, meditatif, makam bazlı üretim. Konya doğumlu.',
    g1: '#d4a574', g2: '#8b2635', g3: '#1a1410',
    bannerG1: '#d4a574', bannerG2: '#8b2635', bannerG3: '#1a1410',
    links: [{ label: 'Site', url: 'hecemakinesi.net' }],
    stats: { tracks: 9, albums: 2, totalPlays: '46K', monthlyListeners: '3.1K' },
    albums: ['a5'],
    topTrackIds: ['t6', 't11'],
    upcoming: [{ event: 'Mevlana\'ya Saygı Gecesi', date: '17 Aralık 2026', venue: 'Konya Kültür Merkezi' }],
  },
  beton_kuslari: {
    id: 'beton_kuslari', name: 'Beton Kuşları', handle: '@betonkuslari',
    city: 'İstanbul', country: 'Türkiye', joined: 'Ağustos 2025',
    followers: '11,847', following: 165,
    badges: ['Üye'],
    bio: 'İstanbul sokaklarının sesi. Hip-hop + AI vokal + saha kayıtları. Kadıköy\'den.',
    g1: '#555', g2: '#e94e1b', g3: '#0a0a0a',
    bannerG1: '#555', bannerG2: '#e94e1b', bannerG3: '#0a0a0a',
    links: [{ label: 'Instagram', url: '@betonkuslari' }],
    stats: { tracks: 21, albums: 1, totalPlays: '189K', monthlyListeners: '14.6K' },
    albums: ['a6'],
    topTrackIds: ['t9'],
    upcoming: [],
  },
};

// Helper: find album for track
const albumForTrack = (trackId) => ALBUMS.find(a => a.tracks.includes(trackId));

// Helper: track comments (sample)
const TRACK_COMMENTS = {
  t5: [
    { user: 'Deniz Eldem', role: 'Sanatçı', time: '2 gün önce', text: 'Bu mix\'teki ney kullanımı inanılmaz — nasıl elde ettin?' },
    { user: 'SES/0', role: 'Sanatçı', time: '3 gün önce', text: 'İstanbul\'un ruhu bu. Lodos ile beraber dinlenince başka oluyor.' },
    { user: 'Mert D.', role: 'Mod', time: '5 gün önce', text: 'Haftanın seçkisi için mükemmel. Replay.' },
    { user: 'Ece K.', role: null, time: '1 hafta önce', text: 'Boğazda koşarken dinlemek için tam kıvamında.' },
  ],
  t1: [
    { user: 'Ayşe K.', role: 'Yayın Kurulu', time: '1 gün önce', text: 'Sis atmosferi çok güzel kurulmuş.' },
    { user: 'Kerem Y.', role: 'Mod', time: '4 gün önce', text: 'Prompt\'unu paylaşır mısın? Forum\'da tartışalım.' },
  ],
  t2: [
    { user: 'Anatolian Lab', role: 'Sanatçı', time: '6 saat önce', text: 'Gece 3 hissi tam alınmış.' },
    { user: 'Deniz E.', role: 'Sanatçı', time: '2 gün önce', text: 'Kapalıçarşı\'nın kapalıyken nasıl olduğunu hiç düşünmemiştim.' },
  ],
};

const commentsForTrack = (trackId) => TRACK_COMMENTS[trackId] || [
  { user: 'Can Y.', role: null, time: '3 gün önce', text: 'Güzel parça, tebrikler.' },
  { user: 'Umut S.', role: null, time: '1 hafta önce', text: 'Playlist\'ime ekledim.' },
];

Object.assign(window, { ALBUMS, ARTISTS, albumForTrack, commentsForTrack, TRACK_COMMENTS });
