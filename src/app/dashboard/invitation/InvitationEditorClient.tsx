"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  User,
  Calendar,
  Palette,
  FileText,
  Music,
  Check,
  Save,
  ExternalLink,
  Sparkles,
  MapPin,
  Clock,
  Camera,
  AlertCircle,
  Loader2,
} from "lucide-react";

interface Props {
  initialInvitation: any;
  themes: any[];
}

export default function InvitationEditorClient({
  initialInvitation,
  themes,
}: Props) {
  const [activeTab, setActiveTab] = useState<
    "mempelai" | "acara" | "tema" | "quotes" | "musik"
  >("mempelai");

  const [saving, setSaving] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    title: initialInvitation?.title || "The Wedding of Ananda & Bella",
    themeId: initialInvitation?.themeId || (themes[0]?.id ?? ""),
    groomName: initialInvitation?.groomName || "Ananda Pratama, S.T.",
    groomShortName: initialInvitation?.groomShortName || "Ananda",
    groomParents:
      initialInvitation?.groomParents ||
      "Putra pertama dari Bpk. Bambang Wijaya & Ibu Endang",
    groomInstagram: initialInvitation?.groomInstagram || "anandapratama",
    groomPhoto:
      initialInvitation?.groomPhoto ||
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",

    brideName: initialInvitation?.brideName || "Bella Puspita Sari, S.Farm.",
    brideShortName: initialInvitation?.brideShortName || "Bella",
    brideParents:
      initialInvitation?.brideParents ||
      "Putri kedua dari Bpk. H. Suryadi & Ibu Hj. Ratna",
    brideInstagram: initialInvitation?.brideInstagram || "bellapuspita",
    bridePhoto:
      initialInvitation?.bridePhoto ||
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",

    eventTitle: initialInvitation?.events?.[0]?.title || "Akad Nikah & Resepsi",
    eventDate: initialInvitation?.events?.[0]?.date
      ? new Date(initialInvitation.events[0].date).toISOString().split("T")[0]
      : "2026-11-08",
    eventStartTime: initialInvitation?.events?.[0]?.startTime || "08:00 WIB",
    eventVenue:
      initialInvitation?.events?.[0]?.venueName ||
      "Grand Ballroom Hotel Kempinski",
    eventAddress:
      initialInvitation?.events?.[0]?.venueAddress ||
      "Jl. M.H. Thamrin No.1, Jakarta Pusat",
    eventMapUrl:
      initialInvitation?.events?.[0]?.mapUrl ||
      "https://maps.google.com/?q=Hotel+Indonesia+Kempinski",

    quotes:
      initialInvitation?.quotes ||
      "Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri...\n(QS. Ar-Rum: 21)",
    dresscode:
      initialInvitation?.dresscode || "Formal Elegance (Rose Gold / Pastel)",

    musicTitle:
      initialInvitation?.musicTitle ||
      "Beautiful In White - Shane Filan (Piano)",
    musicUrl:
      initialInvitation?.musicUrl ||
      "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  });

  const handleSave = async () => {
    setSaving(true);
    setToastMsg("");

    try {
      const res = await fetch(
        `/api/invitation/${initialInvitation?.slug || "ananda-bella"}/update`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: formData.title,
            themeId: formData.themeId,
            groomName: formData.groomName,
            groomShortName: formData.groomShortName,
            groomParents: formData.groomParents,
            groomInstagram: formData.groomInstagram,
            groomPhoto: formData.groomPhoto,
            brideName: formData.brideName,
            brideShortName: formData.brideShortName,
            brideParents: formData.brideParents,
            brideInstagram: formData.brideInstagram,
            bridePhoto: formData.bridePhoto,
            quotes: formData.quotes,
            dresscode: formData.dresscode,
            musicTitle: formData.musicTitle,
            musicUrl: formData.musicUrl,
            event: {
              title: formData.eventTitle,
              date: formData.eventDate,
              startTime: formData.eventStartTime,
              venueName: formData.eventVenue,
              venueAddress: formData.eventAddress,
              mapUrl: formData.eventMapUrl,
            },
          }),
        }
      );

      if (res.ok) {
        setToastMsg("Perubahan undangan berhasil disimpan ke database!");
        setTimeout(() => setToastMsg(""), 4000);
      } else {
        setToastMsg("Gagal menyimpan perubahan.");
      }
    } catch (err) {
      setToastMsg("Koneksi bermasalah.");
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: "mempelai", label: "1. Data Mempelai", icon: User },
    { id: "acara", label: "2. Jadwal & Lokasi", icon: Calendar },
    { id: "tema", label: "3. Pilihan Tema", icon: Palette },
    { id: "quotes", label: "4. Quotes & Cerita", icon: FileText },
    { id: "musik", label: "5. Musik & Amplop", icon: Music },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-pink-100 shadow-sm">
        <div>
          <span className="text-xs uppercase font-bold text-[#914853] tracking-wider block">
            Editor Undangan Digital
          </span>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#5c2a33]">
            {formData.title}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/i/${initialInvitation?.slug || "ananda-bella"}`}
            target="_blank"
            className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 hover:bg-pink-50 hover:text-[#914853] flex items-center gap-1.5 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Lihat Live</span>
          </Link>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="btn-rosegold px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Menyimpan...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Simpan Perubahan</span>
              </>
            )}
          </button>
        </div>
      </div>

      {toastMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center gap-2 animate-fade-in">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Tabs Stepper */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-pink-100">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap shrink-0 ${
                isActive
                  ? "bg-[#914853] text-white shadow-md shadow-[#914853]/20"
                  : "bg-white text-gray-600 hover:bg-pink-50 hover:text-[#914853] border border-gray-100"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Form Panels */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-pink-100 shadow-sm">
        {/* TAB 1: MEMPELAI */}
        {activeTab === "mempelai" && (
          <div className="space-y-8 animate-fade-in">
            <h2 className="font-serif-luxury text-xl font-bold text-[#5c2a33] pb-3 border-b border-gray-100">
              Data Mempelai Pria & Wanita
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Mempelai Pria */}
              <div className="space-y-4 p-5 rounded-2xl bg-pink-50/40 border border-pink-100">
                <h3 className="font-bold text-sm text-[#914853] uppercase tracking-wider">
                  Mempelai Pria
                </h3>

                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">
                    Nama Lengkap & Gelar
                  </label>
                  <input
                    type="text"
                    value={formData.groomName}
                    onChange={(e) =>
                      setFormData({ ...formData, groomName: e.target.value })
                    }
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-[#914853]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">
                    Nama Panggilan
                  </label>
                  <input
                    type="text"
                    value={formData.groomShortName}
                    onChange={(e) =>
                      setFormData({ ...formData, groomShortName: e.target.value })
                    }
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-[#914853]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">
                    Nama Orang Tua (Ayah & Ibu)
                  </label>
                  <input
                    type="text"
                    value={formData.groomParents}
                    onChange={(e) =>
                      setFormData({ ...formData, groomParents: e.target.value })
                    }
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-[#914853]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">
                    Akun Instagram (Tanpa @)
                  </label>
                  <input
                    type="text"
                    value={formData.groomInstagram}
                    onChange={(e) =>
                      setFormData({ ...formData, groomInstagram: e.target.value })
                    }
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-[#914853]"
                  />
                </div>
              </div>

              {/* Mempelai Wanita */}
              <div className="space-y-4 p-5 rounded-2xl bg-pink-50/40 border border-pink-100">
                <h3 className="font-bold text-sm text-[#914853] uppercase tracking-wider">
                  Mempelai Wanita
                </h3>

                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">
                    Nama Lengkap & Gelar
                  </label>
                  <input
                    type="text"
                    value={formData.brideName}
                    onChange={(e) =>
                      setFormData({ ...formData, brideName: e.target.value })
                    }
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-[#914853]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">
                    Nama Panggilan
                  </label>
                  <input
                    type="text"
                    value={formData.brideShortName}
                    onChange={(e) =>
                      setFormData({ ...formData, brideShortName: e.target.value })
                    }
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-[#914853]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">
                    Nama Orang Tua (Ayah & Ibu)
                  </label>
                  <input
                    type="text"
                    value={formData.brideParents}
                    onChange={(e) =>
                      setFormData({ ...formData, brideParents: e.target.value })
                    }
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-[#914853]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">
                    Akun Instagram (Tanpa @)
                  </label>
                  <input
                    type="text"
                    value={formData.brideInstagram}
                    onChange={(e) =>
                      setFormData({ ...formData, brideInstagram: e.target.value })
                    }
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-[#914853]"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ACARA & LOKASI */}
        {activeTab === "acara" && (
          <div className="space-y-6 animate-fade-in max-w-2xl">
            <h2 className="font-serif-luxury text-xl font-bold text-[#5c2a33] pb-3 border-b border-gray-100">
              Agenda & Lokasi Acara
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">
                  Nama Rangkaian Acara
                </label>
                <input
                  type="text"
                  value={formData.eventTitle}
                  onChange={(e) =>
                    setFormData({ ...formData, eventTitle: e.target.value })
                  }
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[#914853]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">
                    Tanggal Acara
                  </label>
                  <input
                    type="date"
                    value={formData.eventDate}
                    onChange={(e) =>
                      setFormData({ ...formData, eventDate: e.target.value })
                    }
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[#914853]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">
                    Waktu / Jam
                  </label>
                  <input
                    type="text"
                    value={formData.eventStartTime}
                    onChange={(e) =>
                      setFormData({ ...formData, eventStartTime: e.target.value })
                    }
                    placeholder="08:00 WIB"
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[#914853]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">
                  Nama Gedung / Tempat
                </label>
                <input
                  type="text"
                  value={formData.eventVenue}
                  onChange={(e) =>
                    setFormData({ ...formData, eventVenue: e.target.value })
                  }
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[#914853]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">
                  Alamat Lengkap
                </label>
                <textarea
                  rows={2}
                  value={formData.eventAddress}
                  onChange={(e) =>
                    setFormData({ ...formData, eventAddress: e.target.value })
                  }
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[#914853]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">
                  Tautan Google Maps / Share Location
                </label>
                <input
                  type="url"
                  value={formData.eventMapUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, eventMapUrl: e.target.value })
                  }
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[#914853]"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: TEMA & DESAIN */}
        {activeTab === "tema" && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="font-serif-luxury text-xl font-bold text-[#5c2a33] pb-3 border-b border-gray-100">
              Ganti Tema Undangan (160+ Koleksi)
            </h2>
            <p className="text-xs text-gray-500">
              Anda dapat mengganti tema kapan saja tanpa kehilangan data pengisian yang telah dimasukkan.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {themes.map((th) => {
                const isSelected = formData.themeId === th.id;
                return (
                  <div
                    key={th.id}
                    onClick={() => setFormData({ ...formData, themeId: th.id })}
                    className={`rounded-2xl p-2.5 border-2 cursor-pointer transition-all ${
                      isSelected
                        ? "border-[#914853] bg-pink-50 shadow-md"
                        : "border-gray-200 hover:border-pink-300 bg-white"
                    }`}
                  >
                    <div className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 mb-2 relative">
                      <img
                        src={th.previewImage}
                        alt={th.name}
                        className="w-full h-full object-cover"
                      />
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#914853] text-white flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <span className="font-bold text-xs text-[#5c2a33] block truncate">
                      {th.name}
                    </span>
                    <span className="text-[10px] text-gray-400 capitalize">
                      {th.subCategory}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: QUOTES & KISAH */}
        {activeTab === "quotes" && (
          <div className="space-y-6 animate-fade-in max-w-2xl">
            <h2 className="font-serif-luxury text-xl font-bold text-[#5c2a33] pb-3 border-b border-gray-100">
              Kutipan Indah & Panduan Pakaian
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">
                  Kutipan / Ayat Suci / Quotes
                </label>
                <textarea
                  rows={4}
                  value={formData.quotes}
                  onChange={(e) =>
                    setFormData({ ...formData, quotes: e.target.value })
                  }
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[#914853]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">
                  Panduan Pakaian (Dresscode Tamu)
                </label>
                <input
                  type="text"
                  value={formData.dresscode}
                  onChange={(e) =>
                    setFormData({ ...formData, dresscode: e.target.value })
                  }
                  placeholder="Contoh: Formal / Earth Tone / Rose Gold"
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[#914853]"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: MUSIK & AMPLOP */}
        {activeTab === "musik" && (
          <div className="space-y-6 animate-fade-in max-w-2xl">
            <h2 className="font-serif-luxury text-xl font-bold text-[#5c2a33] pb-3 border-b border-gray-100">
              Musik Latar & Amplop Digital
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">
                  Judul Lagu Latar
                </label>
                <input
                  type="text"
                  value={formData.musicTitle}
                  onChange={(e) =>
                    setFormData({ ...formData, musicTitle: e.target.value })
                  }
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[#914853]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1">
                  URL File Musik (.mp3)
                </label>
                <input
                  type="url"
                  value={formData.musicUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, musicUrl: e.target.value })
                  }
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[#914853]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Bottom Save bar */}
        <div className="mt-10 pt-6 border-t border-gray-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="btn-rosegold px-8 py-3.5 rounded-2xl text-sm font-bold shadow-lg shadow-[#914853]/25 flex items-center gap-2"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Menyimpan...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Simpan Perubahan</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
