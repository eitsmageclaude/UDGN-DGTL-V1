"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Smartphone,
  Monitor,
  ShoppingBag,
  Sparkles,
  ExternalLink,
  Eye,
  CheckCircle2,
  Users,
  Mail,
  Palette,
  HeartHandshake,
} from "lucide-react";
import PublicInvitationView from "@/components/invitation/PublicInvitationView";

interface ThemePreviewClientProps {
  theme: {
    id: string;
    name: string;
    slug: string;
    category: string;
    subCategory: string;
    previewImage: string;
    colorSwatches: string[];
    colorFamily: string;
    description: string;
    story: string;
    bestFor: string;
    invitationCount: number;
    guestCount: number;
    musicUrl: string;
    fontFamily: string;
  };
  demoData: any;
}

export default function ThemePreviewClient({
  theme,
  demoData,
}: ThemePreviewClientProps) {
  const [viewMode, setViewMode] = useState<"detail" | "fullscreen">("detail");
  const [deviceMode, setDeviceMode] = useState<"mobile" | "desktop">("mobile");

  const swatchLabels = ["Aksen", "Dasar", "Lembut", "Highlight"];

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF6F4] text-[#201F1F]">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#914853]/15 px-4 sm:px-6 py-3 text-[#201F1F] flex items-center justify-between shadow-sm">
        {/* Left: Back & Theme Name */}
        <div className="flex items-center gap-3">
          <Link
            href="/#katalog"
            className="p-2 rounded-xl bg-pink-50 hover:bg-pink-100 text-[#914853] transition-colors flex items-center gap-1.5 text-xs font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Katalog</span>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif-luxury font-bold text-sm sm:text-base text-[#5c2a33]">
                {theme.name}
              </h1>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-100 text-[#914853] font-bold uppercase tracking-wider">
                {theme.subCategory}
              </span>
            </div>
            {/* Color Swatches pill */}
            <div className="flex items-center gap-1.5 mt-0.5">
              {theme.colorSwatches.map((hex, i) => (
                <span
                  key={i}
                  className="w-2.5 h-2.5 rounded-full border border-black/10"
                  style={{ backgroundColor: hex }}
                  title={hex}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Center: View Mode Switcher */}
        <div className="flex items-center p-1 rounded-xl bg-gray-100 border border-gray-200">
          <button
            type="button"
            onClick={() => setViewMode("detail")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewMode === "detail"
                ? "bg-[#914853] text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <span>Detail Tema</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("fullscreen")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              viewMode === "fullscreen"
                ? "bg-[#914853] text-white shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Tampilan Penuh</span>
          </button>
        </div>

        {/* Right: CTA Button */}
        <div className="flex items-center gap-2">
          <Link
            href={`/i/${demoData?.slug || "ananda-bella"}`}
            target="_blank"
            className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors text-xs font-semibold hidden md:flex items-center gap-1"
            title="Buka di Tab Baru"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Tab Baru</span>
          </Link>
          <Link
            href={`/register?theme=${theme.slug}`}
            className="btn-rosegold py-2 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-md hover:scale-105 active:scale-95 transition-transform"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Gunakan Tema Ini</span>
          </Link>
        </div>
      </header>

      {/* VIEW MODE 1: DETAIL TEMA (MATCHING tamplate undngan.txt) */}
      {viewMode === "detail" ? (
        <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 sm:py-12">
          {/* Back breadcrumb */}
          <Link
            href="/#katalog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#914853] transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke katalog</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Phone Mockup Stage (Left on desktop, max width 320px) */}
            <div className="lg:col-span-5 flex justify-center sticky top-24">
              <div className="relative w-full max-w-[300px] aspect-[71.9/150] rounded-[44px] bg-gradient-to-br from-[#4a4a4e] via-[#1a1a1c] to-[#0c0c0e] p-[7px] shadow-2xl shadow-[#914853]/25 border border-white/20">
                {/* Physical buttons */}
                <span className="absolute -left-[4px] top-[16%] w-[4px] h-[22px] bg-gray-600 rounded-l" />
                <span className="absolute -left-[4px] top-[24%] w-[4px] h-[40px] bg-gray-600 rounded-l" />
                <span className="absolute -left-[4px] top-[34%] w-[4px] h-[40px] bg-gray-600 rounded-l" />
                <span className="absolute -right-[4px] top-[26%] w-[4px] h-[60px] bg-gray-600 rounded-r" />

                {/* Inner Screen */}
                <div className="relative w-full h-full rounded-[38px] overflow-hidden bg-white flex flex-col">
                  {/* Dynamic Island */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full z-30 pointer-events-none flex items-center justify-end px-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-950/80 border border-white/10" />
                  </div>

                  {/* Scrollable Invitation View */}
                  <div className="flex-1 overflow-y-auto scrollbar-none">
                    {demoData ? (
                      <PublicInvitationView
                        invitation={demoData}
                        guestName="Tamu Undangan Spesial"
                        isPreviewMode={true}
                      />
                    ) : (
                      <div className="p-8 text-center text-gray-400">
                        Memuat preview...
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Theme Copy & Information (Right on desktop) */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#914853]">
                  Detail Tema Undangan
                </p>
                <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#5c2a33] mt-1">
                  {theme.name}
                </h1>
                <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                  {theme.description}
                </p>
              </div>

              {/* Cerita Tema */}
              {theme.story && (
                <section className="bg-white rounded-2xl p-6 border border-[#914853]/10 shadow-sm">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-[#5c2a33] mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#914853]" />
                    <span>Cerita Tema</span>
                  </h2>
                  <p className="text-sm text-gray-700 leading-relaxed font-sans whitespace-pre-line">
                    {theme.story}
                  </p>
                </section>
              )}

              {/* Theme Stats */}
              <section className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl p-5 border border-[#914853]/10 shadow-sm">
                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    <Mail className="w-4 h-4 text-[#914853]" />
                    <span>Undangan</span>
                  </div>
                  <p className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#5c2a33] mt-2">
                    {theme.invitationCount}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    pasangan sudah memakai tema ini
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-[#914853]/10 shadow-sm">
                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    <Users className="w-4 h-4 text-[#914853]" />
                    <span>Tamu</span>
                  </div>
                  <p className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#5c2a33] mt-2">
                    {theme.guestCount.toLocaleString("id-ID")}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    tamu telah membuka undangan ini
                  </p>
                </div>
              </section>

              {/* Color Palette Breakdown */}
              <section className="bg-white rounded-2xl p-6 border border-[#914853]/10 shadow-sm">
                <h2 className="text-sm font-bold uppercase tracking-wider text-[#5c2a33] mb-4 flex items-center gap-1.5">
                  <Palette className="w-4 h-4 text-[#914853]" />
                  <span>Palet Warna Utama</span>
                </h2>
                <ul className="flex flex-wrap gap-4 sm:gap-6">
                  {theme.colorSwatches.map((hex, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span
                        className="w-10 h-10 rounded-full border border-black/10 shadow-inner flex-shrink-0"
                        style={{ backgroundColor: hex }}
                      />
                      <div className="text-xs">
                        <strong className="block text-gray-900 font-semibold">
                          {swatchLabels[i] || `Warna ${i + 1}`}
                        </strong>
                        <span className="font-mono text-gray-500 uppercase">
                          {hex}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>

                {theme.bestFor && (
                  <div className="mt-5 pt-4 border-t border-gray-100">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#914853] mb-1">
                      Kesesuaian Konsep:
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {theme.bestFor}
                    </p>
                  </div>
                )}
              </section>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setViewMode("fullscreen")}
                  className="px-6 py-3 rounded-full bg-white border border-[#914853]/30 text-[#914853] font-bold text-sm hover:bg-pink-50 transition-colors shadow-sm inline-flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>Lihat Demo Fullscreen</span>
                </button>
                <Link
                  href={`/register?theme=${theme.slug}`}
                  className="btn-rosegold px-8 py-3 rounded-full text-white font-bold text-sm shadow-lg hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Pilih Tema Ini</span>
                </Link>
              </div>
            </div>
          </div>
        </main>
      ) : (
        /* VIEW MODE 2: FULLSCREEN PREVIEW WITH MOBILE / DESKTOP SWITCHER */
        <main className="flex-1 flex flex-col bg-[#1e1316]">
          {/* Device bar */}
          <div className="flex items-center justify-center p-3 bg-black/40 border-b border-white/10 gap-2">
            <button
              type="button"
              onClick={() => setDeviceMode("mobile")}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                deviceMode === "mobile"
                  ? "bg-[#914853] text-white shadow-sm"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>Mobile Phone View</span>
            </button>
            <button
              type="button"
              onClick={() => setDeviceMode("desktop")}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                deviceMode === "desktop"
                  ? "bg-[#914853] text-white shadow-sm"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Monitor className="w-4 h-4" />
              <span>Desktop View</span>
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center p-0 sm:p-6 overflow-y-auto">
            <div
              className={`w-full transition-all duration-300 ${
                deviceMode === "mobile"
                  ? "max-w-md mx-auto my-0 sm:my-4 sm:rounded-[36px] sm:shadow-2xl sm:shadow-black/70 sm:border-8 sm:border-gray-900 overflow-hidden bg-white"
                  : "max-w-4xl mx-auto my-4 rounded-3xl shadow-2xl overflow-hidden bg-white"
              }`}
            >
              {demoData ? (
                <PublicInvitationView
                  invitation={demoData}
                  guestName="Tamu Undangan Spesial"
                  isPreviewMode={true}
                />
              ) : (
                <div className="p-12 text-center text-gray-500">
                  Data demo tema tidak tersedia.
                </div>
              )}
            </div>
          </div>
        </main>
      )}
    </div>
  );
}
