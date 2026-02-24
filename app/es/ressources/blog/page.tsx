import { Metadata } from "next";
import BlogListingPage from "@/components/pages/BlogListingPage";
import { getBlogArticles } from "@/lib/strapi";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  locale: "es",
  title: "Blog | Iter Advisors",
  description: "Consulte todos nuestros artículos sobre finanzas corporativas, gestión financiera, gestión de tesorería y rondas de financiación.",
  path: "/ressources/blog",
});

export default async function Page() {
  const articles = await getBlogArticles("es");
  return <BlogListingPage locale="es" articles={articles} />;
}
