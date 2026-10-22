import React from "react";
import { prisma } from "@/lib/prisma";
import BlastClient from "./BlastClient";

export const metadata = {
  title: "WhatsApp Blast Tamu - Satu Cerita",
};

export const dynamic = "force-dynamic";

export default async function BlastPage() {
  const invitation = await prisma.invitation.findFirst({
    where: { slug: "ananda-bella" },
    include: {
      package: true,
      guests: { orderBy: { name: "asc" } },
    },
  });

  return (
    <BlastClient
      invitationSlug={invitation?.slug || "ananda-bella"}
      groomBride={`${invitation?.groomShortName || "Ananda"} & ${invitation?.brideShortName || "Bella"}`}
      packageName={invitation?.package.name || "Gold"}
      maxQuota={invitation?.package.maxBlast || 100}
      guests={invitation?.guests || []}
    />
  );
}
