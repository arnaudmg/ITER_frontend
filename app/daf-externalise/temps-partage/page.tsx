import { Metadata } from "next";
import DafSubPage from "@/components/pages/DafSubPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getDafSubContent } from "@/lib/content/daf-sub";

const content = getDafSubContent("fr", "temps-partage")!;

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "daf-temps-partage-page",
    locale: "fr",
    path: "/daf-externalise/temps-partage",
    fallbackTitle: "DAF à temps partagé | Iter Advisors",
    fallbackDescription: "DAF à temps partagé pour PME.",
  });
}

export default function Page() {
  return <DafSubPage locale="fr" content={content} />;
}
