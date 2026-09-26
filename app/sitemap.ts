import type { MetadataRoute } from "next";
import { books } from "@/lib/books";
import { getAllPosts } from "@/lib/posts";
import { getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = getSiteUrl();
  const staticRoutes = ["", "/about", "/books", "/blog", "/contact"].map((path) => ({
    url: `${origin}${path}`,
    lastModified: new Date(),
  }));
  const bookRoutes = books.map((book) => ({
    url: `${origin}/books/${book.slug}`,
    lastModified: new Date(),
  }));
  const postRoutes = getAllPosts().map((post) => ({
    url: `${origin}/blog/${post.slug}`,
    lastModified: new Date(post.publishDate),
  }));
  return [...staticRoutes, ...bookRoutes, ...postRoutes];
}
