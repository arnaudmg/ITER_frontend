import { Metadata } from "next";
import DrhPage from "@/components/pages/DrhPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getDrhExternalisePage } from "@/lib/strapi";

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "drh-externalise-page",
    locale: "en",
    path: "/hr-outsourcing",
    fallbackTitle: "Outsourced HR | Iter Advisors",
    fallbackDescription: "Outsourced HR and fractional HR director for SMEs and startups.",
  });
}

export default async function Page() {
  const strapiData = await getDrhExternalisePage("en");
  return (
    <DrhPage
      locale="en"
      strapiCategories={strapiData?.serviceCategories ?? null}
    />
  );
}
