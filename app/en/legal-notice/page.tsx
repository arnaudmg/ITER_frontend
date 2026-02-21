import { Metadata } from "next";
import LegalPage from "@/components/pages/LegalPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getLegalContent } from "@/lib/content/legal";

const content = getLegalContent("legal-notice");

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "legal-page",
    locale: "en",
    path: "/legal-notice",
    fallbackTitle: "Legal Notice | Iter Advisors",
    fallbackDescription: "Legal notice for the Iter Advisors website.",
  });
}

export default function Page() {
  return <LegalPage locale="en" content={content} />;
}
