import { getPublishedBlogPosts } from "@/lib/cms/fetch";
import { prisma } from "@/lib/db";

export async function getPublicBlogPosts() {
  const posts = await getPublishedBlogPosts();
  return posts.map((post) => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    coverImage: post.coverImage,
    category: post.category,
    tags: post.tags,
    publishedAt: post.publishedAt?.toISOString() ?? null,
    authorName: post.authorName,
  }));
}

export async function getPublicBlogPost(slug: string) {
  const post = await prisma.blogPost.findFirst({
    where: { slug, status: "PUBLISHED" },
  });
  if (!post) return null;

  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    content: post.content,
    coverImage: post.coverImage,
    category: post.category,
    tags: post.tags,
    publishedAt: post.publishedAt?.toISOString() ?? null,
    authorName: post.authorName,
    metaTitle: post.metaTitle,
    metaDescription: post.metaDescription,
  };
}
