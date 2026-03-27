"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, MapPin, Building2, Users, Briefcase, Phone } from "lucide-react";
import Image from "next/image";
import { Locale } from "@/lib/i18n";
import type { CmsNavItem } from "@/lib/strapi";
import { getContactPath, BOOKING_URL } from "@/lib/navigation";
import { getDafLocalContent, DafLocalCity } from "@/lib/content/daf-local";
import { faqPageSchema } from "@/lib/schemas";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";

export default function DafLocalPage({
  locale,
  city,
  cmsNavigation,
}: {
  locale: Locale;
  city: DafLocalCity;
  cmsNavigation?: CmsNavItem[];
}) {
  const t = getDafLocalContent(city, locale);
  const contactPath = getContactPath(locale);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  /* JSON-LD schemas */
  const faqSchema = faqPageSchema(t.faq);

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `Iter Advisors - ${city.charAt(0).toUpperCase() + city.slice(1)}`,
    description: t.meta.description,
    url: `https://www.iteradvisors.com/${locale === "fr" ? `daf-externalise-${city}` : locale === "en" ? `outsourced-cfo-${city === "barcelone" ? "barcelona" : city}` : `cfo-externalizado-${city === "barcelone" ? "barcelona" : city}`}`,
    telephone: "",
    email: "contact@iteradvisors.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: city === "barcelone" ? "Barcelona" : city === "paris" ? "Paris" : "Toulouse",
      addressCountry: city === "barcelone" ? "ES" : "FR",
    },
    areaServed: {
      "@type": "Place",
      name: city === "barcelone" ? "Barcelona, Spain" : city === "paris" ? "Paris, Ile-de-France" : "Toulouse, Occitanie",
    },
    priceRange: "$$",
    image: "https://www.iteradvisors.com/images/og-default.png",
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: t.h1,
    description: t.meta.description,
    provider: {
      "@type": "Organization",
      name: "Iter Advisors",
      url: "https://www.iteradvisors.com",
    },
    areaServed: {
      "@type": "Place",
      name: city === "barcelone" ? "Barcelona" : city === "paris" ? "Paris" : "Toulouse",
    },
    serviceType: locale === "fr" ? "DAF externalisé" : locale === "en" ? "Outsourced CFO" : "CFO externalizado",
  };

  const dafPath = locale === "fr" ? "/daf-externalise" : locale === "en" ? "/en/daf-outsourcing" : "/es/externalizacion-daf";
  const dafLabel = locale === "fr" ? "DAF externalisé" : locale === "en" ? "Outsourced CFO" : "CFO externalizado";

  return (
    <PageLayout locale={locale} cmsNavigation={cmsNavigation}>
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      {/* Hero */}
      <section className="bg-background pt-32 pb-16">
        <div className="container">
          <Breadcrumb
            locale={locale}
            items={[
              { label: dafLabel, href: dafPath },
              { label: t.breadcrumbLabel },
            ]}
          />
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="text-iter-chartreuse" size={20} />
                <span className="text-iter-chartreuse font-medium text-sm uppercase tracking-wider">
                  {city === "barcelone" ? "Barcelona" : city === "paris" ? "Paris" : "Toulouse"}
                </span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold font-heading text-foreground max-w-2xl mb-6">
                {t.h1}
              </h1>
              {t.intro.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-lg text-muted-foreground max-w-2xl leading-relaxed mb-3"
                >
                  {paragraph}
                </p>
              ))}
              <Link
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-iter-chartreuse text-iter-dark font-semibold hover:shadow-lg transition-all duration-300 mt-4"
              >
                {t.ctaButton}
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="relative hidden lg:block">
              <Image
                src="/images/bg/daf-section.webp"
                alt={t.h1}
                width={600}
                height={400}
                className="rounded-2xl object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Content sections */}
      {t.sections.map((section, idx) => (
        <section
          key={idx}
          className={`py-16 ${idx % 2 === 0 ? "bg-background" : "bg-muted/30"}`}
        >
          <div className="container max-w-4xl">
            <h2 className="text-3xl font-bold font-heading text-foreground mb-8">
              {section.heading}
            </h2>
            {section.content.map((paragraph, i) => (
              <p
                key={i}
                className="text-lg text-muted-foreground leading-relaxed mb-4"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      ))}

      {/* FAQ */}
      <section className="py-20 bg-background">
        <div className="container max-w-3xl">
          <h2 className="text-3xl font-bold font-heading text-foreground text-center mb-12">
            {locale === "fr" ? "Questions fréquentes" : locale === "en" ? "Frequently asked questions" : "Preguntas frecuentes"}
          </h2>
          <div className="space-y-4">
            {t.faq.map((item, i) => (
              <div key={i} className="border border-border rounded-xl overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="text-lg font-semibold text-foreground pr-4">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`shrink-0 text-muted-foreground transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                    size={20}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-muted-foreground leading-relaxed">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection locale={locale} />
    </PageLayout>
  );
}
