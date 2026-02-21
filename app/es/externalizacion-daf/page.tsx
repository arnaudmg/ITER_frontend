import { Metadata } from "next";
import DafPage from "@/components/pages/DafPage";
import { buildStrapiMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "daf-externalise-page",
    locale: "es",
    path: "/externalizacion-daf",
    fallbackTitle: "Externalización DAF | Iter Advisors",
    fallbackDescription: "CFO externalizado para pymes y startups.",
  });
}

export default function Page() {
  return <DafPage locale="es" />;
}
