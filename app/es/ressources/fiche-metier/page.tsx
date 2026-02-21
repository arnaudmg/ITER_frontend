import { Metadata } from "next";
import FicheMetierListingPage from "@/components/pages/FicheMetierListingPage";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  locale: "es",
  title: "Perfiles profesionales | Iter Advisors",
  description: "Descubra nuestros perfiles profesionales detallados: Director Financiero, Controller y otros roles en finanzas corporativas.",
  path: "/ressources/fiche-metier",
});

export default function Page() {
  return <FicheMetierListingPage locale="es" />;
}
