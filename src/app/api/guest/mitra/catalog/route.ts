import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("type") || searchParams.get("category");
    const subCategory = searchParams.get("sub");
    const colorFamily = searchParams.get("color");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const perPage = parseInt(searchParams.get("perPage") || "8", 10);

    const where: any = { isActive: true };
    if (category && category !== "all") {
      where.category = category;
    }
    if (subCategory && subCategory !== "all") {
      where.subCategory = subCategory;
    }
    if (colorFamily && colorFamily !== "all") {
      where.colorFamily = colorFamily;
    }

    const [total, themes] = await Promise.all([
      prisma.theme.count({ where }),
      prisma.theme.findMany({
        where,
        skip: (page - 1) * perPage,
        take: perPage,
        orderBy: [{ isPopular: "desc" }, { createdAt: "asc" }],
      }),
    ]);

    return NextResponse.json({
      success: true,
      data: themes,
      meta: {
        page,
        perPage,
        total,
        totalPages: Math.ceil(total / perPage),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal mengambil katalog tema" },
      { status: 500 }
    );
  }
}
