# Astro MIE

Astro MIE is a configurable Astro theme template for static, long-form blogs.
It ships with de-identified example content, example media, MDX article blocks,
config-driven navigation, RSS, sitemap, search index generation, math rendering,
spoiler syntax, code-copy controls, and theme-color driven article styling.

## Scripts

- `npm run dev` starts the local Astro dev server.
- `npm run build` runs `astro check` and `astro build`.
- `npm run preview` previews the production build.
- `npm run astro` runs the Astro CLI with telemetry disabled.

## Configuration

Site identity, author links, navigation dropdowns, content sections, default
assets, and theme behavior live in `blog.config.mjs`. Replace the example values
there before deploying your own blog.

## Content

Example posts live in `src/content/posts/`. They are intentionally generic and
can be removed when starting a real site. Post media should be referenced through
the explicit `media.featured`, `media.background`, and `seo.ogImage` front matter
fields.
