import React from "react";
import { prisma } from "@/lib/prisma";
import GuestManagerClient from "./GuestManagerClient";

export const metadata = {
  title: "Buku Tamu & RSVP - Satu Cerita",
};

export const dynamic = "force-dynamic";

export default async function GuestsPage() {
  const invitation = await prisma.invitation.findFirst({
    where: { slug: "ananda-bella" },
    include: {
      guests: { orderBy: { createdAt: "desc" } },
      package: true,
    },
  });

  return (
    <GuestManagerClient
      invitationSlug={invitation?.slug || "ananda-bella"}
      initialGuests={invitation?.guests || []}
      maxBlastQuota={invitation?.package.maxBlast || 100}
    />
  );
}
