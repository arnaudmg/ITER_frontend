import { Metadata } from "next";
import TestimonialsListingPage from "@/components/pages/TestimonialsListingPage";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  locale: "es",
  title: "Casos prácticos | Iter Advisors",
  description: "Descubra los testimonios de nuestros clientes: pymes, startups y scale-ups acompañadas por los CFOs de Iter Advisors.",
  path: "/ressources/testimonials",
});

export default function Page() {
  return <TestimonialsListingPage locale="es" />;
}
