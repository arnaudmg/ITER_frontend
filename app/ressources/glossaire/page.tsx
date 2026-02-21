import { Metadata } from "next";
import GlossairePage from "@/components/pages/GlossairePage";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  locale: "fr",
  title: "Glossaire | Iter Advisors",
  description: "Glossaire des termes clés de la finance d'entreprise : trésorerie, levée de fonds, reporting, business plan et bien plus.",
  path: "/ressources/glossaire",
});

export default function Page() {
  return <GlossairePage locale="fr" />;
}
