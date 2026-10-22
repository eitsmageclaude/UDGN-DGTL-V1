import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FaqSection from "@/components/FaqSection";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";

export const metadata = {
  title: "Tanya Jawab (FAQ) - Satu Cerita Undangan Digital",
  description:
    "Pertanyaan yang sering diajukan mengenai cara membuat undangan digital, paket harga, pembayaran, dan integrasi WhatsApp.",
};

export default function FaqPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f8]">
      <Navbar />
      <main className="flex-1 pt-28">
        <FaqSection />
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </div>
  );
}
