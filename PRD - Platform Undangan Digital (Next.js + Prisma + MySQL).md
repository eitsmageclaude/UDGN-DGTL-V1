# PRD: Platform Undangan Digital (SaaS)

**Versi:** 1.0 (Draft) | **Tanggal:** 22 Oktober 2026 | **Stack:** Next.js + Prisma + MySQL | **Referensi:** analisa web Satucerita

---

## 1. Ringkasan Produk

Platform SaaS untuk membuat **website undangan digital** (pernikahan, khitanan, aqiqah, wisuda, ulang tahun, bukber, Idul Fitri, Natal, Save The Date). Pengguna memilih tema, mengisi data acara, lalu membagikan satu tautan undangan. Platform menyediakan buku tamu, RSVP, check-in QR, dan pengiriman undangan massal via WhatsApp.

Model bisnis: **paket berlangganan sekali bayar** dengan masa aktif berbeda, dan dukungan **white-label multi-mitra** (reseller memakai branding sendiri).

## 2. Latar Belakang & Masalah

| Masalah | Dampak |
| --- | --- |
| Undangan cetak mahal dan lambat | Biaya tinggi, sulit direvisi |
| Mengirim undangan satu per satu ke banyak tamu | Memakan waktu, rawan terlewat |
| Tidak ada data kehadiran yang rapi | Sulit memperkirakan jumlah tamu |
| Antrean di meja registrasi saat acara | Pengalaman tamu buruk |
| Template terbatas dan susah dikustomisasi | Undangan terlihat generik |

## 3. Tujuan & Metrik Sukses

**Tujuan bisnis**

- Pengguna dapat membuat undangan siap bagikan dalam **kurang dari 10 menit**.
- Konversi dari paket Free ke paket berbayar.
- Mendukung banyak mitra (reseller) tanpa duplikasi kode.

**Metrik (target 6 bulan setelah rilis)**

| Metrik | Target |
| --- | --- |
| Waktu dari daftar sampai undangan terbit | median < 10 menit |
| Konversi Free ke berbayar | >= 8% |
| Skor Lighthouse halaman undangan (mobile) | Performance >= 90, SEO >= 95 |
| LCP halaman undangan | < 2,5 detik pada 4G |
| Keberhasilan pengiriman WA Blast | >= 95% terkirim |
| Uptime | >= 99,5% |
| Error rate API | < 1% |

## 4. Target Pengguna

| Persona | Kebutuhan utama |
| --- | --- |
| **Pemilik acara** (calon pengantin, orang tua) | Tema bagus, mudah diisi, murah, bisa dibagikan ke WA |
| **Tamu undangan** | Halaman cepat, musik, peta, RSVP mudah, ucapan |
| **Panitia/penerima tamu** | Scan QR cepat, daftar hadir real-time |
| **Mitra/reseller** | Brand sendiri, harga sendiri, dasbor penjualan |
| **Admin platform** | Kelola tema, paket, pesanan, mitra, laporan |

## 5. Ruang Lingkup

### 5.1 MVP (Fase 1)

- Landing page, katalog tema, halaman harga
- Registrasi, login, lupa password
- Editor undangan (pernikahan) dan halaman undangan publik
- Buku tamu, RSVP, countdown, galeri, Google Maps, musik
- Paket Free sampai Gold, pembayaran online, aktivasi otomatis
- Dasbor pengguna dan admin dasar

### 5.2 Fase 2

- Check-in QR (Guest on Screen), WA Blast
- Event non-pernikahan (khitanan, aqiqah, dll.)
- Paket Platinum, Diamond, Unlimited
- Fitur amplop digital, love story, dresscode, voice comment

### 5.3 Fase 3

- Multi-mitra (white-label, domain kustom)
- Wedding Planner
- Custom font tema, filter warna lanjutan, analitik undangan

### 5.4 Di Luar Lingkup (saat ini)

- Aplikasi mobile native
- Pembuatan video undangan otomatis
- Marketplace vendor (fotografer, katering)
- Multi-bahasa selain Indonesia dan Inggris

## 6. Kebutuhan Fungsional

Prioritas: **P0** wajib MVP, **P1** penting, **P2** nice to have.

### 6.1 Landing & Pemasaran

