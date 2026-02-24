/**
 * Seed glossary terms in Strapi in FR, EN and ES (50+ terms).
 * Loads STRAPI_* from .env.local / .env. Run: npm run seed:glossary
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

type TermLocale = { title: string; definition: string };

// 54 glossary terms: slug + translations (fr, en, es)
const GLOSSARY_TERMS: Array<{
  slug: string;
  fr: TermLocale;
  en: TermLocale;
  es: TermLocale;
}> = [
  {
    slug: "cash-flow",
    fr: { title: "Flux de trésorerie", definition: "Mouvement des entrées et sorties de trésorerie sur une période. Le cash flow permet de mesurer la capacité de l'entreprise à générer de la liquidité." },
    en: { title: "Cash flow", definition: "Inflows and outflows of cash over a period. Cash flow measures the company's ability to generate liquidity." },
    es: { title: "Flujo de caja", definition: "Entradas y salidas de efectivo en un período. El flujo de caja mide la capacidad de la empresa para generar liquidez." },
  },
  {
    slug: "ebitda",
    fr: { title: "EBITDA", definition: "Bénéfice avant intérêts, impôts, dotations aux amortissements et provisions. Indicateur de performance opérationnelle avant structure financière et fiscalité." },
    en: { title: "EBITDA", definition: "Earnings before interest, taxes, depreciation and amortization. A measure of operating performance before financing and tax structure." },
    es: { title: "EBITDA", definition: "Beneficios antes de intereses, impuestos, depreciaciones y amortizaciones. Indicador de rendimiento operativo antes de estructura financiera y fiscalidad." },
  },
  {
    slug: "working-capital",
    fr: { title: "Fonds de roulement", definition: "Ressources stables au-delà du financement des actifs immobilisés. Il finance une partie du besoin en fonds de roulement (BFR)." },
    en: { title: "Working capital", definition: "Stable resources in excess of fixed asset funding. It finances part of the working capital requirement (WCR)." },
    es: { title: "Capital circulante", definition: "Recursos estables más allá de la financiación del inmovilizado. Financia parte de la necesidad de fondo de maniobra." },
  },
  {
    slug: "balance-sheet",
    fr: { title: "Bilan", definition: "Document comptable qui décrit le patrimoine de l'entreprise à une date donnée : actif (emplois) et passif (ressources)." },
    en: { title: "Balance sheet", definition: "Financial statement showing the company's assets and liabilities at a given date." },
    es: { title: "Balance", definition: "Documento contable que describe el patrimonio de la empresa en una fecha dada: activo (empleos) y pasivo (recursos)." },
  },
  {
    slug: "income-statement",
    fr: { title: "Compte de résultat", definition: "Document qui récapitule les produits et charges sur une période et fait apparaître le résultat net." },
    en: { title: "Income statement", definition: "Statement summarizing revenue and expenses over a period and showing net income." },
    es: { title: "Cuenta de resultados", definition: "Documento que recapitula ingresos y gastos en un período y muestra el resultado neto." },
  },
  {
    slug: "budget",
    fr: { title: "Budget", definition: "Prévision chiffrée des charges et des produits pour une période donnée, servant de cadre au pilotage." },
    en: { title: "Budget", definition: "Quantified forecast of revenue and expenses for a given period, used as a management framework." },
    es: { title: "Presupuesto", definition: "Previsión cifrada de gastos e ingresos para un período dado, que sirve de marco para el pilotaje." },
  },
  {
    slug: "forecast",
    fr: { title: "Prévisionnel", definition: "Projection financière (trésorerie, compte de résultat) mise à jour régulièrement pour anticiper les résultats." },
    en: { title: "Forecast", definition: "Financial projection (cash flow, P&L) updated regularly to anticipate results." },
    es: { title: "Previsión", definition: "Proyección financiera (tesorería, cuenta de resultados) actualizada con regularidad para anticipar resultados." },
  },
  {
    slug: "kpi",
    fr: { title: "KPI", definition: "Indicateur clé de performance. Métrique suivie pour évaluer l'atteinte des objectifs (ventes, marge, délais, etc.)." },
    en: { title: "KPI", definition: "Key performance indicator. A metric used to evaluate progress toward objectives (sales, margin, lead times, etc.)." },
    es: { title: "KPI", definition: "Indicador clave de rendimiento. Métrica seguida para evaluar el cumplimiento de objetivos (ventas, margen, plazos, etc.)." },
  },
  {
    slug: "runway",
    fr: { title: "Piste", definition: "Durée pendant laquelle l'entreprise peut continuer à fonctionner avec sa trésorerie actuelle sans nouveau financement." },
    en: { title: "Runway", definition: "Length of time the company can continue operating with current cash without new funding." },
    es: { title: "Pista", definition: "Tiempo durante el cual la empresa puede seguir funcionando con su tesorería actual sin nuevo financiamiento." },
  },
  {
    slug: "burn-rate",
    fr: { title: "Taux de combustion", definition: "Vitesse à laquelle l'entreprise consomme sa trésorerie (généralement mensuelle). Utilisé pour piloter la runway." },
    en: { title: "Burn rate", definition: "Rate at which the company consumes its cash (usually monthly). Used to manage runway." },
    es: { title: "Tasa de consumo", definition: "Velocidad a la que la empresa consume su tesorería (normalmente mensual). Sirve para pilotar la pista." },
  },
  {
    slug: "revenue",
    fr: { title: "Chiffre d'affaires", definition: "Montant des ventes de biens ou de services sur une période, hors taxes sur le chiffre d'affaires." },
    en: { title: "Revenue", definition: "Amount of sales of goods or services over a period, excluding sales taxes." },
    es: { title: "Ingresos", definition: "Importe de las ventas de bienes o servicios en un período, excluyendo impuestos sobre las ventas." },
  },
  {
    slug: "gross-margin",
    fr: { title: "Marge brute", definition: "Chiffre d'affaires moins coûts directs (coût d'achat ou de production). Exprimée en % du CA." },
    en: { title: "Gross margin", definition: "Revenue minus direct costs (cost of goods sold). Expressed as a percentage of revenue." },
    es: { title: "Margen bruto", definition: "Ingresos menos costes directos (coste de ventas). Expresado en % de los ingresos." },
  },
  {
    slug: "net-income",
    fr: { title: "Résultat net", definition: "Bénéfice ou perte après déduction de toutes les charges, impôts et participation des salariés." },
    en: { title: "Net income", definition: "Profit or loss after deducting all expenses, taxes and employee profit-sharing." },
    es: { title: "Resultado neto", definition: "Beneficio o pérdida tras deducir todos los gastos, impuestos y participación de los empleados." },
  },
  {
    slug: "depreciation",
    fr: { title: "Dotation aux amortissements", definition: "Répartition du coût d'un actif sur sa durée d'utilisation. Réduit le résultat sans sortie de trésorerie." },
    en: { title: "Depreciation", definition: "Allocation of an asset's cost over its useful life. Reduces profit without cash outflow." },
    es: { title: "Depreciación", definition: "Reparto del coste de un activo a lo largo de su vida útil. Reduce el resultado sin salida de tesorería." },
  },
  {
    slug: "accrual-accounting",
    fr: { title: "Comptabilité d'engagement", definition: "Enregistrement des produits et charges lors de leur naissance (et non à la date de paiement). Norme en France." },
    en: { title: "Accrual accounting", definition: "Recording revenue and expenses when they are earned or incurred, not when cash is paid. Standard under GAAP/IFRS." },
    es: { title: "Contabilidad de devengo", definition: "Registro de ingresos y gastos cuando se devengan (y no en la fecha de pago). Norma en muchos países." },
  },
  {
    slug: "consolidation",
    fr: { title: "Consolidation", definition: "Agrégation des comptes de plusieurs sociétés d'un groupe pour produire des états financiers consolidés." },
    en: { title: "Consolidation", definition: "Aggregation of accounts of several entities in a group to produce consolidated financial statements." },
    es: { title: "Consolidación", definition: "Agregación de las cuentas de varias sociedades del grupo para elaborar estados financieros consolidados." },
  },
  {
    slug: "ifrs",
    fr: { title: "Normes IFRS", definition: "Normes internationales d'information financière (IASB). Utilisées pour les comptes consolidés de nombreux groupes." },
    en: { title: "IFRS", definition: "International Financial Reporting Standards (IASB). Used for consolidated accounts of many groups worldwide." },
    es: { title: "NIIF", definition: "Normas Internacionales de Información Financiera (IASB). Utilizadas para cuentas consolidadas de muchos grupos." },
  },
  {
    slug: "gaap",
    fr: { title: "Normes GAAP", definition: "Principes comptables généralement reconnus (ex. US GAAP, PCG en France). Cadre local ou national." },
    en: { title: "GAAP", definition: "Generally accepted accounting principles (e.g. US GAAP). Local or national accounting framework." },
    es: { title: "Normas locales / GAAP", definition: "Principios de contabilidad generalmente aceptados. Marco contable local o nacional." },
  },
  {
    slug: "audit",
    fr: { title: "Audit", definition: "Examen des comptes et des processus par un auditeur indépendant pour donner une opinion sur la régularité et la sincérité." },
    en: { title: "Audit", definition: "Examination of accounts and processes by an independent auditor to express an opinion on fairness and compliance." },
    es: { title: "Auditoría", definition: "Examen de las cuentas y procesos por un auditor independiente para emitir una opinión sobre la regularidad." },
  },
  {
    slug: "internal-control",
    fr: { title: "Contrôle interne", definition: "Ensemble des processus et procédures pour maîtriser les risques (opérationnels, financiers, conformité)." },
    en: { title: "Internal control", definition: "Set of processes and procedures to manage risks (operational, financial, compliance)." },
    es: { title: "Control interno", definition: "Conjunto de procesos y procedimientos para dominar los riesgos (operativos, financieros, cumplimiento)." },
  },
  {
    slug: "treasury",
    fr: { title: "Trésorerie", definition: "Ensemble des disponibilités et des placements à court terme. Gestion des flux et des financements." },
    en: { title: "Treasury", definition: "Cash and short-term investments. Management of cash flows and funding." },
    es: { title: "Tesorería", definition: "Conjunto de disponibilidades e inversiones a corto plazo. Gestión de flujos y financiación." },
  },
  {
    slug: "cash-management",
    fr: { title: "Gestion de trésorerie", definition: "Pilotage des encaissements, décaissements et placements pour optimiser la liquidité et le coût." },
    en: { title: "Cash management", definition: "Managing collections, payments and short-term investments to optimize liquidity and cost." },
    es: { title: "Gestión de tesorería", definition: "Pilotaje de cobros, pagos y colocaciones para optimizar la liquidez y el coste." },
  },
  {
    slug: "credit-line",
    fr: { title: "Ligne de crédit", definition: "Engagement de la banque à prêter jusqu'à un plafond. L'entreprise tire selon ses besoins." },
    en: { title: "Credit line", definition: "Bank commitment to lend up to a limit. The company draws as needed." },
    es: { title: "Línea de crédito", definition: "Compromiso del banco de prestar hasta un límite. La empresa dispone según sus necesidades." },
  },
  {
    slug: "working-capital-requirement",
    fr: { title: "Besoin en fonds de roulement (BFR)", definition: "Financement nécessaire du cycle d'exploitation : stocks + créances clients − dettes fournisseurs." },
    en: { title: "Working capital requirement (WCR)", definition: "Funding needed for the operating cycle: inventory + receivables − payables." },
    es: { title: "Necesidad de fondo de maniobra", definition: "Financiación necesaria del ciclo de explotación: existencias + cuentas a cobrar − cuentas a pagar." },
  },
  {
    slug: "receivables",
    fr: { title: "Créances clients", definition: "Montants dus par les clients pour des ventes déjà livrées ou des services réalisés. Actif circulant." },
    en: { title: "Receivables", definition: "Amounts owed by customers for goods or services already delivered. Current asset." },
    es: { title: "Cuentas a cobrar", definition: "Importes debidos por clientes por ventas ya entregadas o servicios realizados. Activo circulante." },
  },
  {
    slug: "payables",
    fr: { title: "Dettes fournisseurs", definition: "Montants dus aux fournisseurs pour des achats ou services reçus et non encore payés." },
    en: { title: "Payables", definition: "Amounts owed to suppliers for purchases or services received but not yet paid." },
    es: { title: "Cuentas a pagar", definition: "Importes debidos a proveedores por compras o servicios recibidos y aún no pagados." },
  },
  {
    slug: "inventory",
    fr: { title: "Stock", definition: "Ensemble des marchandises, matières et produits (en cours ou finis) détenus par l'entreprise." },
    en: { title: "Inventory", definition: "Goods, raw materials and finished or work-in-progress products held by the company." },
    es: { title: "Inventario", definition: "Conjunto de mercancías, materiales y productos (en curso o terminados) en poder de la empresa." },
  },
  {
    slug: "payroll",
    fr: { title: "Paie", definition: "Calcul et versement des salaires, cotisations et déclarations sociales liées aux rémunérations." },
    en: { title: "Payroll", definition: "Calculation and payment of wages, social contributions and related statutory filings." },
    es: { title: "Nómina", definition: "Cálculo y pago de salarios, cotizaciones y declaraciones sociales ligadas a las remuneraciones." },
  },
  {
    slug: "vat",
    fr: { title: "TVA", definition: "Taxe sur la valeur ajoutée. Impôt indirect supporté in fine par le consommateur, collecté par les entreprises." },
    en: { title: "VAT", definition: "Value added tax. Indirect tax ultimately borne by the consumer, collected by businesses." },
    es: { title: "IVA", definition: "Impuesto sobre el valor añadido. Impuesto indirecto soportado por el consumidor, recaudado por las empresas." },
  },
  {
    slug: "cfo",
    fr: { title: "DAF (Directeur administratif et financier)", definition: "Responsable de la fonction finance : comptabilité, trésorerie, contrôle de gestion, relations bancaires et stratégie financière." },
    en: { title: "CFO (Chief Financial Officer)", definition: "Head of the finance function: accounting, treasury, management control, banking and financial strategy." },
    es: { title: "Director financiero (CFO)", definition: "Responsable de la función financiera: contabilidad, tesorería, control de gestión, relaciones bancarias y estrategia financiera." },
  },
  {
    slug: "controller",
    fr: { title: "Contrôleur de gestion", definition: "Pilote le budget, les prévisionnels et le reporting. Analyse les écarts et anime le pilotage de la performance." },
    en: { title: "Management controller", definition: "Drives budgeting, forecasting and reporting. Analyzes variances and supports performance management." },
    es: { title: "Controller de gestión", definition: "Pilota el presupuesto, las previsiones y el reporting. Analiza desviaciones y anima el pilotaje del rendimiento." },
  },
  {
    slug: "treasurer",
    fr: { title: "Trésorier", definition: "Gère les flux de trésorerie, les financements, les relations bancaires et les risques de taux et de change." },
    en: { title: "Treasurer", definition: "Manages cash flows, funding, banking relationships and interest rate and FX risk." },
    es: { title: "Tesorero", definition: "Gestiona los flujos de tesorería, la financiación, las relaciones bancarias y los riesgos de tipo de cambio e interés." },
  },
  {
    slug: "equity",
    fr: { title: "Capitaux propres", definition: "Ressources stables apportées par les associés ou générées par l'activité (réserves, résultat reporté)." },
    en: { title: "Equity", definition: "Stable resources from shareholders or generated by the business (reserves, retained earnings)." },
    es: { title: "Patrimonio neto", definition: "Recursos estables aportados por los socios o generados por la actividad (reservas, resultado llevado)." },
  },
  {
    slug: "debt",
    fr: { title: "Dette", definition: "Emprunts et dettes financières (banques, obligataires) à rembourser selon un échéancier." },
    en: { title: "Debt", definition: "Borrowings and financial debt (banks, bondholders) to be repaid according to a schedule." },
    es: { title: "Deuda", definition: "Préstamos y deudas financieras (bancos, obligacionistas) a reembolsar según un calendario." },
  },
  {
    slug: "liquidity",
    fr: { title: "Liquidité", definition: "Capacité à faire face aux échéances de paiement avec les disponibilités et actifs rapidement réalisables." },
    en: { title: "Liquidity", definition: "Ability to meet payment obligations with cash and readily realizable assets." },
    es: { title: "Liquidez", definition: "Capacidad de hacer frente a los vencimientos con disponibilidades y activos realizables rápidamente." },
  },
  {
    slug: "solvency",
    fr: { title: "Solvabilité", definition: "Capacité à honorer les dettes à long terme. Mesurée par le ratio capitaux propres / total bilan notamment." },
    en: { title: "Solvency", definition: "Ability to meet long-term debt obligations. Often measured by equity-to-total-assets ratio." },
    es: { title: "Solvencia", definition: "Capacidad de atender las deudas a largo plazo. Medida por el ratio patrimonio / total balance." },
  },
  {
    slug: "valuation",
    fr: { title: "Valorisation", definition: "Estimation de la valeur d'une entreprise ou d'un actif (DCF, comparables, net asset value, etc.)." },
    en: { title: "Valuation", definition: "Estimate of the value of a company or asset (DCF, comparables, net asset value, etc.)." },
    es: { title: "Valoración", definition: "Estimación del valor de una empresa o activo (DCF, comparables, valor neto de activos, etc.)." },
  },
  {
    slug: "due-diligence",
    fr: { title: "Due diligence", definition: "Examen approfondi (juridique, financier, fiscal) d'une cible avant une acquisition ou un investissement." },
    en: { title: "Due diligence", definition: "Thorough review (legal, financial, tax) of a target before an acquisition or investment." },
    es: { title: "Due diligence", definition: "Examen en profundidad (jurídico, financiero, fiscal) de un objetivo antes de una adquisición o inversión." },
  },
  {
    slug: "mergers-acquisitions",
    fr: { title: "Fusions et acquisitions (M&A)", definition: "Opérations de rapprochement, rachat ou cession d'entreprises. Pilier de la stratégie de croissance externe." },
    en: { title: "Mergers and acquisitions (M&A)", definition: "Deals involving merger, acquisition or divestiture. Core to external growth strategy." },
    es: { title: "Fusiones y adquisiciones (M&A)", definition: "Operaciones de acercamiento, compra o venta de empresas. Pilar de la estrategia de crecimiento externo." },
  },
  {
    slug: "ipo",
    fr: { title: "Introduction en Bourse", definition: "Première cotation des titres d'une société sur un marché réglementé. Permet de lever des fonds et d'ouvrir le capital." },
    en: { title: "IPO (Initial Public Offering)", definition: "First listing of a company's shares on a regulated market. Enables fundraising and opening the capital." },
    es: { title: "OPV (Oferta Pública de Venta)", definition: "Primera cotización de los títulos de una sociedad en un mercado regulado. Permite captar fondos y abrir el capital." },
  },
  {
    slug: "capex",
    fr: { title: "CapEx (Dépenses d'investissement)", definition: "Dépenses d'acquisition ou de création d'actifs durables (équipements, logiciels, bâtiments)." },
    en: { title: "CapEx (Capital expenditure)", definition: "Spending on acquiring or creating long-lived assets (equipment, software, buildings)." },
    es: { title: "CapEx (Inversión)", definition: "Gastos de adquisición o creación de activos duraderos (equipos, software, edificios)." },
  },
  {
    slug: "opex",
    fr: { title: "OpEx (Dépenses d'exploitation)", definition: "Charges courantes liées à l'activité : salaires, loyers, fournitures, sous-traitance, etc." },
    en: { title: "OpEx (Operating expenses)", definition: "Day-to-day costs of running the business: wages, rent, supplies, outsourcing, etc." },
    es: { title: "OpEx (Gastos operativos)", definition: "Gastos corrientes ligados a la actividad: salarios, alquileres, suministros, subcontratación, etc." },
  },
  {
    slug: "break-even",
    fr: { title: "Seuil de rentabilité", definition: "Niveau d'activité (CA ou quantité) à partir duquel le résultat est nul. Au-delà, l'entreprise dégage un bénéfice." },
    en: { title: "Break-even", definition: "Level of activity (revenue or volume) at which profit is zero. Above it, the company is profitable." },
    es: { title: "Umbral de rentabilidad", definition: "Nivel de actividad (ingresos o cantidad) a partir del cual el resultado es nulo. Por encima, la empresa genera beneficio." },
  },
  {
    slug: "gross-profit",
    fr: { title: "Résultat brut / Bénéfice brut", definition: "Chiffre d'affaires moins coût des ventes. Première marge avant charges opérationnelles." },
    en: { title: "Gross profit", definition: "Revenue minus cost of goods sold. First margin before operating expenses." },
    es: { title: "Beneficio bruto", definition: "Ingresos menos coste de ventas. Primer margen antes de gastos operativos." },
  },
  {
    slug: "operating-margin",
    fr: { title: "Marge opérationnelle", definition: "Résultat d'exploitation (EBIT) rapporté au chiffre d'affaires. Mesure la rentabilité de l'activité." },
    en: { title: "Operating margin", definition: "Operating profit (EBIT) as a percentage of revenue. Measures profitability of operations." },
    es: { title: "Margen operativo", definition: "Resultado de explotación (EBIT) sobre ingresos. Mide la rentabilidad de la actividad." },
  },
  {
    slug: "net-margin",
    fr: { title: "Marge nette", definition: "Résultat net rapporté au chiffre d'affaires. Reflète la rentabilité après tous les coûts et impôts." },
    en: { title: "Net margin", definition: "Net income as a percentage of revenue. Reflects profitability after all costs and taxes." },
    es: { title: "Margen neto", definition: "Resultado neto sobre ingresos. Refleja la rentabilidad tras todos los costes e impuestos." },
  },
  {
    slug: "cash-conversion",
    fr: { title: "Conversion de trésorerie", definition: "Capacité à transformer le résultat comptable en flux de trésorerie (impact du BFR, des amortissements, etc.)." },
    en: { title: "Cash conversion", definition: "Ability to turn accounting profit into cash flow (impact of working capital, depreciation, etc.)." },
    es: { title: "Conversión de caja", definition: "Capacidad de transformar el resultado contable en flujo de caja (impacto del fondo de maniobra, amortizaciones, etc.)." },
  },
  {
    slug: "dso",
    fr: { title: "DSO (Délai moyen de paiement clients)", definition: "Nombre de jours de CA moyen restant à encaisser. Indicateur de qualité du recouvrement." },
    en: { title: "DSO (Days sales outstanding)", definition: "Average number of days revenue remains uncollected. Indicator of collection performance." },
    es: { title: "Días de venta pendientes de cobro", definition: "Número de días de ingresos medios por cobrar. Indicador de la calidad del cobro." },
  },
  {
    slug: "dpo",
    fr: { title: "DPO (Délai moyen de paiement fournisseurs)", definition: "Nombre de jours moyen pour régler les fournisseurs. Partie « dettes » du BFR." },
    en: { title: "DPO (Days payable outstanding)", definition: "Average number of days to pay suppliers. The payables component of working capital." },
    es: { title: "Días de pago a proveedores", definition: "Número medio de días para pagar a proveedores. Parte « deudas » del fondo de maniobra." },
  },
  {
    slug: "roi",
    fr: { title: "ROI (Retour sur investissement)", definition: "Rentabilité d'un investissement : gain (ou économie) généré rapporté au montant investi, souvent en %." },
    en: { title: "ROI (Return on investment)", definition: "Profitability of an investment: gain or savings generated relative to amount invested, often expressed as %." },
    es: { title: "ROI (Retorno sobre la inversión)", definition: "Rentabilidad de una inversión: ganancia o ahorro generado respecto al importe invertido, a menudo en %." },
  },
  {
    slug: "roce",
    fr: { title: "ROCE (Rentabilité des capitaux employés)", definition: "Résultat d'exploitation après impôts / capitaux investis. Mesure l'efficacité d'utilisation du capital." },
    en: { title: "ROCE (Return on capital employed)", definition: "Operating profit after tax / capital employed. Measures how efficiently capital is used." },
    es: { title: "Rentabilidad del capital empleado", definition: "Resultado de explotación después de impuestos / capital empleado. Mide la eficiencia del uso del capital." },
  },
  {
    slug: "tax",
    fr: { title: "Impôt sur les sociétés", definition: "Impôt direct sur le bénéfice des sociétés. Taux et règles varient selon les pays et régimes." },
    en: { title: "Corporate tax", definition: "Direct tax on company profit. Rates and rules vary by country and regime." },
    es: { title: "Impuesto sobre sociedades", definition: "Impuesto directo sobre el beneficio de las sociedades. Tipos y reglas varían según países y regímenes." },
  },
  {
    slug: "amortization",
    fr: { title: "Amortissement (actifs immatériels)", definition: "Répartition du coût d'un actif immatériel (brevet, fonds commercial) sur sa durée d'utilité." },
    en: { title: "Amortization", definition: "Allocation of the cost of an intangible asset (patent, goodwill) over its useful life." },
    es: { title: "Amortización (activos intangibles)", definition: "Reparto del coste de un activo intangible (patente, fondo de comercio) sobre su vida útil." },
  },
  {
    slug: "cash-basis",
    fr: { title: "Comptabilité de trésorerie", definition: "Enregistrement des produits et charges à la date d'encaissement ou de décaissement. Utilisée en micro-entreprises notamment." },
    en: { title: "Cash basis accounting", definition: "Recording revenue and expenses when cash is received or paid. Used e.g. by some small businesses." },
    es: { title: "Contabilidad de caja", definition: "Registro de ingresos y gastos en la fecha de cobro o pago. Utilizada en microempresas, entre otras." },
  },
];

async function createTermLocale(
  slug: string,
  locale: string,
  data: TermLocale,
  method: "POST" | "PUT",
  documentId?: string
): Promise<string | null> {
  const body = {
    data: {
      title: data.title,
      definition: data.definition,
      ...(method === "POST" ? { slug } : {}),
      publishedAt: new Date().toISOString(),
    },
  };

  const path =
    method === "POST"
      ? `api/glossary-terms?locale=${encodeURIComponent(locale)}`
      : `api/glossary-terms/${documentId}?locale=${encodeURIComponent(locale)}`;
  const url = `${STRAPI_URL.replace(/\/$/, "")}/${path}`;
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    const hint =
      res.status === 405
        ? " → Vérifiez dans Strapi : Settings → API Tokens → Glossary Term → create (et createLocalization pour EN/ES)."
        : "";
    throw new Error(`Strapi ${method} failed ${res.status}: ${text.slice(0, 200)}${hint}`);
  }

  const json = await res.json();
  return json.data?.documentId ?? json.data?.id ?? null;
}

async function main() {
  if (!STRAPI_TOKEN) {
    console.error("Missing STRAPI_API_TOKEN. Set it in .env.local or .env");
    process.exit(1);
  }
  console.log("Seeding", GLOSSARY_TERMS.length, "glossary terms (FR + EN + ES) to Strapi at", STRAPI_URL);

  for (const term of GLOSSARY_TERMS) {
    try {
      const docId = await createTermLocale(term.slug, "fr-FR", term.fr, "POST");
      if (docId) {
        console.log(`  ✅ [fr-FR] ${term.slug} → ${docId}`);
        try {
          await createTermLocale(term.slug, "en", term.en, "PUT", docId);
          console.log(`  ✅ [en]    ${term.slug}`);
        } catch (e) {
          console.error(`  ❌ [en]    ${term.slug}:`, e);
        }
        try {
          await createTermLocale(term.slug, "es-ES", term.es, "PUT", docId);
          console.log(`  ✅ [es-ES] ${term.slug}`);
        } catch (e) {
          console.error(`  ❌ [es-ES] ${term.slug}:`, e);
        }
      }
    } catch (e) {
      console.error(`  ❌ ${term.slug}:`, e);
    }
  }
  console.log("\nDone. Total terms:", GLOSSARY_TERMS.length);
}

main();
