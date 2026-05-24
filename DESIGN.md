# Astro MIE Design Notes

Astro MIE is a static blog theme for configurable, media-rich, long-form writing.
The repository should stay de-identified: site identity, author data, navigation,
sections, and default media are examples until a downstream blog replaces them.

## Design Direction

- Material 3 Expressive inspired color, motion, and surface layering.
- Readable long-form article layouts with strong typography and generous spacing.
- Config-driven navigation with support for dropdown groups.
- Article-level theme colors applied to cards, heroes, links, pagination, and related content.
- Heavy blurred hero backgrounds that use the post or site background image as ambience.
- Portable MDX article blocks for repeated content structures.

## Content Model

Posts are file-based Markdown or MDX entries under `src/content/posts/`.
The content schema prefers explicit fields over filename conventions:

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

## Blocks

Content-level blocks live in `src/components/blocks/`.
They should model repeated article structures rather than layout decoration.

- `Figure`: one image with optional caption.
- `Gallery`: a compact related image set.
- `ReviewCard`: repeated review/rating entries.
- `ActionLinks`: outbound or internal calls to action.

Inline spoiler text is treated as a Markdown syntax enhancement through
`:spoiler[hidden text]`, not as a component.

## Interaction

- Navigation dropdowns open on hover and focus.
- Article cards respond with the article `themeColor`.
- Code blocks expose a language badge and copy button.
- Table of contents groups are collapsed by default at the secondary level.
- Links, pagination, tags, and article action elements provide hover and focus feedback.

## Template Boundary

This repository is the theme/template source. It should include generic examples only.
Do not commit personal posts, private media, deployment-specific configuration, or
generated build output.
