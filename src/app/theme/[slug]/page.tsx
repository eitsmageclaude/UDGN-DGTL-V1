import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ThemePreviewClient from "./ThemePreviewClient";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ThemePreviewPage({ params }: Props) {
  const { slug } = await params;

  const theme = await prisma.theme.findUnique({
    where: { slug },
  });

  if (!theme) {
    notFound();
  }

  // Get sample demo invitation data to render inside theme preview
  const demoInvitation = await prisma.invitation.findFirst({
    where: { slug: "ananda-bella" },
    include: {
      events: true,
      photos: true,
      envelopes: true,
      messages: true,
    },
  });

  // Attach the active preview theme to the demo invitation
  const demoWithTheme = demoInvitation
    ? {
        ...demoInvitation,
        musicUrl: theme.musicUrl || demoInvitation.musicUrl,
        theme: {
          id: theme.id,
          name: theme.name,
          slug: theme.slug,
          colorSwatches: theme.colorSwatches,
          colorFamily: theme.colorFamily,
          fontFamily: theme.fontFamily,
        },
      }
    : null;

  return (
    <ThemePreviewClient
      theme={{
        id: theme.id,
        name: theme.name,
        slug: theme.slug,
        category: theme.category,
        subCategory: theme.subCategory,
        previewImage: theme.previewImage,
        colorSwatches: (theme.colorSwatches as string[]) || ["#914853", "#7a3a44", "#d8a3ac"],
        colorFamily: theme.colorFamily,
        description: theme.description || "",
        story: theme.story || "",
        bestFor: theme.bestFor || "",
        invitationCount: theme.invitationCount || 150,
        guestCount: theme.guestCount || 1800,
        musicUrl: theme.musicUrl || "",
        fontFamily: theme.fontFamily || "Playfair Display",
      }}
      demoData={demoWithTheme}
    />
  );
}
