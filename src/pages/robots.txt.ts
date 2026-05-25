import { siteConfig } from "../lib/site";

export function GET() {
  const siteUrl = new URL(siteConfig.url);
  const sitemapUrl = new URL("/sitemap-index.xml", siteUrl).toString();
  const body = siteConfig.source?.enableRobotsTXT === false
    ? "User-agent: *\nDisallow: /\n"
    : `User-agent: *\nAllow: /\nSitemap: ${sitemapUrl}\n`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
}
