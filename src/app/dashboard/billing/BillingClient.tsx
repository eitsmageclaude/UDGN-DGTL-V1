"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import {
  Sparkles,
  CreditCard,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  QrCode,
  Building,
  Check,
  Loader2,
} from "lucide-react";

interface Props {
  currentPackage: any;
  invitationSlug: string;
  activeUntil: Date | null | undefined;
  packages: any[];
  orders: any[];
}

export default function BillingClient({
  currentPackage,
  invitationSlug,
  activeUntil,
  packages,
  orders: initialOrders,
}: Props) {
  const [orders, setOrders] = useState(initialOrders);
  const [activePkg, setActivePkg] = useState(currentPackage);
  const [selectedPkg, setSelectedPkg] = useState<any | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("QRIS");
  const [processing, setProcessing] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleCheckout = async () => {
    if (!selectedPkg) return;

    setProcessing(true);
    setSuccessMsg("");

    try {
      const res = await fetch("/api/order/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageId: selectedPkg.id,
          invitationSlug,
          paymentMethod,
        }),
      });

      const data = await res.json();
      if (res.ok && data.order) {
        setActivePkg(selectedPkg);
        setOrders([data.order, ...orders]);
        setSelectedPkg(null);
        setSuccessMsg(data.message || "Paket berhasil diaktifkan!");
        confetti({
          particleCount: 100,
          spread: 70,
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Current Subscription Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-pink-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-[#914853] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Paket Anda Saat Ini</span>
          </div>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#5c2a33]">
            Paket {activePkg?.name || "Gold"}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            {activePkg?.maxBlast} WhatsApp Blast • {activePkg?.maxPhotos} Foto Galeri • {activePkg?.maxEvents} Agenda Acara
          </p>
        </div>

        <div className="bg-emerald-50 text-emerald-800 px-5 py-3.5 rounded-2xl border border-emerald-200 text-center shrink-0">
          <span className="text-[11px] font-bold uppercase tracking-wider block text-emerald-700">
            Status Paket
          </span>
          <span className="text-lg font-black block">Aktif</span>
          <span className="text-[10px] text-emerald-600 block mt-0.5">
            {activeUntil
              ? `Hingga ${new Date(activeUntil).toLocaleDateString("id-ID")}`
              : "Aktif Selamanya"}
          </span>
        </div>
      </div>

      {successMsg && (
        <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold flex items-center gap-2 animate-fade-in">
          <Check className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Upgrade Packages Grid */}
      <div className="space-y-4">
        <h2 className="font-serif-luxury text-2xl font-bold text-[#5c2a33]">
          Pilihan Upgrade Paket
        </h2>
        <p className="text-xs sm:text-sm text-gray-500">
          Tingkatkan batas kuota WhatsApp Blast, galeri foto, atau masa aktif undangan Anda.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {packages
            .filter((p) => p.category === "wedding")
            .map((pkg) => {
              const isCurrent = activePkg?.id === pkg.id;
              return (
                <div
                  key={pkg.id}
                  className={`rounded-3xl p-6 border flex flex-col justify-between transition-all ${
                    isCurrent
                      ? "bg-pink-50/50 border-[#914853] shadow-md"
                      : "bg-white border-gray-200 hover:border-pink-300 shadow-sm"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-serif-luxury text-xl font-bold text-[#5c2a33]">
                        {pkg.name}
                      </h3>
                      {isCurrent && (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#914853] text-white">
                          Aktif
                        </span>
                      )}
                    </div>

                    <div className="mb-4">
                      <span className="text-2xl font-extrabold text-[#5c2a33]">
                        {pkg.price === 0 ? "Gratis" : formatRupiah(pkg.price)}
                      </span>
                      {pkg.price > 0 && (
                        <span className="text-xs text-gray-400 block">
                          / sekali bayar
                        </span>
                      )}
                    </div>

                    <ul className="space-y-2 mb-6 text-xs text-gray-600">
                      {Array.isArray(pkg.features) &&
                        pkg.features.slice(0, 4).map((f: string, i: number) => (
                          <li key={i} className="flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-[#914853] shrink-0" />
                            <span>{f}</span>
                          </li>
                        ))}
                    </ul>
                  </div>

                  {isCurrent ? (
                    <button
                      type="button"
                      disabled
                      className="w-full py-2.5 rounded-xl bg-gray-100 text-gray-400 text-xs font-bold cursor-not-allowed"
                    >
                      Paket Sedang Aktif
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setSelectedPkg(pkg)}
                      className="btn-rosegold w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <span>Pilih Paket {pkg.name}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              );
            })}
        </div>
      </div>

      {/* Orders History Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-pink-100 shadow-sm space-y-4">
        <h2 className="font-serif-luxury text-xl font-bold text-[#5c2a33]">
          Riwayat Pembayaran & Invoice
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                <th className="py-3 px-3">No. Pesanan</th>
                <th className="py-3 px-3">Paket</th>
                <th className="py-3 px-3">Nominal</th>
                <th className="py-3 px-3">Metode</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Waktu</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-xs sm:text-sm">
              {orders.map((ord) => (
                <tr key={ord.id} className="hover:bg-gray-50">
                  <td className="py-3 px-3 font-mono font-bold text-gray-800">
                    {ord.orderNumber}
                  </td>
                  <td className="py-3 px-3 font-semibold text-[#5c2a33]">
                    {ord.package?.name || "Paket"}
                  </td>
                  <td className="py-3 px-3 font-bold text-gray-700">
                    {formatRupiah(ord.amount)}
                  </td>
                  <td className="py-3 px-3 text-gray-500 uppercase font-mono text-xs">
                    {ord.paymentMethod || "QRIS"}
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {ord.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-gray-400 text-xs">
                    {new Date(ord.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Checkout Modal Simulation */}
      {selectedPkg && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div>
                <span className="text-xs uppercase font-bold text-[#914853] block">
                  Checkout Paket
                </span>
                <h3 className="font-serif-luxury text-xl font-bold text-[#5c2a33]">
                  {selectedPkg.name}
                </h3>
              </div>
              <span className="text-xl font-extrabold text-[#5c2a33]">
                {formatRupiah(selectedPkg.price)}
              </span>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase text-gray-600">
                Pilih Metode Pembayaran
              </label>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("QRIS")}
                  className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                    paymentMethod === "QRIS"
                      ? "border-[#914853] bg-pink-50/50 shadow-sm"
                      : "border-gray-200 hover:border-pink-200"
                  }`}
                >
                  <QrCode className="w-5 h-5 text-[#914853] mb-2" />
                  <span className="text-xs font-bold text-gray-800">QRIS Instan</span>
                  <span className="text-[10px] text-gray-400">BCA, Mandiri, GoPay, Dana</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("VA_BCA")}
                  className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                    paymentMethod === "VA_BCA"
                      ? "border-[#914853] bg-pink-50/50 shadow-sm"
                      : "border-gray-200 hover:border-pink-200"
                  }`}
                >
                  <Building className="w-5 h-5 text-[#914853] mb-2" />
                  <span className="text-xs font-bold text-gray-800">Virtual Account</span>
                  <span className="text-[10px] text-gray-400">BCA / Mandiri / BRI</span>
                </button>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 text-xs text-gray-600 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Simulasi pembayaran otomatis: paket akan langsung aktif setelah klik bayar.</span>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSelectedPkg(null)}
                className="px-4 py-2.5 text-xs font-bold text-gray-500 hover:text-gray-800"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleCheckout}
                disabled={processing}
                className="btn-rosegold px-6 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md disabled:opacity-50"
              >
                {processing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Memproses...</span>
                  </>
                ) : (
                  <span>Bayar & Aktifkan Paket</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
