import { Metadata } from "next";
import GlossairePage from "@/components/pages/GlossairePage";
import { buildMetadata } from "@/lib/metadata";
import { getGlossaryTerms } from "@/lib/strapi";

export const metadata: Metadata = buildMetadata({
  locale: "fr",
  title: "Glossaire | Iter Advisors",
  description: "Glossaire des termes clés de la finance d'entreprise : trésorerie, levée de fonds, reporting, business plan et bien plus.",
  path: "/ressources/glossaire",
});

export default async function Page() {
  const terms = await getGlossaryTerms("fr");
  return <GlossairePage locale="fr" terms={terms} />;
}
