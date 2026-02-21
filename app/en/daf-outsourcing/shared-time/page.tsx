import { Metadata } from "next";
import DafSubPage from "@/components/pages/DafSubPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getDafSubContent } from "@/lib/content/daf-sub";

const content = getDafSubContent("en", "shared-time")!;

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "daf-temps-partage-page",
    locale: "en",
    path: "/daf-outsourcing/shared-time",
    fallbackTitle: "Shared-time CFO | Iter Advisors",
    fallbackDescription: "Shared-time CFO for SMEs.",
  });
}

export default function Page() {
  return <DafSubPage locale="en" content={content} />;
}