| ID | Kebutuhan | Prioritas |
| --- | --- | --- |
| LP-1 | Navbar floating, berubah gaya saat scroll > 12px, menu aktif mengikuti rute/hash | P0 |
| LP-2 | Menu mobile (hamburger), mengunci scroll body saat terbuka | P0 |
| LP-3 | Section keunggulan: Wedding Planner, WA Blast, QR Scanner, Cepat & Mudah | P0 |
| LP-4 | Tab harga: Paket Website dan Paket Event Lainnya | P0 |
| LP-5 | Footer: kontak, FAQ, Kebijakan Privasi, Syarat & Ketentuan | P0 |
| LP-6 | Tombol WhatsApp melayang dengan pesan otomatis | P1 |
| LP-7 | Structured data schema.org (Product + Offer) per halaman | P0 |
| LP-8 | Pelacakan CTA (aksi klik penting dicatat ke server) | P1 |

### 6.2 Autentikasi & Akun

| ID | Kebutuhan | Prioritas |
| --- | --- | --- |
| AU-1 | Login dengan **nomor WhatsApp atau email** + password | P0 |
| AU-2 | Registrasi dengan verifikasi (OTP WhatsApp atau tautan email) | P0 |
| AU-3 | Lupa password via email, **cooldown 60 detik** untuk kirim ulang | P0 |
| AU-4 | Toggle tampil/sembunyi password; izinkan password manager | P0 |
| AU-5 | Perlindungan bot: honeypot, validasi waktu isi form, rate limit, CAPTCHA bila dicurigai | P0 |
| AU-6 | Proteksi CSRF dan sesi aman (cookie HttpOnly, SameSite) | P0 |
| AU-7 | Login sosial (Google) | P2 |

### 6.3 Katalog Tema

| ID | Kebutuhan | Prioritas |
| --- | --- | --- |
| KT-1 | Filter per jenis acara, lalu sub-kategori, termasuk kategori **Populer** | P0 |
| KT-2 | Pagination **di sisi server** (8 per halaman; nomor halaman 3 di mobile, 5 di desktop) | P0 |
| KT-3 | Filter berdasarkan keluarga warna (emas, cream, maroon, hitam, hijau, biru, pink, putih, cokelat, ungu, abu) | P1 |
| KT-4 | Halaman preview tema `/theme/[slug]` dengan data contoh | P0 |
| KT-5 | Gambar katalog memakai lazy-loading dan format modern (WebP/AVIF) | P0 |
| KT-6 | Tombol "Pakai Tema Ini" mengarahkan ke login lalu ke pembuatan undangan | P0 |
| KT-7 | Pengguna Free dapat mencoba semua tema, tetapi tidak bisa menerbitkan tema berbayar | P1 |

### 6.4 Editor Undangan

| ID | Kebutuhan | Prioritas |
| --- | --- | --- |
| ED-1 | Wizard pengisian: mempelai, acara (tanggal, lokasi), galeri, musik, quotes | P0 |
| ED-2 | Pratinjau langsung (live preview) di desktop dan mobile | P0 |
| ED-3 | Pilih dan ganti tema tanpa kehilangan data | P0 |
| ED-4 | Musik: pilih dari pustaka (900+) atau unggah | P1 |
| ED-5 | Galeri foto dengan batas sesuai paket (3, 6, 9, 18, unlimited) | P0 |
| ED-6 | Google Maps lokasi acara (tautan atau koordinat) | P0 |
| ED-7 | Beberapa jenis acara dalam satu undangan (batas sesuai paket) | P1 |
| ED-8 | Link streaming YouTube, Instagram, TikTok | P1 |
| ED-9 | Custom preview WhatsApp (judul, deskripsi, gambar Open Graph) | P1 |
| ED-10 | Custom font tema | P2 |
| ED-11 | Love story, dresscode, kirim amplop (rekening/e-wallet) | P1 |
| ED-12 | Slug/URL undangan kustom, unik per pengguna | P0 |

### 6.5 Halaman Undangan Publik

