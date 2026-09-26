import type { Metadata } from "next";
import { BlogIndex } from "@/components/blog/BlogIndex";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Letters from Leigh Arreane — craft, painting, and the work behind the novel.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <p className="text-xs uppercase tracking-[0.2em] text-muted">Journal</p>
      <h1 className="mt-3 font-display text-5xl tracking-tight md:text-6xl">From the desk</h1>
      <p className="mt-4 max-w-xl text-lg text-muted">
        Notes on writing, painting, and the perfectly imperfect work of trying again.
      </p>
      <div className="mt-12">
        <BlogIndex posts={posts} />
      </div>
    </div>
  );
}
