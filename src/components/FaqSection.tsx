"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Berapa lama proses pembuatan undangan digital?",
      a: "Hanya butuh 5 hingga 10 menit! Anda cukup memilih tema yang disukai, mengisi form data kedua mempelai serta detail acara, lalu undangan Anda langsung terbit dan siap dibagikan.",
    },
    {
      q: "Apakah saya bisa mencoba membuat undangan secara gratis?",
      a: "Tentu saja! Kami menyediakan Paket Free tanpa biaya untuk mencoba fitur dasar dan melihat preview tampilan undangan Anda sebelum memutuskan untuk upgrade ke paket berbayar.",
    },
    {
      q: "Bagaimana cara kerja fitur Auto Blast WhatsApp?",
      a: "Anda cukup mengimpor atau memasukkan nomor WhatsApp dan nama tamu. Sistem kami akan menyiapkan teks undangan khusus yang otomatis menyertakan nama masing-masing tamu beserta tautan personal mereka tanpa harus mengetik satu demi satu.",
    },
    {
      q: "Apakah musik latar bisa diganti dengan lagu favorit kami?",
      a: "Ya! Kami menyediakan lebih dari 900+ pilihan musik instrumen romantis dan pop wedding, atau Anda juga dapat mengunggah file musik khusus pilihan Anda.",
    },
    {
      q: "Bagaimana jika ada perubahan jadwal atau lokasi acara setelah undangan disebar?",
      a: "Anda dapat memperbarui informasi acara, peta lokasi, maupun foto galeri kapan saja melalui dasbor Anda secara real-time. Tamu yang membuka tautan akan langsung melihat data terbaru.",
    },
    {
      q: "Apakah fitur QR Scanner dan Guest on Screen memerlukan aplikasi tambahan?",
      a: "Tidak perlu menginstal aplikasi apa pun. Panitia penerima tamu cukup membuka halaman scanner dari browser ponsel untuk memindai kode QR tamu, dan layar sambutan tamu (Guest on Screen) bisa dibuka langsung di laptop yang terhubung ke proyektor / TV.",
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 bg-[#faf8f8] border-t border-pink-100/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-[#914853] text-xs font-semibold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Tanya Jawab Populer</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#5c2a33] tracking-tight">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            Punya pertanyaan seputar cara pemesanan, paket, atau fitur undangan digital? Temukan jawabannya di sini.
          </p>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-pink-100/80 shadow-sm overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left px-6 py-4.5 flex items-center justify-between gap-4 text-sm sm:text-base font-semibold text-[#5c2a33] hover:text-[#914853]"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#914853] shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-sm text-gray-600 leading-relaxed border-t border-gray-50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
