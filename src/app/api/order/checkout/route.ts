import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { packageId, invitationSlug, paymentMethod } = body;

    const pkg = await prisma.package.findUnique({
      where: { id: packageId },
    });

    if (!pkg) {
      return NextResponse.json(
        { error: "Paket tidak ditemukan" },
        { status: 404 }
      );
    }

    const invitation = await prisma.invitation.findUnique({
      where: { slug: invitationSlug || "ananda-bella" },
      include: { user: true },
    });

    if (!invitation) {
      return NextResponse.json(
        { error: "Undangan tidak ditemukan" },
        { status: 404 }
      );
    }

    const orderNumber = `ORD-${Date.now().toString().slice(-8)}`;

    // Create Order
    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId: invitation.userId,
        invitationId: invitation.id,
        packageId: pkg.id,
        amount: pkg.price,
        status: "PAID", // Simulated instant payment
        paymentMethod: paymentMethod || "QRIS",
        paidAt: new Date(),
      },
    });

    // Automatically activate new package on invitation
    const newActiveUntil =
      pkg.activeDays >= 9999
        ? null
        : new Date(Date.now() + pkg.activeDays * 24 * 60 * 60 * 1000);

    await prisma.invitation.update({
      where: { id: invitation.id },
      data: {
        packageId: pkg.id,
        status: "PUBLISHED",
        activeUntil: newActiveUntil,
      },
    });

    return NextResponse.json({
      success: true,
      message: `Paket ${pkg.name} berhasil diaktifkan secara instan!`,
      order,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Gagal memproses pembayaran paket" },
      { status: 500 }
    );
  }
}
