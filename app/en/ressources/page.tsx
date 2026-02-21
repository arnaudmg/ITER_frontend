import { Metadata } from "next";
import ResourcesPage from "@/components/pages/ResourcesPage";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  locale: "en",
  title: "Resources | Iter Advisors",
  description: "Browse all our resources: blog, glossary, job descriptions and client testimonials.",
  path: "/ressources",
});

export default function Page() {
  return <ResourcesPage locale="en" />;
}
