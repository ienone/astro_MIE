import rawConfig from "../../blog.config.mjs";

export interface LinkConfig {
  label: string;
  href: string;
  icon?: string;
  external?: boolean;
  rel?: string;
}

export interface HomepageConfig {
  layout?: string;
  homepageImage?: string;
  showRecent?: boolean;
  showRecentItems?: number;
  showMoreLink?: boolean;
  showMoreLinkDest?: string;
  cardView?: boolean;
  cardViewScreenWidth?: boolean;
  layoutBackgroundBlur?: boolean;
  eyebrow?: string;
  [key: string]: unknown;
}

export interface NavItemConfig extends LinkConfig {
  href: string;
  children?: never;
}

export interface NavGroupConfig {
  label: string;
  icon?: string;
  children: LinkConfig[];
  href?: never;
  external?: never;
  rel?: never;
}

export type NavConfig = NavItemConfig | NavGroupConfig;

export interface SectionConfig {
  label: string;
  href?: string;
  icon?: string;
  description?: string;
}

export interface FooterConfig {
  showMenu?: boolean;
  showCopyright?: boolean;
  showThemeAttribution?: boolean;
  showAppearanceSwitcher?: boolean;
  showScrollToTop?: boolean;
  links?: LinkConfig[];
  [key: string]: unknown;
}

export interface BlogConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  language?: string;
  source?: Record<string, unknown>;
  branding: {
    logo: string;
    secondaryLogo?: string;
    favicon: string;
    appleTouchIcon?: string;
    manifest?: string;
  };
  assets: {
    homeBackground: string;
    defaultFeatured: string;
    defaultBackground?: string;
    defaultThemeColor: string;
    backgroundImageWidth?: number;
  };
  theme?: Record<string, unknown>;
  features?: Record<string, unknown>;
  author: {
    name: string;
    displayName?: string;
    email?: string;
    headline?: string;
    bio?: string;
    avatar?: string;
    links: LinkConfig[];
  };
  homepage?: HomepageConfig;
  mainSections: string[];
  sections: Record<string, SectionConfig>;
  nav: NavConfig[];
  footer?: FooterConfig;
  article?: Record<string, unknown>;
  list?: Record<string, unknown>;
  taxonomy?: Record<string, unknown>;
  term?: Record<string, unknown>;
  pagination?: Record<string, unknown>;
  taxonomies?: Record<string, unknown>;
  sitemap?: Record<string, unknown>;
  related?: Record<string, unknown>;
  analytics?: Record<string, unknown>;
  verification?: Record<string, unknown>;
  rssnext?: Record<string, unknown>;
  [key: string]: unknown;
}

export const siteConfig = rawConfig as BlogConfig;

export function getSectionConfig(section: string): SectionConfig {
  return (
    siteConfig.sections[section] ?? {
      label: section,
      href: `/sections/${section}/`,
      icon: "folder",
      description: ""
    }
  );
}

export function isExternalLink(href = "") {
  return /^https?:\/\//.test(href) || href.startsWith("mailto:");
}
