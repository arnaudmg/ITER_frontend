import { Metadata } from "next";
import TestimonialsListingPage from "@/components/pages/TestimonialsListingPage";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  locale: "en",
  title: "Case Studies | Iter Advisors",
  description: "Discover our client testimonials: SMEs, startups and scale-ups supported by Iter Advisors CFOs.",
  path: "/ressources/testimonials",
});

export default function Page() {
  return <TestimonialsListingPage locale="en" />;
}
