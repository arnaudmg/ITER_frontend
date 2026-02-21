import { Metadata } from "next";
import LegalPage from "@/components/pages/LegalPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getLegalContent } from "@/lib/content/legal";

const content = getLegalContent("mentions-legales");

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "legal-page",
    locale: "fr",
    path: "/mentions-legales",
    fallbackTitle: "Mentions légales | Iter Advisors",
    fallbackDescription: "Mentions légales du site Iter Advisors.",
  });
}

export default function Page() {
  return <LegalPage locale="fr" content={content} />;
}
