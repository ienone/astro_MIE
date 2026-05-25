import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import expressiveCode from "astro-expressive-code";
import rehypeKatex from "rehype-katex";
import remarkDirective from "remark-directive";
import remarkMath from "remark-math";
import blogConfig from "./blog.config.mjs";
import { remarkSpoiler } from "./src/lib/remark-spoiler.mjs";

export default defineConfig({
  site: blogConfig.url,
  integrations: [
    expressiveCode({
      themes: ["github-light", "github-dark"],
      defaultProps: {
        wrap: true,
      },
      frames: {
        showCopyToClipboardButton: blogConfig.features?.codeCopy !== false,
      },
    }),
    mdx(),
    sitemap(),
  ],
  markdown: {
    remarkPlugins: [remarkDirective, remarkMath, remarkSpoiler],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      theme: "github-light",
    },
  },
  vite: {
    build: {
      assetsInlineLimit: 0,
    },
  },
});
