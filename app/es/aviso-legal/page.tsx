import { Metadata } from "next";
import LegalPage from "@/components/pages/LegalPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getLegalContent } from "@/lib/content/legal";

const content = getLegalContent("aviso-legal");

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "legal-page",
    locale: "es",
    path: "/aviso-legal",
    fallbackTitle: "Aviso legal | Iter Advisors",
    fallbackDescription: "Aviso legal del sitio Iter Advisors.",
  });
}

export default function Page() {
  return <LegalPage locale="es" content={content} />;
}
