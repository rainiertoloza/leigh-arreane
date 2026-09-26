import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/posts";
import { formatDate } from "@/lib/utils";

export function BlogCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  const image = post.coverImage ?? "/images/author-leigh-arreane.png";
  return (
    <article
      className={`group overflow-hidden rounded-[1.4rem] border border-line bg-paper shadow-[0_20px_50px_-32px_rgba(31,25,22,0.4)] ${
        featured ? "md:grid md:grid-cols-2" : ""
      }`}
    >
      <Link href={`/blog/${post.slug}`} className="block overflow-hidden">
        <Image
          src={image}
          alt=""
          width={900}
          height={600}
          className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
      </Link>
      <div className="p-6">
        <p className="text-xs uppercase tracking-[0.16em] text-muted">
          {formatDate(post.publishDate)} · {post.readTimeMinutes} min read
        </p>
        <h3 className="mt-2 font-display text-2xl tracking-tight md:text-3xl">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">{post.excerpt}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="text-xs uppercase tracking-[0.14em] text-accent">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
