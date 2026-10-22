"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Copy, Check, ExternalLink, QrCode } from "lucide-react";

interface Props {
  publicUrl: string;
  slug: string;
}

export default function DashboardQuickActions({ publicUrl, slug }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-pink-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3 w-full sm:w-auto overflow-hidden">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider shrink-0">
          Link Undangan:
        </span>
        <div className="px-3 py-1.5 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-700 font-mono truncate w-full sm:max-w-md">
          {publicUrl}
        </div>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
        <button
          type="button"
          onClick={handleCopy}
          className="flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold bg-pink-50 text-[#914853] border border-pink-200 hover:bg-pink-100 flex items-center justify-center gap-1.5 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Tersalin!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Salin Tautan</span>
            </>
          )}
        </button>

        <Link
          href={`/i/${slug}`}
          target="_blank"
          className="flex-1 sm:flex-initial btn-rosegold px-4 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
        >
          <ExternalLink className="w-4 h-4" />
          <span>Lihat Undangan</span>
        </Link>
      </div>
    </div>
  );
}
