---
title: "SEO、搜索与订阅说明"
description: "Astro MIE 中 canonical、OG、verification、RSS、sitemap、robots.txt 和 Pagefind 搜索的生成规则。"
date: 2026-01-28
updatedDate: 2026-05-25
draft: false
slug: "seo-search-rss-guide"
section: "notes/frontend"
tags: ["seo", "search", "rss", "deployment"]
categories: ["Notes"]
series: ["Deployment docs"]
seriesOrder: 8
themeColor: "#8a5d3b"
media:
  featured: "/img/featured.svg"
  background: "/img/background.svg"
  alt: "SEO search RSS guide preview"
seo:
  title: "SEO、搜索与订阅说明"
  description: "Astro MIE 的页面元信息、RSS、sitemap、robots.txt 和 Pagefind 搜索说明。"
  ogImage: "/img/featured.svg"
---

Astro MIE 的 SEO 和订阅能力主要在构建时生成。
发布前应确保站点 URL、文章 metadata 和公开资源路径都正确。

## 页面元信息

基础布局会输出：

- `<title>`
- `<meta name="description">`
- canonical URL
- Open Graph title/description/url/image
- Twitter card
- theme color
- verification meta

文章页的描述优先级：

1. `seo.description`
2. `description`
3. `source.summaryLength` 生成的摘要
4. 站点默认描述

## Canonical URL

canonical 基于 `blog.config.mjs` 的 `url` 和当前页面路径生成。
部署到正式域名后，需要抽查页面源代码，确认 canonical 没有指向本地或旧域名。

## Open Graph 图片

文章页 OG 图片优先级：

1. `seo.ogImage`
2. `media.featured`
3. `media.background`
4. `assets.defaultFeatured`

推荐每篇重要文章显式配置 `seo.ogImage` 或 `media.featured`。

## Verification

`verification` 支持常见搜索引擎和平台：

- Google
- Bing
- Pinterest
- Yandex
- Fediverse creator

字段为空时不会输出对应 meta。

## RSS

`/rss.xml` 由 `@astrojs/rss` 生成。
RSS 条目包含：

- 标题；
- 摘要；
- 发布时间；
- 文章链接；
- categories 和 tags。

草稿和未来日期文章默认不会进入 RSS。

## Sitemap

`@astrojs/sitemap` 会生成 `/sitemap-index.xml`。
当前配置支持默认 `changefreq`、`priority` 和 taxonomy/term 页面过滤。

如果 `sitemap.excludedKinds` 包含 `taxonomy` 或 `term`，标签索引和具体术语页会从 sitemap 中排除。

## Robots

`/robots.txt` 根据 `source.enableRobotsTXT` 输出。

开启时：

```txt
User-agent: *
Allow: /
Sitemap: https://example.com/sitemap-index.xml
```

关闭时：

```txt
User-agent: *
Disallow: /
```

预览环境如果不希望被抓取，可以关闭该配置或使用独立部署策略。

## Pagefind 搜索

构建后运行 Pagefind，搜索索引位于 `/pagefind/`。
文章页使用 `data-pagefind-body` 标记正文区域，辅助 UI 使用 `data-pagefind-ignore` 排除。

如果搜索结果缺失，优先检查：

- `npm run build` 是否完整执行 Pagefind；
- 文章是否是草稿或未来日期；
- 页面是否包含 `data-pagefind-body`；
- 部署时是否上传了 `dist/pagefind/`。
