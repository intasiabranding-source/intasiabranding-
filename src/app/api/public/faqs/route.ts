import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { Faq } from "@prisma/client";

export async function GET() {
  try {
    const faqs = await prisma.faq.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });
    return NextResponse.json({
      faqs: faqs.map((f: Faq) => ({
        id: f.id,
        question: f.question,
        answer: f.answer,
      })),
    });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
