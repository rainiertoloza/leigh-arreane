"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Book } from "@/lib/books";
import { useCart } from "@/lib/cart";
import { formatDate, formatPrice } from "@/lib/utils";
import { author } from "@/lib/author";

export function BookDetail({ book }: { book: Book }) {
  const [formatType, setFormatType] = useState(book.formats[0].type);
  const selected = book.formats.find((f) => f.type === formatType) ?? book.formats[0];
  const addItem = useCart((s) => s.addItem);

  function add() {
    addItem({
      slug: book.slug,
      title: book.title,
      coverImage: book.coverImage,
      format: selected.type,
      formatLabel: selected.label,
      price: selected.price,
    });
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
      <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative">
          <Image
            src={book.coverImage}
            alt={`${book.title} cover`}
            width={1200}
            height={900}
            priority
            className="w-full rounded-[1.6rem] object-cover shadow-[0_40px_80px_-28px_rgba(31,25,22,0.45)]"
          />
        </div>
        <div className="lg:sticky lg:top-28">
          <Badge>Published {formatDate(book.publishDate)}</Badge>
          <h1 className="mt-4 font-display text-5xl tracking-tight md:text-6xl">
            {book.title}
          </h1>
          <p className="mt-4 font-display text-2xl italic text-muted">{book.hook}</p>
          <p className="mt-4 text-sm text-muted">
            {book.genres.join(" · ")}
            {book.pageCount ? ` · ${book.pageCount} pages` : ""}
            {book.isbn ? ` · ISBN ${book.isbn}` : ""}
          </p>
          <fieldset className="mt-8">
            <legend className="text-xs uppercase tracking-[0.18em] text-muted">
              Format
            </legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {book.formats.map((format) => (
                <button
                  key={format.type}
                  type="button"
                  onClick={() => setFormatType(format.type)}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    format.type === selected.type
                      ? "border-ink bg-ink text-paper"
                      : "border-line bg-paper hover:border-ink/30"
                  }`}
                >
                  {format.label} · {formatPrice(format.price)}
                </button>
              ))}
            </div>
          </fieldset>
          <p className="mt-5 font-display text-4xl">{formatPrice(selected.price)}</p>
          {selected.priceNote ? (
            <p className="mt-1 text-xs text-muted">{selected.priceNote}</p>
          ) : null}
          <p className="mt-1 text-sm text-muted">
            {selected.stock > 0 ? `${selected.stock} in stock` : "Currently unavailable"}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button size="lg" onClick={add} disabled={selected.stock < 1}>
              Add to cart
            </Button>
            <Button asChild variant="secondary" size="lg">
              <a href={author.socialLinks.instagram} target="_blank" rel="noreferrer">
                Request a signed copy
              </a>
            </Button>
          </div>
          {(selected.retailerLinks?.length || book.retailerLinks.length) ? (
            <p className="mt-5 text-sm text-muted">
              Also in stores:{" "}
              {(selected.retailerLinks ?? book.retailerLinks).map((link, i, arr) => (
                <span key={link.url}>
                  <a href={link.url} className="underline underline-offset-4 hover:text-accent" target="_blank" rel="noreferrer">
                    {link.label}
                  </a>
                  {i < arr.length - 1 ? " · " : ""}
                </span>
              ))}
            </p>
          ) : null}
        </div>
      </div>

      {book.contentWarning ? (
        <p className="mt-12 rounded-2xl border border-line bg-paper px-5 py-4 text-sm text-muted">
          Content warning: {book.contentWarning}
        </p>
      ) : null}

      <Tabs defaultValue="synopsis" className="mt-12">
        <TabsList>
          <TabsTrigger value="synopsis">Synopsis</TabsTrigger>
          <TabsTrigger value="reviews">From the pages</TabsTrigger>
        </TabsList>
        <TabsContent value="synopsis">
          <div className="max-w-3xl space-y-4 text-[1.05rem] leading-8 text-ink/85">
            {book.synopsis.split("\n\n").map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="reviews">
          <div className="grid gap-6 md:grid-cols-2">
            {book.reviews.map((review) => (
              <blockquote
                key={review.quote}
                className="rounded-[1.3rem] border border-line bg-paper p-6 font-display text-xl italic"
              >
                “{review.quote}”
                <footer className="mt-3 font-sans text-xs not-italic uppercase tracking-[0.16em] text-muted">
                  {review.source}
                </footer>
              </blockquote>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
