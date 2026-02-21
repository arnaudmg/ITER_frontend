import { Locale } from "../i18n";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface DafSection {
  heading: string;
  content: string[];
}

export interface DafSubSection {
  heading: string;
  content: string[];
  subsections?: { heading: string; content: string[] }[];
}

export interface DafContent {
  meta: {
    title: string;
    description: string;
  };
  breadcrumbLabel: string;
  h1: string;
  intro: string[];
  partnerSection: DafSection;
  whatIs: DafSubSection;
  advantages: DafSubSection;
  missions: DafSection;
  whyChoose: DafSection;
  faq: FaqItem[];
  ctaButton: string;
}

export const dafContent: Record<Locale, DafContent> = {
  fr: {
    meta: {
      title: "DAF externalisé | Missions & bénéfices | Iter Advisors",
      description:
        "Découvrez les missions et bénéfices d'un DAF externalisé. Iter Advisors accompagne PME et startups avec une direction financière flexible et experte.",
    },
    breadcrumbLabel: "DAF Externalisé",
    h1: "Pourquoi opter pour un DAF externalisé ?",
    intro: [
      "Dans un environnement économique en constante évolution, les entreprises doivent pouvoir s'appuyer sur une direction financière solide et réactive. Le DAF externalisé offre une réponse adaptée à ce besoin, en apportant une expertise de haut niveau sans les contraintes d'un recrutement permanent.",
      "Chez Iter Advisors, nous accompagnons les PME, startups et scale-ups dans la structuration et le pilotage de leur fonction finance. Nos CFOs interviennent à temps partagé ou en mission ponctuelle pour vous aider à prendre les meilleures décisions stratégiques.",
    ],
    partnerSection: {
      heading: "Iter Advisors, votre partenaire stratégique",
      content: [
        "Iter Advisors est un cabinet de DAF externalisé présent à Barcelone, Paris et Toulouse. Nous mettons à disposition de nos clients des directeurs financiers expérimentés, capables d'intervenir sur l'ensemble des problématiques financières d'une entreprise en croissance.",
        "Notre approche repose sur trois piliers fondamentaux : l'expertise technique, la vision stratégique et la flexibilité d'intervention. Chaque mission est conçue sur mesure pour répondre aux enjeux spécifiques de votre entreprise.",
        "Avec plus de 85 entreprises accompagnées et plus de 80 millions d'euros de levées de fonds réalisées par nos clients, Iter Advisors s'est imposé comme un acteur de référence dans le domaine du DAF externalisé en France et en Espagne.",
      ],
    },
    whatIs: {
      heading: "Qu'est-ce qu'un DAF externalisé ?",
      content: [
        "Un DAF externalisé, ou directeur administratif et financier externalisé, est un professionnel de la finance qui intervient au sein de votre entreprise sans en être salarié à temps plein. Il assume les mêmes responsabilités qu'un DAF interne : pilotage financier, gestion de trésorerie, reporting, accompagnement stratégique et relations avec les investisseurs.",
      ],
      subsections: [
        {
          heading: "Définition et rôle principal",
          content: [
            "Le DAF externalisé assure la direction financière de votre entreprise à temps partagé ou en mission ponctuelle. Son rôle est de structurer, piloter et optimiser la fonction finance pour soutenir la croissance de l'entreprise.",
            "Il intervient sur les sujets clés : élaboration du business plan, construction du prévisionnel de trésorerie, mise en place d'outils de pilotage, préparation des levées de fonds, optimisation des process comptables et financiers.",
          ],
        },
        {
          heading: "Différence entre DAF, RAF et CFO",
          content: [
            "Le DAF (Directeur Administratif et Financier) est un terme français qui englobe à la fois les responsabilités administratives et financières. Le RAF (Responsable Administratif et Financier) occupe généralement un poste plus opérationnel, centré sur la comptabilité et l'administratif.",
            "Le CFO (Chief Financial Officer) est l'équivalent anglo-saxon du DAF, avec une dimension plus stratégique et orientée vers les marchés financiers. Chez Iter Advisors, nos professionnels combinent ces différentes compétences pour offrir un accompagnement complet.",
          ],
        },
      ],
    },
    advantages: {
      heading: "Les avantages du DAF externalisé",
      content: [
        "Faire appel à un DAF externalisé présente de nombreux avantages pour les entreprises en croissance. Voici les principaux bénéfices que vous pouvez en attendre :",
      ],
      subsections: [
        {
          heading: "Réduction significative des coûts",
          content: [
            "Le coût d'un DAF externalisé est nettement inférieur à celui d'un DAF en interne. Vous ne payez que pour le temps effectivement consacré à votre entreprise, sans charges sociales ni avantages salariaux. Cette solution permet de bénéficier d'une expertise de haut niveau tout en maîtrisant votre budget.",
          ],
        },
        {
          heading: "Flexibilité et adaptabilité",
          content: [
            "Le DAF externalisé s'adapte à vos besoins réels. Que vous ayez besoin d'une intervention ponctuelle pour une levée de fonds ou d'un accompagnement régulier à temps partagé, le volume d'intervention est ajustable en fonction de l'évolution de votre activité.",
          ],
        },
        {
          heading: "Expertise et regard extérieur",
          content: [
            "Nos DAFs externalisés interviennent dans de nombreuses entreprises et secteurs d'activité. Cette diversité d'expériences leur confère un regard extérieur précieux et une capacité à identifier rapidement les leviers d'amélioration de votre performance financière.",
          ],
        },
        {
          heading: "Accès à un réseau d'experts",
          content: [
            "En faisant appel à Iter Advisors, vous accédez à un vaste réseau de partenaires : investisseurs, banquiers, avocats, experts-comptables et consultants spécialisés. Ce réseau constitue un atout majeur pour accélérer votre développement.",
          ],
        },
      ],
    },
    missions: {
      heading: "Les missions principales d'un DAF externalisé",
      content: [
        "Le DAF externalisé intervient sur un large spectre de missions financières et stratégiques :",
        "Pilotage financier et reporting : mise en place de tableaux de bord, suivi des KPIs financiers, reporting mensuel aux dirigeants et investisseurs.",
        "Gestion de trésorerie : élaboration du prévisionnel de trésorerie, optimisation du BFR (besoin en fonds de roulement), gestion des relations bancaires.",
        "Levée de fonds : préparation du dossier d'investissement, modélisation financière, accompagnement dans les négociations avec les investisseurs.",
        "Structuration des process : mise en place de la comptabilité analytique, automatisation des process financiers, sélection et déploiement d'outils adaptés.",
        "Accompagnement stratégique : conseil en matière de pricing, analyse de rentabilité, aide à la prise de décision stratégique, préparation aux opérations de M&A.",
      ],
    },
    whyChoose: {
      heading: "Pourquoi choisir Iter Advisors comme cabinet de DAF externalisée ?",
      content: [
        "Iter Advisors se distingue par la qualité de ses équipes et la profondeur de son accompagnement. Nos 15 collaborateurs, tous experts de la fonction finance, interviennent avec rigueur et engagement auprès de chaque client.",
        "Notre présence à Barcelone, Paris et Toulouse nous permet d'accompagner des entreprises internationales et de comprendre les spécificités de chaque marché. Nous travaillons avec plus de 30 partenaires technologiques pour garantir une gestion financière moderne et efficace.",
        "La satisfaction de nos clients est notre priorité : nous affichons une note de 5/5 sur Trustfolio, avec 31 avis vérifiés. Cette excellence se traduit par des relations durables et des résultats concrets pour les entreprises que nous accompagnons.",
      ],
    },
    faq: [
      {
        question: "Combien coûte un DAF externalisé ?",
        answer:
          "Le coût d'un DAF externalisé varie en fonction du volume d'intervention et de la complexité des missions. Chez Iter Advisors, nos tarifs s'adaptent à vos besoins : de quelques jours par mois pour un accompagnement régulier à une mission ponctuelle sur un projet spécifique. Contactez-nous pour obtenir un devis personnalisé.",
      },
      {
        question: "Quelle est la différence entre un DAF externalisé et un DAF à temps partagé ?",
        answer:
          "Le DAF externalisé est un terme générique qui englobe toutes les formes d'intervention externe en direction financière. Le DAF à temps partagé est une forme spécifique de DAF externalisé : il intervient de manière récurrente dans l'entreprise, généralement quelques jours par semaine ou par mois, sur une durée plus longue.",
      },
      {
        question: "À quel moment une entreprise a-t-elle besoin d'un DAF externalisé ?",
        answer:
          "Plusieurs signaux peuvent indiquer le besoin d'un DAF externalisé : une croissance rapide nécessitant une structuration financière, une levée de fonds à préparer, un besoin de reporting plus rigoureux pour les investisseurs, ou simplement le souhait d'optimiser la gestion financière sans recruter à temps plein.",
      },
      {
        question: "Comment se passe la collaboration avec un DAF externalisé Iter Advisors ?",
        answer:
          "La collaboration débute par un diagnostic approfondi de votre situation financière et de vos besoins. Nous définissons ensemble le périmètre d'intervention, la fréquence et les objectifs. Notre CFO s'intègre ensuite à votre équipe et travaille en étroite collaboration avec vos équipes internes, vos partenaires comptables et vos investisseurs.",
      },
    ],
    ctaButton: "Prendre rendez-vous",
  },
  en: {
    meta: {
      title: "DAF Externalisé : Bénéfices, Missions et Services | Iter Advisors",
      description:
        "Discover the benefits and missions of a Fractional CFO. Iter Advisors supports SMEs and startups with flexible, expert financial management.",
    },
    breadcrumbLabel: "CFO Outsourced",
    h1: "Why choose a Fractional CFO?",
    intro: [
      "In a constantly changing economic environment, companies need to rely on a solid and responsive finance department. The Fractional CFO provides an ideal solution, bringing high-level expertise without the constraints of permanent recruitment.",
      "At Iter Advisors, we support SMEs, startups and scale-ups in structuring and managing their finance function. Our CFOs work on a part-time or project basis to help you make the best strategic decisions.",
    ],
    partnerSection: {
      heading: "Iter Advisors, your strategic partner",
      content: [
        "Iter Advisors is a Fractional CFO firm based in Barcelona, Paris and Toulouse. We provide our clients with experienced finance directors capable of addressing all the financial challenges of a growing company.",
        "Our approach is built on three fundamental pillars: technical expertise, strategic vision and flexibility of intervention. Each engagement is tailored to meet the specific challenges of your business.",
        "With over 85 companies supported and more than 80 million euros in fundraising completed by our clients, Iter Advisors has established itself as a leading player in outsourced CFO services in France and Spain.",
      ],
    },
    whatIs: {
      heading: "What is a Fractional CFO?",
      content: [
        "A Fractional CFO, or outsourced Chief Financial Officer, is a finance professional who works within your company without being a full-time employee. They assume the same responsibilities as an internal CFO: financial management, cash flow management, reporting, strategic guidance and investor relations.",
      ],
      subsections: [
        {
          heading: "Definition and key role",
          content: [
            "The Fractional CFO manages your company's finance department on a part-time or project basis. Their role is to structure, manage and optimize the finance function to support business growth.",
            "They address key areas: business plan development, cash flow forecasting, implementation of management tools, fundraising preparation, and optimization of accounting and financial processes.",
          ],
        },
        {
          heading: "Difference between CFO, Finance Director and Controller",
          content: [
            "The CFO (Chief Financial Officer) carries both strategic and operational financial responsibilities. A Finance Director typically focuses on day-to-day financial operations, while a Financial Controller concentrates on accounting accuracy and compliance.",
            "At Iter Advisors, our professionals combine these different skills to provide comprehensive support adapted to the specific needs of your organization.",
          ],
        },
      ],
    },
    advantages: {
      heading: "The advantages of a Fractional CFO",
      content: [
        "Hiring a Fractional CFO offers many advantages for growing companies. Here are the main benefits you can expect:",
      ],
      subsections: [
        {
          heading: "Significant cost reduction",
          content: [
            "The cost of a Fractional CFO is significantly lower than that of an in-house CFO. You only pay for the time actually devoted to your company, without social charges or salary benefits. This solution allows you to benefit from high-level expertise while controlling your budget.",
          ],
        },
        {
          heading: "Flexibility and adaptability",
          content: [
            "The Fractional CFO adapts to your real needs. Whether you need a one-off intervention for fundraising or regular part-time support, the volume of intervention is adjustable according to the evolution of your activity.",
          ],
        },
        {
          heading: "Expertise and external perspective",
          content: [
            "Our Fractional CFOs work with many companies across various sectors. This diversity of experience gives them a valuable external perspective and the ability to quickly identify levers for improving your financial performance.",
          ],
        },
        {
          heading: "Access to a network of experts",
          content: [
            "By working with Iter Advisors, you gain access to a vast network of partners: investors, bankers, lawyers, accountants and specialized consultants. This network is a major asset for accelerating your development.",
          ],
        },
      ],
    },
    missions: {
      heading: "Key missions of a Fractional CFO",
      content: [
        "The Fractional CFO covers a wide range of financial and strategic missions:",
        "Financial management and reporting: implementation of dashboards, monitoring of financial KPIs, monthly reporting to executives and investors.",
        "Cash management: cash flow forecasting, working capital optimization, banking relationship management.",
        "Fundraising: preparation of investment dossiers, financial modeling, support in negotiations with investors.",
        "Process structuring: implementation of analytical accounting, automation of financial processes, selection and deployment of appropriate tools.",
        "Strategic support: pricing advice, profitability analysis, strategic decision-making support, preparation for M&A operations.",
      ],
    },
    whyChoose: {
      heading: "Why choose Iter Advisors as your Fractional CFO firm?",
      content: [
        "Iter Advisors stands out for the quality of its teams and the depth of its support. Our 15 employees, all experts in the finance function, work with rigor and commitment for each client.",
        "Our presence in Barcelona, Paris and Toulouse allows us to support international companies and understand the specificities of each market. We work with over 30 technology partners to guarantee modern and efficient financial management.",
        "Client satisfaction is our priority: we have a 5/5 rating on Trustfolio with 31 verified reviews. This excellence translates into lasting relationships and tangible results for the companies we support.",
      ],
    },
    faq: [
      {
        question: "How much does a Fractional CFO cost?",
        answer:
          "The cost of a Fractional CFO varies depending on the volume of work and the complexity of the missions. At Iter Advisors, our rates are tailored to your needs: from a few days per month for regular support to a one-off assignment on a specific project. Contact us for a personalized quote.",
      },
      {
        question: "What is the difference between a Fractional CFO and a part-time CFO?",
        answer:
          "A Fractional CFO is a broad term covering all forms of external intervention in financial management. A part-time CFO is a specific form of outsourced CFO: they work on a recurring basis in the company, usually a few days per week or month, over a longer period.",
      },
      {
        question: "When does a company need a Fractional CFO?",
        answer:
          "Several signals may indicate the need for a Fractional CFO: rapid growth requiring financial structuring, fundraising preparation, a need for more rigorous reporting for investors, or simply the desire to optimize financial management without hiring full-time.",
      },
      {
        question: "How does the collaboration with an Iter Advisors CFO work?",
        answer:
          "The collaboration begins with an in-depth diagnosis of your financial situation and needs. Together, we define the scope of intervention, frequency and objectives. Our CFO then integrates into your team and works closely with your internal teams, accounting partners and investors.",
      },
    ],
    ctaButton: "Make an appointment",
  },
  es: {
    meta: {
      title: "CFO Externalizado: Beneficios, Misiones y Servicios | Iter Advisors",
      description:
        "Descubra los beneficios y misiones de un CFO externalizado. Iter Advisors acompaña a pymes y startups con una dirección financiera flexible y experta.",
    },
    breadcrumbLabel: "CFO Externo",
    h1: "¿Qué aporta un CFO externalizado a una startup?",
    intro: [
      "En un entorno económico en constante evolución, las empresas necesitan contar con una dirección financiera sólida y reactiva. El CFO externalizado ofrece una respuesta adaptada a esta necesidad, aportando una experiencia de alto nivel sin las limitaciones de una contratación permanente.",
      "En Iter Advisors, acompañamos a pymes, startups y scale-ups en la estructuración y gestión de su función financiera. Nuestros CFOs intervienen a tiempo compartido o en misiones puntuales para ayudarle a tomar las mejores decisiones estratégicas.",
    ],
    partnerSection: {
      heading: "Iter Advisors, su socio estratégico",
      content: [
        "Iter Advisors es un gabinete de CFO externalizado con presencia en Barcelona, París y Toulouse. Ponemos a disposición de nuestros clientes directores financieros experimentados, capaces de intervenir en todas las problemáticas financieras de una empresa en crecimiento.",
        "Nuestro enfoque se basa en tres pilares fundamentales: la experiencia técnica, la visión estratégica y la flexibilidad de intervención. Cada misión está diseñada a medida para responder a los retos específicos de su empresa.",
        "Con más de 85 empresas acompañadas y más de 80 millones de euros en rondas de financiación realizadas por nuestros clientes, Iter Advisors se ha posicionado como un actor de referencia en el ámbito del CFO externalizado en Francia y España.",
      ],
    },
    whatIs: {
      heading: "¿Qué es un CFO externalizado?",
      content: [
        "Un CFO externalizado, o Director Financiero externalizado, es un profesional de las finanzas que interviene en su empresa sin ser empleado a tiempo completo. Asume las mismas responsabilidades que un CFO interno: gestión financiera, gestión de tesorería, reporting, acompañamiento estratégico y relaciones con los inversores.",
      ],
      subsections: [
        {
          heading: "Definición y rol principal",
          content: [
            "El CFO externalizado asegura la dirección financiera de su empresa a tiempo compartido o en misión puntual. Su rol es estructurar, gestionar y optimizar la función financiera para apoyar el crecimiento de la empresa.",
            "Interviene en los temas clave: elaboración del plan de negocio, construcción del presupuesto de tesorería, implantación de herramientas de gestión, preparación de rondas de financiación, optimización de los procesos contables y financieros.",
          ],
        },
        {
          heading: "Diferencia entre CFO, Director Financiero y Controller",
          content: [
            "El CFO (Chief Financial Officer) es un término anglosajón que conlleva responsabilidades estratégicas y operativas. El Director Financiero se centra generalmente en las operaciones financieras del día a día, mientras que el Controller Financiero se concentra en la exactitud contable y el cumplimiento normativo.",
            "En Iter Advisors, nuestros profesionales combinan estas diferentes competencias para ofrecer un acompañamiento completo adaptado a las necesidades específicas de su organización.",
          ],
        },
      ],
    },
    advantages: {
      heading: "Las ventajas del CFO externalizado",
      content: [
        "Recurrir a un CFO externalizado presenta numerosas ventajas para las empresas en crecimiento. Estos son los principales beneficios que puede esperar:",
      ],
      subsections: [
        {
          heading: "Reducción significativa de costes",
          content: [
            "El coste de un CFO externalizado es significativamente inferior al de un CFO interno. Solo paga por el tiempo efectivamente dedicado a su empresa, sin cargas sociales ni beneficios salariales. Esta solución permite beneficiarse de una experiencia de alto nivel controlando su presupuesto.",
          ],
        },
        {
          heading: "Flexibilidad y adaptabilidad",
          content: [
            "El CFO externalizado se adapta a sus necesidades reales. Ya sea que necesite una intervención puntual para una ronda de financiación o un acompañamiento regular a tiempo compartido, el volumen de intervención es ajustable según la evolución de su actividad.",
          ],
        },
        {
          heading: "Experiencia y visión externa",
          content: [
            "Nuestros CFOs externalizados intervienen en numerosas empresas y sectores de actividad. Esta diversidad de experiencias les confiere una visión externa valiosa y la capacidad de identificar rápidamente las palancas de mejora de su rendimiento financiero.",
          ],
        },
        {
          heading: "Acceso a una red de expertos",
          content: [
            "Al recurrir a Iter Advisors, accede a una amplia red de socios: inversores, banqueros, abogados, contables y consultores especializados. Esta red constituye un activo fundamental para acelerar su desarrollo.",
          ],
        },
      ],
    },
    missions: {
      heading: "Las misiones principales de un CFO externalizado",
      content: [
        "El CFO externalizado interviene en un amplio espectro de misiones financieras y estratégicas:",
        "Gestión financiera y reporting: implantación de cuadros de mando, seguimiento de KPIs financieros, reporting mensual a directivos e inversores.",
        "Gestión de tesorería: elaboración del presupuesto de tesorería, optimización del fondo de maniobra, gestión de las relaciones bancarias.",
        "Rondas de financiación: preparación del dossier de inversión, modelización financiera, acompañamiento en las negociaciones con los inversores.",
        "Estructuración de procesos: implantación de la contabilidad analítica, automatización de procesos financieros, selección y despliegue de herramientas adaptadas.",
        "Acompañamiento estratégico: asesoramiento en pricing, análisis de rentabilidad, apoyo a la toma de decisiones estratégicas, preparación de operaciones de M&A.",
      ],
    },
    whyChoose: {
      heading: "¿Por qué elegir Iter Advisors como su gabinete de CFO externalizado?",
      content: [
        "Iter Advisors se distingue por la calidad de sus equipos y la profundidad de su acompañamiento. Nuestros 15 colaboradores, todos expertos en la función financiera, intervienen con rigor y compromiso junto a cada cliente.",
        "Nuestra presencia en Barcelona, París y Toulouse nos permite acompañar a empresas internacionales y comprender las especificidades de cada mercado. Trabajamos con más de 30 socios tecnológicos para garantizar una gestión financiera moderna y eficiente.",
        "La satisfacción de nuestros clientes es nuestra prioridad: contamos con una nota de 5/5 en Trustfolio, con 31 opiniones verificadas. Esta excelencia se traduce en relaciones duraderas y resultados concretos para las empresas que acompañamos.",
      ],
    },
    faq: [
      {
        question: "¿Cuánto cuesta un CFO externalizado?",
        answer:
          "El coste de un CFO externalizado varía en función del volumen de intervención y la complejidad de las misiones. En Iter Advisors, nuestras tarifas se adaptan a sus necesidades: desde algunos días al mes para un acompañamiento regular hasta una misión puntual en un proyecto específico. Contáctenos para obtener un presupuesto personalizado.",
      },
      {
        question: "¿Cuál es la diferencia entre un CFO externalizado y un CFO a tiempo compartido?",
        answer:
          "El CFO externalizado es un término genérico que engloba todas las formas de intervención externa en dirección financiera. El CFO a tiempo compartido es una forma específica de CFO externalizado: interviene de manera recurrente en la empresa, generalmente algunos días a la semana o al mes, durante un periodo más largo.",
      },
      {
        question: "¿En qué momento una empresa necesita un CFO externalizado?",
        answer:
          "Varias señales pueden indicar la necesidad de un CFO externalizado: un crecimiento rápido que requiere estructuración financiera, una ronda de financiación por preparar, una necesidad de reporting más riguroso para los inversores, o simplemente el deseo de optimizar la gestión financiera sin contratar a tiempo completo.",
      },
      {
        question: "¿Cómo funciona la colaboración con un CFO de Iter Advisors?",
        answer:
          "La colaboración comienza con un diagnóstico profundo de su situación financiera y sus necesidades. Definimos juntos el perímetro de intervención, la frecuencia y los objetivos. Nuestro CFO se integra entonces en su equipo y trabaja en estrecha colaboración con sus equipos internos, sus socios contables y sus inversores.",
      },
    ],
    ctaButton: "Concierte una cita",
  },
};

export function getDafContent(locale: Locale) {
  return dafContent[locale];
}
