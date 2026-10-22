import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import { FileText } from "lucide-react";

export const metadata = {
  title: "Syarat & Ketentuan Layanan - Satu Cerita",
  description:
    "Syarat dan ketentuan penggunaan platform undangan digital Satu Cerita, hak cipta, dan ketentuan paket berlangganan.",
};

export default function TermConditionPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f8]">
      <Navbar />
      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-pink-100 text-gray-700 leading-relaxed space-y-6">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#914853] bg-pink-50 py-1.5 px-3 rounded-lg w-fit">
              <FileText className="w-4 h-4" />
              <span>Ketentuan Layanan</span>
            </div>

            <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#5c2a33]">
              Syarat & Ketentuan Layanan
            </h1>
            <p className="text-sm text-gray-500">
              Terakhir diperbarui: 22 Oktober 2026
            </p>

            <div className="space-y-4 pt-4 border-t border-gray-100 text-sm sm:text-base">
              <h2 className="font-serif-luxury text-xl font-bold text-[#5c2a33]">
                1. Penerimaan Ketentuan
              </h2>
              <p>
                Dengan mengakses atau menggunakan platform Satu Cerita, Anda menyatakan setuju untuk terikat oleh Syarat dan Ketentuan ini. Jika Anda tidak menyetujui salah satu bagian, Anda disarankan untuk tidak melanjutkan penggunaan layanan kami.
              </p>

              <h2 className="font-serif-luxury text-xl font-bold text-[#5c2a33]">
                2. Masa Aktif Undangan & Batasan Paket
              </h2>
              <p>
                Setiap paket undangan digital memiliki masa aktif, kuota foto, dan batas pengiriman WhatsApp yang berbeda sesuai dengan tabel paket yang dipilih saat pembelian. Setelah masa aktif berakhir, tautan undangan akan menampilkan halaman ramah "Masa Aktif Undangan Telah Selesai". Pemilik acara dapat memperpanjang masa aktif kapan saja melalui dasbor.
              </p>

              <h2 className="font-serif-luxury text-xl font-bold text-[#5c2a33]">
                3. Pembayaran & Pengembalian Dana
              </h2>
              <p>
                Pembayaran dilakukan sekali bayar di muka (one-time payment) melalui metode pembayaran resmi yang tersedia di platform kami. Mengingat sifat produk digital yang langsung dapat diakses dan diterbitkan seketika, pengembalian dana (refund) tidak dapat dilakukan setelah paket berhasil diaktifkan, kecuali terjadi kendala teknis fatal dari sistem kami yang tidak dapat diselesaikan dalam 1x24 jam.
              </p>

              <h2 className="font-serif-luxury text-xl font-bold text-[#5c2a33]">
                4. Konten Pengguna
              </h2>
              <p>
                Pengguna bertanggung jawab penuh atas segala teks, foto, dan materi audio yang diunggah ke dalam undangan. Pengguna dilarang mengunggah konten yang mengandung unsur pornografi, ujaran kebencian, pelanggaran hak cipta orang lain, atau melanggar norma hukum yang berlaku di Indonesia.
              </p>

              <h2 className="font-serif-luxury text-xl font-bold text-[#5c2a33]">
                5. Kemitraan & Reseller (White-Label)
              </h2>
              <p>
                Mitra reseller berhak menggunakan sistem white-label dengan branding mereka sendiri sesuai dengan perjanjian kemitraan yang disepakati bersama pihak manajemen Satu Cerita.
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