| ID | Kebutuhan | Prioritas |
| --- | --- | --- |
| UP-1 | Personalisasi nama tamu lewat parameter `?to=Nama` | P0 |
| UP-2 | Cover pembuka (tombol "Buka Undangan") yang memulai musik | P0 |
| UP-3 | Countdown acara | P0 |
| UP-4 | RSVP (hadir/tidak/ragu, jumlah tamu) | P0 |
| UP-5 | Buku tamu dan ucapan, termasuk **voice comment** | P1 |
| UP-6 | Tombol musik play/pause, galeri dengan lightbox, tombol salin rekening | P0 |
| UP-7 | Render server (SSR/ISR) untuk cepat dan SEO, tanpa konten sensitif terindeks | P0 |
| UP-8 | Undangan nonaktif otomatis setelah masa aktif habis (halaman "Undangan Berakhir") | P0 |

### 6.6 Manajemen Tamu, Check-in, dan WA Blast

| ID | Kebutuhan | Prioritas |
| --- | --- | --- |
| MT-1 | Kelola daftar tamu: tambah manual, impor CSV/Excel, kelompokkan | P0 |
| MT-2 | Setiap tamu punya tautan unik dan kode QR | P1 |
| MT-3 | **Guest on Screen**: layar sambutan yang menampilkan nama tamu saat check-in | P1 |
| MT-4 | Scanner QR berbasis kamera browser untuk panitia | P1 |
| MT-5 | **WA Blast**: kirim massal via WhatsApp API, antrean, status (pending/terkirim/gagal) | P1 |
| MT-6 | Kuota blast sesuai paket (10, 50, 100, 200, 350, 800) | P1 |
| MT-7 | Template pesan dengan variabel `{nama}` dan `{link}` | P1 |
| MT-8 | Ekspor daftar hadir | P2 |

### 6.7 Paket, Pesanan, dan Pembayaran

| ID | Kebutuhan | Prioritas |
| --- | --- | --- |
| PB-1 | Katalog paket dengan harga coret dan harga diskon | P0 |
| PB-2 | Checkout dengan payment gateway (VA, QRIS, e-wallet) | P0 |
| PB-3 | Webhook pembayaran, aktivasi paket otomatis, idempoten | P0 |
| PB-4 | Invoice dan riwayat pesanan | P1 |
| PB-5 | Kode promo/voucher | P2 |
| PB-6 | Upgrade paket (selisih harga) | P1 |
| PB-7 | Pengingat masa aktif akan habis (email/WA) | P1 |

### 6.8 Dasbor Admin & Mitra

| ID | Kebutuhan | Prioritas |
| --- | --- | --- |
| AD-1 | CRUD tema, sub-tema, kategori, tag warna, status populer | P0 |
| AD-2 | CRUD paket, fitur, harga, flag aktif per jenis acara | P0 |
| AD-3 | Kelola pengguna, pesanan, dan undangan | P0 |
| AD-4 | Kelola mitra: logo, warna, domain, harga, bagi hasil | P2 |
| AD-5 | Laporan penjualan dan statistik pengunjung | P1 |
| AD-6 | Role dan izin (super admin, admin, mitra, CS) | P0 |

## 7. Paket & Harga (acuan awal)

| Paket | Harga coret | Harga | Masa aktif | Foto | Blast WA | Jenis acara |
| --- | --- | --- | --- | --- | --- | --- |
| Free | - | Rp0 | 2 hari | 3 | 10 | 1 |
| Silver | Rp150.000 | Rp49.000 | 10 hari | 3 | 50 | 2 |
| Gold | Rp250.000 | Rp79.000 | 1 bulan | 6 | 100 | 2 |
| Platinum | Rp350.000 | Rp119.000 | 3 bulan | 9 | 200 | 3 |
| Diamond | Rp500.000 | Rp159.000 | 5 bulan | 18 | 350 | 5 |
| Unlimited | Rp999.000 | Rp249.000 | Selamanya | Unlimited | 800 | 10 |

Paket event lain (Khitanan, Birthday, Bukber, Natal): Rp50.000 sampai Rp79.000, masa aktif 1 bulan, galeri 4 foto.

> Fitur dan batas dikelola sebagai **data** (tabel `Package` dan `PackageFeature`), bukan hardcode, agar admin bisa mengubah paket tanpa deploy.

## 8. Kebutuhan Non-Fungsional

**Performa**

- LCP < 2,5 dtk, CLS < 0,1, INP < 200 ms (mobile 4G)
- Halaman undangan memakai ISR dengan revalidasi saat data diubah
- Gambar lewat `next/image`, disimpan di object storage + CDN

**Keamanan & privasi**

