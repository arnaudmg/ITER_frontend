import { Locale } from "../i18n";

export interface DrhFaqItem {
  question: string;
  answer: string;
}

export interface DrhSection {
  heading: string;
  content: string[];
}

export interface DrhContent {
  meta: {
    title: string;
    description: string;
  };
  breadcrumbLabel: string;
  h1: string;
  intro: string[];
  partnerSection: DrhSection;
  whatIs: DrhSection;
  servicesGridHeading: string;
  tierLabels: [string, string, string, string];
  addOnLabel: string;
  faq: DrhFaqItem[];
  ctaButton: string;
}

export const drhContent: Record<Locale, DrhContent> = {
  fr: {
    meta: {
      title: "DRH externalisé | Direction RH à temps partagé | Iter Advisors",
      description:
        "Cabinet de conseil en ressources humaines : DRH externalisé, DRH à temps partagé. Structuration, recrutement, paie, conformité et culture. Iter Advisors.",
    },
    breadcrumbLabel: "DRH Externalisé",
    h1: "DRH externalisé : une direction RH flexible et experte",
    intro: [
      "Pour les PME et startups en croissance, la fonction RH est un levier stratégique. Le DRH externalisé vous apporte l'expertise et la structuration nécessaires sans le coût d'un poste à temps plein.",
      "Iter Advisors accompagne vos enjeux RH : audit et diagnostic, recrutement, onboarding, rémunération, développement des talents, relations sociales et digitalisation de la fonction RH.",
    ],
    partnerSection: {
      heading: "Votre partenaire RH stratégique",
      content: [
        "Notre offre DRH externalisé couvre l'ensemble des besoins d'une direction des ressources humaines : de l'audit initial à la gestion des relations sociales, en passant par le recrutement, la paie, la formation et la culture d'entreprise.",
        "Nous nous adaptons à votre maturité RH et à votre budget, avec des formules modulables (temps partagé, missions ponctuelles, add-ons) et une grille de services claire pour composer l'accompagnement dont vous avez besoin.",
      ],
    },
    whatIs: {
      heading: "Qu'est-ce qu'un DRH externalisé ?",
      content: [
        "Le DRH externalisé (ou directeur des ressources humaines externalisé) intervient au sein de votre entreprise sans en être salarié. Il assume les mêmes responsabilités qu'un DRH interne : stratégie RH, recrutement, gestion des talents, conformité sociale, relations avec les instances représentatives et pilotage de la fonction RH.",
        "Cette solution s'adresse aux entreprises qui ont besoin d'une expertise RH de haut niveau sans recruter à temps plein. Le DRH externalisé peut intervenir à temps partagé (quelques jours par semaine ou par mois) ou sur des missions ponctuelles (audit, due diligence RH, accompagnement levée de fonds, etc.).",
      ],
    },
    servicesGridHeading: "Nos services RH",
    tierLabels: ["Offre 1", "Offre 2", "Offre 3", "Offre 4"],
    addOnLabel: "Add-on",
    faq: [
      {
        question: "Quelle est la différence entre un DRH externalisé et un DRH à temps partagé ?",
        answer:
          "Le DRH externalisé est un terme générique qui englobe toute intervention externe en direction RH. Le DRH à temps partagé est une formule où le professionnel intervient de manière récurrente dans l'entreprise (par exemple 1 à 3 jours par semaine), sur la durée, pour assurer une continuité et une connaissance approfondie de l'organisation.",
      },
      {
        question: "Quels types de missions peut couvrir un DRH externalisé ?",
        answer:
          "L'offre couvre l'audit et le diagnostic RH, la gestion administrative du personnel, la veille réglementaire, les temps et absences, les relations avec les organismes sociaux, la coordination paie, le recrutement et le sourcing, l'onboarding et l'offboarding, la rémunération et les avantages sociaux, le développement des talents, l'organisation et la culture, les relations sociales, la digitalisation RH (SIRH) et des missions ponctuelles (audit flash, due diligence RH, accompagnement levée de fonds, etc.).",
      },
      {
        question: "Comment est structurée votre grille de services ?",
        answer:
          "Nos services sont organisés en catégories (Audit RH, Recrutement, Onboarding/Offboarding, Rémunération, Développement RH, Organisation & culture, Relations sociales, SIRH, Missions ponctuelles). Chaque service peut être inclus dans l'une de nos offres (selon le niveau d'accompagnement) ou proposé en add-on pour les missions ponctuelles.",
      },
    ],
    ctaButton: "Prendre rendez-vous",
  },
  en: {
    meta: {
      title: "Outsourced HR | Fractional HR Director | Iter Advisors",
      description:
        "HR consulting: outsourced HR, fractional HR director. Structure, recruitment, payroll, compliance and culture. Iter Advisors.",
    },
    breadcrumbLabel: "HR Outsourced",
    h1: "Outsourced HR: flexible, expert people leadership",
    intro: [
      "For growing SMEs and startups, the HR function is a strategic lever. An outsourced HR director brings the expertise and structure you need without the cost of a full-time hire.",
      "Iter Advisors supports your HR needs: audit and diagnosis, recruitment, onboarding, compensation, talent development, employee relations and HR digitalization.",
    ],
    partnerSection: {
      heading: "Your strategic HR partner",
      content: [
        "Our outsourced HR offering covers the full scope of an HR department: from initial audit to employee relations, including recruitment, payroll, training and company culture.",
        "We adapt to your HR maturity and budget, with flexible formats (shared-time, one-off missions, add-ons) and a clear service grid so you can build the support you need.",
      ],
    },
    whatIs: {
      heading: "What is an outsourced HR director?",
      content: [
        "An outsourced HR director (or fractional Chief People Officer) works within your company without being an employee. They assume the same responsibilities as an internal HR director: HR strategy, recruitment, talent management, social compliance, relations with employee representatives and HR function leadership.",
        "This solution is for companies that need high-level HR expertise without a full-time hire. The outsourced HR director can work on a shared-time basis (e.g. a few days per week or month) or on one-off missions (audit, HR due diligence, fundraising support, etc.).",
      ],
    },
    servicesGridHeading: "Our HR services",
    tierLabels: ["Tier 1", "Tier 2", "Tier 3", "Tier 4"],
    addOnLabel: "Add-on",
    faq: [
      {
        question: "What is the difference between outsourced HR and shared-time HR?",
        answer:
          "Outsourced HR is the general term for external HR leadership. Shared-time HR is a format where the professional works regularly in the company (e.g. 1 to 3 days per week) over time, providing continuity and deep knowledge of the organization.",
      },
      {
        question: "What kind of missions can an outsourced HR director cover?",
        answer:
          "The offering covers HR audit and diagnosis, personnel administration, regulatory watch, time and absence management, relations with social bodies, payroll coordination, recruitment and sourcing, onboarding and offboarding, compensation and benefits, talent development, organization and culture, employee relations, HR digitalization (HRIS) and one-off missions (flash audit, HR due diligence, fundraising support, etc.).",
      },
      {
        question: "How is your service grid structured?",
        answer:
          "Services are organized in categories (HR Audit, Recruitment, Onboarding/Offboarding, Compensation, HR Development, Organization & Culture, Employee Relations, HRIS, One-off missions). Each service can be included in one of our tiers or offered as an add-on for one-off missions.",
      },
    ],
    ctaButton: "Make an appointment",
  },
  es: {
    meta: {
      title: "RRHH externalizado | Dirección de personas | Iter Advisors",
      description:
        "Consultoría en recursos humanos: RRHH externalizado, director de RRHH a tiempo compartido. Estructura, reclutamiento, nómina, cumplimiento y cultura. Iter Advisors.",
    },
    breadcrumbLabel: "RRHH externalizado",
    h1: "RRHH externalizado: dirección de personas flexible y experta",
    intro: [
      "Para pymes y startups en crecimiento, la función de RRHH es un eje estratégico. El director de RRHH externalizado aporta la experiencia y la estructura necesarias sin el coste de una contratación a tiempo completo.",
      "Iter Advisors acompaña sus retos de RRHH: auditoría y diagnóstico, reclutamiento, onboarding, retribución, desarrollo del talento, relaciones laborales y digitalización de la función RRHH.",
    ],
    partnerSection: {
      heading: "Su socio estratégico en RRHH",
      content: [
        "Nuestra oferta de RRHH externalizado cubre el conjunto de necesidades de una dirección de recursos humanos: desde la auditoría inicial hasta las relaciones con los representantes del personal, pasando por reclutamiento, nómina, formación y cultura de empresa.",
        "Nos adaptamos a su madurez en RRHH y a su presupuesto, con fórmulas modulables (tiempo compartido, misiones puntuales, add-ons) y una cuadrícula de servicios clara para diseñar el acompañamiento que necesita.",
      ],
    },
    whatIs: {
      heading: "¿Qué es un director de RRHH externalizado?",
      content: [
        "El director de RRHH externalizado interviene en su empresa sin ser empleado. Asume las mismas responsabilidades que un director de RRHH interno: estrategia de personas, reclutamiento, gestión del talento, cumplimiento normativo laboral, relaciones con la representación del personal y pilotaje de la función RRHH.",
        "Esta solución está dirigida a empresas que necesitan una experiencia RRHH de alto nivel sin contratar a tiempo completo. El director de RRHH externalizado puede intervenir a tiempo compartido (por ejemplo, unos días por semana o al mes) o en misiones puntuales (auditoría, due diligence RRHH, acompañamiento en financiación, etc.).",
      ],
    },
    servicesGridHeading: "Nuestros servicios de RRHH",
    tierLabels: ["Oferta 1", "Oferta 2", "Oferta 3", "Oferta 4"],
    addOnLabel: "Add-on",
    faq: [
      {
        question: "¿Cuál es la diferencia entre RRHH externalizado y RRHH a tiempo compartido?",
        answer:
          "RRHH externalizado es el término genérico que engloba cualquier intervención externa en dirección de personas. RRHH a tiempo compartido es una fórmula en la que el profesional interviene de forma recurrente en la empresa (por ejemplo, 1 a 3 días por semana), en el tiempo, para asegurar continuidad y un conocimiento profundo de la organización.",
      },
      {
        question: "¿Qué tipos de misiones puede cubrir un director de RRHH externalizado?",
        answer:
          "La oferta cubre auditoría y diagnóstico RRHH, gestión administrativa del personal, vigilancia normativa, tiempos y ausencias, relaciones con organismos sociales, coordinación de nómina, reclutamiento y sourcing, onboarding y offboarding, retribución y beneficios sociales, desarrollo del talento, organización y cultura, relaciones laborales, digitalización RRHH (SIRH) y misiones puntuales (auditoría flash, due diligence RRHH, acompañamiento en financiación, etc.).",
      },
      {
        question: "¿Cómo está estructurada su cuadrícula de servicios?",
        answer:
          "Los servicios están organizados en categorías (Auditoría RRHH, Reclutamiento, Onboarding/Offboarding, Retribución, Desarrollo RRHH, Organización y cultura, Relaciones laborales, SIRH, Misiones puntuales). Cada servicio puede incluirse en una de nuestras ofertas o proponerse como add-on para misiones puntuales.",
      },
    ],
    ctaButton: "Concertar una cita",
  },
};

export function getDrhContent(locale: Locale): DrhContent {
  return drhContent[locale];
}
