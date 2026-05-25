# blog.config.mjs 实现审计

本文档记录 `blog.config.mjs` 中哪些字段已经接入当前 Astro 主题，哪些字段仍是兼容占位或后续路线图。

## 已实际实现

- `name`、`title`、`description`、`url`、`language`：页面元信息、canonical URL、RSS/site 默认值。
- `branding.logo`、`branding.favicon`：页头 logo 与 favicon。
- `assets.homeBackground`、`assets.defaultFeatured`：首页背景、文章媒体兜底图。
- `author.avatar`、`author.headline`、`author.links`：首页作者信息、社交链接与页脚社交链接。
- `homepage.showRecent`、`homepage.showRecentItems`、`homepage.showMoreLinkDest`、`homepage.eyebrow`：首页最近文章区域。
- `mainSections`、`sections`：分区列表、分区标签、兜底描述和导航高亮。
- `nav`：桌面/移动端导航与下拉分组。
- `footer.links`：页脚动作链接。
- `assets.defaultBackground`、`assets.defaultThemeColor`、`assets.backgroundImageWidth`：文章背景兜底、默认主题色、背景图响应式宽度。
- `theme.defaultAppearance`、`theme.autoSwitchAppearance`、`theme.header.layout`：初始主题策略、系统主题跟随、页头布局。
- `features.search`、`features.codeCopy`、`features.imageZoom`、`features.imageOptimization`、`features.highlightCurrentMenuArea`、`features.smartToc`、`features.smartTocHideUnfocusedChildren`：搜索、代码复制、灯箱、图片优化、导航高亮和 TOC 行为开关。
- `footer.showMenu`、`footer.showCopyright`、`footer.showThemeAttribution`、`footer.showAppearanceSwitcher`、`footer.showScrollToTop`：页脚菜单、版权、主题署名、主题切换和返回顶部开关。
- `article.showDate`、`article.showDateUpdated`、`article.showHero`、`article.showBreadcrumbs`、`article.showPagination`、`article.invertPagination`、`article.showReadingTime`、`article.showTableOfContents`、`article.showTaxonomies`、`article.showWordCount`、`article.showZenMode`：文章页元信息、hero、面包屑、上下篇、TOC、分类标签与沉浸阅读按钮显示。
- `list.showHero`、`list.showSummary`、`list.showCards`、`list.groupByYear`、`list.cardView`、`list.cardViewScreenWidth`：文章列表页标题区、摘要、卡片/归档列表、按年分组与卡片布局。
- `taxonomy.showTermCount`、`taxonomy.showHero`、`taxonomy.cardView`：标签/分类/系列索引页标题区、术语数量和卡片布局。
- `term.showHero`、`term.groupByYear`、`term.cardView`、`term.cardViewScreenWidth`：单个标签/分类/系列页标题区、按年分组和卡片布局。
- `pagination.pagerSize`：文章列表、标签页、分类页和系列页分页。
- `sitemap.changefreq`、`sitemap.priority`、`sitemap.excludedKinds`：sitemap 默认更新频率、优先级和 taxonomy/term 页面过滤。
- `related.threshold`、`related.toLower`、`related.indices`：相关文章权重、阈值与大小写归一化。
- `verification.google`、`verification.bing`、`verification.pinterest`、`verification.yandex`、`verification.fediverse`：搜索引擎/平台验证 meta 标签。
- `source.buildDrafts`、`source.buildFuture`：草稿和未来日期文章是否参与构建。
- `source.summaryLength`：文章缺少 `description` 时的列表/RSS/文章描述摘要兜底；`0` 表示不自动截取。
- `source.enableRobotsTXT`：生成 `robots.txt`；关闭时输出全站禁止抓取规则。
- `article.showAuthor`、`article.showDraftLabel`、`article.showEdit`、`article.sharingLinks`：文章作者信息、草稿标识、编辑入口和分享链接。`showEdit` 需要配置 `repository.contentEditUrl` 才会渲染。
- `analytics.umami`、`analytics.plausible`、`analytics.fathom`：生产构建中按配置条件输出轻量统计脚本。

## 部分实现，但配置开关尚未完全接管行为

- `article.showViews`、`article.showLikes`、`list.showViews`、`list.showLikes`、`taxonomy.showViews`、`taxonomy.showLikes`、`term.showViews`、`term.showLikes`：需要 analytics API 或后台数据源，不能只靠静态主题配置完成。
- `article.showComments`：评论功能暂不考虑实现。

## 未实现 / 路线图占位

- `rssnext.*`：尚未实现 RSSNext 集成；只有在确定目标服务和嵌入方式后再接入。

## 建议清理方向

保留已实现字段作为当前主题公开 API。Hugo/Blowfish 兼容字段、动态 taxonomy 命名映射、sitemap 文件名覆盖、相关文章 fragment 引用等如果没有明确产品需求，不再作为“待实现项”追踪，避免为了接配置而接配置。
