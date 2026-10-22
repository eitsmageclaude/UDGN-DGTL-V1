# Satu Cerita - Platform Undangan Digital & Wedding Planner SaaS

Platform SaaS Undangan Pernikahan Digital & Manajemen Tamu interaktif modern berbasis **Next.js 16 (App Router + Turbopack)**, **Prisma ORM**, **MySQL**, dan **Tailwind CSS**.

---

## ✨ Fitur Utama

- **Katalog Tema Lengkap (16+ Desain)**: Termasuk tema *Serene Bloom*, *Secret Garden*, *Velura Noire*, *Lunar Voyage*, *Vintage Minang*, *Royal Javanese*, *Rosegold Serenade*, *Golden Royal*, hingga perayaan *Khitanan*, *Ulang Tahun*, dan *Aqiqah*.
- **Showcase & Detail Tema**: Halaman detail tema dengan mockup iPhone interaktif, cerita filosofi tema, statistik penggunaan, dan rincian palet warna.
- **Tampilan Undangan Publik Interaktif (`/i/[slug]`)**:
  - Cover pembuka dengan nama tamu personal & pemutar musik latar otomatis.
  - Hitung mundur hari H (Countdown Timer).
  - Profil kedua mempelai & kutipan ayat/mutiara cinta.
  - Agenda akad/resepsi terintegrasi navigasi Google Maps & Waze.
  - Galeri pre-wedding dengan Lightbox Modal HD.
  - Panduan dresscode tamu dengan palet warna.
  - Siaran langsung pernikahan (YouTube Live, TikTok Live, Zoom).
  - Instagram Story share button dengan tagar otomatis.
  - Adab menghadiri walimah & daftar keluarga pengundang.
  - Amplop digital dengan tombol satu klik salin nomor rekening/e-wallet.
  - Konfirmasi kehadiran (RSVP) & buku doa tamu dengan animasi confetti.
  - QR Code Pass tamu untuk check-in resepsi.
- **Guest on Screen (`/screen/[slug]`)**: Layar sambutan tamu live polling 3 detik untuk proyektor/TV gedung resepsi.
- **Suite Dasbor Pengguna**:
  - *Wizard Editor*: Pengaturan tema, mempelai, acara, galeri foto, amplop digital, dan musik.
  - *Daftar Tamu & WA Share*: Manajemen tamu, generator tautan undangan personal, dan preview QR pass.
  - *QR Scanner*: Pemindai kamera langsung untuk panitia penerima tamu di meja resepsi.
  - *WhatsApp Blast Queue*: Mesin broadcast undangan personal ke banyak tamu via WhatsApp Web/Desktop.
  - *Billing & Paket*: Simulasi checkout paket (Silver, Gold, Platinum, Diamond, Unlimited).

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack, Server Actions & Route Handlers)
- **Database & ORM**: MySQL via Prisma ORM 6.19.3
- **Styling**: Tailwind CSS & Vanilla Rosegold Aesthetic Tokens
- **Icons**: Lucide React
- **Animations**: Canvas Confetti, Tailwind Animations
- **Language**: TypeScript

---

## 🚀 Panduan Memulai (Getting Started)

### 1. Prasyarat
- Node.js versi 18+ atau 20+
- Database MySQL (misal melalui Laragon, XAMPP, atau cloud MySQL)

### 2. Kloning Repositori
```bash
git clone <url-repo-anda>
cd "UNDNGAN DIGITAL APPS V1"
```

### 3. Instal Dependensi
```bash
npm install
```

### 4. Konfigurasi Environment (`.env`)
Salin file `.env.example` menjadi `.env`:
```env
DATABASE_URL="mysql://root:@127.0.0.1:3306/undangan_digital_db"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
JWT_SECRET="undangan-digital-secret-super-key-2026"
```

### 5. Sinkronisasi Database & Seed Data
Jalankan migrasi schema dan isi database dengan paket, tema, user admin, dan data undangan demo:
```bash
npx prisma db push
npx prisma generate
npx tsx prisma/seed.ts
```

### 6. Jalankan Server Pengembangan
```bash
npm run dev
```
Buka browser di [http://localhost:3000](http://localhost:3000).

---

## 👤 Akun Demo & Login

- **Admin**:
  - Email: `admin@satucerita.com`
  - Password: `password123`
- **User Demo**:
  - Email: `ananda@example.com`
  - Password: `password123`
- **Undangan Demo**:
  - [http://localhost:3000/i/ananda-bella](http://localhost:3000/i/ananda-bella)
  - [http://localhost:3000/screen/ananda-bella](http://localhost:3000/screen/ananda-bella)

---

## 📜 Lisensi
Hak cipta dilindungi. Dikembangkan untuk Satu Cerita Platform.
