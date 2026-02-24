/**
 * Seed the 5 service single-type pages in Strapi (FR, EN, ES).
 * Uses STRAPI_API_URL and STRAPI_API_TOKEN from .env.local / .env.
 *
 * Prérequis (Strapi v5) : les single types ne peuvent pas être créés via l'API (pas de POST).
 * 1. Dans l'admin Strapi, pour chaque type (Prévisionnel de trésorerie, Gestion financière…),
 *    créer une entrée pour chaque locale (fr, en, es — cf. config/plugins.ts i18n.locales) et enregistrer (même vide).
 * 2. Vérifier que le token API a les permissions « find » et « update » sur ces 5 types.
 * 3. Lancer : npm run seed:service-pages
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

function loadEnvFiles() {
  const root = resolve(process.cwd());
  for (const name of [".env.local", ".env"]) {
    const path = resolve(root, name);
    if (existsSync(path)) {
      const content = readFileSync(path, "utf8");
      for (const line of content.split("\n")) {
        const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
        if (m && process.env[m[1]] === undefined) {
          process.env[m[1]] = m[2].replace(/^["']|["']$/g, "").trim();
        }
      }
    }
  }
}
loadEnvFiles();

const rawStrapiUrl = process.env.STRAPI_API_URL || "http://localhost:1337";
const STRAPI_URL = rawStrapiUrl.replace(/\/admin\/?$/, "") || rawStrapiUrl;
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || "";

const LOCALES = ["fr", "en", "es"] as const;
const LOCALE_FALLBACK: Record<string, string> = { fr: "fr-FR", es: "es-ES" };

const API_NAME_TO_PLURAL: Record<string, string> = {
  "previsionnel-tresorerie-page": "previsionnel-tresorerie-pages",
  "gestion-financiere-externalisee-page":
    "gestion-financiere-externalisee-pages",
  "accompagnement-levee-de-fond-page": "accompagnement-levee-de-fond-pages",
  "comptabilite-externalisation-page": "comptabilite-externalisation-pages",
  "controle-de-gestion-externalise-page":
    "controle-de-gestion-externalise-pages",
};

type StrapiTextNode = { type: "text"; text: string };
type StrapiParagraphBlock = { type: "paragraph"; children: StrapiTextNode[] };
type StrapiHeadingBlock = {
  type: "heading";
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: StrapiTextNode[];
};
type StrapiListItem = { type: "list-item"; children: StrapiTextNode[] };
type StrapiListBlock = {
  type: "list";
  format: "ordered" | "unordered";
  children: StrapiListItem[];
};
type StrapiContentBlock =
  | StrapiParagraphBlock
  | StrapiHeadingBlock
  | StrapiListBlock;

function paragraph(text: string): StrapiParagraphBlock {
  return { type: "paragraph", children: [{ type: "text", text }] };
}
function heading(
  level: 1 | 2 | 3 | 4 | 5 | 6,
  text: string,
): StrapiHeadingBlock {
  return { type: "heading", level, children: [{ type: "text", text }] };
}
function listItem(text: string): StrapiListItem {
  return { type: "list-item", children: [{ type: "text", text }] };
}
function unorderedList(items: string[]): StrapiListBlock {
  return { type: "list", format: "unordered", children: items.map(listItem) };
}
function orderedList(items: string[]): StrapiListBlock {
  return { type: "list", format: "ordered", children: items.map(listItem) };
}

const SERVICE_PAGES: Array<{
  apiName: string;
  fr: {
    heroTitle: string;
    heroSubtitle: string;
    content: StrapiContentBlock[];
    metaTitle: string;
    metaDescription: string;
  };
  en: {
    heroTitle: string;
    heroSubtitle: string;
    content: StrapiContentBlock[];
    metaTitle: string;
    metaDescription: string;
  };
  es: {
    heroTitle: string;
    heroSubtitle: string;
    content: StrapiContentBlock[];
    metaTitle: string;
    metaDescription: string;
  };
}> = [
  // ─────────────────────────────────────────────────────────────────
  // 1. PRÉVISIONNEL DE TRÉSORERIE
  // ─────────────────────────────────────────────────────────────────
  {
    apiName: "previsionnel-tresorerie-page",
    fr: {
      heroTitle: "Prévisionnel de trésorerie",
      heroSubtitle:
        "Anticipez vos flux de trésorerie et pilotez votre activité avec des prévisionnels fiables.",
      content: [
        heading(
          2,
          "Prévisionnel de trésorerie : Une gestion essentielle pour la santé financière de votre entreprise",
        ),
        paragraph(
          "Le prévisionnel de trésorerie est un outil indispensable pour toute entreprise souhaitant anticiper et maîtriser ses flux financiers. Il s'agit d'un document stratégique qui permet d'évaluer les entrées et sorties d'argent sur une période définie. En anticipant les encaissements et les décaissements futurs, les dirigeants peuvent prendre des décisions éclairées et éviter des tensions financières souvent coûteuses.",
        ),
        paragraph(
          "La gestion de la trésorerie est un élément fondamental de la réussite d'une entreprise. Une mauvaise anticipation peut engendrer des problèmes majeurs tels que des retards de paiement, des découverts bancaires ou des pertes d'opportunités d'investissement. Au contraire, une gestion proactive de la trésorerie renforce la résilience de l'entreprise et soutient sa croissance à court et à long terme.",
        ),
        paragraph(
          "Dans cet article, nous vous proposons un guide complet sur le prévisionnel de trésorerie, de sa définition à sa mise en œuvre, en passant par les outils et les meilleures pratiques pour l'optimiser.",
        ),
        paragraph("Prendre rendez-vous"),
        heading(2, "Qu'est-ce qu'un prévisionnel de trésorerie ?"),
        paragraph(
          "Un prévisionnel de trésorerie est un tableau financier détaillé qui sert à anticiper les flux de trésorerie d'une entreprise sur une période donnée. Il est élaboré à partir des prévisions d'encaissements (ventes, apports en capital, subventions) et des décaissements (salaires, charges, paiements fournisseurs, investissements).",
        ),
        paragraph(
          "L'objectif principal de ce document est de fournir une vision claire et précise des ressources financières disponibles à un instant donné. En identifiant les périodes où la trésorerie pourrait être insuffisante, les dirigeants peuvent anticiper les besoins de financement et ajuster leur stratégie en conséquence.",
        ),
        paragraph(
          "Un prévisionnel de trésorerie ne se limite pas à éviter les crises de liquidité. Il constitue également un outil de pilotage permettant d'optimiser les dépenses, d'identifier des marges de manœuvre et de sécuriser les relations avec les investisseurs ou partenaires financiers.",
        ),
        heading(2, 'Téléchargez notre guide exclusif "Cash is Queen & King"'),
        paragraph("Optimisez votre gestion financière dès maintenant !"),
        paragraph(
          "Téléchargez gratuitement notre guide PDF Cash is Queen & King – Conseils pratiques et actionnables pour améliorer la gestion de sa finance en temps incertains.",
        ),
        paragraph("Ce que vous y trouverez :"),
        unorderedList([
          "Conseils concrets pour anticiper vos flux de trésorerie.",
          "Astuces pratiques pour sécuriser votre liquidité.",
          "Outils de suivi et meilleures pratiques financières.",
        ]),
        paragraph("Télécharger le guide"),
        heading(2, "Pourquoi établir un prévisionnel de trésorerie ?"),
        paragraph(
          "Un prévisionnel de trésorerie offre une multitude d'avantages qui justifient son adoption par toutes les entreprises, quel que soit leur secteur d'activité ou leur taille.",
        ),
        heading(3, "Anticipation des besoins financiers"),
        paragraph(
          "L'un des principaux bénéfices du prévisionnel de trésorerie est de pouvoir identifier à l'avance les périodes où un financement externe pourrait être nécessaire. En anticipant ces besoins, une entreprise peut préparer ses négociations avec les banques ou investisseurs, évitant ainsi les situations d'urgence où les conditions de financement sont souvent moins favorables.",
        ),
        heading(3, "Éviter les tensions de trésorerie"),
        paragraph(
          "Un manque de liquidités peut entraîner des conséquences graves, telles que l'impossibilité de payer les fournisseurs ou les salariés, ou encore des pénalités pour retard de paiement. Le prévisionnel permet de prévenir ces problèmes en ajustant les flux entrants et sortants avant qu'ils ne deviennent critiques.",
        ),
        heading(3, "Prise de décisions stratégiques"),
        paragraph(
          "Avec une vision claire de la trésorerie future, les dirigeants peuvent prendre des décisions éclairées concernant les investissements, les embauches ou les dépenses marketing. Ils peuvent également identifier les périodes favorables pour lancer de nouveaux projets ou négocier des délais de paiement plus avantageux avec leurs partenaires.",
        ),
        heading(
          2,
          "Différence entre prévisionnel de trésorerie et budget prévisionnel",
        ),
        paragraph(
          "Le prévisionnel de trésorerie et le budget prévisionnel sont souvent confondus, mais ils répondent à des objectifs distincts.",
        ),
        unorderedList([
          "Le prévisionnel de trésorerie se concentre sur les flux financiers réels : il s'agit des encaissements et des décaissements effectifs, tels qu'ils apparaissent dans les relevés bancaires.",
          "Le budget prévisionnel, en revanche, est une projection globale qui inclut les charges et produits comptables, même s'ils n'ont pas encore d'impact direct sur la trésorerie (amortissements, provisions, etc.).",
        ]),
        paragraph(
          "Ces deux outils sont complémentaires : le prévisionnel de trésorerie offre une vision opérationnelle et immédiate, tandis que le budget prévisionnel permet de planifier à plus long terme en intégrant des objectifs stratégiques.",
        ),
        heading(2, "Comment faire un prévisionnel de trésorerie ?"),
        paragraph(
          "Créer un prévisionnel de trésorerie efficace demande une approche méthodique et l'utilisation d'outils adaptés. Voici les étapes clés pour y parvenir.",
        ),
        heading(3, "1. Collecte des données financières"),
        paragraph(
          "La première étape consiste à rassembler toutes les informations nécessaires pour établir des prévisions fiables. Cela inclut :",
        ),
        unorderedList([
          "Les encaissements prévus : ventes, apports en capital, remboursements clients, subventions.",
          "Les décaissements prévus : salaires, loyers, charges sociales et fiscales, remboursements de prêts, achats de matières premières.",
        ]),
        paragraph(
          "Pour garantir la fiabilité du prévisionnel, il est essentiel d'utiliser des données récentes et précises, issues de relevés bancaires, de factures ou de contrats en cours.",
        ),
        heading(3, "2. Choix de la méthode"),
        paragraph(
          "Deux méthodes principales peuvent être utilisées pour établir un prévisionnel :",
        ),
        unorderedList([
          "La méthode directe, basée sur les flux de trésorerie historiques. Elle est idéale pour les entreprises disposant d'un historique financier solide.",
          "La méthode indirecte, qui repose sur des projections de chiffre d'affaires et de dépenses. Elle est souvent utilisée par les startups ou les entreprises en forte croissance.",
        ]),
        heading(3, "3. Mise à jour régulière"),
        paragraph(
          "Un prévisionnel de trésorerie n'est pas figé : il doit être actualisé régulièrement pour refléter les changements dans l'activité de l'entreprise. En général, il est conseillé de le mettre à jour :",
        ),
        unorderedList([
          "Chaque semaine en cas de tensions financières ou de forte variabilité des flux.",
          "Tous les mois pour suivre l'évolution des objectifs à court terme.",
          "Tous les trimestres ou annuellement pour ajuster la stratégie globale.",
        ]),
        heading(2, "Comment calculer les prévisions de trésorerie ?"),
        paragraph(
          "Pour établir un prévisionnel précis, il est nécessaire de détailler les encaissements et les décaissements sur une période donnée, généralement par mois.",
        ),
        heading(3, "Encaissements"),
        paragraph("Ils comprennent :"),
        unorderedList([
          "Les revenus tirés des ventes de produits ou services.",
          "Les apports en capital (investisseurs, actionnaires).",
          "Les subventions ou aides publiques.",
        ]),
        heading(3, "Décaissements"),
        paragraph("Ils incluent :"),
        unorderedList([
          "Les salaires et charges sociales.",
          "Les paiements fournisseurs (achats de matières premières, prestations).",
          "Les remboursements de prêts et autres dettes.",
          "Les dépenses exceptionnelles (investissements, rénovations).",
        ]),
        paragraph(
          "Une fois ces données collectées, il est possible de calculer des indicateurs clés comme :",
        ),
        unorderedList([
          "Le solde de trésorerie net, qui est la différence entre les encaissements et les décaissements.",
          "Le besoin en fonds de roulement (BFR), qui mesure les ressources nécessaires pour financer le cycle d'exploitation.",
          "Le cash runway, qui indique le nombre de mois avant épuisement des liquidités disponibles.",
        ]),
        heading(2, "Les imprévus : comment les anticiper ?"),
        paragraph(
          "Même avec un prévisionnel de trésorerie rigoureux, des imprévus peuvent survenir. Voici quelques conseils pour mieux les gérer :",
        ),
        unorderedList([
          "Intégrez une marge de sécurité : Prévoyez une réserve de liquidités pour couvrir les imprévus tels que des retards de paiement ou des augmentations de charges.",
          "Analysez régulièrement les écarts : Comparez les prévisions aux flux réels pour identifier les anomalies et ajuster vos hypothèses.",
          "Préparez des scénarios alternatifs : Élaborez plusieurs versions de votre prévisionnel en intégrant des hypothèses optimistes, réalistes et pessimistes.",
        ]),
        heading(2, "Exemple pratique d'un prévisionnel de trésorerie"),
        paragraph(
          "Pour mieux visualiser un prévisionnel de trésorerie, imaginez une PME qui prévoit les flux financiers pour les trois prochains mois.",
        ),
        unorderedList([
          "Mois 1 : Encaissements de 50 000 €, décaissements de 40 000 €. Solde : +10 000 €.",
          "Mois 2 : Encaissements de 45 000 €, décaissements de 50 000 €. Solde : -5 000 €.",
          "Mois 3 : Encaissements de 60 000 €, décaissements de 55 000 €. Solde : +5 000 €.",
        ]),
        paragraph(
          "En cumulant ces résultats, l'entreprise peut anticiper une trésorerie positive, mais constater une tension temporaire au cours du deuxième mois, ce qui l'incitera à solliciter un financement relais ou à reporter certaines dépenses.",
        ),
        heading(2, "Les outils pour automatiser la gestion de la trésorerie"),
        paragraph(
          "Aujourd'hui, de nombreux logiciels permettent d'automatiser la création et le suivi des prévisionnels de trésorerie. Ces outils offrent des fonctionnalités avancées, telles que :",
        ),
        unorderedList([
          "La synchronisation avec les comptes bancaires pour un suivi en temps réel.",
          "La génération de tableaux de bord clairs et visuels.",
          "L'identification automatique des anomalies ou écarts.",
        ]),
        paragraph(
          "Parmi les solutions les plus populaires figurent QuickBooks, Agicap, Spendesk ou encore Regate.",
        ),
        heading(2, "Pourquoi externaliser la gestion de la trésorerie ?"),
        paragraph(
          "Externaliser cette fonction stratégique auprès d'un expert comme Iter Advisors offre plusieurs avantages :",
        ),
        unorderedList([
          "Gain de temps : Les équipes internes peuvent se concentrer sur leur cœur de métier.",
          "Expertise spécialisée : Les experts en gestion financière apportent des solutions sur mesure et des outils performants.",
          "Réduction des risques : Grâce à une analyse rigoureuse, les imprévus sont anticipés et mieux gérés.",
        ]),
        heading(2, "Conclusion"),
        paragraph(
          "Le prévisionnel de trésorerie est bien plus qu'un simple tableau financier : il s'agit d'un levier stratégique qui permet à l'entreprise de rester agile, proactive et résiliente face aux défis économiques.",
        ),
      ],
      metaTitle: "Prévisionnel de trésorerie | Iter Advisors",
      metaDescription:
        "Prévisionnel de trésorerie et pilotage des flux. Accompagnement par Iter Advisors.",
    },
    en: {
      heroTitle: "Cash flow forecast",
      heroSubtitle:
        "Anticipate your cash flows and run your business with reliable forecasts.",
      content: [
        heading(
          2,
          "Cash Flow Forecast: An Essential Tool for Your Company's Financial Health",
        ),
        paragraph(
          "A cash flow forecast is an indispensable tool for any business seeking to anticipate and manage its financial flows. It is a strategic document that evaluates cash inflows and outflows over a defined period. By anticipating future receipts and disbursements, business leaders can make informed decisions and avoid costly financial pressures.",
        ),
        paragraph(
          "Cash management is a fundamental element of a company's success. Poor anticipation can lead to major problems such as late payments, bank overdrafts, or missed investment opportunities. Conversely, proactive cash management strengthens business resilience and supports short- and long-term growth.",
        ),
        paragraph(
          "In this article, we offer a comprehensive guide to cash flow forecasting, from its definition to its implementation, including tools and best practices for optimising it.",
        ),
        paragraph("Book a meeting"),
        heading(2, "What Is a Cash Flow Forecast?"),
        paragraph(
          "A cash flow forecast is a detailed financial table used to anticipate a company's cash flows over a given period. It is built from projections of receipts (sales, capital contributions, grants) and disbursements (salaries, overheads, supplier payments, investments).",
        ),
        paragraph(
          "The primary objective of this document is to provide a clear and precise view of available financial resources at any given moment. By identifying periods when cash could be insufficient, managers can anticipate funding needs and adjust their strategy accordingly.",
        ),
        paragraph(
          "A cash flow forecast is not limited to avoiding liquidity crises. It is also a management tool for optimising expenditure, identifying room for manoeuvre and securing relationships with investors or financial partners.",
        ),
        heading(2, 'Download Our Exclusive Guide "Cash is Queen & King"'),
        paragraph("Optimise your financial management right now!"),
        paragraph(
          "Download our free PDF guide Cash is Queen & King – Practical and actionable advice to improve financial management in uncertain times.",
        ),
        paragraph("What you will find inside:"),
        unorderedList([
          "Concrete tips to anticipate your cash flows.",
          "Practical strategies to secure your liquidity.",
          "Tracking tools and financial best practices.",
        ]),
        paragraph("Download the guide"),
        heading(2, "Why Establish a Cash Flow Forecast?"),
        paragraph(
          "A cash flow forecast offers a multitude of advantages that justify its adoption by all companies, regardless of their sector or size.",
        ),
        heading(3, "Anticipating Financial Needs"),
        paragraph(
          "One of the main benefits of a cash flow forecast is being able to identify in advance the periods when external financing may be needed. By anticipating these needs, a company can prepare its negotiations with banks or investors, thus avoiding emergency situations where financing conditions are often less favourable.",
        ),
        heading(3, "Avoiding Cash Tensions"),
        paragraph(
          "A lack of liquidity can have serious consequences, such as the inability to pay suppliers or employees, or late payment penalties. The forecast helps prevent these problems by adjusting inflows and outflows before they become critical.",
        ),
        heading(3, "Strategic Decision-Making"),
        paragraph(
          "With a clear view of future cash flow, managers can make informed decisions regarding investments, hires, or marketing expenditure. They can also identify favourable periods to launch new projects or negotiate more advantageous payment terms with their partners.",
        ),
        heading(2, "Difference Between Cash Flow Forecast and Budget Forecast"),
        paragraph(
          "The cash flow forecast and the budget forecast are often confused, but they serve distinct objectives.",
        ),
        unorderedList([
          "The cash flow forecast focuses on real financial flows: actual receipts and disbursements as they appear in bank statements.",
          "The budget forecast, on the other hand, is a global projection that includes accounting charges and revenues, even if they do not yet have a direct impact on cash flow (depreciation, provisions, etc.).",
        ]),
        paragraph(
          "These two tools are complementary: the cash flow forecast provides an operational and immediate vision, while the budget forecast enables longer-term planning by integrating strategic objectives.",
        ),
        heading(2, "How to Build a Cash Flow Forecast?"),
        paragraph(
          "Creating an effective cash flow forecast requires a methodical approach and the use of appropriate tools. Here are the key steps to achieve this.",
        ),
        heading(3, "1. Collecting Financial Data"),
        paragraph(
          "The first step is to gather all the information needed to establish reliable forecasts. This includes:",
        ),
        unorderedList([
          "Projected receipts: sales, capital contributions, customer refunds, grants.",
          "Projected disbursements: salaries, rent, social and tax charges, loan repayments, raw material purchases.",
        ]),
        paragraph(
          "To ensure the reliability of the forecast, it is essential to use recent and accurate data from bank statements, invoices, or ongoing contracts.",
        ),
        heading(3, "2. Choosing the Method"),
        paragraph("Two main methods can be used to establish a forecast:"),
        unorderedList([
          "The direct method, based on historical cash flows. Ideal for companies with a solid financial history.",
          "The indirect method, which relies on revenue and expenditure projections. Often used by startups or high-growth companies.",
        ]),
        heading(3, "3. Regular Updates"),
        paragraph(
          "A cash flow forecast is not static: it must be regularly updated to reflect changes in the company's activity. In general, it is advisable to update it:",
        ),
        unorderedList([
          "Every week in the event of financial tensions or high flow variability.",
          "Every month to track progress towards short-term objectives.",
          "Every quarter or annually to adjust the overall strategy.",
        ]),
        heading(2, "How to Calculate Cash Flow Projections?"),
        paragraph(
          "To establish an accurate forecast, it is necessary to detail receipts and disbursements over a given period, typically by month.",
        ),
        heading(3, "Receipts"),
        paragraph("These include:"),
        unorderedList([
          "Revenue from product or service sales.",
          "Capital contributions (investors, shareholders).",
          "Grants or public subsidies.",
        ]),
        heading(3, "Disbursements"),
        paragraph("These include:"),
        unorderedList([
          "Salaries and social charges.",
          "Supplier payments (raw material purchases, services).",
          "Loan and other debt repayments.",
          "Exceptional expenditure (investments, renovations).",
        ]),
        paragraph(
          "Once this data is collected, it is possible to calculate key indicators such as:",
        ),
        unorderedList([
          "Net cash balance, which is the difference between receipts and disbursements.",
          "Working capital requirement (WCR), which measures the resources needed to finance the operating cycle.",
          "Cash runway, which indicates the number of months before available cash is exhausted.",
        ]),
        heading(2, "Unexpected Events: How to Anticipate Them?"),
        paragraph(
          "Even with a rigorous cash flow forecast, unexpected events can occur. Here are some tips to better manage them:",
        ),
        unorderedList([
          "Build in a safety margin: Set aside a cash reserve to cover unforeseen events such as late payments or cost increases.",
          "Regularly analyse variances: Compare forecasts to actual flows to identify anomalies and adjust your assumptions.",
          "Prepare alternative scenarios: Develop several versions of your forecast incorporating optimistic, realistic, and pessimistic assumptions.",
        ]),
        heading(2, "Practical Example of a Cash Flow Forecast"),
        paragraph(
          "To better visualise a cash flow forecast, imagine an SME projecting financial flows for the next three months.",
        ),
        unorderedList([
          "Month 1: Receipts of €50,000, disbursements of €40,000. Balance: +€10,000.",
          "Month 2: Receipts of €45,000, disbursements of €50,000. Balance: -€5,000.",
          "Month 3: Receipts of €60,000, disbursements of €55,000. Balance: +€5,000.",
        ]),
        paragraph(
          "By cumulating these results, the company can anticipate a positive cash position overall, but notice a temporary strain in the second month, prompting it to seek bridge financing or defer certain expenditures.",
        ),
        heading(2, "Tools to Automate Cash Management"),
        paragraph(
          "Today, many software solutions allow the creation and monitoring of cash flow forecasts to be automated. These tools offer advanced features such as:",
        ),
        unorderedList([
          "Synchronisation with bank accounts for real-time tracking.",
          "Generation of clear and visual dashboards.",
          "Automatic identification of anomalies or variances.",
        ]),
        paragraph(
          "Among the most popular solutions are QuickBooks, Agicap, Spendesk, and Regate.",
        ),
        heading(2, "Why Outsource Cash Management?"),
        paragraph(
          "Outsourcing this strategic function to an expert like Iter Advisors offers several advantages:",
        ),
        unorderedList([
          "Time savings: Internal teams can focus on their core business.",
          "Specialised expertise: Financial management experts provide tailored solutions and high-performance tools.",
          "Risk reduction: Thanks to rigorous analysis, unexpected events are anticipated and better managed.",
        ]),
        heading(2, "Conclusion"),
        paragraph(
          "A cash flow forecast is far more than a simple financial table: it is a strategic lever that enables a company to remain agile, proactive, and resilient in the face of economic challenges.",
        ),
      ],
      metaTitle: "Cash flow forecast | Iter Advisors",
      metaDescription:
        "Cash flow forecasting and flow management. Support by Iter Advisors.",
    },
    es: {
      heroTitle: "Previsión de tesorería",
      heroSubtitle:
        "Anticipe sus flujos de tesorería y pilote su actividad con previsiones fiables.",
      content: [
        heading(
          2,
          "Previsional de tesorería: una gestión esencial para la salud financiera de su empresa",
        ),
        paragraph(
          "El previsional de tesorería es una herramienta indispensable para cualquier empresa que desee anticipar y controlar sus flujos financieros. Se trata de un documento estratégico que permite evaluar las entradas y salidas de dinero durante un período definido. Al anticipar los cobros y pagos futuros, los directivos pueden tomar decisiones informadas y evitar tensiones financieras a menudo costosas.",
        ),
        paragraph(
          "La gestión de la tesorería es un elemento fundamental del éxito de una empresa. Una mala anticipación puede generar problemas importantes como retrasos en los pagos, descubiertos bancarios o pérdidas de oportunidades de inversión. Por el contrario, una gestión proactiva de la tesorería refuerza la resiliencia de la empresa y apoya su crecimiento a corto y largo plazo.",
        ),
        paragraph(
          "En este artículo le ofrecemos una guía completa sobre el previsional de tesorería, desde su definición hasta su implementación, pasando por las herramientas y las mejores prácticas para optimizarlo.",
        ),
        paragraph("Reservar una reunión"),
        heading(2, "¿Qué es un previsional de tesorería?"),
        paragraph(
          "Un previsional de tesorería es una tabla financiera detallada que sirve para anticipar los flujos de caja de una empresa durante un período determinado. Se elabora a partir de las previsiones de cobros (ventas, aportaciones de capital, subvenciones) y pagos (salarios, gastos, pagos a proveedores, inversiones).",
        ),
        paragraph(
          "El objetivo principal de este documento es ofrecer una visión clara y precisa de los recursos financieros disponibles en un momento dado. Al identificar los períodos en que la tesorería podría ser insuficiente, los directivos pueden anticipar las necesidades de financiación y ajustar su estrategia en consecuencia.",
        ),
        paragraph(
          "Un previsional de tesorería no se limita a evitar crisis de liquidez. También es una herramienta de pilotaje que permite optimizar los gastos, identificar márgenes de maniobra y asegurar las relaciones con los inversores o socios financieros.",
        ),
        heading(2, 'Descargue nuestra guía exclusiva "Cash is Queen & King"'),
        paragraph("¡Optimice su gestión financiera ahora mismo!"),
        paragraph(
          "Descargue gratuitamente nuestra guía PDF Cash is Queen & King – Consejos prácticos y accionables para mejorar la gestión financiera en tiempos inciertos.",
        ),
        paragraph("Lo que encontrará en su interior:"),
        unorderedList([
          "Consejos concretos para anticipar sus flujos de tesorería.",
          "Estrategias prácticas para asegurar su liquidez.",
          "Herramientas de seguimiento y mejores prácticas financieras.",
        ]),
        paragraph("Descargar la guía"),
        heading(2, "¿Por qué elaborar un previsional de tesorería?"),
        paragraph(
          "Un previsional de tesorería ofrece una multitud de ventajas que justifican su adopción por todas las empresas, independientemente de su sector de actividad o tamaño.",
        ),
        heading(3, "Anticipación de las necesidades financieras"),
        paragraph(
          "Uno de los principales beneficios del previsional de tesorería es poder identificar con antelación los períodos en que podría ser necesaria financiación externa. Al anticipar estas necesidades, una empresa puede preparar sus negociaciones con bancos o inversores, evitando así situaciones de urgencia en las que las condiciones de financiación suelen ser menos favorables.",
        ),
        heading(3, "Evitar las tensiones de tesorería"),
        paragraph(
          "La falta de liquidez puede tener consecuencias graves, como la imposibilidad de pagar a proveedores o empleados, o penalizaciones por demora en los pagos. El previsional permite prevenir estos problemas ajustando los flujos entrantes y salientes antes de que se vuelvan críticos.",
        ),
        heading(3, "Toma de decisiones estratégicas"),
        paragraph(
          "Con una visión clara de la tesorería futura, los directivos pueden tomar decisiones informadas sobre inversiones, contrataciones o gastos de marketing. También pueden identificar períodos favorables para lanzar nuevos proyectos o negociar plazos de pago más ventajosos con sus socios.",
        ),
        heading(
          2,
          "Diferencia entre previsional de tesorería y presupuesto previsional",
        ),
        paragraph(
          "El previsional de tesorería y el presupuesto previsional se confunden con frecuencia, pero responden a objetivos distintos.",
        ),
        unorderedList([
          "El previsional de tesorería se centra en los flujos financieros reales: cobros y pagos efectivos tal y como aparecen en los extractos bancarios.",
          "El presupuesto previsional, en cambio, es una proyección global que incluye gastos e ingresos contables, aunque todavía no tengan un impacto directo en la tesorería (amortizaciones, provisiones, etc.).",
        ]),
        paragraph(
          "Ambas herramientas son complementarias: el previsional de tesorería ofrece una visión operativa e inmediata, mientras que el presupuesto previsional permite planificar a más largo plazo integrando objetivos estratégicos.",
        ),
        heading(2, "¿Cómo elaborar un previsional de tesorería?"),
        paragraph(
          "Crear un previsional de tesorería eficaz requiere un enfoque metódico y el uso de herramientas adecuadas. A continuación se presentan los pasos clave para lograrlo.",
        ),
        heading(3, "1. Recopilación de datos financieros"),
        paragraph(
          "El primer paso consiste en reunir toda la información necesaria para establecer previsiones fiables. Esto incluye:",
        ),
        unorderedList([
          "Los cobros previstos: ventas, aportaciones de capital, reembolsos de clientes, subvenciones.",
          "Los pagos previstos: salarios, alquileres, cargas sociales y fiscales, amortización de préstamos, compras de materias primas.",
        ]),
        paragraph(
          "Para garantizar la fiabilidad del previsional, es esencial utilizar datos recientes y precisos procedentes de extractos bancarios, facturas o contratos en vigor.",
        ),
        heading(3, "2. Elección del método"),
        paragraph(
          "Se pueden utilizar dos métodos principales para elaborar un previsional:",
        ),
        unorderedList([
          "El método directo, basado en los flujos de tesorería históricos. Ideal para empresas con un sólido historial financiero.",
          "El método indirecto, que se basa en proyecciones de facturación y gastos. Utilizado frecuentemente por startups o empresas en fuerte crecimiento.",
        ]),
        heading(3, "3. Actualización periódica"),
        paragraph(
          "Un previsional de tesorería no es estático: debe actualizarse periódicamente para reflejar los cambios en la actividad de la empresa. En general, se recomienda actualizarlo:",
        ),
        unorderedList([
          "Cada semana en caso de tensiones financieras o gran variabilidad de los flujos.",
          "Cada mes para hacer seguimiento de la evolución de los objetivos a corto plazo.",
          "Cada trimestre o anualmente para ajustar la estrategia global.",
        ]),
        heading(2, "¿Cómo calcular las previsiones de tesorería?"),
        paragraph(
          "Para establecer un previsional preciso, es necesario detallar los cobros y pagos durante un período determinado, generalmente por mes.",
        ),
        heading(3, "Cobros"),
        paragraph("Comprenden:"),
        unorderedList([
          "Ingresos procedentes de la venta de productos o servicios.",
          "Aportaciones de capital (inversores, accionistas).",
          "Subvenciones o ayudas públicas.",
        ]),
        heading(3, "Pagos"),
        paragraph("Incluyen:"),
        unorderedList([
          "Salarios y cargas sociales.",
          "Pagos a proveedores (compras de materias primas, prestaciones).",
          "Amortización de préstamos y otras deudas.",
          "Gastos excepcionales (inversiones, reformas).",
        ]),
        paragraph(
          "Una vez recopilados estos datos, es posible calcular indicadores clave como:",
        ),
        unorderedList([
          "El saldo neto de tesorería, que es la diferencia entre cobros y pagos.",
          "La necesidad de fondo de maniobra (NFM), que mide los recursos necesarios para financiar el ciclo de explotación.",
          "El cash runway, que indica el número de meses antes de que se agoten las liquididades disponibles.",
        ]),
        heading(2, "Imprevistos: ¿cómo anticiparlos?"),
        paragraph(
          "Incluso con un previsional de tesorería riguroso, pueden surgir imprevistos. A continuación se ofrecen algunos consejos para gestionarlos mejor:",
        ),
        unorderedList([
          "Incorpore un margen de seguridad: Prevea una reserva de liquidez para cubrir imprevistos como retrasos en los cobros o aumentos de gastos.",
          "Analice periódicamente las desviaciones: Compare las previsiones con los flujos reales para identificar anomalías y ajustar sus hipótesis.",
          "Prepare escenarios alternativos: Elabore varias versiones de su previsional incorporando hipótesis optimistas, realistas y pesimistas.",
        ]),
        heading(2, "Ejemplo práctico de un previsional de tesorería"),
        paragraph(
          "Para visualizar mejor un previsional de tesorería, imagine una pyme que prevé los flujos financieros para los próximos tres meses.",
        ),
        unorderedList([
          "Mes 1: Cobros de 50.000 €, pagos de 40.000 €. Saldo: +10.000 €.",
          "Mes 2: Cobros de 45.000 €, pagos de 50.000 €. Saldo: -5.000 €.",
          "Mes 3: Cobros de 60.000 €, pagos de 55.000 €. Saldo: +5.000 €.",
        ]),
        paragraph(
          "Acumulando estos resultados, la empresa puede anticipar una tesorería positiva en general, pero detectar una tensión temporal en el segundo mes, lo que le llevará a solicitar financiación puente o a aplazar determinados gastos.",
        ),
        heading(2, "Herramientas para automatizar la gestión de la tesorería"),
        paragraph(
          "Hoy en día, numerosos programas informáticos permiten automatizar la creación y el seguimiento de los previsionales de tesorería. Estas herramientas ofrecen funcionalidades avanzadas como:",
        ),
        unorderedList([
          "Sincronización con las cuentas bancarias para un seguimiento en tiempo real.",
          "Generación de cuadros de mando claros y visuales.",
          "Identificación automática de anomalías o desviaciones.",
        ]),
        paragraph(
          "Entre las soluciones más populares se encuentran QuickBooks, Agicap, Spendesk y Regate.",
        ),
        heading(2, "¿Por qué externalizar la gestión de la tesorería?"),
        paragraph(
          "Externalizar esta función estratégica a un experto como Iter Advisors ofrece varias ventajas:",
        ),
        unorderedList([
          "Ahorro de tiempo: Los equipos internos pueden concentrarse en su actividad principal.",
          "Experiencia especializada: Los expertos en gestión financiera aportan soluciones a medida y herramientas de alto rendimiento.",
          "Reducción de riesgos: Gracias a un análisis riguroso, los imprevistos se anticipan y se gestionan mejor.",
        ]),
        heading(2, "Conclusión"),
        paragraph(
          "El previsional de tesorería es mucho más que una simple tabla financiera: es una palanca estratégica que permite a la empresa mantenerse ágil, proactiva y resiliente ante los retos económicos.",
        ),
      ],
      metaTitle: "Previsión de tesorería | Iter Advisors",
      metaDescription:
        "Previsional de tesorería y pilotaje de flujos. Acompañamiento por Iter Advisors.",
    },
  },

  // ─────────────────────────────────────────────────────────────────
  // 2. GESTION FINANCIÈRE EXTERNALISÉE
  // ─────────────────────────────────────────────────────────────────
  {
    apiName: "gestion-financiere-externalisee-page",
    fr: {
      heroTitle: "Gestion financière externalisée",
      heroSubtitle:
        "Une direction financière à la carte, adaptée à la taille et aux enjeux de votre entreprise.",
      content: [
        heading(
          2,
          "Gestion financière externalisée : une solution stratégique pour piloter la croissance de votre entreprise",
        ),
        paragraph(
          "La gestion financière externalisée est devenue un levier incontournable pour les entreprises souhaitant mieux maîtriser leurs finances tout en se concentrant sur leur activité principale. Concrètement, il s'agit de confier à un expert externe tout ou partie des fonctions financières, du suivi de la trésorerie au reporting en passant par le contrôle de gestion.",
        ),
        paragraph(
          "Que vous soyez une startup, une PME ou une ETI, cette approche offre de nombreux avantages stratégiques : réduction des coûts fixes, accès à des compétences spécialisées et amélioration des processus financiers. Vous bénéficiez ainsi d'un accompagnement sur mesure pour piloter la santé financière de votre entreprise, sans les contraintes d'un recrutement en interne.",
        ),
        paragraph("Prendre rendez-vous"),
        heading(2, "Qu'est-ce que la gestion financière externalisée ?"),
        paragraph(
          "La gestion financière externalisée consiste à déléguer la gestion de tout ou partie des fonctions financières à un prestataire externe, souvent un consultant en gestion financière ou un DAF externalisé. Les services pris en charge peuvent inclure :",
        ),
        unorderedList([
          "La gestion de la trésorerie : suivi des flux financiers, anticipation des besoins en liquidité.",
          "Le contrôle de gestion : analyse des coûts, gestion des marges et reporting.",
          "La supervision comptable : coordination avec l'expert-comptable, contrôle des déclarations fiscales et sociales.",
          "L'accompagnement stratégique : soutien dans les décisions de financement, levée de fonds, prévisions budgétaires.",
        ]),
        heading(2, "Pourquoi externaliser sa gestion financière ?"),
        paragraph(
          "Externaliser cette fonction clé permet d'obtenir des bénéfices significatifs :",
        ),
        unorderedList([
          "Réduction des coûts : Vous payez uniquement pour les services utilisés, sans charges sociales ou salariales liées à un DAF interne.",
          "Expertise immédiate : Vous accédez à des compétences financières spécialisées sans période de formation.",
          "Flexibilité : Le service s'adapte à vos besoins, que ce soit pour un suivi mensuel ou une mission ponctuelle (levée de fonds, restructuration).",
          "Optimisation des processus : Les experts apportent des outils et méthodes éprouvées pour fiabiliser vos finances.",
        ]),
        heading(2, "Les avantages de la gestion financière externalisée"),
        paragraph(
          "L'externalisation offre de nombreux atouts pour une gestion efficace des finances :",
        ),
        heading(3, "Expertise et compétences spécialisées"),
        paragraph(
          "L'un des principaux atouts de l'externalisation est l'accès immédiat à des compétences pointues :",
        ),
        unorderedList([
          "Analyse financière avancée : Calcul des marges, gestion des ratios financiers.",
          "Optimisation fiscale : Réduction des charges fiscales et respect des obligations déclaratives.",
          "Gestion des risques : Identification des risques financiers et mise en place de plans correctifs.",
        ]),
        paragraph(
          "Un DAF externalisé intervient avec des années d'expérience, souvent acquises dans plusieurs secteurs d'activité, ce qui apporte un regard neuf et objectif sur vos finances.",
        ),
        heading(3, "Réduction des coûts et flexibilité"),
        paragraph(
          "Recruter un DAF en interne représente souvent un coût conséquent. Par exemple :",
        ),
        unorderedList([
          "Salaire brut annuel moyen d'un DAF senior : entre 100 000 € et 150 000 €.",
          "Charges sociales et cotisations : environ 40 % supplémentaires du salaire brut.",
          "Coût de la formation et de l'intégration.",
        ]),
        paragraph(
          "Avec l'externalisation, ces dépenses sont drastiquement réduites :",
        ),
        unorderedList([
          "Pas de coût de recrutement ou de formation.",
          "Paiement à la mission : généralement entre 1 500 € et 5 000 € par mois selon l'étendue de la prestation.",
          "Une flexibilité totale : le nombre de jours d'intervention peut être ajusté en fonction de vos besoins.",
        ]),
        heading(3, "Amélioration des processus financiers"),
        paragraph(
          "Un expert externe apporte non seulement ses compétences techniques mais aussi des solutions pour améliorer vos processus internes :",
        ),
        unorderedList([
          "Automatisation des tâches répétitives : facturation, rapprochements bancaires, suivi de trésorerie.",
          "Mise en place d'outils de reporting : tableaux de bord financiers clairs et actionnables.",
          "Optimisation des délais de clôture comptable : réduction des délais de clôture mensuelle et annuelle.",
        ]),
        heading(2, "Étude de cas"),
        paragraph("Mitiga Solutions"),
        paragraph("Voir l'étude de cas"),
        paragraph("Activité : Climate Risk Intelligence"),
        paragraph("Chiffre d'affaires initial : 1.6 M€"),
        paragraph("Type de mission : Due Diligence"),
        paragraph("Nombre de salariés : +20"),
        heading(2, "Comment fonctionne la gestion financière externalisée ?"),
        paragraph("Les étapes clés d'une collaboration réussie :"),
        unorderedList([
          "Diagnostic des besoins : Évaluation de la situation financière actuelle et des objectifs à atteindre.",
          "Définition du périmètre : Déterminer les missions à externaliser (trésorerie, reporting, contrôle de gestion).",
          "Sélection du prestataire : Identifier un expert avec une expérience adaptée à votre secteur d'activité.",
          "Mise en place des outils : Intégration de logiciels de gestion et de reporting performants.",
          "Suivi et ajustements : Points de contrôle réguliers pour adapter la prestation aux besoins évolutifs de l'entreprise.",
        ]),
        heading(3, "Les outils et technologies utilisés :"),
        paragraph(
          "Les experts en gestion financière externalisée s'appuient sur des solutions modernes :",
        ),
        unorderedList([
          "Logiciels de gestion comptable : Pennylane, QuickBooks, Regate…",
          "Outils de trésorerie : Agicap, Spendesk.",
          "Outils de reporting : Metabase, PowerBI, Abacum, Anaplan.",
          "ERP : Netsuite, Odoo.",
        ]),
        heading(2, "À qui s'adresse la gestion financière externalisée ?"),
        paragraph(
          "Cette solution convient à un large éventail d'entreprises :",
        ),
        heading(3, "PME et ETI en croissance"),
        paragraph(
          "Les PME et ETI en phase de développement rapide bénéficient de l'externalisation pour :",
        ),
        unorderedList([
          "Structurer leurs processus financiers avant de recruter un DAF interne.",
          "Suivre leurs performances financières avec des indicateurs fiables.",
          "Réduire les coûts tout en profitant d'une expertise pointue.",
        ]),
        heading(3, "Startups et entreprises en développement"),
        paragraph(
          "Pour les startups, externaliser la gestion financière offre plusieurs avantages :",
        ),
        unorderedList([
          "Concentration sur l'innovation et la croissance.",
          "Mise en place d'indicateurs financiers solides pour les levées de fonds.",
          "Conformité financière dès les premières étapes de développement.",
        ]),
        heading(
          2,
          "Les principaux services proposés dans le cadre de la gestion financière externalisée :",
        ),
        unorderedList([
          "Gestion de la trésorerie : suivi quotidien, prévisions et gestion des flux financiers.",
          "Contrôle de gestion : mise en place d'indicateurs, analyse des marges, suivi budgétaire.",
          "Reporting financier : tableaux de bord, rapports mensuels et outils d'analyse.",
          "Accompagnement stratégique : structuration financière, préparation des levées de fonds.",
          "Supervision comptable : coordination avec les experts-comptables et validation des clôtures.",
        ]),
        heading(
          2,
          "Pourquoi choisir Iter Advisors pour votre gestion financière externalisée ?",
        ),
        paragraph(
          "Iter Advisors propose une approche personnalisée et efficace pour répondre à vos besoins financiers.",
        ),
        paragraph("Nos atouts incluent :"),
        unorderedList([
          "Une expertise sectorielle variée : Plus de 10 ans d'expérience auprès de PME, startups et ETI dans des secteurs comme la tech et les services.",
          "Des outils performants : Nous utilisons des solutions modernes comme Pennylane, Spendesk ou Metabase pour un pilotage en temps réel.",
          "Un accompagnement sur mesure : Que ce soit pour une mission ponctuelle ou un suivi régulier, nos prestations sont adaptées à vos objectifs.",
          "Une coordination fluide : Nous collaborons avec vos équipes internes et vos partenaires comptables pour garantir une gestion optimisée.",
        ]),
      ],
      metaTitle: "Gestion financière externalisée | Iter Advisors",
      metaDescription:
        "Direction financière externalisée. Comptabilité, trésorerie, contrôle de gestion.",
    },
    en: {
      heroTitle: "Outsourced financial management",
      heroSubtitle:
        "A tailored finance function to match your company's size and challenges.",
      content: [
        heading(
          2,
          "Outsourced Financial Management: A Strategic Solution for Driving Your Company's Growth",
        ),
        paragraph(
          "Outsourced financial management has become an essential lever for companies seeking better control of their finances while focusing on their core business. In practice, it means entrusting all or part of the finance function to an external expert — from cash monitoring to reporting and management control.",
        ),
        paragraph(
          "Whether you are a startup, an SME, or a mid-sized company, this approach offers numerous strategic benefits: reduced fixed costs, access to specialised skills, and improved financial processes. You benefit from tailored support to manage your company's financial health without the constraints of an internal hire.",
        ),
        paragraph("Book a meeting"),
        heading(2, "What Is Outsourced Financial Management?"),
        paragraph(
          "Outsourced financial management involves delegating the management of all or part of the finance function to an external provider — often a financial management consultant or an outsourced CFO. The services covered can include:",
        ),
        unorderedList([
          "Cash management: monitoring financial flows, anticipating liquidity needs.",
          "Management control: cost analysis, margin management, and reporting.",
          "Accounting supervision: coordination with the chartered accountant, review of tax and social security filings.",
          "Strategic support: assistance with financing decisions, fundraising, and budget forecasting.",
        ]),
        heading(2, "Why Outsource Your Financial Management?"),
        paragraph(
          "Outsourcing this key function delivers significant benefits:",
        ),
        unorderedList([
          "Cost reduction: You only pay for the services you use, with no social or salary costs related to an in-house CFO.",
          "Immediate expertise: You access specialised financial skills without any training period.",
          "Flexibility: The service adapts to your needs, whether for monthly monitoring or a one-off assignment (fundraising, restructuring).",
          "Process optimisation: Experts bring proven tools and methods to make your finances more reliable.",
        ]),
        heading(2, "The Benefits of Outsourced Financial Management"),
        paragraph(
          "Outsourcing offers many advantages for effective financial management:",
        ),
        heading(3, "Expertise and Specialised Skills"),
        paragraph(
          "One of the main assets of outsourcing is immediate access to top-level expertise:",
        ),
        unorderedList([
          "Advanced financial analysis: Margin calculations, management of financial ratios.",
          "Tax optimisation: Reduction of tax charges and compliance with filing obligations.",
          "Risk management: Identification of financial risks and implementation of corrective plans.",
        ]),
        paragraph(
          "An outsourced CFO brings years of experience, often acquired across multiple sectors, providing a fresh and objective perspective on your finances.",
        ),
        heading(3, "Cost Reduction and Flexibility"),
        paragraph(
          "Hiring an in-house CFO often represents a significant cost. For example:",
        ),
        unorderedList([
          "Average annual gross salary for a senior CFO: between €100,000 and €150,000.",
          "Social charges and contributions: approximately 40% on top of the gross salary.",
          "Training and onboarding costs.",
        ]),
        paragraph("With outsourcing, these expenses are drastically reduced:"),
        unorderedList([
          "No recruitment or training costs.",
          "Payment per assignment: typically between €1,500 and €5,000 per month depending on the scope of the service.",
          "Total flexibility: the number of intervention days can be adjusted to your needs.",
        ]),
        heading(3, "Improved Financial Processes"),
        paragraph(
          "An external expert brings not only technical skills but also solutions to improve your internal processes:",
        ),
        unorderedList([
          "Automation of repetitive tasks: invoicing, bank reconciliations, cash monitoring.",
          "Implementation of reporting tools: clear and actionable financial dashboards.",
          "Optimisation of accounting close timelines: reduction of monthly and annual close periods.",
        ]),
        heading(2, "Case Study"),
        paragraph("Mitiga Solutions"),
        paragraph("View the case study"),
        paragraph("Activity: Climate Risk Intelligence"),
        paragraph("Initial revenue: €1.6M"),
        paragraph("Assignment type: Due Diligence"),
        paragraph("Number of employees: +20"),
        heading(2, "How Does Outsourced Financial Management Work?"),
        paragraph("Key steps for a successful collaboration:"),
        unorderedList([
          "Needs assessment: Evaluation of the current financial situation and objectives to be achieved.",
          "Scope definition: Determine which functions to outsource (treasury, reporting, management control).",
          "Provider selection: Identify an expert with experience suited to your sector.",
          "Tool implementation: Integration of effective management and reporting software.",
          "Monitoring and adjustments: Regular checkpoints to adapt the service to the company's evolving needs.",
        ]),
        heading(3, "Tools and Technologies Used"),
        paragraph(
          "Outsourced financial management experts rely on modern solutions:",
        ),
        unorderedList([
          "Accounting software: Pennylane, QuickBooks, Regate…",
          "Treasury tools: Agicap, Spendesk.",
          "Reporting tools: Metabase, PowerBI, Abacum, Anaplan.",
          "ERP: Netsuite, Odoo.",
        ]),
        heading(2, "Who Is Outsourced Financial Management For?"),
        paragraph("This solution is suited to a wide range of companies:"),
        heading(3, "Growing SMEs and Mid-Sized Companies"),
        paragraph(
          "SMEs and mid-sized companies in rapid development benefit from outsourcing to:",
        ),
        unorderedList([
          "Structure their financial processes before hiring an in-house CFO.",
          "Track their financial performance with reliable indicators.",
          "Reduce costs while benefiting from top-level expertise.",
        ]),
        heading(3, "Startups and Developing Companies"),
        paragraph(
          "For startups, outsourcing financial management offers several advantages:",
        ),
        unorderedList([
          "Focus on innovation and growth.",
          "Establishing solid financial indicators for fundraising rounds.",
          "Financial compliance from the earliest stages of development.",
        ]),
        heading(
          2,
          "Key Services Offered Under Outsourced Financial Management",
        ),
        unorderedList([
          "Cash management: daily monitoring, forecasts, and management of financial flows.",
          "Management control: setting up indicators, margin analysis, budget tracking.",
          "Financial reporting: dashboards, monthly reports, and analysis tools.",
          "Strategic support: financial structuring, fundraising preparation.",
          "Accounting supervision: coordination with chartered accountants and validation of close processes.",
        ]),
        heading(
          2,
          "Why Choose Iter Advisors for Your Outsourced Financial Management?",
        ),
        paragraph(
          "Iter Advisors offers a personalised and effective approach to meet your financial needs.",
        ),
        paragraph("Our strengths include:"),
        unorderedList([
          "Varied sector expertise: Over 10 years of experience with SMEs, startups, and mid-sized companies in sectors such as tech and services.",
          "High-performance tools: We use modern solutions such as Pennylane, Spendesk, and Metabase for real-time management.",
          "Tailored support: Whether for a one-off assignment or regular monitoring, our services are adapted to your objectives.",
          "Seamless coordination: We work with your internal teams and accounting partners to guarantee optimised management.",
        ]),
      ],
      metaTitle: "Outsourced financial management | Iter Advisors",
      metaDescription:
        "Outsourced finance function. Accounting, treasury, management control.",
    },
    es: {
      heroTitle: "Gestión financiera externalizada",
      heroSubtitle:
        "Una dirección financiera a la carta, adaptada al tamaño y a los retos de su empresa.",
      content: [
        heading(
          2,
          "Gestión financiera externalizada: una solución estratégica para impulsar el crecimiento de su empresa",
        ),
        paragraph(
          "La gestión financiera externalizada se ha convertido en una palanca imprescindible para las empresas que desean controlar mejor sus finanzas y al mismo tiempo concentrarse en su actividad principal. En la práctica, consiste en confiar a un experto externo la totalidad o parte de las funciones financieras, desde el seguimiento de la tesorería hasta el reporting, pasando por el control de gestión.",
        ),
        paragraph(
          "Tanto si es una startup, una pyme o una empresa de tamaño intermedio, este enfoque ofrece numerosas ventajas estratégicas: reducción de costes fijos, acceso a competencias especializadas y mejora de los procesos financieros. Así se beneficia de un acompañamiento a medida para gestionar la salud financiera de su empresa, sin las limitaciones de una contratación interna.",
        ),
        paragraph("Reservar una reunión"),
        heading(2, "¿Qué es la gestión financiera externalizada?"),
        paragraph(
          "La gestión financiera externalizada consiste en delegar la gestión de la totalidad o parte de las funciones financieras a un proveedor externo, generalmente un consultor de gestión financiera o un CFO externalizado. Los servicios cubiertos pueden incluir:",
        ),
        unorderedList([
          "Gestión de la tesorería: seguimiento de los flujos financieros, anticipación de las necesidades de liquidez.",
          "Control de gestión: análisis de costes, gestión de márgenes y reporting.",
          "Supervisión contable: coordinación con el asesor contable, revisión de declaraciones fiscales y de Seguridad Social.",
          "Acompañamiento estratégico: apoyo en decisiones de financiación, captación de fondos y previsiones presupuestarias.",
        ]),
        heading(2, "¿Por qué externalizar la gestión financiera?"),
        paragraph(
          "Externalizar esta función clave permite obtener beneficios significativos:",
        ),
        unorderedList([
          "Reducción de costes: Solo paga por los servicios utilizados, sin cargas sociales ni salariales ligadas a un CFO interno.",
          "Experiencia inmediata: Accede a competencias financieras especializadas sin período de formación.",
          "Flexibilidad: El servicio se adapta a sus necesidades, tanto para un seguimiento mensual como para una misión puntual (captación de fondos, reestructuración).",
          "Optimización de procesos: Los expertos aportan herramientas y métodos probados para hacer sus finanzas más fiables.",
        ]),
        heading(2, "Las ventajas de la gestión financiera externalizada"),
        paragraph(
          "La externalización ofrece numerosas ventajas para una gestión financiera eficaz:",
        ),
        heading(3, "Experiencia y competencias especializadas"),
        paragraph(
          "Una de las principales ventajas de la externalización es el acceso inmediato a competencias de alto nivel:",
        ),
        unorderedList([
          "Análisis financiero avanzado: Cálculo de márgenes, gestión de ratios financieros.",
          "Optimización fiscal: Reducción de la carga fiscal y cumplimiento de las obligaciones declarativas.",
          "Gestión de riesgos: Identificación de riesgos financieros e implantación de planes correctivos.",
        ]),
        paragraph(
          "Un CFO externalizado interviene con años de experiencia, adquirida a menudo en varios sectores de actividad, lo que aporta una perspectiva nueva y objetiva sobre sus finanzas.",
        ),
        heading(3, "Reducción de costes y flexibilidad"),
        paragraph(
          "Contratar un CFO interno suele suponer un coste considerable. Por ejemplo:",
        ),
        unorderedList([
          "Salario bruto anual medio de un CFO sénior: entre 100.000 € y 150.000 €.",
          "Cargas sociales y cotizaciones: aproximadamente un 40 % adicional sobre el salario bruto.",
          "Costes de formación e incorporación.",
        ]),
        paragraph(
          "Con la externalización, estos gastos se reducen drásticamente:",
        ),
        unorderedList([
          "Sin costes de selección ni de formación.",
          "Pago por misión: generalmente entre 1.500 € y 5.000 € al mes según el alcance del servicio.",
          "Flexibilidad total: el número de días de intervención puede ajustarse a sus necesidades.",
        ]),
        heading(3, "Mejora de los procesos financieros"),
        paragraph(
          "Un experto externo aporta no solo competencias técnicas sino también soluciones para mejorar sus procesos internos:",
        ),
        unorderedList([
          "Automatización de tareas repetitivas: facturación, conciliaciones bancarias, seguimiento de tesorería.",
          "Implantación de herramientas de reporting: cuadros de mando financieros claros y accionables.",
          "Optimización de los plazos de cierre contable: reducción de los plazos de cierre mensual y anual.",
        ]),
        heading(2, "Caso práctico"),
        paragraph("Mitiga Solutions"),
        paragraph("Ver el caso práctico"),
        paragraph("Actividad: Climate Risk Intelligence"),
        paragraph("Facturación inicial: 1,6 M€"),
        paragraph("Tipo de misión: Due Diligence"),
        paragraph("Número de empleados: +20"),
        heading(2, "¿Cómo funciona la gestión financiera externalizada?"),
        paragraph("Etapas clave para una colaboración exitosa:"),
        unorderedList([
          "Diagnóstico de necesidades: Evaluación de la situación financiera actual y de los objetivos a alcanzar.",
          "Definición del alcance: Determinar las funciones a externalizar (tesorería, reporting, control de gestión).",
          "Selección del proveedor: Identificar a un experto con experiencia adaptada a su sector de actividad.",
          "Implantación de herramientas: Integración de software de gestión y reporting de alto rendimiento.",
          "Seguimiento y ajustes: Puntos de control periódicos para adaptar el servicio a las necesidades cambiantes de la empresa.",
        ]),
        heading(3, "Herramientas y tecnologías utilizadas"),
        paragraph(
          "Los expertos en gestión financiera externalizada se apoyan en soluciones modernas:",
        ),
        unorderedList([
          "Software de gestión contable: Pennylane, QuickBooks, Regate…",
          "Herramientas de tesorería: Agicap, Spendesk.",
          "Herramientas de reporting: Metabase, PowerBI, Abacum, Anaplan.",
          "ERP: Netsuite, Odoo.",
        ]),
        heading(2, "¿A quién va dirigida la gestión financiera externalizada?"),
        paragraph(
          "Esta solución es adecuada para un amplio abanico de empresas:",
        ),
        heading(3, "Pymes y empresas de tamaño intermedio en crecimiento"),
        paragraph(
          "Las pymes y empresas de tamaño intermedio en fase de desarrollo rápido se benefician de la externalización para:",
        ),
        unorderedList([
          "Estructurar sus procesos financieros antes de contratar un CFO interno.",
          "Hacer seguimiento de su desempeño financiero con indicadores fiables.",
          "Reducir costes aprovechando una experiencia de alto nivel.",
        ]),
        heading(3, "Startups y empresas en desarrollo"),
        paragraph(
          "Para las startups, externalizar la gestión financiera ofrece varias ventajas:",
        ),
        unorderedList([
          "Concentración en la innovación y el crecimiento.",
          "Establecimiento de indicadores financieros sólidos para las rondas de financiación.",
          "Cumplimiento financiero desde las primeras etapas de desarrollo.",
        ]),
        heading(
          2,
          "Principales servicios ofrecidos en el marco de la gestión financiera externalizada",
        ),
        unorderedList([
          "Gestión de la tesorería: seguimiento diario, previsiones y gestión de flujos financieros.",
          "Control de gestión: implantación de indicadores, análisis de márgenes, seguimiento presupuestario.",
          "Reporting financiero: cuadros de mando, informes mensuales y herramientas de análisis.",
          "Acompañamiento estratégico: estructuración financiera, preparación de rondas de financiación.",
          "Supervisión contable: coordinación con asesores contables y validación de cierres.",
        ]),
        heading(
          2,
          "¿Por qué elegir Iter Advisors para su gestión financiera externalizada?",
        ),
        paragraph(
          "Iter Advisors ofrece un enfoque personalizado y eficaz para satisfacer sus necesidades financieras.",
        ),
        paragraph("Nuestras fortalezas incluyen:"),
        unorderedList([
          "Experiencia sectorial variada: Más de 10 años de experiencia con pymes, startups y empresas de tamaño intermedio en sectores como la tecnología y los servicios.",
          "Herramientas de alto rendimiento: Utilizamos soluciones modernas como Pennylane, Spendesk y Metabase para una gestión en tiempo real.",
          "Acompañamiento a medida: Tanto para una misión puntual como para un seguimiento regular, nuestros servicios se adaptan a sus objetivos.",
          "Coordinación fluida: Colaboramos con sus equipos internos y sus socios contables para garantizar una gestión optimizada.",
        ]),
      ],
      metaTitle: "Gestión financiera externalizada | Iter Advisors",
      metaDescription:
        "Dirección financiera externalizada. Contabilidad, tesorería, control de gestión.",
    },
  },

  // ─────────────────────────────────────────────────────────────────
  // 3. ACCOMPAGNEMENT LEVÉE DE FONDS
  // ─────────────────────────────────────────────────────────────────
  {
    apiName: "accompagnement-levee-de-fond-page",
    fr: {
      heroTitle: "Accompagnement levée de fonds",
      heroSubtitle:
        "Préparez et réussissez vos levées avec un partenaire expérimenté à vos côtés.",
      content: [
        heading(
          2,
          "Accompagnement à la levée de fonds : Boostez votre croissance avec les bons investisseurs",
        ),
        paragraph(
          "La levée de fonds est une étape cruciale dans la vie d'une entreprise, particulièrement pour les startups et les PME en quête de croissance. Pourtant, réussir ce processus peut s'avérer complexe sans un accompagnement adapté.",
        ),
        paragraph(
          "Chez Iter Advisors, nous sommes spécialisés dans l'optimisation des projets de financement, en mettant à profit notre expertise et notre réseau pour maximiser vos chances de succès.",
        ),
        paragraph(
          "Avec un accompagnement expert, vous pourrez structurer votre projet, identifier les bons investisseurs et négocier des conditions avantageuses pour accélérer votre développement.",
        ),
        paragraph(
          "Alors, pourquoi ne pas transformer vos ambitions en réalité dès aujourd'hui et boostez votre croissance ?",
        ),
        paragraph("Prendre rendez-vous"),
        heading(
          2,
          "Pourquoi faire appel à un accompagnement pour votre levée de fonds ?",
        ),
        paragraph(
          "Lorsque vous envisagez une levée de fonds, la réussite du processus dépend non seulement de la qualité de votre projet, mais aussi de votre capacité à convaincre les investisseurs et à gérer chaque étape avec rigueur. Un accompagnement professionnel transforme cette étape stratégique en une opportunité maximisée. Voici pourquoi.",
        ),
        heading(3, "Gain de temps : concentrez-vous sur votre cœur de métier"),
        paragraph(
          "La levée de fonds est un processus exigeant qui nécessite une grande préparation. Entre l'élaboration du business plan, les projections financières, les recherches d'investisseurs et les négociations, chaque étape demande un investissement en temps considérable. En externalisant cet accompagnement, vous libérez des ressources précieuses pour vous concentrer sur le développement opérationnel de votre entreprise.",
        ),
        paragraph(
          "Un accompagnateur expérimenté gère les démarches chronophages telles que :",
        ),
        unorderedList([
          "L'analyse des besoins financiers.",
          "La rédaction et l'optimisation des documents-clés (business plan, pitch deck, projections financières).",
          "La prise de contact et la relance des investisseurs potentiels.",
        ]),
        paragraph(
          "Un cas d'usage assez classique est celui d'une startup en pleine expansion qui peut consacrer son énergie à finaliser un produit ou à conquérir de nouveaux marchés pendant que l'accompagnateur s'occupe des aspects financiers et juridiques de la levée de fonds.",
        ),
        heading(
          3,
          "Expertise : des conseils stratégiques pour structurer votre projet",
        ),
        paragraph(
          "Un consultant expert en levée de fonds apporte une connaissance approfondie des attentes des investisseurs. Il vous aide à affiner chaque aspect de votre dossier pour qu'il soit convaincant et aligné avec les critères des acteurs financiers. Cela inclut :",
        ),
        unorderedList([
          "Une structuration claire de votre projet : vos ambitions sont traduites en données compréhensibles et mesurables.",
          "Une stratégie adaptée : chaque secteur et chaque type d'investisseur (fonds d'investissement, business angels, banques) a des attentes spécifiques.",
          "Des prévisions financières solides : basées sur des hypothèses réalistes et des benchmarks sectoriels.",
        ]),
        paragraph(
          "Impact direct : Un accompagnement expert augmente vos chances d'attirer des financements adaptés à votre vision et vos besoins.",
        ),
        heading(3, "Réseau qualifié : accédez à des investisseurs pertinents"),
        paragraph(
          "L'un des grands défis lors d'une levée de fonds est de trouver les bons investisseurs, ceux qui partagent votre vision et sont prêts à s'engager dans votre projet. Un accompagnateur expérimenté dispose souvent d'un réseau solide comprenant :",
        ),
        unorderedList([
          "Des fonds d'investissement spécialisés dans votre secteur.",
          "Des business angels prêts à soutenir les entreprises en phase de lancement ou de croissance.",
          "Des banques ou institutions financières offrant des solutions adaptées aux besoins des PME et startups.",
        ]),
        paragraph(
          "Plutôt que de démarcher un large éventail d'investisseurs de manière aléatoire, vous bénéficiez d'un accès direct à un panel qualifié, augmentant ainsi l'efficacité et les chances de succès de vos démarches.",
        ),
        heading(3, "Optimisation de chaque étape : un levier stratégique"),
        paragraph(
          "En confiant votre levée de fonds à des professionnels, vous assurez une coordination fluide entre les différentes phases du projet. Cela réduit les risques d'erreurs, comme un business plan mal structuré ou des négociations mal gérées, qui pourraient compromettre votre levée de fonds.",
        ),
        paragraph(
          "Un accompagnement structuré est un investissement stratégique qui maximise vos chances de succès tout en limitant les efforts nécessaires de votre côté. Cette approche vous permet non seulement de sécuriser des financements, mais également de poser les bases d'une relation fructueuse avec vos investisseurs.",
        ),
        heading(2, "Les étapes clés d'une levée de fonds réussie"),
        paragraph(
          "Réussir une levée de fonds demande une planification rigoureuse et un pilotage précis à chaque étape. Voici le processus détaillé pour transformer votre projet en un succès financier.",
        ),
        heading(3, "1. Analyse du projet : comprendre vos besoins financiers"),
        paragraph(
          "La première étape consiste à définir clairement pourquoi vous avez besoin de fonds et à quel montant. Il s'agit d'évaluer vos besoins financiers en fonction de vos objectifs stratégiques, comme le développement de nouveaux produits, l'expansion sur un marché international ou le renforcement des équipes commerciales.",
        ),
        paragraph("Pour cela, il est essentiel de :"),
        unorderedList([
          "Identifier les projets prioritaires à financer.",
          "Évaluer le montant nécessaire pour couvrir vos besoins.",
          "Déterminer le type de financement (dilutif ou non-dilutif) le plus adapté à votre situation.",
        ]),
        paragraph(
          "Cette analyse approfondie pose les bases d'une stratégie de levée de fonds cohérente.",
        ),
        heading(
          3,
          "2. Préparation des documents clés : pensez à soigner votre présentation",
        ),
        paragraph(
          "Une levée de fonds repose en grande partie sur la qualité des documents présentés aux investisseurs. Ces documents doivent non seulement être convaincants, mais aussi refléter une vision claire et réaliste de votre entreprise.",
        ),
        paragraph("Parmi les principaux éléments à préparer :"),
        unorderedList([
          "Business plan complet : Décrivez votre marché, votre stratégie et vos objectifs de manière structurée.",
          "Projections financières détaillées : Incluez des prévisions de revenus, marges et trésorerie sur les 3 à 5 prochaines années.",
          "Pitch deck accrocheur : Un support visuel clair et percutant pour convaincre rapidement vos interlocuteurs.",
          "Analyse des risques : Identifiez les challenges potentiels et expliquez comment vous comptez les surmonter.",
        ]),
        paragraph(
          "Une présentation bien préparée démontre votre professionnalisme et inspire confiance aux investisseurs.",
        ),
        heading(
          3,
          "3. Recherche d'investisseurs : ciblez les bons partenaires",
        ),
        paragraph(
          "Trouver les bons investisseurs est une étape clé pour sécuriser un financement. Chaque projet s'adresse à des investisseurs spécifiques, en fonction du secteur, de la taille de l'entreprise ou encore de l'objectif de financement.",
        ),
        paragraph("Quelques pistes pour identifier vos partenaires :"),
        unorderedList([
          "Business angels : Idéal pour les jeunes entreprises en phase de lancement.",
          "Fonds de capital-risque (VC) : Conçus pour soutenir les startups à fort potentiel de croissance.",
          "Banques et institutions financières : Particulièrement adaptées aux entreprises recherchant des solutions non-dilutives.",
          "Fonds spécialisés : Certains fonds ciblent des niches sectorielles comme la tech, la santé ou l'écologie.",
        ]),
        paragraph(
          "Cette étape demande du temps et une approche stratégique. Travailler avec un accompagnateur peut faciliter l'accès à un réseau d'investisseurs qualifiés.",
        ),
        heading(3, "4. Négociations : obtenez les meilleures conditions"),
        paragraph(
          "Les négociations avec les investisseurs sont une phase délicate qui exige une parfaite maîtrise des aspects financiers et juridiques. Elles portent sur plusieurs éléments cruciaux :",
        ),
        unorderedList([
          "Valorisation de l'entreprise : Trouver un équilibre entre les attentes des investisseurs et vos objectifs.",
          "Pourcentage de dilution : Définir une part de capital cédée qui reste acceptable pour le fondateur.",
          "Conditions de sortie : Prévoir les modalités permettant aux investisseurs de récupérer leur mise.",
        ]),
        heading(3, "5. Finalisation : concrétisez votre levée de fonds"),
        paragraph(
          "Une fois les accords trouvés, il est temps de formaliser et d'exécuter les décisions. Cela inclut :",
        ),
        unorderedList([
          "La signature des documents juridiques, comme le pacte d'actionnaires.",
          "La mise en œuvre des financements, avec des étapes claires pour l'utilisation des fonds.",
          "La préparation des reportings financiers pour assurer un suivi transparent des investissements.",
        ]),
        paragraph(
          "Cette phase marque le début d'une collaboration fructueuse avec vos investisseurs. Une bonne communication dès ce stade pose les bases d'une relation de confiance sur le long terme.",
        ),
        heading(2, "Étude de cas"),
        paragraph("NUUBB"),
        paragraph("Voir l'étude de cas"),
        paragraph("Activité : Cyber Security & Hardware / IT Software"),
        paragraph("Chiffre d'affaire initial : 9 M€"),
        paragraph("Type de mission : CFO, Due Diligence, Contrôle de Gestion"),
        paragraph("Nombre de salariés : 36"),
        heading(2, "Les 3 acteurs clés de votre levée de fonds"),
        paragraph(
          "Réussir une levée de fonds repose sur la collaboration étroite entre trois acteurs principaux, chacun jouant un rôle complémentaire et essentiel.",
        ),
        heading(3, "L'entrepreneur : le moteur du projet"),
        paragraph(
          "En tant que dirigeant, vous êtes au cœur du processus. Votre rôle ne se limite pas à présenter un dossier solide ; vous devez également inspirer confiance et partager votre vision avec les investisseurs. Votre implication personnelle est déterminante pour :",
        ),
        unorderedList([
          "Définir des objectifs clairs : Que souhaitez-vous accomplir avec cette levée ? Croissance, innovation, expansion internationale ?",
          "Raconter une histoire convaincante : Les investisseurs sont séduits par une mission captivante et des ambitions réalistes.",
          "Démontrer votre leadership : Un entrepreneur engagé et structuré rassure les investisseurs sur sa capacité à mener son projet à terme.",
        ]),
        heading(3, "Les investisseurs : les partenaires du succès"),
        paragraph(
          "Les investisseurs ne sont pas de simples sources de financement ; ils deviennent des alliés stratégiques. Leur rôle peut varier selon leur nature :",
        ),
        unorderedList([
          "Business angels : Ils offrent un soutien financier rapide et un accompagnement personnalisé grâce à leur expertise entrepreneuriale.",
          "Fonds d'investissement : Ils apportent des capitaux importants, ainsi qu'un réseau de contacts et des ressources pour soutenir votre expansion.",
          "Institutions financières : Prêts ou financements dilutifs, elles vous aident à diversifier vos sources de financement.",
        ]),
        paragraph(
          "Le bon investisseur est celui qui comprend votre vision et est prêt à s'engager sur le long terme pour soutenir votre croissance.",
        ),
        heading(
          3,
          "Le leveur de fonds : votre guide tout au long du processus",
        ),
        paragraph(
          "Faire appel à un leveur de fonds expérimenté, ou à un conseiller spécialisé, peut être une véritable valeur ajoutée pour structurer efficacement votre démarche. Leur expertise permet de :",
        ),
        unorderedList([
          "Cibler les investisseurs adaptés à vos besoins et à votre secteur d'activité.",
          "Optimiser vos documents financiers et juridiques pour maximiser leur impact.",
          "Négocier des termes avantageux et éviter les pièges courants.",
        ]),
        paragraph(
          "Un leveur de fonds agit comme un facilitateur, vous permettant de naviguer sereinement à travers les complexités du processus.",
        ),
        heading(2, "Les avantages de faire appel à un leveur de fonds"),
        paragraph(
          "Collaborer avec un leveur de fonds ou un expert en financement offre des avantages concrets qui peuvent transformer votre levée de fonds.",
        ),
        heading(3, "Expertise et gain de temps"),
        paragraph(
          "Lever des fonds est un processus complexe et chronophage. Un leveur de fonds vous permet de :",
        ),
        unorderedList([
          "Accélérer vos démarches : En identifiant rapidement les investisseurs qualifiés et intéressés par votre projet.",
          "Structurer vos documents : Business plan, projections financières et pitch, tout est optimisé pour séduire les investisseurs.",
          "Anticiper les étapes clés : Grâce à leurs connaissances, ils vous guident pour éviter les erreurs fréquentes.",
        ]),
        heading(3, "Améliorer les conditions de financement"),
        paragraph(
          "Les leveurs de fonds expérimentés sont des négociateurs aguerris. Leur rôle est de :",
        ),
        unorderedList([
          "Optimiser les termes des accords pour maximiser les bénéfices pour votre entreprise.",
          "Vous conseiller sur les options de financement les plus avantageuses, qu'il s'agisse de financement dilutif ou non dilutif.",
          "Minimiser les risques financiers et juridiques grâce à une expertise pointue.",
        ]),
        paragraph(
          "Avec leur aide, vous êtes mieux préparé pour négocier des accords équilibrés et favorables à la pérennité de votre activité !",
        ),
        heading(2, "Pourquoi choisir Iter Advisors pour vous accompagner ?"),
        paragraph(
          "Lever des fonds est une démarche stratégique qui nécessite une expertise pointue et un accompagnement sur mesure. Chez Iter Advisors, nous nous positionnons comme des partenaires de confiance pour vous guider dans cette étape cruciale.",
        ),
        heading(
          3,
          "Une expertise reconnue et un réseau de partenaires fiables",
        ),
        paragraph(
          "Nous sommes habitués à gérer des projets de financement complexes pour des entreprises de toutes tailles, qu'il s'agisse de startups en phase de croissance ou de PME souhaitant accélérer leur développement. Bien que nous ne soyons pas leveurs de fonds, nous mettons à votre disposition :",
        ),
        unorderedList([
          "Notre expertise en gestion financière stratégique : Élaboration de projections réalistes, analyses financières solides.",
          "Notre réseau étendu d'investisseurs et de partenaires : Un atout pour maximiser vos opportunités.",
        ]),
        paragraph(
          "Cette approche garantit que chaque étape de votre levée est optimisée, de la préparation à la finalisation.",
        ),
        heading(3, "Un accompagnement personnalisé à chaque étape"),
        paragraph(
          "Chez Iter Advisors, nous savons que chaque projet est unique. C'est pourquoi nous offrons un accompagnement sur mesure, basé sur vos besoins spécifiques. Voici ce que nous faisons pour vous :",
        ),
        unorderedList([
          "Structurer vos besoins financiers : Identification des montants nécessaires et élaboration de stratégies adaptées.",
          "Vous conseiller sur le choix des investisseurs : Sélection des partenaires alignés avec vos valeurs et vos objectifs.",
          "Assurer un suivi rigoureux : Nous restons à vos côtés pour garantir la fluidité et le succès du processus.",
        ]),
        paragraph(
          "Avec Iter Advisors, votre levée de fonds devient plus qu'un simple financement : c'est une opportunité stratégique pour accélérer votre croissance et renforcer vos bases financières.",
        ),
      ],
      metaTitle: "Accompagnement levée de fonds | Iter Advisors",
      metaDescription:
        "Préparation et accompagnement levée de fonds. Iter Advisors.",
    },
    en: {
      heroTitle: "Fundraising support",
      heroSubtitle:
        "Prepare and succeed in your fundraising rounds with an experienced partner by your side.",
      content: [
        heading(
          2,
          "Fundraising Support: Boost Your Growth With the Right Investors",
        ),
        paragraph(
          "Fundraising is a crucial milestone in the life of a company, particularly for startups and SMEs seeking growth. Yet succeeding in this process can be complex without the right support.",
        ),
        paragraph(
          "At Iter Advisors, we specialise in optimising financing projects, leveraging our expertise and network to maximise your chances of success.",
        ),
        paragraph(
          "With expert support, you will be able to structure your project, identify the right investors, and negotiate advantageous terms to accelerate your development.",
        ),
        paragraph(
          "So why not turn your ambitions into reality today and boost your growth?",
        ),
        paragraph("Book a meeting"),
        heading(2, "Why Seek Support for Your Fundraising?"),
        paragraph(
          "When planning a fundraising round, success depends not only on the quality of your project but also on your ability to convince investors and manage each step rigorously. Professional support transforms this strategic milestone into a maximised opportunity. Here is why.",
        ),
        heading(3, "Time Savings: Focus on Your Core Business"),
        paragraph(
          "Fundraising is a demanding process requiring extensive preparation. Between developing the business plan, financial projections, investor research, and negotiations, every step requires a considerable time investment. By outsourcing this support, you free up valuable resources to focus on the operational development of your company.",
        ),
        paragraph(
          "An experienced advisor manages time-consuming tasks such as:",
        ),
        unorderedList([
          "Analysing financial needs.",
          "Drafting and optimising key documents (business plan, pitch deck, financial projections).",
          "Making contact with and following up on potential investors.",
        ]),
        paragraph(
          "A classic use case is a fast-growing startup that can devote its energy to finalising a product or conquering new markets while the advisor handles the financial and legal aspects of the fundraising.",
        ),
        heading(3, "Expertise: Strategic Advice to Structure Your Project"),
        paragraph(
          "A fundraising expert consultant brings in-depth knowledge of investor expectations. They help you refine every aspect of your dossier so that it is convincing and aligned with the criteria of financial stakeholders. This includes:",
        ),
        unorderedList([
          "Clear structuring of your project: your ambitions are translated into understandable and measurable data.",
          "An adapted strategy: each sector and type of investor (investment funds, business angels, banks) has specific expectations.",
          "Solid financial projections: based on realistic assumptions and sector benchmarks.",
        ]),
        paragraph(
          "Direct impact: Expert support increases your chances of attracting financing suited to your vision and needs.",
        ),
        heading(3, "Qualified Network: Access Relevant Investors"),
        paragraph(
          "One of the great challenges during a fundraising round is finding the right investors — those who share your vision and are ready to commit to your project. An experienced advisor often has a solid network including:",
        ),
        unorderedList([
          "Investment funds specialising in your sector.",
          "Business angels ready to support companies in their launch or growth phase.",
          "Banks or financial institutions offering solutions suited to the needs of SMEs and startups.",
        ]),
        paragraph(
          "Rather than approaching a wide range of investors randomly, you benefit from direct access to a qualified panel, thereby increasing the effectiveness and success rate of your efforts.",
        ),
        heading(3, "Optimising Every Step: A Strategic Lever"),
        paragraph(
          "By entrusting your fundraising to professionals, you ensure seamless coordination between the different phases of the project. This reduces the risk of errors — such as a poorly structured business plan or poorly managed negotiations — that could jeopardise your fundraising.",
        ),
        paragraph(
          "Structured support is a strategic investment that maximises your chances of success while limiting the effort required on your side. This approach enables you not only to secure financing but also to lay the foundations for a productive relationship with your investors.",
        ),
        heading(2, "Key Steps to a Successful Fundraising Round"),
        paragraph(
          "Succeeding in a fundraising round requires rigorous planning and precise management at every step. Here is the detailed process for turning your project into a financial success.",
        ),
        heading(3, "1. Project Analysis: Understanding Your Financial Needs"),
        paragraph(
          "The first step is to clearly define why you need funding and for how much. This involves assessing your financial needs in light of your strategic objectives, such as developing new products, expanding into an international market, or strengthening sales teams.",
        ),
        paragraph("To do this, it is essential to:"),
        unorderedList([
          "Identify the priority projects to be financed.",
          "Assess the amount needed to meet your needs.",
          "Determine the most appropriate type of financing (dilutive or non-dilutive) for your situation.",
        ]),
        paragraph(
          "This in-depth analysis lays the foundations for a coherent fundraising strategy.",
        ),
        heading(3, "2. Preparation of Key Documents: Presentation Matters"),
        paragraph(
          "A fundraising round depends largely on the quality of the documents presented to investors. These documents must not only be convincing but also reflect a clear and realistic vision of your company.",
        ),
        paragraph("Key elements to prepare include:"),
        unorderedList([
          "Comprehensive business plan: Describe your market, strategy, and objectives in a structured way.",
          "Detailed financial projections: Include revenue, margin, and cash flow forecasts for the next 3 to 5 years.",
          "Compelling pitch deck: A clear and impactful visual presentation to quickly convince your audience.",
          "Risk analysis: Identify potential challenges and explain how you plan to overcome them.",
        ]),
        paragraph(
          "A well-prepared presentation demonstrates your professionalism and inspires confidence in investors.",
        ),
        heading(3, "3. Investor Search: Target the Right Partners"),
        paragraph(
          "Finding the right investors is a key step in securing funding. Each project targets specific investors, depending on the sector, company size, or financing objective.",
        ),
        paragraph("Some avenues for identifying your partners:"),
        unorderedList([
          "Business angels: Ideal for young companies in their launch phase.",
          "Venture capital funds (VC): Designed to support high-growth startups.",
          "Banks and financial institutions: Particularly suited to companies seeking non-dilutive solutions.",
          "Specialist funds: Some funds target sector niches such as tech, health, or ecology.",
        ]),
        paragraph(
          "This step requires time and a strategic approach. Working with an advisor can facilitate access to a network of qualified investors.",
        ),
        heading(3, "4. Negotiations: Secure the Best Terms"),
        paragraph(
          "Negotiations with investors are a delicate phase requiring a thorough command of financial and legal matters. They cover several crucial elements:",
        ),
        unorderedList([
          "Company valuation: Finding a balance between investor expectations and your objectives.",
          "Dilution percentage: Defining an acceptable share of capital to be ceded.",
          "Exit conditions: Planning the mechanisms that allow investors to recoup their investment.",
        ]),
        heading(3, "5. Finalisation: Complete Your Fundraising Round"),
        paragraph(
          "Once agreements are reached, it is time to formalise and execute the decisions. This includes:",
        ),
        unorderedList([
          "Signing legal documents, such as the shareholders' agreement.",
          "Implementing the financing, with clear milestones for the use of funds.",
          "Preparing financial reports to ensure transparent tracking of investments.",
        ]),
        paragraph(
          "This phase marks the beginning of a productive collaboration with your investors. Good communication from this stage lays the foundations for a long-term relationship of trust.",
        ),
        heading(2, "Case Study"),
        paragraph("NUUBB"),
        paragraph("View the case study"),
        paragraph("Activity: Cyber Security & Hardware / IT Software"),
        paragraph("Initial revenue: €9M"),
        paragraph("Assignment type: CFO, Due Diligence, Management Control"),
        paragraph("Number of employees: 36"),
        heading(2, "The 3 Key Players in Your Fundraising Round"),
        paragraph(
          "Succeeding in a fundraising round relies on close collaboration between three main players, each with a complementary and essential role.",
        ),
        heading(3, "The Entrepreneur: The Driver of the Project"),
        paragraph(
          "As a business leader, you are at the heart of the process. Your role is not limited to presenting a solid dossier; you must also inspire confidence and share your vision with investors. Your personal involvement is decisive in:",
        ),
        unorderedList([
          "Setting clear objectives: What do you want to achieve with this raise? Growth, innovation, international expansion?",
          "Telling a compelling story: Investors are attracted by a captivating mission and realistic ambitions.",
          "Demonstrating your leadership: An engaged and structured entrepreneur reassures investors about their ability to see the project through.",
        ]),
        heading(3, "The Investors: Partners in Success"),
        paragraph(
          "Investors are not merely sources of funding; they become strategic allies. Their role can vary depending on their nature:",
        ),
        unorderedList([
          "Business angels: They offer rapid financial support and personalised guidance thanks to their entrepreneurial expertise.",
          "Investment funds: They bring significant capital as well as a network of contacts and resources to support your expansion.",
          "Financial institutions: Loans or dilutive financing help you diversify your sources of funding.",
        ]),
        paragraph(
          "The right investor is one who understands your vision and is ready to commit for the long term to support your growth.",
        ),
        heading(
          3,
          "The Fundraising Advisor: Your Guide Throughout the Process",
        ),
        paragraph(
          "Calling on an experienced fundraising advisor, or a specialist consultant, can be a genuine added value for structuring your approach effectively. Their expertise allows them to:",
        ),
        unorderedList([
          "Target the right investors for your needs and sector.",
          "Optimise your financial and legal documents to maximise their impact.",
          "Negotiate favourable terms and avoid common pitfalls.",
        ]),
        paragraph(
          "A fundraising advisor acts as a facilitator, enabling you to navigate the complexities of the process with confidence.",
        ),
        heading(2, "The Benefits of Working With a Fundraising Advisor"),
        paragraph(
          "Collaborating with a fundraising advisor or financing expert offers concrete advantages that can transform your fundraising round.",
        ),
        heading(3, "Expertise and Time Savings"),
        paragraph(
          "Raising funds is a complex and time-consuming process. A fundraising advisor allows you to:",
        ),
        unorderedList([
          "Accelerate your efforts: By quickly identifying qualified investors interested in your project.",
          "Structure your documents: Business plan, financial projections, and pitch — everything is optimised to attract investors.",
          "Anticipate key steps: Thanks to their knowledge, they guide you to avoid common mistakes.",
        ]),
        heading(3, "Improve Financing Conditions"),
        paragraph(
          "Experienced fundraising advisors are skilled negotiators. Their role is to:",
        ),
        unorderedList([
          "Optimise the terms of agreements to maximise benefits for your company.",
          "Advise you on the most advantageous financing options, whether dilutive or non-dilutive.",
          "Minimise financial and legal risks through specialist expertise.",
        ]),
        paragraph(
          "With their help, you are better prepared to negotiate balanced agreements that support the long-term sustainability of your business.",
        ),
        heading(2, "Why Choose Iter Advisors to Support You?"),
        paragraph(
          "Fundraising is a strategic process requiring specialist expertise and tailored support. At Iter Advisors, we position ourselves as trusted partners to guide you through this crucial step.",
        ),
        heading(3, "Recognised Expertise and a Reliable Partner Network"),
        paragraph(
          "We are experienced in managing complex financing projects for companies of all sizes, from early-stage startups to SMEs looking to accelerate their development. While we are not fundraising brokers, we provide:",
        ),
        unorderedList([
          "Our expertise in strategic financial management: Building realistic projections and solid financial analyses.",
          "Our extensive network of investors and partners: An asset for maximising your opportunities.",
        ]),
        paragraph(
          "This approach ensures that every step of your fundraising is optimised, from preparation through to finalisation.",
        ),
        heading(3, "Personalised Support at Every Step"),
        paragraph(
          "At Iter Advisors, we know that every project is unique. That is why we offer tailored support based on your specific needs. Here is what we do for you:",
        ),
        unorderedList([
          "Structure your financial needs: Identifying the amounts required and developing adapted strategies.",
          "Advise on investor selection: Choosing partners aligned with your values and objectives.",
          "Ensure rigorous follow-up: We remain by your side to guarantee a smooth and successful process.",
        ]),
        paragraph(
          "With Iter Advisors, your fundraising becomes more than just financing: it is a strategic opportunity to accelerate your growth and strengthen your financial foundations.",
        ),
      ],
      metaTitle: "Fundraising support | Iter Advisors",
      metaDescription: "Fundraising preparation and support. Iter Advisors.",
    },
    es: {
      heroTitle: "Soporte a la financiación",
      heroSubtitle:
        "Prepare y logre sus rondas de financiación con un socio experimentado a su lado.",
      content: [
        heading(
          2,
          "Acompañamiento en la captación de fondos: impulse su crecimiento con los inversores adecuados",
        ),
        paragraph(
          "La captación de fondos es un hito crucial en la vida de una empresa, especialmente para las startups y las pymes en busca de crecimiento. Sin embargo, lograr el éxito en este proceso puede ser complejo sin el acompañamiento adecuado.",
        ),
        paragraph(
          "En Iter Advisors estamos especializados en la optimización de proyectos de financiación, aprovechando nuestra experiencia y nuestra red para maximizar sus posibilidades de éxito.",
        ),
        paragraph(
          "Con un acompañamiento experto, podrá estructurar su proyecto, identificar a los inversores adecuados y negociar condiciones ventajosas para acelerar su desarrollo.",
        ),
        paragraph(
          "¿Por qué no transformar sus ambiciones en realidad hoy mismo e impulsar su crecimiento?",
        ),
        paragraph("Reservar una reunión"),
        heading(
          2,
          "¿Por qué buscar acompañamiento para su captación de fondos?",
        ),
        paragraph(
          "Cuando planifica una ronda de financiación, el éxito depende no solo de la calidad de su proyecto, sino también de su capacidad para convencer a los inversores y gestionar cada etapa con rigor. El acompañamiento profesional transforma este hito estratégico en una oportunidad maximizada. He aquí el porqué.",
        ),
        heading(3, "Ahorro de tiempo: céntrese en su actividad principal"),
        paragraph(
          "La captación de fondos es un proceso exigente que requiere una gran preparación. Entre la elaboración del plan de negocio, las proyecciones financieras, la búsqueda de inversores y las negociaciones, cada etapa requiere una inversión de tiempo considerable. Al externalizar este acompañamiento, libera recursos valiosos para centrarse en el desarrollo operativo de su empresa.",
        ),
        paragraph(
          "Un asesor con experiencia gestiona tareas que consumen mucho tiempo, como:",
        ),
        unorderedList([
          "El análisis de las necesidades financieras.",
          "La redacción y optimización de los documentos clave (plan de negocio, pitch deck, proyecciones financieras).",
          "El contacto inicial y el seguimiento con los inversores potenciales.",
        ]),
        paragraph(
          "Un caso de uso bastante habitual es el de una startup en plena expansión que puede dedicar su energía a finalizar un producto o a conquistar nuevos mercados mientras el asesor se ocupa de los aspectos financieros y jurídicos de la captación.",
        ),
        heading(
          3,
          "Experiencia: asesoramiento estratégico para estructurar su proyecto",
        ),
        paragraph(
          "Un consultor experto en captación de fondos aporta un conocimiento profundo de las expectativas de los inversores. Le ayuda a refinar cada aspecto de su expediente para que sea convincente y esté alineado con los criterios de los agentes financieros. Esto incluye:",
        ),
        unorderedList([
          "Una estructuración clara de su proyecto: sus ambiciones se traducen en datos comprensibles y medibles.",
          "Una estrategia adaptada: cada sector y tipo de inversor (fondos de inversión, business angels, bancos) tiene expectativas específicas.",
          "Proyecciones financieras sólidas: basadas en hipótesis realistas y referencias sectoriales.",
        ]),
        paragraph(
          "Impacto directo: el acompañamiento experto aumenta sus posibilidades de atraer financiación adaptada a su visión y sus necesidades.",
        ),
        heading(3, "Red cualificada: acceda a los inversores adecuados"),
        paragraph(
          "Uno de los grandes retos durante una captación de fondos es encontrar a los inversores adecuados, aquellos que comparten su visión y están dispuestos a comprometerse con su proyecto. Un asesor con experiencia suele disponer de una sólida red que incluye:",
        ),
        unorderedList([
          "Fondos de inversión especializados en su sector.",
          "Business angels dispuestos a apoyar a empresas en fase de lanzamiento o crecimiento.",
          "Bancos o instituciones financieras que ofrecen soluciones adaptadas a las necesidades de pymes y startups.",
        ]),
        paragraph(
          "En lugar de dirigirse a un amplio abanico de inversores de forma aleatoria, se beneficia de un acceso directo a un panel cualificado, aumentando así la eficacia y las posibilidades de éxito de sus gestiones.",
        ),
        heading(3, "Optimización de cada etapa: una palanca estratégica"),
        paragraph(
          "Al confiar su captación de fondos a profesionales, garantiza una coordinación fluida entre las distintas fases del proyecto. Esto reduce el riesgo de errores —como un plan de negocio mal estructurado o negociaciones mal gestionadas— que podrían comprometer su ronda de financiación.",
        ),
        paragraph(
          "Un acompañamiento estructurado es una inversión estratégica que maximiza sus posibilidades de éxito y al mismo tiempo minimiza el esfuerzo requerido por su parte. Este enfoque le permite no solo asegurar la financiación, sino también sentar las bases de una relación fructífera con sus inversores.",
        ),
        heading(2, "Etapas clave de una captación de fondos exitosa"),
        paragraph(
          "Lograr el éxito en una captación de fondos exige una planificación rigurosa y una gestión precisa en cada etapa. A continuación se presenta el proceso detallado para convertir su proyecto en un éxito financiero.",
        ),
        heading(
          3,
          "1. Análisis del proyecto: comprenda sus necesidades financieras",
        ),
        paragraph(
          "El primer paso consiste en definir claramente por qué necesita financiación y por qué importe. Se trata de evaluar sus necesidades financieras en función de sus objetivos estratégicos, como el desarrollo de nuevos productos, la expansión a un mercado internacional o el refuerzo de los equipos comerciales.",
        ),
        paragraph("Para ello, es esencial:"),
        unorderedList([
          "Identificar los proyectos prioritarios que deben financiarse.",
          "Evaluar el importe necesario para cubrir sus necesidades.",
          "Determinar el tipo de financiación (dilutiva o no dilutiva) más adecuado para su situación.",
        ]),
        paragraph(
          "Este análisis en profundidad sienta las bases de una estrategia de captación coherente.",
        ),
        heading(
          3,
          "2. Preparación de los documentos clave: cuide su presentación",
        ),
        paragraph(
          "Una captación de fondos depende en gran medida de la calidad de los documentos presentados a los inversores. Estos documentos deben ser no solo convincentes, sino también reflejar una visión clara y realista de su empresa.",
        ),
        paragraph("Entre los principales elementos que hay que preparar:"),
        unorderedList([
          "Plan de negocio completo: Describa su mercado, estrategia y objetivos de forma estructurada.",
          "Proyecciones financieras detalladas: Incluya previsiones de ingresos, márgenes y tesorería para los próximos 3 a 5 años.",
          "Pitch deck atractivo: Un soporte visual claro e impactante para convencer rápidamente a sus interlocutores.",
          "Análisis de riesgos: Identifique los posibles retos y explique cómo piensa superarlos.",
        ]),
        paragraph(
          "Una presentación bien preparada demuestra su profesionalidad e inspira confianza en los inversores.",
        ),
        heading(
          3,
          "3. Búsqueda de inversores: identifique a los socios adecuados",
        ),
        paragraph(
          "Encontrar a los inversores adecuados es un paso clave para asegurar la financiación. Cada proyecto se dirige a inversores específicos según el sector, el tamaño de la empresa o el objetivo de financiación.",
        ),
        paragraph("Algunas pistas para identificar a sus socios:"),
        unorderedList([
          "Business angels: Ideales para empresas jóvenes en fase de lanzamiento.",
          "Fondos de capital riesgo (VC): Diseñados para apoyar a startups con alto potencial de crecimiento.",
          "Bancos e instituciones financieras: Especialmente adecuados para empresas que buscan soluciones no dilutivas.",
          "Fondos especializados: Algunos fondos se dirigen a nichos sectoriales como la tecnología, la salud o la ecología.",
        ]),
        paragraph(
          "Esta etapa requiere tiempo y un enfoque estratégico. Trabajar con un asesor puede facilitar el acceso a una red de inversores cualificados.",
        ),
        heading(3, "4. Negociaciones: obtenga las mejores condiciones"),
        paragraph(
          "Las negociaciones con los inversores son una fase delicada que exige un dominio perfecto de los aspectos financieros y jurídicos. Abarcan varios elementos cruciales:",
        ),
        unorderedList([
          "Valoración de la empresa: Encontrar un equilibrio entre las expectativas de los inversores y sus objetivos.",
          "Porcentaje de dilución: Definir una participación del capital cedido que sea aceptable para el fundador.",
          "Condiciones de salida: Prever los mecanismos que permitan a los inversores recuperar su inversión.",
        ]),
        heading(3, "5. Finalización: concrete su captación de fondos"),
        paragraph(
          "Una vez alcanzados los acuerdos, es hora de formalizar y ejecutar las decisiones. Esto incluye:",
        ),
        unorderedList([
          "La firma de los documentos jurídicos, como el pacto de accionistas.",
          "La ejecución de la financiación, con hitos claros para el uso de los fondos.",
          "La preparación de los informes financieros para garantizar un seguimiento transparente de las inversiones.",
        ]),
        paragraph(
          "Esta fase marca el inicio de una colaboración fructífera con sus inversores. Una buena comunicación desde esta etapa sienta las bases de una relación de confianza a largo plazo.",
        ),
        heading(2, "Caso práctico"),
        paragraph("NUUBB"),
        paragraph("Ver el caso práctico"),
        paragraph("Actividad: Cyber Security & Hardware / IT Software"),
        paragraph("Facturación inicial: 9 M€"),
        paragraph("Tipo de misión: CFO, Due Diligence, Control de Gestión"),
        paragraph("Número de empleados: 36"),
        heading(2, "Los 3 actores clave de su captación de fondos"),
        paragraph(
          "El éxito de una captación de fondos se basa en la estrecha colaboración entre tres actores principales, cada uno con un papel complementario e indispensable.",
        ),
        heading(3, "El emprendedor: el motor del proyecto"),
        paragraph(
          "Como directivo, usted está en el centro del proceso. Su papel no se limita a presentar un expediente sólido; también debe inspirar confianza y compartir su visión con los inversores. Su implicación personal es determinante para:",
        ),
        unorderedList([
          "Definir objetivos claros: ¿Qué desea lograr con esta captación? ¿Crecimiento, innovación, expansión internacional?",
          "Contar una historia convincente: Los inversores se dejan seducir por una misión apasionante y ambiciones realistas.",
          "Demostrar su liderazgo: Un emprendedor comprometido y organizado tranquiliza a los inversores sobre su capacidad de llevar el proyecto a buen puerto.",
        ]),
        heading(3, "Los inversores: socios en el éxito"),
        paragraph(
          "Los inversores no son meras fuentes de financiación; se convierten en aliados estratégicos. Su papel puede variar según su naturaleza:",
        ),
        unorderedList([
          "Business angels: Ofrecen apoyo financiero rápido y acompañamiento personalizado gracias a su experiencia emprendedora.",
          "Fondos de inversión: Aportan capital significativo, así como una red de contactos y recursos para apoyar su expansión.",
          "Instituciones financieras: Préstamos o financiación dilutiva le ayudan a diversificar sus fuentes de financiación.",
        ]),
        paragraph(
          "El inversor adecuado es aquel que comprende su visión y está dispuesto a comprometerse a largo plazo para apoyar su crecimiento.",
        ),
        heading(3, "El asesor de captación: su guía durante todo el proceso"),
        paragraph(
          "Contar con un asesor de captación de fondos experimentado, o con un consultor especializado, puede ser un auténtico valor añadido para estructurar eficazmente su enfoque. Su experiencia les permite:",
        ),
        unorderedList([
          "Identificar a los inversores adecuados para sus necesidades y sector de actividad.",
          "Optimizar sus documentos financieros y jurídicos para maximizar su impacto.",
          "Negociar condiciones favorables y evitar los errores más comunes.",
        ]),
        paragraph(
          "Un asesor de captación actúa como facilitador, permitiéndole navegar con confianza por las complejidades del proceso.",
        ),
        heading(
          2,
          "Las ventajas de contar con un asesor de captación de fondos",
        ),
        paragraph(
          "Colaborar con un asesor de captación de fondos o un experto en financiación ofrece ventajas concretas que pueden transformar su ronda de financiación.",
        ),
        heading(3, "Experiencia y ahorro de tiempo"),
        paragraph(
          "Captar fondos es un proceso complejo y que consume mucho tiempo. Un asesor de captación le permite:",
        ),
        unorderedList([
          "Acelerar sus gestiones: Identificando rápidamente a los inversores cualificados interesados en su proyecto.",
          "Estructurar sus documentos: Plan de negocio, proyecciones financieras y pitch, todo optimizado para atraer a los inversores.",
          "Anticipar las etapas clave: Gracias a su conocimiento, le guían para evitar los errores más frecuentes.",
        ]),
        heading(3, "Mejorar las condiciones de financiación"),
        paragraph(
          "Los asesores de captación con experiencia son negociadores experimentados. Su función es:",
        ),
        unorderedList([
          "Optimizar los términos de los acuerdos para maximizar los beneficios para su empresa.",
          "Asesorarle sobre las opciones de financiación más ventajosas, ya sean dilutivas o no dilutivas.",
          "Minimizar los riesgos financieros y jurídicos gracias a una experiencia especializada.",
        ]),
        paragraph(
          "Con su ayuda, estará mejor preparado para negociar acuerdos equilibrados que favorezcan la sostenibilidad a largo plazo de su actividad.",
        ),
        heading(2, "¿Por qué elegir Iter Advisors para acompañarle?"),
        paragraph(
          "Captar fondos es un proceso estratégico que requiere una experiencia especializada y un acompañamiento a medida. En Iter Advisors nos posicionamos como socios de confianza para guiarle en esta etapa crucial.",
        ),
        heading(3, "Una experiencia reconocida y una red de socios fiables"),
        paragraph(
          "Tenemos experiencia en la gestión de proyectos de financiación complejos para empresas de todos los tamaños, desde startups en fase de crecimiento hasta pymes que desean acelerar su desarrollo. Aunque no somos asesores de captación en sentido estricto, ponemos a su disposición:",
        ),
        unorderedList([
          "Nuestra experiencia en gestión financiera estratégica: Elaboración de proyecciones realistas y análisis financieros sólidos.",
          "Nuestra amplia red de inversores y socios: Un activo para maximizar sus oportunidades.",
        ]),
        paragraph(
          "Este enfoque garantiza que cada etapa de su captación esté optimizada, desde la preparación hasta la finalización.",
        ),
        heading(3, "Un acompañamiento personalizado en cada etapa"),
        paragraph(
          "En Iter Advisors sabemos que cada proyecto es único. Por eso ofrecemos un acompañamiento a medida basado en sus necesidades específicas. Esto es lo que hacemos por usted:",
        ),
        unorderedList([
          "Estructurar sus necesidades financieras: Identificación de los importes necesarios y elaboración de estrategias adaptadas.",
          "Asesorarle en la elección de inversores: Selección de socios alineados con sus valores y objetivos.",
          "Garantizar un seguimiento riguroso: Permanecemos a su lado para garantizar la fluidez y el éxito del proceso.",
        ]),
        paragraph(
          "Con Iter Advisors, su captación de fondos se convierte en algo más que una simple financiación: es una oportunidad estratégica para acelerar su crecimiento y reforzar sus bases financieras.",
        ),
      ],
      metaTitle: "Soporte a la financiación | Iter Advisors",
      metaDescription:
        "Preparación y acompañamiento en captación de fondos. Iter Advisors.",
    },
  },

  // ─────────────────────────────────────────────────────────────────
  // 4. COMPTABILITÉ / EXTERNALISATION
  // ─────────────────────────────────────────────────────────────────
  {
    apiName: "comptabilite-externalisation-page",
    fr: {
      heroTitle: "Externaliser sa comptabilité",
      heroSubtitle:
        "Concentrez-vous sur votre cœur de métier en confiant la comptabilité à des experts.",
      content: [
        heading(
          2,
          "Externalisation comptabilité : optimisez votre gestion financière",
        ),
        paragraph(
          "En France, externaliser sa comptabilité consiste à confier la gestion financière d'une entreprise à un expert-comptable ou à un cabinet spécialisé. Cette pratique est particulièrement courante auprès des TPE et PME, où la recherche d'efficacité et de conformité est essentielle.",
        ),
        paragraph(
          "Cependant, le choix d'un professionnel qualifié est primordial. Seuls les membres d'un cabinet comptable inscrits à l'Ordre des experts-comptables sont habilités à exercer. Cela garantit à l'entreprise un niveau élevé de compétence et de sécurité dans ses opérations.",
        ),
        paragraph(
          "Le rôle des experts-comptables dépasse la simple tenue des comptes. Ils conseillent les dirigeants sur les aspects stratégiques, veillent à la conformité réglementaire et optimisent les processus comptables.",
        ),
        paragraph(
          "Que vous soyez une startup, une PME ou une grande entreprise, externaliser votre comptabilité peut représenter une décision stratégique. Cette approche offre des avantages considérables : réduction des coûts, gain d'expertise spécialisée et optimisation des performances financières.",
        ),
        paragraph("Prendre rendez-vous"),
        paragraph(
          "Chez Iter Advisors, nous mettons notre savoir-faire au service de votre entreprise pour améliorer votre gestion financière grâce à l'externalisation. Notre objectif n'est pas de remplacer votre expert-comptable, mais de compléter son expertise pour une efficacité accrue.",
        ),
        heading(
          2,
          "Qu'est-ce que l'externalisation comptable et quel est son principe ?",
        ),
        heading(3, "Définition de l'externalisation comptable"),
        paragraph(
          "L'externalisation comptable consiste à confier tout ou partie des tâches comptables à un expert-comptable ou à un cabinet spécialisé. Ces prestataires, inscrits au Conseil de l'Ordre des Experts-Comptables, gèrent des missions variées :",
        ),
        unorderedList([
          "Tenue des comptes.",
          "Déclarations fiscales et sociales.",
          "Élaboration des bilans annuels.",
        ]),
        paragraph(
          "Ce modèle repose sur une collaboration étroite entre l'entreprise et le prestataire. La signature d'une lettre de mission garantit un cadre clair, précisant les responsabilités de chaque partie et les objectifs à atteindre.",
        ),
        heading(3, "Quel est le principe de l'externalisation ?"),
        paragraph(
          "Le principe de l'externalisation est simple : permettre à l'entreprise de se concentrer sur son activité principale tout en déléguant les tâches complexes à des experts. L'expert-comptable assure :",
        ),
        unorderedList([
          "Une gestion conforme aux réglementations en vigueur.",
          "Une rationalisation des coûts grâce à des services adaptés.",
          "Un accès à des outils modernes pour automatiser et optimiser les processus comptables (Pennylane, Netsuite, Sage…).",
        ]),
        heading(2, "Quels sont les services externalisés en comptabilité ?"),
        heading(3, "Services typiques externalisés"),
        paragraph(
          "Externaliser sa comptabilité auprès d'un expert-comptable permet à une entreprise de confier des missions variées et complexes, en s'assurant de leur conformité et de leur qualité. Parmi les tâches les plus courantes :",
        ),
        paragraph(
          "Tenue des comptes : Cela inclut l'enregistrement des opérations comptables (achats, ventes, salaires), les rapprochements bancaires, ainsi que la gestion des écritures d'inventaire en fin de période.",
        ),
        paragraph(
          "Déclarations fiscales et sociales : TVA, Impôt sur les sociétés (IS), CFE, CVAE, DAS2, taxes sur les véhicules de société (TVS), Déclaration unique des performances sociales (DUP).",
        ),
        paragraph(
          "Gestion sociale et paie : Établissement des bulletins de salaire, déclaration et paiement des cotisations sociales (URSSAF, retraite, prévoyance), gestion des formalités liées à l'embauche ou au départ des salariés (DPAE, soldes de tout compte).",
        ),
        paragraph(
          "Clôtures annuelles : L'expert-comptable prépare les bilans, comptes de résultat, annexes et liasses fiscales pour les obligations légales et les relations avec les tiers, comme les banques ou investisseurs.",
        ),
        heading(3, "Qu'est-ce que l'assistance comptable ?"),
        paragraph(
          "L'assistance comptable s'adresse principalement aux PME qui n'ont pas de département comptable interne ou qui souhaitent un accompagnement spécifique. Elle inclut :",
        ),
        unorderedList([
          "Appui ponctuel sur des tâches spécifiques : Par exemple, la gestion des écritures d'inventaire ou des ajustements lors des clôtures de fin d'exercice.",
          "Conseil sur les optimisations fiscales et financières : Un regard extérieur permet d'identifier des opportunités pour réduire les charges fiscales ou optimiser la trésorerie.",
          "Formation des équipes internes : Les experts-comptables peuvent former les collaborateurs sur l'utilisation des outils comptables et la compréhension des processus financiers.",
        ]),
        heading(2, "Quels sont les avantages de l'externalisation comptable ?"),
        heading(3, "Réduction des coûts opérationnels"),
        paragraph(
          "L'externalisation comptable est une solution rentable qui permet de convertir des charges fixes en coûts variables. En évitant le recrutement d'une équipe interne dédiée à la comptabilité, une entreprise réalise des économies significatives :",
        ),
        unorderedList([
          "Pas de salaires ou charges sociales : Aucune obligation de verser un salaire fixe, de payer des congés ou des indemnités liées au personnel interne.",
          "Coût adapté aux besoins : Les honoraires d'un expert-comptable sont modulables en fonction des missions confiées, qu'il s'agisse d'une prestation mensuelle ou ponctuelle, comme la préparation d'un bilan.",
        ]),
        paragraph(
          "Pour les petites structures ou les startups en phase de croissance, ce modèle offre un accès à des compétences professionnelles sans grever la trésorerie. Les entreprises peuvent allouer les ressources économisées à des initiatives stratégiques, comme le développement commercial ou l'innovation.",
        ),
        heading(3, "Expertise et conformité réglementaire"),
        paragraph(
          "Les experts-comptables apportent une maîtrise inégalée des réglementations fiscales et sociales. Cette expertise réduit considérablement les risques liés aux erreurs ou aux retards de déclaration, qui peuvent entraîner des pénalités financières :",
        ),
        unorderedList([
          "Conformité légale : Les déclarations fiscales, sociales et juridiques sont réalisées dans le respect des délais et des normes en vigueur.",
          "Anticipation des évolutions réglementaires : Grâce à une veille constante, l'expert-comptable adapte les pratiques comptables pour se conformer aux nouvelles lois ou directives.",
        ]),
        paragraph(
          "Par ailleurs, leur rôle de conseil stratégique va bien au-delà de la simple exécution des tâches : ils aident les entreprises à identifier des opportunités d'optimisation fiscale ou financière, renforçant ainsi leur compétitivité.",
        ),
        heading(3, "Gain de temps et de flexibilité"),
        paragraph(
          "La gestion de la comptabilité est une activité chronophage, surtout pour les dirigeants de PME ou de startups, souvent multitâches. L'externalisation leur permet de :",
        ),
        unorderedList([
          "Se recentrer sur des activités stratégiques : Comme la prospection de nouveaux clients, le développement de produits ou la gestion des équipes.",
          "Bénéficier de services flexibles : L'expert-comptable ajuste ses interventions en fonction des besoins : soutien ponctuel lors des clôtures annuelles, gestion récurrente des déclarations ou assistance lors de projets spécifiques comme une levée de fonds.",
        ]),
        paragraph(
          "Cette flexibilité est particulièrement précieuse dans des environnements économiques incertains, où les besoins peuvent évoluer rapidement (exemple classique des startups).",
        ),
        heading(2, "Étude de cas"),
        paragraph("OptiDigital"),
        paragraph("Voir l'étude de cas"),
        paragraph("Activité : Adtech Industry"),
        paragraph("Chiffre d'affaires initial : 8 M€"),
        paragraph("Levée de fonds réalisée : 30 M€ dans les temps impartis"),
        paragraph("Nombre de salariés : 35"),
        heading(2, "Facteurs influençant le coût"),
        paragraph(
          "Les coûts d'une externalisation comptable varient en fonction de plusieurs critères :",
        ),
        unorderedList([
          "Taille de l'entreprise : Une petite entreprise avec un faible volume de transactions paiera moins cher qu'une grande société avec des opérations complexes et de nombreux employés.",
          "Services demandés : Une externalisation complète (tenue des comptes, gestion sociale, déclarations fiscales et sociales) sera plus onéreuse qu'une mission partielle (comme la seule préparation des comptes annuels).",
          "Fréquence des interventions : Les entreprises ayant besoin d'un accompagnement régulier (mensuel ou hebdomadaire) verront des coûts supérieurs à celles sollicitant une assistance ponctuelle.",
        ]),
        heading(2, "Fourchettes de coûts en France"),
        paragraph(
          "Petites entreprises ou TPE (moins de 10 salariés) : Coût mensuel moyen entre 150 € et 500 € HT pour la tenue des comptes et les déclarations fiscales simples. Coût annuel moyen entre 1 800 € et 6 000 € HT pour une gestion complète incluant la clôture des comptes et la préparation des bilans.",
        ),
        paragraph(
          "PME (10 à 50 salariés) : Coût mensuel moyen entre 500 € et 1 500 € HT pour des services élargis. Coût annuel moyen entre 6 000 € et 18 000 € HT, selon la complexité des missions.",
        ),
        paragraph(
          "Grandes entreprises ou sociétés à fort volume de transactions : Coût mensuel moyen entre 1 500 € et 5 000 € HT. Coût annuel moyen entre 18 000 € et 60 000 € HT pour une prise en charge complète des volets comptable, fiscal et social.",
        ),
        paragraph(
          "Partie sociale (gestion des salaires et déclarations sociales) : Environ 15 € à 25 € HT par bulletin de paie, avec des frais fixes supplémentaires. Coût mensuel moyen entre 100 € et 1 000 € HT, selon le nombre d'employés et la complexité des conventions collectives.",
        ),
        heading(
          2,
          "Comment choisir un prestataire pour l'externalisation comptable ?",
        ),
        heading(3, "Critères de sélection"),
        paragraph(
          "Le choix du bon prestataire est une étape essentielle pour garantir une externalisation comptable réussie. Voici les principaux critères à prendre en compte :",
        ),
        unorderedList([
          "Réputation et expérience : Optez pour un cabinet d'expertise-comptable ayant des références solides et une expérience confirmée dans l'accompagnement d'entreprises similaires à la vôtre.",
          "Expertise sectorielle : Un prestataire maîtrisant les spécificités de votre secteur d'activité (ex. : tech, commerce, industrie) sera mieux à même de comprendre vos enjeux financiers et fiscaux.",
          "Outils numériques : Assurez-vous que le prestataire utilise des solutions modernes : ERP (Pennylane, Yooz, Odoo…), logiciels de reporting (Finthesis, QlikSense, PowerBI…), plateformes collaboratives pour un suivi en temps réel.",
        ]),
        heading(3, "Étapes pour démarrer la collaboration"),
        unorderedList([
          "Définir vos besoins : Évaluez précisément les tâches à externaliser (saisie comptable, déclarations fiscales, gestion de la paie) et déterminez vos attentes en matière de résultats.",
          "Établir un contrat détaillé avec votre Expert-comptable : La lettre de mission définit les tâches confiées, les objectifs attendus (délais, livrables) et les modalités tarifaires (mensuelles, annuelles ou à la prestation).",
          "Mettre en place une communication régulière : Planifiez des points de suivi mensuels ou trimestriels. Utilisez des outils collaboratifs pour partager des tableaux de bord ou des rapports d'activité.",
          "Évaluer les performances : Organisez des bilans périodiques pour analyser la qualité des prestations et identifier les éventuels ajustements nécessaires.",
        ]),
        heading(
          2,
          "Conclusion : la solution de l'externalisation comptable, une solution stratégique pour votre entreprise",
        ),
        paragraph(
          "L'externalisation comptable est une solution clé pour optimiser la gestion financière, réduire les coûts et gagner en efficacité.",
        ),
        paragraph(
          "Avec Iter Advisors, bénéficiez d'un accompagnement personnalisé pour réussir votre transition vers l'externalisation.",
        ),
      ],
      metaTitle: "Externaliser sa comptabilité | Iter Advisors",
      metaDescription:
        "Externalisation comptabilité et déclarations. Iter Advisors.",
    },
    en: {
      heroTitle: "Outsource your accounting",
      heroSubtitle:
        "Focus on your core business by entrusting accounting to experts.",
      content: [
        heading(
          2,
          "Accounting Outsourcing: Optimise Your Financial Management",
        ),
        paragraph(
          "Outsourcing your accounting means entrusting the financial management of your company to a chartered accountant or specialist firm. This practice is particularly common among small businesses and SMEs, where the pursuit of efficiency and compliance is essential.",
        ),
        paragraph(
          "However, choosing a qualified professional is paramount. Only members of an accredited accounting body are authorised to practice. This guarantees the company a high level of expertise and security in its operations.",
        ),
        paragraph(
          "The role of accountants goes beyond simply keeping the books. They advise business leaders on strategic matters, ensure regulatory compliance, and optimise accounting processes.",
        ),
        paragraph(
          "Whether you are a startup, an SME, or a large company, outsourcing your accounting can be a strategic decision. This approach offers considerable advantages: cost reduction, access to specialist expertise, and improved financial performance.",
        ),
        paragraph("Book a meeting"),
        paragraph(
          "At Iter Advisors, we put our expertise to work for your company to improve your financial management through outsourcing. Our objective is not to replace your accountant, but to complement their expertise for greater efficiency.",
        ),
        heading(2, "What Is Accounting Outsourcing and How Does It Work?"),
        heading(3, "Definition of Accounting Outsourcing"),
        paragraph(
          "Accounting outsourcing involves entrusting all or part of your accounting tasks to a chartered accountant or specialist firm. These providers manage a variety of assignments:",
        ),
        unorderedList([
          "Bookkeeping.",
          "Tax and social security filings.",
          "Preparation of annual financial statements.",
        ]),
        paragraph(
          "This model relies on close collaboration between the company and the provider. A signed engagement letter establishes a clear framework, specifying the responsibilities of each party and the objectives to be achieved.",
        ),
        heading(3, "What Is the Principle of Outsourcing?"),
        paragraph(
          "The principle of outsourcing is simple: enable the company to focus on its core business while delegating complex tasks to experts. The accountant ensures:",
        ),
        unorderedList([
          "Management in compliance with current regulations.",
          "Cost rationalisation through adapted services.",
          "Access to modern tools to automate and optimise accounting processes (Pennylane, Netsuite, Sage…).",
        ]),
        heading(2, "What Accounting Services Are Typically Outsourced?"),
        heading(3, "Typical Outsourced Services"),
        paragraph(
          "Outsourcing your accounting to a chartered accountant allows you to entrust a variety of complex assignments, ensuring their compliance and quality. Among the most common tasks:",
        ),
        paragraph(
          "Bookkeeping: This includes recording accounting transactions (purchases, sales, payroll), bank reconciliations, and management of inventory entries at period end.",
        ),
        paragraph(
          "Tax and social security filings: VAT, corporation tax, business property tax, apprenticeship tax, employer declarations, and vehicle-related taxes.",
        ),
        paragraph(
          "Payroll and HR administration: Preparation of payslips, declaration and payment of social contributions, management of onboarding and offboarding formalities.",
        ),
        paragraph(
          "Annual close: The accountant prepares balance sheets, income statements, notes, and tax packs for legal obligations and relationships with third parties such as banks or investors.",
        ),
        heading(3, "What Is Accounting Assistance?"),
        paragraph(
          "Accounting assistance is aimed primarily at SMEs that do not have an internal accounting department or that wish for specific support. It includes:",
        ),
        unorderedList([
          "Ad-hoc support on specific tasks: For example, managing inventory entries or adjustments during year-end close.",
          "Advice on tax and financial optimisation: An external perspective helps identify opportunities to reduce tax charges or optimise cash flow.",
          "Training of internal teams: Accountants can train staff on the use of accounting tools and an understanding of financial processes.",
        ]),
        heading(2, "What Are the Benefits of Accounting Outsourcing?"),
        heading(3, "Reduction of Operating Costs"),
        paragraph(
          "Accounting outsourcing is a cost-effective solution that converts fixed charges into variable costs. By avoiding the recruitment of a dedicated internal accounting team, a company achieves significant savings:",
        ),
        unorderedList([
          "No salaries or social charges: No obligation to pay a fixed salary, holiday pay, or benefits related to internal staff.",
          "Cost adapted to needs: An accountant's fees can be modulated according to the tasks assigned, whether a monthly service or a one-off assignment such as preparing financial statements.",
        ]),
        paragraph(
          "For small structures or startups in the growth phase, this model provides access to professional skills without burdening cash flow. Companies can allocate the saved resources to strategic initiatives such as business development or innovation.",
        ),
        heading(3, "Expertise and Regulatory Compliance"),
        paragraph(
          "Accountants bring unparalleled mastery of tax and social regulations. This expertise considerably reduces the risks associated with errors or late filings, which can lead to financial penalties:",
        ),
        unorderedList([
          "Legal compliance: Tax, social, and legal filings are completed within deadlines and in accordance with current standards.",
          "Anticipating regulatory changes: Through constant monitoring, the accountant adapts accounting practices to comply with new laws or directives.",
        ]),
        paragraph(
          "Their strategic advisory role goes well beyond simply executing tasks: they help companies identify tax and financial optimisation opportunities, thereby reinforcing their competitiveness.",
        ),
        heading(3, "Time Savings and Flexibility"),
        paragraph(
          "Managing accounting is a time-consuming activity, especially for SME or startup leaders who often juggle multiple responsibilities. Outsourcing allows them to:",
        ),
        unorderedList([
          "Refocus on strategic activities: Such as acquiring new clients, product development, or team management.",
          "Benefit from flexible services: The accountant adjusts their involvement according to needs — ad-hoc support during annual close, recurring management of filings, or assistance during specific projects such as a fundraising round.",
        ]),
        paragraph(
          "This flexibility is particularly valuable in uncertain economic environments, where needs can evolve rapidly — a classic example being startups.",
        ),
        heading(2, "Case Study"),
        paragraph("OptiDigital"),
        paragraph("View the case study"),
        paragraph("Activity: Adtech Industry"),
        paragraph("Initial revenue: €8M"),
        paragraph("Fundraising completed: €30M on schedule"),
        paragraph("Number of employees: 35"),
        heading(2, "Factors Influencing Cost"),
        paragraph(
          "The costs of accounting outsourcing vary according to several criteria:",
        ),
        unorderedList([
          "Company size: A small company with a low transaction volume will pay less than a large company with complex operations and many employees.",
          "Services requested: Full outsourcing (bookkeeping, payroll management, tax and social filings) will cost more than a partial assignment (such as preparing the annual accounts alone).",
          "Frequency of interventions: Companies requiring regular support (monthly or weekly) will incur higher costs than those seeking ad-hoc assistance.",
        ]),
        heading(2, "Cost Ranges"),
        paragraph(
          "Small businesses (fewer than 10 employees): Average monthly cost between €150 and €500 excluding VAT for bookkeeping and simple tax filings. Average annual cost between €1,800 and €6,000 excluding VAT for full management including year-end close and preparation of financial statements.",
        ),
        paragraph(
          "SMEs (10 to 50 employees): Average monthly cost between €500 and €1,500 excluding VAT for extended services. Average annual cost between €6,000 and €18,000 excluding VAT, depending on the complexity of assignments.",
        ),
        paragraph(
          "Large companies or high-volume transaction companies: Average monthly cost between €1,500 and €5,000 excluding VAT. Average annual cost between €18,000 and €60,000 excluding VAT for full management of accounting, tax, and payroll.",
        ),
        paragraph(
          "Payroll administration: Approximately €15 to €25 excluding VAT per payslip, with additional fixed fees. Average monthly cost between €100 and €1,000 excluding VAT, depending on the number of employees and complexity of collective agreements.",
        ),
        heading(2, "How to Choose a Provider for Accounting Outsourcing?"),
        heading(3, "Selection Criteria"),
        paragraph(
          "Choosing the right provider is an essential step to ensure successful accounting outsourcing. The main criteria to consider are:",
        ),
        unorderedList([
          "Reputation and experience: Choose an accounting firm with solid references and proven experience in supporting companies similar to yours.",
          "Sector expertise: A provider familiar with the specifics of your sector (e.g. tech, retail, industry) will be better placed to understand your financial and tax challenges.",
          "Digital tools: Ensure the provider uses modern solutions: ERP (Pennylane, Yooz, Odoo…), reporting software (Finthesis, QlikSense, PowerBI…), and collaborative platforms for real-time monitoring.",
        ]),
        heading(3, "Steps to Start the Collaboration"),
        unorderedList([
          "Define your needs: Assess precisely the tasks to be outsourced (bookkeeping, tax filings, payroll management) and determine your expectations in terms of results.",
          "Establish a detailed contract with your accountant: The engagement letter defines the tasks assigned, expected objectives (deadlines, deliverables), and fee arrangements (monthly, annual, or per assignment).",
          "Set up regular communication: Schedule monthly or quarterly review meetings. Use collaborative tools to share dashboards or activity reports.",
          "Evaluate performance: Organise periodic reviews to assess the quality of services and identify any necessary adjustments.",
        ]),
        heading(
          2,
          "Conclusion: Accounting Outsourcing — A Strategic Solution for Your Business",
        ),
        paragraph(
          "Accounting outsourcing is a key solution for optimising financial management, reducing costs, and gaining efficiency.",
        ),
        paragraph(
          "With Iter Advisors, benefit from personalised support to succeed in your transition to outsourcing.",
        ),
      ],
      metaTitle: "Outsource your accounting | Iter Advisors",
      metaDescription: "Accounting outsourcing and compliance. Iter Advisors.",
    },
    es: {
      heroTitle: "Externalizar la contabilidad",
      heroSubtitle:
        "Concéntrese en su negocio delegando la contabilidad en expertos.",
      content: [
        heading(2, "Externalización contable: optimice su gestión financiera"),
        paragraph(
          "Externalizar la contabilidad consiste en confiar la gestión financiera de una empresa a un asesor contable o a un despacho especializado. Esta práctica es especialmente habitual entre las microempresas y las pymes, donde la búsqueda de eficiencia y cumplimiento normativo es esencial.",
        ),
        paragraph(
          "Sin embargo, la elección de un profesional cualificado es primordial. Solo los miembros de despachos contables inscritos en el colegio oficial de economistas o titulados contables están habilitados para ejercer. Esto garantiza a la empresa un alto nivel de competencia y seguridad en sus operaciones.",
        ),
        paragraph(
          "El papel de los asesores contables va más allá de la simple llevanza de libros. Asesoran a los directivos en los aspectos estratégicos, velan por el cumplimiento normativo y optimizan los procesos contables.",
        ),
        paragraph(
          "Tanto si es una startup, una pyme o una gran empresa, externalizar su contabilidad puede ser una decisión estratégica. Este enfoque ofrece ventajas considerables: reducción de costes, acceso a experiencia especializada y mejora del rendimiento financiero.",
        ),
        paragraph("Reservar una reunión"),
        paragraph(
          "En Iter Advisors ponemos nuestra experiencia al servicio de su empresa para mejorar su gestión financiera a través de la externalización. Nuestro objetivo no es sustituir a su asesor contable, sino complementar su experiencia para una mayor eficacia.",
        ),
        heading(
          2,
          "¿Qué es la externalización contable y cuál es su principio?",
        ),
        heading(3, "Definición de externalización contable"),
        paragraph(
          "La externalización contable consiste en confiar la totalidad o parte de las tareas contables a un asesor contable o a un despacho especializado. Estos proveedores gestionan diversas misiones:",
        ),
        unorderedList([
          "Llevanza de libros.",
          "Declaraciones fiscales y de Seguridad Social.",
          "Elaboración de los estados financieros anuales.",
        ]),
        paragraph(
          "Este modelo se basa en una estrecha colaboración entre la empresa y el proveedor. La firma de una carta de encargo establece un marco claro, en el que se especifican las responsabilidades de cada parte y los objetivos a alcanzar.",
        ),
        heading(3, "¿Cuál es el principio de la externalización?"),
        paragraph(
          "El principio de la externalización es sencillo: permitir que la empresa se concentre en su actividad principal mientras delega las tareas complejas en expertos. El asesor contable garantiza:",
        ),
        unorderedList([
          "Una gestión conforme a la normativa vigente.",
          "Una racionalización de los costes gracias a servicios adaptados.",
          "El acceso a herramientas modernas para automatizar y optimizar los procesos contables (Pennylane, Netsuite, Sage…).",
        ]),
        heading(2, "¿Qué servicios contables se externalizan habitualmente?"),
        heading(3, "Servicios típicamente externalizados"),
        paragraph(
          "Externalizar la contabilidad a un asesor contable permite a una empresa confiar misiones variadas y complejas, garantizando su conformidad y calidad. Entre las tareas más habituales:",
        ),
        paragraph(
          "Llevanza de libros: Incluye el registro de las operaciones contables (compras, ventas, nóminas), las conciliaciones bancarias y la gestión de los asientos de inventario al cierre del período.",
        ),
        paragraph(
          "Declaraciones fiscales y de Seguridad Social: IVA, Impuesto sobre Sociedades, IAE, declaraciones de retenciones, impuesto sobre vehículos de empresa y otras obligaciones periódicas.",
        ),
        paragraph(
          "Gestión laboral y de nóminas: Elaboración de recibos de salarios, declaración y pago de cotizaciones a la Seguridad Social, gestión de los trámites de alta y baja de empleados.",
        ),
        paragraph(
          "Cierres anuales: El asesor contable prepara el balance, la cuenta de resultados, la memoria y la documentación fiscal para las obligaciones legales y las relaciones con terceros como bancos o inversores.",
        ),
        heading(3, "¿Qué es la asistencia contable?"),
        paragraph(
          "La asistencia contable está dirigida principalmente a pymes que no disponen de un departamento contable interno o que desean un apoyo específico. Incluye:",
        ),
        unorderedList([
          "Apoyo puntual en tareas específicas: Por ejemplo, la gestión de asientos de inventario o los ajustes durante el cierre del ejercicio.",
          "Asesoramiento sobre optimizaciones fiscales y financieras: Una perspectiva externa permite identificar oportunidades para reducir la carga fiscal u optimizar la tesorería.",
          "Formación de los equipos internos: Los asesores contables pueden formar al personal en el uso de herramientas contables y en la comprensión de los procesos financieros.",
        ]),
        heading(2, "¿Cuáles son las ventajas de la externalización contable?"),
        heading(3, "Reducción de los costes operativos"),
        paragraph(
          "La externalización contable es una solución rentable que convierte cargas fijas en costes variables. Al evitar la contratación de un equipo interno dedicado a la contabilidad, una empresa logra ahorros significativos:",
        ),
        unorderedList([
          "Sin salarios ni cargas sociales: No hay obligación de pagar un salario fijo, vacaciones ni indemnizaciones relacionadas con el personal interno.",
          "Coste adaptado a las necesidades: Los honorarios de un asesor contable son modulables en función de las misiones encomendadas, ya sea un servicio mensual o puntual como la preparación de los estados financieros.",
        ]),
        paragraph(
          "Para las pequeñas estructuras o las startups en fase de crecimiento, este modelo ofrece acceso a competencias profesionales sin comprometer la tesorería. Las empresas pueden destinar los recursos ahorrados a iniciativas estratégicas como el desarrollo comercial o la innovación.",
        ),
        heading(3, "Experiencia y cumplimiento normativo"),
        paragraph(
          "Los asesores contables aportan un dominio incomparable de las normativas fiscales y laborales. Esta experiencia reduce considerablemente los riesgos asociados a errores o retrasos en las declaraciones, que pueden acarrear sanciones económicas:",
        ),
        unorderedList([
          "Cumplimiento legal: Las declaraciones fiscales, laborales y jurídicas se realizan dentro de los plazos y conforme a las normas vigentes.",
          "Anticipación de los cambios normativos: Gracias a una vigilancia constante, el asesor contable adapta las prácticas contables para cumplir con las nuevas leyes o directivas.",
        ]),
        paragraph(
          "Además, su papel de asesoramiento estratégico va mucho más allá de la mera ejecución de tareas: ayudan a las empresas a identificar oportunidades de optimización fiscal o financiera, reforzando así su competitividad.",
        ),
        heading(3, "Ahorro de tiempo y flexibilidad"),
        paragraph(
          "La gestión de la contabilidad es una actividad que consume mucho tiempo, especialmente para los directivos de pymes o startups que suelen ser multitarea. La externalización les permite:",
        ),
        unorderedList([
          "Recentrarse en actividades estratégicas: Como la captación de nuevos clientes, el desarrollo de productos o la gestión de equipos.",
          "Beneficiarse de servicios flexibles: El asesor contable ajusta sus intervenciones según las necesidades: apoyo puntual durante el cierre anual, gestión recurrente de declaraciones o asistencia en proyectos específicos como una ronda de financiación.",
        ]),
        paragraph(
          "Esta flexibilidad es especialmente valiosa en entornos económicos inciertos, donde las necesidades pueden evolucionar rápidamente — el ejemplo clásico de las startups.",
        ),
        heading(2, "Caso práctico"),
        paragraph("OptiDigital"),
        paragraph("Ver el caso práctico"),
        paragraph("Actividad: Adtech Industry"),
        paragraph("Facturación inicial: 8 M€"),
        paragraph("Financiación obtenida: 30 M€ en los plazos previstos"),
        paragraph("Número de empleados: 35"),
        heading(2, "Factores que influyen en el coste"),
        paragraph(
          "Los costes de la externalización contable varían en función de varios criterios:",
        ),
        unorderedList([
          "Tamaño de la empresa: Una empresa pequeña con un bajo volumen de transacciones pagará menos que una gran empresa con operaciones complejas y numerosos empleados.",
          "Servicios solicitados: Una externalización completa (llevanza de libros, gestión laboral, declaraciones fiscales y de Seguridad Social) será más costosa que una misión parcial (como la sola preparación de las cuentas anuales).",
          "Frecuencia de las intervenciones: Las empresas que necesitan acompañamiento regular (mensual o semanal) tendrán costes superiores a las que solicitan asistencia puntual.",
        ]),
        heading(2, "Horquillas de costes"),
        paragraph(
          "Microempresas (menos de 10 empleados): Coste mensual medio entre 150 € y 500 € sin IVA para la llevanza de libros y declaraciones fiscales sencillas. Coste anual medio entre 1.800 € y 6.000 € sin IVA para una gestión completa que incluya el cierre de cuentas y la preparación de los estados financieros.",
        ),
        paragraph(
          "Pymes (de 10 a 50 empleados): Coste mensual medio entre 500 € y 1.500 € sin IVA para servicios ampliados. Coste anual medio entre 6.000 € y 18.000 € sin IVA, según la complejidad de las misiones.",
        ),
        paragraph(
          "Grandes empresas o sociedades con alto volumen de transacciones: Coste mensual medio entre 1.500 € y 5.000 € sin IVA. Coste anual medio entre 18.000 € y 60.000 € sin IVA para una gestión completa de los aspectos contable, fiscal y laboral.",
        ),
        paragraph(
          "Gestión de nóminas y cotizaciones sociales: Aproximadamente entre 15 € y 25 € sin IVA por recibo de salario, con gastos fijos adicionales. Coste mensual medio entre 100 € y 1.000 € sin IVA, según el número de empleados y la complejidad de los convenios colectivos.",
        ),
        heading(
          2,
          "¿Cómo elegir un proveedor para la externalización contable?",
        ),
        heading(3, "Criterios de selección"),
        paragraph(
          "La elección del proveedor adecuado es un paso esencial para garantizar el éxito de la externalización contable. Los principales criterios a tener en cuenta son:",
        ),
        unorderedList([
          "Reputación y experiencia: Opte por un despacho con referencias sólidas y experiencia contrastada en el acompañamiento de empresas similares a la suya.",
          "Experiencia sectorial: Un proveedor que conozca las particularidades de su sector (p. ej., tecnología, comercio, industria) estará mejor posicionado para entender sus retos financieros y fiscales.",
          "Herramientas digitales: Asegúrese de que el proveedor utiliza soluciones modernas: ERP (Pennylane, Holded, Odoo…), software de reporting (PowerBI, Metabase…) y plataformas colaborativas para un seguimiento en tiempo real.",
        ]),
        heading(3, "Pasos para iniciar la colaboración"),
        unorderedList([
          "Defina sus necesidades: Evalúe con precisión las tareas a externalizar (registro contable, declaraciones fiscales, gestión de nóminas) y determine sus expectativas en cuanto a resultados.",
          "Establezca un contrato detallado con su asesor contable: La carta de encargo define las tareas encomendadas, los objetivos esperados (plazos, entregables) y las condiciones de honorarios (mensuales, anuales o por servicio).",
          "Establezca una comunicación regular: Programe reuniones de seguimiento mensuales o trimestrales. Utilice herramientas colaborativas para compartir cuadros de mando o informes de actividad.",
          "Evalúe el rendimiento: Organice revisiones periódicas para analizar la calidad de los servicios e identificar los posibles ajustes necesarios.",
        ]),
        heading(
          2,
          "Conclusión: la externalización contable, una solución estratégica para su empresa",
        ),
        paragraph(
          "La externalización contable es una solución clave para optimizar la gestión financiera, reducir costes y ganar en eficiencia.",
        ),
        paragraph(
          "Con Iter Advisors, benefíciese de un acompañamiento personalizado para lograr con éxito su transición hacia la externalización.",
        ),
      ],
      metaTitle: "Externalizar la contabilidad | Iter Advisors",
      metaDescription:
        "Externalización de contabilidad y declaraciones. Iter Advisors.",
    },
  },

  // ─────────────────────────────────────────────────────────────────
  // 5. CONTRÔLE DE GESTION EXTERNALISÉ
  // ─────────────────────────────────────────────────────────────────
  {
    apiName: "controle-de-gestion-externalise-page",
    fr: {
      heroTitle: "Contrôle de gestion",
      heroSubtitle:
        "Pilotez la performance avec des budgets, prévisionnels et tableaux de bord fiables.",
      content: [
        heading(
          2,
          "Contrôle de gestion externalisé : une solution clé pour piloter votre entreprise",
        ),
        paragraph(
          "Le contrôle de gestion externalisé est devenu un service stratégique incontournable pour les entreprises souhaitant optimiser leur performance financière tout en maîtrisant leurs coûts. Ce service permet aux dirigeants de déléguer la gestion des données financières et opérationnelles à des experts externes, leur offrant ainsi un regard neuf et des analyses précises pour prendre des décisions suffisamment éclairées.",
        ),
        paragraph(
          "Pour les startups et PME, le contrôle de gestion externalisé représente une alternative flexible et économique à l'embauche d'un contrôleur de gestion interne. Avec Iter Advisors, bénéficiez d'un accompagnement sur mesure, adapté à vos besoins et piloté par des professionnels expérimentés.",
        ),
        paragraph("Prendre rendez-vous"),
        heading(
          2,
          "Qu'est-ce qu'un service externalisé et pourquoi l'adopter ?",
        ),
        heading(3, "Définition d'un service externalisé"),
        paragraph(
          "Un service externalisé consiste à confier certaines activités, souvent non stratégiques, à des prestataires externes. Cette pratique permet aux entreprises de se concentrer sur leur cœur de métier tout en s'appuyant sur des experts pour des tâches spécifiques, comme le contrôle de gestion.",
        ),
        paragraph(
          "Dans le domaine financier, l'externalisation est particulièrement bénéfique pour les entreprises en pleine croissance ou confrontées à des besoins ponctuels en expertise.",
        ),
        heading(3, "Qu'est-ce que la stratégie d'externalisation ?"),
        paragraph(
          "Adopter une stratégie d'externalisation vise à améliorer la performance globale de l'entreprise. Cela passe par :",
        ),
        unorderedList([
          "L'optimisation des coûts : Réduction des charges fixes liées aux postes internes.",
          "Le recentrage sur les priorités : Déléguer les tâches complexes pour se concentrer sur les décisions stratégiques.",
        ]),
        heading(
          2,
          "Quels sont les principes fondamentaux du contrôle de gestion ?",
        ),
        heading(3, "Les 4 piliers du contrôle de gestion"),
        paragraph(
          "Le contrôle de gestion repose sur des principes essentiels pour assurer une gestion efficace des finances et des performances :",
        ),
        unorderedList([
          "Planification : Définir des objectifs financiers et opérationnels précis.",
          "Mesure : Collecter et analyser les données clés pour évaluer les performances.",
          "Comparaison : Identifier les écarts entre les prévisions et les résultats réels.",
          "Action corrective : Ajuster les stratégies pour atteindre les objectifs fixés.",
        ]),
        paragraph(
          "Ces étapes permettent à l'entreprise de garder une vision claire et structurée de sa gestion.",
        ),
        heading(2, "Quels sont les différents types de contrôle de gestion ?"),
        heading(3, "Contrôle de gestion stratégique"),
        paragraph(
          "Le contrôle de gestion stratégique s'inscrit dans une vision à long terme du business. Il vise à aligner les objectifs financiers sur la stratégie globale de l'entreprise. Cela implique de s'assurer que les ressources, qu'elles soient humaines, financières ou matérielles, sont utilisées de manière cohérente avec les ambitions de croissance.",
        ),
        paragraph(
          "Une entreprise à croissance rapide, par exemple sur le secteur de la Tech, qui ambitionne de doubler son chiffre d'affaires sur cinq ans, peut utiliser le contrôle de gestion stratégique pour déterminer les investissements nécessaires (R&D, marketing, recrutement). Grâce à une planification détaillée, elle peut évaluer si ses marges et ses ressources actuelles suffisent ou si elle doit lever des fonds supplémentaires pour atteindre ses objectifs.",
        ),
        paragraph(
          "Le contrôle stratégique est particulièrement utile lors de décisions majeures : entrée sur un nouveau marché, acquisition, ou lancement d'un produit. Il permet d'anticiper les risques et de maximiser les opportunités en s'appuyant sur des données fiables.",
        ),
        heading(3, "Contrôle de gestion opérationnel"),
        paragraph(
          "Le contrôle de gestion opérationnel, quant à lui, se concentre sur les activités quotidiennes de l'entreprise. Il a pour but d'optimiser les processus internes afin d'améliorer l'efficacité et la rentabilité.",
        ),
        paragraph(
          "Dans une PME industrielle, le contrôle opérationnel peut viser à réduire les délais de production en identifiant des inefficacités dans la chaîne logistique. En analysant les coûts par unité produite ou les écarts entre les prévisions et les résultats réels, l'entreprise peut ajuster ses processus pour minimiser les gaspillages et maximiser les marges.",
        ),
        paragraph(
          "Ce type de contrôle est essentiel pour les entreprises qui cherchent à rester compétitives au quotidien tout en maîtrisant leurs coûts. Il s'applique aussi bien aux équipes commerciales (suivi des performances des ventes) qu'aux opérations terrain (gestion des stocks, maintenance des équipements).",
        ),
        heading(3, "Contrôle de gestion budgétaire"),
        paragraph(
          "Le contrôle de gestion budgétaire consiste à suivre et ajuster les budgets de l'entreprise en temps réel pour s'assurer qu'ils restent alignés sur les objectifs financiers.",
        ),
        paragraph(
          "Imaginons le cas d'une startup SaaS ayant prévu un budget marketing annuel de 200K€. Celle-ci constate, grâce au contrôle budgétaire mis en place, que certaines campagnes publicitaires génèrent moins de retours que prévu. En réallouant une partie de ce budget vers des canaux plus performants (par exemple, des publicités digitales ciblées), elle peut optimiser son retour sur investissement tout en respectant ses enveloppes budgétaires globales.",
        ),
        paragraph(
          "Le contrôle budgétaire permet également de réagir rapidement à des imprévus, comme une augmentation soudaine des coûts ou une baisse des ventes. C'est un outil de pilotage financier indispensable pour les entreprises cherchant à garder une maîtrise totale de leurs finances.",
        ),
        heading(2, "Pourquoi choisir le contrôle de gestion externalisé ?"),
        unorderedList([
          "Expertise immédiate et spécialisée : Faire appel à un service de contrôle de gestion externalisé, c'est accéder rapidement à des professionnels expérimentés capables de fournir des analyses précises et des recommandations stratégiques. Ces experts maîtrisent les outils financiers modernes et disposent d'une solide expérience sectorielle.",
          "Réduction des coûts : En externalisant, vous évitez les charges fixes liées à un poste interne : salaires, cotisations sociales, formation. Vous adaptez également le volume d'intervention à vos besoins réels, ce qui optimise encore davantage votre budget.",
          "Gain de temps pour les dirigeants : Le contrôle de gestion externalisé permet aux dirigeants de se concentrer sur leurs priorités stratégiques, en laissant les tâches analytiques et opérationnelles à des experts.",
        ]),
        heading(2, "Étude de cas"),
        paragraph("Surfe (ex-Leadjet)"),
        paragraph("Voir l'étude de cas"),
        paragraph("Activité : Saas"),
        paragraph("ARR initial : 1 M€"),
        paragraph("Économies réalisées : 55 k€"),
        paragraph("Nombre de salariés : 30"),
        heading(
          2,
          "Comment mettre en place un contrôle de gestion externalisé ?",
        ),
        paragraph(
          "Le choix d'un prestataire pour un contrôle de gestion externalisé est une étape clé pour garantir le succès de la collaboration. Voici les principaux critères que nous suggérons de considérer :",
        ),
        unorderedList([
          "Expérience sectorielle : Privilégiez un expert qui maîtrise les particularités de votre secteur d'activité. Cette connaissance spécifique permettra une analyse et un accompagnement mieux adaptés à vos enjeux.",
          "Outils technologiques : Assurez-vous que le prestataire utilise des solutions modernes et performantes pour automatiser et optimiser les processus. Ces outils peuvent améliorer la précision des données et accélérer la prise de décision.",
          "Flexibilité : Optez pour un prestataire capable d'ajuster ses interventions en fonction de l'évolution de vos besoins. Qu'il s'agisse de missions ponctuelles ou d'un accompagnement régulier, la souplesse est essentielle pour maximiser l'efficacité de la collaboration.",
        ]),
        paragraph(
          "Ces éléments sont indispensables pour sélectionner un partenaire qui saura répondre à vos attentes et s'adapter à vos objectifs financiers et opérationnels.",
        ),
        heading(
          2,
          "Quels sont les coûts d'un contrôle de gestion externalisé ?",
        ),
        heading(3, "Facteurs influençant les coûts"),
        paragraph(
          "Le coût d'un service de contrôle de gestion externalisé peut varier en fonction de plusieurs critères :",
        ),
        unorderedList([
          "Complexité des besoins : Une mission ponctuelle, comme l'élaboration d'un budget ou la mise en place d'un tableau de bord, sera généralement moins coûteuse qu'un accompagnement récurrent sur plusieurs mois.",
          "Fréquence des interventions : Le tarif dépend du volume d'heures ou de jours travaillés par mois. Plus les interventions sont régulières, plus les coûts peuvent être ajustés.",
          "Outils utilisés : Certains prestataires incluent l'utilisation de logiciels spécialisés dans leurs tarifs. Ces outils, bien que parfois onéreux, permettent d'optimiser les processus et de garantir une gestion financière précise et efficace.",
        ]),
        paragraph(
          "Comprendre ces facteurs est essentiel pour évaluer le budget nécessaire et choisir une solution adaptée à vos besoins financiers et opérationnels.",
        ),
        heading(
          2,
          "Pourquoi l'externalisation est plus avantageuse que l'embauche d'un contrôleur de gestion interne",
        ),
        paragraph(
          "L'externalisation du contrôle de gestion présente des avantages significatifs sur les plans financier et opérationnel, rendant cette solution souvent plus économique et efficace qu'un poste interne.",
        ),
        heading(3, "Réduction des charges fixes"),
        paragraph(
          "Embaucher un contrôleur de gestion interne implique des coûts fixes conséquents :",
        ),
        unorderedList([
          "Salaire annuel : En fonction de l'expérience, un contrôleur de gestion peut coûter entre 40 000 € et 70 000 € brut par an.",
          "Charges sociales : Elles viennent augmenter le coût total de l'employé de 30 à 50 %.",
          "Investissements complémentaires : Formation continue, logiciels de reporting, et outils de gestion spécialisés.",
        ]),
        paragraph(
          "En comparaison, un contrôleur de gestion externalisé est facturé en fonction des heures ou jours travaillés. Cela permet d'adapter les dépenses aux besoins réels de l'entreprise, évitant ainsi les coûts superflus liés à une charge fixe permanente.",
        ),
        heading(3, "Flexibilité opérationnelle"),
        paragraph(
          "Les besoins d'une entreprise évoluent en fonction de son cycle de vie :",
        ),
        unorderedList([
          "Une startup en phase de croissance a besoin d'un accompagnement intensif sur le court terme pour structurer ses finances.",
          "Une PME établie peut avoir des besoins ponctuels, comme la mise en place d'un budget ou d'un audit de rentabilité.",
        ]),
        paragraph(
          "Avec un expert externe, l'entreprise bénéficie d'une flexibilité totale : intervention sur des périodes spécifiques ou des missions ponctuelles (préparation de budgets, analyses de coûts, etc.), possibilité d'arrêter ou de réduire la collaboration dès que le besoin est satisfait, ce qui est impossible avec un employé permanent.",
        ),
        heading(3, "Expertise spécialisée et résultats immédiats"),
        paragraph(
          "Un contrôleur de gestion externe apporte une expertise pointue, acquise grâce à ses interventions dans différentes entreprises et secteurs d'activité. Cela signifie :",
        ),
        unorderedList([
          "Une mise en action rapide grâce à une expérience éprouvée dans des problématiques similaires.",
          "Une meilleure maîtrise des outils modernes et des méthodologies de gestion les plus récentes, souvent inexistantes dans les entreprises moins digitalisées.",
        ]),
        paragraph(
          "Recruter un employé interne, en revanche, implique souvent une phase d'intégration et de formation, ralentissant les résultats.",
        ),
        heading(3, "Justification stratégique"),
        paragraph(
          "Un contrôleur de gestion interne peut parfois être sous-utilisé dans une entreprise dont les besoins sont fluctuants ou modestes. En externalisant, les dirigeants s'assurent que chaque euro investi dans la gestion financière est directement lié à une mission ou à un objectif précis.",
        ),
        heading(
          2,
          "Conclusion : Pourquoi choisir un contrôle de gestion externalisé ?",
        ),
        paragraph(
          "De manière synthétique, le contrôle de gestion externalisé offre une solution flexible, économique et performante pour les entreprises cherchant à optimiser leur gestion financière.",
        ),
        paragraph(
          "Avec Iter Advisors, vous bénéficiez d'un service sur mesure, piloté par des experts engagés à vos côtés pour garantir votre succès.",
        ),
      ],
      metaTitle: "Contrôle de gestion externalisé | Iter Advisors",
      metaDescription:
        "Contrôle de gestion, budgets et reporting. Iter Advisors.",
    },
    en: {
      heroTitle: "Outsourced management control",
      heroSubtitle:
        "Drive performance with reliable budgets, forecasts and dashboards.",
      content: [
        heading(
          2,
          "Outsourced Management Control: A Key Solution for Running Your Business",
        ),
        paragraph(
          "Outsourced management control has become an essential strategic service for companies seeking to optimise their financial performance while keeping costs under control. This service allows business leaders to delegate the management of financial and operational data to external experts, providing a fresh perspective and precise analyses to support well-informed decisions.",
        ),
        paragraph(
          "For startups and SMEs, outsourced management control represents a flexible and cost-effective alternative to hiring an in-house controller. With Iter Advisors, benefit from tailored support, adapted to your needs and driven by experienced professionals.",
        ),
        paragraph("Book a meeting"),
        heading(2, "What Is an Outsourced Service and Why Adopt One?"),
        heading(3, "Definition of an Outsourced Service"),
        paragraph(
          "An outsourced service involves entrusting certain activities — often non-strategic ones — to external providers. This practice allows companies to focus on their core business while relying on experts for specific tasks such as management control.",
        ),
        paragraph(
          "In the financial domain, outsourcing is particularly beneficial for rapidly growing companies or those facing ad-hoc expertise needs.",
        ),
        heading(3, "What Is an Outsourcing Strategy?"),
        paragraph(
          "Adopting an outsourcing strategy aims to improve the company's overall performance. This is achieved through:",
        ),
        unorderedList([
          "Cost optimisation: Reduction of fixed charges linked to in-house positions.",
          "Refocusing on priorities: Delegating complex tasks to concentrate on strategic decisions.",
        ]),
        heading(
          2,
          "What Are the Fundamental Principles of Management Control?",
        ),
        heading(3, "The 4 Pillars of Management Control"),
        paragraph(
          "Management control rests on essential principles to ensure effective management of finances and performance:",
        ),
        unorderedList([
          "Planning: Defining precise financial and operational objectives.",
          "Measurement: Collecting and analysing key data to evaluate performance.",
          "Comparison: Identifying variances between forecasts and actual results.",
          "Corrective action: Adjusting strategies to achieve the set objectives.",
        ]),
        paragraph(
          "These steps enable the company to maintain a clear and structured view of its management.",
        ),
        heading(2, "What Are the Different Types of Management Control?"),
        heading(3, "Strategic Management Control"),
        paragraph(
          "Strategic management control is embedded in a long-term business vision. It aims to align financial objectives with the company's overall strategy. This involves ensuring that resources — human, financial, or material — are used in a way that is consistent with growth ambitions.",
        ),
        paragraph(
          "A fast-growing company in the tech sector, for example, aspiring to double its revenue over five years, can use strategic management control to determine the necessary investments (R&D, marketing, recruitment). Through detailed planning, it can assess whether its current margins and resources are sufficient or whether additional funds need to be raised.",
        ),
        paragraph(
          "Strategic control is particularly useful for major decisions: entering a new market, making an acquisition, or launching a product. It enables risks to be anticipated and opportunities maximised on the basis of reliable data.",
        ),
        heading(3, "Operational Management Control"),
        paragraph(
          "Operational management control focuses on the company's day-to-day activities. Its purpose is to optimise internal processes in order to improve efficiency and profitability.",
        ),
        paragraph(
          "In an industrial SME, operational control might aim to reduce production lead times by identifying inefficiencies in the supply chain. By analysing costs per unit produced or variances between forecasts and actual results, the company can adjust its processes to minimise waste and maximise margins.",
        ),
        paragraph(
          "This type of control is essential for companies seeking to remain competitive on a daily basis while keeping costs under control. It applies equally to sales teams (tracking sales performance) and field operations (stock management, equipment maintenance).",
        ),
        heading(3, "Budget Management Control"),
        paragraph(
          "Budget management control involves monitoring and adjusting the company's budgets in real time to ensure they remain aligned with financial objectives.",
        ),
        paragraph(
          "Consider the example of a SaaS startup with an annual marketing budget of €200K. Through budget control, it discovers that certain advertising campaigns are generating fewer returns than expected. By reallocating part of this budget to higher-performing channels (for example, targeted digital advertising), it can optimise its return on investment while respecting its overall budget envelopes.",
        ),
        paragraph(
          "Budget control also enables a rapid response to unexpected events, such as a sudden cost increase or a drop in sales. It is an indispensable financial management tool for companies seeking full control of their finances.",
        ),
        heading(2, "Why Choose Outsourced Management Control?"),
        unorderedList([
          "Immediate and specialist expertise: Calling on an outsourced management control service means rapid access to experienced professionals capable of providing precise analyses and strategic recommendations. These experts master modern financial tools and have solid sector experience.",
          "Cost reduction: By outsourcing, you avoid the fixed charges linked to an in-house position: salaries, social contributions, training. You also adapt the volume of intervention to your actual needs, further optimising your budget.",
          "Time savings for business leaders: Outsourced management control allows leaders to focus on their strategic priorities, leaving analytical and operational tasks to experts.",
        ]),
        heading(2, "Case Study"),
        paragraph("Surfe (formerly Leadjet)"),
        paragraph("View the case study"),
        paragraph("Activity: SaaS"),
        paragraph("Initial ARR: €1M"),
        paragraph("Savings achieved: €55K"),
        paragraph("Number of employees: 30"),
        heading(2, "How to Implement Outsourced Management Control?"),
        paragraph(
          "Choosing a provider for outsourced management control is a key step in ensuring a successful collaboration. Here are the main criteria we suggest considering:",
        ),
        unorderedList([
          "Sector experience: Favour an expert who understands the specifics of your sector. This specific knowledge will enable better-adapted analysis and support for your challenges.",
          "Technological tools: Ensure the provider uses modern, high-performance solutions to automate and optimise processes. These tools can improve data accuracy and accelerate decision-making.",
          "Flexibility: Choose a provider capable of adjusting their interventions as your needs evolve. Whether for one-off assignments or regular support, flexibility is essential to maximise the effectiveness of the collaboration.",
        ]),
        paragraph(
          "These elements are indispensable for selecting a partner who will be able to meet your expectations and adapt to your financial and operational objectives.",
        ),
        heading(2, "What Are the Costs of Outsourced Management Control?"),
        heading(3, "Factors Influencing Costs"),
        paragraph(
          "The cost of an outsourced management control service can vary according to several criteria:",
        ),
        unorderedList([
          "Complexity of needs: A one-off assignment, such as building a budget or setting up a dashboard, will generally cost less than ongoing support over several months.",
          "Frequency of interventions: The fee depends on the volume of hours or days worked per month. The more regular the interventions, the more adjustable the costs.",
          "Tools used: Some providers include the use of specialist software in their fees. These tools, although sometimes costly, allow processes to be optimised and ensure precise and effective financial management.",
        ]),
        paragraph(
          "Understanding these factors is essential for assessing the required budget and choosing a solution adapted to your financial and operational needs.",
        ),
        heading(
          2,
          "Why Outsourcing Is More Advantageous Than Hiring an In-House Controller",
        ),
        paragraph(
          "Outsourcing management control offers significant advantages on the financial and operational fronts, making this solution often more economical and effective than an in-house position.",
        ),
        heading(3, "Reduction of Fixed Charges"),
        paragraph(
          "Hiring an in-house controller involves significant fixed costs:",
        ),
        unorderedList([
          "Annual salary: Depending on experience, a management controller can cost between €40,000 and €70,000 gross per year.",
          "Social charges: These increase the total cost of the employee by 30 to 50%.",
          "Additional investments: Ongoing training, reporting software, and specialist management tools.",
        ]),
        paragraph(
          "By comparison, an outsourced management controller is billed according to hours or days worked. This allows expenditure to be adapted to the company's actual needs, avoiding superfluous costs linked to a permanent fixed charge.",
        ),
        heading(3, "Operational Flexibility"),
        paragraph("A company's needs evolve according to its life cycle:"),
        unorderedList([
          "A startup in the growth phase needs intensive short-term support to structure its finances.",
          "An established SME may have ad-hoc needs, such as building a budget or conducting a profitability audit.",
        ]),
        paragraph(
          "With an external expert, the company benefits from total flexibility: intervention over specific periods or for one-off assignments (budget preparation, cost analyses, etc.), with the possibility of stopping or reducing the collaboration once the need is met — something impossible with a permanent employee.",
        ),
        heading(3, "Specialised Expertise and Immediate Results"),
        paragraph(
          "An external management controller brings specialist expertise, acquired through interventions in various companies and sectors. This means:",
        ),
        unorderedList([
          "Rapid action thanks to proven experience with similar challenges.",
          "Better mastery of modern tools and the latest management methodologies, often absent in less digitalised companies.",
        ]),
        paragraph(
          "Hiring an internal employee, by contrast, typically involves an onboarding and training phase that delays results.",
        ),
        heading(3, "Strategic Justification"),
        paragraph(
          "An in-house management controller can sometimes be underutilised in a company with fluctuating or modest needs. By outsourcing, business leaders ensure that every euro invested in financial management is directly linked to a specific assignment or objective.",
        ),
        heading(2, "Conclusion: Why Choose Outsourced Management Control?"),
        paragraph(
          "In summary, outsourced management control offers a flexible, economical, and high-performance solution for companies seeking to optimise their financial management.",
        ),
        paragraph(
          "With Iter Advisors, you benefit from a bespoke service, driven by committed experts by your side to guarantee your success.",
        ),
      ],
      metaTitle: "Outsourced management control | Iter Advisors",
      metaDescription:
        "Management control, budgets and reporting. Iter Advisors.",
    },
    es: {
      heroTitle: "Control de gestión externalizado",
      heroSubtitle:
        "Pilote el rendimiento con presupuestos, previsiones y cuadros de mando fiables.",
      content: [
        heading(
          2,
          "Control de gestión externalizado: una solución clave para pilotar su empresa",
        ),
        paragraph(
          "El control de gestión externalizado se ha convertido en un servicio estratégico imprescindible para las empresas que desean optimizar su rendimiento financiero y al mismo tiempo controlar sus costes. Este servicio permite a los directivos delegar la gestión de los datos financieros y operativos en expertos externos, que les aportan una perspectiva nueva y análisis precisos para tomar decisiones bien fundamentadas.",
        ),
        paragraph(
          "Para las startups y las pymes, el control de gestión externalizado es una alternativa flexible y económica a la contratación de un controller interno. Con Iter Advisors, benefíciese de un acompañamiento a medida, adaptado a sus necesidades y dirigido por profesionales con experiencia.",
        ),
        paragraph("Reservar una reunión"),
        heading(2, "¿Qué es un servicio externalizado y por qué adoptarlo?"),
        heading(3, "Definición de servicio externalizado"),
        paragraph(
          "Un servicio externalizado consiste en confiar determinadas actividades —a menudo no estratégicas— a proveedores externos. Esta práctica permite a las empresas concentrarse en su actividad principal apoyándose en expertos para tareas específicas, como el control de gestión.",
        ),
        paragraph(
          "En el ámbito financiero, la externalización es especialmente beneficiosa para las empresas en pleno crecimiento o que se enfrentan a necesidades puntuales de experiencia.",
        ),
        heading(3, "¿Qué es la estrategia de externalización?"),
        paragraph(
          "Adoptar una estrategia de externalización tiene como objetivo mejorar el rendimiento global de la empresa. Esto se logra a través de:",
        ),
        unorderedList([
          "Optimización de costes: Reducción de las cargas fijas ligadas a puestos internos.",
          "Recentrado en las prioridades: Delegar las tareas complejas para concentrarse en las decisiones estratégicas.",
        ]),
        heading(
          2,
          "¿Cuáles son los principios fundamentales del control de gestión?",
        ),
        heading(3, "Los 4 pilares del control de gestión"),
        paragraph(
          "El control de gestión se basa en principios esenciales para garantizar una gestión eficaz de las finanzas y el rendimiento:",
        ),
        unorderedList([
          "Planificación: Definir objetivos financieros y operativos precisos.",
          "Medición: Recopilar y analizar los datos clave para evaluar el rendimiento.",
          "Comparación: Identificar las desviaciones entre las previsiones y los resultados reales.",
          "Acción correctiva: Ajustar las estrategias para alcanzar los objetivos fijados.",
        ]),
        paragraph(
          "Estos pasos permiten a la empresa mantener una visión clara y estructurada de su gestión.",
        ),
        heading(2, "¿Cuáles son los diferentes tipos de control de gestión?"),
        heading(3, "Control de gestión estratégico"),
        paragraph(
          "El control de gestión estratégico se inscribe en una visión empresarial a largo plazo. Su objetivo es alinear los objetivos financieros con la estrategia global de la empresa. Esto implica garantizar que los recursos —humanos, financieros o materiales— se utilicen de forma coherente con las ambiciones de crecimiento.",
        ),
        paragraph(
          "Una empresa de rápido crecimiento, por ejemplo en el sector tecnológico, que aspira a duplicar su facturación en cinco años, puede utilizar el control de gestión estratégico para determinar las inversiones necesarias (I+D, marketing, contrataciones). Gracias a una planificación detallada, puede evaluar si sus márgenes y recursos actuales son suficientes o si necesita captar fondos adicionales.",
        ),
        paragraph(
          "El control estratégico es especialmente útil en decisiones importantes: entrada en un nuevo mercado, adquisición o lanzamiento de un producto. Permite anticipar los riesgos y maximizar las oportunidades apoyándose en datos fiables.",
        ),
        heading(3, "Control de gestión operativo"),
        paragraph(
          "El control de gestión operativo se centra en las actividades cotidianas de la empresa. Su finalidad es optimizar los procesos internos para mejorar la eficiencia y la rentabilidad.",
        ),
        paragraph(
          "En una pyme industrial, el control operativo puede tener como objetivo reducir los plazos de producción identificando ineficiencias en la cadena logística. Al analizar los costes por unidad producida o las desviaciones entre las previsiones y los resultados reales, la empresa puede ajustar sus procesos para minimizar los desperdicios y maximizar los márgenes.",
        ),
        paragraph(
          "Este tipo de control es esencial para las empresas que buscan mantenerse competitivas en el día a día y al mismo tiempo controlar sus costes. Se aplica tanto a los equipos comerciales (seguimiento del rendimiento de ventas) como a las operaciones en campo (gestión de stocks, mantenimiento de equipos).",
        ),
        heading(3, "Control de gestión presupuestario"),
        paragraph(
          "El control de gestión presupuestario consiste en hacer seguimiento y ajustar los presupuestos de la empresa en tiempo real para garantizar que permanezcan alineados con los objetivos financieros.",
        ),
        paragraph(
          "Imaginemos el caso de una startup SaaS con un presupuesto de marketing anual de 200.000 €. Gracias al control presupuestario implantado, detecta que determinadas campañas publicitarias generan menos retorno del previsto. Al reasignar parte de ese presupuesto a canales más eficaces (por ejemplo, publicidad digital segmentada), puede optimizar su retorno sobre la inversión respetando sus envolventes presupuestarias globales.",
        ),
        paragraph(
          "El control presupuestario también permite reaccionar con rapidez ante imprevistos, como un aumento repentino de costes o una caída de las ventas. Es una herramienta de pilotaje financiero indispensable para las empresas que buscan mantener un control total de sus finanzas.",
        ),
        heading(2, "¿Por qué elegir el control de gestión externalizado?"),
        unorderedList([
          "Experiencia inmediata y especializada: Recurrir a un servicio de control de gestión externalizado significa acceder rápidamente a profesionales con experiencia capaces de ofrecer análisis precisos y recomendaciones estratégicas. Estos expertos dominan las herramientas financieras modernas y cuentan con una sólida experiencia sectorial.",
          "Reducción de costes: Al externalizar, evita las cargas fijas ligadas a un puesto interno: salarios, cotizaciones sociales, formación. Además, adapta el volumen de intervención a sus necesidades reales, lo que optimiza aún más su presupuesto.",
          "Ahorro de tiempo para los directivos: El control de gestión externalizado permite a los directivos concentrarse en sus prioridades estratégicas, dejando las tareas analíticas y operativas en manos de expertos.",
        ]),
        heading(2, "Caso práctico"),
        paragraph("Surfe (antes Leadjet)"),
        paragraph("Ver el caso práctico"),
        paragraph("Actividad: SaaS"),
        paragraph("ARR inicial: 1 M€"),
        paragraph("Ahorros obtenidos: 55 k€"),
        paragraph("Número de empleados: 30"),
        heading(2, "¿Cómo implantar un control de gestión externalizado?"),
        paragraph(
          "La elección de un proveedor para el control de gestión externalizado es una etapa clave para garantizar el éxito de la colaboración. A continuación se presentan los principales criterios que sugerimos considerar:",
        ),
        unorderedList([
          "Experiencia sectorial: Prefiera un experto que conozca las particularidades de su sector de actividad. Este conocimiento específico permitirá un análisis y un acompañamiento mejor adaptados a sus retos.",
          "Herramientas tecnológicas: Asegúrese de que el proveedor utiliza soluciones modernas y de alto rendimiento para automatizar y optimizar los procesos. Estas herramientas pueden mejorar la precisión de los datos y acelerar la toma de decisiones.",
          "Flexibilidad: Opte por un proveedor capaz de ajustar sus intervenciones a la evolución de sus necesidades. Tanto para misiones puntuales como para un acompañamiento regular, la flexibilidad es esencial para maximizar la eficacia de la colaboración.",
        ]),
        paragraph(
          "Estos elementos son indispensables para seleccionar a un socio que sepa responder a sus expectativas y adaptarse a sus objetivos financieros y operativos.",
        ),
        heading(
          2,
          "¿Cuáles son los costes del control de gestión externalizado?",
        ),
        heading(3, "Factores que influyen en los costes"),
        paragraph(
          "El coste de un servicio de control de gestión externalizado puede variar en función de varios criterios:",
        ),
        unorderedList([
          "Complejidad de las necesidades: Una misión puntual, como la elaboración de un presupuesto o la implantación de un cuadro de mando, será generalmente menos costosa que un acompañamiento recurrente durante varios meses.",
          "Frecuencia de las intervenciones: El precio depende del volumen de horas o días trabajados al mes. Cuanto más regulares sean las intervenciones, más ajustables serán los costes.",
          "Herramientas utilizadas: Algunos proveedores incluyen el uso de software especializado en sus honorarios. Estas herramientas, aunque a veces costosas, permiten optimizar los procesos y garantizar una gestión financiera precisa y eficaz.",
        ]),
        paragraph(
          "Comprender estos factores es esencial para evaluar el presupuesto necesario y elegir una solución adaptada a sus necesidades financieras y operativas.",
        ),
        heading(
          2,
          "Por qué la externalización es más ventajosa que contratar un controller interno",
        ),
        paragraph(
          "La externalización del control de gestión presenta ventajas significativas en los planos financiero y operativo, haciendo que esta solución sea con frecuencia más económica y eficaz que un puesto interno.",
        ),
        heading(3, "Reducción de las cargas fijas"),
        paragraph(
          "Contratar un controller interno implica costes fijos considerables:",
        ),
        unorderedList([
          "Salario anual: Según la experiencia, un controller de gestión puede costar entre 40.000 € y 70.000 € brutos al año.",
          "Cargas sociales: Aumentan el coste total del empleado entre un 30 y un 50 %.",
          "Inversiones complementarias: Formación continua, software de reporting y herramientas de gestión especializadas.",
        ]),
        paragraph(
          "En comparación, un controller de gestión externalizado se factura según las horas o días trabajados. Esto permite adaptar los gastos a las necesidades reales de la empresa, evitando los costes superfluos ligados a una carga fija permanente.",
        ),
        heading(3, "Flexibilidad operativa"),
        paragraph(
          "Las necesidades de una empresa evolucionan según su ciclo de vida:",
        ),
        unorderedList([
          "Una startup en fase de crecimiento necesita un acompañamiento intensivo a corto plazo para estructurar sus finanzas.",
          "Una pyme consolidada puede tener necesidades puntuales, como la elaboración de un presupuesto o una auditoría de rentabilidad.",
        ]),
        paragraph(
          "Con un experto externo, la empresa se beneficia de una flexibilidad total: intervención durante períodos específicos o para misiones puntuales (preparación de presupuestos, análisis de costes, etc.), con la posibilidad de detener o reducir la colaboración en cuanto la necesidad queda satisfecha, algo imposible con un empleado permanente.",
        ),
        heading(3, "Experiencia especializada y resultados inmediatos"),
        paragraph(
          "Un controller de gestión externo aporta una experiencia especializada, adquirida gracias a sus intervenciones en diferentes empresas y sectores. Esto significa:",
        ),
        unorderedList([
          "Una puesta en marcha rápida gracias a una experiencia probada en problemáticas similares.",
          "Un mejor dominio de las herramientas modernas y las metodologías de gestión más recientes, que a menudo no existen en empresas menos digitalizadas.",
        ]),
        paragraph(
          "Contratar a un empleado interno, en cambio, suele implicar una fase de incorporación y formación que retrasa los resultados.",
        ),
        heading(3, "Justificación estratégica"),
        paragraph(
          "Un controller de gestión interno puede a veces estar infrautilizado en una empresa cuyas necesidades son fluctuantes o modestas. Al externalizar, los directivos se aseguran de que cada euro invertido en la gestión financiera está directamente vinculado a una misión o a un objetivo preciso.",
        ),
        heading(
          2,
          "Conclusión: ¿por qué elegir el control de gestión externalizado?",
        ),
        paragraph(
          "En resumen, el control de gestión externalizado ofrece una solución flexible, económica y de alto rendimiento para las empresas que buscan optimizar su gestión financiera.",
        ),
        paragraph(
          "Con Iter Advisors, se beneficia de un servicio a medida, dirigido por expertos comprometidos a su lado para garantizar su éxito.",
        ),
      ],
      metaTitle: "Control de gestión externalizado | Iter Advisors",
      metaDescription:
        "Control de gestión, presupuestos y reporting. Iter Advisors.",
    },
  },
];

const LOCALE_MAP: Record<(typeof LOCALES)[number], "fr" | "en" | "es"> = {
  fr: "fr",
  en: "en",
  es: "es",
};

async function upsertServicePage(
  apiName: string,
  locale: (typeof LOCALES)[number],
  data: {
    heroTitle: string;
    heroSubtitle: string;
    content: StrapiContentBlock[];
    metaTitle: string;
    metaDescription: string;
  },
): Promise<void> {
  const localeParamFor = (loc: string) => `locale=${encodeURIComponent(loc)}`;
  const localesToTry = [locale, LOCALE_FALLBACK[locale]].filter(
    Boolean,
  ) as string[];

  const body = {
    data: {
      heroTitle: data.heroTitle,
      heroSubtitle: data.heroSubtitle,
      content: data.content,
      faq: [],
      seo: {
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
      },
      publishedAt: new Date().toISOString(),
    },
  };

  const headers = {
    Authorization: `Bearer ${STRAPI_TOKEN}`,
    "Content-Type": "application/json",
  };

  const base = STRAPI_URL.replace(/\/$/, "");
  const pluralApiId =
    API_NAME_TO_PLURAL[apiName] ?? apiName.replace(/-page$/, "-pages");
  const singularApiId = apiName;

  let resolved: {
    getBody: string;
    baseUrl: string;
    localeParam: string;
  } | null = null;

  for (const tryLoc of localesToTry) {
    const param = localeParamFor(tryLoc);
    const tryGet = async (apiId: string) => {
      const url = `${base}/api/${apiId}?${param}`;
      const res = await fetch(url, { method: "GET", headers });
      const body = await res.text();
      return { res, body, url };
    };

    const plural = await tryGet(pluralApiId);
    if (plural.res.ok) {
      resolved = {
        getBody: plural.body,
        baseUrl: `${base}/api/${pluralApiId}`,
        localeParam: param,
      };
      break;
    }
    const singular = await tryGet(singularApiId);
    if (singular.res.ok) {
      resolved = {
        getBody: singular.body,
        baseUrl: `${base}/api/${singularApiId}`,
        localeParam: param,
      };
      break;
    }
    if (tryLoc === localesToTry[localesToTry.length - 1]) {
      const snippet = `HTTP ${singular.res.status} ${singular.body.slice(0, 150)}`;
      console.error(` [DEBUG] GET ${singular.url} → ${snippet}`);
      throw new Error(
        `${apiName} [${locale}] : route API introuvable (404). ` +
          "Vérifiez que le backend déployé contient les 5 single types et que le token a « find » et « update ». " +
          "Créez une entrée par locale (fr, en, es ou fr-FR, es-ES) dans l'admin, enregistrez, puis relancez.",
      );
    }
  }

  const { getBody, baseUrl, localeParam } = resolved!;
  let documentId: string | null = null;
  const json = JSON.parse(getBody) as {
    data?: { documentId?: string } | Array<{ documentId?: string }>;
  };
  const dataResp = json.data;
  if (
    dataResp &&
    typeof dataResp === "object" &&
    "documentId" in dataResp &&
    dataResp.documentId
  )
    documentId = dataResp.documentId;
  else if (Array.isArray(dataResp) && dataResp[0]?.documentId)
    documentId = dataResp[0].documentId;

  if (!documentId) {
    throw new Error(
      `${apiName} [${locale}] : aucun document trouvé. ` +
        "Créez une entrée dans l'admin Strapi pour ce type pour la locale " +
        locale +
        " (fr, en, es), enregistrez (même vide), puis relancez : npm run seed:service-pages",
    );
  }

  const putWithId = `${baseUrl}/${documentId}?${localeParam}`;
  const putWithoutId = `${baseUrl}?${localeParam}`;

  let res = await fetch(putWithId, {
    method: "PUT",
    headers,
    body: JSON.stringify(body),
  });
  if (res.status === 405) {
    res = await fetch(putWithoutId, {
      method: "PUT",
      headers,
      body: JSON.stringify(body),
    });
  }
  if (!res.ok) {
    const text = await res.text();
    const hint =
      res.status === 403 || res.status === 405
        ? " → Token API : cochez « find » et « update » pour ce type dans Settings → API Tokens."
        : "";
    throw new Error(
      `${apiName} [${locale}] PUT ${res.status}: ${text.slice(0, 150)}${hint}`,
    );
  }
  console.log(` ✅ [${locale}] ${apiName}`);
}

async function main() {
  if (!STRAPI_TOKEN) {
    console.error("Missing STRAPI_API_TOKEN. Set it in .env.local or .env");
    process.exit(1);
  }
  console.log(
    "Seeding service single-type pages (FR, EN, ES) to Strapi at",
    STRAPI_URL,
  );
  for (const page of SERVICE_PAGES) {
    console.log("\n" + page.apiName);
    for (const locale of LOCALES) {
      const data = page[LOCALE_MAP[locale]];
      try {
        await upsertServicePage(page.apiName, locale, data);
      } catch (e) {
        console.error(` ❌ [${locale}]:`, e);
      }
    }
  }
  console.log("\nDone.");
}

main();
