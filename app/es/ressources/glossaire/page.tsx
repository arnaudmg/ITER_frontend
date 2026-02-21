import { Metadata } from "next";
import GlossairePage from "@/components/pages/GlossairePage";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  locale: "es",
  title: "Glosario | Iter Advisors",
  description: "Glosario de términos clave de las finanzas corporativas: tesorería, rondas de financiación, reporting, plan de negocio y mucho más.",
  path: "/ressources/glossaire",
});

export default function Page() {
  return <GlossairePage locale="es" />;
}
