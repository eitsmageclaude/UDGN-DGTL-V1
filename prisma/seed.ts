import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // 1. Seed Packages
  const packagesData = [
    {
      name: "Free",
      slug: "free",
      originalPrice: 0,
      price: 0,
      activeDays: 2,
      maxPhotos: 3,
      maxBlast: 10,
      maxEvents: 1,
      isPopular: false,
      isUnlimited: false,
      category: "wedding",
      features: [
        "Masa aktif 2 hari",
        "Galeri 3 foto",
        "Auto blast WhatsApp 10 tamu",
        "1 jenis acara",
        "Buku tamu & RSVP online",
        "Google Maps lokasi",
        "Countdown timer",
      ],
    },
    {
      name: "Silver",
      slug: "silver",
      originalPrice: 150000,
      price: 49000,
      activeDays: 10,
      maxPhotos: 3,
      maxBlast: 50,
      maxEvents: 2,
      isPopular: false,
      isUnlimited: false,
      category: "wedding",
      features: [
        "Masa aktif 10 hari",
        "Galeri 3 foto",
        "Auto blast WhatsApp 50 tamu",
        "2 jenis acara (Akad & Resepsi)",
        "Buku tamu & RSVP online",
        "Google Maps interaktif",
        "Musik latar pilihan",
      ],
    },
    {
      name: "Gold",
      slug: "gold",
      originalPrice: 250000,
      price: 79000,
      activeDays: 30,
      maxPhotos: 6,
      maxBlast: 100,
      maxEvents: 2,
      isPopular: true,
      isUnlimited: false,
      category: "wedding",
      features: [
        "Masa aktif 1 bulan (30 hari)",
        "Galeri 6 foto HD",
        "Auto blast WhatsApp 100 tamu",
        "2 jenis acara",
        "Amplop Digital (Rekening & E-Wallet)",
        "Custom font tema eksklusif",
        "Quotes & ayat kustom",
        "Navigasi Google Maps & Waze",
      ],
    },
    {
      name: "Platinum",
      slug: "platinum",
      originalPrice: 350000,
      price: 119000,
      activeDays: 90,
      maxPhotos: 9,
      maxBlast: 200,
      maxEvents: 3,
      isPopular: false,
      isUnlimited: false,
      category: "wedding",
      features: [
        "Masa aktif 3 bulan",
        "Galeri 9 foto HD",
        "Auto blast WhatsApp 200 tamu",
        "3 jenis acara",
        "Love Story timeline",
        "Dresscode & panduan pakaian",
        "Amplop digital & QRIS",
        "Live streaming embed (YT/IG/TikTok)",
      ],
    },
    {
      name: "Diamond",
      slug: "diamond",
      originalPrice: 500000,
      price: 159000,
      activeDays: 150,
      maxPhotos: 18,
      maxBlast: 350,
      maxEvents: 5,
      isPopular: false,
      isUnlimited: false,
      category: "wedding",
      features: [
        "Masa aktif 5 bulan",
        "Galeri 18 foto HD",
        "Auto blast WhatsApp 350 tamu",
        "5 jenis acara",
        "Akses Wedding Planner gratis",
        "Guest on Screen (Check-in tamu hari H)",
        "QR Scanner tamu untuk panitia",
        "Prioritas support VIP WhatsApp",
      ],
    },
    {
      name: "Unlimited",
      slug: "unlimited",
      originalPrice: 999000,
      price: 249000,
      activeDays: 9999,
      maxPhotos: 999,
      maxBlast: 800,
      maxEvents: 10,
      isPopular: false,
      isUnlimited: true,
      category: "wedding",
      features: [
        "Masa aktif SELAMANYA (After Wedding Memories)",
        "Galeri foto UNLIMITED",
        "Auto blast WhatsApp 800 tamu",
        "Hingga 10 jenis acara",
        "Fitur Guest on Screen & QR Scanner",
        "Akses Wedding Planner Full Version",
        "Custom domain pribadi (opsional)",
        "Voice comment tamu & ekspor data",
      ],
    },
    // Event Packages
    {
      name: "Khitanan Barokah",
      slug: "event-khitanan",
      originalPrice: 120000,
      price: 79000,
      activeDays: 30,
      maxPhotos: 4,
      maxBlast: 100,
      maxEvents: 1,
      isPopular: false,
      isUnlimited: false,
      category: "khitanan",
      features: [
        "Masa aktif 1 bulan",
        "Galeri 4 foto",
        "Amplop digital kado",
        "RSVP & buku doa tamu",
      ],
    },
    {
      name: "Birthday Party",
      slug: "event-birthday",
      originalPrice: 99000,
      price: 50000,
      activeDays: 30,
      maxPhotos: 4,
      maxBlast: 100,
      maxEvents: 1,
      isPopular: false,
      isUnlimited: false,
      category: "birthday",
      features: [
        "Masa aktif 1 bulan",
        "Galeri 4 foto",
        "Konfirmasi kehadiran (RSVP)",
        "Dresscode & playlist pesta",
      ],
    },
    {
      name: "Buka Bersama",
      slug: "event-bukber",
      originalPrice: 80000,
      price: 50000,
      activeDays: 30,
      maxPhotos: 4,
      maxBlast: 100,
      maxEvents: 1,
      isPopular: false,
      isUnlimited: false,
      category: "bukber",
      features: [
        "Masa aktif 1 bulan",
        "Lokasi restoran & menu makanan",
        "Voting kehadiran cepat",
      ],
    },
    {
      name: "Perayaan Natal",
      slug: "event-natal",
      originalPrice: 85000,
      price: 50000,
      activeDays: 30,
      maxPhotos: 4,
      maxBlast: 100,
      maxEvents: 1,
      isPopular: false,
      isUnlimited: false,
      category: "natal",
      features: [
        "Masa aktif 1 bulan",
        "Jadwal ibadah & perayaan",
        "Lagu natal favorit",
      ],
    },
  ];

  for (const pkg of packagesData) {
    await prisma.package.upsert({
      where: { slug: pkg.slug },
      update: pkg,
      create: pkg,
    });
  }
  console.log("Packages seeded successfully!");

  // 2. Seed Themes
  const themesData = [
    {
      name: "Serene Bloom",
      slug: "serene-bloom",
      category: "wedding",
      subCategory: "Artistic",
      previewImage:
        "https://satucerita.eventdigital.id/themes/_assets/demo/preview14/4.jpg",
      colorSwatches: ["#FFF3E3", "#623535", "#A08166"],
      colorFamily: "maroon",
      isPopular: true,
      isFreeTrial: true,
      isActive: true,
      description: "Nuansa romantis vintage European garden dengan kanopi bunga blush pink dan burgundy.",
      story: "Serene Bloom adalah tema undangan digital yang menghadirkan nuansa romantis, lembut, dan tenang dengan sentuhan vintage elegan. Desainnya menampilkan kanopi bunga berwarna blush pink dan dusty rose yang mengalir lembut, dipadukan dengan rangkaian bunga putih dan burgundy yang anggun di kedua sisi. Latar belakang menampilkan pemandangan taman klasik Eropa dengan air mancur dan arsitektur indah, menciptakan suasana dreamy dan berkelas.",
      bestFor: "Cocok untuk pasangan yang menginginkan undangan pernikahan dengan konsep romantis elegan, garden wedding, vintage romance, atau floral soft. Sangat sesuai bagi mempelai yang menyukai palet warna blush pink, burgundy, cream, dan nuansa dreamy European garden.",
      invitationCount: 164,
      guestCount: 1632,
      musicUrl: "https://s3.ap-southeast-1.wasabisys.com/ajakan-internal/music/Crush – Beautiful Goblin.mp3",
      fontFamily: "Playfair Display",
    },
    {
      name: "Secret Garden",
      slug: "secret-garden",
      category: "wedding",
      subCategory: "Artistic",
      previewImage:
        "https://satucerita.eventdigital.id/themes/_assets/demo/preview14/5.jpg",
      colorSwatches: ["#774B53", "#9A6E76", "#D7A5AE"],
      colorFamily: "pink",
      isPopular: true,
      isFreeTrial: true,
      isActive: true,
      description: "Suasana taman rahasia yang romantis dan intim dengan rimbun dedaunan serta tipografi script elegan.",
      story: "Secret Garden adalah tema undangan digital yang menghadirkan suasana taman rahasia yang romantis dan intim. Desainnya menampilkan foto pasangan di tengah taman hijau yang rimbun dengan bunga menjuntai, dilengkapi tipografi script putih yang elegan dan tombol pink lembut. Nuansa cahaya alami dan latar hijau menciptakan kesan hangat, personal, dan penuh keindahan alam.",
      bestFor: "Cocok untuk pasangan yang menginginkan undangan pernikahan dengan konsep garden romance atau outdoor intimate. Sangat sesuai bagi mempelai yang menyukai nuansa hijau alami, photo-centric invitation, atau pernikahan dengan suasana taman yang tenang.",
      invitationCount: 251,
      guestCount: 3562,
      musicUrl: "https://s3.ap-southeast-1.wasabisys.com/ajakan-internal/music/Ghea Indrawari - 1000X.mp3",
      fontFamily: "Imperial Script",
    },
    {
      name: "Eternal Arch",
      slug: "eternal-arch",
      category: "wedding",
      subCategory: "Modern",
      previewImage:
        "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
      colorSwatches: ["#D4A373", "#CCD5AE", "#E9EDC9"],
      colorFamily: "cream",
      isPopular: true,
      isFreeTrial: true,
      isActive: true,
      description: "Arsitektur lengkungan minimalis kontemporer dipadukan sentuhan champagne gold.",
      story: "Eternal Arch terinspirasi dari keanggunan gerbang lengkung katedral Eropa abad pertengahan yang dimodernisasi. Menghadirkan proporsi simetris yang harmonis dengan aksen garis tipis berkarakter tinggi.",
      bestFor: "Pernikahan tema modern clean, ballroom hotel bintang 5, maupun galeri seni minimalis.",
      invitationCount: 198,
      guestCount: 2140,
      musicUrl: "https://s3.ap-southeast-1.wasabisys.com/ajakan-internal/music/Crush – Beautiful Goblin.mp3",
      fontFamily: "Cormorant Garamond",
    },
    {
      name: "Rustic Autumn Foliage",
      slug: "rustic-autumn",
      category: "wedding",
      subCategory: "New",
      previewImage:
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
      colorSwatches: ["#8C4A32", "#D9822B", "#F4E0C9"],
      colorFamily: "cokelat",
      isPopular: false,
      isFreeTrial: true,
      isActive: true,
      description: "Kehangatan rona musim gugur berpadu dedaunan pinus kering dan kayu rustic.",
      story: "Rustic Autumn menghadirkan nuansa hangat perayaan di tengah hutan pinus atau kebun terbuka saat matahari terbenam. Palet terra cotta dan amber menciptakan suasana intim yang akrab.",
      bestFor: "Outdoor wedding, forest venue, villa perbukitan, atau konsep pernikahan bertema bohemian earthy.",
      invitationCount: 142,
      guestCount: 1890,
      musicUrl: "https://s3.ap-southeast-1.wasabisys.com/ajakan-internal/music/Ghea Indrawari - 1000X.mp3",
      fontFamily: "Lora",
    },
    {
      name: "Velura Noire",
      slug: "velura-noire",
      category: "wedding",
      subCategory: "Popular",
      previewImage:
        "https://s3.ap-southeast-1.wasabisys.com/ajakan-internal/photo/preview_theme/preview_theme_4125_1754983313.png",
      colorSwatches: ["#222221", "#C5A059", "#6B2D3C"],
      colorFamily: "hitam",
      isPopular: true,
      isFreeTrial: true,
      isActive: true,
      description: "Kemewahan beludru hitam berpadu foil emas berkilau dan burgundy glamor.",
      story: "Velura Noire menghadirkan statement kemewahan pesta malam yang dramatis dan tak terlupakan. Dirancang untuk pasangan yang percaya diri dengan estetika gelap nan anggun.",
      bestFor: "Night gala wedding, black-tie banquet, ballroom mewah, dan resepsi malam eksklusif.",
      invitationCount: 340,
      guestCount: 4890,
      musicUrl: "https://s3.ap-southeast-1.wasabisys.com/ajakan-internal/music/Crush – Beautiful Goblin.mp3",
      fontFamily: "Cinzel",
    },
    {
      name: "Lunar Voyage",
      slug: "lunar-voyage",
      category: "wedding",
      subCategory: "Modern",
      previewImage:
        "https://s3.ap-southeast-1.wasabisys.com/ajakan-internal/photo/preview_theme/preview_theme_3131_1750701384.png",
      colorSwatches: ["#625445", "#C5A059", "#1C0F12"],
      colorFamily: "cokelat",
      isPopular: true,
      isFreeTrial: true,
      isActive: true,
      description: "Ekspedisi romantis di bawah pendar rembulan dan konstelasi bintang abadi.",
      story: "Tema puitis yang menceritakan dua jiwa yang ditakdirkan bertemu di alam semesta. Elemen fase bulan dan tipografi kontemporer memberikan nuansa misterius yang memikat.",
      bestFor: "Pasangan pecinta astronomi, perayaan rooftop malam hari, atau pesta intim beratapkan bintang.",
      invitationCount: 220,
      guestCount: 3100,
      musicUrl: "https://s3.ap-southeast-1.wasabisys.com/ajakan-internal/music/Ghea Indrawari - 1000X.mp3",
      fontFamily: "Outfit",
    },
    {
      name: "Vintage Minang Charm",
      slug: "vintage-minang-charm",
      category: "wedding",
      subCategory: "Adat",
      previewImage:
        "https://s3.ap-southeast-1.wasabisys.com/ajakan-internal/photo/preview_theme/preview_theme_3127_1746456765.png",
      colorSwatches: ["#661217", "#9C8594", "#B08900"],
      colorFamily: "maroon",
      isPopular: true,
      isFreeTrial: true,
      isActive: true,
      description: "Kemegahan ornamen Rumah Gadang dan ukiran songket Minangkabau berhias benang emas.",
      story: "Menghidupkan kembali keagungan adat Ranah Minang dengan motif carano dan gonjong yang diolah dalam tata letak modern berkelas tinggi.",
      bestFor: "Pernikahan adat Minang, perpaduan suku tradisi nusantara, atau resepsi adat formal.",
      invitationCount: 290,
      guestCount: 4120,
      musicUrl: "https://s3.ap-southeast-1.wasabisys.com/ajakan-internal/music/Crush – Beautiful Goblin.mp3",
      fontFamily: "Playfair Display",
    },
    {
      name: "Royal Javanese Keraton",
      slug: "royal-javanese",
      category: "wedding",
      subCategory: "Adat",
      previewImage:
        "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
      colorSwatches: ["#7E5835", "#C5A059", "#2D1E18"],
      colorFamily: "emas",
      isPopular: false,
      isFreeTrial: true,
      isActive: true,
      description: "Adat Jawa Kasunanan Surakarta dan Yogyakarta dengan ukiran prada dan batik truntum.",
      story: "Motif batik Truntum yang melambangkan cinta tulus yang terus tumbuh mekar abadi, disandingkan bingkai ukiran kayu jati keraton yang sarat doa restu luhur.",
      bestFor: "Pernikahan adat Jawa klasik, upacara panggih, ngunduh mantu, dan resepsi budaya.",
      invitationCount: 265,
      guestCount: 3870,
      musicUrl: "https://s3.ap-southeast-1.wasabisys.com/ajakan-internal/music/Crush – Beautiful Goblin.mp3",
      fontFamily: "Playfair Display",
    },
    {
      name: "Rosegold Serenade",
      slug: "rosegold-serenade",
      category: "wedding",
      subCategory: "Artistic",
      previewImage:
        "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
      colorSwatches: ["#914853", "#7A3A44", "#D8A3AC"],
      colorFamily: "pink",
      isPopular: true,
      isFreeTrial: true,
      isActive: true,
      description: "Simfoni rona rosegold satin yang anggun dengan gradien lembut khas Satu Cerita.",
      story: "Signature design platform Satu Cerita yang merepresentasikan kelembutan kasih sayang dan keteguhan komitmen. Sangat disukai calon mempelai wanita berkat tampilannya yang manis dan mewah.",
      bestFor: "Pernikahan tema rosegold, blush pink romantic, indoor maupun garden celebration.",
      invitationCount: 420,
      guestCount: 6200,
      musicUrl: "https://s3.ap-southeast-1.wasabisys.com/ajakan-internal/music/Ghea Indrawari - 1000X.mp3",
      fontFamily: "Playfair Display",
    },
    {
      name: "Emerald Botanical",
      slug: "emerald-botanical",
      category: "wedding",
      subCategory: "New",
      previewImage:
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
      colorSwatches: ["#1C402E", "#D4AF37", "#F4F7F5"],
      colorFamily: "hijau",
      isPopular: false,
      isFreeTrial: true,
      isActive: true,
      description: "Hutan rimbun zamrud dengan aksen dedaunan monstera, eucalyptus, dan bingkai emas.",
      story: "Membawa kesegaran udara pegunungan dan dedaunan asri ke dalam layar ponsel para tamu undangan. Cocok bagi pasangan pecinta alam yang menginginkan kesegaran visual.",
      bestFor: "Greenhouse wedding, garden party, eco-friendly wedding, dan nuansa tropis mewah.",
      invitationCount: 185,
      guestCount: 2450,
      musicUrl: "https://s3.ap-southeast-1.wasabisys.com/ajakan-internal/music/Crush – Beautiful Goblin.mp3",
      fontFamily: "Lora",
    },
    {
      name: "Aurora Violette",
      slug: "aurora-violette",
      category: "wedding",
      subCategory: "Artistic",
      previewImage:
        "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80",
      colorSwatches: ["#4A2E6B", "#D1A3E2", "#1E112A"],
      colorFamily: "ungu",
      isPopular: false,
      isFreeTrial: true,
      isActive: true,
      description: "Cahaya aurora ungu lembut bercampur pendar lembayung senja yang magis.",
      story: "Warna ungu lavender dan lilac yang menyimbolkan kesetiaan abadi dan pesona ningrat yang memikat hati setiap mata yang memandangnya.",
      bestFor: "Pernikahan bertema lilac, twilight fairytale, pastel purple, dan intimate evening.",
      invitationCount: 130,
      guestCount: 1720,
      musicUrl: "https://s3.ap-southeast-1.wasabisys.com/ajakan-internal/music/Ghea Indrawari - 1000X.mp3",
      fontFamily: "Playfair Display",
    },
    {
      name: "Golden Royal Palace",
      slug: "golden-royal",
      category: "wedding",
      subCategory: "Legacy",
      previewImage:
        "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80",
      colorSwatches: ["#C5A059", "#362B1D", "#FAF6EE"],
      colorFamily: "emas",
      isPopular: true,
      isFreeTrial: true,
      isActive: true,
      description: "Keagungan istana monarki bergaya baroque dengan ukiran damask emas berkilauan.",
      story: "Dirancang khusus bagi pasangan yang mendambakan perayaan megah bagaikan pangeran dan putri kerajaan di istana megah.",
      bestFor: "Grand ballroom, luxury banquet, pesta formal keluarga bangsawan atau tokoh masyarakat.",
      invitationCount: 312,
      guestCount: 4520,
      musicUrl: "https://s3.ap-southeast-1.wasabisys.com/ajakan-internal/music/Crush – Beautiful Goblin.mp3",
      fontFamily: "Cinzel",
    },
    {
      name: "Khitanan Barokah Kids",
      slug: "khitanan-barokah",
      category: "khitanan",
      subCategory: "Modern",
      previewImage:
        "https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?auto=format&fit=crop&w=800&q=80",
      colorSwatches: ["#1A535C", "#4ECDC4", "#FFE66D"],
      colorFamily: "hijau",
      isPopular: true,
      isFreeTrial: true,
      isActive: true,
      description: "Ceria, islami, dan penuh doa keberkahan untuk sang jagoan cilik.",
      story: "Tema tasyakuran walimatul khitan yang ceria berhias balon, bintang emas, dan doa agar ananda menjadi anak sholeh yang berbakti.",
      bestFor: "Syukuran khitanan putra tersayang bersama keluarga besar dan tetangga.",
      invitationCount: 175,
      guestCount: 2300,
      musicUrl: "https://s3.ap-southeast-1.wasabisys.com/ajakan-internal/music/Crush – Beautiful Goblin.mp3",
      fontFamily: "Outfit",
    },
    {
      name: "Sweet Seventeen Euphoria",
      slug: "sweet-seventeen",
      category: "birthday",
      subCategory: "Modern",
      previewImage:
        "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=800&q=80",
      colorSwatches: ["#FF6B6B", "#FFA07A", "#FFE66D"],
      colorFamily: "pink",
      isPopular: true,
      isFreeTrial: true,
      isActive: true,
      description: "Pesta ulang tahun ke-17 yang penuh gemerlap lampu neon, confetti, dan keceriaan.",
      story: "Momen peralihan kedewasaan yang dirayakan meriah bersama sahabat-sahabat terbaik. Dilengkapi fitur dresscode dan playlist lagu pesta.",
      bestFor: "Sweet 17th birthday party, pool party, club lounge gathering, atau garden dinner.",
      invitationCount: 205,
      guestCount: 3400,
      musicUrl: "https://s3.ap-southeast-1.wasabisys.com/ajakan-internal/music/Ghea Indrawari - 1000X.mp3",
      fontFamily: "Outfit",
    },
    {
      name: "Aqiqah Mubarak Pastel",
      slug: "aqiqah-mubarak",
      category: "aqiqah",
      subCategory: "Modern",
      previewImage:
        "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80",
      colorSwatches: ["#70A9A1", "#F6F7EB", "#CFE0C3"],
      colorFamily: "hijau",
      isPopular: false,
      isFreeTrial: true,
      isActive: true,
      description: "Syukuran kelahiran sang buah hati dalam balutan palet pastel lembut penuh berkah.",
      story: "Menyambut amanah terindah dengan rasa syukur mendalam. Tampilan suci dan menyejukkan hati untuk mengundang kerabat mendoakan si kecil.",
      bestFor: "Tasyakuran aqiqah, tasmiyah, serta marhaba putra atau putri tercinta.",
      invitationCount: 95,
      guestCount: 1100,
      musicUrl: "https://s3.ap-southeast-1.wasabisys.com/ajakan-internal/music/Crush – Beautiful Goblin.mp3",
      fontFamily: "Lora",
    },
    {
      name: "Wisuda Graduation Celebration",
      slug: "graduation-star",
      category: "wisuda",
      subCategory: "Modern",
      previewImage:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
      colorSwatches: ["#0B2545", "#134074", "#EEF4F8"],
      colorFamily: "biru",
      isPopular: false,
      isFreeTrial: true,
      isActive: true,
      description: "Selebrasi kelulusan sarjana dan wisuda berhias pita biru navy dan bintang emas cemerlang.",
      story: "Pencapaian akademis yang membanggakan pantas dirayakan bersama orang-orang tercinta yang selalu mendukung perjalanan meraih gelar.",
      bestFor: "Tasyakuran kelulusan kuliah, open house wisuda sarjana, magister, atau doktoral.",
      invitationCount: 88,
      guestCount: 920,
      musicUrl: "https://s3.ap-southeast-1.wasabisys.com/ajakan-internal/music/Ghea Indrawari - 1000X.mp3",
      fontFamily: "Outfit",
    },
    {
      name: "Save The Date Cinematic",
      slug: "save-the-date-minimal",
      category: "save_the_date",
      subCategory: "Modern",
      previewImage:
        "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80",
      colorSwatches: ["#333333", "#E5E5E5", "#A67C52"],
      colorFamily: "hitam",
      isPopular: true,
      isFreeTrial: true,
      isActive: true,
      description: "Pengumuman tanggal pernikahan ringkas, sinematik, dengan integrasi Google Calendar.",
      story: "Fokus pada keindahan foto prewedding pasangan dan ajakan awal bagi tamu agar mengunci tanggal bahagia di kalender mereka.",
      bestFor: "Pemberitahuan awal 3-6 bulan sebelum hari pernikahan berlangsung.",
      invitationCount: 160,
      guestCount: 2200,
      musicUrl: "https://s3.ap-southeast-1.wasabisys.com/ajakan-internal/music/Crush – Beautiful Goblin.mp3",
      fontFamily: "Cinzel",
    },
  ];

  for (const theme of themesData) {
    await prisma.theme.upsert({
      where: { slug: theme.slug },
      update: theme,
      create: theme,
    });
  }
  console.log("Themes seeded successfully!");

  // 3. Seed Users
  const passwordHash = await bcrypt.hash("password123", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@satucerita.com" },
    update: {},
    create: {
      name: "Satu Cerita Super Admin",
      email: "admin@satucerita.com",
      phone: "081234567890",
      password: passwordHash,
      role: "ADMIN",
    },
  });

  const demoUser = await prisma.user.upsert({
    where: { email: "ananda@satucerita.com" },
    update: {},
    create: {
      name: "Ananda Pratama",
      email: "ananda@satucerita.com",
      phone: "081298765432",
      password: passwordHash,
      role: "USER",
    },
  });

  // Partner
  const partnerUser = await prisma.user.upsert({
    where: { email: "mitra@satucerita.com" },
    update: {},
    create: {
      name: "Mitra Wedding Jakarta",
      email: "mitra@satucerita.com",
      phone: "085678901234",
      password: passwordHash,
      role: "PARTNER",
    },
  });

  const partner = await prisma.partner.upsert({
    where: { slug: "mitra-jakarta" },
    update: {},
    create: {
      name: "Mitra Wedding Jakarta",
      slug: "mitra-jakarta",
      domain: "jakarta.satucerita.com",
      logoUrl:
        "https://s3.ap-southeast-1.wasabisys.com/ajakan-user/photo/mitra_logo/mitra_logo_42984_1786088081.png",
      primaryColor: "#914853",
      secondaryColor: "#7a3a44",
      commissionRate: 0.2,
      userId: partnerUser.id,
    },
  });

  // 4. Seed Demo Invitation
  const goldPackage = await prisma.package.findUnique({
    where: { slug: "gold" },
  });
  const rosegoldTheme = await prisma.theme.findUnique({
    where: { slug: "rosegold-serenade" },
  });

  if (goldPackage && rosegoldTheme) {
    const invitation = await prisma.invitation.upsert({
      where: { slug: "ananda-bella" },
      update: {},
      create: {
        slug: "ananda-bella",
        userId: demoUser.id,
        partnerId: partner.id,
        themeId: rosegoldTheme.id,
        packageId: goldPackage.id,
        eventType: "WEDDING",
        title: "The Wedding of Ananda & Bella",
        groomName: "Ananda Pratama, S.T.",
        groomShortName: "Ananda",
        groomParents: "Putra pertama dari Bpk. Ir. Bambang Wijaya & Ibu Endang Lestari",
        groomInstagram: "anandapratama",
        groomPhoto:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
        brideName: "Bella Puspita Sari, S.Farm.",
        brideShortName: "Bella",
        brideParents: "Putri kedua dari Bpk. H. Suryadi, S.E. & Ibu Hj. Ratna Juwita",
        brideInstagram: "bellapuspita",
        bridePhoto:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
        musicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        musicTitle: "Beautiful In White - Shane Filan (Piano Instrumental)",
        quotes:
          "Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berpikir.\n(QS. Ar-Rum: 21)",
        dresscode: "Formal Elegance (Earth Tone / Rose Gold / Pastel)",
        coverImage:
          "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
        status: "PUBLISHED",
        activeUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days ahead
        viewsCount: 342,
        story: [
          {
            year: "2020",
            title: "Pertama Bertemu",
            description:
              "Bertemu pertama kali di sebuah seminar nasional di Universitas Indonesia. Percakapan singkat yang berlanjut menjadi obrolan hangat.",
          },
          {
            year: "2022",
            title: "Memulai Komitmen",
            description:
              "Setelah 2 tahun saling mengenal dan melewati berbagai momen suka duka, kami memutuskan untuk berkomitmen melangkah ke jenjang yang lebih serius.",
          },
          {
            year: "2026",
            title: "Lamaran & Menuju Bahtera",
            description:
              "Dengan restu dari kedua keluarga besar, kami mengikat janji suci pertunangan dan bersiap mengarungi bahtera rumah tangga.",
          },
        ],
      },
    });

    // Events
    await prisma.invitationEvent.createMany({
      data: [
        {
          invitationId: invitation.id,
          title: "Akad Nikah",
          date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
          startTime: "08:00 WIB",
          endTime: "10:00 WIB",
          venueName: "Masjid Raya Pondok Indah",
          venueAddress:
            "Jl. Iskandar Muda No.1, Kebayoran Lama, Kota Jakarta Selatan, DKI Jakarta 12240",
          mapUrl: "https://maps.google.com/?q=Masjid+Raya+Pondok+Indah",
          streamingUrl: "https://youtube.com/live/demo-stream",
          order: 1,
        },
        {
          invitationId: invitation.id,
          title: "Resepsi Pernikahan",
          date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
          startTime: "11:00 WIB",
          endTime: "14:00 WIB",
          venueName: "Grand Ballroom, Hotel Indonesia Kempinski",
          venueAddress:
            "Jl. M.H. Thamrin No.1, Menteng, Kota Jakarta Pusat, DKI Jakarta 10310",
          mapUrl: "https://maps.google.com/?q=Hotel+Indonesia+Kempinski",
          order: 2,
        },
      ],
    });

    // Photos
    await prisma.galleryPhoto.createMany({
      data: [
        {
          invitationId: invitation.id,
          url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
          caption: "Our Pre-wedding in Bromo",
          order: 1,
        },
        {
          invitationId: invitation.id,
          url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
          caption: "Traditional Attire Ceremony",
          order: 2,
        },
        {
          invitationId: invitation.id,
          url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
          caption: "Sunset at Pine Forest",
          order: 3,
        },
        {
          invitationId: invitation.id,
          url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80",
          caption: "A Promise of Forever",
          order: 4,
        },
      ],
    });

    // Envelopes
    await prisma.digitalEnvelope.createMany({
      data: [
        {
          invitationId: invitation.id,
          bankName: "BCA",
          accountNumber: "8720192831",
          accountHolder: "Ananda Pratama",
        },
        {
          invitationId: invitation.id,
          bankName: "Bank Mandiri",
          accountNumber: "1230009876543",
          accountHolder: "Bella Puspita Sari",
        },
      ],
    });

    // Sample Guests
    await prisma.guest.createMany({
      data: [
        {
          invitationId: invitation.id,
          name: "Bpk. Budi Santoso & Keluarga",
          phone: "081234567801",
          slug: "budi-santoso",
          category: "VIP",
          pax: 2,
          isAttending: "HADIR",
        },
        {
          invitationId: invitation.id,
          name: "Ibu Siti Aminah & Partner",
          phone: "081234567802",
          slug: "siti-aminah",
          category: "Keluarga",
          pax: 2,
          isAttending: "HADIR",
        },
        {
          invitationId: invitation.id,
          name: "Reza Rahardian",
          phone: "081234567803",
          slug: "reza-rahardian",
          category: "Sahabat",
          pax: 1,
          isAttending: "PENDING",
        },
      ],
    });

    // Sample Guestbook
    await prisma.guestbookMessage.createMany({
      data: [
        {
          invitationId: invitation.id,
          name: "Budi Santoso",
          attendance: "HADIR",
          message:
            "Selamat menempuh hidup baru Ananda dan Bella! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah serta senantiasa dilimpahi keberkahan. Aamiin.",
        },
        {
          invitationId: invitation.id,
          name: "Siti Aminah",
          attendance: "HADIR",
          message:
            "Barakallahu lakuma wa baraka alaikuma wa jama'a bainakuma fii khoir. Selamat berbahagia Bella & Ananda! Cantik dan ganteng banget serasi!",
        },
        {
          invitationId: invitation.id,
          name: "Dian Sastrowardoyo",
          attendance: "HADIR",
          message:
            "Happy wedding both of you! Wishing you a lifetime of love and joy together!",
        },
      ],
    });

    // Sample Order
    await prisma.order.upsert({
      where: { orderNumber: "ORD-20261022-001" },
      update: {},
      create: {
        orderNumber: "ORD-20261022-001",
        userId: demoUser.id,
        invitationId: invitation.id,
        packageId: goldPackage.id,
        amount: goldPackage.price,
        status: "PAID",
        paymentMethod: "QRIS",
        paidAt: new Date(),
      },
    });

    console.log("Demo Invitation seeded: /i/ananda-bella");
  }

  console.log("Database seed completed successfully! ✨");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
