import { Metadata } from "next";
import HomePage from "@/components/pages/HomePage";
import { buildStrapiMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "homepage",
    locale: "fr",
    path: "/",
    fallbackTitle: "DAF externalisé & DAF à temps partagé | Iter Advisors",
    fallbackDescription: "Iter Advisors : DAF externalisé pour PME et startups.",
  });
}

export default function Page() {
  return <HomePage locale="fr" />;
}
