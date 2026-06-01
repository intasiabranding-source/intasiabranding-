import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const stats = await prisma.statistic.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });
    return NextResponse.json({
      stats: stats.map((s) => ({
        label: s.label,
        value: s.value,
        suffix: s.suffix,
      })),
    });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
