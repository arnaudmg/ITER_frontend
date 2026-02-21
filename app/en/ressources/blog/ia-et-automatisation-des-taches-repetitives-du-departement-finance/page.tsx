import { Metadata } from "next";
import BlogPostPage from "@/components/pages/BlogPostPage";
import { buildStrapiCollectionMetadata } from "@/lib/metadata";
import { getBlogPost } from "@/lib/content/blog-posts";

const post = getBlogPost("en", "ia-et-automatisation-des-taches-repetitives-du-departement-finance")!;

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiCollectionMetadata({
    endpoint: "blog-articles",
    slug: "ia-et-automatisation-des-taches-repetitives-du-departement-finance",
    locale: "en",
    path: "/ressources/blog/ia-et-automatisation-des-taches-repetitives-du-departement-finance",
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
