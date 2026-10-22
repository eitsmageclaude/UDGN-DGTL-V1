"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Sparkles, Users, Clock, Maximize, CheckCircle2 } from "lucide-react";

interface GuestOnScreenClientProps {
  invitation: {
    id: string;
    slug: string;
    title: string;
    groomName: string;
    brideName: string;
    coverImage: string | null;
  };
  initialGuests: any[];
}

export default function GuestOnScreenClient({
  invitation,
  initialGuests,
}: GuestOnScreenClientProps) {
  const [guests, setGuests] = useState(initialGuests);
  const [latestGuest, setLatestGuest] = useState(
    initialGuests.length > 0 ? initialGuests[0] : null
  );
  const [currentTime, setCurrentTime] = useState("");

  // Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Poll for newly checked-in guests every 3 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/invitation/${invitation.slug}/checkin`);
        if (res.ok) {
          const data = await res.json();
          if (data.guests && data.guests.length > 0) {
            const first = data.guests[0];
            // If new guest checked in, trigger confetti and spotlight
            if (!latestGuest || first.id !== latestGuest.id) {
              setLatestGuest(first);
              confetti({
                particleCount: 80,
                spread: 100,
                origin: { y: 0.6 },
              });
            }
            setGuests(data.guests);
          }
        }
      } catch (err) {
        // silent polling catch
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [invitation.slug, latestGuest]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="fixed inset-0 bg-[#1e0d12] text-white flex flex-col justify-between p-8 sm:p-12 overflow-hidden select-none">
      {/* Background Image / Blur */}
      {invitation.coverImage && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25 filter blur-sm scale-105"
          style={{ backgroundImage: `url(${invitation.coverImage})` }}
        />
      )}

      {/* Top Header Bar */}
      <header className="relative z-10 flex items-center justify-between border-b border-white/15 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#914853] to-[#d8a3ac] flex items-center justify-center text-white shadow-lg">
            <Sparkles className="w-6 h-6 text-pink-200" />
          </div>
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-pink-300 font-semibold block">
              Selamat Datang Di Pernikahan
            </span>
            <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold tracking-tight text-white">
              {invitation.groomName} & {invitation.brideName}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <div className="font-mono text-2xl font-bold text-pink-200">
              {currentTime}
            </div>
            <span className="text-[11px] text-white/60 tracking-wider uppercase">
              Waktu Resepsi
            </span>
          </div>

          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/15"
            title="Layar Penuh"
          >
            <Maximize className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Spotlight: Welcome Screen */}
      <main className="relative z-10 my-auto py-8 text-center max-w-4xl mx-auto space-y-8 animate-fade-in">
        {latestGuest ? (
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-pink-500/20 text-pink-200 border border-pink-500/30 text-sm font-semibold tracking-wider uppercase shadow-xl animate-breathe">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Tamu Telah Melakukan Check-In</span>
            </div>

            <div className="space-y-3">
              <p className="text-sm sm:text-base text-pink-100 font-light tracking-widest uppercase">
                Selamat Datang Bapak / Ibu / Saudara/i
              </p>
              <h2 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight drop-shadow-2xl">
                {latestGuest.name}
              </h2>
            </div>

            <div className="flex items-center justify-center gap-3 text-xs sm:text-sm text-pink-200/80">
              <span className="px-3 py-1 rounded-lg bg-white/10 border border-white/20 font-semibold">
                Kategori: {latestGuest.category || "VIP"}
              </span>
              <span className="px-3 py-1 rounded-lg bg-white/10 border border-white/20 font-semibold">
                Pax: {latestGuest.pax || 1} Orang
              </span>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="font-serif-luxury text-4xl sm:text-6xl font-bold text-white">
              Selamat Datang Para Tamu Undangan
            </h2>
            <p className="text-base text-pink-200/80 max-w-lg mx-auto">
              Silakan lakukan check-in di meja registrasi penerima tamu untuk menampilkan kehadiran Anda di layar ini.
            </p>
          </div>
        )}
      </main>

      {/* Bottom Ticker: Recent Check-ins */}
      <footer className="relative z-10 border-t border-white/15 pt-6">
        <div className="flex items-center justify-between mb-3 text-xs text-pink-300 font-semibold uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <Users className="w-4 h-4" />
            <span>Tamu Hadir Baru-baru Ini</span>
          </span>
          <span>{guests.length} Tamu Terkonfirmasi</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {guests.slice(0, 5).map((g: any, i: number) => (
            <div
              key={g.id || i}
              className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-between"
            >
              <span className="text-xs font-bold text-white truncate max-w-[120px]">
                {g.name}
              </span>
              <span className="text-[10px] text-pink-300 bg-pink-900/40 px-1.5 py-0.5 rounded font-mono">
                {g.checkedInAt
                  ? new Date(g.checkedInAt).toLocaleTimeString("id-ID", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "Hadir"}
              </span>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
}
