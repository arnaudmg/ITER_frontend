import { Metadata } from "next";
import FicheMetierListingPage from "@/components/pages/FicheMetierListingPage";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  locale: "fr",
  title: "Fiches métiers | Iter Advisors",
  description: "Découvrez nos fiches métiers détaillées : DAF, RAF, CFO et autres métiers de la finance d'entreprise.",
  path: "/ressources/fiche-metier",
});

export default function Page() {
  return <FicheMetierListingPage locale="fr" />;
}
