# Astro Blog Agent Guide

## Project Scope

This guide applies to `C:\Users\86138\Documents\Blog\astro_blog`.

`astro_blog` is the Astro migration target and theme project for the blog. It is
currently developed as `Astro MIE`: a configurable, media-rich static blog theme
for long-form writing. Treat it as the public theme/template source, not as a
dumping ground for private posts or deployment-only configuration.

The sibling `blog_source/` Hugo site remains the protected baseline. Do not edit
or rewrite it while working in this project unless the user explicitly asks.

## Product And Design Intent

The theme should deliberately move toward Material You and Material 3 Expressive,
not a lightly styled generic Astro starter.

Core visual goals:

- Use Material You dynamic color as a first-class design mechanism.
- Apply Material 3 Expressive principles through color, motion, shape, state
  layers, typography, and responsive layout.
- Build seamless route and shared-element animations where they clarify page
  state and reading flow.
- Use blur, glass, and layered surfaces intentionally for headers, heroes,
  overlays, lightboxes, and ambient media treatments.
- Keep long-form readability, accessibility, and performance ahead of decorative
  effects.

The desired result is a polished, distinctive personal blog interface with
dynamic color, smooth transitions, and tasteful depth, while still producing a
fast static site.

## Current Stack

- Astro, TypeScript, MDX, and Astro Content Collections.
- `@material/material-color-utilities` for Material dynamic color generation.
- `@material/web` used through local wrappers, not scattered directly through
  page templates.
- CSS variables and partials under `src/styles/partials/`, especially
  `tokens.css`, as the design-token foundation.
- `blog.config.mjs` for site identity, navigation, default assets, analytics,
  theme behavior, and other template configuration.
- `src/content/posts/` for example file-based Markdown and MDX posts.

Read `DESIGN.md` and `docs/material-design-system.md` before making broad theme,
token, Material Web, or animation changes.

## Design System Rules

- Prefer `--md-sys-*` semantic tokens and Astro MIE aliases over one-off hard
  coded colors, radii, shadows, or timing values.
- Preserve compatibility with existing `--surface`, `--primary`, `--radius-*`,
  and `--shadow-*` aliases while continuing to strengthen Material semantic
  tokens.
- Keep article-level color local. A post `themeColor` should affect that post's
  hero, article shell, cards, links, pagination, table of contents, and related
  content, but should not unexpectedly recolor the whole site chrome.
- Taxonomy, section, and series colors may be derived from stable strings.
  Authors should not need to hand-pick colors for every tag.
- Future media-derived color should be an enhancement and should not replace
  explicit front matter fields.
- Do not let dark mode be a simple brightness inversion. Maintain tonal
  containers, outlines, state layers, elevation, and contrast.

## Material Web Rules

- Do not place raw `<md-*>` elements directly across pages or content templates.
- Add or extend wrappers under `src/components/material/` first, then use those
  wrappers from pages and components.
- New Material Web usage must be checked against local tokens, sizing, focus
  states, keyboard behavior, SSR behavior, and reduced-motion expectations.
- Reading-specific structures such as article cards, archive rows, media blocks,
  review blocks, and section cards may remain custom components when they better
  express blog content than generic Material controls.

## Motion And Blur Rules

- Use Astro view transitions and the existing shared-transition protocol for
  post cards, covers, titles, search, theme changes, and page state changes.
- Motion should explain continuity or state change. Avoid animation that exists
  only as noise.
- Always respect `prefers-reduced-motion`.
- Keep fixed-format UI elements dimensionally stable so hover states, icons,
  labels, and transition layers do not shift layout.
- Use blur/glass surfaces with enough contrast and fallback behavior. They are
  appropriate for floating navigation, ambient hero backgrounds, search overlays,
  lightboxes, and reading rails, but should not obscure article text.

## Content Model

Posts should remain portable Markdown or MDX files under `src/content/posts/`.
Prefer explicit schema fields over Hugo-style filename conventions.

Important front matter includes:

- `title`
- `description`
- `date`
- `updatedDate`
- `draft`
- `slug`
- `section`
- `tags`
- `categories`
- `series`
- `seriesOrder`
- `themeColor`
- `media.featured`
- `media.background`
- `media.alt`
- `media.focalPoint`
- `seo.title`
- `seo.description`
- `seo.ogImage`

Article blocks belong in `src/components/blocks/` and should model reusable
content structures, not page decoration.

## Safety And Repository Boundaries

- Keep this repository de-identified. Do not commit private posts, personal
  media, secrets, or deployment-specific production values.
- Do not commit generated build output unless the user explicitly requests it.
- Do not bulk-migrate Hugo content into `astro_blog` without an explicit request
  and a representative sample-first plan.
- Keep the future `blog_admin/` or `blog_studio/` admin product separate from
  this theme unless the user asks to integrate a specific contract.
- Avoid destructive Git operations. Surface pending changes before publishing or
  committing.

## Working Workflow

- Inspect the actual current files before proposing broad design or architecture
  changes.
- For theme work, start from `DESIGN.md`, `docs/material-design-system.md`,
  `src/styles/partials/tokens.css`, `src/lib/material-colors.ts`,
  `src/components/material/`, `src/components/PageEffects.astro`, and the
  relevant page/component files.
- Prefer small, coherent changes that strengthen the design system over isolated
  page-level patches.
- When adding a new visual primitive, decide whether it belongs in tokens,
  a shared component, a layout partial, or a content block.
- Verify with `npm run build` for production correctness. Use the dev server and
  browser checks for visual, responsive, animation, and interaction changes.
