import { Metadata } from "next";
import AboutPage from "@/components/pages/AboutPage";
import { buildStrapiMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "about-page",
    locale: "en",
    path: "/a-propos",
    fallbackTitle: "About | Iter Advisors",
    fallbackDescription: "Discover Iter Advisors.",
  });
}

export default function Page() {
  return <AboutPage locale="en" />;
}
