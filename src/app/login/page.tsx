"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sparkles,
  AlertCircle,
  Loader2,
  CheckCircle2,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [formTime] = useState(Math.floor(Date.now() / 1000));
  const [honeypot, setHoneypot] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
          website: honeypot,
          form_time: formTime,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Gagal masuk ke akun");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      setErrorMsg("Koneksi bermasalah. Silakan coba kembali.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#faf5f6]">
      {/* Back Button Floating */}
      <div className="absolute top-6 left-6 z-50">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/80 hover:bg-white text-[#5c2a33] text-xs font-bold shadow-sm backdrop-blur-md transition-all hover:-translate-x-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali</span>
        </Link>
      </div>

      {/* LEFT / HERO PANEL */}
      <aside className="relative md:w-5/12 lg:w-1/2 bg-gradient-to-br from-[#411b22] via-[#5c2a33] to-[#7a3a44] text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between overflow-hidden min-h-[280px] md:min-h-screen">
        {/* Background Texture & Decorative Botanicals */}
        <div
          aria-hidden="true"
          className="absolute -top-32 -left-32 w-96 h-96 opacity-15 pointer-events-none text-[#d8a3ac] animate-pulse"
        >
          <svg viewBox="0 0 200 200" fill="currentColor" className="w-full h-full">
            <path d="M100 10 C60 40, 30 90, 40 140 C55 180, 100 190, 100 190 C100 190, 145 180, 160 140 C170 90, 140 40, 100 10 Z" />
          </svg>
        </div>

        {/* Floating animated butterflies as from analysis */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[28%] left-[20%] animate-sway">
            <Sparkles className="w-6 h-6 text-pink-200/50 animate-butterfly" />
          </div>
          <div className="absolute bottom-[35%] right-[22%] animate-sway">
            <Sparkles className="w-5 h-5 text-pink-300/40 animate-butterfly" />
          </div>
        </div>

        {/* Brand Header */}
        <div className="relative z-10 pt-10 md:pt-0">
          <Link href="/" className="inline-flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
              <Sparkles className="w-5 h-5 text-pink-200" />
            </div>
            <span className="font-serif-luxury text-2xl font-bold text-white tracking-wide">
              Satu Cerita
            </span>
          </Link>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
            Undangan Digital untuk Setiap Cerita
          </h2>
          <p className="text-sm sm:text-base text-pink-100/80 max-w-md font-light leading-relaxed">
            Hadir merancang website undangan digital dengan tema eksklusif dan penuh makna. Masuk untuk mengelola undanganmu.
          </p>
        </div>

        {/* Demo Credentials Helper Box */}
        <div className="relative z-10 my-6 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-xs text-pink-100 space-y-1.5">
          <div className="font-bold flex items-center gap-1.5 text-white">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Akun Demo Cepat:</span>
          </div>
          <p>Email: <span className="font-mono text-white">ananda@satucerita.com</span> / Password: <span className="font-mono text-white">password123</span></p>
          <p>Admin: <span className="font-mono text-white">admin@satucerita.com</span> / Password: <span className="font-mono text-white">password123</span></p>
        </div>

        {/* Footer info */}
        <div className="relative z-10 text-white/40 text-xs tracking-wider uppercase hidden md:block">
          © 2026 Satu Cerita Digital
        </div>
      </aside>

      {/* RIGHT / FORM PANEL */}
      <section className="flex-1 flex items-center justify-center p-6 sm:p-12 lg:p-20">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-pink-100">
          <div className="text-center mb-8">
            <h1 className="font-serif-luxury text-3xl font-bold text-[#5c2a33] mb-2">
              Masuk ke Akun
            </h1>
            <p className="text-sm text-gray-500">
              Silakan masuk menggunakan WhatsApp atau Email Anda.
            </p>
            <div className="w-12 h-1 bg-[#914853] mx-auto rounded-full mt-3" />
          </div>

          {errorMsg && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 shrink-0 text-rose-600 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Honeypot hidden input */}
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              style={{ display: "none" }}
              tabIndex={-1}
              autoComplete="off"
            />

            {/* Username / WhatsApp / Email */}
            <div>
              <label className="block text-xs font-bold uppercase text-gray-600 mb-1.5">
                Nomor WhatsApp atau Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="0812xxxx atau email@domain.com"
                  className="w-full pl-11 pr-4 py-3.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[#914853] bg-gray-50/70 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold uppercase text-gray-600 mb-1.5">
                Kata Sandi
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan kata sandi"
                  className="w-full pl-11 pr-11 py-3.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[#914853] bg-gray-50/70 focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                  aria-label="Lihat password"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="inline-flex items-center gap-2 text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-[#914853] focus:ring-[#914853] border-gray-300 w-4 h-4"
                />
                <span>Ingat saya</span>
              </label>

              <Link
                href="/forgot-password"
                className="font-semibold text-[#914853] hover:underline"
              >
                Lupa password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-rosegold w-full py-4 rounded-xl text-sm font-bold shadow-lg shadow-[#914853]/25 flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Memverifikasi...</span>
                </>
              ) : (
                <span>Masuk Sekarang</span>
              )}
            </button>

            <p className="text-center text-xs text-gray-600 pt-6">
              Belum punya akun?{" "}
              <Link
                href="/register"
                className="font-bold text-[#5c2a33] hover:underline"
              >
                Daftar Gratis
              </Link>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}
