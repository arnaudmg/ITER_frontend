import { Metadata } from "next";
import FicheMetierListingPage from "@/components/pages/FicheMetierListingPage";
import { getJobMetiers } from "@/lib/strapi";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  locale: "es",
  title: "Perfiles profesionales | Iter Advisors",
  description: "Descubra nuestros perfiles profesionales detallados: Director Financiero, Controller y otros roles en finanzas corporativas.",
  path: "/ressources/fiche-metier",
});

export default async function Page() {
  const fiches = await getJobMetiers("es");
  return <FicheMetierListingPage locale="es" fiches={fiches} />;
}
