import { Metadata } from "next";
import LegalPage from "@/components/pages/LegalPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getLegalContent } from "@/lib/content/legal";

const content = getLegalContent("privacy-policy");

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "privacy-page",
    locale: "en",
    path: "/privacy-policy",
    fallbackTitle: "Privacy Policy | Iter Advisors",
    fallbackDescription: "Privacy policy for Iter Advisors.",
  });
}

export default function Page() {
  return <LegalPage locale="en" content={content} />;
}
