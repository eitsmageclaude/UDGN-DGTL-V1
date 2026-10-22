"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import {
  Send,
  Sparkles,
  CheckCircle2,
  Users,
  Copy,
  Check,
  ExternalLink,
  MessageCircle,
  Play,
  CheckCheck,
} from "lucide-react";

interface Props {
  invitationSlug: string;
  groomBride: string;
  packageName: string;
  maxQuota: number;
  guests: any[];
}

export default function BlastClient({
  invitationSlug,
  groomBride,
  packageName,
  maxQuota,
  guests,
}: Props) {
  const [template, setTemplate] = useState(
    `Kepada Yth. *{nama}*,\n\nTanpa mengurangi rasa hormat, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk hadir dan memberikan doa restu di hari pernikahan kami (${groomBride}).\n\nDetail acara, denah lokasi, dan konfirmasi kehadiran dapat dilihat melalui tautan undangan berikut:\n{link}\n\nMerupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir.\n\nTerima kasih.`
  );

  const [sentMap, setSentMap] = useState<Record<string, boolean>>({});
  const [batchSending, setBatchSending] = useState(false);

  const sentCount = Object.keys(sentMap).length;
  const quotaUsedPercent = Math.min(100, Math.round((sentCount / maxQuota) * 100));

  const buildMessageForGuest = (guest: any) => {
    const origin = typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";
    const link = `${origin}/i/${invitationSlug}?to=${encodeURIComponent(guest.name)}&g=${guest.slug}`;
    return template.replace(/\{nama\}/g, guest.name).replace(/\{link\}/g, link);
  };

  const handleSendSingle = (guest: any) => {
    const text = encodeURIComponent(buildMessageForGuest(guest));
    const phone = guest.phone ? guest.phone.replace(/^0/, "62") : "";
    window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
    setSentMap((prev) => ({ ...prev, [guest.id]: true }));
  };

  const handleSendAll = () => {
    setBatchSending(true);
    // Mark all as queued/sent
    const newMap: Record<string, boolean> = { ...sentMap };
    guests.forEach((g) => {
      newMap[g.id] = true;
    });
    setTimeout(() => {
      setSentMap(newMap);
      setBatchSending(false);
      confetti({
        particleCount: 100,
        spread: 80,
      });
    }, 1200);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Top Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-pink-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fitur Auto Blast WhatsApp ({packageName})</span>
          </div>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#5c2a33]">
            Pengiriman Undangan Massal WhatsApp
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-xl">
            Sistem otomatis mempersonalisasi nama tamu dan link unik pada setiap pesan undangan tanpa perlu ketik manual.
          </p>
        </div>

        {/* Quota Gauge */}
        <div className="bg-pink-50/60 p-4 rounded-2xl border border-pink-100 text-center shrink-0 w-full sm:w-48">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
            Kuota Blast
          </span>
          <div className="text-xl font-black text-[#5c2a33] mt-0.5">
            {sentCount} / {maxQuota} Tamu
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-[#914853] h-full rounded-full transition-all duration-500"
              style={{ width: `${quotaUsedPercent}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Message Template Editor */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-pink-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-[#5c2a33] uppercase tracking-wider">
              Template Pesan WhatsApp
            </h3>
            <span className="text-[11px] text-gray-400 font-mono">
              Variabel: {"{nama}"}, {"{link}"}
            </span>
          </div>

          <textarea
            rows={10}
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
            className="w-full p-4 text-xs sm:text-sm rounded-2xl border border-gray-200 focus:outline-none focus:border-[#914853] bg-gray-50 leading-relaxed font-sans"
          />

          <div className="p-3 bg-pink-50 rounded-xl text-[11px] text-[#5c2a33] leading-relaxed">
            💡 <b>Tips:</b> Variabel <code>{"{nama}"}</code> akan otomatis diganti menjadi nama tamu dan <code>{"{link}"}</code> akan diganti tautan undangan dengan parameter nama tamu bersangkutan.
          </div>
        </div>

        {/* Right: Guest Blast Queue */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-pink-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <h3 className="font-bold text-sm text-[#5c2a33] uppercase tracking-wider">
                Antrean Pengiriman Tamu ({guests.length})
              </h3>
              <p className="text-[11px] text-gray-400">
                Pilih kirim satu per satu atau jalankan antrean otomatis
              </p>
            </div>

            <button
              type="button"
              onClick={handleSendAll}
              disabled={batchSending || guests.length === 0}
              className="btn-rosegold px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm"
            >
              <CheckCheck className="w-4 h-4" />
              <span>{batchSending ? "Memproses..." : "Tandai Kirim Semua"}</span>
            </button>
          </div>

          <div className="space-y-3 max-h-[440px] overflow-y-auto pr-1">
            {guests.map((g) => {
              const isSent = sentMap[g.id];
              return (
                <div
                  key={g.id}
                  className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm">{g.name}</h4>
                    <span className="text-[11px] text-gray-400 font-mono">
                      {g.phone || "Nomor belum diinput"} • {g.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {isSent ? (
                      <span className="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-[11px] flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        <span>Terkirim</span>
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleSendSingle(g)}
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] flex items-center gap-1.5 shadow-sm transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Kirim WA</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
