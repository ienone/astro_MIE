import { getCollection, type CollectionEntry } from "astro:content";
import { createMaterialColorStyle, createMaterialColorStyleFromString } from "./material-colors";
import { getSectionConfig, siteConfig } from "./site";

export type PostEntry = CollectionEntry<"posts">;
export type TaxonomyKind = "tags" | "categories" | "series";

export async function getAllPosts(options: { includeDrafts?: boolean; includeFuture?: boolean } = {}) {
  const posts = await getCollection("posts");
  const includeDrafts = options.includeDrafts ?? siteConfig.source?.buildDrafts === true;
  const includeFuture = options.includeFuture ?? siteConfig.source?.buildFuture === true;
  const now = new Date();

  return posts
    .filter((post) => includeDrafts || !post.data.draft)
    .filter((post) => includeFuture || post.data.date <= now)
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

export function getPostBackgroundImage(post: PostEntry) {
  return post.data.media?.background || siteConfig.assets.defaultBackground || siteConfig.assets.defaultFeatured;
}

export function getPostThemeColor(post: PostEntry) {
  return post.data.themeColor || siteConfig.assets.defaultThemeColor;
}

export function getPostMaterialColorStyle(post: PostEntry) {
  return createMaterialColorStyle(getPostThemeColor(post));
}

export function getTermMaterialColorStyle(kind: TaxonomyKind, term: string) {
  return createMaterialColorStyleFromString(`${kind}:${term}`, siteConfig.assets.defaultThemeColor);
}

export function getSectionMaterialColorStyle(section: string) {
  const sectionConfig = getSectionConfig(section);

  return createMaterialColorStyleFromString(`section:${normalizeSectionPath(section)}:${sectionConfig.label}`, siteConfig.assets.defaultThemeColor);
}

export function getCollectionMaterialColorStyle(collection: string) {
  return createMaterialColorStyleFromString(`collection:${collection}`, siteConfig.assets.defaultThemeColor);
}

export function getPostImagePosition(post: PostEntry) {
  const focalPoint = post.data.media?.focalPoint;
  if (!focalPoint) return "center";

  const x = Math.min(100, Math.max(0, focalPoint.x));
  const y = Math.min(100, Math.max(0, focalPoint.y));

  return `${x}% ${y}%`;
}

function getPostTransitionSlug(post: PostEntry) {
  return getPostSlug(post)
    .normalize("NFKD")
    .replace(/[^a-zA-Z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

export function getPostTransitionSetName(post: PostEntry) {
  return `post-${getPostTransitionSlug(post) || "entry"}`;
}

export function getPostTransitionName(post: PostEntry, part: "cover" | "title") {
  const slug = getPostTransitionSlug(post);

  return `post-${part}-${slug || "entry"}`;
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

function stripMarkdown(value = "") {
  return value
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/[>#*_~|\-[\]{}()]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function getPostSummary(post: PostEntry) {
  if (post.data.description) return post.data.description;

  const summaryLength = siteConfig.source?.summaryLength ?? 0;
  if (summaryLength <= 0) return "";

  const summary = stripMarkdown(post.body);
  if (summary.length <= summaryLength) return summary;

  return `${summary.slice(0, summaryLength).trimEnd()}…`;
}

export function getPostSourcePath(post: PostEntry) {
  const normalizedId = post.id.replace(/\\/g, "/");

  return `src/content/posts/${normalizedId}`;
}

export function getPostEditUrl(post: PostEntry) {
  const template = siteConfig.repository?.contentEditUrl;
  if (!template) return "";

  const sourcePath = getPostSourcePath(post);

  return template
    .replaceAll("{id}", post.id.replace(/\\/g, "/"))
    .replaceAll("{path}", sourcePath)
    .replaceAll("{slug}", getPostSlug(post));
}

export function termToSlug(term: string) {
  return encodeURIComponent(term.trim().toLowerCase().replace(/\s+/g, "-"));
}

export function slugToTerm(slug: string) {
  return decodeURIComponent(slug).replace(/-/g, " ");
}

export function getTerms(posts: PostEntry[], kind: TaxonomyKind) {
  const terms = new Map<string, { term: string; count: number; values: Set<string> }>();

  for (const post of posts) {
    for (const term of post.data[kind] ?? []) {
      if (!term) continue;
      const slug = termToSlug(term);
      if (!slug) continue;

      const entry = terms.get(slug) ?? { term, count: 0, values: new Set<string>() };
      entry.count += 1;
      entry.values.add(term);
      terms.set(slug, entry);
    }
  }

  return [...terms.entries()]
    .map(([slug, { term, count, values }]) => ({ term, count, slug, values: [...values] }))
    .sort((a, b) => b.count - a.count || a.term.localeCompare(b.term, "en-US"));
}

export function getPostsByTerm(posts: PostEntry[], kind: TaxonomyKind, term: string) {
  return posts.filter((post) => (post.data[kind] ?? []).includes(term));
}

export function getPostsByTermSlug(posts: PostEntry[], kind: TaxonomyKind, slug: string) {
  return posts.filter((post) => (post.data[kind] ?? []).some((term) => termToSlug(term) === slug));
}

export function getArchiveGroups(posts: PostEntry[]) {
  const groups = new Map<number, PostEntry[]>();

  for (const post of posts) {
    const year = post.data.date.getFullYear();
    groups.set(year, [...(groups.get(year) ?? []), post]);
  }

  return [...groups.entries()].sort((a, b) => b[0] - a[0]);
}

export function getTotalPages(items: unknown[], pageSize: number) {
  return Math.max(1, Math.ceil(items.length / pageSize));
}

export function getPageItems<T>(items: T[], currentPage: number, pageSize: number) {
  return items.slice((currentPage - 1) * pageSize, currentPage * pageSize);
}

function normalizeRelatedTerm(value: string, toLower: boolean) {
  const normalized = value.trim();

  return toLower ? normalized.toLowerCase() : normalized;
}

function getRelatedValues(post: PostEntry, name: string, toLower: boolean) {
  if (name === "tags" || name === "categories" || name === "series") {
    return post.data[name].map((term) => normalizeRelatedTerm(term, toLower));
  }

  if (name === "authors") {
    return [siteConfig.author.name, siteConfig.author.displayName]
      .filter((author): author is string => Boolean(author))
      .map((author) => normalizeRelatedTerm(author, toLower));
  }

  return [];
}

function getDateRelatedScore(post: PostEntry, current: PostEntry) {
  const diffDays = Math.abs(post.data.date.getTime() - current.data.date.getTime()) / 86_400_000;

  if (diffDays <= 30) return 1;
  if (diffDays <= 90) return 0.5;
  if (diffDays <= 365) return 0.2;
  return 0;
}

export function getRelatedPosts(posts: PostEntry[], current: PostEntry, limit = 3) {
  const relatedConfig = siteConfig.related;
  const toLower = relatedConfig?.toLower ?? false;
  const threshold = relatedConfig?.threshold ?? 0;
  const indices = relatedConfig?.indices?.length
    ? relatedConfig.indices
    : [
        { name: "tags", weight: 100 },
        { name: "categories", weight: 100 },
        { name: "series", weight: 50 }
      ];

  return posts
    .filter((post) => post.id !== current.id)
    .map((post) => {
      let score = 0;

      for (const index of indices) {
        const weight = index.weight ?? 1;
        if (weight <= 0) continue;

        if (index.name === "date") {
          score += getDateRelatedScore(post, current) * weight;
          continue;
        }

        if (index.type === "fragments" || index.name === "fragmentrefs") continue;

        const currentValues = new Set(getRelatedValues(current, index.name, toLower));
        if (!currentValues.size) continue;

        const matches = getRelatedValues(post, index.name, toLower).filter((value) => currentValues.has(value));
        score += matches.length * weight;
      }

      return { post, score };
    })
    .filter((item) => item.score > threshold)
    .sort((a, b) => b.score - a.score || b.post.data.date.getTime() - a.post.data.date.getTime())
    .slice(0, limit)
    .map((item) => item.post);
}
