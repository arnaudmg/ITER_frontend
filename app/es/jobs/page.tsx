import { Metadata } from "next";
import JobsPage from "@/components/pages/JobsPage";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  locale: "es",
  title: "Empleo | Iter Advisors",
  description: "Únase al equipo de Iter Advisors.",
  path: "/jobs",
});

export default function Page() {
  return <JobsPage locale="es" />;
}
