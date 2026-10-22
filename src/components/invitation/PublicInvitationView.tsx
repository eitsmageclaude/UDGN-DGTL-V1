"use client";

import React, { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import {
  Heart,
  Volume2,
  VolumeX,
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  Copy,
  Check,
  Send,
  Sparkles,
  QrCode,
  Camera,
  X,
  ChevronRight,
  MessageSquare,
  Video,
  Share2,
  Users,
  BookOpen,
  Shirt,
} from "lucide-react";

interface PublicInvitationViewProps {
  invitation: any;
  guestName?: string;
  guestSlug?: string;
  isPreviewMode?: boolean;
}

export default function PublicInvitationView({
  invitation,
  guestName = "Tamu Undangan",
  guestSlug = "",
  isPreviewMode = false,
}: PublicInvitationViewProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [copiedBank, setCopiedBank] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  // RSVP Form State
  const [rsvpName, setRsvpName] = useState(guestName !== "Tamu Undangan" ? guestName : "");
  const [rsvpAttendance, setRsvpAttendance] = useState("HADIR");
  const [rsvpPax, setRsvpPax] = useState(1);
  const [rsvpMessage, setRsvpMessage] = useState("");
  const [rsvpSubmitting, setRsvpSubmitting] = useState(false);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [messages, setMessages] = useState(invitation.messages || []);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Countdown timer
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const eventDate =
    invitation.events && invitation.events.length > 0
      ? new Date(invitation.events[0].date).getTime()
      : new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).getTime();

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = eventDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [eventDate]);

  // Open invitation handler
  const handleOpenInvitation = () => {
    setIsOpen(true);
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // browser autoplay restrictions handled gracefully
          setIsPlaying(false);
        });
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleCopyAccount = (bankName: string, number: string) => {
    navigator.clipboard.writeText(number);
    setCopiedBank(bankName);
    setTimeout(() => setCopiedBank(null), 3000);
  };

  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim() || !rsvpMessage.trim()) return;

    setRsvpSubmitting(true);
    try {
      if (!isPreviewMode) {
        const res = await fetch(`/api/invitation/${invitation.slug}/rsvp`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: rsvpName,
            attendance: rsvpAttendance,
            pax: Number(rsvpPax),
            message: rsvpMessage,
            guestSlug,
          }),
        });
        if (res.ok) {
          const newMsg = await res.json();
          setMessages([newMsg.data, ...messages]);
        }
      } else {
        // Preview mode mock push
        setMessages([
          {
            id: `msg-${Date.now()}`,
            name: rsvpName,
            attendance: rsvpAttendance,
            message: rsvpMessage,
            createdAt: new Date().toISOString(),
          },
          ...messages,
        ]);
      }

      setRsvpSubmitted(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.7 },
      });
    } catch (err) {
      console.error(err);
    } finally {
      setRsvpSubmitting(false);
    }
  };

  const themeSlug = invitation.theme?.slug || "rosegold-serenade";
  const isSereneBloom = themeSlug === "serene-bloom";
  const isSecretGarden = themeSlug === "secret-garden";
  const isVeluraNoire = themeSlug === "velura-noire";

  // Dynamic theme colors
  const primaryColor = isSereneBloom
    ? "#623535"
    : isSecretGarden
    ? "#774B53"
    : isVeluraNoire
    ? "#C5A059"
    : "#5c2a33";

  const accentColor = isSereneBloom
    ? "#A08166"
    : isSecretGarden
    ? "#9A6E76"
    : isVeluraNoire
    ? "#9C7A3C"
    : "#914853";

  const firstEvent = invitation.events && invitation.events[0];
  const formattedDate = firstEvent
    ? new Date(firstEvent.date).toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Sabtu, 08 November 2026";

  return (
    <div
      className={`relative min-h-screen text-gray-800 font-sans ${
        isSereneBloom
          ? "bg-[#FFF8F0]"
          : isSecretGarden
          ? "bg-[#F7F4F0]"
          : isVeluraNoire
          ? "bg-[#141414] text-gray-100"
          : "bg-[#faf5f6]"
      }`}
      style={
        {
          "--theme-primary": primaryColor,
          "--theme-accent": accentColor,
        } as React.CSSProperties
      }
    >
      {/* Background Audio */}
      {invitation.musicUrl && (
        <audio ref={audioRef} src={invitation.musicUrl} loop preload="auto" />
      )}

      {/* Floating Music Control Button */}
      {isOpen && invitation.musicUrl && (
        <button
          type="button"
          onClick={toggleMusic}
          aria-label={isPlaying ? "Jeda Musik" : "Putar Musik"}
          className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full backdrop-blur-md text-white shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all border border-white/30"
          style={{ backgroundColor: primaryColor }}
        >
          {isPlaying ? (
            <Volume2 className="w-5 h-5 animate-pulse text-pink-200" />
          ) : (
            <VolumeX className="w-5 h-5 text-gray-300" />
          )}
        </button>
      )}

      {/* OPENING COVER MODAL */}
      {!isOpen && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 text-white overflow-hidden ${
            isSereneBloom
              ? "bg-gradient-to-br from-[#4a2629] via-[#623535] to-[#261315]"
              : isSecretGarden
              ? "bg-gradient-to-br from-[#2b3a2e] via-[#4d3a3f] to-[#1c241e]"
              : isVeluraNoire
              ? "bg-gradient-to-br from-[#1a1a1a] via-[#242424] to-[#0d0d0d]"
              : "bg-gradient-to-br from-[#411b22] via-[#5c2a33] to-[#240e13]"
          }`}
        >
          {/* Background Image / Blur */}
          {invitation.coverImage && (
            <div
              className="absolute inset-0 bg-cover bg-center opacity-30 scale-105 filter blur-sm transition-transform duration-1000"
              style={{ backgroundImage: `url(${invitation.coverImage})` }}
            />
          )}

          {/* Decorative SVG Flowers / Leaves */}
          <div className="absolute -top-20 -left-20 w-80 h-80 opacity-20 pointer-events-none text-[#d8a3ac] animate-sway">
            <svg viewBox="0 0 200 200" fill="currentColor" className="w-full h-full">
              <path d="M100 10 C60 40, 30 90, 40 140 C55 180, 100 190, 100 190 C100 190, 145 180, 160 140 C170 90, 140 40, 100 10 Z" />
            </svg>
          </div>

          <div className="relative z-10 max-w-lg w-full text-center space-y-6 px-4">
            {/* Flourish top badge */}
            <div className="flex items-center justify-center gap-3">
              <span className="w-8 h-[1px] bg-pink-200/40" />
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-pink-200">
                {isSereneBloom
                  ? "Vintage Floral Romance"
                  : isSecretGarden
                  ? "Botanical Garden Celebration"
                  : "The Wedding Celebration"}
              </span>
              <span className="w-8 h-[1px] bg-pink-200/40" />
            </div>

            <h1 className="font-serif-luxury text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              {invitation.groomShortName || "Ananda"} &{" "}
              {invitation.brideShortName || "Bella"}
            </h1>

            <p className="text-sm font-light text-pink-100/90 tracking-wide">
              {formattedDate}
            </p>

            {/* Guest Personalization Box */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 max-w-sm mx-auto shadow-xl">
              <p className="text-xs text-pink-200 uppercase tracking-widest font-medium mb-1">
                Kepada Yth. Bapak/Ibu/Saudara/i:
              </p>
              <h2 className="font-serif-luxury text-xl font-bold text-white tracking-wide">
                {guestName}
              </h2>
              <p className="text-[11px] text-pink-100/70 mt-1 italic">
                *Mohon maaf bila ada kesalahan penulisan nama/gelar
              </p>
            </div>

            {/* Open Button */}
            <button
              type="button"
              onClick={handleOpenInvitation}
              className="btn-rosegold sheen-overlay px-8 py-3.5 rounded-full text-sm font-bold tracking-wide uppercase shadow-2xl flex items-center justify-center gap-2 mx-auto hover:scale-105 active:scale-95 transition-all"
              style={
                isSereneBloom
                  ? { background: "linear-gradient(135deg, #7A3A44 0%, #623535 50%, #A08166 100%)" }
                  : isSecretGarden
                  ? { background: "linear-gradient(135deg, #774B53 0%, #9A6E76 50%, #1C402E 100%)" }
                  : undefined
              }
            >
              <Sparkles className="w-4 h-4 text-pink-200" />
              <span>Buka Undangan</span>
            </button>
          </div>
        </div>
      )}

      {/* INVITATION CONTENT (Revealed after opening) */}
      <div className={`transition-opacity duration-700 ${isOpen ? "opacity-100" : "opacity-0"}`}>
        {/* HERO SECTION */}
        <section className="relative min-h-[90vh] flex items-center justify-center text-center p-6 bg-gradient-to-b from-[#5c2a33] to-[#7a3a44] text-white overflow-hidden">
          {invitation.coverImage && (
            <div
              className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
              style={{ backgroundImage: `url(${invitation.coverImage})` }}
            />
          )}

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="text-xs uppercase tracking-[0.3em] font-medium text-pink-200">
              Walimatul 'Ursy
            </span>
            <h1 className="font-serif-luxury text-4xl sm:text-6xl font-bold text-white tracking-tight">
              {invitation.groomShortName || "Ananda"} &{" "}
              {invitation.brideShortName || "Bella"}
            </h1>
            <p className="text-sm sm:text-base font-light text-pink-100">
              {formattedDate}
            </p>

            {/* Countdown Box */}
            <div className="pt-6">
              <div className="grid grid-cols-4 gap-2.5 sm:gap-4 max-w-sm mx-auto">
                {[
                  { label: "Hari", value: timeLeft.days },
                  { label: "Jam", value: timeLeft.hours },
                  { label: "Menit", value: timeLeft.minutes },
                  { label: "Detik", value: timeLeft.seconds },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white/15 backdrop-blur-md rounded-2xl p-3 border border-white/20 text-center shadow-lg"
                  >
                    <span className="block text-2xl sm:text-3xl font-extrabold text-white">
                      {String(item.value).padStart(2, "0")}
                    </span>
                    <span className="block text-[10px] sm:text-xs uppercase tracking-wider text-pink-200 font-medium mt-0.5">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* QUOTES SECTION */}
        {invitation.quotes && (
          <section className="py-16 px-6 bg-[#fdf2f4] text-center border-b border-pink-100">
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="w-8 h-8 rounded-full bg-pink-100 text-[#914853] flex items-center justify-center mx-auto mb-2">
                <Heart className="w-4 h-4 fill-current" />
              </div>
              <p className="font-cormorant text-lg sm:text-xl italic text-[#5c2a33] leading-relaxed whitespace-pre-line">
                "{invitation.quotes}"
              </p>
            </div>
          </section>
        )}

        {/* BRIDE & GROOM PROFILE */}
        <section className="py-20 px-6 max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-[#914853] font-bold">
              Mempelai Bahagia
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#5c2a33] mt-1">
              Kedua Mempelai
            </h2>
            <p className="text-sm text-gray-600 mt-2 max-w-md mx-auto">
              Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan pernikahan putra-putri kami:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Groom */}
            <div className="bg-white rounded-3xl p-8 border border-pink-100 shadow-sm text-center space-y-4 hover:shadow-lg transition-shadow">
              <div className="w-40 h-40 mx-auto rounded-full p-2 bg-gradient-to-tr from-[#914853] to-pink-200 shadow-md overflow-hidden">
                <img
                  src={
                    invitation.groomPhoto ||
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"
                  }
                  alt={invitation.groomName || "Groom"}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              <h3 className="font-serif-luxury text-2xl font-bold text-[#5c2a33]">
                {invitation.groomName || "Ananda Pratama, S.T."}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {invitation.groomParents ||
                  "Putra pertama dari Bpk. Bambang Wijaya & Ibu Endang"}
              </p>

              {invitation.groomInstagram && (
                <a
                  href={`https://instagram.com/${invitation.groomInstagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#914853] hover:underline"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>@{invitation.groomInstagram}</span>
                </a>
              )}
            </div>

            {/* Bride */}
            <div className="bg-white rounded-3xl p-8 border border-pink-100 shadow-sm text-center space-y-4 hover:shadow-lg transition-shadow">
              <div className="w-40 h-40 mx-auto rounded-full p-2 bg-gradient-to-tr from-[#914853] to-pink-200 shadow-md overflow-hidden">
                <img
                  src={
                    invitation.bridePhoto ||
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80"
                  }
                  alt={invitation.brideName || "Bride"}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              <h3 className="font-serif-luxury text-2xl font-bold text-[#5c2a33]">
                {invitation.brideName || "Bella Puspita Sari, S.Farm."}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {invitation.brideParents ||
                  "Putri kedua dari Bpk. H. Suryadi & Ibu Hj. Ratna"}
              </p>

              {invitation.brideInstagram && (
                <a
                  href={`https://instagram.com/${invitation.brideInstagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#914853] hover:underline"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>@{invitation.brideInstagram}</span>
                </a>
              )}
            </div>
          </div>
        </section>

        {/* EVENTS SCHEDULE SECTION */}
        <section className="py-20 px-6 bg-[#fdf2f4] border-y border-pink-100">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <span className="text-xs uppercase tracking-widest text-[#914853] font-bold">
                Rangkaian Acara
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#5c2a33] mt-1">
                Agenda & Lokasi
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {invitation.events && invitation.events.length > 0 ? (
                invitation.events.map((evt: any, i: number) => {
                  const evtFormatted = new Date(evt.date).toLocaleDateString(
                    "id-ID",
                    {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  );
                  return (
                    <div
                      key={evt.id || i}
                      className="bg-white rounded-3xl p-7 border border-pink-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                    >
                      <div className="space-y-4">
                        <div className="w-10 h-10 rounded-xl bg-pink-100 text-[#914853] flex items-center justify-center font-serif-luxury font-bold text-lg">
                          0{i + 1}
                        </div>
                        <h3 className="font-serif-luxury text-2xl font-bold text-[#5c2a33]">
                          {evt.title}
                        </h3>

                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-[#914853]" />
                            <span>{evtFormatted}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-[#914853]" />
                            <span>
                              {evt.startTime}{" "}
                              {evt.endTime ? `- ${evt.endTime}` : ""}
                            </span>
                          </div>
                          <div className="flex items-start gap-2 pt-1">
                            <MapPin className="w-4 h-4 text-[#914853] shrink-0 mt-0.5" />
                            <div>
                              <strong className="block text-gray-800">
                                {evt.venueName}
                              </strong>
                              <span className="text-xs text-gray-500">
                                {evt.venueAddress}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {evt.mapUrl && (
                        <div className="mt-6 pt-4 border-t border-gray-100">
                          <a
                            href={evt.mapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-rosegold w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5"
                          >
                            <MapPin className="w-3.5 h-3.5" />
                            <span>Buka Google Maps</span>
                          </a>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="text-center col-span-2 text-gray-500 text-sm">
                  Informasi acara akan segera diperbarui.
                </div>
              )}
            </div>
          </div>
        </section>

        {/* PHOTO GALLERY LIGHTBOX */}
        {invitation.photos && invitation.photos.length > 0 && (
          <section className="py-20 px-6 max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <span className="text-xs uppercase tracking-widest text-[#914853] font-bold">
                Momen Indah
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#5c2a33] mt-1">
                Galeri Pre-Wedding
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {invitation.photos.map((photo: any, i: number) => (
                <div
                  key={photo.id || i}
                  onClick={() => setSelectedPhoto(photo.url)}
                  className="aspect-[3/4] rounded-2xl overflow-hidden bg-pink-100 cursor-pointer group relative shadow-sm hover:shadow-md"
                >
                  <img
                    src={photo.url}
                    alt={photo.caption || "Gallery photo"}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <Sparkles className="w-6 h-6" />
                  </div>
                </div>
              ))}
            </div>

            {/* Lightbox Modal */}
            {selectedPhoto && (
              <div
                onClick={() => setSelectedPhoto(null)}
                className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
              >
                <div className="relative max-w-3xl max-h-[90vh]">
                  <button
                    type="button"
                    onClick={() => setSelectedPhoto(null)}
                    className="absolute -top-10 right-0 text-white p-2 hover:text-pink-300"
                  >
                    <X className="w-6 h-6" />
                  </button>
                  <img
                    src={selectedPhoto}
                    alt="Preview"
                    className="max-h-[85vh] w-auto rounded-2xl object-contain shadow-2xl"
                  />
                </div>
              </div>
            )}
          </section>
        )}

        {/* DRESSCODE SECTION (From tamplate undngan.txt) */}
        <section
          className="py-16 px-6 text-center border-t border-pink-100"
          style={{
            backgroundColor: isSecretGarden
              ? "#9A6E76"
              : isSereneBloom
              ? "#623535"
              : "#7a3a44",
            color: "#ffffff",
          }}
        >
          <div className="max-w-xl mx-auto space-y-4">
            <div className="w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center mx-auto mb-2">
              <Shirt className="w-5 h-5" />
            </div>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold uppercase tracking-wider text-white">
              Dresscode Tamu
            </h2>
            <p className="text-xs sm:text-sm text-pink-100/90 max-w-sm mx-auto leading-relaxed">
              Merupakan suatu kehormatan apabila Bapak/Ibu/Saudara/i dapat mengenakan busana yang senada dengan palet warna hari bahagia kami.
            </p>

            {/* Dresscode Palette Swatches */}
            <div className="flex flex-wrap justify-center gap-3 pt-3">
              {[
                { hex: "#F5E6CA", label: "Alabaster Cream" },
                { hex: "#8C6A5D", label: "Warm Clay" },
                { hex: "#4A3C31", label: "Espresso" },
                { hex: "#D9A566", label: "Warm Gold" },
              ].map((color, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1.5">
                  <span
                    className="w-10 h-10 rounded-full border-2 border-white/50 shadow-md flex-shrink-0 hover:scale-110 transition-transform"
                    style={{ backgroundColor: color.hex }}
                    title={color.label}
                  />
                  <span className="text-[10px] text-pink-100/80 font-mono">
                    {color.hex}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LIVE STREAMING & INSTAGRAM STORY SECTION (From tamplate undngan.txt) */}
        <section className="py-16 px-6 bg-white border-t border-pink-100 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#914853] font-bold">
                Siaran Langsung
              </span>
              <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#5c2a33] mt-1">
                Virtual Wedding & Live Streaming
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-2 max-w-md mx-auto">
                Bagi kerabat dan sahabat yang berhalangan hadir secara langsung, Anda tetap dapat menyaksikan prosesi akad nikah kami secara virtual:
              </p>
            </div>

            {/* Streaming Links */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all"
                style={{
                  background:
                    "linear-gradient(135deg, #FF0000 0%, #CC0000 100%)",
                }}
              >
                <Video className="w-3.5 h-3.5" />
                <span>Live YouTube</span>
              </a>

              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all bg-[#010101]"
              >
                <Video className="w-3.5 h-3.5" />
                <span>Live TikTok</span>
              </a>

              <a
                href="https://zoom.us"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all bg-[#2D8CFF]"
              >
                <Video className="w-3.5 h-3.5" />
                <span>Zoom Room</span>
              </a>
            </div>

            {/* Instagram Story Share Banner */}
            <div className="bg-[#FAF5F6] rounded-2xl p-6 border border-pink-100 max-w-xl mx-auto text-center space-y-3">
              <div className="w-8 h-8 rounded-full bg-pink-100 text-[#914853] flex items-center justify-center mx-auto">
                <Camera className="w-4 h-4" />
              </div>
              <h3 className="font-serif-luxury text-lg font-bold text-[#5c2a33]">
                Bagikan ke Instagram Story
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed max-w-md mx-auto">
                Abadikan momen bahagiamu dan gunakan tagar{" "}
                <strong className="text-[#914853]">#AnandaBellaStory</strong>{" "}
                lalu mention akun kami agar dapat kami repost di hari pernikahan.
              </p>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2 rounded-full text-white text-xs font-bold shadow-md hover:scale-105 transition-all"
                style={{
                  background:
                    "linear-gradient(45deg, #F58529, #DD2A7B, #8134AF, #515BD4)",
                }}
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Buat Story Instagram</span>
              </a>
            </div>
          </div>
        </section>

        {/* ADAB WALIMAH & TURUT MENGUNDANG (From tamplate undngan.txt) */}
        <section className="py-16 px-6 bg-[#fdf2f4] border-t border-pink-100">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Adab Walimah */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-pink-100 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-[#914853] text-xs font-bold uppercase tracking-wider">
                <BookOpen className="w-4 h-4" />
                <span>Adab Menghadiri Walimah</span>
              </div>
              <h3 className="font-serif-luxury text-xl font-bold text-[#5c2a33]">
                Panduan Menjaga Keberkahan
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-[#914853] font-bold">✔</span>
                  <span>Mendoakan kebaikan bagi kedua mempelai saat bersalaman.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#914853] font-bold">✔</span>
                  <span>Makan dan minum sambil duduk serta membaca basmalah.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#914853] font-bold">✔</span>
                  <span>Menjaga kesantunan busana dan ketertiban selama acara.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#914853] font-bold">✔</span>
                  <span>Mengutamakan protokol kesehatan demi kenyamanan bersama.</span>
                </li>
              </ul>
            </div>

            {/* Turut Mengundang */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-pink-100 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-[#914853] text-xs font-bold uppercase tracking-wider">
                <Users className="w-4 h-4" />
                <span>Keluarga Besar</span>
              </div>
              <h3 className="font-serif-luxury text-xl font-bold text-[#5c2a33]">
                Turut Mengundang
              </h3>
              <div className="space-y-2 text-xs sm:text-sm text-gray-700 leading-relaxed">
                <p>Keluarga Besar Mempelai Pria:</p>
                <p className="font-semibold text-gray-900 pl-3 border-l-2 border-[#914853]/40">
                  Bpk. Bambang Wijaya & Ibu Endang beserta segenap keluarga besar
                </p>
                <p className="pt-2">Keluarga Besar Mempelai Wanita:</p>
                <p className="font-semibold text-gray-900 pl-3 border-l-2 border-[#914853]/40">
                  Bpk. H. Suryadi & Ibu Hj. Ratna beserta segenap keluarga besar
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* DIGITAL ENVELOPE / WEDDING GIFT */}
        {invitation.envelopes && invitation.envelopes.length > 0 && (
          <section className="py-20 px-6 bg-[#fdf2f4] border-t border-pink-100">
            <div className="max-w-2xl mx-auto text-center">
              <span className="text-xs uppercase tracking-widest text-[#914853] font-bold">
                Tanda Kasih
              </span>
              <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#5c2a33] mt-1 mb-3">
                Amplop Digital
              </h2>
              <p className="text-sm text-gray-600 mb-8 max-w-md mx-auto">
                Doa restu Anda merupakan karunia terindah bagi kami. Bagi Bapak/Ibu yang berkenan memberikan kado tanda kasih, dapat melalui:
              </p>

              <div className="space-y-4">
                {invitation.envelopes.map((env: any, idx: number) => (
                  <div
                    key={env.id || idx}
                    className="bg-white rounded-2xl p-6 border border-pink-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4"
                  >
                    <div className="text-left">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#914853] block">
                        {env.bankName}
                      </span>
                      <span className="font-mono text-lg font-bold text-gray-800 tracking-wider">
                        {env.accountNumber}
                      </span>
                      <span className="text-xs text-gray-500 block">
                        a/n {env.accountHolder}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        handleCopyAccount(env.bankName, env.accountNumber)
                      }
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-pink-50 text-[#914853] border border-pink-200 hover:bg-pink-100 flex items-center gap-1.5 transition-colors"
                    >
                      {copiedBank === env.bankName ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Berhasil Disalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Salin Nomor</span>
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* RSVP & GUESTBOOK SECTION */}
        <section className="py-20 px-6 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-[#914853] font-bold">
              Konfirmasi Kehadiran
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#5c2a33] mt-1">
              Buku Tamu & RSVP
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Mohon konfirmasikan kehadiran serta titipkan doa restu untuk kedua mempelai.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Form Column */}
            <div className="md:col-span-5 bg-white rounded-3xl p-7 border border-pink-100 shadow-sm">
              <form onSubmit={handleRsvpSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-600 mb-1">
                    Nama Anda
                  </label>
                  <input
                    type="text"
                    required
                    value={rsvpName}
                    onChange={(e) => setRsvpName(e.target.value)}
                    placeholder="Nama lengkap"
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[#914853] bg-gray-50 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-600 mb-1">
                    Konfirmasi Kehadiran
                  </label>
                  <select
                    value={rsvpAttendance}
                    onChange={(e) => setRsvpAttendance(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[#914853] bg-gray-50 focus:bg-white"
                  >
                    <option value="HADIR">Saya Pasti Hadir</option>
                    <option value="RAGU">Masih Ragu-ragu</option>
                    <option value="TIDAK_HADIR">Maaf, Tidak Bisa Hadir</option>
                  </select>
                </div>

                {rsvpAttendance === "HADIR" && (
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-600 mb-1">
                      Jumlah Tamu (Pax)
                    </label>
                    <select
                      value={rsvpPax}
                      onChange={(e) => setRsvpPax(Number(e.target.value))}
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[#914853] bg-gray-50 focus:bg-white"
                    >
                      <option value={1}>1 Orang</option>
                      <option value={2}>2 Orang</option>
                      <option value={3}>3 Orang</option>
                      <option value={4}>4 Orang</option>
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-600 mb-1">
                    Ucapan & Doa Restu
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={rsvpMessage}
                    onChange={(e) => setRsvpMessage(e.target.value)}
                    placeholder="Tulis ucapan selamat dan doa untuk mempelai..."
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-[#914853] bg-gray-50 focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={rsvpSubmitting}
                  className="btn-rosegold w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {rsvpSubmitting ? "Mengirim..." : "Kirim RSVP & Doa"}
                  </span>
                </button>

                {rsvpSubmitted && (
                  <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs text-center border border-emerald-200">
                    Terima kasih atas konfirmasi dan doa tulus Anda! ✨
                  </div>
                )}
              </form>
            </div>

            {/* Messages Stream Column */}
            <div className="md:col-span-7 bg-white rounded-3xl p-7 border border-pink-100 shadow-sm flex flex-col">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
                <h3 className="font-serif-luxury text-lg font-bold text-[#5c2a33] flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#914853]" />
                  <span>Untaian Doa ({messages.length})</span>
                </h3>
              </div>

              <div className="space-y-3.5 max-h-[460px] overflow-y-auto pr-1">
                {messages.length > 0 ? (
                  messages.map((msg: any, idx: number) => (
                    <div
                      key={msg.id || idx}
                      className="p-4 rounded-2xl bg-gray-50 border border-gray-100 text-xs sm:text-sm space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#5c2a33]">
                          {msg.name}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            msg.attendance === "HADIR"
                              ? "bg-emerald-100 text-emerald-700"
                              : msg.attendance === "TIDAK_HADIR"
                              ? "bg-rose-100 text-rose-700"
                              : "bg-amber-100 text-amber-700"
                          }`}
                        >
                          {msg.attendance === "HADIR"
                            ? "Hadir"
                            : msg.attendance === "TIDAK_HADIR"
                            ? "Berhalangan"
                            : "Ragu"}
                        </span>
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        {msg.message}
                      </p>
                      <span className="text-[10px] text-gray-400 block pt-1">
                        {new Date(msg.createdAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-center py-10 text-gray-400 text-xs">
                    Belum ada ucapan doa. Jadilah yang pertama memberikan doa restu!
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* GUEST QR CODE PASS (For Reception Desk Check-in) */}
        <section className="py-16 px-6 bg-[#fdf2f4] border-t border-pink-100 text-center">
          <div className="max-w-md mx-auto bg-white rounded-3xl p-8 border border-pink-200 shadow-md space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-[#914853] text-[11px] font-bold uppercase tracking-wider">
              <QrCode className="w-3.5 h-3.5" />
              <span>Tiket Check-in Tamu</span>
            </div>

            <h3 className="font-serif-luxury text-2xl font-bold text-[#5c2a33]">
              {guestName}
            </h3>

            <p className="text-xs text-gray-500">
              Tunjukkan kode QR ini kepada penerima tamu di meja resepsi untuk verifikasi kehadiran cepat tanpa mengantre.
            </p>

            <div className="w-48 h-48 mx-auto p-3 bg-white border-2 border-dashed border-[#914853]/40 rounded-2xl flex items-center justify-center">
              {/* QR Code image generated via quick chart / placeholder for demo pass */}
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                  `GUEST:${invitation.slug}:${guestSlug || "vip-guest"}`
                )}`}
                alt="Guest QR Pass"
                className="w-full h-full object-contain"
              />
            </div>

            <span className="text-[11px] text-[#914853] font-semibold block">
              ID Tamu: {guestSlug ? guestSlug.toUpperCase() : "INV-VIP-2026"}
            </span>
          </div>
        </section>

        {/* CLOSING FOOTER */}
        <footer className="py-12 px-6 text-center text-xs text-gray-500 bg-white border-t border-gray-100 space-y-2">
          <p className="font-serif-luxury text-lg font-bold text-[#5c2a33]">
            {invitation.groomShortName || "Ananda"} &{" "}
            {invitation.brideShortName || "Bella"}
          </p>
          <p>Terima kasih atas doa dan kehadiran Anda.</p>
          <p className="text-[10px] text-gray-400 pt-2">
            Created with Satu Cerita Invitation
          </p>
        </footer>
      </div>
    </div>
  );
}
