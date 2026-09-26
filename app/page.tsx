import Image from "next/image";
import Link from "next/link";
import { AuthorBioCard } from "@/components/author/AuthorBioCard";
import { BlogCard } from "@/components/blog/BlogCard";
import { Hero } from "@/components/home/Hero";
import { PressQuoteStrip } from "@/components/home/PressQuoteStrip";
import { SectionReveal } from "@/components/shared/SectionReveal";
import { Button } from "@/components/ui/button";
import { author } from "@/lib/author";
import { getFeaturedBook } from "@/lib/books";
import { getAllPosts } from "@/lib/posts";

export default function HomePage() {
  const book = getFeaturedBook();
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      <Hero book={book} />
      <PressQuoteStrip />
      <SectionReveal>
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
          <div className="order-2 md:order-1">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">The novel</p>
            <h2 className="mt-3 font-display text-4xl tracking-tight md:text-5xl">
              {book.title}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">{book.pullQuote}</p>
            <p className="mt-4 leading-relaxed text-ink/80">
              Laura Wills dreams like the rest of us — until the dreams become a prelude
              to her realities, and then they leave. A stranger. An old hometown. A
              choice between finding and losing what truly matters.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link href={`/books/${book.slug}`}>Inside the book</Link>
              </Button>
              <Button asChild variant="secondary">
                <a href={book.retailerLinks[0].url} target="_blank" rel="noreferrer">
                  Also on Amazon
                </a>
              </Button>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <Image
              src={book.coverImage}
              alt=""
              width={900}
              height={700}
              className="w-full rounded-[1.6rem] object-cover shadow-[0_30px_70px_-28px_rgba(31,25,22,0.4)]"
            />
          </div>
        </section>
      </SectionReveal>
      <SectionReveal>
        <section className="bg-paper/80">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <AuthorBioCard />
          </div>
        </section>
      </SectionReveal>
      <SectionReveal>
        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted">From the desk</p>
              <h2 className="mt-2 font-display text-4xl">Latest letters</h2>
            </div>
            <Button asChild variant="ghost">
              <Link href="/blog">All posts</Link>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      </SectionReveal>
      <SectionReveal>
        <section className="border-t border-line">
          <div className="mx-auto max-w-6xl px-6 py-16 text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-muted">Also in stores</p>
            <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm">
              {book.retailerLinks.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  className="underline underline-offset-4 hover:text-accent"
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={author.socialLinks.instagram}
                className="underline underline-offset-4 hover:text-accent"
                target="_blank"
                rel="noreferrer"
              >
                Signed copies via Instagram
              </a>
            </div>
          </div>
        </section>
      </SectionReveal>
    </>
  );
}
