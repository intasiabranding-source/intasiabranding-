import { NextResponse } from "next/server";
import { getPublicSettings } from "@/lib/public-api/settings";

export async function GET() {
  try {
    const settings = await getPublicSettings();
    return NextResponse.json(settings);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
