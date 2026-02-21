import { Metadata } from "next";
import ServicesPage from "@/components/pages/ServicesPage";
import { buildStrapiMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "services-page",
    locale: "en",
    path: "/services",
    fallbackTitle: "Services | Iter Advisors",
    fallbackDescription: "Our outsourced financial management services.",
  });
}

export default function Page() {
  return <ServicesPage locale="en" />;
}
