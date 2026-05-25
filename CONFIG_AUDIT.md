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

## 部分实现，但配置开关尚未完全接管行为

当前无已知“部分实现但开关未接管”的字段。后续新增功能如果先放入配置但未完全接线，应先记录在本节。

## 未实现 / 路线图占位

- `source.*`：Hugo/Blowfish 风格兼容信息。Astro 内容加载实际由 `src/content.config.ts` 配置。
- `article.*`：大多是 Blowfish 兼容项，覆盖文章日期、作者、hero、面包屑、分页、TOC、分享、评论、zen mode 等；当前文章布局基本是组件硬编码。
- `list.*`、`taxonomy.*`、`term.*`：列表页/分类页/术语页展示开关；当前相关页面使用固定 Astro 组件。
- `pagination.pagerSize`：当前尚未实现分页，列表页会一次性渲染全部文章/术语。
- `taxonomies`：兼容命名映射；当前路由硬编码为 `tags`、`categories`、`series`。
- `sitemap.*`：已启用 sitemap 集成，但这些字段尚未传递给 `@astrojs/sitemap`。
- `related.*`：当前相关文章算法是 `src/lib/posts.ts` 中的小型本地实现，未消费这些权重配置。
- `analytics.*`：没有渲染任何 analytics 脚本，也没有后台侧 analytics 接入。
- `verification.*`：没有渲染搜索引擎/社交平台验证 meta 标签。
- `rssnext.*`：尚未实现 RSSNext 集成。

## 建议清理方向

保留已实现字段作为当前主题公开 API；将兼容/路线图字段移入明确的 `planned` 分组或暂时移除，避免配置看起来可用、实际却不影响渲染。
