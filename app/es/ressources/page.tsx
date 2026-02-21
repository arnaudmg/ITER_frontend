import { Metadata } from "next";
import ResourcesPage from "@/components/pages/ResourcesPage";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  locale: "es",
  title: "Recursos | Iter Advisors",
  description: "Consulte todos nuestros recursos: blog, glosario, fichas de puestos y testimonios de clientes.",
  path: "/ressources",
});

export default function Page() {
  return <ResourcesPage locale="es" />;
}
