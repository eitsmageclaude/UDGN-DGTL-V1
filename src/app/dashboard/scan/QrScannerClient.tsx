"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import {
  QrCode,
  CheckCircle2,
  AlertCircle,
  Search,
  Check,
  UserCheck,
  Sparkles,
  Camera,
} from "lucide-react";

interface Props {
  invitationSlug: string;
  guests: any[];
}

export default function QrScannerClient({ invitationSlug, guests: initialGuests }: Props) {
  const [guests, setGuests] = useState(initialGuests);
  const [manualCode, setManualCode] = useState("");
  const [searchGuest, setSearchGuest] = useState("");
  const [lastCheckIn, setLastCheckIn] = useState<any | null>(null);
  const [statusMsg, setStatusMsg] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCheckIn = async (slugOrId: string) => {
    setLoading(true);
    setStatusMsg(null);

    try {
      const res = await fetch(`/api/invitation/${invitationSlug}/checkin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          qrData: slugOrId.startsWith("GUEST:") ? slugOrId : undefined,
          guestSlug: !slugOrId.startsWith("GUEST:") ? slugOrId : undefined,
          guestId: slugOrId.length > 20 ? slugOrId : undefined,
        }),
      });

      const data = await res.json();
      if (res.ok && data.guest) {
        setLastCheckIn(data.guest);
        setStatusMsg({
          type: "success",
          text: `Check-in Berhasil: ${data.guest.name}`,
        });

        // Update list
        setGuests((prev) =>
          prev.map((g) => (g.id === data.guest.id ? { ...g, checkedIn: true } : g))
        );

        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
        });
      } else {
        setStatusMsg({
          type: "error",
          text: data.error || "Tamu tidak ditemukan",
        });
      }
    } catch (err) {
      setStatusMsg({ type: "error", text: "Terjadi gangguan koneksi" });
    } finally {
      setLoading(false);
      setManualCode("");
    }
  };

  const filteredGuests = guests.filter((g) =>
    g.name.toLowerCase().includes(searchGuest.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-pink-100 shadow-sm text-center max-w-xl mx-auto">
        <div className="w-14 h-14 rounded-2xl bg-pink-100 text-[#914853] flex items-center justify-center mx-auto mb-4">
          <QrCode className="w-7 h-7" />
        </div>
        <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#5c2a33]">
          QR Scanner Tamu Resepsi
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Arahkan barcode / QR pass tamu dari kamera atau verifikasi cepat nama tamu di bawah ini.
        </p>
      </div>

      {/* Status Alert */}
      {statusMsg && (
        <div
          className={`p-5 rounded-2xl border text-sm font-semibold flex items-center justify-center gap-3 animate-fade-in ${
            statusMsg.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-rose-50 border-rose-200 text-rose-800"
          }`}
        >
          {statusMsg.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          )}
          <span>{statusMsg.text}</span>
        </div>
      )}

      {/* Scanner Visual Frame & Quick Input */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Scanner Simulation Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-pink-100 shadow-sm space-y-6 text-center">
          <h3 className="font-bold text-sm text-[#5c2a33] uppercase tracking-wider">
            Kamera Pemindai QR
          </h3>

          <div className="relative aspect-square max-w-xs mx-auto rounded-3xl bg-gray-900 border-4 border-[#914853] overflow-hidden flex flex-col items-center justify-center text-white p-6 shadow-inner">
            <Camera className="w-12 h-12 text-pink-300 mb-3 animate-pulse" />
            <span className="text-xs font-semibold text-pink-200">
              Sensor Kamera Siap
            </span>
            <span className="text-[10px] text-gray-400 mt-1">
              Dekatkan QR Code Tamu ke kamera
            </span>

            {/* Scanning line animation */}
            <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-pink-400 to-transparent animate-breathe" />
          </div>

          {/* Manual Input for QR Code string */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (manualCode) handleCheckIn(manualCode);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={manualCode}
              onChange={(e) => setManualCode(e.target.value)}
              placeholder="Input ID Tamu atau Kode QR..."
              className="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[#914853]"
            />
            <button
              type="submit"
              disabled={loading || !manualCode}
              className="btn-rosegold px-4 py-2.5 rounded-xl text-xs font-bold shrink-0 disabled:opacity-50"
            >
              Check-In
            </button>
          </form>
        </div>

        {/* Quick Guest List for Reception Desk Search */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-pink-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-[#5c2a33] uppercase tracking-wider">
              Daftar Tamu Hari H
            </h3>
            <span className="text-xs text-gray-500 font-semibold">
              {guests.filter((g) => g.checkedIn).length} / {guests.length} Hadir
            </span>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari nama tamu..."
              value={searchGuest}
              onChange={(e) => setSearchGuest(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#914853]"
            />
          </div>

          <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
            {filteredGuests.map((g) => (
              <div
                key={g.id}
                className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between text-xs"
              >
                <div>
                  <h4 className="font-bold text-gray-800">{g.name}</h4>
                  <span className="text-[10px] text-gray-400">
                    {g.category || "VIP"} • {g.pax || 1} Pax
                  </span>
                </div>

                {g.checkedIn ? (
                  <span className="px-3 py-1.5 rounded-xl bg-purple-100 text-purple-800 font-bold text-[11px] flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>Sudah Hadir</span>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleCheckIn(g.slug)}
                    className="btn-rosegold px-3 py-1.5 rounded-xl font-bold text-[11px] flex items-center gap-1"
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Tandai Hadir</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
