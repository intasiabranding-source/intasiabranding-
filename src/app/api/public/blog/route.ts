import { NextResponse } from "next/server";
import { getPublicBlogPosts } from "@/lib/public-api/blog";

export async function GET() {
  try {
    const posts = await getPublicBlogPosts();
    return NextResponse.json({ posts });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
