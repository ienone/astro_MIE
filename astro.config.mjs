import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import rehypeKatex from "rehype-katex";
import remarkDirective from "remark-directive";
import remarkMath from "remark-math";
import blogConfig from "./blog.config.mjs";
import { remarkSpoiler } from "./src/lib/remark-spoiler.mjs";

export default defineConfig({
  site: blogConfig.url,
  integrations: [mdx(), sitemap()],
  markdown: {
    remarkPlugins: [remarkDirective, remarkMath, remarkSpoiler],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      theme: "github-light",
      wrap: true
    }
  },
  vite: {
    build: {
      assetsInlineLimit: 0
    }
  }
});
