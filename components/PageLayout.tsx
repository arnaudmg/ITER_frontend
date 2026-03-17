import { Locale } from "@/lib/i18n";
import Header from "./Header";
import Footer from "./Footer";
import { getGlobal } from "@/lib/strapi";
import type { NavItem } from "@/lib/navigation";

function toNavItems(
  navigation: { label: string; url: string; children: { label: string; url: string }[] }[]
): NavItem[] {
  return navigation
    .map((item) => {
      const children =
        item.children
          ?.filter((child) => child.label && child.url)
          .map((child) => ({
            text: child.label,
            href: child.url,
          })) ?? [];

      return {
        title: item.label || "",
        href: item.url || "#",
        children: children.length > 0 ? children : undefined,
      };
    })
    .filter((item) => item.title && item.href);
}

export default async function PageLayout({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const global = await getGlobal(locale);
  const cmsNavigation = global?.navigation ? toNavItems(global.navigation) : undefined;

  return (
    <>
      <Header locale={locale} cmsNavigation={cmsNavigation} />
      <main>{children}</main>
      <Footer locale={locale} />
    </>
  );
}
