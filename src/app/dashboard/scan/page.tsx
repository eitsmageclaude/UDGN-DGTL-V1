import React from "react";
import { prisma } from "@/lib/prisma";
import QrScannerClient from "./QrScannerClient";

export const metadata = {
  title: "QR Scanner Tamu Resepsi - Satu Cerita",
};

export const dynamic = "force-dynamic";

export default async function ScanPage() {
  const invitation = await prisma.invitation.findFirst({
    where: { slug: "ananda-bella" },
    include: {
      guests: { orderBy: { name: "asc" } },
    },
  });

  return (
    <QrScannerClient
      invitationSlug={invitation?.slug || "ananda-bella"}
      guests={invitation?.guests || []}
    />
  );
}
