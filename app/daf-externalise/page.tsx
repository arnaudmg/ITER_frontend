import { Metadata } from "next";
import DafPage from "@/components/pages/DafPage";
import { buildStrapiMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "daf-externalise-page",
    locale: "fr",
    path: "/daf-externalise",
    fallbackTitle: "DAF externalisé | Iter Advisors",
    fallbackDescription: "DAF externalisé pour PME et startups.",
  });
}

export default function Page() {
  return <DafPage locale="fr" />;
}
