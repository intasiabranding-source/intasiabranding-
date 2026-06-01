import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { revalidateCms } from "@/lib/cms/revalidate";

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const scheduled = await prisma.blogPost.findMany({
    where: {
      status: "SCHEDULED",
      scheduledFor: { lte: now },
    },
  });

  for (const post of scheduled) {
    await prisma.blogPost.update({
      where: { id: post.id },
      data: { status: "PUBLISHED", publishedAt: now },
    });
  }

  await revalidateCms();
  return NextResponse.json({ published: scheduled.length });
}
