import { Metadata } from "next";
import DafSubPage from "@/components/pages/DafSubPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getDafSubContent } from "@/lib/content/daf-sub";

const content = getDafSubContent("en", "transition")!;

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "daf-transition-page",
    locale: "en",
    path: "/daf-outsourcing/transition",
    fallbackTitle: "Transition CFO | Iter Advisors",
    fallbackDescription: "Transition CFO to support your changes.",
  });
}

export default function Page() {
  return <DafSubPage locale="en" content={content} />;
}
