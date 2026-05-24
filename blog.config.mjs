/** @type {import("./src/lib/site").BlogConfig} */
const blogConfig = {
  name: "Astro MIE",
  title: "Astro MIE",
  description: "A configurable Astro theme for expressive long-form blogs.",
  url: "https://example.com/",
  language: "en",
  languageName: "English",

  source: {
    type: "astro-content",
    defaultContentLanguage: "en",
    hasCJKLanguage: false,
    enableRobotsTXT: true,
    summaryLength: 0,
    buildDrafts: false,
    buildFuture: false,
    enableEmoji: true
  },

  branding: {
    logo: "/img/logo.svg",
    secondaryLogo: "/img/logo.svg",
    favicon: "/favicon.svg",
    appleTouchIcon: "/favicon.svg",
    manifest: "/site.webmanifest"
  },

  assets: {
    homeBackground: "/img/background.svg",
    defaultFeatured: "/img/featured.svg",
    defaultBackground: "/img/background.svg",
    defaultThemeColor: "#146b5b",
    backgroundImageWidth: 2560
  },

  theme: {
    colorScheme: "m3_expressive",
    defaultAppearance: "light",
    autoSwitchAppearance: true,
    header: {
      layout: "fixed"
    }
  },

  features: {
    search: true,
    codeCopy: true,
    replyByEmail: false,
    imageZoom: true,
    imageOptimization: true,
    highlightCurrentMenuArea: true,
    smartToc: true,
    smartTocHideUnfocusedChildren: true
  },

  author: {
    name: "template-author",
    displayName: "Template Author",
    email: "hello@example.com",
    headline: "Writing, notes, reviews, and experiments.",
    bio: "A de-identified author profile for the Astro MIE theme template.",
    avatar: "/img/avatar.svg",
    links: [
      { label: "GitHub", href: "https://github.com/example/astro-mie", icon: "github" },
      { label: "Email", href: "mailto:hello@example.com", icon: "email" },
      { label: "RSS", href: "/rss.xml", icon: "rss" }
    ]
  },

  homepage: {
    layout: "hero_fixcolor",
    homepageImage: "/img/background.svg",
    showRecent: true,
    showRecentItems: 6,
    showMoreLink: true,
    showMoreLinkDest: "/posts/",
    cardView: true,
    cardViewScreenWidth: false,
    layoutBackgroundBlur: true,
    eyebrow: "Configurable static blog theme"
  },

  mainSections: ["articles", "notes", "reviews"],
  sections: {
    articles: {
      label: "Articles",
      href: "/sections/articles/",
      icon: "file-text",
      description: "Long-form essays, explainers, and project write-ups."
    },
    notes: {
      label: "Notes",
      href: "/sections/notes/",
      icon: "note",
      description: "Shorter technical notes, references, and work logs."
    },
    "notes/frontend": {
      label: "Frontend",
      href: "/sections/notes/frontend/",
      icon: "wand-sparkles",
      description: "UI implementation notes and interface experiments."
    },
    "notes/backend": {
      label: "Backend",
      href: "/sections/notes/backend/",
      icon: "code",
      description: "Backend, tooling, and automation notes."
    },
    reviews: {
      label: "Reviews",
      href: "/sections/reviews/",
      icon: "star",
      description: "Structured review entries powered by reusable article blocks."
    }
  },

  nav: [
    { label: "Home", href: "/", icon: "home" },
    {
      label: "Writing",
      icon: "file-text",
      children: [
        { label: "Articles", href: "/sections/articles/", icon: "file-text" },
        { label: "Notes", href: "/sections/notes/", icon: "note" },
        { label: "Reviews", href: "/sections/reviews/", icon: "star" }
      ]
    },
    {
      label: "Notes",
      icon: "notebook",
      children: [
        { label: "Frontend", href: "/sections/notes/frontend/", icon: "wand-sparkles" },
        { label: "Backend", href: "/sections/notes/backend/", icon: "code" }
      ]
    },
    {
      label: "Index",
      icon: "list-tree",
      children: [
        { label: "Categories", href: "/categories/", icon: "folder" },
        { label: "Tags", href: "/tags/", icon: "tags" },
        { label: "Series", href: "/series/", icon: "list-tree" },
        { label: "Archive", href: "/archives/", icon: "archive" }
      ]
    },
    { label: "GitHub", href: "https://github.com/example/astro-mie", icon: "github", external: true }
  ],

  footer: {
    showMenu: true,
    showCopyright: true,
    showThemeAttribution: true,
    showAppearanceSwitcher: true,
    showScrollToTop: true,
    links: [
      { label: "Tags", href: "/tags/", icon: "tags" },
      { label: "RSS", href: "/rss.xml", icon: "rss" }
    ]
  },

  article: {
    showDate: true,
    showViews: false,
    showLikes: false,
    showDateOnlyInArticle: true,
    showDateUpdated: true,
    showAuthor: true,
    showHero: true,
    heroStyle: "thumbAndBackground",
    layoutBackgroundBlur: true,
    layoutBackgroundHeaderSpace: true,
    showBreadcrumbs: true,
    showDraftLabel: true,
    showEdit: false,
    seriesOpened: false,
    showHeadingAnchors: true,
    showPagination: true,
    invertPagination: false,
    showReadingTime: true,
    showTableOfContents: true,
    showTaxonomies: false,
    showAuthorsBadges: false,
    showWordCount: true,
    showComments: false,
    sharingLinks: ["github", "twitter", "reddit", "email", "telegram"],
    showZenMode: true
  },

  list: {
    showHero: false,
    layoutBackgroundBlur: true,
    layoutBackgroundHeaderSpace: true,
    showBreadcrumbs: false,
    showSummary: true,
    showViews: false,
    showLikes: false,
    showTableOfContents: false,
    showCards: true,
    orderByWeight: false,
    groupByYear: true,
    cardView: true,
    cardViewScreenWidth: false
  },

  taxonomy: {
    showTermCount: true,
    showHero: false,
    showBreadcrumbs: false,
    showViews: false,
    showLikes: false,
    showTableOfContents: false,
    cardView: false
  },

  term: {
    showHero: false,
    showBreadcrumbs: false,
    showViews: false,
    showLikes: false,
    showTableOfContents: true,
    groupByYear: false,
    cardView: false,
    cardViewScreenWidth: false
  },

  pagination: {
    pagerSize: 100
  },

  taxonomies: {
    tag: "tags",
    category: "categories",
    author: "authors",
    series: "series"
  },

  sitemap: {
    changefreq: "daily",
    filename: "sitemap.xml",
    priority: 0.5,
    excludedKinds: ["taxonomy", "term"]
  },

  related: {
    threshold: 0,
    toLower: false,
    indices: [
      { name: "tags", weight: 100 },
      { name: "categories", weight: 100 },
      { name: "series", weight: 50 },
      { name: "authors", weight: 20 },
      { name: "date", weight: 10 },
      { name: "fragmentrefs", type: "fragments", weight: 10, applyFilter: false }
    ]
  },

  analytics: {
    firebase: {},
    fathom: {},
    umami: {},
    seline: {}
  },

  verification: {
    google: "",
    bing: "",
    pinterest: "",
    yandex: "",
    fediverse: ""
  },

  rssnext: {
    feedId: "",
    userId: ""
  }
};

export default blogConfig;
