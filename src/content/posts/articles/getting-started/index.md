---
title: "Getting started with Astro MIE"
description: "A generic article showing the default content schema, sections, theme color, and hero media."
date: 2026-01-10
updatedDate: 2026-01-12
draft: false
slug: "getting-started"
section: "articles"
tags: ["astro", "theme", "configuration"]
categories: ["Guide"]
series: ["Theme basics"]
seriesOrder: 1
themeColor: "#146b5b"
media:
  featured: "/img/featured.svg"
  background: "/img/background.svg"
  alt: "Abstract theme preview image"
  focalPoint:
    x: 0.5
    y: 0.5
seo:
  title: "Getting started with Astro MIE"
  description: "A generic article showing the default content schema."
  ogImage: "/img/featured.svg"
---

Astro MIE is configured through `blog.config.mjs` and file-based posts in `src/content/posts/`.
The template keeps identity, navigation, section labels, author links, and default media outside of component code.

## Configure the site

Start by editing `blog.config.mjs`.
The `sections` map controls section labels, icons, descriptions, and URLs.
The `nav` array supports both direct links and dropdown groups, so the same template can handle a compact personal blog or a larger knowledge base.

## Write portable posts

Each post uses explicit front matter for its publishing metadata and media:

- `section` decides where the post appears.
- `themeColor` sets article accents and card interaction color.
- `media.featured` and `media.background` drive cards, heroes, and social previews.

## Keep deployment static

The public site is still a static Astro build.
Search data, RSS, sitemap, and article routes are generated during `npm run build`.
