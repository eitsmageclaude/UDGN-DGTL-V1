"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Sparkles, ArrowRight, ShieldCheck, HeartHandshake } from "lucide-react";

export interface PackageItem {
  id: string;
  name: string;
  slug: string;
  originalPrice: number;
  price: number;
  activeDays: number;
  maxPhotos: number;
  maxBlast: number;
  maxEvents: number;
  isPopular: boolean;
  isUnlimited: boolean;
  category: string;
  features: string[];
}

interface PricingSectionProps {
  packages: PackageItem[];
}

export default function PricingSection({ packages }: PricingSectionProps) {
  const [activeTab, setActiveTab] = useState<"website" | "events">("website");

  const websitePackages = packages.filter((p) => p.category === "wedding");
  const otherPackages = packages.filter((p) => p.category !== "wedding");

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const currentList = activeTab === "website" ? websitePackages : otherPackages;

  return (
    <section id="harga" className="py-24 bg-white relative overflow-hidden">
      {/* Background Decorative Blur */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-pink-100/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-48 w-96 h-96 bg-rose-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-[#914853] text-xs font-semibold uppercase tracking-wider mb-3">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Investasi Terbaik Untuk Momen Spesial</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#5c2a33] tracking-tight">
            Pilihan Paket & Harga Transparan
          </h2>
          <p className="mt-3 text-base text-gray-600">
            Bayar satu kali tanpa biaya tersembunyi. Aktif otomatis dalam hitungan detik setelah pembayaran.
          </p>

          {/* Pricing Tabs Switcher */}
          <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-gray-100/80 border border-gray-200 shadow-inner">
            <button
              type="button"
              onClick={() => setActiveTab("website")}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === "website"
                  ? "bg-[#914853] text-white shadow-md shadow-[#914853]/25"
                  : "text-gray-600 hover:text-[#914853]"
              }`}
            >
              Paket Undangan Pernikahan
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("events")}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === "events"
                  ? "bg-[#914853] text-white shadow-md shadow-[#914853]/25"
                  : "text-gray-600 hover:text-[#914853]"
              }`}
            >
              Paket Event Lainnya
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {currentList.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 ${
                pkg.isPopular
                  ? "bg-gradient-to-b from-[#fdf2f4] via-white to-[#faf5f6] border-2 border-[#914853] shadow-xl hover:-translate-y-2"
                  : "bg-white border border-gray-200/80 shadow-sm hover:shadow-lg hover:border-pink-200"
              }`}
            >
              {pkg.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#914853] to-[#7a3a44] text-white text-[11px] font-extrabold uppercase tracking-widest px-4 py-1 rounded-full shadow-md flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-pink-200" />
                  <span>Paling Diminati</span>
                </div>
              )}

              <div>
                {/* Package Title & Active period */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif-luxury text-2xl font-bold text-[#5c2a33]">
                    {pkg.name}
                  </h3>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-pink-50 text-[#914853] border border-pink-100">
                    {pkg.activeDays >= 9999
                      ? "Selamanya"
                      : `${pkg.activeDays} Hari`}
                  </span>
                </div>

                {/* Price Display */}
                <div className="mb-6 pb-6 border-b border-gray-100">
                  {pkg.originalPrice > 0 && (
                    <div className="text-xs text-gray-400 line-through mb-1">
                      {formatRupiah(pkg.originalPrice)}
                    </div>
                  )}
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-extrabold text-[#5c2a33] tracking-tight">
                      {pkg.price === 0 ? "Gratis" : formatRupiah(pkg.price)}
                    </span>
                    {pkg.price > 0 && (
                      <span className="text-xs text-gray-500 font-medium">
                        / sekali bayar
                      </span>
                    )}
                  </div>
                </div>

                {/* Key Quota Badges */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  <div className="bg-gray-50 rounded-xl p-2.5 text-center border border-gray-100">
                    <span className="block text-[11px] text-gray-500">
                      WA Blast Tamu
                    </span>
                    <span className="text-sm font-bold text-[#5c2a33]">
                      {pkg.maxBlast} Tamu
                    </span>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-2.5 text-center border border-gray-100">
                    <span className="block text-[11px] text-gray-500">
                      Galeri Foto
                    </span>
                    <span className="text-sm font-bold text-[#5c2a33]">
                      {pkg.maxPhotos >= 999 ? "Unlimited" : `${pkg.maxPhotos} Foto`}
                    </span>
                  </div>
                </div>

                {/* Feature List */}
                <ul className="space-y-3 mb-8">
                  {Array.isArray(pkg.features) &&
                    pkg.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-gray-600">
                        <div className="w-5 h-5 rounded-full bg-pink-100 flex items-center justify-center shrink-0 mt-0.5 text-[#914853]">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                </ul>
              </div>

              {/* Action Button */}
              <Link
                href={`/register?package=${pkg.slug}`}
                className={`w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
                  pkg.isPopular
                    ? "btn-rosegold shadow-md shadow-[#914853]/25"
                    : "btn-rosegold-outline"
                }`}
              >
                <span>{pkg.price === 0 ? "Coba Gratis" : "Pilih Paket Ini"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        {/* Security & Guarantee Note */}
        <div className="mt-16 bg-[#faf5f6] rounded-2xl p-6 border border-[#914853]/10 max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="w-12 h-12 rounded-xl bg-[#914853] text-white flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#5c2a33]">
              Garansi Kepuasan & Aktivasi Instan
            </h4>
            <p className="text-xs text-gray-600 mt-0.5">
              Pembayaran otomatis melalui QRIS, Virtual Account (BCA, Mandiri, BRI, BNI), dan E-Wallet. Undangan langsung aktif tanpa perlu konfirmasi manual.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
