import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { AuthorBioCard } from "@/components/author/AuthorBioCard";
import type { Post } from "@/lib/posts";
import { formatDate } from "@/lib/utils";

function ShareBar({ title, slug }: { title: string; slug: string }) {
  const url = `https://leigharreane.com/blog/${slug}`;
  const encoded = encodeURIComponent(url);
  const text = encodeURIComponent(title);
  return (
    <div className="flex flex-wrap gap-3 text-sm text-muted">
      <span className="text-xs uppercase tracking-[0.16em]">Share</span>
      <a
        className="hover:text-accent"
        href={`https://www.facebook.com/sharer/sharer.php?u=${encoded}`}
        target="_blank"
        rel="noreferrer"
      >
        Facebook
      </a>
      <a
        className="hover:text-accent"
        href={`https://twitter.com/intent/tweet?url=${encoded}&text=${text}`}
        target="_blank"
        rel="noreferrer"
      >
        X
      </a>
    </div>
  );
}

export function BlogPostLayout({
  post,
  related,
}: {
  post: Post;
  related: Post[];
}) {
  return (
    <article className="mx-auto max-w-3xl px-6 py-14">
      <p className="text-xs uppercase tracking-[0.18em] text-muted">
        {formatDate(post.publishDate)} · {post.readTimeMinutes} min read
      </p>
      <h1 className="mt-4 font-display text-4xl tracking-tight md:text-6xl">
        {post.title}
      </h1>
      <p className="mt-5 text-lg leading-relaxed text-muted">{post.excerpt}</p>
      <div className="prose-leigh mt-10">
        <MDXRemote source={post.body} />
      </div>
      <div className="mt-12 border-t border-line pt-8">
        <ShareBar title={post.title} slug={post.slug} />
      </div>
      <div className="mt-12">
        <AuthorBioCard compact />
      </div>
      {related.length > 0 ? (
        <section className="mt-14">
          <h2 className="font-display text-3xl">Keep reading</h2>
          <ul className="mt-5 space-y-3">
            {related.map((item) => (
              <li key={item.slug}>
                <Link href={`/blog/${item.slug}`} className="hover:text-accent">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
