export interface NavItem {
  title: string;
  href: string;
  children?: { text: string; href: string }[];
}

export interface BenefitCard {
  image: string;
  title: string;
  description: string;
}

export interface Stat {
  value: string;
  labelBold: string;
  labelRest: string;
}

export interface Feature {
  number: string;
  title: string;
  description: string;
}

export interface BlogCard {
  title: string;
  href: string;
  image: string;
}

export interface FormField {
  name: string;
  type: string;
  placeholder: string;
  required: boolean;
  width: "full" | "half";
}

export interface PageMeta {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
}
