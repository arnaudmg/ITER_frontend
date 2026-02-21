import { Metadata } from "next";
import JobsPage from "@/components/pages/JobsPage";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  locale: "en",
  title: "Careers | Iter Advisors",
  description: "Join the Iter Advisors team.",
  path: "/jobs",
});

export default function Page() {
  return <JobsPage locale="en" />;
}
