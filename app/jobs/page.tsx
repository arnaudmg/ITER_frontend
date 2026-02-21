import { Metadata } from "next";
import JobsPage from "@/components/pages/JobsPage";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  locale: "fr",
  title: "Recrutement | Iter Advisors",
  description: "Rejoignez l'équipe Iter Advisors.",
  path: "/jobs",
});

export default function Page() {
  return <JobsPage locale="fr" />;
}
