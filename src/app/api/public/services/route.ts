import { NextResponse } from "next/server";
import { getPublicServices } from "@/lib/public-api/services";

export async function GET() {
  try {
    const data = await getPublicServices();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
