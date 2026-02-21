import { Metadata } from "next";
import GlossairePage from "@/components/pages/GlossairePage";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  locale: "en",
  title: "Glossary | Iter Advisors",
  description: "Glossary of key corporate finance terms: cash management, fundraising, reporting, business plan and more.",
  path: "/ressources/glossaire",
});

export default function Page() {
  return <GlossairePage locale="en" />;
}
