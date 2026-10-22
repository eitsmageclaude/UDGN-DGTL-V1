"use client";

import React, { useState } from "react";
import {
  Users,
  UserPlus,
  Search,
  CheckCircle2,
  XCircle,
  HelpCircle,
  QrCode,
  Share2,
  Copy,
  Check,
  Download,
  Trash2,
  Send,
} from "lucide-react";

interface Props {
  invitationSlug: string;
  initialGuests: any[];
  maxBlastQuota: number;
}

export default function GuestManagerClient({
  invitationSlug,
  initialGuests,
  maxBlastQuota,
}: Props) {
  const [guests, setGuests] = useState(initialGuests);
  const [search, setSearch] = useState("");
  const [filterAttendance, setFilterAttendance] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedQrGuest, setSelectedQrGuest] = useState<any | null>(null);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  // New Guest Form State
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newCategory, setNewCategory] = useState("Keluarga");
  const [newPax, setNewPax] = useState(2);
  const [loadingAdd, setLoadingAdd] = useState(false);

  // Stats
  const total = guests.length;
  const hadir = guests.filter((g) => g.isAttending === "HADIR").length;
  const berhalangan = guests.filter((g) => g.isAttending === "TIDAK_HADIR").length;
  const checkedInCount = guests.filter((g) => g.checkedIn).length;

  const handleAddGuest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;

    setLoadingAdd(true);
    try {
      const res = await fetch("/api/guests/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newName,
          phone: newPhone,
          category: newCategory,
          pax: newPax,
          invitationSlug,
        }),
      });

      const data = await res.json();
      if (res.ok && data.guest) {
        setGuests([data.guest, ...guests]);
        setNewName("");
        setNewPhone("");
        setShowAddModal(false);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAdd(false);
    }
  };

  const getGuestLink = (guest: any) => {
    return `${window.location.origin}/i/${invitationSlug}?to=${encodeURIComponent(
      guest.name
    )}&g=${guest.slug}`;
  };

  const handleCopyLink = (guest: any) => {
    const link = getGuestLink(guest);
    navigator.clipboard.writeText(link);
    setCopiedSlug(guest.id);
    setTimeout(() => setCopiedSlug(null), 3000);
  };

  const handleShareWhatsApp = (guest: any) => {
    const link = getGuestLink(guest);
    const text = encodeURIComponent(
      `Kepada Yth. *${guest.name}*,\n\nTanpa mengurangi rasa hormat, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk hadir dan memberikan doa restu di hari bahagia kami.\n\nDetail jadwal, lokasi acara, dan konfirmasi kehadiran dapat diakses melalui tautan berikut:\n${link}\n\nMerupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir.\n\nTerima kasih.`
    );
    const phone = guest.phone ? guest.phone.replace(/^0/, "62") : "";
    window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
  };

  const filtered = guests.filter((g) => {
    if (search && !g.name.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    if (filterAttendance !== "all" && g.isAttending !== filterAttendance) {
      return false;
    }
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-pink-100 shadow-sm">
        <div>
          <span className="text-xs uppercase font-bold text-[#914853] tracking-wider block">
            Manajemen Kehadiran
          </span>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#5c2a33]">
            Buku Tamu & Daftar Undangan
          </h1>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="btn-rosegold px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md"
        >
          <UserPlus className="w-4 h-4" />
          <span>Tambah Tamu Baru</span>
        </button>
      </div>

      {/* Stats Counter Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-pink-100 shadow-sm text-center">
          <span className="text-xs text-gray-500 font-medium">Total Tamu</span>
          <div className="text-2xl font-black text-[#5c2a33] mt-0.5">{total}</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-pink-100 shadow-sm text-center">
          <span className="text-xs text-emerald-600 font-medium">Pasti Hadir</span>
          <div className="text-2xl font-black text-emerald-700 mt-0.5">{hadir}</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-pink-100 shadow-sm text-center">
          <span className="text-xs text-rose-500 font-medium">Berhalangan</span>
          <div className="text-2xl font-black text-rose-600 mt-0.5">{berhalangan}</div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-pink-100 shadow-sm text-center">
          <span className="text-xs text-purple-600 font-medium">Sudah Check-in Venue</span>
          <div className="text-2xl font-black text-purple-700 mt-0.5">
            {checkedInCount} Tamu
          </div>
        </div>
      </div>

      {/* Filter and Table Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-pink-100 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Search bar */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari nama tamu..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#914853]"
            />
          </div>

          {/* Attendance Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
            {[
              { label: "Semua", val: "all" },
              { label: "Hadir", val: "HADIR" },
              { label: "Berhalangan", val: "TIDAK_HADIR" },
              { label: "Belum RSVP", val: "PENDING" },
            ].map((f) => (
              <button
                key={f.val}
                type="button"
                onClick={() => setFilterAttendance(f.val)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  filterAttendance === f.val
                    ? "bg-[#914853] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-pink-50"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Guest Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                <th className="py-3 px-3">Nama Tamu</th>
                <th className="py-3 px-3">Kategori</th>
                <th className="py-3 px-3">Pax</th>
                <th className="py-3 px-3">Status RSVP</th>
                <th className="py-3 px-3">Check-in Hari H</th>
                <th className="py-3 px-3 text-right">Aksi Undangan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((g) => (
                <tr key={g.id} className="hover:bg-pink-50/30 transition-colors">
                  <td className="py-3.5 px-3 font-semibold text-gray-800">
                    <div>{g.name}</div>
                    {g.phone && (
                      <span className="text-[11px] text-gray-400 font-mono">
                        {g.phone}
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-gray-100 text-gray-700">
                      {g.category || "Tamu"}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-gray-600 font-mono text-xs">
                    {g.pax || 1} orang
                  </td>
                  <td className="py-3.5 px-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        g.isAttending === "HADIR"
                          ? "bg-emerald-100 text-emerald-800"
                          : g.isAttending === "TIDAK_HADIR"
                          ? "bg-rose-100 text-rose-800"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {g.isAttending === "HADIR"
                        ? "Pasti Hadir"
                        : g.isAttending === "TIDAK_HADIR"
                        ? "Berhalangan"
                        : "Belum Konfirmasi"}
                    </span>
                  </td>
                  <td className="py-3.5 px-3">
                    {g.checkedIn ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md">
                        <Check className="w-3.5 h-3.5" />
                        <span>Hadir di Venue</span>
                      </span>
                    ) : (
                      <span className="text-[11px] text-gray-400">Belum</span>
                    )}
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => setSelectedQrGuest(g)}
                        className="p-2 rounded-lg bg-pink-50 text-[#914853] hover:bg-pink-100 transition-colors"
                        title="Lihat QR Pass"
                      >
                        <QrCode className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleCopyLink(g)}
                        className="p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                        title="Salin Link Personal"
                      >
                        {copiedSlug === g.id ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleShareWhatsApp(g)}
                        className="p-2 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                        title="Kirim Undangan via WhatsApp"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add Guest */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="font-serif-luxury text-xl font-bold text-[#5c2a33]">
              Tambah Tamu Undangan
            </h3>

            <form onSubmit={handleAddGuest} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-600 mb-1">
                  Nama Tamu / Pasangan
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Contoh: Bpk. Bambang & Ibu Endang"
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[#914853]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-600 mb-1">
                  Nomor WhatsApp
                </label>
                <input
                  type="tel"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="081234567890"
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[#914853]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-600 mb-1">
                    Kategori Tamu
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[#914853]"
                  >
                    <option value="VIP">VIP</option>
                    <option value="Keluarga">Keluarga</option>
                    <option value="Sahabat">Sahabat</option>
                    <option value="Rekan Kerja">Rekan Kerja</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-600 mb-1">
                    Kapasitas (Pax)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={newPax}
                    onChange={(e) => setNewPax(Number(e.target.value))}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[#914853]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 text-xs font-bold text-gray-500 hover:text-gray-800"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loadingAdd}
                  className="btn-rosegold px-5 py-2.5 rounded-xl text-xs font-bold"
                >
                  {loadingAdd ? "Menyimpan..." : "Simpan Tamu"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal QR Code Pass Preview */}
      {selectedQrGuest && (
        <div
          onClick={() => setSelectedQrGuest(null)}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center space-y-4"
          >
            <h3 className="font-serif-luxury text-xl font-bold text-[#5c2a33]">
              QR Pass Check-in
            </h3>
            <p className="text-sm font-bold text-gray-800">
              {selectedQrGuest.name}
            </p>
            <div className="w-48 h-48 mx-auto p-3 bg-white border-2 border-dashed border-[#914853] rounded-2xl flex items-center justify-center">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                  `GUEST:${invitationSlug}:${selectedQrGuest.slug}`
                )}`}
                alt="QR Code"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-xs text-gray-500">
              Panitia resepsi dapat memindai QR ini melalui fitur QR Scanner di dasbor.
            </p>
            <button
              type="button"
              onClick={() => setSelectedQrGuest(null)}
              className="w-full py-2.5 rounded-xl bg-gray-100 text-gray-700 text-xs font-bold"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
