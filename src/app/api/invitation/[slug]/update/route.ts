import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await req.json();

    const invitation = await prisma.invitation.findUnique({
      where: { slug },
      include: { events: true, envelopes: true },
    });

    if (!invitation) {
      return NextResponse.json(
        { error: "Undangan tidak ditemukan" },
        { status: 404 }
      );
    }

    // Update main fields
    const updated = await prisma.invitation.update({
      where: { id: invitation.id },
      data: {
        title: body.title || invitation.title,
        themeId: body.themeId || invitation.themeId,
        groomName: body.groomName,
        groomShortName: body.groomShortName,
        groomParents: body.groomParents,
        groomInstagram: body.groomInstagram,
        groomPhoto: body.groomPhoto,
        brideName: body.brideName,
        brideShortName: body.brideShortName,
        brideParents: body.brideParents,
        brideInstagram: body.brideInstagram,
        bridePhoto: body.bridePhoto,
        musicTitle: body.musicTitle,
        musicUrl: body.musicUrl,
        quotes: body.quotes,
        dresscode: body.dresscode,
      },
    });

    // Update first event if provided
    if (body.event && invitation.events.length > 0) {
      const firstEvent = invitation.events[0];
      await prisma.invitationEvent.update({
        where: { id: firstEvent.id },
        data: {
          title: body.event.title || firstEvent.title,
          date: body.event.date ? new Date(body.event.date) : firstEvent.date,
          startTime: body.event.startTime || firstEvent.startTime,
          venueName: body.event.venueName || firstEvent.venueName,
          venueAddress: body.event.venueAddress || firstEvent.venueAddress,
          mapUrl: body.event.mapUrl || firstEvent.mapUrl,
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Perubahan undangan berhasil disimpan!",
      data: updated,
    });
  } catch (error) {
    console.error("Update invitation error:", error);
    return NextResponse.json(
      { error: "Gagal menyimpan perubahan undangan" },
      { status: 500 }
    );
  }
}
