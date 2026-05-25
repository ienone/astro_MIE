---
title: "blog.config.mjs 配置参考"
description: "Astro MIE 当前公开配置项的用途、默认行为和部署注意事项。"
date: 2026-01-20
updatedDate: 2026-05-25
draft: false
slug: "configuration-reference"
section: "articles"
tags: ["configuration", "features", "deployment"]
categories: ["Guide"]
series: ["Deployment docs"]
seriesOrder: 4
themeColor: "#5f5aa2"
media:
  featured: "/img/featured.svg"
  background: "/img/background.svg"
  alt: "Configuration reference preview"
  focalPoint:
    x: 50
    y: 50
seo:
  title: "blog.config.mjs 配置参考"
  description: "Astro MIE 站点身份、导航、文章、列表、分页、SEO、analytics 与内容可见性配置说明。"
  ogImage: "/img/featured.svg"
---

`blog.config.mjs` 是 Astro MIE 的主题配置入口。
它不负责替代 Astro 的构建配置，而是集中管理站点身份、主题行为和部署相关的公开参数。

## 站点身份

基础字段会影响页面标题、RSS、canonical URL、分享链接和 sitemap：

```js
{
  name: "ienoneの站",
  title: "ienoneの站",
  description: "记录一下蒟蒻的成长",
  url: "https://ienone.github.io/",
  language: "zh-CN"
}
```

部署到正式环境前，必须检查 `url` 是否是最终公开地址。
如果 URL 配置错误，RSS、sitemap、OG URL 和文章分享链接都会指向错误域名。

## 品牌和默认资源

`branding` 和 `assets` 管理 logo、favicon、默认封面图、默认背景图和文章主题色。
推荐至少提供：

- `branding.logo`
- `branding.favicon`
- `assets.defaultFeatured`
- `assets.defaultBackground`
- `assets.defaultThemeColor`

这些字段会在文章没有自定义媒体时作为兜底，保证列表页和文章页不会出现缺图状态。

## 作者信息

`author` 用于首页、页脚和文章页作者卡片：

```js
author: {
  name: "ienone",
  displayName: "ienone",
  bio: "ai、臭看番的、篮球、MESSI、科幻",
  avatar: "/img/avatar.svg",
  links: []
}
```

当前站点是单作者模型。
如果未来要支持多作者，应优先扩展内容 schema，而不是在每篇文章里手写 HTML。

## 内容可见性

`source` 中真正参与构建行为的字段包括：

- `buildDrafts`：是否构建 `draft: true` 的文章；
- `buildFuture`：是否构建未来日期文章；
- `summaryLength`：缺少 `description` 时从正文截取摘要；
- `enableRobotsTXT`：控制 `robots.txt` 输出。

推荐正式站点保持：

```js
source: {
  buildDrafts: false,
  buildFuture: false,
  summaryLength: 140,
  enableRobotsTXT: true
}
```

如果只是本地预览，可以临时开启草稿和未来文章。

## 文章页配置

`article` 控制文章页结构：

- 日期、更新时间、字数和阅读时间；
- hero、面包屑、TOC 和沉浸阅读按钮；
- 作者卡片、草稿标识、编辑入口；
- taxonomy、上下篇、分享链接。

`article.showEdit` 只有在同时配置 `repository.contentEditUrl` 时才会显示。
模板支持 `{path}`、`{id}` 和 `{slug}` 占位符。

## 列表和分页

`list`、`taxonomy`、`term` 和 `pagination` 控制文章集合页：

- `/posts/`
- `/tags/`
- `/categories/`
- `/series/`
- `/sections/`

`pagination.pagerSize` 会决定每页文章数量。
如果当前文章数没有超过页大小，分页路由不会额外生成二级页。

## Sitemap、验证和统计

`sitemap` 当前支持：

- `changefreq`
- `priority`
- `excludedKinds`

`verification` 会输出搜索引擎和平台验证 meta。

`analytics` 支持生产构建中条件输出 Umami、Plausible 或 Fathom 脚本。
开发环境默认不会发送统计请求。

## 不建议追踪的兼容字段

有些字段来自旧 Hugo/Blowfish 语义，但当前主题不再为了兼容而实现，例如动态 taxonomy 命名映射、sitemap 文件名覆盖和相关文章 fragment 引用。
除非未来有明确产品需求，否则它们不应进入待办列表。
