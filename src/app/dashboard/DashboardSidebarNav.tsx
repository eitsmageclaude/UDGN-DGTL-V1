"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Edit3,
  Users,
  QrCode,
  Send,
  CreditCard,
  LogOut,
} from "lucide-react";

export default function DashboardSidebarNav() {
  const pathname = usePathname();
  const router = useRouter();

  const menu = [
    { name: "Ringkasan", href: "/dashboard", icon: LayoutDashboard },
    { name: "Edit Undangan", href: "/dashboard/invitation", icon: Edit3 },
    { name: "Buku Tamu & RSVP", href: "/dashboard/guests", icon: Users },
    { name: "QR Scanner Tamu", href: "/dashboard/scan", icon: QrCode },
    { name: "WA Blast", href: "/dashboard/blast", icon: Send },
    { name: "Paket & Tagihan", href: "/dashboard/billing", icon: CreditCard },
  ];

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
      router.refresh();
    } catch (err) {
      router.push("/login");
    }
  };

  return (
    <nav className="p-4 space-y-1">
      {menu.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              isActive
                ? "bg-[#914853] text-white shadow-md shadow-[#914853]/25"
                : "text-gray-600 hover:bg-pink-50 hover:text-[#914853]"
            }`}
          >
            <Icon className="w-4 h-4 shrink-0" />
            <span>{item.name}</span>
          </Link>
        );
      })}

      <button
        type="button"
        onClick={handleLogout}
        className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-colors mt-4 text-left"
      >
        <LogOut className="w-4 h-4 shrink-0" />
        <span>Keluar</span>
      </button>
    </nav>
  );
}
