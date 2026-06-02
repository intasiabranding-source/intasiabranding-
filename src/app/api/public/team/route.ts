import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { TeamMember } from "@prisma/client";

export async function GET() {
  try {
    const team = await prisma.teamMember.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });
    return NextResponse.json({
      team: team.map((m: TeamMember) => ({
        id: m.id,
        name: m.name,
        role: m.role,
        bio: m.bio,
        imageUrl: m.imageUrl,
        linkedin: m.linkedin,
      })),
    });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
