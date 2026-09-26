import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

export type PostFrontmatter = {
  title: string;
  excerpt: string;
  coverImage?: string;
  publishDate: string;
  tags: string[];
};

export type Post = PostFrontmatter & {
  slug: string;
  readTimeMinutes: number;
  body: string;
};

const POSTS_DIR = path.join(process.cwd(), "content/posts");

export function getPostSlugs() {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

function toIsoDate(value: unknown) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  return String(value ?? "");
}

export function getPost(slug: string): Post | null {
  const fullPath = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);
  const fm = data as PostFrontmatter;
  return {
    slug,
    title: fm.title,
    excerpt: fm.excerpt,
    coverImage: fm.coverImage,
    publishDate: toIsoDate(fm.publishDate),
    tags: fm.tags ?? [],
    readTimeMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
    body: content,
  };
}

export function getAllPosts(): Post[] {
  return getPostSlugs()
    .map((slug) => getPost(slug))
    .filter((post): post is Post => post !== null)
    .sort(
      (a, b) =>
        new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime(),
    );
}

export function getRelatedPosts(slug: string, limit = 2) {
  const current = getPost(slug);
  const others = getAllPosts().filter((post) => post.slug !== slug);
  if (!current) return others.slice(0, limit);
  const scored = others
    .map((post) => ({
      post,
      score: post.tags.filter((tag) => current.tags.includes(tag)).length,
    }))
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((entry) => entry.post);
}
