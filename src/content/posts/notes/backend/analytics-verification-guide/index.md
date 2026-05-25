---
title: "Analytics 与站点验证接入说明"
description: "如何配置 Umami、Plausible、Fathom 和搜索引擎验证 meta，并理解它们与静态站点的边界。"
date: 2026-01-30
updatedDate: 2026-05-25
draft: false
slug: "analytics-verification-guide"
section: "notes/backend"
tags: ["analytics", "verification", "deployment"]
categories: ["Notes"]
series: ["Deployment docs"]
seriesOrder: 9
themeColor: "#4f6f8f"
media:
  featured: "/img/featured.svg"
  background: "/img/background.svg"
  alt: "Analytics verification guide preview"
seo:
  title: "Analytics 与站点验证接入说明"
  description: "Astro MIE 的 analytics 脚本和搜索平台验证配置说明。"
  ogImage: "/img/featured.svg"
---

Astro MIE 可以在生产构建中按配置输出轻量统计脚本和平台验证 meta。
这些能力不改变站点的静态部署模型。

## 生产环境限定

Analytics 组件只在 `import.meta.env.PROD` 为真时输出脚本。
因此本地 `npm run dev` 不会默认发送访问数据。

如果需要确认脚本是否输出，应运行：

```bash
npm run build
npm run preview
```

然后查看页面源代码。

## Umami

配置示例：

```js
analytics: {
  umami: {
    src: "https://analytics.example.com/script.js",
    websiteId: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    hostUrl: "https://analytics.example.com",
    doNotTrack: true
  }
}
```

必填字段：

- `src`
- `websiteId`

没有同时填写这两个字段时，不会输出 Umami 脚本。

## Plausible

配置示例：

```js
analytics: {
  plausible: {
    domain: "ienone.github.io",
    outboundLinks: true,
    fileDownloads: true
  }
}
```

必填字段：

- `domain`

如果没有提供 `src`，默认使用 Plausible 官方脚本地址。

## Fathom

配置示例：

```js
analytics: {
  fathom: {
    siteId: "ABCDE",
    src: "https://cdn.usefathom.com/script.js"
  }
}
```

必填字段：

- `siteId`

如果没有提供 `src`，使用 Fathom 官方 CDN 地址。

## Verification

搜索引擎验证通过 `verification` 输出 meta：

```js
verification: {
  google: "google-token",
  bing: "bing-token",
  pinterest: "pinterest-token",
  yandex: "yandex-token",
  fediverse: "@user@example.com"
}
```

字段为空时不渲染。
填写后需要重新构建并部署，平台才能在公开页面中检测到 meta 标签。

## 与 views/likes 的关系

当前 analytics 只负责脚本嵌入，不提供文章浏览量 API。
因此 `showViews` 和 `showLikes` 仍然需要后续后台或第三方接口支持。

不要在静态页面里硬编码假计数。
如果未来要展示热度，应优先从 analytics 服务或 blog admin 后端读取真实数据。

## 隐私建议

接入 analytics 前建议确认：

- 是否尊重 Do Not Track；
- 是否需要 cookie；
- 是否需要展示隐私说明；
- 是否只在正式域名统计；
- 是否排除本地和预览环境。

对于个人博客，推荐优先选择 Umami 或 Plausible 这类轻量、隐私友好的方案。
