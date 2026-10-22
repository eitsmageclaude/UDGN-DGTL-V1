"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Sparkles, CheckCircle2, Clock, Loader2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || cooldown > 0) return;

    setLoading(true);
    // Simulate sending neutral secure password reset email
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      setCooldown(60); // 60s cooldown per PRD AU-3
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#faf5f6]">
      <div className="absolute top-6 left-6 z-50">
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-[#5c2a33] text-xs font-bold shadow-sm backdrop-blur-md hover:-translate-x-1 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Login</span>
        </Link>
      </div>

      <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-pink-100 text-center">
        <div className="w-12 h-12 rounded-2xl bg-pink-100 text-[#914853] flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-6 h-6" />
        </div>

        <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#5c2a33] mb-2">
          Lupa Kata Sandi
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mb-6">
          Masukkan alamat email Anda untuk menerima instruksi pemulihan kata sandi.
        </p>

        {submitted ? (
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm text-left space-y-3 mb-6">
            <div className="flex items-center gap-2 font-bold text-emerald-900">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Tautan Pemulihan Terkirim</span>
            </div>
            <p className="text-xs text-emerald-700 leading-relaxed">
              Jika alamat email <b>{email}</b> terdaftar dalam sistem kami, tautan untuk mengatur ulang kata sandi telah dikirimkan ke kotak masuk Anda.
            </p>
            {cooldown > 0 && (
              <div className="text-[11px] text-emerald-600 flex items-center gap-1.5 pt-2 border-t border-emerald-100">
                <Clock className="w-3.5 h-3.5" />
                <span>Kirim ulang tersedia dalam {cooldown} detik</span>
              </div>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-600 mb-1.5">
                Alamat Email Terdaftar
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="w-full pl-11 pr-4 py-3.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[#914853] bg-gray-50/70 focus:bg-white"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || cooldown > 0}
              className="btn-rosegold w-full py-3.5 rounded-xl text-sm font-bold shadow-lg shadow-[#914853]/25 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Mengirim...</span>
                </>
              ) : cooldown > 0 ? (
                <span>Tunggu ({cooldown}s)</span>
              ) : (
                <span>Kirim Tautan Pemulihan</span>
              )}
            </button>
          </form>
        )}

        <div className="pt-6 border-t border-gray-100 text-xs text-gray-500">
          Ingat kata sandi Anda?{" "}
          <Link href="/login" className="font-bold text-[#914853] hover:underline">
            Masuk
          </Link>
        </div>
      </div>
    </div>
  );
}
