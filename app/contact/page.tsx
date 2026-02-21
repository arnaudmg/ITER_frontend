import { Metadata } from "next";
import ContactPage from "@/components/pages/ContactPage";
import { buildStrapiMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "contact-page",
    locale: "fr",
    path: "/contact",
    fallbackTitle: "Contact | Iter Advisors",
    fallbackDescription: "Contactez Iter Advisors.",
  });
}

export default function Page() {
  return <ContactPage locale="fr" />;
}
