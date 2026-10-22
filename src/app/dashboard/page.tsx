import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  Eye,
  Users,
  CheckCircle2,
  MessageSquare,
  Sparkles,
  ExternalLink,
  Copy,
  Calendar,
  Clock,
  Tv,
  QrCode,
  Send,
} from "lucide-react";
import DashboardQuickActions from "./DashboardQuickActions";

export const metadata = {
  title: "Dasbor Pengguna - Satu Cerita",
};

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  // Query first invitation (or demo invitation)
  const invitation = await prisma.invitation.findFirst({
    where: { slug: "ananda-bella" },
    include: {
      package: true,
      theme: true,
      guests: true,
      messages: { orderBy: { createdAt: "desc" }, take: 5 },
      events: true,
    },
  });

  const totalGuests = invitation?.guests.length || 0;
  const attendingGuests =
    invitation?.guests.filter((g) => g.isAttending === "HADIR").length || 0;
  const totalMessages = invitation?.messages.length || 0;
  const viewsCount = invitation?.viewsCount || 0;

  const daysLeft = invitation?.activeUntil
    ? Math.max(
        0,
        Math.ceil(
          (new Date(invitation.activeUntil).getTime() - new Date().getTime()) /
            (1000 * 60 * 60 * 24)
        )
      )
    : 30;

  const publicUrl = invitation
    ? `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/i/${invitation.slug}`
    : "http://localhost:3000/i/ananda-bella";

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#5c2a33] via-[#7a3a44] to-[#914853] rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-pink-200 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Paket {invitation?.package.name || "Gold"} Aktif</span>
          </div>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold">
            Selamat Datang, {invitation?.groomShortName || "Ananda"} &{" "}
            {invitation?.brideShortName || "Bella"}!
          </h1>
          <p className="text-xs sm:text-sm text-pink-100/90 max-w-xl">
            Undangan digital Anda aktif dan siap disebarkan ke seluruh tamu undangan. Pantau konfirmasi kehadiran dan kirim WhatsApp blast dari sini.
          </p>
        </div>

        <div className="relative z-10 shrink-0 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-center">
          <span className="block text-[11px] text-pink-200 uppercase tracking-wider font-semibold">
            Masa Aktif
          </span>
          <span className="text-2xl font-black text-white">{daysLeft} Hari</span>
          <span className="block text-[10px] text-pink-200/80 mt-0.5">
            Tersisa untuk acara
          </span>
        </div>
      </div>

      {/* Invitation URL Bar & Quick Share */}
      <DashboardQuickActions publicUrl={publicUrl} slug={invitation?.slug || "ananda-bella"} />

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white rounded-2xl p-5 border border-pink-100 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">
              Total Dilihat
            </span>
            <div className="w-8 h-8 rounded-lg bg-pink-50 text-[#914853] flex items-center justify-center">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#5c2a33]">
            {viewsCount}
          </div>
          <span className="text-[11px] text-gray-500 block">Kunjungan undangan</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-pink-100 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">
              Daftar Tamu
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#5c2a33]">
            {totalGuests}
          </div>
          <span className="text-[11px] text-gray-500 block">Tamu terdaftar</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-pink-100 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">
              Konfirmasi Hadir
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700">
            {attendingGuests}
          </div>
          <span className="text-[11px] text-gray-500 block">
            RSVP telah konfirmasi
          </span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-pink-100 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">
              Buku Doa Tamu
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[#5c2a33]">
            {totalMessages}
          </div>
          <span className="text-[11px] text-gray-500 block">Untaian doa restu</span>
        </div>
      </div>

      {/* Main Grid: Features Shortcuts & Recent Messages */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Event Reception Hub */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-pink-100 shadow-sm">
            <h3 className="font-serif-luxury text-xl font-bold text-[#5c2a33] mb-4">
              Operasional Acara & Resepsi
            </h3>

            <div className="space-y-3">
              <Link
                href="/dashboard/scan"
                className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-pink-50 border border-gray-100 transition-colors group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-pink-100 text-[#914853] flex items-center justify-center">
                    <QrCode className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-800 group-hover:text-[#914853]">
                      QR Scanner Tamu
                    </h4>
                    <p className="text-xs text-gray-500">
                      Buka scanner kamera untuk panitia meja resepsi
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#914853]">Buka</span>
              </Link>

              <Link
                href={`/screen/${invitation?.slug || "ananda-bella"}`}
                target="_blank"
                className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-pink-50 border border-gray-100 transition-colors group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                    <Tv className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-800 group-hover:text-purple-700">
                      Layar Sambutan (Guest on Screen)
                    </h4>
                    <p className="text-xs text-gray-500">
                      Buka di laptop/proyektor ballroom saat acara berlangsung
                    </p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-purple-700" />
              </Link>

              <Link
                href="/dashboard/blast"
                className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-pink-50 border border-gray-100 transition-colors group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Send className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-800 group-hover:text-emerald-700">
                      Kirim Auto WA Blast
                    </h4>
                    <p className="text-xs text-gray-500">
                      Kirim pesan personalisasi ke tamu undangan
                    </p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-emerald-700">Kirim</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Latest Guestbook Messages */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-7 border border-pink-100 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif-luxury text-xl font-bold text-[#5c2a33]">
                Doa & Ucapan Tamu Terbaru
              </h3>
              <Link
                href="/dashboard/guests"
                className="text-xs font-bold text-[#914853] hover:underline"
              >
                Lihat Semua
              </Link>
            </div>

            <div className="space-y-3">
              {invitation?.messages && invitation.messages.length > 0 ? (
                invitation.messages.map((msg, i) => (
                  <div
                    key={msg.id || i}
                    className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#5c2a33]">
                        {msg.name}
                      </span>
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                          msg.attendance === "HADIR"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-rose-100 text-rose-700"
                        }`}
                      >
                        {msg.attendance === "HADIR" ? "Hadir" : "Berhalangan"}
                      </span>
                    </div>
                    <p className="text-gray-600 line-clamp-2">{msg.message}</p>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-gray-400 text-xs">
                  Belum ada pesan doa dari tamu.
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 mt-4 flex items-center justify-between text-xs text-gray-500">
            <span>Tema aktif: <b>{invitation?.theme.name}</b></span>
            <Link
              href="/dashboard/invitation"
              className="text-[#914853] font-bold hover:underline"
            >
              Ganti Pengaturan
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
