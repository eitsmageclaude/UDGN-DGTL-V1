import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const invitation = await prisma.invitation.findUnique({
      where: { slug },
      include: {
        guests: {
          where: { checkedIn: true },
          orderBy: { checkedInAt: "desc" },
          take: 15,
        },
      },
    });

    if (!invitation) {
      return NextResponse.json(
        { error: "Undangan tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      guests: invitation.guests,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Gagal memuat status kehadiran" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await req.json();
    const { guestId, qrData, guestSlug } = body;

    const invitation = await prisma.invitation.findUnique({
      where: { slug },
    });

    if (!invitation) {
      return NextResponse.json(
        { error: "Undangan tidak ditemukan" },
        { status: 404 }
      );
    }

    let parsedSlug = guestSlug;
    if (qrData && qrData.startsWith("GUEST:")) {
      // Format GUEST:invitationSlug:guestSlug
      const parts = qrData.split(":");
      if (parts.length >= 3) {
        parsedSlug = parts[2];
      }
    }

    // Find the guest
    let guest = null;
    if (guestId) {
      guest = await prisma.guest.findFirst({
        where: { id: guestId, invitationId: invitation.id },
      });
    } else if (parsedSlug) {
      guest = await prisma.guest.findFirst({
        where: { slug: parsedSlug, invitationId: invitation.id },
      });
    }

    if (!guest) {
      return NextResponse.json(
        { error: "Tamu tidak terdaftar pada acara ini" },
        { status: 404 }
      );
    }

    // Mark as checked in
    const updated = await prisma.guest.update({
      where: { id: guest.id },
      data: {
        checkedIn: true,
        checkedInAt: new Date(),
        isAttending: "HADIR",
      },
    });

    return NextResponse.json({
      success: true,
      message: `Tamu ${updated.name} berhasil check-in!`,
      guest: updated,
    });
  } catch (err) {
    console.error("Check-in error:", err);
    return NextResponse.json(
      { error: "Gagal memproses check-in tamu" },
      { status: 500 }
    );
  }
}
