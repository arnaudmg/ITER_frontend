import { Metadata } from "next";
import BlogPostPage from "@/components/pages/BlogPostPage";
import { buildStrapiCollectionMetadata } from "@/lib/metadata";
import { getBlogPost } from "@/lib/content/blog-posts";

const post = getBlogPost("en", "essentiels-outils-tech-finance")!;

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiCollectionMetadata({
    endpoint: "blog-articles",
    slug: "essentiels-outils-tech-finance",
    locale: "en",
    path: "/ressources/blog/essentiels-outils-tech-finance",
    fallbackTitle: post.meta.title,
    fallbackDescription: post.meta.description,
  });
}

export default function Page() {
  return (
    <BlogPostPage
      locale="en"
      title={post.h1}
      breadcrumbs={post.breadcrumbs}
      content={post.content}
    />
  );
}
