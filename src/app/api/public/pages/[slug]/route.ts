import { NextRequest, NextResponse } from "next/server";
import { getPublicPage } from "@/lib/public-api/pages";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const page = await getPublicPage(slug);
    if (!page) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(page);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
