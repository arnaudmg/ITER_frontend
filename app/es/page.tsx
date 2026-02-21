import { Metadata } from "next";
import HomePage from "@/components/pages/HomePage";
import { buildStrapiMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "homepage",
    locale: "es",
    path: "/",
    fallbackTitle: "Director Financiero Externo | Iter Advisors",
    fallbackDescription: "Iter Advisors: CFO externo para pymes y startups.",
  });
}

export default function Page() {
  return <HomePage locale="es" />;
}
