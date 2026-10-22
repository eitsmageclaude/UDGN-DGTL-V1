import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, category, pax, invitationSlug } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Nama tamu wajib diisi" },
        { status: 400 }
      );
    }

    const invitation = await prisma.invitation.findUnique({
      where: { slug: invitationSlug || "ananda-bella" },
    });

    if (!invitation) {
      return NextResponse.json(
        { error: "Undangan tidak ditemukan" },
        { status: 404 }
      );
    }

    const guestSlug = `${name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")}-${Math.floor(100 + Math.random() * 900)}`;

    const newGuest = await prisma.guest.create({
      data: {
        invitationId: invitation.id,
        name,
        phone: phone || null,
        slug: guestSlug,
        category: category || "Tamu",
        pax: pax ? Number(pax) : 1,
        isAttending: "PENDING",
      },
    });

    return NextResponse.json({ success: true, guest: newGuest });
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal menambahkan tamu" },
      { status: 500 }
    );
  }
}
