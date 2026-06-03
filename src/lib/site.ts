import rawConfig from "../../blog.config.mjs";

export interface LinkConfig {
  label: string;
  href: string;
  icon?: string;
  displayLabel?: string;
  external?: boolean;
  rel?: string;
}

export interface HomepageConfig {
  layout?: string;
  homepageImage?: string;
  contentFlow?: {
    mode?: "latest" | "tag";
    tag?: string;
    limit?: number;
    moreLink?: string;
    title?: string;
    eyebrow?: string;
  };
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

export interface ThemeConfig {
  colorScheme?: string;
  defaultAppearance?: "light" | "dark" | "system" | "auto";
  autoSwitchAppearance?: boolean;
  header?: {
    layout?: "fixed" | "sticky" | "static";
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

export interface FeatureConfig {
  search?: boolean;
  codeCopy?: boolean;
  replyByEmail?: boolean;
  imageZoom?: boolean;
  imageOptimization?: boolean;
  highlightCurrentMenuArea?: boolean;
  smartToc?: boolean;
  smartTocHideUnfocusedChildren?: boolean;
  [key: string]: unknown;
}

export interface SourceConfig {
  type?: string;
  defaultContentLanguage?: string;
  hasCJKLanguage?: boolean;
  enableRobotsTXT?: boolean;
  summaryLength?: number;
  buildDrafts?: boolean;
  buildFuture?: boolean;
  enableEmoji?: boolean;
  [key: string]: unknown;
}

export interface ArticleConfig {
  showDate?: boolean;
  showViews?: boolean;
  showLikes?: boolean;
  showDateOnlyInArticle?: boolean;
  showDateUpdated?: boolean;
  showAuthor?: boolean;
  showHero?: boolean;
  heroStyle?: string;
  layoutBackgroundBlur?: boolean;
  layoutBackgroundHeaderSpace?: boolean;
  showBreadcrumbs?: boolean;
  showDraftLabel?: boolean;
  showEdit?: boolean;
  seriesOpened?: boolean;
  showHeadingAnchors?: boolean;
  showPagination?: boolean;
  invertPagination?: boolean;
  showReadingTime?: boolean;
  showTableOfContents?: boolean;
  showTaxonomies?: boolean;
  showAuthorsBadges?: boolean;
  showWordCount?: boolean;
  showComments?: boolean;
  sharingLinks?: string[];
  showZenMode?: boolean;
  [key: string]: unknown;
}

export interface ListConfig {
  showHero?: boolean;
  layoutBackgroundBlur?: boolean;
  layoutBackgroundHeaderSpace?: boolean;
  showBreadcrumbs?: boolean;
  showSummary?: boolean;
  showViews?: boolean;
  showLikes?: boolean;
  showTableOfContents?: boolean;
  showCards?: boolean;
  orderByWeight?: boolean;
  groupByYear?: boolean;
  cardView?: boolean;
  cardViewScreenWidth?: boolean;
  [key: string]: unknown;
}

export interface TaxonomyConfig {
  showTermCount?: boolean;
  showHero?: boolean;
  showBreadcrumbs?: boolean;
  showViews?: boolean;
  showLikes?: boolean;
  showTableOfContents?: boolean;
  cardView?: boolean;
  [key: string]: unknown;
}

export interface TermConfig {
  showHero?: boolean;
  showBreadcrumbs?: boolean;
  showViews?: boolean;
  showLikes?: boolean;
  showTableOfContents?: boolean;
  groupByYear?: boolean;
  cardView?: boolean;
  cardViewScreenWidth?: boolean;
  [key: string]: unknown;
}

export interface PaginationConfig {
  pagerSize?: number;
  [key: string]: unknown;
}

export interface SitemapConfig {
  changefreq?: string;
  filename?: string;
  priority?: number;
  excludedKinds?: string[];
  [key: string]: unknown;
}

export interface RelatedIndexConfig {
  name: string;
  type?: string;
  weight?: number;
  applyFilter?: boolean;
  [key: string]: unknown;
}

export interface RelatedConfig {
  threshold?: number;
  toLower?: boolean;
  indices?: RelatedIndexConfig[];
  [key: string]: unknown;
}

export interface VerificationConfig {
  google?: string;
  bing?: string;
  pinterest?: string;
  yandex?: string;
  fediverse?: string;
  [key: string]: unknown;
}

export interface AnalyticsConfig {
  umami?: {
    src?: string;
    websiteId?: string;
    hostUrl?: string;
    domains?: string;
    autoTrack?: boolean;
    doNotTrack?: boolean;
    [key: string]: unknown;
  };
  plausible?: {
    domain?: string;
    src?: string;
    outboundLinks?: boolean;
    fileDownloads?: boolean;
    taggedEvents?: boolean;
    [key: string]: unknown;
  };
  fathom?: {
    siteId?: string;
    src?: string;
    [key: string]: unknown;
  };
  firebase?: Record<string, unknown>;
  seline?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface RepositoryConfig {
  url?: string;
  branch?: string;
  contentEditUrl?: string;
  [key: string]: unknown;
}

export interface BlogConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  language?: string;
  source?: SourceConfig;
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
  theme?: ThemeConfig;
  features?: FeatureConfig;
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
  article?: ArticleConfig;
  list?: ListConfig;
  taxonomy?: TaxonomyConfig;
  term?: TermConfig;
  pagination?: PaginationConfig;
  taxonomies?: Record<string, unknown>;
  sitemap?: SitemapConfig;
  related?: RelatedConfig;
  analytics?: AnalyticsConfig;
  verification?: VerificationConfig;
  repository?: RepositoryConfig;
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

export function isFeatureEnabled(name: keyof FeatureConfig, defaultValue = true) {
  return siteConfig.features?.[name] ?? defaultValue;
}

export function getPagerSize(defaultValue = 12) {
  const configuredSize = siteConfig.pagination?.pagerSize;

  return typeof configuredSize === "number" && Number.isFinite(configuredSize) && configuredSize > 0
    ? Math.floor(configuredSize)
    : defaultValue;
}
