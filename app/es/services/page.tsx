import { Metadata } from "next";
import ServicesPage from "@/components/pages/ServicesPage";
import { buildStrapiMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "services-page",
    locale: "es",
    path: "/services",
    fallbackTitle: "Servicios | Iter Advisors",
    fallbackDescription: "Nuestros servicios de dirección financiera externalizada.",
  });
}

export default function Page() {
  return <ServicesPage locale="es" />;
}