- Password di-hash (Argon2/bcrypt), rate limit login, proteksi brute force
- Validasi input dengan Zod di semua endpoint; sanitasi konten buatan pengguna (cegah XSS)
- Unggahan: batasi tipe dan ukuran, pindai, nama file acak
- Data pribadi tamu (nama, nomor WA) dienkripsi saat transit; ikuti **UU Pelindungan Data Pribadi (UU PDP)**
- Webhook pembayaran diverifikasi dengan signature

**Aksesibilitas**

- Kontras warna memadai, `aria-label` pada kontrol ikon, `alt` pada gambar
- Hormati `prefers-reduced-motion`

**Ketersediaan & operasional**

- Backup database harian, retensi 14 hari; pemulihan diuji
- Logging terstruktur, monitoring error (mis. Sentry), health check

**Kompatibilitas**

- Browser modern dua versi terakhir; prioritas Chrome Android dan Safari iOS

## 9. Animasi & UX

| Elemen | Spesifikasi |
| --- | --- |
| Animasi scroll | Fade-up, zoom-in/out, fade-left/right; durasi 850 ms, `ease-out-cubic`, sekali jalan, offset 80 px; **nonaktif di mobile** untuk performa |
| Dekorasi tema | Daun/kupu-kupu SVG dengan sway dan pulse |
| Hero | Fade bertahap (staggered) 5 tingkat |
| Kartu & gambar | Hover terangkat dan zoom gambar |
| Efek kaca | Backdrop-blur pada navbar dan input |
| Optimasi | Animasi dijeda saat elemen di luar layar (IntersectionObserver) atau tab tidak aktif |
| Aksesibilitas | Semua animasi dimatikan bila `prefers-reduced-motion: reduce` |

Tema visual dasar **Rosegold** (primer `#914853`, sekunder `#7a3a44`, teks `#5c2a33`, latar `#fdf2f4`, aksen `#d8a3ac`) disimpan sebagai **design token / CSS variable** agar mudah di-rebrand per mitra.

## 10. Arsitektur Teknis

| Lapisan | Pilihan |
| --- | --- |
| Framework | Next.js (App Router), React, TypeScript |
| Styling | Tailwind CSS + CSS variables untuk token tema |
| Animasi | Framer Motion atau AOS; CSS keyframes untuk dekorasi |
| ORM & DB | Prisma + **MySQL** (pooling via PlanetScale/ProxySQL atau Prisma Accelerate bila serverless) |
| Autentikasi | Auth.js atau Better Auth (credentials + OTP) |
| Validasi | Zod |
| State & data | Server Components, Server Actions, TanStack Query untuk bagian interaktif |
| Antrean job | Redis + BullMQ (WA Blast, email, pengingat masa aktif) |
| Penyimpanan file | S3-compatible (Wasabi/R2) + CDN |
| Pembayaran | Midtrans atau Xendit |
| WhatsApp | WhatsApp Business API / gateway resmi |
| Email | Resend atau SMTP |
| Deployment | VPS (Docker) atau Vercel + managed MySQL |
| Observabilitas | Sentry, log terstruktur, uptime monitor |
| Analitik | Cloudflare Web Analytics atau Plausible |

### Struktur rute utama

- `/` beranda dan katalog, `/about-us`, `/product`, `/faq`, `/privacy-policy`, `/term-condition`
- `/login`, `/register`, `/forgot-password`
- `/theme/[slug]` preview tema
- `/i/[slug]` undangan publik
- `/dashboard/*` area pengguna, `/admin/*` area admin dan mitra
- `/api/*` untuk katalog, RSVP, webhook pembayaran, CTA tracking

## 11. Model Data (ringkas, Prisma)

Entitas inti: `User`, `Partner`, `Package`, `PackageFeature`, `Order`, `Payment`, `Theme`, `SubTheme`, `ThemeColor`, `Invitation`, `InvitationEvent`, `GalleryPhoto`, `Guest`, `Rsvp`, `GuestbookMessage`, `BlastJob`, `BlastMessage`, `CtaEvent`.

