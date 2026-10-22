import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await req.json();
    const { name, attendance, pax, message, guestSlug } = body;

    if (!name || !message) {
      return NextResponse.json(
        { error: "Nama dan ucapan wajib diisi" },
        { status: 400 }
      );
    }

    const invitation = await prisma.invitation.findUnique({
      where: { slug },
    });

    if (!invitation) {
      return NextResponse.json(
        { error: "Undangan tidak ditemukan" },
        { status: 404 }
      );
    }

    // Save message to GuestbookMessage
    const newMessage = await prisma.guestbookMessage.create({
      data: {
        invitationId: invitation.id,
        name,
        attendance: attendance || "HADIR",
        message,
      },
    });

    // If guestSlug or name matches an existing guest, update attendance
    if (guestSlug) {
      await prisma.guest.updateMany({
        where: {
          invitationId: invitation.id,
          slug: guestSlug,
        },
        data: {
          isAttending: attendance || "HADIR",
          pax: pax || 1,
        },
      });
    }

    return NextResponse.json({ success: true, data: newMessage });
  } catch (error) {
    console.error("RSVP error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server saat menyimpan RSVP" },
      { status: 500 }
    );
  }
}
