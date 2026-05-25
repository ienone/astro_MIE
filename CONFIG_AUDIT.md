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

## 部分实现，但配置开关尚未完全接管行为

- `assets.defaultBackground`、`assets.defaultThemeColor`、`assets.backgroundImageWidth`：类型/配置中存在，但当前渲染主要直接使用 featured 兜底图。
- `theme.defaultAppearance`、`theme.autoSwitchAppearance`、`theme.header.layout`：UI 里有主题切换与固定页头，但这些配置值还没有驱动初始模式或页头布局。
- `features.search`：搜索功能已实现，但该布尔值还没有用来隐藏/显示搜索入口。
- `features.codeCopy`：代码复制已交给 `astro-expressive-code`，但该开关还没有接入启停逻辑。
- `features.imageZoom`：文章图片灯箱已通过 PhotoSwipe 实现，但该开关还没有接入禁用逻辑。
- `features.imageOptimization`：本地内容图片现在可走 Astro image metadata + `OptimizedImage`；但 public 路径字符串会按设计原样输出，无法被 Astro 转换。
- `features.highlightCurrentMenuArea`：`Header.astro` 有当前导航区域高亮逻辑，但配置开关未接管。
- `features.smartToc`、`features.smartTocHideUnfocusedChildren`：TOC 渲染/高亮已存在，但这些开关未接管具体行为。
- `footer.showMenu`、`footer.showCopyright`、`footer.showThemeAttribution`、`footer.showAppearanceSwitcher`、`footer.showScrollToTop`：页脚有基础渲染，但这些选项还没有条件化改变输出。

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
