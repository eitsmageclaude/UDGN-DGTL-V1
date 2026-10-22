"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Eye, ShoppingBag, Search, Sparkles, Filter, ChevronLeft, ChevronRight, Check } from "lucide-react";

export interface ThemeItem {
  id: string;
  name: string;
  slug: string;
  category: string;
  subCategory: string;
  previewImage: string;
  colorSwatches: string[];
  colorFamily: string;
  isPopular: boolean;
  isFreeTrial: boolean;
}

interface ThemeCatalogProps {
  initialThemes: ThemeItem[];
}

export default function ThemeCatalog({ initialThemes }: ThemeCatalogProps) {
  const [selectedEventType, setSelectedEventType] = useState("all");
  const [selectedSubCategory, setSelectedSubCategory] = useState("all");
  const [selectedColorFamily, setSelectedColorFamily] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const eventTypes = [
    { label: "Semua Acara", value: "all" },
    { label: "Pernikahan", value: "wedding" },
    { label: "Khitanan", value: "khitanan" },
    { label: "Ulang Tahun", value: "birthday" },
    { label: "Buka Bersama", value: "bukber" },
    { label: "Perayaan Natal", value: "natal" },
  ];

  const subCategories = [
    { label: "Semua Kategori", value: "all" },
    { label: "Populer 🔥", value: "Popular" },
    { label: "Desain Baru ✨", value: "New" },
    { label: "Adat Tradisional", value: "Adat" },
    { label: "Artistic Elegance", value: "Artistic" },
    { label: "Modern Minimalist", value: "Modern" },
    { label: "Legacy Heritage", value: "Legacy" },
  ];

  const colorFamilies = [
    { label: "Semua", value: "all", hex: "#999999" },
    { label: "Emas", value: "emas", hex: "#C5A059" },
    { label: "Maroon", value: "maroon", hex: "#661217" },
    { label: "Hitam", value: "hitam", hex: "#222221" },
    { label: "Pink", value: "pink", hex: "#914853" },
    { label: "Hijau", value: "hijau", hex: "#1C402E" },
    { label: "Biru", value: "biru", hex: "#1D4E89" },
    { label: "Cream", value: "cream", hex: "#F7F4EB" },
    { label: "Cokelat", value: "cokelat", hex: "#625445" },
    { label: "Ungu", value: "ungu", hex: "#4A2E6B" },
  ];

  // Filtering Logic
  const filteredThemes = useMemo(() => {
    return initialThemes.filter((theme) => {
      // Event category match
      if (selectedEventType !== "all" && theme.category !== selectedEventType) {
        return false;
      }
      // Sub-category match
      if (
        selectedSubCategory !== "all" &&
        theme.subCategory.toLowerCase() !== selectedSubCategory.toLowerCase() &&
        !(selectedSubCategory === "Popular" && theme.isPopular)
      ) {
        return false;
      }
      // Color family match
      if (
        selectedColorFamily !== "all" &&
        theme.colorFamily.toLowerCase() !== selectedColorFamily.toLowerCase()
      ) {
        return false;
      }
      // Search query
      if (
        searchQuery.trim() !== "" &&
        !theme.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [
    initialThemes,
    selectedEventType,
    selectedSubCategory,
    selectedColorFamily,
    searchQuery,
  ]);

  // Pagination
  const totalPages = Math.ceil(filteredThemes.length / itemsPerPage) || 1;
  const paginatedThemes = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredThemes.slice(start, start + itemsPerPage);
  }, [filteredThemes, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const element = document.getElementById("katalog");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="katalog" className="py-20 bg-gradient-to-b from-[#faf8f8] to-[#f7f0f1] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-[#914853] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>160+ Koleksi Desain Eksklusif</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#5c2a33] tracking-tight">
            Pilihan Tema Undangan Digital
          </h2>
          <p className="mt-3 text-base text-gray-600">
            Pilih dari ragam karya desain elegan mulai dari adat khas nusantara, modern minimalis, hingga luxury floral berkelas.
          </p>
        </div>

        {/* Filters Box */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#914853]/10 mb-10 space-y-5">
          {/* Top row: Event type tabs + Search */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Event Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
              {eventTypes.map((event) => (
                <button
                  key={event.value}
                  type="button"
                  onClick={() => {
                    setSelectedEventType(event.value);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                    selectedEventType === event.value
                      ? "bg-[#914853] text-white shadow-sm"
                      : "bg-gray-100/80 text-gray-600 hover:bg-pink-50 hover:text-[#914853]"
                  }`}
                >
                  {event.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari nama tema..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#914853] focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Sub-Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 border-t border-gray-100 pt-4">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider shrink-0 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-[#914853]" />
              Kategori:
            </span>
            {subCategories.map((sub) => (
              <button
                key={sub.value}
                type="button"
                onClick={() => {
                  setSelectedSubCategory(sub.value);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 ${
                  selectedSubCategory === sub.value
                    ? "bg-pink-100 text-[#914853] font-bold ring-1 ring-[#914853]"
                    : "text-gray-600 hover:text-[#914853] hover:bg-gray-50"
                }`}
              >
                {sub.label}
              </button>
            ))}
          </div>

          {/* Color Family Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 border-t border-gray-100 pt-3">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider shrink-0">
              Palet Warna:
            </span>
            <div className="flex items-center gap-2 flex-wrap">
              {colorFamilies.map((color) => {
                const isSelected = selectedColorFamily === color.value;
                return (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => {
                      setSelectedColorFamily(color.value);
                      setCurrentPage(1);
                    }}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs transition-all border ${
                      isSelected
                        ? "bg-[#5c2a33] text-white border-[#5c2a33] shadow-sm font-semibold"
                        : "bg-white text-gray-700 border-gray-200 hover:border-pink-300"
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-black/10 shrink-0"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span>{color.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Theme Cards Grid */}
        {paginatedThemes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
            {paginatedThemes.map((theme) => (
              <div
                key={theme.id}
                className="group bg-white rounded-2xl sm:rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-[#914853]/10 overflow-hidden flex flex-col hover:-translate-y-1.5"
              >
                {/* Image Container with Swatch Chip */}
                <div className="relative aspect-[4/3] bg-pink-50 overflow-hidden">
                  <img
                    src={theme.previewImage}
                    alt={theme.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Swatch chips on card */}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm border border-white/60 flex items-center gap-1.5">
                    {Array.isArray(theme.colorSwatches) &&
                      theme.colorSwatches.map((hex, i) => (
                        <span
                          key={i}
                          className="w-3 h-3 rounded-full border border-black/10"
                          style={{ backgroundColor: hex }}
                          title={hex}
                        />
                      ))}
                  </div>

                  {theme.isPopular && (
                    <span className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-sm">
                      Populer
                    </span>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-5 flex flex-col flex-1">
                  <div className="flex items-center justify-between text-[11px] text-gray-400 font-medium mb-1.5">
                    <span className="capitalize">{theme.category}</span>
                    <span className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-600 font-semibold">
                      {theme.subCategory}
                    </span>
                  </div>

                  <h3
                    className="font-serif-luxury text-base sm:text-lg font-bold text-[#5c2a33] line-clamp-1 mb-4"
                    title={theme.name}
                  >
                    {theme.name}
                  </h3>

                  {/* Action Buttons */}
                  <div className="mt-auto grid grid-cols-2 gap-2 pt-2 border-t border-gray-100">
                    <Link
                      href={`/theme/${theme.slug}`}
                      className="inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-xl text-[#914853] bg-pink-50 hover:bg-pink-100 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview</span>
                    </Link>

                    <Link
                      href={`/register?theme=${theme.slug}`}
                      className="inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-xl text-white bg-[#914853] hover:bg-[#7a3a44] transition-colors shadow-sm"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Pakai</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-gray-200">
            <p className="text-gray-500 text-sm">
              Tidak ada tema yang cocok dengan filter yang dipilih.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedEventType("all");
                setSelectedSubCategory("all");
                setSelectedColorFamily("all");
                setSearchQuery("");
              }}
              className="mt-3 px-4 py-2 rounded-xl text-xs font-semibold text-[#914853] bg-pink-50 hover:bg-pink-100"
            >
              Reset Semua Filter
            </button>
          </div>
        )}

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="p-2 rounded-xl border border-gray-200 bg-white text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-pink-50 hover:text-[#914853] transition-colors"
              aria-label="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                type="button"
                onClick={() => handlePageChange(page)}
                className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                  currentPage === page
                    ? "bg-[#914853] text-white shadow-md shadow-[#914853]/25"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-[#914853] hover:text-[#914853]"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className="p-2 rounded-xl border border-gray-200 bg-white text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-pink-50 hover:text-[#914853] transition-colors"
              aria-label="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
