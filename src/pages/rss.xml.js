import rss from "@astrojs/rss";
import { getAllPosts, getPostUrl } from "../lib/posts";
import { siteConfig } from "../lib/site";

export async function GET(context) {
  const posts = await getAllPosts();

  return rss({
    title: siteConfig.title,
    description: siteConfig.description,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: getPostUrl(post),
      categories: [...post.data.categories, ...post.data.tags]
    }))
  });
}
