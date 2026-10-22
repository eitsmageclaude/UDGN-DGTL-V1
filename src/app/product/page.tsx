import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import {
  Sparkles,
  Calendar,
  Send,
  QrCode,
  Tv,
  Gift,
  Music,
  MapPin,
  Image as ImageIcon,
  Check,
  ArrowRight,
} from "lucide-react";

export const metadata = {
  title: "Fitur Lengkap Produk - Satu Cerita Undangan Digital",
  description:
    "Eksplorasi seluruh fitur unggulan Satu Cerita: Wedding Planner, WA Blast, QR Check-in Tamu, Guest on Screen, dan 160+ tema eksklusif.",
};

export default function ProductPage() {
  const sections = [
    {
      title: "1. Website Undangan Eksklusif",
      desc: "Hadirkan pengalaman visual kelas atas bagi para tamu melalui website undangan responsif dan interaktif.",
      items: [
        "160+ pilihan tema pernikahan, adat nusantara, dan modern",
        "Cover pembuka 'Buka Undangan' dengan musik latar romantis",
        "Personalisasi nama tamu unik di URL (?to=Nama+Tamu)",
        "Countdown timer menghitung mundur menuju hari sakral",
        "Galeri foto pre-wedding resolusi tinggi dengan tampilan lightbox",
        "Navigasi rute terintegrasi Google Maps & Waze",
        "Embed video live streaming (YouTube, TikTok, Instagram)",
      ],
      icon: <Sparkles className="w-6 h-6 text-[#914853]" />,
    },
    {
      title: "2. Wedding Planner & Checklist Terpadu",
      desc: "Asisten pribadi calon pengantin untuk merencanakan pernikahan tanpa stres.",
      items: [
        "Checklist persiapan acara 12 bulan hingga H-1 pernikahan",
        "Rundown & timeline jadwal acara hari H",
        "Kalkulator estimasi anggaran dan pengeluaran vendor",
        "Penyimpanan cloud dokumen vendor (MoU, invoice, kontak WO)",
      ],
      icon: <Calendar className="w-6 h-6 text-[#914853]" />,
    },
    {
      title: "3. Auto Blast WhatsApp & RSVP Online",
      desc: "Sebarkan undangan ke ratusan tamu dalam hitungan menit tanpa khawatir salah kirim.",
      items: [
        "Kirim undangan massal otomatis via WhatsApp",
        "Template pesan memanggil nama tamu otomatis {nama} dan link {link}",
        "Form RSVP kehadiran real-time (Hadir, Ragu, Tidak Hadir, Jumlah Tamu)",
        "Buku doa & ucapan selamat dari tamu dengan opsi komentar suara",
        "Ekspor daftar konfirmasi tamu ke file Excel / CSV",
      ],
      icon: <Send className="w-6 h-6 text-[#914853]" />,
    },
    {
      title: "4. Check-in QR Tamu & Guest on Screen",
      desc: "Sentuhan teknologi mutakhir untuk meja registrasi dan ruang resepsi.",
      items: [
        "Setiap tamu memiliki barcode / kode QR unik pada undangannya",
        "Scanner QR berbasis web kamera ponsel untuk panitia penerima tamu",
        "Layar sambutan interaktif (Guest on Screen) di proyektor venue",
        "Animasi nama tamu dan ucapan muncul seketika saat tamu check-in",
      ],
      icon: <Tv className="w-6 h-6 text-[#914853]" />,
    },
    {
      title: "5. Amplop Digital & Tanda Kasih Cashless",
      desc: "Kemudahan bagi para tamu yang berhalangan hadir atau ingin memberikan kado secara praktis.",
      items: [
        "Dukungan rekening bank resmi (BCA, Mandiri, BRI, BNI, dll.)",
        "Dukungan e-wallet (Dana, GoPay, OVO, ShopeePay)",
        "Satu klik tombol 'Salin Nomor Rekening'",
        "Tampilan QRIS untuk transfer instan dari semua aplikasi bank",
      ],
      icon: <Gift className="w-6 h-6 text-[#914853]" />,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f8]">
      <Navbar />
      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100 text-[#914853] text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Solusi Pernikahan Digital End-to-End</span>
            </div>
            <h1 className="font-serif-luxury text-4xl sm:text-5xl font-bold text-[#5c2a33] tracking-tight">
              Eksplorasi Seluruh Fitur Satu Cerita
            </h1>
            <p className="mt-4 text-base sm:text-lg text-gray-600">
              Rangkaian teknologi terlengkap yang menjembatani keindahan estetika tradisional dengan kepraktisan digital modern.
            </p>
          </div>

          {/* Feature Sections */}
          <div className="space-y-12">
            {sections.map((sec, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-pink-100 flex flex-col md:flex-row gap-8 items-start"
              >
                <div className="w-14 h-14 rounded-2xl bg-pink-100 text-[#914853] flex items-center justify-center shrink-0">
                  {sec.icon}
                </div>
                <div className="flex-1">
                  <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#5c2a33] mb-3">
                    {sec.title}
                  </h2>
                  <p className="text-gray-600 mb-6 leading-relaxed text-sm sm:text-base">
                    {sec.desc}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {sec.items.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 text-sm text-gray-700"
                      >
                        <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA Box */}
          <div className="mt-16 bg-gradient-to-r from-[#914853] to-[#7a3a44] rounded-3xl p-10 sm:p-12 text-white text-center shadow-xl">
            <h3 className="font-serif-luxury text-3xl font-bold mb-3">
              Siap Mewujudkan Undangan Pernikahan Impianmu?
            </h3>
            <p className="text-pink-100 max-w-xl mx-auto mb-8 text-sm sm:text-base">
              Mulai sekarang secara gratis. Pilih dari 160+ tema eksklusif dan terbitkan undanganmu dalam 10 menit!
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#5c2a33] font-bold text-base rounded-2xl hover:bg-pink-50 transition-all shadow-lg hover:scale-105"
            >
              <span>Daftar Sekarang</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
}
