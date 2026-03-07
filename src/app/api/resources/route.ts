import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    const where: Record<string, unknown> = { isActive: true };
    if (category && category !== "all") {
      where.category = category;
    }

    const pdfs = await prisma.publicPdf.findMany({
      where,
      orderBy: { uploadedAt: "desc" },
    });
    return NextResponse.json(pdfs);
  } catch (error) {
    console.error("Error fetching resources:", error);
    return NextResponse.json(
      { error: "Failed to fetch resources" },
      { status: 500 }
    );
  }
}
