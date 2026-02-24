import { Metadata } from "next";
import GlossairePage from "@/components/pages/GlossairePage";
import { buildMetadata } from "@/lib/metadata";
import { getGlossaryTerms } from "@/lib/strapi";

export const metadata: Metadata = buildMetadata({
  locale: "es",
  title: "Glosario | Iter Advisors",
  description: "Glosario de términos clave de las finanzas corporativas: tesorería, rondas de financiación, reporting, plan de negocio y mucho más.",
  path: "/ressources/glossaire",
});

export default async function Page() {
  const terms = await getGlossaryTerms("es");
  return <GlossairePage locale="es" terms={terms} />;
}
