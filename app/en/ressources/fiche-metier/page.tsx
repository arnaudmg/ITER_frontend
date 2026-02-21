import { Metadata } from "next";
import FicheMetierListingPage from "@/components/pages/FicheMetierListingPage";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  locale: "en",
  title: "Job Descriptions | Iter Advisors",
  description: "Discover our detailed job descriptions: CFO, Finance Director, Controller and other corporate finance roles.",
  path: "/ressources/fiche-metier",
});

export default function Page() {
  return <FicheMetierListingPage locale="en" />;
}
