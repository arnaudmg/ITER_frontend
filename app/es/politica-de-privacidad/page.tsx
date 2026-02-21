import { Metadata } from "next";
import LegalPage from "@/components/pages/LegalPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getLegalContent } from "@/lib/content/legal";

const content = getLegalContent("politica-de-privacidad");

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "privacy-page",
    locale: "es",
    path: "/politica-de-privacidad",
    fallbackTitle: "Política de privacidad | Iter Advisors",
    fallbackDescription: "Política de privacidad de Iter Advisors.",
  });
}

export default function Page() {
  return <LegalPage locale="es" content={content} />;
}
