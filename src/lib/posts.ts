import { getCollection, type CollectionEntry } from "astro:content";
import { getSectionConfig, siteConfig } from "./site";

export type PostEntry = CollectionEntry<"posts">;
export type TaxonomyKind = "tags" | "categories" | "series";

export async function getAllPosts(options: { includeDrafts?: boolean } = {}) {
  const posts = await getCollection("posts");

  return posts
    .filter((post) => options.includeDrafts || !post.data.draft)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function getPostSlug(post: PostEntry) {
  if (post.data.slug) return post.data.slug.replace(/^\/+|\/+$/g, "");

  return post.id
    .replace(/\\/g, "/")
    .replace(/\/index\.(md|mdx)$/i, "")
    .replace(/\.(md|mdx)$/i, "");
}

export function getPostUrl(post: PostEntry) {
  return `/posts/${getPostSlug(post)}/`;
}

export function getPostImage(post: PostEntry) {
  return (
    post.data.media?.featured ||
    post.data.media?.background ||
    post.data.seo?.ogImage ||
    siteConfig.assets.defaultFeatured
  );
}

export function getSectionLabel(section: string) {
  return getSectionConfig(section).label;
}

export function getSectionDescription(section: string) {
  return getSectionConfig(section).description ?? "";
}

export function normalizeSectionPath(section = "") {
  return section.replace(/\\/g, "/").replace(/^\/+|\/+$/g, "");
}

export function getConfiguredSectionKeys(posts: PostEntry[] = []) {
  const keys = new Set([
    ...siteConfig.mainSections.map(normalizeSectionPath),
    ...Object.keys(siteConfig.sections).map(normalizeSectionPath)
  ]);

  for (const post of posts) keys.add(normalizeSectionPath(post.data.section));

  return [...keys].filter(Boolean);
}

export function postMatchesSection(post: PostEntry, section: string) {
  const normalized = normalizeSectionPath(section);
  const postSection = normalizeSectionPath(post.data.section);
  const postPath = normalizeSectionPath(post.id).replace(/\/index\.(md|mdx)$/i, "").replace(/\.(md|mdx)$/i, "");

  return postSection === normalized || postPath === normalized || postPath.startsWith(`${normalized}/`);
}

export function formatDate(value: Date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(value);
}

export function wordCount(body = "") {
  const cjk = body.match(/[\u4e00-\u9fff]/g)?.length ?? 0;
  const latin = body
    .replace(/[\u4e00-\u9fff]/g, " ")
    .match(/[A-Za-z0-9_]+(?:[-'][A-Za-z0-9_]+)*/g)?.length ?? 0;

  return cjk + latin;
}

export function readingTime(body = "") {
  const minutes = Math.max(1, Math.ceil(wordCount(body) / 420));
  return `${minutes} min read`;
}

export function termToSlug(term: string) {
  return encodeURIComponent(term.trim().toLowerCase().replace(/\s+/g, "-"));
}

export function slugToTerm(slug: string) {
  return decodeURIComponent(slug).replace(/-/g, " ");
}

export function getTerms(posts: PostEntry[], kind: TaxonomyKind) {
  const counts = new Map<string, number>();

  for (const post of posts) {
    for (const term of post.data[kind] ?? []) {
      if (!term) continue;
      counts.set(term, (counts.get(term) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .map(([term, count]) => ({ term, count, slug: termToSlug(term) }))
    .sort((a, b) => b.count - a.count || a.term.localeCompare(b.term, "en-US"));
}

export function getPostsByTerm(posts: PostEntry[], kind: TaxonomyKind, term: string) {
  return posts.filter((post) => (post.data[kind] ?? []).includes(term));
}

export function getArchiveGroups(posts: PostEntry[]) {
  const groups = new Map<number, PostEntry[]>();

  for (const post of posts) {
    const year = post.data.date.getFullYear();
    groups.set(year, [...(groups.get(year) ?? []), post]);
  }

  return [...groups.entries()].sort((a, b) => b[0] - a[0]);
}

export function getRelatedPosts(posts: PostEntry[], current: PostEntry, limit = 3) {
  const currentTerms = new Set([
    ...current.data.tags,
    ...current.data.categories,
    ...current.data.series
  ]);

  return posts
    .filter((post) => post.id !== current.id)
    .map((post) => {
      const score = [...post.data.tags, ...post.data.categories, ...post.data.series].filter((term) =>
        currentTerms.has(term)
      ).length;

      return { post, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || b.post.data.date.getTime() - a.post.data.date.getTime())
    .slice(0, limit)
    .map((item) => item.post);
}
