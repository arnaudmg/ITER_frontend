import { Locale } from "./i18n";

export interface NavItem {
  title: string;
  href: string;
  children?: { text: string; href: string }[];
}

export interface FooterContent {
  description: string;
  copyright: string;
  trustfolio: string;
  legalLinks: { text: string; href: string }[];
}

const navFr: NavItem[] = [
  {
    title: "DAF Externalisé",
    href: "/daf-externalise",
    children: [
      { text: "DAF à Temps Partagé", href: "/daf-externalise/temps-partage" },
      { text: "DAF de Transition", href: "/daf-externalise/transition" },
      { text: "DAF : Métier", href: "/daf-externalise/metier" },
    ],
  },
  {
    title: "Services",
    href: "/services",
    children: [
      { text: "Prévisionnel de trésorerie", href: "/services/previsionnel-tresorerie" },
      { text: "Gestion financière externalisée", href: "/services/gestion-financiere-externalisee" },
      { text: "Accompagnement levée de fonds", href: "/services/accompagnement-levee-de-fond" },
      { text: "Externaliser sa comptabilité", href: "/services/comptabilite-externalisation" },
      { text: "Contrôle de gestion", href: "/services/controle-de-gestion-externalise" },
    ],
  },
  {
    title: "Ressources",
    href: "/ressources",
    children: [
      { text: "Cas clients", href: "/ressources/testimonials" },
      { text: "Actualités", href: "/ressources/blog" },
      { text: "Fiches métier", href: "/ressources/fiche-metier" },
      { text: "Glossaire", href: "/ressources/glossaire" },
    ],
  },
  { title: "A propos", href: "/a-propos" },
  { title: "Jobs", href: "/jobs" },
  { title: "Contact", href: "/contact" },
];

const navEn: NavItem[] = [
  {
    title: "CFO Outsourced",
    href: "/en/daf-outsourcing",
    children: [
      { text: "Shared-time CFO", href: "/en/daf-outsourcing/shared-time" },
      { text: "Transitional CFO", href: "/en/daf-outsourcing/transition" },
      { text: "CFO : The Mission", href: "/en/daf-outsourcing/metier" },
    ],
  },
  {
    title: "Services",
    href: "/en/services",
    children: [
      { text: "Cash flow forecast", href: "/en/services/previsionnel-tresorerie" },
      { text: "Outsourced financial management", href: "/en/services/gestion-financiere-externalisee" },
      { text: "Fund raising support", href: "/en/services/accompagnement-levee-de-fond" },
      { text: "Outsource your accounting", href: "/en/services/comptabilite-externalisation" },
      { text: "Outsourced management control", href: "/en/services/controle-de-gestion-externalise" },
    ],
  },
  {
    title: "Resources",
    href: "/en/ressources",
    children: [
      { text: "Case studies", href: "/en/ressources/testimonials" },
      { text: "Blog", href: "/en/ressources/blog" },
      { text: "Job descriptions", href: "/en/ressources/fiche-metier" },
      { text: "Glossary", href: "/en/ressources/glossaire" },
    ],
  },
  { title: "About us", href: "/en/a-propos" },
  { title: "Jobs", href: "/en/jobs" },
  { title: "contact", href: "/en/contact" },
];

const navEs: NavItem[] = [
  {
    title: "CFO externo",
    href: "/es/externalizacion-daf",
    children: [
      { text: "CFO a Tiempo Compartido", href: "/es/externalizacion-daf/multipropiedad" },
      { text: "CFO de transición", href: "/es/externalizacion-daf/transition" },
      { text: "CFO : Perfil profesional", href: "/es/externalizacion-daf/metier" },
    ],
  },
  {
    title: "Servicios",
    href: "/es/services",
    children: [
      { text: "Previsión de tesorería", href: "/es/services/previsionnel-tresorerie" },
      { text: "Gestión financiera externalizada", href: "/es/services/gestion-financiere-externalisee" },
      { text: "Soporte a la financiación", href: "/es/services/accompagnement-levee-de-fond" },
      { text: "Externalizar la contabilidad", href: "/es/services/comptabilite-externalisation" },
      { text: "Control de gestión externalizado", href: "/es/services/controle-de-gestion-externalise" },
    ],
  },
  {
    title: "Recursos",
    href: "/es/ressources",
    children: [
      { text: "Casos prácticos", href: "/es/ressources/testimonials" },
      { text: "Blog", href: "/es/ressources/blog" },
      { text: "Perfiles profesionales", href: "/es/ressources/fiche-metier" },
      { text: "Glosario", href: "/es/ressources/glossaire" },
    ],
  },
  { title: "Quiénes somos", href: "/es/quienes-somos" },
  { title: "Empleo", href: "/es/jobs" },
  { title: "Contacto", href: "/es/contact" },
];

export const navigation: Record<Locale, NavItem[]> = {
  fr: navFr,
  en: navEn,
  es: navEs,
};

export const footerContent: Record<Locale, FooterContent> = {
  fr: {
    description:
      "Iter Advisors, basé à Barcelone, Paris et Toulouse, est un cabinet spécialisé dans les services de DAF externalisé, de conseil stratégique et d\u2019accompagnement en investissements, fusions-acquisitions.",
    copyright: "Copyright \u00A9 2025 Iter Advisors. All Rights Reserved.",
    trustfolio: "Note de 5/5 sur 31 avis sur notre profil",
    legalLinks: [
      { text: "Mentions légales", href: "/mentions-legales" },
      { text: "Politique de confidentialité", href: "/politique-de-confidentialite" },
    ],
  },
  en: {
    description:
      "Iter Advisors, based in Barcelona, Paris and Toulouse, specializes in outsourced CFO services, strategic consulting and support for investments and mergers & acquisitions.",
    copyright: "Copyright \u00A9 2025 Iter Advisors. All Rights Reserved.",
    trustfolio: "Note de 5/5 sur 31 avis sur notre profil",
    legalLinks: [
      { text: "Terms of use", href: "/en/legal-notice" },
      { text: "Privacy policy", href: "/en/privacy-policy" },
    ],
  },
  es: {
    description:
      "Iter Advisors, con sedes en Barcelona, París y Toulouse, es una empresa especializada en servicios externos de CFO, consultoría estratégica y apoyo a inversiones, fusiones y adquisiciones.",
    copyright: "Copyright \u00A9 2025 Iter Advisors. Todos los derechos reservados.",
    trustfolio: "Note de 5/5 sur 31 avis sur notre profil",
    legalLinks: [
      { text: "Información jurídica", href: "/es/aviso-legal" },
      { text: "Política de privacidad", href: "/es/politica-de-privacidad" },
    ],
  },
};

export const languageSwitcher: Record<Locale, { label: string; flag: string }> = {
  fr: { label: "Français", flag: "fr" },
  en: { label: "English", flag: "gb" },
  es: { label: "Español", flag: "es" },
};

export function getContactPath(locale: Locale): string {
  if (locale === "fr") return "/contact";
  return `/${locale}/contact`;
}

export function getHomePath(locale: Locale): string {
  if (locale === "fr") return "/";
  return `/${locale}`;
}
