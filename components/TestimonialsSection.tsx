"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Locale } from "@/lib/i18n";

const content: Record<Locale, { overline: string; heading: string; subtitle: string; button: string }> = {
  fr: {
    overline: "Témoignages",
    heading: "Ils parlent de nous",
    subtitle: "Découvrez les retours de nos clients sur notre accompagnement en finance et ressources humaines.",
    button: "Voir nos témoignages",
  },
  en: {
    overline: "Testimonials",
    heading: "They talk about us",
    subtitle: "Discover our clients' feedback on our finance and human resources support.",
    button: "See our testimonials",
  },
  es: {
    overline: "Testimonios",
    heading: "Hablan de nosotros",
    subtitle: "Descubra los comentarios de nuestros clientes sobre nuestro apoyo en finanzas y recursos humanos.",
    button: "Vea nuestros testimonios",
  },
};

export default function TestimonialsSection({ locale }: { locale: Locale }) {
  const t = content[locale];
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 lg:py-32 bg-muted/30 relative overflow-hidden">
      <div className="container text-center" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-3 py-1 rounded-full bg-iter-violet/10 text-iter-violet text-xs font-semibold uppercase tracking-widest mb-4">
            {t.overline}
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">{t.heading}</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-10">{t.subtitle}</p>

          {/* Stars */}
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-5 h-5 text-iter-chartreuse fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>

          <p className="text-sm text-muted-foreground mb-10">
            5/5 &mdash; 31 avis sur{" "}
            <a
              href="https://trustfolio.co/profil/iter-advisors-q3yNQhXTUNc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-iter-violet hover:underline transition-colors"
            >
              Trustfolio
            </a>
          </p>

          <a
            href="https://trustfolio.co/profil/iter-advisors-q3yNQhXTUNc"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground font-medium hover:bg-iter-violet hover:text-white hover:border-iter-violet transition-all duration-300"
          >
            {t.button}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
