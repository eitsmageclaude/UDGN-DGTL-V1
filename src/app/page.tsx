import React from "react";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeatureHighlights from "@/components/FeatureHighlights";
import ThemeCatalog from "@/components/ThemeCatalog";
import PricingSection from "@/components/PricingSection";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
export const dynamic = "force-dynamic";

export default async function HomePage() {
  // Query themes from MySQL via Prisma
  const rawThemes = await prisma.theme.findMany({
    where: { isActive: true },
    orderBy: [{ isPopular: "desc" }, { createdAt: "asc" }],
  });

  const themes = rawThemes.map((t) => ({
    id: t.id,
    name: t.name,
    slug: t.slug,
    category: t.category,
    subCategory: t.subCategory,
    previewImage: t.previewImage,
    colorSwatches: (t.colorSwatches as string[]) || ["#914853", "#7a3a44"],
    colorFamily: t.colorFamily,
    isPopular: t.isPopular,
    isFreeTrial: t.isFreeTrial,
  }));

  // Query packages from MySQL via Prisma
  const rawPackages = await prisma.package.findMany({
    orderBy: { price: "asc" },
  });

  const packages = rawPackages.map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    originalPrice: p.originalPrice,
    price: p.price,
    activeDays: p.activeDays,
    maxPhotos: p.maxPhotos,
    maxBlast: p.maxBlast,
    maxEvents: p.maxEvents,
    isPopular: p.isPopular,
    isUnlimited: p.isUnlimited,
    category: p.category,
    features: (p.features as string[]) || [],
  }));

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f8]">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeatureHighlights />
        <ThemeCatalog initialThemes={themes} />
        <PricingSection packages={packages} />
        <FaqSection />
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
}
