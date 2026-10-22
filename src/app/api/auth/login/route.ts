import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password, website, form_time } = body;

    // Honeypot check (AU-5)
    if (website && website.trim() !== "") {
      return NextResponse.json({ error: "Permintaan ditolak" }, { status: 400 });
    }

    if (!username || !password) {
      return NextResponse.json(
        { error: "WhatsApp / Email dan kata sandi wajib diisi" },
        { status: 400 }
      );
    }

    // Find by email OR phone (WhatsApp)
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: username.toLowerCase() }, { phone: username }],
      },
      include: {
        partner: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Akun tidak ditemukan. Periksa kembali email atau nomor WhatsApp Anda." },
        { status: 401 }
      );
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { error: "Kata sandi yang Anda masukkan salah." },
        { status: 401 }
      );
    }

    // Set secure auth cookie
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });

    response.cookies.set("auth_session", JSON.stringify({ userId: user.id, role: user.role }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan internal pada server" },
      { status: 500 }
    );
  }
}
