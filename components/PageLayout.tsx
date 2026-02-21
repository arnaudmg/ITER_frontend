import { Locale } from "@/lib/i18n";
import Header from "./Header";
import Footer from "./Footer";

export default function PageLayout({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <>
      <Header locale={locale} />
      <main>{children}</main>
      <Footer locale={locale} />
    </>
  );
}
