# Plan d’intégration : DRH Externalisé

Objectif : ajouter une section **DRH Externalisé** dans le header et le site, sur la même base que **DAF Externalisé** (hub + sous-pages type « temps partagé »), avec la grille des 45 services RH, en s’appuyant sur Strapi et le multi-langues (FR, EN, ES).

---

## 1. Référence actuelle : DAF Externalisé

- **Header** : entrée « DAF Externalisé » avec enfants (DAF à Temps Partagé, DAF de Transition, DAF : Métier).
- **Routes** :
  - FR : `/daf-externalise`, `/daf-externalise/temps-partage`, `/daf-externalise/transition`, `/daf-externalise/metier`
  - EN : `/en/daf-outsourcing`, `/en/daf-outsourcing/shared-time`, etc.
  - ES : `/es/externalizacion-daf`, etc.
- **Strapi** : single types `daf-externalise-page`, `daf-metier-page`, `daf-temps-partage-page`, `daf-transition-page` (i18n).
- **Fallback** : `lib/content/daf.ts`, `lib/content/daf-sub.ts` avec `getDafContent(locale)`, `getDafSubContent(locale, urlSlug)`.
- **Composants** : `DafPage`, `DafSubPage` (hero, sections, FAQ, témoignages, CTA).
- **Path localization** : `lib/path-localization.ts` avec `DAF_BASE`, `DAF_SUB_PATHS` pour le switcher de langue.

---

## 2. Structure proposée pour DRH Externalisé

### 2.1 Navigation (header)

- Nouvelle entrée **DRH Externalisé** (FR) / **HR Outsourced** (EN) / **RRHH externalizado** (ES).
- Enfants (au moins au début, calqués sur le modèle DAF) :
  - **DRH à Temps Partagé** → `/drh-externalise/temps-partage` (FR)
  - Équivalents EN/ES à définir (ex. shared-time, multipropiedad comme pour le DAF).

On pourra ajouter plus tard d’autres sous-pages (ex. « Métier DRH », « Transition ») si besoin.

### 2.2 Routes

- **FR** (locale par défaut) :
  - `/drh-externalise` → page hub DRH (présentation + grille des 45 services).
  - `/drh-externalise/temps-partage` → sous-page « DRH à temps partagé ».
- **EN** : `/en/hr-outsourcing`, `/en/hr-outsourcing/shared-time`.
- **ES** : `/es/externalizacion-rrhh`, `/es/externalizacion-rrhh/...` (slug à valider).

Fichiers à créer (sur le modèle de `app/daf-externalise/` et `app/en/daf-outsourcing/`) :

- `app/drh-externalise/page.tsx`
- `app/drh-externalise/temps-partage/page.tsx`
- `app/en/hr-outsourcing/page.tsx`
- `app/en/hr-outsourcing/shared-time/page.tsx`
- `app/es/externalizacion-rrhh/page.tsx`
- `app/es/externalizacion-rrhh/<slug>/page.tsx`

### 2.3 Path localization (switcher de langue)

- **Fichier** : `lib/path-localization.ts`.
- Ajouter :
  - `DRH_BASE` : `{ fr: "drh-externalise", en: "hr-outsourcing", es: "externalizacion-rrhh" }`.
  - `DRH_SUB_PATHS` : même logique que `DAF_SUB_PATHS` (ex. `temps-partage` ↔ `shared-time` ↔ `multipropiedad`).
- Dans `getLocalizedPath`, traiter les segments qui commencent par `drh-externalise` / `hr-outsourcing` / `externalizacion-rrhh` comme pour DAF.

---

## 3. Contenu : grille des 45 services RH

La grille fournie contient :

- **9 blocs** (Audit RH, Recrutement, Onboarding/Offboarding, Rémunération, Développement RH, Organisation & culture, Relations sociales, SIRH, Add-ons).
- **45 lignes** avec : numéro, intitulé, description, puis **4 colonnes** (offres / tiers) + **Add-on** pour les missions ponctuelles (41–45).

Choix de modélisation recommandé pour Strapi :

- **Sur la single type `drh-externalise-page`** (ou sur une page dédiée « offres » si vous préférez séparer) :
  - Un **repeatable component** « Catégorie de services RH » avec :
    - `categoryName` (texte, i18n via la locale du single type).
    - `services` : **repeatable** avec :
      - `title` (texte)
      - `description` (texte long)
      - `tier1`, `tier2`, `tier3`, `tier4` (booléens)
      - `isAddOn` (booléen)
  - Ordre fixé par l’ordre des composants dans Strapi (ou champ `order` si besoin).

Alternative : **collection type** `drh-service` (id, category, order, title, description, tier1–4, isAddOn) + relation depuis la page. Plus flexible pour réutiliser les services ailleurs, mais plus de setup.