```prisma
model Invitation {
  id          String   @id @default(cuid())
  slug        String   @unique
  userId      String
  partnerId   String?
  themeId     String
  packageId   String
  eventType   EventType
  title       String
  musicUrl    String?
  quotes      String?  @db.Text
  status      InvitationStatus @default(DRAFT)
  activeUntil DateTime?
  createdAt   DateTime @default(now())

  user    User   @relation(fields: [userId], references: [id])
  theme   Theme  @relation(fields: [themeId], references: [id])
  events  InvitationEvent[]
  guests  Guest[]
  photos  GalleryPhoto[]

  @@index([userId])
  @@index([partnerId])
}

enum EventType { WEDDING KHITANAN AQIQAH WISUDA BIRTHDAY BUKBER IDUL_FITRI NATAL SAVE_THE_DATE }
enum InvitationStatus { DRAFT PUBLISHED EXPIRED SUSPENDED }
```

Catatan desain: kolom `partnerId` pada tabel utama menjadi dasar **multi-tenant**; semua query admin mitra wajib difilter berdasarkan `partnerId`.

## 12. Alur Pengguna Utama

1. **Pembuatan undangan:** Landing, pilih tema, daftar/login, wizard isi data, pratinjau, pilih paket, bayar, terbit, bagikan tautan.
2. **Tamu:** Buka tautan, cover, buka undangan, lihat detail, isi RSVP dan ucapan.
3. **Hari acara:** Panitia scan QR, layar sambutan menampilkan nama tamu, daftar hadir tersinkron.
4. **Upgrade:** Dasbor, pilih paket lebih tinggi, bayar selisih, batas fitur langsung naik.

## 13. Roadmap

| Fase | Durasi perkiraan | Hasil |
| --- | --- | --- |
| 0. Persiapan | 2 minggu | Desain UI, design token, skema database, setup CI/CD |
| 1. MVP | 8 minggu | Landing, auth, katalog, editor, undangan publik, RSVP, pembayaran, dasbor dasar |
| 2. Operasional acara | 6 minggu | Tamu, QR check-in, WA Blast, event non-pernikahan, paket lengkap |
| 3. Skala & mitra | 6 minggu | Multi-mitra, white-label, laporan, Wedding Planner |
| 4. Penyempurnaan | berkelanjutan | Optimasi performa, A/B test, fitur baru |

## 14. Risiko & Mitigasi

| Risiko | Dampak | Mitigasi |
| --- | --- | --- |
| Akun WhatsApp diblokir karena blast | Fitur inti mati | Gunakan API resmi, batasi laju kirim, opt-in tamu |
| Koneksi MySQL habis di serverless | Error saat trafik naik | Connection pooling, singleton Prisma Client |
| Lonjakan trafik saat musim nikah | Lambat/down | ISR, CDN, cache, load test sebelum musim ramai |
| Penyalahgunaan unggahan | Konten berbahaya | Validasi tipe/ukuran, moderasi, laporan pengguna |
| Kebocoran data tamu | Risiko hukum (UU PDP) | Enkripsi, kontrol akses, audit, kebijakan privasi jelas |
| Pembayaran ganda atau tidak teraktivasi | Pelanggan kecewa | Webhook idempoten, rekonsiliasi harian |
| Kompleksitas multi-tenant | Bug lintas mitra | Desain `partnerId` sejak awal, tes isolasi data |
| Perubahan cepat ekosistem Next.js | Biaya maintenance | Kunci versi, uji upgrade berkala |

## 15. Pertanyaan Terbuka

1. Apakah produk ini dibuat untuk **satu brand** atau langsung **multi-mitra**?
2. Payment gateway dan penyedia WhatsApp mana yang akan dipakai?
3. Apakah tema dibuat tim sendiri, atau terbuka untuk desainer eksternal?
4. Apakah paket Free perlu watermark atau batas tampilan?
5. Target kota/negara awal, dan apakah perlu dukungan zona waktu?
6. Siapa penanggung jawab moderasi konten dan layanan pelanggan?

## 16. Kriteria Penerimaan MVP

- Pengguna baru dapat mendaftar, memilih tema, mengisi data, membayar, dan menerbitkan undangan tanpa bantuan admin.
- Undangan publik memuat dalam < 2,5 detik (LCP) pada simulasi 4G.
- RSVP dan ucapan tamu tersimpan dan tampil di dasbor pemilik.
- Pembayaran sukses mengaktifkan paket otomatis dalam < 1 menit.
- Undangan yang masa aktifnya habis berubah status otomatis menjadi **Expired**.
- Seluruh endpoint tervalidasi, dilindungi rate limit, dan lolos pemeriksaan keamanan dasar (OWASP Top 10).
