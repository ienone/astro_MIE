---
title: "Astro MIE 部署指南"
description: "从本地检查、静态构建到 GitHub Pages 发布的完整部署说明。"
date: 2026-01-10
updatedDate: 2026-05-25
draft: false
slug: "deployment-guide"
section: "articles"
tags: ["astro", "deployment", "github-actions", "configuration"]
categories: ["Guide"]
series: ["Deployment docs"]
seriesOrder: 1
themeColor: "#146b5b"
media:
  featured: "/img/featured.svg"
  background: "/img/background.svg"
  alt: "Astro MIE deployment guide preview"
  focalPoint:
    x: 50
    y: 50
seo:
  title: "Astro MIE 部署指南"
  description: "Astro MIE 的本地校验、静态构建、搜索索引、RSS、sitemap 与 GitHub Pages 部署流程。"
  ogImage: "/img/featured.svg"
---

这篇文档用于替代早期测试文章，作为 Astro MIE 站点的部署说明。
目标是让任何一次发布都能遵循同一套流程：先确认配置，再构建静态产物，最后通过 Git 或 CI 发布。

## 部署前准备

部署前需要确认以下文件已经符合当前站点：

- `blog.config.mjs`：站点名称、URL、导航、作者、分页、sitemap、analytics 等主题配置。
- `src/content/posts/`：所有 Markdown/MDX 文章内容。
- `public/`：favicon、manifest、默认图片、头像和其他静态资源。
- `astro.config.mjs`：Astro 集成、Markdown/MDX 插件和 sitemap 配置。

其中 `blog.config.mjs` 是当前主题的公开配置入口。
部署到正式域名时，必须保证 `url` 指向最终站点地址，否则 canonical URL、RSS 链接、sitemap 和分享链接都会生成错误地址。

## 本地安装依赖

首次克隆仓库后运行：

```bash
npm install
```

如果依赖已经安装，只需要在发布前确认 lockfile 没有意外变动。
这个项目使用 Astro、MDX、Pagefind、KaTeX、Sharp 和 `@astrojs/sitemap` 生成静态站点。

## 本地预览

开发时运行：

```bash
npm run dev
```

本地预览适合检查：

- 首页背景、作者信息和最近文章区域；
- 文章 hero、目录、分享链接、作者卡片和上下篇导航；
- 标签、分类、系列和分区页面；
- 搜索弹窗、图片灯箱、代码复制按钮和主题切换。

开发环境不会默认发送 analytics 统计脚本，即使已经在配置里填写了 Umami、Plausible 或 Fathom。

## 构建检查

正式发布前运行：

```bash
npm run build
```

这个命令会依次执行：

1. `astro check`：检查 Astro、TypeScript 和内容集合类型。
2. `astro build`：生成静态页面、RSS、robots.txt 和 sitemap。
3. `pagefind --site dist`：为构建产物生成搜索索引。

构建成功后，最终产物位于 `dist/`。

## 内容可见性规则

构建时文章是否出现由 front matter 和 `source` 配置共同决定：

- `draft: true` 的文章默认不会构建，除非 `source.buildDrafts` 为 `true`。
- 未来日期文章默认不会构建，除非 `source.buildFuture` 为 `true`。
- 文章缺少 `description` 时，可以通过 `source.summaryLength` 从正文自动截取摘要。

这套规则会同时影响首页、文章列表、标签/分类/系列页、RSS、sitemap 和搜索索引。

## GitHub Pages 发布建议

推荐使用 GitHub Actions 自动部署：

```yaml
name: Deploy Astro site

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

如果使用 `ienone.github.io` 这类用户站点仓库，`blog.config.mjs` 中的 `url` 应保持为最终公开地址。

## 发布后检查

部署完成后建议检查：

- 首页是否正常加载；
- `/rss.xml` 是否可访问；
- `/robots.txt` 是否包含 sitemap 地址；
- `/sitemap-index.xml` 是否生成；
- 文章页 canonical、OG 图片和分享链接是否指向正式域名；
- 搜索弹窗是否能检索已发布文章；
- 如果配置了 analytics，正式页面源代码中是否包含对应脚本。

完成以上检查后，当前构建即可视为一次有效发布。
