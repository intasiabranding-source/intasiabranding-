import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { Statistic } from "@prisma/client";

export async function GET() {
  try {
    const stats = await prisma.statistic.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });
    return NextResponse.json({
      stats: stats.map((s: Statistic) => ({
        label: s.label,
        value: s.value,
        suffix: s.suffix,
      })),
    });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
