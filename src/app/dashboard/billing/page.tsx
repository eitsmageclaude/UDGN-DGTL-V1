import React from "react";
import { prisma } from "@/lib/prisma";
import BillingClient from "./BillingClient";

export const metadata = {
  title: "Paket & Tagihan - Satu Cerita",
};

export const dynamic = "force-dynamic";

export default async function BillingPage() {
  const invitation = await prisma.invitation.findFirst({
    where: { slug: "ananda-bella" },
    include: {
      package: true,
      orders: {
        include: { package: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  const packages = await prisma.package.findMany({
    orderBy: { price: "asc" },
  });

  return (
    <BillingClient
      currentPackage={invitation?.package}
      invitationSlug={invitation?.slug || "ananda-bella"}
      activeUntil={invitation?.activeUntil}
      packages={packages}
      orders={invitation?.orders || []}
    />
  );
}
