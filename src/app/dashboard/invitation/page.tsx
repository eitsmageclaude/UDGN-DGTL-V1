import React from "react";
import { prisma } from "@/lib/prisma";
import InvitationEditorClient from "./InvitationEditorClient";

export const metadata = {
  title: "Edit Undangan - Satu Cerita",
};

export const dynamic = "force-dynamic";

export default async function InvitationEditorPage() {
  const invitation = await prisma.invitation.findFirst({
    where: { slug: "ananda-bella" },
    include: {
      theme: true,
      package: true,
      events: { orderBy: { order: "asc" } },
      photos: { orderBy: { order: "asc" } },
      envelopes: true,
    },
  });

  const allThemes = await prisma.theme.findMany({
    where: { isActive: true },
  });

  return (
    <InvitationEditorClient
      initialInvitation={invitation}
      themes={allThemes}
    />
  );
}
