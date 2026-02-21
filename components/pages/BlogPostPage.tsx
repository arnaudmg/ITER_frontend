import { Locale } from "@/lib/i18n";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";

interface BlogPostPageProps {
  locale: Locale;
  title: string;
  breadcrumbs: { resourcesLabel: string; resourcesHref: string; blogLabel: string; blogHref: string };
  content: string[];
}

export default function BlogPostPage({ locale, title, breadcrumbs, content }: BlogPostPageProps) {
  return (
    <PageLayout locale={locale}>
      {/* Hero */}
      <section className="bg-background pt-32 pb-16">
        <div className="container">
          <Breadcrumb
            locale={locale}
            items={[
              { label: breadcrumbs.resourcesLabel, href: breadcrumbs.resourcesHref },
              { label: breadcrumbs.blogLabel, href: breadcrumbs.blogHref },
              { label: title },
            ]}
          />
          <h1 className="text-3xl lg:text-4xl font-bold font-heading text-foreground max-w-3xl">{title}</h1>
        </div>
      </section>

      {/* Content */}
      <article className="bg-background py-24 lg:py-32">
        <div className="container max-w-3xl">
          {content.map((paragraph, i) => (
            <p key={i} className="text-muted-foreground leading-relaxed mb-6">{paragraph}</p>
          ))}
        </div>
      </article>

      <CTASection locale={locale} />
    </PageLayout>
  );
}
