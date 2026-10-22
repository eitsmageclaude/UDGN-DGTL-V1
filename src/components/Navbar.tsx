"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sparkles, User, ChevronRight } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 12) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open (as requested in PRD LP-2)
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: "Beranda", href: "/" },
    { name: "Katalog Tema", href: "/#katalog" },
    { name: "Fitur & Harga", href: "/#harga" },
    { name: "Tentang Kami", href: "/about-us" },
    { name: "FAQ", href: "/faq" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "glass-nav py-3.5 shadow-sm"
            : "bg-white/40 backdrop-blur-md py-5 border-b border-white/20"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#914853] to-[#7a3a44] flex items-center justify-center text-white shadow-md shadow-[#914853]/20 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 text-pink-200" />
              </div>
              <div>
                <span className="font-serif-luxury text-xl font-bold tracking-tight text-[#5c2a33]">
                  Satu Cerita
                </span>
                <span className="block text-[10px] uppercase tracking-widest font-semibold text-[#914853]">
                  Digital Invitation
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-sm font-medium transition-colors hover:text-[#914853] ${
                      isActive ? "text-[#914853] font-semibold" : "text-gray-600"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-[#7a3a44] hover:text-[#914853] transition-colors"
              >
                Masuk
              </Link>
              <Link
                href="/register"
                className="btn-rosegold px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2"
              >
                <span>Mulai Buat</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex md:hidden items-center gap-2">
              <Link
                href="/login"
                className="p-2 text-[#7a3a44] rounded-lg bg-pink-50"
                aria-label="Login"
              >
                <User className="w-5 h-5" />
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gray-700 hover:text-[#914853] rounded-lg focus:outline-none"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden animate-fade-in">
          <div className="fixed top-0 right-0 bottom-0 w-3/4 max-w-sm bg-white shadow-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#914853] flex items-center justify-center text-white">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="font-serif-luxury font-bold text-lg text-[#5c2a33]">
                    Satu Cerita
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-gray-400 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-8 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-base font-medium text-gray-700 hover:text-[#914853] py-2 border-b border-gray-50 flex items-center justify-between"
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-6 border-t border-gray-100">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 text-center text-sm font-semibold text-[#7a3a44] border border-[#914853]/20 rounded-xl hover:bg-pink-50"
              >
                Masuk ke Akun
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-rosegold w-full py-3 text-center text-sm font-semibold rounded-xl"
              >
                Daftar & Buat Undangan
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
