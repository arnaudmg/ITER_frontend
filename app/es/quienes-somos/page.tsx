import { Metadata } from "next";
import AboutPage from "@/components/pages/AboutPage";
import { buildStrapiMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "about-page",
    locale: "es",
    path: "/quienes-somos",
    fallbackTitle: "Quiénes somos | Iter Advisors",
    fallbackDescription: "Descubra Iter Advisors.",
  });
}

export default function Page() {
  return <AboutPage locale="es" />;
}