Recommandation : **component repeatable sur la single type** pour garder la même philosophie que les sous-pages DAF (tout éditable depuis la page) et éviter une collection dédiée au début.

---

## 4. Strapi : single types et i18n

### 4.1 Single types à créer

- **drh-externalise-page**
  - Champs : `heroTitle`, `heroSubtitle`, `content` (blocks), `subPages` (repeatable : title, description, icon, link), `serviceCategories` (repeatable ci-dessus), `faq`, `seo`.
  - **i18n** : activé (fr, en, es) comme pour `daf-externalise-page`.

- **drh-temps-partage-page**
  - Champs : `heroTitle`, `content` (blocks), `faq`, `seo`.
  - **i18n** : activé.

### 4.2 API et fetch (front)

- **Fichier** : `lib/strapi.ts`.
  - Interfaces : `StrapiDrhPage`, `StrapiDrhSubPage` (sur le modèle de `StrapiDafPage`, `StrapiDafSubPage`).
  - `getDrhExternalisePage(locale)`, `getDrhSubPage(type, locale)` avec `type` = `"drh-temps-partage-page"` (et d’autres si sous-pages ajoutées).
  - Utiliser `strapiFetch` avec le même `locale` et les populates nécessaires (`serviceCategories`, `faq`, `seo`, etc.).

### 4.3 Migrations / seed

- **Scripts existants** : `scripts/migrate-to-cloud.py`, `scripts/migrate-v2.py` référencent les single types DAF. À dupliquer pour DRH :
  - Ajouter `drh-externalise-page`, `drh-temps-partage-page` dans le schéma / la liste des single types.
  - Prévoir une migration ou un seed qui crée les entrées initiales (au moins FR) pour ne pas avoir de page vide.
- **Seed des 45 services** : script (Node ou Python) qui remplit `serviceCategories` + `services` pour la locale `fr` (titres et descriptions issus du document fourni). EN/ES peuvent être traduits ensuite dans l’admin Strapi ou via un export/import.

---

## 5. Contenu statique de fallback (multi-langues)

- **Fichier** : `lib/content/drh.ts` (équivalent de `daf.ts`).
  - Contenu pour la page hub : `meta`, `hero`, sections texte, labels pour la grille, FAQ, etc.
  - `getDrhContent(locale)` retournant un objet typé pour la page hub.

- **Fichier** : `lib/content/drh-sub.ts` (équivalent de `daf-sub.ts`).
  - Contenu pour chaque sous-page (ex. `temps-partage`) par locale.
  - Type : `DrhSubPageSlug` = `"temps-partage"` (puis autres si besoin).
  - `getDrhSubContent(locale, urlSlug)` avec un `slugMapping` par locale (comme pour DAF).

Les composants liront d’abord Strapi ; si `getDrhExternalisePage(locale)` ou `getDrhSubPage(...)` retourne `null`, utiliser le contenu de `drh.ts` / `drh-sub.ts`.

---

## 6. Composants React

### 6.1 Page hub DRH

- **Composant** : `components/pages/DrhPage.tsx` (sur le modèle de `DafPage.tsx`).
  - Hero (titre, sous-titre, CTA).
  - Bloc « Votre partenaire » (texte).
  - Bloc « Qu’est-ce qu’un DRH externalisé ? » (ou équivalent).
  - **Grille des services** : nouveau composant `DrhServicesGrid` (voir ci-dessous).
  - Cartes sous-pages (liens vers DRH à temps partagé, etc.) si `subPages` est utilisé comme pour le DAF.
  - FAQ (accordéon).
  - `TestimonialsSection` + `CTASection`.

Props : `locale` ; données : soit venant de Strapi (page layout qui fetch et passe les données), soit de `getDrhContent(locale)` en fallback.

### 6.2 Grille des 45 services

- **Composant** : `components/DrhServicesGrid.tsx` (ou dans `components/pages/` si vous préférez).
  - Props : `categories: { categoryName: string; services: { title: string; description: string; tier1–4: boolean; isAddOn: boolean }[] }[]`, et optionnellement `locale` pour les libellés des colonnes.
  - Rendu : par catégorie, un tableau (ou cartes) avec colonnes « Service », « Description », puis 4 colonnes (ex. Bronze / Silver / Gold / Platinum ou noms à définir) avec checkmarks, puis « Add-on ».
  - Accessibilité : table sémantique ou listes avec aria.

Les libellés des 4 offres (et « Add-on ») peuvent venir de la page Strapi ou de `drh.ts` par locale.

### 6.3 Sous-page « DRH à temps partagé »

- **Composant** : `components/pages/DrhSubPage.tsx` (calqué sur `DafSubPage.tsx`).
  - Props : `locale`, `content` (type `DrhSubContent` de `drh-sub.ts` ou équivalent Strapi).
  - Hero, breadcrumb, sections de texte, CTA, `TestimonialsSection`, `CTASection`.

