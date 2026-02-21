import { Metadata } from "next";
import AboutPage from "@/components/pages/AboutPage";
import { buildStrapiMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "about-page",
    locale: "fr",
    path: "/a-propos",
    fallbackTitle: "À propos | Iter Advisors",
    fallbackDescription: "Découvrez Iter Advisors.",
  });
}

export default function Page() {
  return <AboutPage locale="fr" />;
}
