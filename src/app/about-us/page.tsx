import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import { Sparkles, Heart, Users, Target, Award } from "lucide-react";

export const metadata = {
  title: "Tentang Kami - Satu Cerita Platform Undangan Digital",
  description:
    "Mengenal Satu Cerita, visi kami merevolusi cara calon pengantin Indonesia membagikan kisah cinta mereka melalui website undangan digital elegan.",
};

export default function AboutUsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f8]">
      <Navbar />
      <main className="flex-1 pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100 text-[#914853] text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Kisah Di Balik Satu Cerita</span>
            </div>
            <h1 className="font-serif-luxury text-4xl sm:text-5xl font-bold text-[#5c2a33] tracking-tight">
              Merajut Cerita Bahagia ke Dalam Format Digital yang Abadi
            </h1>
            <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">
              Kami percaya setiap cinta punya narasi unik yang layak dikisahkan secara berkelas, praktis, dan ramah lingkungan.
            </p>
          </div>

          {/* Story Card */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-pink-100/80 mb-16 space-y-6 text-gray-700 leading-relaxed">
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#5c2a33]">
              Awal Mula Perjalanan
            </h2>
            <p>
              Berangkat dari pengalaman pribadi menyaksikan repotnya calon pengantin mencetak ribuan lembar kertas undangan yang sering kali salah eja, butuh biaya puluhan juta, dan memakan waktu berminggu-minggu dalam pendistribusian, <b>Satu Cerita</b> hadir sebagai solusi modern.
            </p>
            <p>
              Dengan memadukan keanggunan estetika visual lokal nusantara dan teknologi web mutakhir, kami menghadirkan platform pembuatan website undangan pernikahan yang siap dalam waktu kurang dari 10 menit.
            </p>
            <p>
              Hingga hari ini, ribuan pasangan di seluruh Indonesia telah mempercayakan pengumuman momen sakral mereka kepada Satu Cerita. Mulai dari pesta pernikahan adat Jawa, Minang, Sunda, Batak, hingga resepsi modern minimalist dan garden party romantis.
            </p>
          </div>

          {/* Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-7 rounded-3xl border border-pink-100 shadow-sm text-center">
              <div className="w-12 h-12 rounded-2xl bg-pink-100 text-[#914853] flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-serif-luxury text-xl font-bold text-[#5c2a33] mb-2">
                Penuh Makna
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Setiap detail visual, warna, dan alunan musik dirancang agar mampu menyampaikan ketulusan hati kedua mempelai kepada para tamu.
              </p>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-pink-100 shadow-sm text-center">
              <div className="w-12 h-12 rounded-2xl bg-pink-100 text-[#914853] flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-serif-luxury text-xl font-bold text-[#5c2a33] mb-2">
                Teknologi Andal
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Performa website secepat kilat (LCP &lt; 2 detik) dan integrasi auto-blast WhatsApp serta QR Scanner yang memudahkan panitia acara.
              </p>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-pink-100 shadow-sm text-center">
              <div className="w-12 h-12 rounded-2xl bg-pink-100 text-[#914853] flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-serif-luxury text-xl font-bold text-[#5c2a33] mb-2">
                Dukungan Penuh
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Tim customer support kami selalu siaga mendampingi Anda hingga hari H berlangsung dengan lancar dan berkesan.
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
