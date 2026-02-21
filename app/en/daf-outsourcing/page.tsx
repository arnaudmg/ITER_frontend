import { Metadata } from "next";
import DafPage from "@/components/pages/DafPage";
import { buildStrapiMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "daf-externalise-page",
    locale: "en",
    path: "/daf-outsourcing",
    fallbackTitle: "Outsourced CFO | Iter Advisors",
    fallbackDescription: "Outsourced CFO for SMEs and startups.",
  });
}

export default function Page() {
  return <DafPage locale="en" />;
}
