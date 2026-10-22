import React from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import GuestOnScreenClient from "./GuestOnScreenClient";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function GuestOnScreenPage({ params }: Props) {
  const { slug } = await params;

  const invitation = await prisma.invitation.findUnique({
    where: { slug },
    include: {
      guests: {
        where: { checkedIn: true },
        orderBy: { checkedInAt: "desc" },
        take: 10,
      },
    },
  });

  if (!invitation) {
    notFound();
  }

  return (
    <GuestOnScreenClient
      invitation={{
        id: invitation.id,
        slug: invitation.slug,
        title: invitation.title,
        groomName: invitation.groomName || "Ananda Pratama",
        brideName: invitation.brideName || "Bella Puspita",
        coverImage: invitation.coverImage,
      }}
      initialGuests={invitation.guests}
    />
  );
}
