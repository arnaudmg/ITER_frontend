import { Metadata } from "next";
import TestimonialsListingPage from "@/components/pages/TestimonialsListingPage";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  locale: "fr",
  title: "Cas clients | Iter Advisors",
  description: "Découvrez les témoignages de nos clients : PME, startups et scale-ups accompagnées par les CFOs d'Iter Advisors.",
  path: "/ressources/testimonials",
});

export default function Page() {
  return <TestimonialsListingPage locale="fr" />;
}