Les pages Next (`app/drh-externalise/temps-partage/page.tsx`, etc.) appellent `getDrhSubContent(locale, urlSlug)` pour le fallback, ou récupèrent les données Strapi et les mappent vers le même format.

---

## 7. Métadonnées et SEO

- Chaque route DRH aura son `generateMetadata` (comme pour DAF) en appelant `buildStrapiMetadata` avec :
  - `endpoint` : `"drh-externalise-page"` ou `"drh-temps-partage-page"`,
  - `locale`, `path`, `fallbackTitle`, `fallbackDescription`.
- Les single types Strapi ont déjà un champ `seo` (meta title, description, ogImage) ; les fallbacks seront dans `drh.ts` / `drh-sub.ts` (meta title/description par page et par locale).

---

## 8. Ordre de mise en œuvre suggéré

1. **Navigation et routes**
   - Ajouter l’entrée DRH dans `lib/navigation.ts` (FR, EN, ES).
   - Créer les routes `app/drh-externalise/...` et `app/en/...`, `app/es/...`.
   - Étendre `lib/path-localization.ts` (DRH_BASE, DRH_SUB_PATHS + branche dans `getLocalizedPath`).

2. **Strapi**
   - Créer les single types `drh-externalise-page` et `drh-temps-partage-page` avec i18n.
   - Définir le component repeatable pour la grille (catégories + services).
   - Ajouter les types et les fetch dans `lib/strapi.ts`.

3. **Contenu de fallback**
   - Rédiger `lib/content/drh.ts` et `lib/content/drh-sub.ts` (FR, EN, ES) pour la page hub et la sous-page « temps partagé ».

4. **Composants**
   - `DrhServicesGrid` avec les 45 lignes en dur ou via props (depuis Strapi ou depuis `drh.ts`).
   - `DrhPage` et `DrhSubPage` qui consomment Strapi ou le fallback.

5. **Pages Next**
   - Brancher les pages sur `getDrhExternalisePage` / `getDrhSubPage` et passer les données aux composants ; utiliser `getDrhContent` / `getDrhSubContent` si Strapi renvoie null.

6. **Seed**
   - Script de seed pour remplir la grille des 45 services (FR) dans Strapi ; traductions EN/ES ensuite en admin ou par script.

7. **Migrations**
   - Mettre à jour `migrate-to-cloud.py` / `migrate-v2.py` pour inclure les single types DRH si vous utilisez ces scripts.

---

## 9. Résumé des fichiers à créer ou modifier

| Fichier | Action |
|--------|--------|
| `lib/navigation.ts` | Ajouter entrée DRH + children (FR, EN, ES). |
| `lib/path-localization.ts` | DRH_BASE, DRH_SUB_PATHS, branche DRH dans getLocalizedPath. |
| `lib/strapi.ts` | StrapiDrhPage, StrapiDrhSubPage, getDrhExternalisePage, getDrhSubPage. |
| `lib/content/drh.ts` | Nouveau : getDrhContent(locale). |
| `lib/content/drh-sub.ts` | Nouveau : getDrhSubContent(locale, urlSlug), slugMapping. |
| `components/pages/DrhPage.tsx` | Nouveau : page hub (hero, grille, FAQ, CTA). |
| `components/pages/DrhSubPage.tsx` | Nouveau : sous-page type temps partagé. |
| `components/DrhServicesGrid.tsx` | Nouveau : grille catégories + 45 services. |
| `app/drh-externalise/page.tsx` | Nouveau. |
| `app/drh-externalise/temps-partage/page.tsx` | Nouveau. |
| `app/en/hr-outsourcing/page.tsx` | Nouveau. |
| `app/en/hr-outsourcing/shared-time/page.tsx` | Nouveau. |
| `app/es/externalizacion-rrhh/page.tsx` | Nouveau. |
| `app/es/externalizacion-rrhh/<slug>/page.tsx` | Nouveau (slug selon convention ES). |
| Strapi admin | Single types drh-externalise-page, drh-temps-partage-page + i18n. |
| `scripts/migrate-to-cloud.py` (ou équivalent) | Ajouter single types DRH. |
| Script seed | Optionnel : seed des 45 services (FR). |

---

## 10. Grille des 45 services (rappel)

Les 9 catégories et le fait que les 5 derniers (41–45) sont en « Add-on » sont déjà décrits dans le document fourni. Pour le seed ou le contenu initial, il suffit de reprendre la liste (titres + descriptions) et de renseigner pour chaque ligne les 4 booléens (inclus dans quelle offre) et `isAddOn` pour 41–45.

Ce plan permet d’intégrer le DRH Externalisé comme un bloc cohérent avec le reste du site (Strapi, i18n, même pattern que le DAF) et d’ajuster ensuite les libellés d’offres (Bronze/Silver/Gold/Platinum) ou les sous-pages sans refonte.
