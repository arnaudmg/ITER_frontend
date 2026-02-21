import { Metadata } from "next";
import DafSubPage from "@/components/pages/DafSubPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getDafSubContent } from "@/lib/content/daf-sub";

const content = getDafSubContent("fr", "transition")!;

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "daf-transition-page",
    locale: "fr",
    path: "/daf-externalise/transition",
    fallbackTitle: "DAF de transition | Iter Advisors",
    fallbackDescription: "DAF de transition pour accompagner vos changements.",
  });
}

export default function Page() {
  return <DafSubPage locale="fr" content={content} />;
}
