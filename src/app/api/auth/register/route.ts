import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, password, partnerCode, website } = body;

    // Honeypot bot protection
    if (website && website.trim() !== "") {
      return NextResponse.json({ error: "Permintaan ditolak" }, { status: 400 });
    }

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Nama, email, dan kata sandi wajib diisi" },
        { status: 400 }
      );
    }

    // Check existing email
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Alamat email sudah terdaftar. Silakan gunakan menu Masuk." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        phone: phone || null,
        password: hashedPassword,
        role: "USER",
      },
    });

    // Automatically assign a starter free package invitation draft
    const freePackage = await prisma.package.findFirst({
      where: { slug: "free" },
    });
    const defaultTheme = await prisma.theme.findFirst({
      where: { isActive: true },
    });

    if (freePackage && defaultTheme) {
      const slugCandidate = `${name.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${Math.floor(
        1000 + Math.random() * 9000
      )}`;

      await prisma.invitation.create({
        data: {
          slug: slugCandidate,
          userId: newUser.id,
          themeId: defaultTheme.id,
          packageId: freePackage.id,
          title: `Undangan ${name}`,
          groomName: name,
          groomShortName: name.split(" ")[0] || name,
          brideName: "Pasangan",
          brideShortName: "Pasangan",
          status: "DRAFT",
          activeUntil: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days for free
        },
      });
    }

    const response = NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    });

    // Session cookie
    response.cookies.set(
      "auth_session",
      JSON.stringify({ userId: newUser.id, role: newUser.role }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      }
    );

    return response;
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server saat mendaftar" },
      { status: 500 }
    );
  }
}
