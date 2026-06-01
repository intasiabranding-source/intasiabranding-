import { getPageBySlug } from "@/lib/cms/fetch";
import { prisma } from "@/lib/db";

export async function getPublicPage(slug: string) {
  const page = await getPageBySlug(slug);
  if (!page) return null;

  const faqs = await prisma.faq.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });

  return {
    slug: page.slug,
    title: page.title,
    sections: page.sections.map((s) => ({
      id: s.id,
      type: s.type,
      content: s.content,
      animationPreset: s.animationPreset,
      order: s.order,
    })),
    faqs: faqs.map((f) => ({
      id: f.id,
      question: f.question,
      answer: f.answer,
    })),
  };
}
