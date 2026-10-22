import React from "react";
import Link from "next/link";
import { Sparkles, Heart, ShieldCheck, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#2a1318] text-white/80 pt-16 pb-12 border-t border-[#914853]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#914853] to-[#d8a3ac] flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-serif-luxury text-2xl font-bold tracking-tight text-white">
                Satu Cerita
              </span>
            </Link>
            <p className="text-sm text-white/70 leading-relaxed">
              Platform undangan pernikahan digital nomor satu dengan 160+ tema eksklusif, Wedding Planner terpadu, WA Blast, dan check-in QR tamu.
            </p>
            <div className="flex items-center gap-2 text-xs text-pink-200/80 bg-white/5 py-2 px-3 rounded-lg border border-white/10 w-fit">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Privasi data tamu aman (Sesuai UU PDP)</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              Navigasi
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-pink-300 transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/#katalog" className="hover:text-pink-300 transition-colors">
                  Katalog Tema
                </Link>
              </li>
              <li>
                <Link href="/#harga" className="hover:text-pink-300 transition-colors">
                  Paket & Harga
                </Link>
              </li>
              <li>
                <Link href="/product" className="hover:text-pink-300 transition-colors">
                  Fitur Produk
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="hover:text-pink-300 transition-colors">
                  Tentang Kami
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Help */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              Bantuan & Ketentuan
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/faq" className="hover:text-pink-300 transition-colors">
                  Tanya Jawab (FAQ)
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-pink-300 transition-colors">
                  Kebijakan Privasi
                </Link>
              </li>
              <li>
                <Link href="/term-condition" className="hover:text-pink-300 transition-colors">
                  Syarat & Ketentuan
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-pink-300 transition-colors">
                  Portal Mitra / Reseller
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              Hubungi Kami
            </h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-pink-400" />
                <span>support@satucerita.com</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-pink-400" />
                <span>+62 812-3456-7890 (WhatsApp)</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-pink-400 mt-0.5 shrink-0" />
                <span>Jl. Senopati No. 88, Kebayoran Baru, Jakarta Selatan</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4">
          <p>© 2026 Satu Cerita Digital. Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="flex items-center gap-1 text-white/60">
            <span>Dirancang dengan</span>
            <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
            <span>untuk momen bahagiamu di Indonesia.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
