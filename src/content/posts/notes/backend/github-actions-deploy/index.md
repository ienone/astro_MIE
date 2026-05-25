---
title: "GitHub Actions 部署流程"
description: "使用 GitHub Actions 构建 Astro MIE 并发布到 GitHub Pages 的推荐流程。"
date: 2026-01-24
updatedDate: 2026-05-25
draft: false
slug: "github-actions-deploy"
section: "notes/backend"
tags: ["github-actions", "deployment", "ci"]
categories: ["Notes"]
series: ["Deployment docs"]
seriesOrder: 6
themeColor: "#6f5a8f"
media:
  featured: "/img/featured.svg"
  background: "/img/background.svg"
  alt: "GitHub Actions deployment preview"
seo:
  title: "GitHub Actions 部署流程"
  description: "Astro MIE 的 GitHub Actions 构建、上传 artifact 和 Pages 部署说明。"
  ogImage: "/img/featured.svg"
---

这篇文档说明推荐的 CI 部署方式。
它适合将 `main` 分支作为内容和主题源码，构建产物由 GitHub Pages 托管。

## 工作流目标

CI 应完成四件事：

1. 安装依赖；
2. 执行完整构建；
3. 上传 `dist/`；
4. 部署到 GitHub Pages。

不要在 CI 中跳过 `astro check`。
类型检查和内容 schema 检查能提前发现 front matter 错误。

## 推荐 workflow

```yaml
name: Deploy Astro MIE

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

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
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

## 配置检查

启用 GitHub Pages 前，需要在仓库设置中选择 GitHub Actions 作为 Pages 来源。

同时检查：

- `blog.config.mjs` 中的 `url` 是否是正式站点地址；
- 是否需要自定义域名；
- 是否已经提交 `package-lock.json`；
- workflow 使用的 Node 版本是否满足当前 Astro 版本要求。

## 构建失败排查

常见失败原因：

- front matter 类型不符合 `src/content.config.ts`；
- MDX import 路径错误；
- 图片路径不存在；
- `blog.config.mjs` 中 URL 或数组字段写法错误；
- Pagefind 扫描的 `dist/` 不存在。

优先在本地运行：

```bash
npm run build
```

如果本地也失败，先修复本地构建；如果本地成功而 CI 失败，再检查 Node 版本、lockfile 和系统路径差异。

## 手动部署

workflow 包含 `workflow_dispatch` 后，可以在 GitHub Actions 页面手动触发部署。
这适合只调整仓库设置或需要重新发布同一 commit 的场景。

## 与未来后台集成

未来 `blog_admin` 可以在完成内容编辑、图片处理和构建检查后：

1. 展示 Git diff；
2. 提交 commit；
3. push 到 `main`；
4. 触发 GitHub Actions；
5. 展示部署状态。

这样能保留文件化内容和 Git 发布流程，同时减少手动命令操作。
