# Article Blocks

This directory is for reusable, content-level article blocks that should survive a theme change.

## Blocks

- `Figure`: one image with optional caption.
- `Gallery`: a small set of related images.
- `ReviewCard`: structured review/rating content.
- `ActionLinks`: one or more outbound calls to action.

## Not Blocks

- Lead text is not a portable block. Hugo `lead` shortcodes are migrated back to normal Markdown paragraphs.
- Spoiler text is a Markdown syntax enhancement, not an MDX component. Use `:spoiler[hidden text]`; it is rendered by `remark-spoiler` into an inline masked span.
