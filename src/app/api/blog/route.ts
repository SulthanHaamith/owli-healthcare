import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const slug = searchParams.get("slug");

    if (slug) {
      const post = await prisma.blogPost.findUnique({
        where: { slug, isPublished: true },
      });
      if (!post) {
        return NextResponse.json(
          { error: "Post not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(post);
    }

    const where: Record<string, unknown> = { isPublished: true };
    if (category && category !== "all") {
      where.category = category;
    }

    const posts = await prisma.blogPost.findMany({
      where,
      orderBy: { publishedAt: "desc" },
      select: {
        id: true,
        title: true,
        titleTamil: true,
        slug: true,
        excerpt: true,
        excerptTamil: true,
        category: true,
        coverImage: true,
        publishedAt: true,
      },
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}
