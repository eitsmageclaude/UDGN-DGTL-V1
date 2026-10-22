import React from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Edit3,
  Users,
  QrCode,
  Send,
  CreditCard,
  Tv,
  ExternalLink,
  Sparkles,
  LogOut,
} from "lucide-react";
import DashboardSidebarNav from "./DashboardSidebarNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#faf6f7] flex flex-col md:flex-row">
      {/* Sidebar for Desktop */}
      <aside className="w-full md:w-64 bg-white border-r border-pink-100/80 flex flex-col justify-between shrink-0 shadow-sm">
        <div>
          {/* Brand header */}
          <div className="p-6 border-b border-pink-50 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#914853] to-[#7a3a44] flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-4 h-4 text-pink-200" />
              </div>
              <div>
                <span className="font-serif-luxury text-lg font-bold text-[#5c2a33]">
                  Satu Cerita
                </span>
                <span className="block text-[9px] uppercase font-bold tracking-widest text-[#914853]">
                  User Dasbor
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <DashboardSidebarNav />
        </div>

        {/* Bottom Quick Actions */}
        <div className="p-4 border-t border-pink-50 space-y-2">
          <Link
            href="/screen/ananda-bella"
            target="_blank"
            className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-[#914853] bg-pink-50 hover:bg-pink-100 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Tv className="w-4 h-4" />
              <span>Guest on Screen</span>
            </span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <Link
            href="/i/ananda-bella"
            target="_blank"
            className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#5c2a33] hover:bg-[#7a3a44] transition-colors shadow-sm"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Lihat Undangan</span>
            </span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <main className="flex-1 p-4 sm:p-8 lg:p-10">{children}</main>
      </div>
    </div>
  );
}
