import { Metadata } from "next";
import BlogListingPage from "@/components/pages/BlogListingPage";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  locale: "en",
  title: "Blog | Iter Advisors",
  description: "Browse all our articles on corporate finance, financial management, cash management and fundraising.",
  path: "/ressources/blog",
});

export default function Page() {
  return <BlogListingPage locale="en" />;
}
