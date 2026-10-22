"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Eye, ArrowRight, CheckCircle2, Shield, Heart } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-[#fdf2f4] via-[#faf5f6] to-[#faf8f8]">
      {/* Decorative Botanical Vectors from original design */}
      <div
        aria-hidden="true"
        className="absolute -top-24 -left-24 w-96 h-96 opacity-20 pointer-events-none text-[#d8a3ac] animate-pulse"
      >
        <svg viewBox="0 0 200 200" fill="currentColor" className="w-full h-full">
          <path
            d="M100 10 C60 40, 30 90, 40 140 C55 180, 100 190, 100 190 C100 190, 145 180, 160 140 C170 90, 140 40, 100 10 Z"
            opacity="0.9"
          />
          <path
            d="M100 40 C75 60, 55 95, 62 130 C70 155, 100 165, 100 165 C100 165, 130 155, 138 130 C145 95, 125 60, 100 40 Z"
            opacity="0.55"
          />
        </svg>
      </div>

      <div
        aria-hidden="true"
        className="absolute top-1/2 -right-24 w-80 h-80 opacity-15 pointer-events-none text-[#914853] animate-pulse"
      >
        <svg viewBox="0 0 200 200" fill="currentColor" className="w-full h-full rotate-45">
          <path d="M100 10 C60 40, 30 90, 40 140 C55 180, 100 190, 100 190 C100 190, 145 180, 160 140 C170 90, 140 40, 100 10 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-pink-200/80 shadow-sm text-xs font-semibold text-[#914853]">
              <Sparkles className="w-3.5 h-3.5 text-pink-500" />
              <span>Platform Undangan Digital #1 di Indonesia</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#5c2a33] tracking-tight leading-[1.15]">
              Undangan Digital Elegan untuk Setiap{" "}
              <span className="italic text-[#914853] relative inline-block">
                Kisah Indahmu
                <span className="absolute -bottom-1 left-0 right-0 h-2 bg-pink-200/60 -z-10 rounded-full" />
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Rancang website undangan pernikahan impian dalam hitungan menit. Dilengkapi fitur <b>Auto WhatsApp Blast</b>, <b>Wedding Planner</b> lengkap, <b>Buku Tamu & RSVP</b>, dan <b>Guest on Screen</b> hari H.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/register"
                className="btn-rosegold sheen-overlay w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-bold flex items-center justify-center gap-3 shadow-xl"
              >
                <span>Buat Undangan Sekarang</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                href="/i/ananda-bella"
                target="_blank"
                className="btn-rosegold-outline w-full sm:w-auto px-6 py-4 rounded-2xl text-base font-semibold flex items-center justify-center gap-2 bg-white/80 backdrop-blur-sm"
              >
                <Eye className="w-5 h-5 text-[#914853]" />
                <span>Lihat Contoh Live</span>
              </Link>
            </div>

            {/* Trust points */}
            <div className="pt-6 border-t border-pink-200/50 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Aktif Instan Tanpa Menunggu</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>160+ Desain Mewah & Eksklusif</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Bebas Coba Gratis Dulu</span>
              </div>
            </div>
          </div>

          {/* Right Mockup Column */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Phone Mockup Floating Frame */}
            <div className="relative w-72 sm:w-80 rounded-[44px] p-3 bg-gradient-to-b from-[#7a3a44] via-[#5c2a33] to-[#2d1419] shadow-2xl shadow-[#914853]/40 border-4 border-[#d8a3ac]/40 animate-float">
              {/* Speaker Notch */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-4 bg-black/60 rounded-full z-30" />

              {/* Phone Screen */}
              <div className="relative w-full aspect-[9/18] bg-white rounded-[36px] overflow-hidden flex flex-col">
                <div className="relative h-full w-full">
                  <img
                    src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
                    alt="Demo Invitation Preview"
                    className="w-full h-full object-cover"
                  />
                  {/* Luxury Overlay on Mockup */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40 flex flex-col justify-end p-6 text-white text-center">
                    <span className="text-[11px] uppercase tracking-widest text-pink-200 font-semibold mb-1">
                      The Wedding of
                    </span>
                    <h3 className="font-serif-luxury text-2xl font-bold text-white mb-2 leading-tight">
                      Ananda & Bella
                    </h3>
                    <p className="text-xs text-white/80 font-light mb-4">
                      Sabtu, 08 November 2026
                    </p>

                    <Link
                      href="/i/ananda-bella"
                      target="_blank"
                      className="btn-rosegold py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Buka Undangan Demo</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Floating Badge on mockup side */}
              <div className="absolute -bottom-4 -left-6 bg-white/95 backdrop-blur-md py-2.5 px-4 rounded-2xl shadow-xl border border-pink-100 flex items-center gap-3 animate-breathe">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 font-medium">
                    RSVP Kehadiran
                  </div>
                  <div className="text-xs font-bold text-gray-800">
                    98.4% Tamu Mengonfirmasi
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
