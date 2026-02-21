import { Metadata } from "next";
import BlogPostPage from "@/components/pages/BlogPostPage";
import { buildStrapiCollectionMetadata } from "@/lib/metadata";
import { getBlogPost } from "@/lib/content/blog-posts";

const post = getBlogPost("fr", "flux-de-tresorerie")!;

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiCollectionMetadata({
    endpoint: "blog-articles",
    slug: "flux-de-tresorerie",
    locale: "fr",
    path: "/ressources/blog/flux-de-tresorerie",
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
