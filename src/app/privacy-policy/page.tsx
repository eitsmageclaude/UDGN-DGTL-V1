import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import { ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Kebijakan Privasi - Satu Cerita",
  description:
    "Kebijakan privasi Satu Cerita dalam mengelola dan melindungi data pribadi pengguna dan tamu undangan sesuai UU No. 27 Tahun 2022 (UU PDP).",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f8]">
      <Navbar />
      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-pink-100 text-gray-700 leading-relaxed space-y-6">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#914853] bg-pink-50 py-1.5 px-3 rounded-lg w-fit">
              <ShieldCheck className="w-4 h-4" />
              <span>Kepatuhan UU PDP No. 27 Tahun 2022</span>
            </div>

            <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#5c2a33]">
              Kebijakan Privasi
            </h1>
            <p className="text-sm text-gray-500">
              Terakhir diperbarui: 22 Oktober 2026
            </p>

            <div className="space-y-4 pt-4 border-t border-gray-100 text-sm sm:text-base">
              <h2 className="font-serif-luxury text-xl font-bold text-[#5c2a33]">
                1. Komitmen Perlindungan Data Pribadi
              </h2>
              <p>
                Satu Cerita menghargai dan berkomitmen untuk melindungi seluruh data pribadi yang dipercayakan kepada kami oleh pengguna (calon pengantin/pemilik acara) dan tamu undangan. Seluruh pemrosesan data dilakukan dengan tunduk pada Undang-Undang Republik Indonesia Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP).
              </p>

              <h2 className="font-serif-luxury text-xl font-bold text-[#5c2a33]">
                2. Data yang Kami Kumpulkan
              </h2>
              <p>
                Kami hanya mengumpulkan data yang diperlukan guna menyediakan layanan pembuatan dan penyebaran undangan digital:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li><b>Data Akun Pengguna:</b> Nama lengkap, alamat email, nomor telepon/WhatsApp, dan kata sandi terenkripsi.</li>
                <li><b>Data Konten Acara:</b> Nama kedua mempelai/tokoh acara, foto galeri, lokasi acara, nomor rekening untuk amplop digital.</li>
                <li><b>Data Tamu Undangan:</b> Nama tamu dan nomor WhatsApp yang diinput oleh pemilik acara untuk keperluan pengiriman tautan undangan dan check-in hari H.</li>
                <li><b>Data Buku Tamu:</b> Pesan ucapan doa dan konfirmasi kehadiran (RSVP) dari para tamu.</li>
              </ul>

              <h2 className="font-serif-luxury text-xl font-bold text-[#5c2a33]">
                3. Penggunaan dan Kerahasiaan Data
              </h2>
              <p>
                Data nomor telepon tamu undangan Anda tidak akan pernah dijual, disewakan, atau dibagikan kepada pihak ketiga untuk tujuan pemasaran di luar konteks pengiriman undangan acara Anda.
              </p>

              <h2 className="font-serif-luxury text-xl font-bold text-[#5c2a33]">
                4. Keamanan Penyimpanan Data
              </h2>
              <p>
                Semua transmisi data dilindungi enkripsi SSL/TLS 256-bit standar industri. Kata sandi disimpan menggunakan algoritma hashing bcrypt dengan salt kuat. Penyimpanan basis data dilengkapi pencadangan berkala dan kontrol akses berlapis.
              </p>

              <h2 className="font-serif-luxury text-xl font-bold text-[#5c2a33]">
                5. Hak Pemilik Data
              </h2>
              <p>
                Anda berhak meminta penghapusan akun, pengeditan data, atau pencabutan izin pemrosesan data kapan saja dengan menghubungi tim kami di <b>privacy@satucerita.com</b>.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
}
