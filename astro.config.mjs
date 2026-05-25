import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import expressiveCode from "astro-expressive-code";
import rehypeKatex from "rehype-katex";
import remarkDirective from "remark-directive";
import remarkMath from "remark-math";
import blogConfig from "./blog.config.mjs";
import { remarkSpoiler } from "./src/lib/remark-spoiler.mjs";

const sitemapConfig = blogConfig.sitemap ?? {};
const excludedSitemapKinds = new Set(sitemapConfig.excludedKinds ?? []);

function getSitemapKind(page) {
  const pathname = new URL(page).pathname;

  if (/^\/(tags|categories|series)\/$/.test(pathname)) return "taxonomy";
  if (/^\/(tags|categories|series)\/[^/]+\/$/.test(pathname)) return "term";
  return "page";
}

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
    sitemap({
      changefreq: sitemapConfig.changefreq,
      filename: sitemapConfig.filename,
      priority: sitemapConfig.priority,
      filter: (page) => !excludedSitemapKinds.has(getSitemapKind(page)),
      serialize: (item) => ({
        ...item,
        changefreq: item.changefreq ?? sitemapConfig.changefreq,
        priority: item.priority ?? sitemapConfig.priority,
      }),
    }),
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
