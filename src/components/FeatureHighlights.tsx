import React from "react";
import {
  CalendarCheck2,
  Send,
  QrCode,
  Sparkles,
  Music,
  MapPin,
  Gift,
  Clock,
  Tv,
} from "lucide-react";

export default function FeatureHighlights() {
  const features = [
    {
      icon: <CalendarCheck2 className="w-6 h-6 text-[#914853]" />,
      title: "Wedding Planner Terpadu",
      description:
        "Kelola timeline hari H, checklist persiapan vendor, anggaran budget, hingga cloud drive berkas acara dalam satu dasbor rapi.",
      badge: "Eksklusif",
    },
    {
      icon: <Send className="w-6 h-6 text-[#914853]" />,
      title: "Auto Blast WhatsApp",
      description:
        "Kirim undangan ke ratusan tamu sekali klik dengan template personal memanggil nama tamu otomatis {nama} dan link unik {link}.",
      badge: "Hemat Waktu",
    },
    {
      icon: <QrCode className="w-6 h-6 text-[#914853]" />,
      title: "QR Scanner Tamu",
      description:
        "Registrasi tamu kilat di meja resepsi menggunakan kamera ponsel panitia tanpa antrean panjang. Data hadir langsung tersinkronisasi.",
      badge: "Resepsi Modern",
    },
    {
      icon: <Tv className="w-6 h-6 text-[#914853]" />,
      title: "Guest on Screen",
      description:
        "Tampilkan nama dan ucapan tamu secara live di layar proyektor / TV venue saat mereka melakukan check-in di lokasi acara.",
      badge: "WOW Effect",
    },
    {
      icon: <Gift className="w-6 h-6 text-[#914853]" />,
      title: "Amplop Digital & QRIS",
      description:
        "Tamu dapat mengirimkan kado pernikahan atau tanda kasih secara cashless langsung ke rekening bank atau dompet digital kamu.",
      badge: "Praktis",
    },
    {
      icon: <Clock className="w-6 h-6 text-[#914853]" />,
      title: "Jadi Dalam 10 Menit",
      description:
        "Cukup pilih tema favorit, lengkapi data mempelai dan jadwal acara, undangan siap dibagikan ke seluruh keluarga dan sahabat.",
      badge: "Instant",
    },
  ];

  return (
    <section className="py-20 bg-white border-y border-pink-100/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-[#914853] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fitur Tercanggih & Terlengkap</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#5c2a33] tracking-tight">
            Semua yang Kamu Butuhkan untuk Acara Impian
          </h2>
          <p className="mt-3 text-base text-gray-600">
            Didesain khusus untuk mempermudah calon pengantin dan panitia menyukseskan momen istimewa.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-white to-[#faf5f6] p-8 rounded-3xl border border-pink-100/80 shadow-sm hover:shadow-xl hover:border-pink-300 transition-all duration-300 hover:-translate-y-1.5 relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-pink-100/70 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {feat.icon}
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-white text-[#914853] border border-pink-200">
                    {feat.badge}
                  </span>
                </div>

                <h3 className="font-serif-luxury text-xl font-bold text-[#5c2a33] mb-2">
                  {feat.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
