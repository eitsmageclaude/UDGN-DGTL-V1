"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  Sparkles,
  AlertCircle,
  Loader2,
  CheckCircle2,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          password,
          website: honeypot,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Gagal membuat akun");
      } else {
        router.push("/dashboard/invitation");
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
            Mulai Cerita Pernikahan Impianmu
          </h2>
          <p className="text-sm sm:text-base text-pink-100/80 max-w-md font-light leading-relaxed">
            Daftar dalam 1 menit dan dapatkan akses langsung untuk merancang website undangan pernikahan dengan tema eksklusif.
          </p>
        </div>

        {/* Benefits list */}
        <div className="relative z-10 my-8 space-y-3 text-xs sm:text-sm text-pink-100">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Gratis coba semua tema tanpa bayar di awal</span>
          </div>
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Live preview seketika di desktop dan smartphone</span>
          </div>
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Simpan draf dan bagikan saat sudah siap</span>
          </div>
        </div>

        <div className="relative z-10 text-white/40 text-xs tracking-wider uppercase hidden md:block">
          © 2026 Satu Cerita Digital
        </div>
      </aside>

      {/* RIGHT / REGISTER FORM */}
      <section className="flex-1 flex items-center justify-center p-6 sm:p-12 lg:p-20">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-pink-100">
          <div className="text-center mb-8">
            <h1 className="font-serif-luxury text-3xl font-bold text-[#5c2a33] mb-2">
              Daftar Akun Baru
            </h1>
            <p className="text-sm text-gray-500">
              Isi data diri singkat untuk mulai membuat undangan.
            </p>
            <div className="w-12 h-1 bg-[#914853] mx-auto rounded-full mt-3" />
          </div>

          {errorMsg && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 shrink-0 text-rose-600 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Honeypot */}
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              style={{ display: "none" }}
              tabIndex={-1}
              autoComplete="off"
            />

            {/* Nama Lengkap */}
            <div>
              <label className="block text-xs font-bold uppercase text-gray-600 mb-1.5">
                Nama Lengkap
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Ananda Pratama"
                  className="w-full pl-11 pr-4 py-3.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[#914853] bg-gray-50/70 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold uppercase text-gray-600 mb-1.5">
                Alamat Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="w-full pl-11 pr-4 py-3.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[#914853] bg-gray-50/70 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* WhatsApp */}
            <div>
              <label className="block text-xs font-bold uppercase text-gray-600 mb-1.5">
                Nomor WhatsApp
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="081234567890"
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
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimal 6 karakter"
                  className="w-full pl-11 pr-11 py-3.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[#914853] bg-gray-50/70 focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-rosegold w-full py-4 rounded-xl text-sm font-bold shadow-lg shadow-[#914853]/25 flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Membuat Akun...</span>
                </>
              ) : (
                <span>Daftar & Lanjut Buat Undangan</span>
              )}
            </button>

            <p className="text-center text-xs text-gray-600 pt-6">
              Sudah memiliki akun?{" "}
              <Link
                href="/login"
                className="font-bold text-[#5c2a33] hover:underline"
              >
                Masuk di Sini
              </Link>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}
