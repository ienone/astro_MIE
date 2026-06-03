/** @type {import("./src/lib/site").BlogConfig} */
const blogConfig = {
  name: "ienoneの站",
  title: "ienoneの站",
  description: "记录一下蒟蒻的成长",
  url: "https://ienone.github.io/",
  language: "zh-CN",
  languageName: "简体中文",

  source: {
    type: "astro-content",
    defaultContentLanguage: "zh-cn",
    hasCJKLanguage: true,
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
    name: "ienone",
    displayName: "ienone",
    email: "dsxhx1013@gmail.com",
    headline: "ai|臭看番的|篮球|MESSI|科幻",
    bio: "ai、臭看番的、篮球、MESSI、科幻",
    avatar: "/img/avatar.svg",
    links: [
      { label: "GitHub", href: "https://github.com/ienone", icon: "github" },
      { label: "Email", href: "mailto:dsxhx1013@gmail.com", icon: "email" },
      { label: "Telegram", href: "https://t.me/ie9ei10", icon: "telegram" },
      { label: "知乎", href: "https://www.zhihu.com/people/ie9-53", icon: "zhihu" },
      { label: "RSS", href: "/rss.xml", icon: "rss" }
    ]
  },

  homepage: {
    contentFlow: {
      mode: "latest",
      limit: 6,
      moreLink: "/posts/",
      title: "Latest posts",
      eyebrow: "Latest"
    },
    cardView: true,
    cardViewScreenWidth: false,
    layoutBackgroundBlur: true,
    eyebrow: "TO BE CONTINUED……"
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
        { label: "Posts", href: "/posts/", icon: "file-text" },
        { label: "Categories", href: "/categories/", icon: "folder" },
        { label: "Tags", href: "/tags/", icon: "tags" },
        { label: "Series", href: "/series/", icon: "list-tree" },
        { label: "Archive", href: "/archives/", icon: "archive" }
      ]
    }
  ],

  footer: {
    showMenu: true,
    showCopyright: true,
    showThemeAttribution: true,
    showAppearanceSwitcher: true,
    showScrollToTop: true,
    links: []
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
