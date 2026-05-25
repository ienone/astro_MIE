---
title: "静态部署架构说明"
description: "Astro MIE 从 Markdown/MDX 内容到静态产物、搜索索引、RSS 和 sitemap 的构建链路。"
date: 2026-01-22
updatedDate: 2026-05-25
draft: false
slug: "static-deployment-architecture"
section: "articles"
tags: ["architecture", "deployment", "astro"]
categories: ["Guide"]
series: ["Deployment docs"]
seriesOrder: 5
themeColor: "#39735f"
media:
  featured: "/img/featured.svg"
  background: "/img/background.svg"
  alt: "Static deployment architecture preview"
seo:
  title: "静态部署架构说明"
  description: "Astro MIE 的内容输入、构建阶段、静态输出和部署边界说明。"
  ogImage: "/img/featured.svg"
---

Astro MIE 的公开站点是纯静态输出。
这意味着访问者只会读取部署后的 HTML、CSS、JS、图片、RSS、sitemap 和搜索索引，不需要运行中的应用服务器。

## 架构概览

```text
Markdown / MDX 内容
        │
        ▼
Astro Content Collections
        │
        ▼
Astro 页面、组件和布局
        │
        ├── HTML / CSS / JS
        ├── RSS
        ├── robots.txt
        ├── sitemap-index.xml
        └── Pagefind 搜索索引
```

主题配置从 `blog.config.mjs` 注入页面、RSS、sitemap、analytics 和内容过滤逻辑。

## 输入层

输入层主要包括：

- `src/content/posts/`：文章正文和 front matter；
- `src/components/`：主题组件和内容块；
- `src/layouts/`：基础布局；
- `public/`：不经过打包的静态资源；
- `blog.config.mjs`：站点级配置。

内容文件保持 Markdown/MDX 格式，迁移和备份成本低，也方便未来 blog admin 直接读写。

## 构建层

构建层由 `npm run build` 串起：

```bash
astro check
astro build
pagefind --site dist
```

`astro check` 负责类型和内容 schema 检查。
`astro build` 负责生成静态页面。
Pagefind 在构建结束后扫描 `dist/`，生成客户端搜索索引。

## 输出层

输出目录是 `dist/`。
部署系统只需要发布这个目录即可。

典型输出包括：

- `/index.html`
- `/posts/.../index.html`
- `/rss.xml`
- `/robots.txt`
- `/sitemap-index.xml`
- `/pagefind/`
- 静态图片和构建资源

## 运行时边界

当前公开站点没有服务端运行时。
因此以下能力不应伪装成已经存在：

- 动态评论；
- 点赞计数；
- 后端浏览量接口；
- 用户登录；
- 在线编辑。

如果未来需要这些能力，应由 `blog_admin` 或第三方服务提供 API，静态站点只负责读取或嵌入。

## 与后台的关系

未来后台不需要替代静态站点，而是作为内容和发布侧车存在：

- 编辑 Markdown/MDX；
- 处理图片；
- 检查 SEO；
- 运行构建；
- 提交 Git；
- 触发部署；
- 读取 analytics 数据。

这种架构能保持公开站点简单、快速、可缓存，同时让作者工作流逐步自动化。
