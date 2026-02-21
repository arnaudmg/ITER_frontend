import { Metadata } from "next";
import BlogPostPage from "@/components/pages/BlogPostPage";
import { buildStrapiCollectionMetadata } from "@/lib/metadata";
import { getBlogPost } from "@/lib/content/blog-posts";

const post = getBlogPost("fr", "les-10-outils-pour-les-cfos-en-start-up")!;

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiCollectionMetadata({
    endpoint: "blog-articles",
    slug: "les-10-outils-pour-les-cfos-en-start-up",
    locale: "fr",
    path: "/ressources/blog/les-10-outils-pour-les-cfos-en-start-up",
    fallbackTitle: post.meta.title,
    fallbackDescription: post.meta.description,
  });
}

export default function Page() {
  return (
    <BlogPostPage
      locale="fr"
      title={post.h1}
      breadcrumbs={post.breadcrumbs}
      content={post.content}
    />
  );
}
