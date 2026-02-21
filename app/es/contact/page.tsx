import { Metadata } from "next";
import ContactPage from "@/components/pages/ContactPage";
import { buildStrapiMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "contact-page",
    locale: "es",
    path: "/contact",
    fallbackTitle: "Contacto | Iter Advisors",
    fallbackDescription: "Contacte con Iter Advisors.",
  });
}

export default function Page() {
  return <ContactPage locale="es" />;
}
