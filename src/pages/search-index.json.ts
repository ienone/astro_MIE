import { getAllPosts, getPostUrl } from "../lib/posts";

function stripContent(value = "") {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/\{\{<[^>]+>\}\}/g, " ")
    .replace(/[#*_`~>\[\]()!|:-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export async function GET() {
  const posts = await getAllPosts();

  return new Response(
    JSON.stringify(
      posts.map((post) => ({
        title: post.data.title,
        description: post.data.description,
        url: getPostUrl(post),
        date: post.data.date.toISOString(),
        tags: post.data.tags,
        categories: post.data.categories,
        series: post.data.series,
        content: stripContent(post.body).slice(0, 12000)
      }))
    ),
    {
      headers: {
        "content-type": "application/json; charset=utf-8"
      }
    }
  );
}
