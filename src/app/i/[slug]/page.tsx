import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import PublicInvitationView from "@/components/invitation/PublicInvitationView";
import Link from "next/link";
import { Sparkles, Calendar, Heart } from "lucide-react";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ to?: string; g?: string }>;
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { to } = await searchParams;

  const invitation = await prisma.invitation.findUnique({
    where: { slug },
  });

  if (!invitation) {
    return { title: "Undangan Tidak Ditemukan" };
  }

  const guestTitle = to ? `Khusus untuk ${to} - ` : "";
  return {
    title: `${guestTitle}${invitation.title}`,
    description: `Website undangan pernikahan digital ${invitation.groomShortName} & ${invitation.brideShortName}. Buka untuk informasi jadwal, lokasi, galeri, dan RSVP.`,
    openGraph: {
      title: `${guestTitle}${invitation.title}`,
      description: `Undangan Pernikahan ${invitation.groomShortName} & ${invitation.brideShortName}`,
      images: invitation.coverImage ? [invitation.coverImage] : [],
    },
  };
}

export default async function PublicInvitationPage({
  params,
  searchParams,
}: Props) {
  const { slug } = await params;
  const { to, g } = await searchParams;

  const invitation = await prisma.invitation.findUnique({
    where: { slug },
    include: {
      theme: true,
      package: true,
      events: { orderBy: { order: "asc" } },
      photos: { orderBy: { order: "asc" } },
      envelopes: true,
      messages: { orderBy: { createdAt: "desc" } },
    },
  });

  if (!invitation) {
    notFound();
  }

  // Check if expired (PRD UP-8)
  const isExpired =
    invitation.status === "EXPIRED" ||
    (invitation.activeUntil && new Date(invitation.activeUntil) < new Date());

  if (isExpired) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-[#411b22] to-[#240e13] text-white text-center">
        <div className="max-w-md w-full bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-pink-500/20 text-pink-300 flex items-center justify-center mx-auto">
            <Heart className="w-7 h-7" />
          </div>
          <h1 className="font-serif-luxury text-3xl font-bold text-white">
            Masa Aktif Undangan Berakhir
          </h1>
          <p className="text-sm text-pink-100/80 leading-relaxed">
            Terima kasih atas segala doa restu dan kehadiran yang telah diberikan kepada{" "}
            <b>
              {invitation.groomShortName} & {invitation.brideShortName}
            </b>
            . Momen bahagia ini telah selesai diselenggarakan dengan penuh berkah.
          </p>
          <div className="pt-4 border-t border-white/10">
            <Link
              href="/"
              className="btn-rosegold inline-flex py-2.5 px-6 rounded-xl text-xs font-semibold"
            >
              Buat Undangan Sendiri di Satu Cerita
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Increment views count asynchronously
  try {
    await prisma.invitation.update({
      where: { id: invitation.id },
      data: { viewsCount: { increment: 1 } },
    });
  } catch (err) {
    // Non-critical background count
  }

  return (
    <PublicInvitationView
      invitation={invitation}
      guestName={to || "Tamu Undangan"}
      guestSlug={g || ""}
      isPreviewMode={false}
    />
  );
}
