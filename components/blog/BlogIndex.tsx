"use client";

import { useMemo, useState } from "react";
import { BlogCard } from "@/components/blog/BlogCard";
import { Input } from "@/components/ui/field";
import type { Post } from "@/lib/posts";

export function BlogIndex({ posts }: { posts: Post[] }) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("all");
  const tags = useMemo(
    () => ["all", ...new Set(posts.flatMap((post) => post.tags))],
    [posts],
  );

  const filtered = posts.filter((post) => {
    const q = query.toLowerCase();
    const matchesQuery =
      !q ||
      post.title.toLowerCase().includes(q) ||
      post.excerpt.toLowerCase().includes(q) ||
      post.tags.some((item) => item.toLowerCase().includes(q));
    const matchesTag = tag === "all" || post.tags.includes(tag);
    return matchesQuery && matchesTag;
  });

  const [featured, ...rest] = filtered;

  return (
    <div>
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search letters…"
          aria-label="Search posts"
          className="md:max-w-sm"
        />
        <div className="flex flex-wrap gap-2">
          {tags.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setTag(item)}
              className={`rounded-full border px-3 py-1.5 text-xs uppercase tracking-[0.14em] ${
                tag === item
                  ? "border-ink bg-ink text-paper"
                  : "border-line bg-paper text-muted"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      {filtered.length === 0 ? (
        <p className="text-muted">No posts match that search.</p>
      ) : (
        <div className="grid gap-8">
          {featured ? <BlogCard post={featured} featured /> : null}
          <div className="grid gap-8 md:grid-cols-2">
            {rest.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
